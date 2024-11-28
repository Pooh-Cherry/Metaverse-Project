<?php

namespace MyApp;

use DateTime;
use mysqli;
use Psr\Http\Message\ServerRequestInterface;
use React\Http\Message\Response;
use stdClass;

class HttpEndpoint
{
    public function __invoke(ServerRequestInterface $request)
    {
        // Handle HTTP requests
        return Response::plaintext("Hello from HTTP endpoint!");
    }
}

function connectToDatabase()
{
    $servername = "127.0.0.1";
    $username = "root";
    $password = "";
    $dbname = "chat-test";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    echo "DB connected";

    return $conn;
}

function getUserOrCreate(ServerRequestInterface $request)
{
    $rawBody = $request->getBody()->getContents();
    print ($rawBody);
    $parsedBody = json_decode($rawBody, true);

    $name = $parsedBody['name'] ?? null;
    $conn = connectToDatabase();

    $stmt = $conn->prepare("SELECT * FROM users WHERE name = ?");
    $stmt->bind_param("s", $name);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        $room = $user["room"];
        $user_id = $user["id"];
        $status = $user["status"];
        if ($status == 0) {
            return Response::json(["error" => true, "user" => $user, "message" => "This user is online now. Please login with another user name or try it later."]);
        }
        // $stmt = $conn->prepare("UPDATE users SET status = 0, updated_at=? WHERE id = ?");
        // $stmt->bind_param("si", $current, $user_id);
        // $stmt->execute();
        updateUserStatus($room, 0);
    } else {
        $current = date('Y-m-d\TH:i:s.v\Z');
        $room = generateUniqueId("room");
        $avatar = "user" . rand(2, 7) . ".png";
        $stmt = $conn->prepare("INSERT INTO users (name, room, avatar, created_at, updated_at) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $name, $room, $avatar, $current, $current);
        $stmt->execute();
        $user_id = $stmt->insert_id;
        $user = ["id" => $user_id, "name" => $name, "room" => $room, "avatar" => $avatar];
    }

    $stmt = $conn->prepare("SELECT * FROM users WHERE name = 'admin'");
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $admin = $result->fetch_assoc();
    }

    $messages = [];
    if ($user_id === 1) {
        $stmt = $conn->prepare("SELECT * FROM messages ORDER BY created_at ASC");
    } else {
        $stmt = $conn->prepare("SELECT * FROM messages WHERE room = ? ORDER BY created_at ASC");
        $stmt->bind_param("s", $room);
    }
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $messages[] = $row;
        }
    }

    $pinned = [];
    if ($user_id === 1) {
        // $stmt = $conn->prepare("SELECT * FROM pinned ORDER BY created_at DESC");
        $stmt = $conn->prepare("
            SELECT m.*, p.id, p.message_id
            FROM pinned p
            INNER JOIN messages m ON p.message_id = m.id
            ORDER BY p.created_at DESC
        ");
    } else {
        // $stmt = $conn->prepare("SELECT * FROM pinned WHERE room = ? ORDER BY created_at DESC");
        $stmt = $conn->prepare("
            SELECT m.*, p.id, p.message_id
            FROM pinned p
            INNER JOIN messages m ON p.message_id = m.id
            WHERE p.room = ?
            ORDER BY p.created_at DESC
        ");
        $stmt->bind_param("s", $room);
    }
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $pinned[] = $row;
        }
    }

    $attachments = [];
    if ($user_id === 1) {
        // $stmt = $conn->prepare("SELECT * FROM attachments ORDER BY created_at DESC");
        $stmt = $conn->prepare("
            SELECT p.*
            FROM attachments p
            INNER JOIN messages m ON p.message_id = m.id
            ORDER BY p.created_at DESC
        ");
    } else {
        // $stmt = $conn->prepare("SELECT * FROM attachments WHERE room = ? ORDER BY created_at DESC");
        $stmt = $conn->prepare("
            SELECT p.*
            FROM attachments p
            INNER JOIN messages m ON p.message_id = m.id
            WHERE p.room = ?
            ORDER BY p.created_at DESC
        ");
        $stmt->bind_param("s", $room);
    }
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $attachments[] = $row;
        }
    }

    $users = [];
    if ($user_id === 1) {
        $stmt = $conn->prepare("SELECT * FROM users WHERE id != 1 ORDER BY status ASC");
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $users[] = $row;
            }
        }
    }

    $stmt->close();
    $conn->close();

    return Response::json(["user" => $user, "admin" => $admin, "messages" => $messages, "users" => $users, "pinned" => $pinned, "attachments" => $attachments]);
}

