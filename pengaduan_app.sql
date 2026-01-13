-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 13, 2026 at 02:24 PM
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
-- Database: `pengaduan_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `complaints`
--

CREATE TABLE `complaints` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `content` text NOT NULL,
  `status` enum('baru','diproses','selesai') DEFAULT 'baru',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `complaints`
--

INSERT INTO `complaints` (`id`, `user_id`, `title`, `content`, `status`, `created_at`) VALUES
(1, 2, 'test', 'test123', 'baru', '2025-12-31 12:13:08'),
(2, 2, 'es krim', 'kemarin itu ada yang nyuri es krim dan di paken buat bikin bahan terkuat di bumi yaitu anti material. nah aku cegat dan ke tabrak truk dan akhirnya reinkarnasi di dunia lain di dunia bernama indonesia yang hancur karena sawit dan koruptor', 'baru', '2026-01-02 07:53:35'),
(3, 2, 'lupa', 'uhh aku lupa mau report apa. nanti ajalah kapan kapan kalo teringat', 'baru', '2026-01-02 08:00:53'),
(4, 3, 'baru', 'aku baru masuk sekolah udh di bully . tapi pembully nya agak lain karena dia nyerang aku pake busa. yaudah aku serang balik pake APFSDS di tank M829 yang sering ku bawa ke sekolah ', 'baru', '2026-01-02 08:04:26'),
(5, 2, 'ketidakadilan dalam ujian', 'saya jujur dalam mengerjakan tugas namun teman teman saya buka hp dan ai. saya coba bilang dan duh ketahuan ama guru. terus sepulang sekolah saya di bully ama orang yang curang ujian itu. saya takut di bully lagi. tolong kasih rudal ke rumah nya', NULL, '2026-01-05 13:16:43'),
(6, 3, 'test1', 'test1', 'baru', '2026-01-05 15:05:10'),
(7, 3, 'test2', 'test2', 'baru', '2026-01-05 15:05:15');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'admin', 'admin@test.com', '$2b$10$iaoyKTW4Dh5Uyt3rEZ6O7O0jmIKVgWf6yfrcV4FWZU0orraDLEOC6', 'admin', '2025-12-31 10:34:40'),
(2, 'red', 'red@gmail.com', '$2b$10$gx444kDFXRjPtPVr8j87sOQalgUedg2pfUETwbZUaricDk3YkvECG', 'user', '2025-12-31 10:38:54'),
(3, 'blue', 'blue@gmail.com', '$2b$10$rLUzvgprKCZkgchxlARkTexgfVlLM95G8oMgduXw2txpM.Ep1g8tm', 'user', '2026-01-02 08:01:23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `complaints`
--
ALTER TABLE `complaints`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `complaints`
--
ALTER TABLE `complaints`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `complaints`
--
ALTER TABLE `complaints`
  ADD CONSTRAINT `complaints_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
