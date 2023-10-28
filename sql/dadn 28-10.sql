-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 28, 2023 at 09:27 AM
-- Server version: 10.6.12-MariaDB-0ubuntu0.22.04.1
-- PHP Version: 8.1.2-1ubuntu2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dadn`
--

-- --------------------------------------------------------

--
-- Table structure for table `cambien_doam`
--

CREATE TABLE `cambien_doam` (
  `house_id` int(11) NOT NULL,
  `Room_ID` int(11) NOT NULL,
  `value` double DEFAULT NULL,
  `time` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cambien_doam`
--

INSERT INTO `cambien_doam` (`house_id`, `Room_ID`, `value`, `time`) VALUES
(1, 1, 10, '21/10/2023 8:27 pm'),
(1, 2, 33, '21/10/2023 8:00 pm'),
(1, 3, 88, '21/10/2023 8:05 pm');

-- --------------------------------------------------------

--
-- Table structure for table `cambien_nhietdo`
--

CREATE TABLE `cambien_nhietdo` (
  `house_id` int(11) NOT NULL,
  `Room_ID` int(11) NOT NULL,
  `value` double DEFAULT NULL,
  `time` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cambien_nhietdo`
--

INSERT INTO `cambien_nhietdo` (`house_id`, `Room_ID`, `value`, `time`) VALUES
(1, 1, 12, '20/10/2023 2:50'),
(1, 1, 12, '21/10/2023 2:49'),
(1, 1, 11, '28/10/2023 16:22'),
(1, 1, 10, '28/10/2023 16:23'),
(1, 1, 12, '28/10/2023 16:25'),
(1, 1, 13, '28/10/2023 16:26'),
(1, 1, 14, '28/10/2023 16:27'),
(1, 1, 15, '28/10/2023 16:28'),
(1, 2, 10, '21/10/2023 7:20'),
(1, 3, 123, '22/10/2023 7:22');

-- --------------------------------------------------------

--
-- Table structure for table `devices`
--

CREATE TABLE `devices` (
  `house_id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `device_id` int(11) NOT NULL,
  `device_name` varchar(30) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `devices`
--

INSERT INTO `devices` (`house_id`, `room_id`, `device_id`, `device_name`, `status`) VALUES
(1, 1, 1, 'fan', 1),
(1, 1, 2, 'light', 0),
(1, 2, 1, 'fan', 0),
(1, 2, 2, 'air-conditioner', 0),
(1, 3, 1, 'fan', 0),
(1, 3, 2, 'light', 0);

-- --------------------------------------------------------

--
-- Table structure for table `house`
--

CREATE TABLE `house` (
  `house_id` int(11) NOT NULL,
  `usr_id` int(11) NOT NULL,
  `num_of_room` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `house`
--

INSERT INTO `house` (`house_id`, `usr_id`, `num_of_room`) VALUES
(1, 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `room_id` int(11) NOT NULL,
  `house_id` int(11) NOT NULL,
  `room_name` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`room_id`, `house_id`, `room_name`) VALUES
(1, 1, 'living room'),
(2, 1, 'bed room'),
(3, 1, 'kitchen');

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `usr_id` int(11) NOT NULL,
  `val` varchar(255) NOT NULL,
  `expire_date` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tokens`
--

INSERT INTO `tokens` (`usr_id`, `val`, `expire_date`) VALUES
(1, 'eyJ1c2VyX2lkIjoiMSJ9.eyJ0aW1lIjoiMjAyMy0xMC0yOSAxMzo1MDoxMyJ9.gYqd-w8Q-DD2IBCBeY0BXO5G-Os89sLNF5fZRAl3kcQ', '2023-10-29 13:50:13'),
(1, 'eyJ1c2VyX2lkIjoiMSJ9.eyJ0aW1lIjoiMjAyMy0xMC0yOSAxMzo1NToxNCJ9.WhVN47npNSI3xTqJhDjcOhes3tOmxxuWcuKbrpbLaBk', '2023-10-29 13:55:14'),
(1, 'eyJ1c2VyX2lkIjoiMSJ9.eyJ0aW1lIjoiMjAyMy0xMC0yOSAxMzoyMTo1MyJ9.IKiAF5Wl5cx8qauiaUo-V7UVu-8z6HZv2oQiMcs_73w', '2023-10-29 13:21:53'),
(1, 'eyJ1c2VyX2lkIjoiMSJ9.eyJ0aW1lIjoiMjAyMy0xMC0yOSAxNDoxNDozOCJ9.QBc6b6WxEI_kuyjnpAGwJQYSd2DxqHQd8TbFOP1QTN4', '2023-10-29 14:14:38'),
(1, 'eyJ1c2VyX2lkIjoiMSJ9.eyJ0aW1lIjoiMjAyMy0xMC0yOSAxNjowNTowNiJ9.RN6ya-DBXOOlOxNPWp2lwndxuWN8mptTgfypvzNWCoM', '2023-10-29 16:05:06');

-- --------------------------------------------------------

--
-- Table structure for table `usr`
--

CREATE TABLE `usr` (
  `usr_id` int(11) NOT NULL,
  `usr_name` varchar(30) DEFAULT NULL,
  `usr_pass` varchar(255) DEFAULT NULL,
  `last_name` varchar(30) DEFAULT NULL,
  `first_name` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usr`
--

INSERT INTO `usr` (`usr_id`, `usr_name`, `usr_pass`, `last_name`, `first_name`) VALUES
(1, 'hpt', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'Tùng', 'Hoa');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cambien_doam`
--
ALTER TABLE `cambien_doam`
  ADD PRIMARY KEY (`house_id`,`Room_ID`,`time`),
  ADD KEY `Room_ID` (`Room_ID`);

--
-- Indexes for table `cambien_nhietdo`
--
ALTER TABLE `cambien_nhietdo`
  ADD PRIMARY KEY (`house_id`,`Room_ID`,`time`),
  ADD KEY `Room_ID` (`Room_ID`);

--
-- Indexes for table `devices`
--
ALTER TABLE `devices`
  ADD PRIMARY KEY (`house_id`,`room_id`,`device_id`),
  ADD KEY `room_id` (`room_id`);

--
-- Indexes for table `house`
--
ALTER TABLE `house`
  ADD PRIMARY KEY (`house_id`,`usr_id`),
  ADD UNIQUE KEY `house_id` (`house_id`),
  ADD UNIQUE KEY `usr_id` (`usr_id`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`room_id`,`house_id`),
  ADD KEY `room_ibfk_1` (`house_id`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`usr_id`,`val`),
  ADD UNIQUE KEY `val` (`val`);

--
-- Indexes for table `usr`
--
ALTER TABLE `usr`
  ADD PRIMARY KEY (`usr_id`),
  ADD UNIQUE KEY `usr_id` (`usr_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cambien_doam`
--
ALTER TABLE `cambien_doam`
  ADD CONSTRAINT `cambien_doam_ibfk_1` FOREIGN KEY (`house_id`) REFERENCES `house` (`house_id`),
  ADD CONSTRAINT `cambien_doam_ibfk_2` FOREIGN KEY (`Room_ID`) REFERENCES `room` (`room_id`);

--
-- Constraints for table `cambien_nhietdo`
--
ALTER TABLE `cambien_nhietdo`
  ADD CONSTRAINT `cambien_nhietdo_ibfk_1` FOREIGN KEY (`house_id`) REFERENCES `house` (`house_id`),
  ADD CONSTRAINT `cambien_nhietdo_ibfk_2` FOREIGN KEY (`Room_ID`) REFERENCES `room` (`room_id`);

--
-- Constraints for table `devices`
--
ALTER TABLE `devices`
  ADD CONSTRAINT `devices_ibfk_1` FOREIGN KEY (`house_id`) REFERENCES `house` (`house_id`),
  ADD CONSTRAINT `devices_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`);

--
-- Constraints for table `house`
--
ALTER TABLE `house`
  ADD CONSTRAINT `house_ibfk_1` FOREIGN KEY (`usr_id`) REFERENCES `usr` (`usr_id`);

--
-- Constraints for table `room`
--
ALTER TABLE `room`
  ADD CONSTRAINT `room_ibfk_1` FOREIGN KEY (`house_id`) REFERENCES `house` (`house_id`);

--
-- Constraints for table `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`usr_id`) REFERENCES `usr` (`usr_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