function updateUserStatus($room, $status = 0)
{
    if (empty($room))
        return;
    try {
        $current = date('Y-m-d\TH:i:s.v\Z');
        var_dump($current);
        $conn = connectToDatabase();
        $stmt = $conn->prepare("UPDATE users SET updated_at=?, status = ? WHERE room = ?");
        $stmt->bind_param("sis", $current, $status, $room);
        $stmt->execute();

        $stmt->close();
        $conn->close();
    } catch (\Throwable $th) {
        print_r($th);
    }
}

function updateMessageStatus(ServerRequestInterface $request)
{
    try {
        $rawBody = $request->getBody()->getContents();
        $parsedBody = json_decode($rawBody, true);

        $id = $parsedBody['id'] ?? null;
        $status = $parsedBody['status'] ?? null;
        $conn = connectToDatabase();
        $current = date('Y-m-d\TH:i:s.v\Z');
        $stmt = $conn->prepare("UPDATE messages SET status = ?, updated_at=? WHERE id = ?");
        $stmt->bind_param("ssi", $status, $current, $id);
        $stmt->execute();
        return Response::json(["message" => "OK"]);
    } catch (\Throwable $th) {
        print_r($th);
        return Response::json(["error" => $th])->withStatus(400);
    }
}

function updateMessagePin($room, $id, $message_id)
{
    try {
        $conn = connectToDatabase();

        $stmt = $conn->prepare("SELECT * FROM pinned WHERE message_id = ? OR id = ?");
        $stmt->bind_param("ss", $message_id, $id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $pinned = $result->fetch_assoc();
            $pinned_id = $pinned["id"];
            $stmt = $conn->prepare("DELETE FROM pinned WHERE id = ?");
            $stmt->bind_param("i", $pinned_id);
            $stmt->execute();
        } else {
            $current = date('Y-m-d\TH:i:s.v\Z');
            $stmt = $conn->prepare("INSERT INTO pinned (id, room, message_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?)");
            $stmt->bind_param("sssss", $id, $room, $message_id, $current, $current);
            $stmt->execute();
        }

        return Response::json(["message" => "OK"]);
    } catch (\Throwable $th) {
        print_r($th);
        return Response::json(["error" => $th])->withStatus(400);
    }
}

function uploadFile(ServerRequestInterface $request)
{
    try {
        // var_dump($request);
        // var_dump($_FILES);
        $uploadedFiles = $request->getUploadedFiles();
        var_dump("File uploading...");

        $length = count($uploadedFiles);

        if ($length === 0) {
            return Response::plaintext("File not found on body!");
        }
        var_dump($length . ' files are uploaded!');

        for ($i = 0; $i < $length; $i++) {
            $file = $uploadedFiles['file_' . $i];
            $targetFile = "uploads/" . time() . "-" . $file->getClientFilename();
            if ($file->getError() === UPLOAD_ERR_OK) {
                var_dump("Start moving to target!");
                $contents = (string) $file->getStream();
                $fileSize = (string) $file->getSize();
                file_put_contents($targetFile, $contents);
                $paths[] = [
                    "path" => $targetFile,
                    "size" => $fileSize
                ];
            }
        }

        return Response::json(["path" => $paths]);
    } catch (\Throwable $e) {
        var_dump($e->getmessage());
        return Response::json("Error uploading file");
    }
}

