-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 28, 2024 at 12:40 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chat-test`
--

-- --------------------------------------------------------

--
-- Table structure for table `attachments`
--

CREATE TABLE `attachments` (
  `id` int(11) NOT NULL,
  `room` varchar(255) NOT NULL,
  `message_id` varchar(255) NOT NULL,
  `url` text NOT NULL,
  `type` varchar(50) NOT NULL,
  `size` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Table structure for table `edges`
--

CREATE TABLE `edges` (
  `id` int(11) NOT NULL,
  `source` varchar(255) DEFAULT NULL,
  `target` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `edges`
--

INSERT INTO `edges` (`id`, `source`, `target`) VALUES
(71, 'start', 'welcome'),
(72, 'start', 'fallback'),
(73, 'start', 'contact_us'),
(74, 'start', 'faq'),
(75, 'fallback', '3MafXuGB4s');

-- --------------------------------------------------------

--
-- Table structure for table `email_bots`
--

CREATE TABLE `email_bots` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `email_bots`
--

INSERT INTO `email_bots` (`id`, `email`, `password`) VALUES
(1, 'dev@sdrive.ai', 'M5XmNE7Qg9E79yV>'),
(12, 'support@potrider.com', 'WRyQ<*RRXG=h5yJ>555');

-- --------------------------------------------------------

--
-- Table structure for table `email_triggers`
--

CREATE TABLE `email_triggers` (
  `id` int(11) NOT NULL,
  `trigger_type` varchar(255) DEFAULT NULL,
  `email_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `email_triggers`
--

INSERT INTO `email_triggers` (`id`, `trigger_type`, `email_id`) VALUES
(17, 'contact_us', 1),
(18, 'faq', 1),
(19, 'welcome', 1),
(20, 'B8NgGiSbUK', 1),
(21, 'fallback', 1);

-- --------------------------------------------------------

--
-- Table structure for table `mail_guests`
--

