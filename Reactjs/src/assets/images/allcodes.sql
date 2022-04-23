-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 20, 2022 lúc 11:08 AM
-- Phiên bản máy phục vụ: 10.1.38-MariaDB
-- Phiên bản PHP: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `website_nhat`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `allcodes`
--

CREATE TABLE `allcodes` (
  `id` int(11) NOT NULL,
  `type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `valueEn` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `valueVi` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `allcodes`
--

INSERT INTO `allcodes` (`id`, `type`, `keyMap`, `valueEn`, `valueVi`, `createdAt`, `updatedAt`) VALUES
(1, 'ROLE', 'R1', 'Admin', 'Quản trị viên', NULL, NULL),
(2, 'ROLE', 'R2', 'Giver', 'Người cho', NULL, NULL),
(3, 'ROLE', 'R3', 'Recipient', 'Người nhận', NULL, NULL),
(4, 'STATUS', 'S1', 'New', 'Lịch hẹn mới', NULL, NULL),
(5, 'STATUS', 'S2', 'Confirmed', 'Đã xác nhận', NULL, NULL),
(6, 'STATUS', 'S3', 'Done', 'Đã nhận xong', NULL, NULL),
(7, 'STATUS', 'S4', 'Cancel', 'Đã hủy', NULL, NULL),
(8, 'GENDER', 'M', 'Male', 'Nam', NULL, NULL),
(9, 'GENDER', 'F', 'Female', 'Nữ', NULL, NULL),
(10, 'GENDER', 'O', 'Other', 'Khác', NULL, NULL),
(11, 'TIME', 'T1', '8:00 AM - 9:00 AM', '8:00 - 9:00', NULL, NULL),
(12, 'TIME', 'T2', '9:00 AM - 10:00 AM', '9:00 - 10:00', NULL, NULL),
(13, 'TIME', 'T3', '10:00 AM - 11:00 AM', '10:00 - 11:00', NULL, NULL),
(14, 'TIME', 'T4', '11:00 AM - 0:00 PM', '11:00 - 12:00', NULL, NULL),
(15, 'TIME', 'T5', '1:00 PM - 2:00 PM', '13:00 - 14:00', NULL, NULL),
(16, 'TIME', 'T6', '2:00 PM - 3:00 PM', '14:00 - 15:00', NULL, NULL),
(17, 'TIME', 'T7', '3:00 PM - 4:00 PM', '15:00 - 16:00', NULL, NULL),
(18, 'TIME', 'T8', '4:00 PM - 5:00 PM', '16:00 - 17:00', NULL, NULL);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `allcodes`
--
ALTER TABLE `allcodes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `allcodes`
--
ALTER TABLE `allcodes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