function uploadResourceFile(ServerRequestInterface $request)
{
    try {
        // var_dump($request);
        // var_dump($_FILES);
        $uploadedFiles = $request->getUploadedFiles();
        var_dump("File uploading...");

        $length = count($uploadedFiles);

        if ($length === 0) {
            return Response::plaintext("File not found on body!");
        }
        var_dump($length . ' files are uploaded!');

        for ($i = 0; $i < $length; $i++) {
            $file = $uploadedFiles['file_' . $i];
            $filename = $file->getClientFilename();
            $fileExtension = pathinfo($filename, PATHINFO_EXTENSION);
            $targetFile = "resources/" . time() . "." . $fileExtension;
            if ($file->getError() === UPLOAD_ERR_OK) {
                var_dump("Start moving to target!");
                $contents = (string) $file->getStream();
                $fileSize = (string) $file->getSize();
                file_put_contents($targetFile, $contents);
                $resources[] = [
                    "title" => $filename,
                    "type" => $fileExtension,
                    "download_url" => $targetFile
                ];
                $command = escapeshellcmd("python embed.py $targetFile file");
                shell_exec($command);

                $conn = connectToDatabase();
                $stmt = $conn->prepare("INSERT INTO resources (title, type, download_url) VALUES (?, ?, ?)");
                $stmt->bind_param(
                    "sss",
                    $filename,
                    $fileExtension,
                    $targetFile
                );
                $stmt->execute();
            }
        }

        return Response::json(["resources" => $resources]);
    } catch (\Throwable $e) {
        var_dump($e->getmessage());
        return Response::json("Error uploading file");
    }
}

function getResources()
{
    $resources = [
        "url" => [],
        "file" => [],
        "content" => [],
    ];
    $conn = connectToDatabase();
    $stmt = $conn->prepare("
        SELECT * FROM resources
    ");
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            if ($row["type"] == "url") {
                $resources["url"][] = $row;
            } else if ($row["type"] == "content") {
                $resources["content"][] = $row;
            } else {
                $resources["file"][] = $row;
            }
        }
    }
    return Response::json(["resources" => $resources]);
}

function addURL(ServerRequestInterface $request)
{
    $rawBody = $request->getBody()->getContents();
    $parsedBody = json_decode($rawBody, true);
    $url = $parsedBody["url"];

    $command = escapeshellcmd("python urls.py $url");
    $output = shell_exec($command);

    if ($output) {
        return Response::json(["links" => json_decode($output)]);
    } else {
        return Response::json("Error");
    }
}

function trainURL(ServerRequestInterface $request)
{
    // $conn = connectToDatabase();
    $rawBody = $request->getBody()->getContents();
    print ($rawBody);
    $parsedBody = json_decode($rawBody, true);
    $url = $parsedBody["url"];

    $conn = connectToDatabase();
    $stmt = $conn->prepare("INSERT INTO resources (title, type, download_url) VALUES (?, 'url', '')");
    $stmt->bind_param(
        "s",
        $url
    );
    $stmt->execute();

    foreach (json_decode($parsedBody["urls"]) as $record) {
        $command = escapeshellcmd("python embed.py $record url");
        $output = shell_exec($command);

        if ($output) {
            // $conn = connectToDatabase();
            // $stmt = $conn->prepare("INSERT INTO resources (title, type, download_url) VALUES (?, 'url', '')");
            // $stmt->bind_param(
            //     "s",
            //     $url
            // );
            // $stmt->execute();

            // $resource = [
            //     "title" => $url,
            //     "type" => "url",
            //     "download_url" => ""
            // ];
            return Response::json(["response" => true]);
        } else {
            return Response::json("Error");
        }
    }
}

function trainContent(ServerRequestInterface $request)
{
    // $conn = connectToDatabase();
    $rawBody = $request->getBody()->getContents();
    print ($rawBody);
    $parsedBody = json_decode($rawBody, true);

    $conn = connectToDatabase();
    $stmt = $conn->prepare("INSERT INTO resources (title, type, download_url) VALUES (?, 'content', '')");
    $stmt->bind_param(
        "s",
        $parsedBody["content"]
    );
    $stmt->execute();

    $content = $parsedBody["content"];
    $command = escapeshellcmd("python embed.py $content content");
    shell_exec($command);

    return Response::json(["response" => true]);
}

