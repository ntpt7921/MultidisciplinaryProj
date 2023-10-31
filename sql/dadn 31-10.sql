-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 31, 2023 at 08:46 AM
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
(1, 1, 10, '21/10/2023 8:27'),
(1, 1, 10, '28/10/2023 19:00'),
(1, 1, 15, '28/10/2023 19:01'),
(1, 1, 20, '28/10/2023 19:02'),
(1, 1, 25, '28/10/2023 19:03'),
(1, 1, 30, '28/10/2023 19:04'),
(1, 1, 35, '28/10/2023 19:05'),
(1, 1, 40, '28/10/2023 19:06'),
(1, 1, 45, '28/10/2023 19:07'),
(1, 1, 50, '28/10/2023 19:08'),
(1, 1, 55, '28/10/2023 19:09'),
(1, 1, 60, '28/10/2023 19:10'),
(1, 2, 33, '21/10/2023 8:00'),
(1, 3, 88, '21/10/2023 8:05');

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
(1, 1, 25, '28/10/2023 19:22'),
(1, 1, 30, '28/10/2023 19:30'),
(1, 2, 20, '20/10/2023 2:50'),
(1, 2, 25, '21/10/2023 2:49'),
(1, 2, 10, '21/10/2023 7:20'),
(1, 2, 12, '28/10/2023 16:22'),
(1, 2, 30, '28/10/2023 16:23'),
(1, 2, 50, '28/10/2023 16:25'),
(1, 2, 10, '28/10/2023 16:26'),
(1, 2, 30, '28/10/2023 16:27'),
(1, 2, 40, '28/10/2023 16:28'),
(1, 2, 25, '28/10/2023 19:22'),
(1, 2, 25, '28/10/2023 19:30'),
(1, 3, 10, '20/10/2023 2:50'),
(1, 3, 20, '21/10/2023 2:49'),
(1, 3, 123, '22/10/2023 7:22'),
(1, 3, 30, '28/10/2023 16:22'),
(1, 3, 40, '28/10/2023 16:23'),
(1, 3, 50, '28/10/2023 16:25'),
(1, 3, 40, '28/10/2023 16:26'),
(1, 3, 35, '28/10/2023 16:27'),
(1, 3, 32, '28/10/2023 16:28'),
(1, 3, 28, '28/10/2023 19:22'),
(1, 3, 22, '28/10/2023 19:30'),
(1, 4, 5, '20/10/2023 2:50'),
(1, 4, 20, '21/10/2023 2:49'),
(1, 4, 40, '28/10/2023 16:22'),
(1, 4, 0, '28/10/2023 16:23'),
(1, 4, 10, '28/10/2023 16:25'),
(1, 4, 20, '28/10/2023 16:26'),
(1, 4, 5, '28/10/2023 16:27'),
(1, 4, 2, '28/10/2023 16:28'),
(1, 4, 44, '28/10/2023 19:22'),
(1, 4, 22, '28/10/2023 19:30');

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
(1, 2, 2, 'air-conditioner', 1),
(1, 3, 1, 'fan', 0),
(1, 3, 2, 'light', 0),
(1, 4, 1, 'fan', 0),
(1, 4, 2, 'light', 0);

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
  `room_name` varchar(30) DEFAULT NULL,
  `last_check` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`room_id`, `house_id`, `room_name`, `last_check`) VALUES
(1, 1, 'living room', '2023-10-31 15:44'),
(2, 1, 'bed room', NULL),
(3, 1, 'kitchen', NULL),
(4, 1, 'bed room 2', NULL);

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
(1, 'eyJ1c2VyX2lkIjoiMSJ9.eyJ0aW1lIjoiMjAyMy0xMC0zMSAwNzo1NTo0OSJ9.bhcT8hSBR5mFIz3-NYRXbNQM3yiQaPRSBzKLipsHA6Q', '2023-10-31 07:55:49'),
(1, 'eyJ1c2VyX2lkIjoiMSJ9.eyJ0aW1lIjoiMjAyMy0xMC0zMSAxMzowMTowNyJ9.uXdwCofK1r6ZnXXqdqJ85JJLKGzz0YTJ9ldqppgq2z4', '2023-10-31 13:01:07'),
(1, 'eyJ1c2VyX2lkIjoiMSJ9.eyJ0aW1lIjoiMjAyMy0xMC0zMSAxODo1OToxOCJ9.9yPQ-m28bPH0hTMrvf0HgeZJMzKOZ4heMFoUnGSXNrI', '2023-10-31 18:59:18'),
(1, 'eyJ1c2VyX2lkIjoiMSJ9.eyJ0aW1lIjoiMjAyMy0xMC0zMSAyMToxNDoxNyJ9.99YSan-Pweh5UYZiTCdYTR0BPxpS-7QZNHAhlLouK58', '2023-10-31 21:14:17'),
(1, 'eyJ1c2VyX2lkIjoiMSJ9.eyJ0aW1lIjoiMjAyMy0xMS0wMSAxMTozNjo0NSJ9.1sY03By8zeovadZH-RE-PmDbytIQQmM64IBDyPS_D2w', '2023-11-01 11:36:45'),
(1, 'eyJ1c2VyX2lkIjoiMSJ9.eyJ0aW1lIjoiMjAyMy0xMS0wMSAxMzo1MjowNSJ9.CkCS-g3WHB1v9C2WdU7FUO8yc8fSQcdnzWGfB_5V-B8', '2023-11-01 13:52:05'),
(1, 'eyJ1c2VyX2lkIjoiMSJ9.eyJ0aW1lIjoiMjAyMy0xMS0wMSAxNTo0NDo0NyJ9.MHVHASVk0zxCtMNOxOZYGnZmGqM1_vQqzFROfwtmgsQ', '2023-11-01 15:44:47');

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
