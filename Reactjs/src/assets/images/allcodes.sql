-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th8 25, 2022 lúc 07:24 AM
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
  `keyMap` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `valueEn` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `valueVi` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `allcodes`
--

INSERT INTO `allcodes` (`id`, `keyMap`, `type`, `valueEn`, `valueVi`, `createdAt`, `updatedAt`) VALUES
(1, 'R1', 'ROLE', 'Admin', 'Quản trị viên', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'R2', 'ROLE', 'Giver', 'Người cho', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'R3', 'ROLE', 'Recipient', 'Người nhận thu gom', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'T1', 'TIME', '8:00 AM - 9:00 AM', '8:00 - 9:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'T2', 'TIME', '9:00 AM - 10:00 AM', '9:00 - 10:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 'T3', 'TIME', '10:00 AM - 11:00 AM', '10:00 - 11:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 'T4', 'TIME', '11:00 AM - 0:00 PM', '11:00 - 12:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, 'T5', 'TIME', '1:00 PM - 2:00 PM', '13:00 - 14:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(9, 'T6', 'TIME', '2:00 PM - 3:00 PM', '14:00 - 15:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(10, 'T7', 'TIME', '3:00 PM - 4:00 PM', '15:00 - 16:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(11, 'T8', 'TIME', '4:00 PM - 5:00 PM', '16:00 - 17:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(12, 'M', 'GENDER', 'Male', 'Nam', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(13, 'F', 'GENDER', 'Female', 'Nữ', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(14, 'O', 'GENDER', 'Other', 'Khác', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(15, 'S1', 'STATUS', 'Unconfimred', 'Chưa xác nhận', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(16, 'S2', 'STATUS', 'Registered', 'Đã đăng ký', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(17, 'S3', 'STATUS', 'Done', 'Đã nhận xong', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(18, 'S4', 'STATUS', 'Cancel', 'Đã hủy', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

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