function trainQA(ServerRequestInterface $request)
{
    // $conn = connectToDatabase();
    $content = "";
    $rawBody = $request->getBody()->getContents();
    print ($rawBody);
    $parsedBody = json_decode($rawBody, true);

    foreach ($parsedBody["qa"] as $qa) {
        $content .= "(Question: " . $qa["question"] . ", Answer: " . $qa["answer"];
    }
    $command = escapeshellcmd("python embed.py $content content");
    shell_exec($command);

    return Response::json(["response" => true]);
}

function sendEmail(ServerRequestInterface $request)
{
    $rawBody = $request->getBody()->getContents();
    $parsedBody = json_decode($rawBody, true);
    $email = $parsedBody["email"];
    $content = $parsedBody["content"];
    $trigger = $parsedBody["trigger"];
    $user_name = $parsedBody["user_name"];
    $order_id = $parsedBody["order_id"];
    $order_status = $parsedBody["order_status"];
    $keywords = $parsedBody["keywords"];
    $histories = [];

    $conn = connectToDatabase();

    $stmt = $conn->prepare("SELECT * FROM mail_guests WHERE email=? LIMIT 1");
    $stmt->bind_param(
        "s",
        $email
    );
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows === 0) {
        $stmt = $conn->prepare("INSERT INTO mail_guests (id, email) VALUES (UUID(), ?)");
        $stmt->bind_param(
            "s",
            $email
        );
        $stmt->execute();
    }

    var_dump($rawBody);

    $command = escapeshellcmd("python mail.py \"$content\" \"$trigger\" \"$email\" \"$user_name\" \"$order_id\" \"$order_status\" \"$keywords\"");
    // print ($command);
    $output = shell_exec($command);

    $stmt = $conn->prepare("INSERT INTO mail_history (email, content, request_type, response) VALUES (?,?,?,?)");
    $stmt->bind_param(
        "ssss",
        $email,
        $content,
        $trigger,
        $output
    );
    $stmt->execute();

    return Response::json(["response" => true]);
}

function saveMessage($room, $message, $sent = true)
{
    $created_at = date('Y-m-d\TH:i:s.v\Z', strtotime($message->created_at));
    $updated_at = date('Y-m-d\TH:i:s.v\Z', strtotime($message->updated_at));

    $conn = connectToDatabase();

    $stmt = $conn->prepare("INSERT INTO messages (id, text, room, attachments, `from`, `to`, created_at, updated_at, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $sttachments_str = json_encode($message->attachments);
    $stmt->bind_param(
        "sssssssss",
        $message->id,
        $message->text,
        $message->room,
        $sttachments_str,
        $message->from,
        $message->to,
        $message->created_at,
        $message->updated_at,
        $message->status,
    );
    $stmt->execute();

    if ($message->attachments && count($message->attachments)) {
        $mediaTypes = ['png', 'jpg', 'jpeg', 'webp'];
        foreach ($message->attachments as $key => $value) {
            try {
                $ext = strtolower(pathinfo($value->path, PATHINFO_EXTENSION));
                $type = in_array($ext, $mediaTypes) ? 'media' : 'file';
                $sql = "INSERT INTO attachments (room, message_id, `url`, `type`, size, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param(
                    "sssssss",
                    $room,
                    $message->id,
                    $value->path,
                    $type,
                    $value->size,
                    $created_at,
                    $updated_at,
                );
                if ($stmt === false) {
                    die('Prepare failed: ' . htmlspecialchars($conn->error));
                }
                $stmt->execute();
            } catch (\Throwable $e) {
                var_dump($e->getmessage());
                return Response::json("error");
            }
        }
    }

    $stmt->close();
    $conn->close();
}

function addBotEmail(ServerRequestInterface $request)
{
    $rawBody = $request->getBody()->getContents();
    $parsedBody = json_decode($rawBody, true);
    $email = $parsedBody["email"];
    $password = $parsedBody["password"];

    $conn = connectToDatabase();

    $stmt = $conn->prepare("SELECT * FROM email_bots WHERE email=? LIMIT 1");
    $stmt->bind_param(
        "s",
        $email
    );
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows === 0) {
        $stmt = $conn->prepare("INSERT INTO email_bots (email, password) VALUES (?, ?)");
        $stmt->bind_param(
            "ss",
            $email,
            $password
        );
        $stmt->execute();
        return Response::json(["response" => true]);
    } else {
        return Response::json(["response" => false]);
    }
}

