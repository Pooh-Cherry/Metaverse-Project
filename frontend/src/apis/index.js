import axios from "axios";
import { SERVER_ADDRESS } from "@constants/config";

export const setMessageStatusAPI = async (id, status = "read") => {
  try {
    const response = await axios.post(SERVER_ADDRESS + "/api/message/status", {
      id,
      status,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const setMessagePinned = async ({ id, room }) => {
  try {
    const response = await axios.post(SERVER_ADDRESS + "/api/message/pin", {
      id,
      room,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const AddURL = async (url) => {
  try {
    const response = await axios.post(SERVER_ADDRESS + "/api/add-url", {
      url,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const TrainURL = async (urls, url) => {
  try {
    const response = await axios.post(SERVER_ADDRESS + "/api/train-url", {
      urls: JSON.stringify(urls),
      url: url,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const TrainContent = async (content) => {
  try {
    const response = await axios.post(SERVER_ADDRESS + "/api/train-content", {
      content: content,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const TrainQA = async (qa) => {
  try {
    const response = await axios.post(SERVER_ADDRESS + "/api/train-qa", {
      qa: JSON.stringify(qa),
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const AddBotEmail = async (data) => {
  try {
    const response = await axios.post(SERVER_ADDRESS + "/api/add-emailbot", {
      email: data.email,
      password: data.password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteBotEmail = async (email) => {
  try {
    const response = await axios.post(SERVER_ADDRESS + "/api/delete-emailbot", {
      email: email,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const GetBotEmails = async () => {
  try {
    const response = await axios.post(SERVER_ADDRESS + "/api/emailbots");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const AddTriggerEmail = async (type, email) => {
  try {
    const response = await axios.post(
      SERVER_ADDRESS + "/api/add-trigger-email",
      {
        type: type,
        email: email,
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTriggerEmails = async () => {
  try {
    const response = await axios.post(
      SERVER_ADDRESS + "/api/get-trigger-emails",
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getResources = async () => {
  try {
    const response = await axios.post(SERVER_ADDRESS + "/api/resources");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const AddTrigger = async (trigger_type, title, content, file) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("trigger_type", trigger_type);
  formData.append("title", title);
  formData.append("response", content);

  try {
    const response = await axios.post(
      SERVER_ADDRESS + "/api/add-trigger",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    if (response.status === 200) {
      console.log("File uploaded successfully");
    } else {
      console.error("Error uploading files");
    }
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const saveComponents = async (nodes, edges) => {
  try {
    const response = await axios.post(SERVER_ADDRESS + "/api/save-components", {
      nodes: nodes,
      edges: edges,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const GetComponents = async () => {
  try {
    const response = await axios.post(SERVER_ADDRESS + "/api/components");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTriggers = async () => {
  try {
    const response = await axios.post(SERVER_ADDRESS + "/api/triggers");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