CREATE TABLE `mail_guests` (
  `id` varchar(50) NOT NULL,
  `email` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `mail_guests`
--

INSERT INTO `mail_guests` (`id`, `email`) VALUES
('16e9104f-a8b0-11ef-af1e-525400faa0cf', 'aimachinelearning@gmail.com'),
('2d47b59f-a1b9-11ef-9023-047c1618eeb0', 'scottralph650@gmail.com'),
('37aee373-a8a5-11ef-af1e-525400faa0cf', 'softensofwares@gmail.com'),
('697cdeeb-a8b0-11ef-af1e-525400faa0cf', 'aimachinelearningpro@gmail.com'),
('7e3a661d-a8a5-11ef-af1e-525400faa0cf', 'softensoftwares@gmail.com'),
('c30f2016-a1c1-11ef-9023-047c1618eeb0', 'eastonjin90@gmail.com'),
('f0e98ffa-a957-11ef-af1e-525400faa0cf', 'easton.jin1990@hotmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `mail_history`
--

CREATE TABLE `mail_history` (
  `id` int(11) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `request_type` varchar(255) DEFAULT NULL,
  `response` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `mail_history`
--

INSERT INTO `mail_history` (`id`, `email`, `content`, `request_type`, `response`) VALUES
(58, 'scottralph650@gmail.com', 'What\'s the price of that product?', 'welcome', 'Hi, guys\n'),
(59, 'scottralph650@gmail.com', 'What\'s the price of that product?', 'welcome', 'Hi, guys\n'),
(60, 'scottralph650@gmail.com', 'What\'s the price of that product?', 'welcome', '232323232\n'),
(61, 'scottralph650@gmail.com', 'What\'s the price of that product?', 'welcome', '232323232\n'),
(62, 'scottralph650@gmail.com', 'What\'s the price of that product?', 'welcome', '232323232\n'),
(63, 'eastonjin90@gmail.com', 'What kinds of product do you provide?', 'contact_us', 'Dear Elliot Bollet,\n\nWe appreciate your contact and are here to assist you with your inquiry.\n\nChillin Cheetah offers a wide range of cannabis-related products. Our selection includes cannabis flowers, edibles, concentrates, vape pens, CBD products, accessories, and topicals. We cater to various preferences with options in hybrid, sativa, and indica genetics.\n\nIf there?s anything else we can help you with, don?t hesitate to reach out. \n\nBest regards,  \nCustomer Support Team\n\nhttps://chillincheetah.ca/shop\nDear Elliot Bollet,\n\nWe appreciate your contact and are here to assist you with your inquiry.\n\nChillin Cheetah offers a wide range of cannabis-related products. Our selection includes cannabis flowers, edibles, concentrates, vape pens, CBD products, accessories, and topicals. We cater to various preferences with options in hybrid, sativa, and indica genetics.\n\nIf there?s anything else we can help you with, don?t hesitate to reach out. \n\nBest regards,  \nCustomer Support Team\n\nhttps://chillincheetah.ca/shop\n'),
(64, 'eastonjin90@gmail.com', 'What kinds of product do you provide?', 'faq', 'Chillin Cheetah offers a variety of cannabis products, including:\n\n1. Cannabis Flower: Available in hybrid, sativa, and indica varieties.\n2. Edibles: Offered in hybrid, sativa, and indica options.\n3. Concentrates: Includes hybrid, sativa, and indica types.\n4. Vape Pens: Available in hybrid, sativa, and indica forms.\n5. CBD Products: A range of CBD items.\n6. Accessories: Various cannabis-related accessories.\n7. Topicals: Cannabis-infused topical products.\n\nThese products are available for delivery in several locations, with a 1-hour delivery option.\n'),
(65, 'softensofwares@gmail.com', 'What kinds of product do you provide?', 'welcome', 'Welcome\n'),
(66, 'eastonjin90@gmail.com', 'What kinds of product do you provide?', 'welcome', 'Welcome\n'),
(67, 'softensoftwares@gmail.com', 'What kinds of product do you provide?', 'welcome', 'Welcome\n'),
(68, 'softensoftwares@gmail.com', 'What kinds of product do you provide?', 'welcome', 'Welcome\n'),
(69, 'eastonjin90@gmail.com', 'What kinds of product do you provide?', 'welcome', 'Welcome\n'),
(70, 'aimachinelearning@gmail.com', '', 'welcome', 'Welcome\n'),
(71, 'aimachinelearningpro@gmail.com', '', 'welcome', 'Welcome\n'),
(72, 'easton.jin1990@hotmail.com', 'Can you tell me about your company please?', 'contact_us', 'Dear Elliot Bollet,\n\nWe appreciate your contact and are here to assist you with your inquiry.\n\nChillin Cheetah is an online dispensary offering premium cannabis products with a focus on fast delivery services. We provide a wide range of cannabis strains including Sativa, Indica, and Hybrid, as well as products like Weed Flower, Edibles, Vape Pens, Concentrates, CBD, Accessories, and Topicals. Our service areas include the Greater Toronto Area and regions like Halton and Peel, ensuring delivery in under an hour. We are committed to providing a seamless shopping experience with features like a satisfaction guarantee, exclusive CHEETAH CA$H rewards, and personalized coupons. Our delivery hours are from 10:00 AM to 10:00 PM, seven days a week.\n\nIf there?s anything else we can help you with, don?t hesitate to reach out. \n\nBest regards,\nCustomer Support Team\n\nhttps://chillincheetah.ca/about\nDear Elliot Bollet,\n\nWe appreciate your contact and are here to assist you with your inquiry.\n\nChillin Cheetah is an online dispensary offering premium cannabis products with a focus on fast delivery services. We provide a wide range of cannabis strains including Sativa, Indica, and Hybrid, as well as products like Weed Flower, Edibles, Vape Pens, Concentrates, CBD, Accessories, and Topicals. Our service areas include the Greater Toronto Area and regions like Halton and Peel, ensuring delivery in under an hour. We are committed to providing a seamless shopping experience with features like a satisfaction guarantee, exclusive CHEETAH CA$H rewards, and personalized coupons. Our delivery hours are from 10:00 AM to 10:00 PM, seven days a week.\n\nIf there?s anything else we can help you with, don?t hesitate to reach out. \n\nBest regards,\nCustomer Support Team\n\nhttps://chillincheetah.ca/about\n');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` varchar(255) NOT NULL,
  `room` varchar(255) DEFAULT NULL,
  `text` text NOT NULL,
  `attachments` text NOT NULL,
  `from` varchar(50) NOT NULL,
  `to` varchar(50) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp(),
  `status` enum('read','unread') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `room`, `text`, `attachments`, `from`, `to`, `created_at`, `updated_at`, `status`) VALUES
('005545ab-1060-4abb-ae42-b910bbca49af', 'room-6722937156bad1.65950849', 'hello', '[]', '10', '1', '2024-10-30 20:13:52', '2024-10-30 20:13:52', 'unread'),
('02c4b870-fcdf-41a1-b71d-6a8f2a1951da', 'room-672140ebd173c8.52489701', 'how to set parameter dynamically by the count of records on a dataset by default in aws quicksight', '[]', '6', '1', '2024-10-29 21:03:32', '2024-10-29 21:03:32', 'unread'),
('045845f0-c42a-45f3-ab37-79f6aa21db71', 'room-67219dd8146be8.72012602', 'what is openai api?', '[]', '8', '1', '2024-10-30 18:53:38', '2024-10-30 18:53:38', 'unread'),
('0512ffde-13bf-436d-a50e-95dc31649366', 'room-67319302e85405.13622733', 'Do you know \"Nature\'s Healing CBD Salve\"', '[]', '12', '1', '2024-11-11 15:12:29', '2024-11-11 15:12:29', 'unread'),
('0610fb4a-133a-44bb-9a55-ce2daedeaa98', 'room-67319302e85405.13622733', 'Hello', '[]', '12', '1', '2024-11-12 14:43:08', '2024-11-12 14:43:08', 'unread'),
('0a844f2a-2d0f-4101-a565-a5cfabe96327', 'room-67219dd8146be8.72012602', 'asdfasdf asas dfasd as', '[]', '8', '1', '2024-10-30 19:03:48', '2024-10-30 19:03:48', 'unread'),
('0da1d37c-2e00-49f1-b80f-b35a27b8f4dc', 'room-67319302e85405.13622733', 'How many products are there in chillincheetah.ca?', '[]', '12', '1', '2024-11-11 13:00:07', '2024-11-11 13:00:07', 'unread'),
('0edd4bc6-42e8-47ef-a94b-5c84b942a7c3', 'room-67319302e85405.13622733', 'Hello', '[]', '12', '1', '2024-11-11 12:36:53', '2024-11-11 12:36:53', 'unread'),
('0ff4483e-4b75-4bef-9d8b-803c3f544bcf', 'room-67218e55d8a146.20769408', 'hi', '[]', '7', '1', '2024-10-30 01:39:41', '2024-10-30 01:39:41', 'unread'),
('123d6133-7ce9-4e6a-af93-b1450e2eb976', 'room-671fc2f180b095.03453390', 'which version ', '[]', '2', '1', '2024-10-28 17:05:33', '2024-10-28 17:33:31', 'read'),
('13f97a18-73e3-4bfc-afc2-0a925194dc20', 'room-67219e6da483c3.84741858', 'you are so genius', '[]', '9', '1', '2024-10-30 18:48:10', '2024-10-30 18:48:10', 'unread'),
('16215b1d-a71a-4b17-b8e7-0cce22a8308d', 'room-67319302e85405.13622733', 'Hello', '[]', '12', '1', '2024-11-12 14:48:32', '2024-11-12 14:48:32', 'unread'),
('1b8ce182-5895-48af-beb3-732f155db972', 'room-67319302e85405.13622733', 'What is CBN and How It Differs from CBD and THC?', '[]', '12', '1', '2024-11-11 14:59:50', '2024-11-11 14:59:50', 'unread'),
('1bc6e86f-fefb-432b-a2f7-447f391a1964', 'room-67319302e85405.13622733', 'Why Should You Consider Using Cannabis Daily to Enhance Focus and Clarity?', '[]', '12', '1', '2024-11-11 12:48:22', '2024-11-11 12:48:22', 'unread'),
('1d875d1d-6439-47a3-8c62-93877f1a30ed', 'room-67319302e85405.13622733', 'What is CBN value of Pinkman Goo?', '[]', '12', '1', '2024-11-11 15:32:49', '2024-11-11 15:32:49', 'unread'),
('1e703552-3aae-451b-b575-bdc35e57eb26', 'room-672068c34cb3a0.33812846', 'Test', '[]', '4', '1', '2024-10-29 04:48:34', '2024-10-29 04:48:46', 'read'),
('1fb5d01a-bfa5-44d9-9321-802d4bfdf78d', 'room-67319302e85405.13622733', 'How many accessories products are there?', '[]', '12', '1', '2024-11-11 15:14:20', '2024-11-11 15:14:20', 'unread'),
('228a07de-2711-4878-96d2-a8fc383c91d6', 'room-67319302e85405.13622733', 'Okay, I want to buy flower in https://chillincheetah.ca/. What do you recommend?', '[]', '12', '1', '2024-11-11 15:31:04', '2024-11-11 15:31:04', 'unread'),
('2399cc2e-e27f-48ab-9592-8e24d04f84dc', 'room-67319302e85405.13622733', 'What is the price of bike?', '[]', '12', '1', '2024-11-12 14:55:54', '2024-11-12 14:55:54', 'unread'),
('24218e8d-09e6-4f58-abcd-1a72d1f60850', 'room-672140ebd173c8.52489701', 'how to change the parameter dynamically by the calculated field on a dataset in aws quicksight?', '[]', '6', '1', '2024-10-29 20:41:15', '2024-10-29 20:41:15', 'unread'),
('24b738d4-13b5-494b-8d94-1091e2d16d5c', 'room-671fc2f180b095.03453390', 'are you able to learn my business model \n', '[]', '2', '1', '2024-10-28 17:03:30', '2024-10-28 17:33:29', 'read'),
('2515a6c8-cd5d-4d82-bdf1-67a3125df2cc', 'room-672140ebd173c8.52489701', 'do you know aws quicksight?', '[]', '6', '1', '2024-10-29 20:08:43', '2024-10-29 20:08:43', 'unread'),
('25809593-8569-4daf-8422-cd42680f0e83', 'room-67319302e85405.13622733', 'Why Should You Consider Using Cannabis Daily to Enhance Focus and Clarity?', '[]', '12', '1', '2024-11-11 12:47:28', '2024-11-11 12:47:28', 'unread'),
('25c3851f-3bc5-4269-ada0-fecf28480853', 'room-67319302e85405.13622733', 'What is cat?', '[]', '12', '1', '2024-11-12 16:06:35', '2024-11-12 16:06:35', 'unread'),
('263cccfe-88a0-409f-9ca6-d76639ca0d8b', 'room-67319302e85405.13622733', 'Why Should You Consider Using Cannabis Daily to Enhance Focus and Clarity?', '[]', '12', '1', '2024-11-11 12:47:07', '2024-11-11 12:47:07', 'unread'),
('2aaebf71-d0e7-49fe-bc7c-1af7af66bdd4', 'room-672140ebd173c8.52489701', 'okay, I have some data to display with it as a table, and also an image to diaplay on it.\nData is from spice, and when there\'s data, display only the data table, and when there\'s not, display only the image.\nis this possible? if so, how to do this?', '[]', '6', '1', '2024-10-29 20:10:35', '2024-10-29 20:10:35', 'unread'),
('2d079bae-f75f-4983-a3ae-af115be4c9cd', 'room-671fc2f180b095.03453390', 'hello \n', '[]', '2', '1', '2024-10-28 16:59:58', '2024-10-28 17:33:29', 'read'),
('2f19c7a2-c725-48a6-9f99-fc92d7356e75', 'room-67319302e85405.13622733', 'Hello', '[]', '12', '1', '2024-11-12 14:55:33', '2024-11-12 14:55:33', 'unread'),
('33f96157-be34-4caa-8b92-f0c020ee2bee', 'room-67319302e85405.13622733', 'Hello', '[]', '12', '1', '2024-11-12 14:45:52', '2024-11-12 14:45:52', 'unread'),
('37ed5b04-9461-4416-8f57-99a1abe7364e', 'room-67319302e85405.13622733', 'Hello', '[]', '12', '1', '2024-11-11 15:35:50', '2024-11-11 15:35:50', 'unread'),
('3a6ac8f4-8b4f-45a3-98bd-be3108401588', 'room-67319302e85405.13622733', 'Hello', '[]', '12', '1', '2024-11-12 14:43:42', '2024-11-12 14:43:42', 'unread'),
('3a8afe54-b4e5-48f2-9351-81c895efdb58', 'room-671fc6bc9d5e14.74656257', 'Which animal is the strongest in the world', '[]', '3', '1', '2024-10-28 17:17:56', '2024-10-28 17:34:06', 'read'),
('3bc0909b-e97f-40e3-b013-302dfe9e7d29', 'room-672068c34cb3a0.33812846', 'I am good thanks ', '[]', '1', '4', '2024-10-29 04:49:22', '2024-10-29 04:49:22', 'read'),
('41b5e33f-aabd-45bf-9a18-d07c0378ebe7', 'room-67319302e85405.13622733', 'What is CBN and How It Differs from CBD and THC?', '[]', '12', '1', '2024-11-11 14:59:05', '2024-11-11 14:59:05', 'unread'),
('46d1bd0f-ea95-4064-b8ae-70b671e5b471', 'room-671fc6bc9d5e14.74656257', 'What is the highest mountain in the world?', '[]', '3', '1', '2024-10-28 17:17:36', '2024-10-28 17:34:06', 'read'),
('4815f774-0431-4143-93a9-4d6905cc1eb8', 'room-67319302e85405.13622733', 'What is AK 47 Weed?', '[]', '12', '1', '2024-11-11 15:36:18', '2024-11-11 15:36:18', 'unread'),
('4b8f3fa7-54c9-4858-bb92-d7394db520be', 'room-671fc2f180b095.03453390', 'are you chatgpt 3.5 ', '[]', '2', '1', '2024-10-28 17:05:48', '2024-10-28 17:33:29', 'read'),
('5039f140-0e40-4745-b47c-f05f03bbb2a7', 'room-67319302e85405.13622733', 'What is CBN and How It Differs from CBD and THC', '[]', '12', '1', '2024-11-11 13:01:08', '2024-11-11 13:01:08', 'unread'),
('505cc60a-2418-4f83-a509-957339436ed1', 'room-67319302e85405.13622733', 'What is CBN and How It Differs from CBD and THC?', '[]', '12', '1', '2024-11-11 14:59:36', '2024-11-11 14:59:36', 'unread'),
('538b9f3f-169a-40d4-a1c8-a71ed81c08f8', 'room-672068c34cb3a0.33812846', 'Hey how are you ??', '[]', '4', '1', '2024-10-29 04:49:12', '2024-10-29 04:49:16', 'read'),
('5516c6ef-9c27-4a67-b34e-fa4772ec2f87', 'room-671fc2f180b095.03453390', 'which ai company are you from ', '[]', '2', '1', '2024-10-28 17:05:25', '2024-10-28 17:33:29', 'read'),
('56f00036-7c18-4d22-9e1c-aac961b797f6', 'room-671fc2f180b095.03453390', 'can you send links to my clients ', '[]', '2', '1', '2024-10-28 17:04:42', '2024-10-28 17:33:29', 'read'),
('57536769-ffb1-4ef1-a634-e793edc614c0', 'room-67319302e85405.13622733', 'Hello', '[]', '12', '1', '2024-11-12 14:51:31', '2024-11-12 14:51:31', 'unread'),
('5d91c3d7-f85c-410b-88f8-588513adaf46', 'room-67319302e85405.13622733', 'Why Should You Consider Using Cannabis Daily to Enhance Focus and Clarity?', '[]', '12', '1', '2024-11-11 12:40:16', '2024-11-11 12:40:16', 'unread'),
('5e4f3392-edb1-4042-b9ba-6e6f350ee492', 'room-67319302e85405.13622733', 'Okay, I want to buy flower. What do you recommend?', '[]', '12', '1', '2024-11-11 15:30:25', '2024-11-11 15:30:25', 'unread'),
('611aa412-f589-4163-99ab-e82d78b5ba19', 'room-67319302e85405.13622733', 'Do you know \"Elements Disposable - Skywalker\"', '[]', '12', '1', '2024-11-11 13:36:02', '2024-11-11 13:36:02', 'unread'),
('6181f1cf-fcc1-474c-865c-95883e31ab98', 'room-673224484ed688.24190798', 'How To determine the Cannabis weed quality?', '[]', '13', '1', '2024-11-11 15:36:23', '2024-11-11 15:36:23', 'unread'),
('6211595f-764e-4fe6-8df4-8d3ecac7bd9a', 'room-671fc6bc9d5e14.74656257', 'ok', '[]', '3', '1', '2024-10-28 17:17:22', '2024-10-28 17:34:06', 'read'),
('6b43af87-7ddd-486f-bc84-fb9f3e9089f9', 'room-671fc6bc9d5e14.74656257', 'Are you gpt-4o model?', '[]', '3', '1', '2024-10-28 17:16:53', '2024-10-28 17:34:06', 'read'),
('6c7d2c81-6e17-4573-89bb-3fe50b651808', 'room-67319302e85405.13622733', 'okay, How can I contact to https://chillincheetah.ca/', '[]', '12', '1', '2024-11-11 15:22:05', '2024-11-11 15:22:05', 'unread'),
('6d60c48f-c401-417e-9f5d-fe331421200c', 'room-671fc2f180b095.03453390', 'tell me about your system \n', '[]', '2', '1', '2024-10-28 17:00:11', '2024-10-28 17:34:06', 'read'),
('6dcff5db-31f2-4d38-8525-16b62d339472', 'room-672140ebd173c8.52489701', 'I mean, want to do it on aws quicksight', '[]', '6', '1', '2024-10-29 20:12:19', '2024-10-29 20:12:19', 'unread'),
('74ae29eb-9f33-4640-9446-1206ffb40622', 'room-67319302e85405.13622733', 'What is the price of bike?', '[]', '12', '1', '2024-11-12 14:26:03', '2024-11-12 14:26:03', 'unread'),
('7537b48c-873a-4255-a81b-323d92dfd09d', 'room-67319302e85405.13622733', 'Why Should You Consider Using Cannabis Daily to Enhance Focus and Clarity?', '[]', '12', '1', '2024-11-11 12:39:10', '2024-11-11 12:39:10', 'unread'),
('792d5233-0956-4e88-8f6a-1f5d69cc5ac5', 'room-671fc2f180b095.03453390', 'are you able to show images and content of my website', '[]', '2', '1', '2024-10-28 17:04:17', '2024-10-28 17:33:29', 'read'),
('7ffa58cb-27fb-4533-9a36-d45624632397', 'room-67219dd8146be8.72012602', 'hi', '[]', '8', '1', '2024-10-30 18:45:32', '2024-10-30 18:45:32', 'unread'),
('83049b0c-1318-4f12-8d57-ce28670d97ed', 'room-6722937156bad1.65950849', '😙😙', '[]', '10', '1', '2024-10-30 20:15:10', '2024-10-30 20:15:10', 'unread'),
('8e71acf8-b9c2-4636-8832-73d569c3f989', 'room-67319302e85405.13622733', 'Why Should You Consider Using Cannabis Daily to Enhance Focus and Clarity?', '[]', '12', '1', '2024-11-11 12:41:33', '2024-11-11 12:41:33', 'unread'),
('8ebaee97-d008-43dc-85f2-1246a9f8bd02', 'room-671fc6bc9d5e14.74656257', 'Hello', '[]', '3', '1', '2024-10-28 17:16:32', '2024-10-28 17:34:06', 'read'),
('90315b4e-2fe3-4fee-ae79-a868bdc29110', 'room-67219dd8146be8.72012602', 'how can i upload files in this site?', '[]', '8', '1', '2024-10-30 18:46:27', '2024-10-30 18:46:27', 'unread'),
('92b44b65-d5b8-44dd-9160-d8c270b45cff', 'room-673224484ed688.24190798', 'Hello', '[]', '13', '1', '2024-11-11 15:35:41', '2024-11-11 15:35:41', 'unread'),
('942c143e-4267-40c9-ba7a-f3e48857734d', 'room-671fc2f180b095.03453390', 'which version are you? ', '[]', '2', '1', '2024-10-28 17:05:00', '2024-10-28 17:33:30', 'read'),
('95d3c6d6-b0ed-4b99-a95e-f87e14348caa', 'room-67319302e85405.13622733', 'What is CBN and How It Differs from CBD and THC?', '[]', '12', '1', '2024-11-11 15:00:36', '2024-11-11 15:00:36', 'unread'),
('9947761e-447e-499f-b84c-92b25b5ee43d', 'room-672140ebd173c8.52489701', 'okay, I have some data to display with it as a table, and also an image to diaplay on it. Data is from spice, and when there\'s data, display only the data table, and when there\'s not, display only the image. is this possible in AWS quicksight? if so, how to do this?', '[]', '6', '1', '2024-10-29 20:13:18', '2024-10-29 20:13:18', 'unread'),
('9a324e28-73ab-4ca4-85c2-fa8d26a119b9', 'room-67319302e85405.13622733', 'Hello', '[]', '12', '1', '2024-11-12 14:48:11', '2024-11-12 14:48:11', 'unread'),
('9b5df1b2-8f2e-4ebc-b20b-dfa30c72220d', 'room-67319302e85405.13622733', 'What is AK 47 Weed?', '[]', '12', '1', '2024-11-11 15:35:02', '2024-11-11 15:35:02', 'unread'),
('9c3e9b2e-556e-44a8-82dd-ef1947a92edd', 'room-67319302e85405.13622733', 'How many products are there in chillincheetah.ca?', '[]', '12', '1', '2024-11-11 12:59:51', '2024-11-11 12:59:51', 'unread'),
('9dc6ffae-57a6-4be1-bed7-b46faadd72b4', 'room-67219dd8146be8.72012602', 'are u a man or woman?', '[]', '8', '1', '2024-10-30 18:46:04', '2024-10-30 18:46:04', 'unread'),
('a08df0e8-64c0-4189-ad5c-c168596ff23f', 'room-67319302e85405.13622733', 'What does kr mean?', '[]', '12', '1', '2024-11-12 16:12:00', '2024-11-12 16:12:00', 'unread'),
('a44a4ec7-1997-4f02-ae97-25a409a97921', 'room-67319302e85405.13622733', 'How many topical products are there?', '[]', '12', '1', '2024-11-11 15:13:24', '2024-11-11 15:13:24', 'unread'),
('a5f51813-793d-4255-8ea2-ff33a4d7deec', 'room-67219dd8146be8.72012602', 'hi', '[]', '8', '1', '2024-10-30 18:53:25', '2024-10-30 18:53:25', 'unread'),
('ac93504a-6ce6-4845-a5db-53e5f80433ab', 'room-67319302e85405.13622733', 'Hello', '[]', '12', '1', '2024-11-12 14:55:16', '2024-11-12 14:55:16', 'unread'),
('b04ae34f-8120-42a2-9471-3e89225f0efc', 'room-67319302e85405.13622733', 'Do you know pinkman goo?', '[]', '12', '1', '2024-11-11 13:02:36', '2024-11-11 13:02:36', 'unread'),
('b1df317c-9b4b-4a9e-a887-c593a933403f', 'room-67319302e85405.13622733', 'How many products are there in chillincheetah.ca?', '[]', '12', '1', '2024-11-11 12:59:30', '2024-11-11 12:59:30', 'unread'),
('b3183c17-0594-4162-a5d1-0400b473d284', 'room-67229580205743.79075351', 'asdfasdfasdf ', '[]', '11', '1', '2024-10-30 20:22:57', '2024-10-30 20:22:57', 'unread'),
('b8acdbad-5d4b-404a-9a1a-fb3867c0a086', 'room-67319302e85405.13622733', 'Hello', '[]', '12', '1', '2024-11-12 14:52:00', '2024-11-12 14:52:00', 'unread'),
('bb401f2f-9a6d-437d-ac52-b4c3297d079f', 'room-67219dd8146be8.72012602', 'sadf ad f', '[]', '8', '1', '2024-10-30 19:03:19', '2024-10-30 19:03:19', 'unread'),
('bb6d106f-ea4e-45f9-86aa-73586c626bff', 'room-67319302e85405.13622733', 'What is THC value of Pinkman Goo?', '[]', '12', '1', '2024-11-11 15:32:07', '2024-11-11 15:32:07', 'unread'),
('bffdf2cd-68b7-4ce4-b2b7-87faa3f4f3b7', 'room-67219dd8146be8.72012602', 'sfdgdfgsdfgsdfgsdfgsdfg', '[]', '8', '1', '2024-10-30 18:57:29', '2024-10-30 18:57:29', 'unread'),
('c159c2d2-f8d7-43d5-b368-8dc669c7e0db', 'room-67319302e85405.13622733', 'Hello', '[]', '12', '1', '2024-11-12 14:49:04', '2024-11-12 14:49:04', 'unread'),
('c8a98d72-7cf0-4682-9cc3-d780be9f2a10', 'room-6722937156bad1.65950849', 'what is your name?', '[]', '10', '1', '2024-10-30 20:14:00', '2024-10-30 20:14:00', 'unread'),
('cab75019-fe40-4cd5-ab18-b96bad49ba1a', 'room-67219e6da483c3.84741858', '😬', '[]', '9', '1', '2024-10-30 18:50:46', '2024-10-30 18:50:46', 'unread'),
('cafcef31-c15f-4f14-a91f-122f1f34e0e5', 'room-67319302e85405.13622733', 'Why Should You Consider Using Cannabis Daily to Enhance Focus and Clarity?', '[]', '12', '1', '2024-11-11 12:38:14', '2024-11-11 12:38:14', 'unread'),
('cd0f01d6-8655-4409-b8ab-875b8f782b41', 'room-672068c34cb3a0.33812846', 'hi', '[]', '1', '4', '2024-10-29 04:48:50', '2024-10-29 04:48:50', 'read'),
('ce6c853d-15f1-4f19-8c11-2fb952f192a3', 'room-67319302e85405.13622733', 'Do you know \"Elements Disposable - Skywalker\"', '[]', '12', '1', '2024-11-11 15:02:37', '2024-11-11 15:02:37', 'unread'),
('d3232575-b83a-45cf-9c25-df899dc42cb0', 'room-672140ebd173c8.52489701', 'hi', '[]', '6', '1', '2024-10-29 20:08:27', '2024-10-29 20:08:27', 'unread'),
('e6b84b81-2de7-42f8-b5fa-f0952d1348e2', 'room-67319302e85405.13622733', 'How many products are there in chillincheetah.ca?', '[]', '12', '1', '2024-11-11 13:01:00', '2024-11-11 13:01:00', 'unread'),
('e7154d57-cb19-42b1-ac73-c298a84dedab', 'room-67319302e85405.13622733', 'What is CBN and How It Differs from CBD and THC', '[]', '12', '1', '2024-11-11 12:48:49', '2024-11-11 12:48:49', 'unread'),
('e8a65f33-adfb-40d3-9e59-bd4976e8c332', 'room-672140ebd173c8.52489701', 'how to change the parameter dynamically by the calculated field on a dataset?', '[]', '6', '1', '2024-10-29 20:40:22', '2024-10-29 20:40:22', 'unread'),
('eee9dded-3ce7-43fc-a4f6-469422c3fb74', 'room-671fc2f180b095.03453390', 'can you crawl a website for me \n', '[]', '2', '1', '2024-10-28 17:00:40', '2024-10-28 17:33:29', 'read'),
('f11b1820-95a9-4c44-8573-10068cffc63a', 'room-67319302e85405.13622733', 'What is CBN and How It Differs from CBD and THC?', '[]', '12', '1', '2024-11-11 12:37:39', '2024-11-11 12:37:39', 'unread'),
('f27d1bae-30d4-40bf-bbb8-10118b5a596d', 'room-67319302e85405.13622733', 'Do you know \"Elements Disposable - Skywalker\"', '[]', '12', '1', '2024-11-11 13:35:33', '2024-11-11 13:35:33', 'unread'),
('fbbafb1f-5dbe-4172-b167-04dca119a848', 'room-67219e6da483c3.84741858', 'how are you today?', '[]', '9', '1', '2024-10-30 18:47:52', '2024-10-30 18:47:52', 'unread'),
('fea1fe08-77bf-4c00-ad2a-aa27e5ff6385', 'room-67319302e85405.13622733', 'What does kr mean?', '[]', '12', '1', '2024-11-12 16:08:09', '2024-11-12 16:08:09', 'unread'),
('message-671fc3109ded52.34526239', 'room-671fc2f180b095.03453390', 'Hello! How can I assist you today?', '[]', '1', '2', '2024-10-28 17:00:00', '2024-10-28 17:33:29', 'read'),
('message-671fc3213df240.91334097', 'room-671fc2f180b095.03453390', 'I operate on an advanced artificial intelligence system developed by OpenAI. The system is equipped with sophisticated machine learning technology that allows me to understand natural language, generate human-like text, and provide assistance or information on a wide range of topics. I can help answer questions, provide recommendations, create content, and more. However, please note that I don\'t have access to personal data about individuals unless it has been shared with me in the course of our conversation. I am designed to respect user privacy and confidentiality', '[]', '1', '2', '2024-10-28 17:00:17', '2024-10-28 17:33:29', 'read'),
('message-671fc33dc31864.24154015', 'room-671fc2f180b095.03453390', 'I\'m sorry, but as an AI developed by OpenAI, I don\'t have the ability to crawl or scrape websites. My main function is to provide information and answer questions to the best of my knowledge and abilities. If you have any questions about how to crawl a website or about web scraping in general, I\'d be more than happy to help explain!', '[]', '1', '2', '2024-10-28 17:00:45', '2024-10-28 17:33:29', 'read'),
('message-671fc3e793d5b9.34698872', 'room-671fc2f180b095.03453390', 'As an AI, I don\'t learn or understand in the way humans do, but I can certainly help analyze and provide information about your business model if you provide me details. I can assist in finding resources, answering questions, or providing insights based on the information you give me.', '[]', '1', '2', '2024-10-28 17:03:35', '2024-10-28 17:33:29', 'read'),
('message-671fc415758883.97476565', 'room-671fc2f180b095.03453390', 'As a text-based AI, I\'m unable to display images or visual content. However, I can certainly help you analyze, understand, and optimize your website content by providing insights, tips, and recommendations based on the information you provide me.', '[]', '1', '2', '2024-10-28 17:04:21', '2024-10-28 17:33:29', 'read'),
('message-671fc42e61f7d0.95808906', 'room-671fc2f180b095.03453390', 'As an AI, I\'m unable to send links directly to your clients. However, I can assist you in finding the links or information you need to send to them, which you can then send through your own email or messaging system.', '[]', '1', '2', '2024-10-28 17:04:46', '2024-10-28 17:33:29', 'read'),
('message-671fc44023cd07.13568172', 'room-671fc2f180b095.03453390', 'As an AI developed by OpenAI, I don\'t have a specific version number like traditional software. I\'m continually updated and improved over time.', '[]', '1', '2', '2024-10-28 17:05:04', '2024-10-28 17:33:29', 'read'),
('message-671fc456c80019.07689349', 'room-671fc2f180b095.03453390', 'I am developed and maintained by OpenAI.', '[]', '1', '2', '2024-10-28 17:05:26', '2024-10-28 17:33:29', 'read'),
('message-671fc46103f9e5.43834162', 'room-671fc2f180b095.03453390', 'I\'m sorry, but I didn\'t understand what you\'re asking. Could you please specify which version of what you are referring to?', '[]', '1', '2', '2024-10-28 17:05:37', '2024-10-28 17:33:29', 'read'),
('message-671fc4701fd609.72248932', 'room-671fc2f180b095.03453390', 'As an AI, I don\'t have versions like software or hardware. I\'m developed by OpenAI, and I\'m designed to provide detailed and accurate responses based on the information I\'ve been trained on. I can assist with a wide range of topics. How can I help you today?', '[]', '1', '2', '2024-10-28 17:05:52', '2024-10-28 17:33:29', 'read'),
('message-671fc6cb4bdf34.37783951', 'room-671fc6bc9d5e14.74656257', 'Hello! How can I assist you today?', '[]', '1', '3', '2024-10-28 17:15:55', '2024-10-28 17:33:29', 'read'),
('message-671fc6e0938d89.22766843', 'room-671fc6bc9d5e14.74656257', 'I am based on the GPT-4 architecture, but I don\'t have a specific model designation like \"gpt-4o.\" My training data goes up until October 2023, and I am designed to assist with a wide range of questions and tasks. If you have any questions or need assistance, feel free to ask!', '[]', '1', '3', '2024-10-28 17:16:16', '2024-10-28 17:33:29', 'read'),
('message-671fc6fccba6d9.65818330', 'room-671fc6bc9d5e14.74656257', 'How can I assist you today?', '[]', '1', '3', '2024-10-28 17:16:44', '2024-10-28 17:33:29', 'read'),
('message-671fc70b88ac38.49153706', 'room-671fc6bc9d5e14.74656257', 'The highest mountain in the world is Mount Everest, which reaches an elevation of 8,848 meters (29,029 feet) above sea level. It is located in the Himalayas on the border between Nepal and the Tibet Autonomous Region of China.', '[]', '1', '3', '2024-10-28 17:16:59', '2024-10-28 17:33:29', 'read'),
('message-671fc721224b25.84829444', 'room-671fc6bc9d5e14.74656257', 'When considering strength relative to body size, the dung beetle is often regarded as the strongest animal in the world. Some species of dung beetles can pull loads over 1,000 times their own body weight, which is the equivalent of an average human pulling six double-decker buses full of people.\n\nHowever, when looking at absolute strength (without considering body size), the African bush elephant is one of the strongest land animals. These elephants can carry up to 9,000 kilograms (almost 20,000 pounds), which is roughly the weight of 130 average adult humans.\n\nSo, the answer depends on whether you are considering relative or absolute strength.', '[]', '1', '3', '2024-10-28 17:17:21', '2024-10-28 17:33:29', 'read'),
('message-672069258145f9.47569942', 'room-672068c34cb3a0.33812846', 'Sure, feel free to ask me anything or let me know how I can assist you!', '[]', '1', '4', '2024-10-29 04:48:37', '2024-10-29 04:48:37', 'read'),
('message-672140f3130045.33919080', 'room-672140ebd173c8.52489701', 'Hello! How can I assist you today?', '[]', '1', '6', '2024-10-29 20:09:23', '2024-10-29 20:09:23', 'read'),
('message-672141084d00b8.90773517', 'room-672140ebd173c8.52489701', 'Yes, I\'m familiar with Amazon QuickSight. It\'s a cloud-based business intelligence (BI) service provided by Amazon Web Services (AWS). QuickSight enables users to easily create and publish interactive dashboards that include insights from a variety of data sources. Here are some key features of AWS QuickSight:\n\n1. **Data Sources**: QuickSight can connect to a wide range of data sources, including AWS services like Amazon Redshift, Amazon RDS, Amazon S3, and Amazon Athena, as well as other databases and SaaS applications.\n\n2. **SPICE Engine**: QuickSight uses a Super-fast, Parallel, In-memory Calculation Engine (SPICE) to deliver fast performance and quick query responses. SPICE allows users to analyze large datasets quickly without having to worry about managing the underlying infrastructure.\n\n3. **Interactive Dashboards**: Users can create interactive dashboards that are easy to publish and share. These dashboards can include a variety of visualizations such as bar charts, line graphs, scatter plots, and more.\n\n4. **Machine Learning Insights**: QuickSight integrates with AWS machine learning to provide insights such as anomaly detection and forecasting directly within dashboards.\n\n5. **Scalability**: Being a cloud-based service, QuickSight can scale to accommodate any number of users and data volume, making it suitable for both small teams and large enterprises.\n\n6. **Pay-per-Session Pricing**: QuickSight offers a unique pricing model where you can pay based on the number of sessions instead of a flat fee, which can be more cost-effective for organizations that have sporadic usage patterns.\n\n7. **Mobile Access**: QuickSight offers mobile apps for iOS and Android, allowing users to access and interact with their dashboards on the go.\n\nOverall, Amazon QuickSight is designed to make it easy for users of all skill levels to gain insights from their data and to enable organizations to democratize access to analytics.', '[]', '1', '6', '2024-10-29 20:09:44', '2024-10-29 20:09:44', 'read'),
('message-672141850d6926.92981607', 'room-672140ebd173c8.52489701', 'Yes, it is possible to conditionally display a table or an image based on the presence of data. The exact implementation will depend on the platform or technology you are using to display the data and image. Here are some general approaches for a few common scenarios:\n\n### Using HTML, CSS, and JavaScript\n\nIf you are working on a web page, you can use HTML, CSS, and JavaScript to achieve this:\n\n1. **HTML Structure:**\n\n    ```html\n    <div id=\"data-table\" style=\"display: none;\">\n        <!-- Your table structure goes here -->\n        <table>\n            <thead>\n                <tr>\n                    <th>Column 1</th>\n                    <th>Column 2</th>\n                </tr>\n            </thead>\n            <tbody id=\"table-body\">\n                <!-- Data rows will be inserted here -->\n            </tbody>\n        </table>\n    </div>\n\n    <div id=\"image-container\" style=\"display: none;\">\n        <img src=\"image.jpg\" alt=\"Placeholder Image\">\n    </div>\n    ```\n\n2. **JavaScript Logic:**\n\n    ```javascript\n    const data = []; // Replace this with your actual data array\n\n    const dataTable = document.getElementById(\'data-table\');\n    const imageContainer = document.getElementById(\'image-container\');\n    const tableBody = document.getElementById(\'table-body\');\n\n    if (data.length > 0) {\n        // Populate the table with data\n        data.forEach(item => {\n            const row = document.createElement(\'tr\');\n            const cell1 = document.createElement(\'td\');\n            const cell2 = document.createElement(\'td\');\n\n            cell1.textContent = item.column1; // Replace with your data fields\n            cell2.textContent = item.column2;\n\n            row.appendChild(cell1);\n            row.appendChild(cell2);\n            tableBody.appendChild(row);\n        });\n\n        // Show the table and hide the image\n        dataTable.style.display = \'block\';\n        imageContainer.style.display = \'none\';\n    } else {\n        // Show the image and hide the table\n        dataTable.style.display = \'none\';\n        imageContainer.style.display = \'block\';\n    }\n    ```\n\n### Using React\n\nIf you\'re using React, you can handle this with conditional rendering:\n\n```jsx\nimport React from \'react\';\n\nfunction DataDisplay({ data }) {\n    return (\n        <div>\n            {data.length > 0 ? (\n                <table>\n                    <thead>\n                        <tr>\n                            <th>Column 1</th>\n                            <th>Column 2</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        {data.map((item, index) => (\n                            <tr key={index}>\n                                <td>{item.column1}</td>\n                                <td>{item.column2}</td>\n                            </tr>\n                        ))}\n                    </tbody>\n                </table>\n            ) : (\n                <img src=\"image.jpg\" alt=\"Placeholder Image\" />\n            )}\n        </div>\n    );\n}\n\nexport default DataDisplay;\n```\n\n### Using Python with Jinja2 (Flask/Django)\n\nIf you are rendering a web page with a Python backend using Jinja2 templates, you can do this:\n\n```html\n{% if data %}\n    <table>\n        <thead>\n            <tr>\n                <th>Column 1</th>\n                <th>Column 2</th>\n            </tr>\n        </thead>\n        <tbody>\n            {% for item in data %}\n            <tr>\n                <td>{{ item.column1 }}</td>\n                <td>{{ item.column2 }}</td>\n            </tr>\n            {% endfor %}\n        </tbody>\n    </table>\n{% else %}\n    <img src=\"image.jpg\" alt=\"Placeholder Image\">\n{% endif %}\n```\n\n### Summary\n\nChoose the method that suits your project\'s technology stack. Each of these methods uses conditional logic to decide whether to render a table or an image based on whether data is present. Adjust the specifics according to your data structure and design requirements.', '[]', '1', '6', '2024-10-29 20:11:49', '2024-10-29 20:11:49', 'read'),
('message-672141e1866454.62152748', 'room-672140ebd173c8.52489701', 'Certainly! Amazon QuickSight is a business intelligence (BI) service that allows you to create and share interactive dashboards. Here’s a general guide to help you get started with Amazon QuickSight:\n\n1. **Sign Up for QuickSight**:\n   - If you haven\'t already, sign up for Amazon QuickSight through the AWS Management Console. You may need to set up an AWS account if you don\'t have one.\n\n2. **Access QuickSight**:\n   - Log in to the AWS Management Console.\n   - Navigate to QuickSight from the list of AWS services.\n\n3. **Configure QuickSight**:\n   - Upon first accessing QuickSight, you’ll need to configure a few basic settings, such as choosing whether you want to use QuickSight Standard or Enterprise edition.\n   - Set up users and permissions as necessary. QuickSight integrates with AWS Identity and Access Management (IAM) for user management.\n\n4. **Connect to Data Sources**:\n   - QuickSight supports various data sources, including AWS data services (like S3, RDS, Redshift, etc.), databases (e.g., MySQL, PostgreSQL), and third-party sources.\n   - To connect to a data source, go to the QuickSight console, choose \"Manage Data,\" and then \"New Dataset.\"\n   - Select your data source type, provide necessary connection details, and authenticate as needed.\n\n5. **Prepare Your Data**:\n   - Once connected, you may need to prepare your data. QuickSight provides functionality for data transformation and cleaning.\n   - Use the data preparation tools to filter, rename fields, create calculated fields, or join multiple datasets if necessary.\n\n6. **Create Analyses**:\n   - After preparing your dataset, you can start creating analyses.\n   - Choose \"New Analysis\" on the QuickSight console, select your dataset, and begin building visualizations.\n   - QuickSight offers various visualization types like bar charts, line charts, pie charts, tables, and more.\n\n7. **Build Dashboards**:\n   - Once you have your analyses set up, you can assemble them into dashboards.\n   - Dashboards in QuickSight are collections of visual analyses that you can share with others.\n   - Customize your dashboard layout, add interactive filters, and adjust visual styles as needed.\n\n8. **Share Your Work**:\n   - QuickSight allows you to share analyses and dashboards with other users within your organization.\n   - Set permissions and share your dashboards with individuals or groups.\n\n9. **Schedule Data Refreshes**:\n   - If your data changes over time, you can set up scheduled refreshes for your datasets to ensure your dashboards reflect the latest information.\n\n10. **Explore Advanced Features**:\n    - QuickSight also offers advanced features like machine learning insights, embedding capabilities, and integration with AWS services.\n\n11. **Monitor Usage and Costs**:\n    - Keep track of your QuickSight usage and costs. QuickSight offers a pay-per-session pricing model, which can help manage costs based on usage.\n\nBy following these steps, you should be able to create and share insightful dashboards using Amazon QuickSight. If you have specific questions or need help with a particular aspect of QuickSight, feel free to ask!', '[]', '1', '6', '2024-10-29 20:13:21', '2024-10-29 20:13:21', 'read'),
('message-6721421e04f619.19912259', 'room-672140ebd173c8.52489701', 'In AWS QuickSight, you can create visualizations and dashboards that dynamically display content based on certain conditions, but there isn\'t a direct feature to switch between a data table and an image based on the presence of data. However, you can achieve similar behavior through a workaround using calculated fields and conditional formatting.\n\nHere\'s a step-by-step guide to set this up:\n\n1. **Create Your Dataset**: Ensure your dataset is available in SPICE or any other data source connected to QuickSight.\n\n2. **Add a Calculated Field**: To determine if your dataset has data, you can create a calculated field that checks for the presence of key data. For example, you can create a field that counts the number of rows or checks if a specific column has data. Here’s an example for counting rows:\n   - Go to your data set, and create a calculated field.\n   - Use a formula like `ifelse(count({your_key_column}) > 0, \'ShowData\', \'ShowImage\')`.\n\n3. **Create a Dashboard**:\n   - **Add a Table Visualization**: Add a table visualization to your analysis that displays the data.\n   - **Add an Image**: Add an image to your analysis that you want to display when there is no data.\n\n4. **Use a Parameter and Control**: Set up a parameter and a control to switch between the table and the image based on the calculated field.\n   - Create a parameter (e.g., `DisplayOption`) with values that match your calculated field (\'ShowData\', \'ShowImage\').\n   - Create a control for this parameter using the calculated field as the source.\n\n5. **Set Visibility Based on the Parameter**:\n   - For the table visualization, set its visibility to show only when the parameter value is \'ShowData\'.\n   - For the image, set its visibility to show only when the parameter value is \'ShowImage\'.\n\n6. **Publish Your Dashboard**: Once set up, publish your dashboard. It should now dynamically display the table when data is present and the image when no data is available.\n\nThis approach utilizes calculated fields and parameters to simulate conditional visibility. While QuickSight doesn\'t have native support for true conditional visibility toggling, this method provides a way to create a similar user experience.', '[]', '1', '6', '2024-10-29 20:14:22', '2024-10-29 20:14:22', 'read'),
('message-6721487e58f057.49985747', 'room-672140ebd173c8.52489701', 'To change a parameter dynamically based on a calculated field in a dataset, the specific approach can vary depending on the tool or platform you are using. Below, I\'ll provide general guidance for some popular tools:\n\n### Tableau\n\n1. **Create a Calculated Field**: First, create a calculated field in Tableau that will serve as the basis for your parameter. This could be a field that calculates a value you want to use as the parameter.\n\n2. **Create a Parameter**: Create a parameter in Tableau. Parameters in Tableau are static by nature, but you can control their behavior through calculated fields and actions.\n\n3. **Use a Parameter Action**: You can use Parameter Actions to dynamically change the parameter value based on user interactions or selections.\n\n   - Go to `Dashboard` -> `Actions...`.\n   - Add an action by clicking `Add Action` and then `Change Parameter`.\n   - Set up the action to update your parameter based on the calculated field when a user interacts with a certain part of your dashboard.\n\n4. **Display the Parameter**: Show the parameter control to allow users to see its current value and interact with it if necessary.\n\n### Power BI\n\n1. **Create a Measure or Calculated Column**: In Power BI, first, create a measure or calculated column that calculates the value you want to use as a parameter.\n\n2. **Use What-If Parameters**: Power BI does not support dynamic parameters directly like Tableau, but you can use What-If parameters for similar functionality.\n\n3. **DAX Calculations**: Use DAX formulas to create logic that simulates dynamic parameter behavior. For example, you can use a slicer to control a measure that acts like a dynamic parameter.\n\n4. **Bookmarks and Buttons**: Use bookmarks and buttons to simulate the effect of changing parameters. This involves creating different views and using buttons to switch between them.\n\n### Python (Pandas)\n\nIf you\'re working with a dataset in Python using Pandas, you would typically calculate values and update parameters in your code.\n\n1. **Calculate the Field**: Use Pandas to create a new calculated field in your DataFrame.\n\n   ```python\n   import pandas as pd\n\n   df = pd.DataFrame({\'A\': [1, 2, 3], \'B\': [4, 5, 6]})\n   df[\'C\'] = df[\'A\'] + df[\'B\']  # Example calculated field\n   ```\n\n2. **Update Parameters**: Use the calculated field to dynamically update variables or parameters in your script.\n\n   ```python\n   parameter = df[\'C\'].mean()  # Example of using the calculated field to update a parameter\n   ```\n\n### SQL\n\nIf you\'re working within a SQL environment:\n\n1. **Create a Calculated Field**: Use SQL to create a calculated field using a `SELECT` statement.\n\n   ```sql\n   SELECT column1, column2, (column1 + column2) AS calculated_field\n   FROM your_table;\n   ```\n\n2. **Use Variables**: If your SQL environment supports them, use variables to store and utilize dynamic values.\n\n   ```sql\n   DECLARE @parameter INT;\n   SET @parameter = (SELECT AVG(calculated_field) FROM your_table);\n   ```\n\n### General Tips\n\n- **Understand Limitations**: Be aware of the limitations of the tool you are using. Some tools don\'t support truly dynamic parameters and may require workarounds.\n- **User Interaction**: Consider how user interaction can drive parameter changes, and use features like actions, slicers, or forms to capture these interactions.\n- **Performance Impact**: Be mindful of the performance impact of dynamically calculated fields and parameters, especially on large datasets.\n\nAlways refer to the specific documentation of the tool or platform you\'re using for detailed instructions and best practices.', '[]', '1', '6', '2024-10-29 20:41:34', '2024-10-29 20:41:34', 'read'),
('message-672148ac4741a7.94755256', 'room-672140ebd173c8.52489701', 'In AWS QuickSight, parameters are a powerful way to customize and control your visualizations dynamically. You can create calculated fields that update based on parameter values, but parameters themselves cannot be directly updated by calculated fields. Instead, you can use actions or controls to influence parameter values, which in turn affect your calculations and visualizations. Here\'s how you can create an interactive experience using parameters and calculated fields:\n\n### Step-by-Step Guide\n\n1. **Create a Parameter:**\n   - Go to the analysis where you want to create a parameter.\n   - In the left pane, choose the \"Parameters\" pane.\n   - Click on \"Create parameter.\"\n   - Define your parameter by setting its name, data type (e.g., string, integer, decimal), and any default value if necessary.\n   - You can also specify whether it should be a single value or a multi-value parameter.\n\n2. **Create a Control for the Parameter:**\n   - After creating the parameter, you need to make it interactive by adding a control.\n   - In the \"Controls\" pane, click on \"Add control.\"\n   - Select the type of control that suits your needs (e.g., dropdown, slider, text box) and link it to your parameter.\n   - Configure the control’s display name and other settings.\n\n3. **Use the Parameter in a Calculated Field:**\n   - Navigate to the \"Fields list\" pane and click on \"Add calculated field.\"\n   - In the calculated field editor, you can use the parameter by referencing it with the syntax `${parameter_name}`.\n   - Create a calculated field that uses this parameter. For example, if your parameter is named `SalesThreshold`, you could create a calculated field that filters data based on this parameter:\n     ```plaintext\n     ifelse(Sales > ${SalesThreshold}, \"Above Threshold\", \"Below Threshold\")\n     ```\n\n4. **Add the Calculated Field to Your Visuals:**\n   - Use the calculated field in your visualizations. For example, you can use it as a color field, filter, or any other field to enhance interactivity.\n   - As users interact with the control linked to the parameter, the calculated field will update dynamically.\n\n5. **(Optional) Add Actions to Update Parameters:**\n   - If you want to update parameters based on interactions with visuals, you can use actions.\n   - Select a visual, go to the \"Actions\" menu, and create an action that updates the parameter when a user interacts with the visual (e.g., selecting a specific data point).\n   - Define the action to set the parameter value based on the data point selected.\n\n6. **Test the Interactivity:**\n   - Test the setup by interacting with the controls you added. The visualizations should update dynamically based on the parameter values.\n\n### Important Notes:\n- Parameters themselves are not directly affected by calculated fields. Instead, they are influenced by user input through controls or actions.\n- Calculated fields can use parameters to dynamically adjust their logic and output, which in turn affects how data is visualized.\n\nBy following these steps, you can create a highly interactive and dynamic dashboard in AWS QuickSight that responds to user input and provides meaningful insights.', '[]', '1', '6', '2024-10-29 20:42:20', '2024-10-29 20:42:20', 'read'),
('message-67214de31c25b6.78342660', 'room-672140ebd173c8.52489701', 'In AWS QuickSight, you can dynamically set parameters based on the count of records in a dataset by using calculated fields and parameter actions. While QuickSight doesn\'t directly allow for parameters to be set based on a dataset count out of the box, you can achieve similar functionality by following these steps:\n\n1. **Create a Calculated Field for Record Count**:\n   - Open your analysis in QuickSight.\n   - Go to the \'Fields list\' pane on the left.\n   - Click on the \'+ Add\' button and select \'Add calculated field\'.\n   - Create a calculated field that counts the records in your dataset. You can use a simple aggregate function like `count()`. For example:\n     ```plaintext\n     record_count = count({YourFieldName})\n     ```\n   - Replace `{YourFieldName}` with a field that exists in your dataset (any field will do, as you\'re counting rows).\n\n2. **Create a Parameter**:\n   - Go to the \'Parameters\' pane.\n   - Click on \'+ Create one\'.\n   - Name your parameter and set its type (for example, integer or string).\n   - You don\'t need to set a default value right now.\n\n3. **Use a Control to Set the Parameter**:\n   - Create a control to let users interact with this parameter. In the \'Controls\' pane, click \'+ Add control\'.\n   - Choose the type of control, such as a dropdown or input box, and link it to your parameter.\n\n4. **Dynamic Actions (Optional)**:\n   - If you want the parameter to be set automatically based on some user action, you can use QuickSight\'s actions on visuals.\n   - Create a visual that uses the calculated field for record count.\n   - Add an action that sets the parameter based on the interaction with this visual. This could be selecting a value in the visual, where you could then pass the count to the parameter.\n\n5. **Use the Parameter in Your Analysis**:\n   - Now that you have a parameter that can reflect your desired logic based on interaction, you can use it in filters, other calculated fields, or anywhere you need it in your analysis.\n\n6. **Test Your Setup**:\n   - Ensure everything works as expected by interacting with your analysis. Check that the parameter updates based on the actions you\'ve configured.\n\nKeep in mind that while QuickSight offers flexibility with parameters and calculated fields, certain operations might require manual user input or be limited by the platform\'s current feature set. If there\'s a specific complex logic you\'re looking to implement, you might need to adjust your dataset or logic accordingly.', '[]', '1', '6', '2024-10-29 21:04:35', '2024-10-29 21:04:35', 'read'),
('message-67218e5dc91489.65671109', 'room-67218e55d8a146.20769408', 'Hello! How can I assist you today?', '[]', '1', '7', '2024-10-30 01:39:41', '2024-10-30 01:39:41', 'read'),
('message-67219def2db7c9.06870522', 'room-67219dd8146be8.72012602', 'Hello! How can I assist you today?', '[]', '1', '8', '2024-10-30 02:46:07', '2024-10-30 02:46:07', 'read'),
('message-67219e0ec0d558.41706400', 'room-67219dd8146be8.72012602', 'I\'m an AI, so I don\'t have a gender. I\'m here to help you with any questions or information you need.', '[]', '1', '8', '2024-10-30 02:46:38', '2024-10-30 02:46:38', 'read'),
('message-67219e2a29d465.12928906', 'room-67219dd8146be8.72012602', 'I\'m sorry, but I\'m unable to view or interact with the site you\'re referring to. However, I can provide some general guidance on how to upload files to most websites.\n\n1. **Log In:** If the site requires a login, make sure you are logged into your account.\n\n2. **Locate the Upload Section:** Look for a button or link that says \"Upload,\" \"Add File,\" \"Upload Files,\" or something similar. This is often found in the site\'s navigation menu or on a designated page for uploads.\n\n3. **Select Files:** Click the upload button or link, which will typically open a file dialog box. From there, you can navigate to the location on your computer where the files are stored. Select the files you wish to upload.\n\n4. **Drag and Drop:** Some websites allow you to drag and drop files directly into a designated area on the page. If this feature is supported, it will usually be indicated by a specific drag-and-drop area.\n\n5. **Upload Confirmation:** Once your files are selected, there might be an additional step to confirm or start the upload process. Look for a \"Start Upload\" or \"Submit\" button.\n\n6. **Wait for Upload:** Depending on the size of your files and your internet connection, the upload might take some time. Wait until you receive confirmation that the upload is complete.\n\n7. **Check for Errors:** If there are any errors during the upload, the site should provide a message or notification with details. Follow any instructions to resolve the issue.\n\nIf you\'re having trouble, consider looking for a help or FAQ section on the website for more specific guidance, or contact their support team for assistance.', '[]', '1', '8', '2024-10-30 02:47:06', '2024-10-30 02:47:06', 'read'),
('message-67219e7b100037.72653792', 'room-67219e6da483c3.84741858', 'Thank you for asking! I\'m just a computer program, so I don\'t have feelings, but I\'m here and ready to help you with whatever you need. How can I assist you today?', '[]', '1', '9', '2024-10-30 02:48:27', '2024-10-30 02:48:27', 'read'),
('message-67219e8cae0b14.63849131', 'room-67219e6da483c3.84741858', 'Thank you! I\'m here to help, so if you have any questions or need assistance, feel free to ask.', '[]', '1', '9', '2024-10-30 02:48:44', '2024-10-30 02:48:44', 'read'),
('message-67219f291a7b14.55059741', 'room-67219e6da483c3.84741858', 'Hello! It seems like you might have something on your mind. How can I assist you today?', '[]', '1', '9', '2024-10-30 02:51:21', '2024-10-30 02:51:21', 'read'),
('message-67219fc7da7cd0.67429360', 'room-67219dd8146be8.72012602', 'Hello! How can I assist you today?', '[]', '1', '8', '2024-10-30 02:53:59', '2024-10-30 02:53:59', 'read');
INSERT INTO `messages` (`id`, `room`, `text`, `attachments`, `from`, `to`, `created_at`, `updated_at`, `status`) VALUES
('message-67219fdd5ddad6.36072775', 'room-67219dd8146be8.72012602', 'The OpenAI API is a service provided by OpenAI that allows developers to integrate the capabilities of OpenAI\'s language models into their own applications, products, or services. It provides access to powerful AI models like GPT-3, which can perform a wide range of natural language processing tasks. These tasks include generating text, summarizing information, translating languages, answering questions, and more.\n\nKey features of the OpenAI API include:\n\n1. **Text Generation**: The API can generate coherent and contextually relevant text based on a given prompt, useful for applications such as chatbots, content creation, and writing assistance.\n\n2. **Language Understanding**: It can comprehend and respond to queries, making it suitable for building question-and-answer systems and other interactive AI applications.\n\n3. **Customization**: Developers can fine-tune models on specific datasets to better suit their particular use cases, ensuring more accurate and relevant outputs.\n\n4. **Scalability**: The API is designed to handle varying amounts of requests, making it suitable for both small applications and enterprise-level solutions.\n\n5. **Ease of Integration**: The API provides straightforward access via HTTP requests, meaning it can be easily integrated into a wide variety of programming environments.\n\n6. **Versatility**: Beyond text generation, the models can perform tasks like text classification, sentiment analysis, and more.\n\nThe OpenAI API is used by businesses and developers across diverse sectors to enhance user experiences, automate tasks, and develop innovative AI-driven solutions. Access to the API typically requires an API key, and usage is often metered based on factors such as the number of requests and the complexity of the model employed.', '[]', '1', '8', '2024-10-30 02:54:21', '2024-10-30 02:54:21', 'read'),
('message-6721a0bc3f5604.15388174', 'room-67219dd8146be8.72012602', 'I\'m here to help! If you have any questions or need assistance, just let me know.', '[]', '1', '8', '2024-10-30 02:58:04', '2024-10-30 02:58:04', 'read'),
('message-6721a21a26f3e8.16767259', 'room-67219dd8146be8.72012602', 'It looks like your message might be incomplete or mistyped. Could you please provide more details or clarify your request? I\'m here to help!', '[]', '1', '8', '2024-10-30 03:03:54', '2024-10-30 03:03:54', 'read'),
('message-6721a23721fd53.36742094', 'room-67219dd8146be8.72012602', 'It looks like your message might have been typed in error or may not be complete. Could you please provide more details or clarify your request? I\'m here to help!', '[]', '1', '8', '2024-10-30 03:04:23', '2024-10-30 03:04:23', 'read'),
('message-67229382af98f0.99528711', 'room-6722937156bad1.65950849', 'Hello! How can I assist you today?', '[]', '1', '10', '2024-10-30 20:13:54', '2024-10-30 20:13:54', 'read'),
('message-6722938b43ff45.20601387', 'room-6722937156bad1.65950849', 'I am an AI language model created by OpenAI, and I don\'t have a personal name like a human would. You can call me Assistant! How can I assist you today?', '[]', '1', '10', '2024-10-30 20:14:03', '2024-10-30 20:14:03', 'read'),
('message-672293d06eec34.70943187', 'room-6722937156bad1.65950849', 'Hello! How can I assist you today? 😊', '[]', '1', '10', '2024-10-30 20:15:12', '2024-10-30 20:15:12', 'read'),
('message-672295a34f3260.16562643', 'room-67229580205743.79075351', 'It looks like you entered some random text. How can I assist you today?', '[]', '1', '11', '2024-10-30 20:22:59', '2024-10-30 20:22:59', 'read'),
('message-6731fa74c1d222.83228764', 'room-67319302e85405.13622733', 'Hi there! How can I assist you today?\n', '[]', '1', '12', '2024-11-11 12:37:08', '2024-11-11 12:37:08', 'read'),
('message-6731fa9e1a6406.40260319', 'room-67319302e85405.13622733', 'Could you please provide more details or specify what you would like to know?\n', '[]', '1', '12', '2024-11-11 12:37:50', '2024-11-11 12:37:50', 'read'),
('message-6731fac073bca1.62644591', 'room-67319302e85405.13622733', 'Could you please provide more context or specify what you would like to know?\n', '[]', '1', '12', '2024-11-11 12:38:24', '2024-11-11 12:38:24', 'read'),
('message-6731fb0366cab5.90984079', 'room-67319302e85405.13622733', 'Could you please provide more context or specify your question?\n', '[]', '1', '12', '2024-11-11 12:39:31', '2024-11-11 12:39:31', 'read'),
('message-6731fb3e3a9f13.50820554', 'room-67319302e85405.13622733', '\'Why\nCould you please provide more context or specify your question?\n', '[]', '1', '12', '2024-11-11 12:40:30', '2024-11-11 12:40:30', 'read'),
('message-6731fb900e3fc3.11009905', 'room-67319302e85405.13622733', 'In today\'s fast-paced world, many individuals are constantly seeking ways to improve their focus and mental clarity. While traditional methods such as meditation and exercise are commonly recommended, a lesser-known option that is gaining popularity is the daily use of cannabis. Cannabis, particularly strains high in Sativa, is known for its uplifting and energizing effects, which can boost energy, creativity, and focus. By enhancing serotonin levels, Sativa supports mood, sleep, and anxiety management while aiding in chronic pain and depression relief. This makes it an excellent choice for achieving hyper-focus, stimulating brain function, and maintaining motivation throughout the day. Additionally, cannabis can enhance social interactions and physical activities, making it a versatile choice for a range of experiences.\n', '[]', '1', '12', '2024-11-11 12:41:52', '2024-11-11 12:41:52', 'read'),
('message-6731fd27ddfb75.62222256', 'room-67319302e85405.13622733', 'In today\'s fast-paced world, many individuals are constantly seeking ways to improve their focus and mental clarity. While traditional methods such as meditation and exercise are commonly recommended, a lesser-known option that is gaining popularity is the daily use of cannabis. Cannabis, particularly strains high in Sativa, is known for its uplifting and energizing effects, which can boost energy, creativity, and focus. By enhancing serotonin levels, Sativa supports mood, sleep, and anxiety management while aiding in chronic pain and depression relief. This makes it an excellent choice for achieving hyper-focus, stimulating brain function, and maintaining motivation throughout the day. Additionally, cannabis can enhance social interactions and physical activities, making it a versatile choice for a range of experiences.\n', '[]', '1', '12', '2024-11-11 12:48:39', '2024-11-11 12:48:39', 'read'),
('message-6731fd49c479b7.02946015', 'room-67319302e85405.13622733', 'CBN, or cannabinol, is a cannabinoid found in cannabis plants. It is distinct from CBD (cannabidiol) and THC (tetrahydrocannabinol) in several ways:\n\n1. **Origin**: CBN is a product of THC degradation. As THC ages and is exposed to oxygen, it converts into CBN. This process can occur naturally over time or be accelerated by heat and light.\n\n2. **Psychoactivity**: Unlike THC, CBN is only mildly psychoactive, if at all. It does not produce the \"high\" associated with THC. CBD is also non-psychoactive, making both CBN and CBD preferable for those seeking therapeutic benefits without intoxication.\n\n3. **Effects and Uses**: CBN is often associated with sedative effects and is sometimes used as a sleep aid. It may also have potential benefits for pain relief and appetite stimulation. CBD, on the other hand, is known for its anti-inflammatory, anti-anxiety, and seizure-reducing properties. THC is primarily known for its psychoactive effects but also has therapeutic uses such as pain relief and appetite stimulation.\n\n4. **Legal Status**: The legal status of CBN, CBD, and THC varies by region. CBD is widely accepted and legal in many places, while THC is more restricted due to its psychoactive properties. CBN\'s legal status is less clear and can depend on its source and concentration.\n\nOverall, while CBN, CBD, and THC all originate from cannabis, they differ significantly in their effects, uses, and legal status.\n', '[]', '1', '12', '2024-11-11 12:49:13', '2024-11-11 12:49:13', 'read'),
('message-6732001f0784f7.76509572', 'room-67319302e85405.13622733', 'I don\'t know.\n', '[]', '1', '12', '2024-11-11 13:01:19', '2024-11-11 13:01:19', 'read'),
('message-67320037a690f5.64697873', 'room-67319302e85405.13622733', 'CBN (cannabinol) is a cannabinoid found in cannabis, similar to CBD (cannabidiol) and THC (tetrahydrocannabinol). However, it differs from these compounds in several ways:\n\n1. **Origin**: CBN is formed as a result of the oxidation and decomposition of THC. When THC is exposed to air and light over time, it converts into CBN. This process means that CBN is often found in older cannabis.\n\n2. **Psychoactivity**: Unlike THC, which is known for its psychoactive effects, CBN is only mildly psychoactive, if at all. It does not produce the \"high\" associated with THC.\n\n3. **Effects**: CBN is often associated with sedative effects and is believed to aid in sleep, making it potentially useful for those with insomnia. In contrast, CBD is known for its non-psychoactive therapeutic benefits, such as reducing anxiety and inflammation, while THC is known for its psychoactive effects and potential to relieve pain and stimulate appetite.\n\n4. **Research**: CBN is less studied than CBD and THC, so its full range of effects and potential benefits are not as well understood. However, it is gaining interest for its potential use in sleep aids and its anti-inflammatory properties.\n\nOverall, while CBN, CBD, and THC are all cannabinoids, they have different origins, effects, and levels of psychoactivity, which influence their potential uses and benefits.\n', '[]', '1', '12', '2024-11-11 13:01:43', '2024-11-11 13:01:43', 'read'),
('message-673200790b6d30.49998003', 'room-67319302e85405.13622733', 'Yes, Pinkman Goo is a cannabis strain categorized under Indica. It is available for purchase with prices ranging from $13.00 to $290.00, depending on the quantity. The THC content of Pinkman Goo is between 24% to 29%, with CBD levels ranging from 1% to 1.5%.\n', '[]', '1', '12', '2024-11-11 13:02:49', '2024-11-11 13:02:49', 'read'),
('message-67320862a555e2.22566927', 'room-67319302e85405.13622733', 'I\'m sorry, I don\'t have information on \"Elements Disposable - Skywalker.\" You might want to check with the retailer or supplier for more details.\n', '[]', '1', '12', '2024-11-11 13:36:34', '2024-11-11 13:36:34', 'read'),
('message-67321c20547c31.25252807', 'room-67319302e85405.13622733', 'CBN, or cannabinol, is a cannabinoid found in cannabis that is gaining attention for its unique properties. Unlike CBD (cannabidiol) and THC (tetrahydrocannabinol), CBN is typically found in aged cannabis and is a result of THC degradation. \n\nCBN is known for its potential sedative effects, making it appealing for those seeking sleep aid or relaxation. It is less psychoactive than THC, meaning it doesn\'t produce the \"high\" associated with THC consumption. In contrast, CBD is non-psychoactive and is often used for its potential therapeutic benefits, such as reducing anxiety and inflammation without causing a high. \n\nWhile THC is primarily known for its psychoactive effects, CBN and CBD are more focused on therapeutic applications. Each cannabinoid interacts differently with the body\'s endocannabinoid system, leading to varied effects and potential benefits.\n', '[]', '1', '12', '2024-11-11 15:00:48', '2024-11-11 15:00:48', 'read'),
('message-67321c95a29266.50907864', 'room-67319302e85405.13622733', 'Yes, the Elements Disposable - Skywalker is a vape pen product with Indica genetics. It has a THC concentration of 60-80% and is available for $35.00.\n', '[]', '1', '12', '2024-11-11 15:02:45', '2024-11-11 15:02:45', 'read'),
('message-67321ee8c3f909.60361477', 'room-67319302e85405.13622733', 'Yes, Nature\'s Healing CBD Salve is a topical product available for purchase. It is categorized under topicals with hybrid genetics and is priced at $45.00 for one unit.\n', '[]', '1', '12', '2024-11-11 15:12:40', '2024-11-11 15:12:40', 'read'),
('message-67321f2b7f3491.51429057', 'room-67319302e85405.13622733', 'There is one topical product listed, which is \"Nature\'s Healing CBD Salve.\"\n', '[]', '1', '12', '2024-11-11 15:13:47', '2024-11-11 15:13:47', 'read'),
('message-67321f5f428302.15307704', 'room-67319302e85405.13622733', 'There are 11 accessory products listed.\n', '[]', '1', '12', '2024-11-11 15:14:39', '2024-11-11 15:14:39', 'read'),
('message-673221292905b0.98196477', 'room-67319302e85405.13622733', 'You can contact Chillin Cheetah by SMS at (437) 229-9271 or by email at sales@chillincheetah.ca. Additionally, you can visit their headquarters at 1300 Cornwall Rd, Oakville, ON L6J 7W5, or 4 Robert Speck Pkwy, Mississauga, ON L4Z 1S1.\n', '[]', '1', '12', '2024-11-11 15:22:17', '2024-11-11 15:22:17', 'read'),
('message-6732231c0bebe6.56324398', 'room-67319302e85405.13622733', 'One of the most popular strains you might consider is Black Diamond, also known as Black Diamond OG Kush. It\'s a North Californian breed famous for its potency and intense aroma. If you\'re looking for something with a strong effect and a distinctive scent, this could be a great choice. However, it\'s always a good idea to explore different strains to find the one that best suits your preferences and needs.\n', '[]', '1', '12', '2024-11-11 15:30:36', '2024-11-11 15:30:36', 'read'),
('message-6732234ca06011.40243109', 'room-67319302e85405.13622733', 'Chillin Cheetah offers a variety of cannabis flower options. Here are some recommendations based on their current offerings:\n\n1. **Pinkman Goo** - An Indica strain with THC levels ranging from 24% to 29%. It\'s available in various quantities from 1 gram to 1 ounce.\n\n2. **Blue Fin Tuna** - Another Indica strain with THC levels between 24% and 28%. It\'s also available in different quantities.\n\n3. **Fruity Pebbles OG** - A Hybrid strain with THC levels from 24% to 32%. You can purchase it in 1/2 ounce or 1 ounce quantities.\n\n4. **Super Silver Haze** - A Hybrid strain with THC levels between 24% and 32%, available in 1/2 ounce or 1 ounce quantities.\n\n5. **GMO Cookies** - An Indica strain with THC levels ranging from 22% to 30%, available in various quantities.\n\nThese options provide a range of THC levels and genetic types (Indica, Hybrid) to suit different preferences. You can explore these products further on their website to find the one that best fits your needs.\n', '[]', '1', '12', '2024-11-11 15:31:24', '2024-11-11 15:31:24', 'read'),
('message-67322384a892a1.34060336', 'room-67319302e85405.13622733', 'The THC value of Pinkman Goo is between 24% and 29%.\n', '[]', '1', '12', '2024-11-11 15:32:20', '2024-11-11 15:32:20', 'read'),
('message-673223aba51969.25622956', 'room-67319302e85405.13622733', 'The CBN value of Pinkman Goo is not provided in the available context.\n', '[]', '1', '12', '2024-11-11 15:32:59', '2024-11-11 15:32:59', 'read'),
('message-673224385cdff5.47559136', 'room-67319302e85405.13622733', 'AK-47 is a marijuana strain that is an F1 hybrid from the Dutch seed bank Serious Seeds. It was created in 1992, and its exact lineage remains secret. It is known as one of the dispensary market\'s up-and-coming heavy hitters.\n', '[]', '1', '12', '2024-11-11 15:35:20', '2024-11-11 15:35:20', 'read'),
('message-67322457e0b074.47081725', 'room-673224484ed688.24190798', 'Hi there! How can I assist you today?\n', '[]', '1', '13', '2024-11-11 15:35:51', '2024-11-11 15:35:51', 'read'),
('message-67322462cdb9c0.67269359', 'room-67319302e85405.13622733', 'Hi there! How can I assist you today?\n', '[]', '1', '12', '2024-11-11 15:36:02', '2024-11-11 15:36:02', 'read'),
('message-67322480d0fbb9.51367148', 'room-67319302e85405.13622733', 'AK-47 is a marijuana strain that is an F1 hybrid from the Dutch seed bank Serious Seeds. It was created in 1992, and its exact lineage remains secret. It is known as one of the dispensary market\'s up-and-coming heavy hitters.\n', '[]', '1', '12', '2024-11-11 15:36:32', '2024-11-11 15:36:32', 'read'),
('message-673224a1a9bba3.83867736', 'room-673224484ed688.24190798', 'Determining the quality of cannabis involves several factors, including appearance, aroma, texture, and effects. Here are some key aspects to consider:\n\n1. **Appearance**: High-quality cannabis typically has vibrant colors, often with a mix of green, purple, or orange hues. The buds should be well-trimmed and covered in trichomes, which look like tiny crystals or frost.\n\n2. **Aroma**: Good cannabis should have a strong, distinct smell. The aroma can vary depending on the strain, ranging from earthy and piney to fruity and sweet. A strong, pleasant aroma is often a sign of quality.\n\n3. **Texture**: The buds should be sticky and slightly spongy to the touch. They should not be too dry or too wet. Overly dry cannabis can crumble easily, while overly moist cannabis might be prone to mold.\n\n4. **Trichomes**: These are the tiny, crystal-like structures on the surface of the cannabis flower. They contain cannabinoids and terpenes, which contribute to the plant\'s potency and aroma. High-quality cannabis will have a dense layer of trichomes.\n\n5. **Effects**: The effects of cannabis can vary widely depending on the strain and its cannabinoid profile. High-quality cannabis should provide the expected effects, whether it\'s relaxation, euphoria, or pain relief, without any negative side effects like headaches or paranoia.\n\n6. **Lab Testing**: If available, lab testing results can provide information on the cannabinoid and terpene content, as well as the presence of any contaminants like pesticides or mold.\n\nBy considering these factors, you can better assess the quality of cannabis before purchasing or consuming it.\n', '[]', '1', '13', '2024-11-11 15:37:05', '2024-11-11 15:37:05', 'read'),
('message-67336584521982.36455968', 'room-67319302e85405.13622733', 'The price of the bike is $30.\n', '[]', '1', '12', '2024-11-12 14:26:12', '2024-11-12 14:26:12', 'read'),
('message-67336c6e779bf9.62499134', 'room-67319302e85405.13622733', 'Hello! How can I assist you today?\n', '[]', '1', '12', '2024-11-12 14:55:42', '2024-11-12 14:55:42', 'read'),
('message-67336c804cce52.90096732', 'room-67319302e85405.13622733', 'The price of the bike is $30.\n', '[]', '1', '12', '2024-11-12 14:56:00', '2024-11-12 14:56:00', 'read'),
('message-67337d16685f40.72781185', 'room-67319302e85405.13622733', 'Cat is 232323029302930.\n', '[]', '1', '12', '2024-11-12 16:06:46', '2024-11-12 16:06:46', 'read'),
('message-67337d71c87748.66265019', 'room-67319302e85405.13622733', 'The provided documents do not contain any information about the meaning of \"kr.\" Therefore, I don\'t know what \"kr\" means based on the given context.\n', '[]', '1', '12', '2024-11-12 16:08:17', '2024-11-12 16:08:17', 'read'),
('message-67337e599326b7.24364270', 'room-67319302e85405.13622733', 'The provided documents do not contain any information about the meaning of \"kr.\" Therefore, I don\'t know what \"kr\" means based on the given context.\n', '[]', '1', '12', '2024-11-12 16:12:09', '2024-11-12 16:12:09', 'read');

-- --------------------------------------------------------

--
-- Table structure for table `nodes`
--

CREATE TABLE `nodes` (
  `id` varchar(100) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `x` varchar(255) DEFAULT NULL,
  `y` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `nodes`
--

INSERT INTO `nodes` (`id`, `type`, `x`, `y`) VALUES
('contact_us', 'contact_us', '724', '383'),
('fallback', 'fallback', '622', '524'),
('faq', 'faq', '760', '183'),
('lhfmhDEZKC', 'welcome', '1062300', '428'),
('Rg044OGZu6', 'contact_us', '1073300', '294'),
('start', 'start', '100', '433'),
('welcome', 'welcome', '372', '210'),
('zrGhmbffYE', 'fallback', '1073300', '294');

-- --------------------------------------------------------

--
-- Table structure for table `pinned`
--

CREATE TABLE `pinned` (
  `id` varchar(255) NOT NULL,
  `room` varchar(255) NOT NULL,
  `message_id` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `pinned`
--

INSERT INTO `pinned` (`id`, `room`, `message_id`, `created_at`, `updated_at`) VALUES
('114ad7d2-e7f4-4d0e-a1cb-736ec03fabd9', 'room-671fc2f180b095.03453390', 'message-671fc4701fd609.72248932', '2024-10-30 05:10:09', '2024-10-30 05:10:09'),
('6f22962e-c999-4ad5-abe4-f3dfb0159d09', 'room-67319302e85405.13622733', 'message-6731fccce5d776.73370387', '2024-11-11 12:47:16', '2024-11-11 12:47:16');

-- --------------------------------------------------------

--
-- Table structure for table `resources`
--

CREATE TABLE `resources` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `type` varchar(40) DEFAULT NULL,
  `download_url` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `resources`
--

INSERT INTO `resources` (`id`, `title`, `type`, `download_url`) VALUES
(14, 'https://chillincheetah.ca/', 'url', ''),
(22, 'products.xls', 'xls', 'resources/1731421005.xls'),
(27, 'XML_LNI.txt', 'txt', 'resources/1731421232.txt');

-- --------------------------------------------------------

--
-- Table structure for table `triggers`
--

CREATE TABLE `triggers` (
  `id` int(11) NOT NULL,
  `trigger_type` varchar(150) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `response` varchar(255) DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `triggers`
--

INSERT INTO `triggers` (`id`, `trigger_type`, `title`, `response`, `file`) VALUES
(1, 'welcome', 'Welcome message', 'Welcome', 'uploads/1732210982.xlsx');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `room` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `room`, `avatar`, `status`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'admin-room', 'user0.png', 2, '2024-10-28 14:41:06', '2024-11-28 11:34:02'),
(25, 'elliot', 'room-6746d9ea0ca372.46008195', 'user5.png', 2, '2024-11-27 08:35:54', '2024-11-27 08:37:50');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attachments`
--
ALTER TABLE `attachments`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `edges`
--
ALTER TABLE `edges`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `email_bots`
--
ALTER TABLE `email_bots`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `email_triggers`
--
ALTER TABLE `email_triggers`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `mail_guests`
--
ALTER TABLE `mail_guests`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `mail_history`
--
ALTER TABLE `mail_history`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `nodes`
--
ALTER TABLE `nodes`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `pinned`
--
ALTER TABLE `pinned`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `resources`
--
ALTER TABLE `resources`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `triggers`
--
ALTER TABLE `triggers`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attachments`
--
ALTER TABLE `attachments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `edges`
--
ALTER TABLE `edges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `email_bots`
--
ALTER TABLE `email_bots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `email_triggers`
--
ALTER TABLE `email_triggers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `mail_history`
--
ALTER TABLE `mail_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `resources`
--
ALTER TABLE `resources`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `triggers`
--
ALTER TABLE `triggers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