function getBotEmails(ServerRequestInterface $request)
{
    $bot_emails = [];
    $conn = connectToDatabase();

    $stmt = $conn->prepare("SELECT * FROM email_bots");
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows !== 0) {
        while ($row = $result->fetch_assoc()) {
            $bot_emails[] = $row;
        }
    }

    return Response::json(["emails" => $bot_emails]);
}

function deleteBotEmail(ServerRequestInterface $request)
{
    $rawBody = $request->getBody()->getContents();
    $parsedBody = json_decode($rawBody, true);
    $email = $parsedBody["email"];

    $conn = connectToDatabase();

    $stmt = $conn->prepare("DELETE FROM email_bots WHERE email=?");
    $stmt->bind_param(
        "s",
        $email
    );
    $stmt->execute();
    return Response::json(["response" => true]);
}

function addTriggerEmail(ServerRequestInterface $request)
{
    $rawBody = $request->getBody()->getContents();
    $parsedBody = json_decode($rawBody, true);
    $email = $parsedBody["email"];
    $trigger_type = $parsedBody["type"];

    $conn = connectToDatabase();

    $stmt = $conn->prepare("SELECT * FROM email_triggers WHERE trigger_type=? LIMIT 1");
    $stmt->bind_param(
        "s",
        $trigger_type,
    );
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows === 0) {
        $stmt = $conn->prepare("INSERT INTO email_triggers (trigger_type, email_id) VALUES (?, ?)");
        $stmt->bind_param(
            "ss",
            $trigger_type,
            $email
        );
        $stmt->execute();
        return Response::json(["response" => true]);
    } else {
        $stmt = $conn->prepare("UPDATE email_triggers SET email_id=? WHERE trigger_type=?");
        $stmt->bind_param(
            "ss",
            $email,
            $trigger_type,

        );
        $stmt->execute();
        return Response::json(["response" => false]);
    }
}

function getTriggerEmails(ServerRequestInterface $request)
{
    $conn = connectToDatabase();

    $stmt = $conn->prepare("SELECT * FROM email_triggers LEFT JOIN email_bots ON email_bots.id = email_triggers.email_id");
    $stmt->execute();
    $result = $stmt->get_result();
    $email_triggers = [];

    while ($row = $result->fetch_assoc()) {
        $email_triggers[$row["trigger_type"]] = $row["email"];
    }

    return Response::json(["email_triggers" => $email_triggers]);
}

function getTriggers(ServerRequestInterface $request)
{
    $conn = connectToDatabase();

    $stmt = $conn->prepare("SELECT * FROM triggers");
    $stmt->execute();
    $result = $stmt->get_result();
    $triggers = [];

    while ($row = $result->fetch_assoc()) {
        $triggers[] = $row;
    }

    return Response::json(["triggers" => $triggers]);
}

function addTrigger(ServerRequestInterface $request)
{
    $rawBody = $request->getParsedBody();
    $trigger_type = $rawBody["trigger_type"];
    $title = $rawBody["title"];
    $response = $rawBody["response"];
    print_r($response);
    $conn = connectToDatabase();

    try {
        // var_dump($request);
        // var_dump($_FILES);
        $uploadedFiles = $request->getUploadedFiles();
        var_dump("File uploading...");

        $length = count($uploadedFiles);

        if ($length === 0) {
            return Response::plaintext("File not found on body!");
        }
        var_dump($length . ' files are uploaded!');


        $file = $uploadedFiles['file'];
        $filename = $file->getClientFilename();
        $fileExtension = pathinfo($filename, PATHINFO_EXTENSION);
        $targetFile = "uploads/" . time() . "." . $fileExtension;
        if ($file->getError() === UPLOAD_ERR_OK) {
            var_dump("Start moving to target!");
            $contents = (string) $file->getStream();
            file_put_contents($targetFile, $contents);
        }
    } catch (\Throwable $e) {
        var_dump($e->getmessage());
    }

    $stmt = $conn->prepare("SELECT * FROM triggers WHERE trigger_type=? LIMIT 1");
    $stmt->bind_param(
        "s",
        $trigger_type,
    );
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows === 0) {
        $stmt = $conn->prepare("INSERT INTO triggers (trigger_type, title, response, file) VALUES (?, ?, ?, ?)");
        $stmt->bind_param(
            "ssss",
            $trigger_type,
            $title,
            $response,
            $targetFile,
        );
        $stmt->execute();
        return Response::json(["response" => true, "file_path" => $targetFile]);
    } else {
        $stmt = $conn->prepare("UPDATE triggers SET title=?, response=?, file=? WHERE trigger_type=?");
        $stmt->bind_param(
            "ssss",
            $title,
            $response,
            $targetFile,
            $trigger_type,
        );
        $stmt->execute();
        return Response::json(["response" => false, "file_path" => $targetFile]);
    }
}

function saveComponents(ServerRequestInterface $request)
{
    $rawBody = $request->getBody()->getContents();
    $parsedBody = json_decode($rawBody, true);
    $nodes = $parsedBody["nodes"];
    $edges = $parsedBody["edges"];

    $conn = connectToDatabase();

    $stmt = $conn->prepare("DELETE FROM nodes");
    $stmt->execute();
    $stmt = $conn->prepare("DELETE FROM edges");
    $stmt->execute();

    foreach ($nodes as $node) {
        $stmt = $conn->prepare("SELECT * FROM nodes WHERE id=? LIMIT 1");
        $stmt->bind_param(
            "s",
            $node["id"]
        );
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows === 0) {
            $stmt = $conn->prepare("INSERT INTO nodes (id, type, x, y) VALUES (?, ?, ?, ?)");
            $stmt->bind_param(
                "ssss",
                $node["id"],
                $node["type"],
                $node["position"]["x"],
                $node["position"]["y"]
            );
            $stmt->execute();
        } else {
            $stmt = $conn->prepare("UPDATE nodes SET type=?, x=?, y=? WHERE id=?");
            $stmt->bind_param(
                "ssss",
                $node["type"],
                $node["position"]["x"],
                $node["position"]["y"],
                $node["id"]
            );
            $stmt->execute();
        }
    }

    foreach ($edges as $edge) {
        $stmt = $conn->prepare("SELECT * FROM edges WHERE id=? LIMIT 1");
        $stmt->bind_param(
            "s",
            $edge["id"]
        );
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows === 0) {
            $stmt = $conn->prepare("INSERT INTO edges (source, target) VALUES (?, ?)");
            $stmt->bind_param(
                "ss",
                $edge["source"],
                $edge["target"],
            );
            $stmt->execute();
        } else {
            $stmt = $conn->prepare("UPDATE edges SET source=?, target=? WHERE id=?");
            $stmt->bind_param(
                "sss",
                $edge["source"],
                $edge["target"],
                $edge["id"]
            );
            $stmt->execute();
        }
    }

    return Response::json(["response" => true]);
}

function getComponents(ServerRequestInterface $request)
{
    $conn = connectToDatabase();

    $stmt = $conn->prepare("SELECT * FROM nodes");
    $stmt->execute();
    $result = $stmt->get_result();
    $nodes = [];

    while ($row = $result->fetch_assoc()) {
        $nodes[] = $row;
    }

    $stmt = $conn->prepare("SELECT * FROM edges");
    $stmt->execute();
    $result = $stmt->get_result();
    $edges = [];

    while ($row = $result->fetch_assoc()) {
        $edges[] = $row;
    }

    return Response::json(["nodes" => $nodes, "edges" => $edges]);
}

function generateUniqueId($data = "message")
{
    return uniqid($data . '-', true);
}

function createMessage($room, $message, $from, $to, $status = "unread")
{
    $date = new DateTime();
    $formattedDate = $date->format('Y-m-d\TH:i:s.v\Z');
    $msg = new stdClass();
    $msg->room = $room;
    $msg->id = generateUniqueId();
    $msg->text = $message;
    $msg->from = $from;
    $msg->to = $to;
    $msg->attachments = [];
    $msg->created_at = $formattedDate;
    $msg->updated_at = $formattedDate;
    $msg->status = $status;

    return $msg;
}
