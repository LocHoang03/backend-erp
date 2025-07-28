-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: erp_mini
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attendances`
--

DROP TABLE IF EXISTS `attendances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendances` (
  `id` int NOT NULL AUTO_INCREMENT,
  `work_date` date NOT NULL,
  `check_in` time DEFAULT NULL,
  `check_out` time DEFAULT NULL,
  `status` enum('Đúng giờ','Đi trễ','Vắng mặt') NOT NULL DEFAULT 'Đúng giờ',
  `note` text,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `employee_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_04289f855eb1c2ef15f9789db5` (`employee_id`,`work_date`),
  CONSTRAINT `FK_43dca8b4751d7449a38b583991c` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendances`
--

LOCK TABLES `attendances` WRITE;
/*!40000 ALTER TABLE `attendances` DISABLE KEYS */;
INSERT INTO `attendances` VALUES (1,'2025-07-01','07:53:00','17:32:18','Đúng giờ',NULL,'2025-07-01 21:18:53.181412','2025-07-01 21:45:25.000000',19),(2,'2025-07-01','15:55:35','17:20:00','Đi trễ',NULL,'2025-07-01 21:26:58.733232','2025-07-02 15:56:48.000000',16),(3,'2025-07-02','07:49:00','17:30:00','Đúng giờ',NULL,'2025-07-01 21:49:44.559055','2025-07-01 23:13:11.000000',12);
/*!40000 ALTER TABLE `attendances` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `is_deleted` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_8b0be371d28245da6e4f4b6187` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Tivi','TV LED, OLED, QLED, Android TV','2025-06-29 10:34:11.539085','2025-06-29 10:34:11.539085',0),(2,'Điện thoại','Smartphone, điện thoại phổ thông','2025-06-29 10:34:11.539085','2025-06-29 10:34:11.539085',0),(3,'Laptop','Laptop học tập, làm việc, gaming','2025-06-29 10:34:11.539085','2025-06-29 10:34:11.539085',0),(4,'Máy tính bảng','iPad, Android Tablet','2025-06-29 10:34:11.539085','2025-06-29 10:34:11.539085',0),(5,'Máy giặt','Cửa trước, cửa trên, có sấy','2025-06-29 10:34:11.539085','2025-06-29 10:34:11.539085',0),(6,'Tủ lạnh','Tủ lạnh đôi, mini, side-by-side','2025-06-29 10:34:11.539085','2025-06-29 10:34:11.539085',0),(7,'Điều hòa','Máy lạnh treo tường, di động','2025-06-29 10:34:11.539085','2025-06-29 10:34:11.539085',0),(8,'Máy hút bụi','Cầm tay, robot hút bụi','2025-06-29 10:34:11.539085','2025-06-29 10:34:11.539085',0),(9,'Thiết bị mạng','Router Wi-Fi, mesh, modem','2025-06-29 10:34:11.539085','2025-06-29 10:34:11.539085',0),(10,'Camera giám sát','Camera IP, ghi hình an ninh','2025-06-29 10:34:11.539085','2025-06-29 10:34:11.539085',0),(11,'Nồi chiên không dầu','Nồi điện đa năng chiên nướng','2025-06-29 10:34:11.539085','2025-06-29 10:34:11.539085',0),(12,'Bếp điện & Bếp từ','Bếp đơn, đôi, cao cấp','2025-06-29 10:34:11.539085','2025-06-29 10:34:11.539085',0),(13,'Máy xay & Ép','Máy xay sinh tố, ép chậm','2025-06-29 10:34:11.539085','2025-06-29 10:34:11.539085',0),(14,'Máy nước nóng','Nóng lạnh, bình nước nóng','2025-06-29 10:34:11.539085','2025-06-29 10:34:11.539085',0),(15,'Loa Bluetooth','Loa mini, loa karaoke','2025-06-29 10:34:11.539085','2025-06-29 10:34:11.539085',0),(16,'Tai nghe','Bluetooth, chụp tai, nhét tai','2025-06-29 10:34:11.539085','2025-06-29 10:34:11.539085',0),(17,'Đồng hồ thông minh','Apple Watch, Mi Band','2025-06-29 10:34:11.539085','2025-06-29 10:34:11.539085',0),(18,'Phụ kiện điện thoại','Ốp, kính cường lực, sạc, cáp','2025-06-29 10:34:11.539085','2025-06-29 10:34:11.539085',0),(19,'Thiết bị lưu trữ','USB, ổ cứng, thẻ nhớ','2025-06-29 10:34:11.539085','2025-06-29 10:34:11.539085',0),(20,'Máy in & Phụ kiện','Máy in, mực in, giấy in','2025-06-29 10:34:11.539085','2025-06-29 10:34:11.539085',0),(21,'test1','test','2025-06-30 09:27:52.419505','2025-06-30 09:28:13.000000',1);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text,
  `is_deleted` tinyint NOT NULL DEFAULT '0',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'Nguyễn Văn An','an.nguyen@example.com','0901234567','123 Lê Lợi, Quận 1, TP.HCM',0,'2025-07-16 16:07:33.000000','2025-07-16 16:07:33.000000'),(2,'Trần Thị Bích','bich.tran@example.com','0902345678','45 Nguyễn Huệ, Quận 1, TP.HCM',0,'2025-07-16 16:07:33.000000','2025-07-16 16:07:33.000000'),(3,'Lê Văn Cường','cuong.le@example.com','0903456789','78 Hai Bà Trưng, Quận 3, TP.HCM',0,'2025-07-16 16:07:33.000000','2025-07-16 16:07:33.000000'),(4,'Phạm Thị Dung','dung.pham@example.com','0904567890','12 Lý Tự Trọng, Quận 1, TP.HCM',0,'2025-07-16 16:07:33.000000','2025-07-16 16:07:33.000000'),(5,'Võ Minh Đức','duc.vo@example.com','0905678901','34 Trần Hưng Đạo, Quận 5, TP.HCM',0,'2025-07-16 16:07:33.000000','2025-07-16 16:07:33.000000'),(6,'Đinh Thị Hạnh','hanh.dinh@example.com','0906789012','56 CMT8, Quận 10, TP.HCM',0,'2025-07-16 16:07:33.000000','2025-07-16 16:07:33.000000'),(7,'Bùi Văn Hiếu','hieu.bui@example.com','0907890123','89 Phan Đăng Lưu, Bình Thạnh, TP.HCM',0,'2025-07-16 16:07:33.000000','2025-07-16 16:07:33.000000'),(8,'Ngô Thị Hoa','hoa.ngo@example.com','0908901234','123 Hoàng Văn Thụ, Phú Nhuận, TP.HCM',0,'2025-07-16 16:07:33.000000','2025-07-16 16:07:33.000000'),(9,'Lý Văn Hoàng','hoang.ly@example.com','0909012345','456 Võ Văn Kiệt, Quận 1, TP.HCM',0,'2025-07-16 16:07:33.000000','2025-07-16 16:07:33.000000'),(10,'Mai Thị Hương','huong.mai@example.com','0910123456','67 Nguyễn Trãi, Quận 5, TP.HCM',0,'2025-07-16 16:07:33.000000','2025-07-16 16:07:33.000000'),(11,'Hoàng Văn Khoa','khoa.hoang@example.com','0911234567','78 Bùi Thị Xuân, Quận 1, TP.HCM',0,'2025-07-16 16:07:33.000000','2025-07-16 16:07:33.000000'),(12,'Đỗ Thị Kim','kim.do@example.com','0912345678','90 Nguyễn Đình Chiểu, Quận 3, TP.HCM',0,'2025-07-16 16:07:33.000000','2025-07-16 16:07:33.000000'),(13,'Nguyễn Thị Lan','lan.nguyen@example.com','0913456789','101 Lê Văn Sỹ, Tân Bình, TP.HCM',0,'2025-07-16 16:07:33.000000','2025-07-16 16:07:33.000000'),(14,'Trần Văn Lợi','loi.tran@example.com','0914567890','123 Cộng Hòa, Tân Bình, TP.HCM',0,'2025-07-16 16:07:33.000000','2025-07-16 16:07:33.000000'),(15,'Lê Thị Mai','mai.le@example.com','0915678901','45 Đường 3/2, Quận 10, TP.HCM',0,'2025-07-16 16:07:33.000000','2025-07-16 16:07:33.000000'),(16,'Phạm Văn Minh','minh.pham@example.com','0916789012','67 Thành Thái, Quận 10, TP.HCM',0,'2025-07-16 16:07:33.000000','2025-07-16 16:07:33.000000'),(17,'Võ Thị Ngọc','ngoc.vo@example.com','0917890123','89 Tô Hiến Thành, Quận 10, TP.HCM',0,'2025-07-16 16:07:33.000000','2025-07-16 16:07:33.000000'),(18,'Đinh Văn Nam','nam.dinh@example.com','0918901234','12 Hòa Hưng, Quận 10, TP.HCM',0,'2025-07-16 16:07:33.000000','2025-07-16 16:07:33.000000'),(19,'Bùi Thị Nhung','nhung.bui@example.com','0919012345','34 Bắc Hải, Quận 10, TP.HCM',0,'2025-07-16 16:07:33.000000','2025-07-16 16:07:33.000000'),(20,'Ngô Văn Phong','phong.ngo@example.com','0920123456','56 Nguyễn Văn Trỗi, Phú Nhuận, TP.HCM',0,'2025-07-16 16:07:33.000000','2025-07-16 16:07:33.000000'),(21,'Lý Thị Quỳnh','quynh.ly@example.com','0921234567','78 Lê Quang Định, Gò Vấp, TP.HCM',0,'2025-07-16 16:07:33.000000','2025-07-16 16:07:33.000000'),(22,'Mai Văn Quân','quan.mai@example.com','0922345678','90 Quang Trung, Gò Vấp, TP.HCM',0,'2025-07-16 16:07:33.000000','2025-07-16 16:07:33.000000'),(23,'Hoàng Thị Sen','sen.hoang@example.com','0923456789','101 Thống Nhất, Gò Vấp, TP.HCM',0,'2025-07-16 16:07:33.000000','2025-07-16 16:07:33.000000'),(24,'Đỗ Văn Sơn','son.do@example.com','0924567890','123 Phạm Văn Đồng, Thủ Đức, TP.HCM',0,'2025-07-16 16:07:33.000000','2025-07-16 16:07:33.000000'),(25,'Nguyễn Văn Tài','tai.nguyen@example.com','0925678901','45 Tô Ngọc Vân, Thủ Đức, TP.HCM',0,'2025-07-16 16:07:33.000000','2025-07-16 16:07:33.000000'),(26,'Trần Thị Thảo','thao.tran@example.com','0926789012','67 Kha Vạn Cân, Thủ Đức, TP.HCM',0,'2025-07-16 16:07:33.000000','2025-07-16 16:07:33.000000'),(27,'Lê Văn Thành','thanh.le@example.com','0927890123','89 Phạm Ngũ Lão, Quận 1, TP.HCM',0,'2025-07-16 16:07:33.000000','2025-07-16 16:07:33.000000'),(28,'Phạm Thị Trang','trang.pham@example.com','0928901234','90 Nguyễn Cư Trinh, Quận 1, TP.HCM',0,'2025-07-16 16:07:33.000000','2025-07-16 16:07:33.000000'),(29,'Võ Văn Trường','truong.vo@example.com','0929012345','101 Nguyễn Thái Học, Quận 1, TP.HCM',0,'2025-07-16 16:07:33.000000','2025-07-16 16:07:33.000000'),(30,'Đinh Thị Yến','yen.dinh@example.com','0930123456','123 Điện Biên Phủ, Quận 3, TP.HCM',0,'2025-07-16 16:07:33.000000','2025-07-16 16:07:33.000000');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `description` varchar(255) NOT NULL,
  `is_deleted` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_91fddbe23e927e1e525c152baa` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'BOD','Ban giám đốc','2025-06-26 18:29:56.775070','2025-06-26 20:56:41.583797','Quản lý điều hành công ty',0),(2,'HR','Hành chính - Nhân sự','2025-06-26 18:29:56.775070','2025-06-26 18:29:56.775070','Tuyển dụng, lương, chấm công',0),(3,'ACC','Kế toán - Tài chính','2025-06-26 18:29:56.775070','2025-06-26 18:29:56.775070','Lập báo cáo tài chính, chi phí',0),(4,'SALE','Kinh doanh','2025-06-26 18:29:56.775070','2025-06-26 18:29:56.775070','Bán hàng, chăm sóc khách',0),(5,'MKT','Marketing','2025-06-26 18:29:56.775070','2025-06-26 18:29:56.775070','Quảng cáo, thương hiệu',0),(6,'IT','Kỹ thuật / IT','2025-06-26 18:29:56.775070','2025-06-26 18:29:56.775070','Phát triển phần mềm, hỗ trợ kỹ thuật',0),(7,'PROD','Sản xuất','2025-06-26 18:29:56.775070','2025-06-26 18:29:56.775070','Quản lý sản xuất, vận hành máy móc',0),(8,'WH','Kho / Vận chuyển','2025-06-26 18:29:56.775070','2025-06-26 18:29:56.775070','Quản lý kho, nhập xuất hàng',0),(9,'RND','Dự án / R&D','2025-06-26 18:29:56.775070','2025-06-26 18:29:56.775070','Nghiên cứu, triển khai dự án',0),(10,'test','test','2025-06-26 20:06:34.195573','2025-06-26 20:58:13.000000','test',1),(11,'test1','test12','2025-06-26 20:07:06.241530','2025-06-26 20:54:45.000000','test1',1);
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `gender` enum('Nam','Nữ') NOT NULL DEFAULT 'Nam',
  `birth_date` date DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `avatar_url` varchar(255) DEFAULT 'https://res.cloudinary.com/dzxupp48t/image/upload/v1750331385/image-ERP/trssjrrwj5hmk7hibu1v.webp',
  `status` enum('Thử việc','Đang làm','Nghỉ phép','Tạm nghỉ','Đã nghỉ') NOT NULL DEFAULT 'Thử việc',
  `national_id` varchar(20) NOT NULL,
  `department_id` int DEFAULT NULL,
  `position_id` int DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `avatar_id` varchar(255) DEFAULT NULL,
  `is_deleted` tinyint NOT NULL DEFAULT '0',
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e05c58bbdf174466081e1cfbea` (`national_id`),
  UNIQUE KEY `REL_2d83c53c3e553a48dadb9722e3` (`user_id`),
  KEY `FK_678a3540f843823784b0fe4a4f2` (`department_id`),
  KEY `FK_8b14204e8af5e371e36b8c11e1b` (`position_id`),
  CONSTRAINT `FK_2d83c53c3e553a48dadb9722e38` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_678a3540f843823784b0fe4a4f2` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`),
  CONSTRAINT `FK_8b14204e8af5e371e36b8c11e1b` FOREIGN KEY (`position_id`) REFERENCES `positions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'Nguyễn Văn A','Nam','1990-01-15','Hà Nội','0901234567','nguyenvana@example.com','https://res.cloudinary.com/dzxupp48t/image/upload/v1750331385/image-ERP/trssjrrwj5hmk7hibu1v.webp','Đang làm','012345678901',NULL,NULL,'2025-06-28 10:47:10.621240','2025-06-28 10:47:10.667800',NULL,0,NULL),(2,'Trần Thị B','Nữ','1992-05-10','TP.HCM','0912345678','tranthib@example.com','https://res.cloudinary.com/dzxupp48t/image/upload/v1750331385/image-ERP/trssjrrwj5hmk7hibu1v.webp','Thử việc','012345678902',NULL,NULL,'2025-06-28 10:47:10.621240','2025-06-28 10:47:10.667800',NULL,0,NULL),(3,'Lê Văn C','Nam','1988-03-20','Đà Nẵng','0934567890','levanc@example.com','https://res.cloudinary.com/dzxupp48t/image/upload/v1750331385/image-ERP/trssjrrwj5hmk7hibu1v.webp','Đã nghỉ','012345678903',NULL,NULL,'2025-06-28 10:47:10.621240','2025-06-28 10:47:10.667800',NULL,0,NULL),(4,'Phạm Thị D','Nữ','1995-08-25','Cần Thơ','0978123456','phamthid@example.com','https://res.cloudinary.com/dzxupp48t/image/upload/v1750331385/image-ERP/trssjrrwj5hmk7hibu1v.webp','Tạm nghỉ','012345678904',NULL,NULL,'2025-06-28 10:47:10.621240','2025-06-28 10:47:10.667800',NULL,0,NULL),(5,'Hoàng Văn E','Nam','1993-11-11','Hải Phòng','0967123456','hoangvane@example.com','https://res.cloudinary.com/dzxupp48t/image/upload/v1750331385/image-ERP/trssjrrwj5hmk7hibu1v.webp','Đang làm','012345678905',NULL,NULL,'2025-06-28 10:47:10.621240','2025-06-28 10:47:10.667800',NULL,0,NULL),(6,'Đỗ Thị F','Nữ','1990-12-12','Hà Nam','0987654321','dothif@example.com','https://res.cloudinary.com/dzxupp48t/image/upload/v1750331385/image-ERP/trssjrrwj5hmk7hibu1v.webp','Nghỉ phép','012345678906',NULL,NULL,'2025-06-28 10:47:10.621240','2025-06-28 10:47:10.667800',NULL,0,NULL),(7,'Vũ Văn G','Nam','1987-09-09','Bắc Ninh','0945678901','vuvang@example.com','https://res.cloudinary.com/dzxupp48t/image/upload/v1750331385/image-ERP/trssjrrwj5hmk7hibu1v.webp','Đang làm','012345678907',NULL,NULL,'2025-06-28 10:47:10.621240','2025-06-28 10:47:10.667800',NULL,0,NULL),(8,'Ngô Thị H','Nữ','1996-04-04','Thanh Hóa','0956789012','ngothih@example.com','https://res.cloudinary.com/dzxupp48t/image/upload/v1750331385/image-ERP/trssjrrwj5hmk7hibu1v.webp','Thử việc','012345678908',NULL,NULL,'2025-06-28 10:47:10.621240','2025-06-28 10:47:10.667800',NULL,0,NULL),(9,'Mai Văn I','Nam','1991-07-07','Nghệ An','0934561234','maivani@example.com','https://res.cloudinary.com/dzxupp48t/image/upload/v1750331385/image-ERP/trssjrrwj5hmk7hibu1v.webp','Đang làm','012345678909',NULL,NULL,'2025-06-28 10:47:10.621240','2025-06-28 10:47:10.667800',NULL,0,NULL),(10,'Lý Thị K','Nữ','1994-06-06','Quảng Ninh','0923456789','lythik@example.com','https://res.cloudinary.com/dzxupp48t/image/upload/v1750331385/image-ERP/trssjrrwj5hmk7hibu1v.webp','Tạm nghỉ','012345678910',NULL,NULL,'2025-06-28 10:47:10.621240','2025-06-28 10:47:10.667800',NULL,0,NULL),(12,'lộc','Nam','2025-06-28','hcm','0909123456','loc@gmail.com','https://res.cloudinary.com/dzxupp48t/image/upload/v1751109219/image-ERP/vd0bckdauwnldflrtsrn.jpg','Thử việc','090909090909',NULL,NULL,'2025-06-28 11:13:39.225340','2025-06-28 11:13:39.225340',NULL,0,NULL),(13,'lộc','Nam','2025-06-28','hcm','0909123455','loc1@gmail.com','https://res.cloudinary.com/dzxupp48t/image/upload/v1751111427/image-ERP/afidtzbj7ip13db6kjzp.jpg','Thử việc','090909090908',5,4,'2025-06-28 11:50:27.479702','2025-06-28 11:50:27.479702',NULL,0,NULL),(14,'â','Nữ','2025-06-28','hcm','0909876543','nu@gmail.com','https://res.cloudinary.com/dzxupp48t/image/upload/v1751111610/image-ERP/u7phlspme0ec4q6yiuoh.jpg','Đang làm','080808080808',7,4,'2025-06-28 11:53:30.438861','2025-06-28 11:53:30.438861',NULL,0,NULL),(15,'test01','Nam','2025-06-28','hcm','0909','a@gmail.com','https://res.cloudinary.com/dzxupp48t/image/upload/v1751111734/image-ERP/h2l0zkmmt3qe1hkvmbza.jpg','Thử việc','0909',5,3,'2025-06-28 11:55:33.798325','2025-06-28 11:55:33.798325',NULL,0,NULL),(16,'cc','Nam','2025-06-28','hcm','0909878678','cc@gmail.com','https://res.cloudinary.com/dzxupp48t/image/upload/v1751114895/image-ERP/azqdkxquqygbv233q7yy.jpg','Thử việc','09091111',5,5,'2025-06-28 12:48:15.018650','2025-06-28 12:48:15.018650',NULL,0,NULL),(17,'ww','Nam','2025-06-28','ww','0876123','lo@gmail.com','https://res.cloudinary.com/dzxupp48t/image/upload/v1751115048/image-ERP/v10gchjhk5mcpyqr7lla.jpg','Thử việc','0123456',7,5,'2025-06-28 12:50:48.188726','2025-06-28 12:50:48.188726',NULL,0,NULL),(18,'uu','Nam','2025-06-28','hkk','0987654351','kk1@gmail.com','https://res.cloudinary.com/dzxupp48t/image/upload/v1751115604/image-ERP/j6jlmdrivzlg5g00lpg5.jpg','Thử việc','012345678900',3,6,'2025-06-28 13:00:03.548330','2025-06-28 13:00:03.548330',NULL,0,NULL),(19,'tt','Nam','2025-06-28','tt','0909999111','locc@gmail.com','https://res.cloudinary.com/dzxupp48t/image/upload/v1752230747/image-ERP/erh0d01umerchmy4fhts.webp','Thử việc','000011112222',6,5,'2025-06-28 13:11:30.687754','2025-07-11 10:45:46.000000','image-ERP/erh0d01umerchmy4fhts',0,NULL),(20,'loc1','Nam','2025-06-28','hcm','0909111888','looo@gmail.com','https://res.cloudinary.com/dzxupp48t/image/upload/v1751118400/image-ERP/cnhgf4h7ywjtwafm0vzc.webp','Thử việc','000099998888',6,7,'2025-06-28 13:12:22.993353','2025-06-28 13:46:40.000000','image-ERP/cnhgf4h7ywjtwafm0vzc',0,NULL),(27,'yt','Nam','2025-06-28','ttt','0909890098','111@gmail.com','https://res.cloudinary.com/dzxupp48t/image/upload/v1751119081/image-ERP/dmecbvugkfyustzpohg9.webp','Thử việc','000033336666',8,4,'2025-06-28 13:52:22.674876','2025-06-28 14:03:41.000000','image-ERP/dmecbvugkfyustzpohg9',1,NULL);
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `price` decimal(15,2) NOT NULL,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_145532db85752b29c57d2b7b1f1` (`order_id`),
  KEY `FK_9263386c35b6b242540f9493b00` (`product_id`),
  CONSTRAINT `FK_145532db85752b29c57d2b7b1f1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_9263386c35b6b242540f9493b00` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,2,120000.00,1,3),(2,1,80000.00,1,7),(3,3,95000.00,2,5),(4,1,220000.00,3,10),(5,2,110000.00,3,2),(6,1,135000.00,4,14),(7,4,150000.00,5,1),(8,2,160000.00,6,6),(9,1,175000.00,6,9),(10,3,90000.00,7,11),(11,1,125000.00,7,4),(12,2,89000.00,8,18),(13,1,145000.00,9,16),(14,2,110000.00,10,20),(15,2,99000.00,10,8),(16,1,159000.00,11,13),(17,1,150000.00,11,1),(18,2,120000.00,12,3),(19,3,95000.00,13,5),(20,1,210000.00,14,19),(21,1,80000.00,14,7),(22,4,102000.00,15,12),(23,2,160000.00,16,6),(24,1,110000.00,17,2),(25,3,98000.00,18,17),(26,2,220000.00,19,10),(27,1,175000.00,20,9),(28,2,135000.00,21,14),(29,3,99000.00,22,8),(30,1,125000.00,23,4),(31,1,105000.00,24,15),(32,1,90000.00,24,11),(33,2,145000.00,25,16),(34,1,110000.00,26,20),(35,2,150000.00,27,1),(36,1,89000.00,28,18),(37,3,120000.00,29,3),(38,2,95000.00,30,5);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `total_amount` decimal(15,2) NOT NULL DEFAULT '0.00',
  `status` enum('Chờ thanh toán','Đã thanh toán','Đã hủy') NOT NULL DEFAULT 'Chờ thanh toán',
  `customer_id` int DEFAULT NULL,
  `payment_method` enum('Chưa xác định','Tiền mặt','Chuyển khoản ngân hàng','Ví điện tử') NOT NULL DEFAULT 'Chưa xác định',
  PRIMARY KEY (`id`),
  KEY `FK_772d0ce0473ac2ccfa26060dbe9` (`customer_id`),
  CONSTRAINT `FK_772d0ce0473ac2ccfa26060dbe9` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'2025-07-16 16:27:50.000000',1250000.00,'Chờ thanh toán',1,'Chưa xác định'),(2,'2025-07-16 16:27:50.000000',2500000.00,'Đã thanh toán',2,'Tiền mặt'),(3,'2025-07-16 16:27:50.000000',980000.00,'Đã hủy',3,'Chưa xác định'),(4,'2025-07-16 16:27:50.000000',1500000.00,'Chờ thanh toán',4,'Chưa xác định'),(5,'2025-07-16 16:27:50.000000',2000000.00,'Đã thanh toán',5,'Tiền mặt'),(6,'2025-07-16 16:27:50.000000',1150000.00,'Chờ thanh toán',6,'Chưa xác định'),(7,'2025-07-16 16:27:50.000000',1750000.00,'Đã thanh toán',7,'Tiền mặt'),(8,'2025-07-16 16:27:50.000000',880000.00,'Đã hủy',8,'Chưa xác định'),(9,'2025-07-16 16:27:50.000000',2300000.00,'Đã thanh toán',9,'Tiền mặt'),(10,'2025-07-16 16:27:50.000000',1430000.00,'Chờ thanh toán',10,'Chưa xác định'),(11,'2025-07-16 16:27:50.000000',1250000.00,'Đã thanh toán',11,'Tiền mặt'),(12,'2025-07-16 16:27:50.000000',990000.00,'Đã hủy',12,'Chưa xác định'),(13,'2025-07-16 16:27:50.000000',1120000.00,'Chờ thanh toán',13,'Chưa xác định'),(14,'2025-07-16 16:27:50.000000',1980000.00,'Đã thanh toán',14,'Tiền mặt'),(15,'2025-07-16 16:27:50.000000',1540000.00,'Đã thanh toán',15,'Tiền mặt'),(16,'2025-07-16 16:27:50.000000',870000.00,'Chờ thanh toán',16,'Chưa xác định'),(17,'2025-07-16 16:27:50.000000',1290000.00,'Đã thanh toán',17,'Tiền mặt'),(18,'2025-07-16 16:27:50.000000',1390000.00,'Đã hủy',18,'Chưa xác định'),(19,'2025-07-16 16:27:50.000000',1000000.00,'Chờ thanh toán',19,'Chưa xác định'),(20,'2025-07-16 16:27:50.000000',1670000.00,'Đã thanh toán',20,'Tiền mặt'),(21,'2025-07-16 16:27:50.000000',1930000.00,'Chờ thanh toán',21,'Chưa xác định'),(22,'2025-07-16 16:27:50.000000',830000.00,'Đã thanh toán',22,'Ví điện tử'),(23,'2025-07-16 16:27:50.000000',1050000.00,'Đã hủy',23,'Chưa xác định'),(24,'2025-07-16 16:27:50.000000',1180000.00,'Đã thanh toán',24,'Ví điện tử'),(25,'2025-07-16 16:27:50.000000',990000.00,'Chờ thanh toán',25,'Chưa xác định'),(26,'2025-07-16 16:27:50.000000',1350000.00,'Đã thanh toán',26,'Ví điện tử'),(27,'2025-07-16 16:27:50.000000',1740000.00,'Chờ thanh toán',27,'Chưa xác định'),(28,'2025-07-16 16:27:50.000000',1610000.00,'Đã thanh toán',28,'Ví điện tử'),(29,'2025-07-16 16:27:50.000000',920000.00,'Đã hủy',29,'Chưa xác định'),(30,'2025-07-16 16:27:50.000000',880000.00,'Chờ thanh toán',30,'Chưa xác định');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partners`
--

DROP TABLE IF EXISTS `partners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partners` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `tax_code` varchar(255) DEFAULT NULL,
  `type` enum('Khách hàng','Nhà cung cấp') NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partners`
--

LOCK TABLES `partners` WRITE;
/*!40000 ALTER TABLE `partners` DISABLE KEYS */;
INSERT INTO `partners` VALUES (1,'ac','a@gmail.com','0909123456','ac','000011112222','Khách hàng',1,'2025-07-04 15:18:08.277936','2025-07-04 15:24:25.887258');
/*!40000 ALTER TABLE `partners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `is_active` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_48ce552495d14eae9b187bb671` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (2,'manage-accounts.read','Xem tài khoản nhân sự','2025-06-22 17:52:17.000000',1),(3,'manage-accounts.create','Tạo tài khoản nhân sự','2025-06-22 17:52:17.000000',1),(4,'manage-accounts.edit','Sửa tài khoản nhân sự','2025-06-22 17:52:17.000000',1),(5,'manage-accounts.delete','Xóa tài khoản nhân sự','2025-06-22 17:52:17.000000',1),(6,'permissions.read','Xem quyền','2025-06-22 17:52:17.000000',1),(7,'permissions.create','Tạo quyền','2025-06-22 17:52:17.000000',1),(8,'permissions.edit','Sửa quyền','2025-06-22 17:52:17.000000',1),(9,'permissions.delete','Xóa quyền','2025-06-22 17:52:17.000000',1),(10,'roles.read','Xem vai trò','2025-06-22 17:52:17.000000',1),(11,'roles.create','Tạo vai trò','2025-06-22 17:52:17.000000',1),(12,'roles.edit','Sửa vai trò','2025-06-22 17:52:17.000000',1),(13,'roles.delete','Xóa vai trò','2025-06-22 17:52:17.000000',1),(14,'employees.read','Xem nhân sự','2025-06-22 17:52:17.000000',1),(15,'employees.create','Tạo nhân sự','2025-06-22 17:52:17.000000',1),(16,'employees.edit','Sửa nhân sự','2025-06-22 17:52:17.000000',1),(17,'employees.delete','Xóa nhân sự','2025-06-22 17:52:17.000000',1),(18,'warehouses.read','Xem kho','2025-06-22 17:52:17.000000',1),(19,'warehouses.create','Tạo kho','2025-06-22 17:52:17.000000',1),(20,'warehouses.edit','Sửa kho','2025-06-22 17:52:17.000000',1),(21,'warehouses.delete','Xóa kho','2025-06-22 17:52:17.000000',1),(22,'products.read','Xem sản phẩm','2025-06-22 17:52:17.000000',1),(23,'products.create','Tạo sản phẩm','2025-06-22 17:52:17.000000',1),(24,'products.edit','Sửa sản phẩm','2025-06-22 17:52:17.000000',1),(25,'products.delete','Xóa sản phẩm','2025-06-22 17:52:17.000000',1),(26,'attendances.read','Xem chấm công','2025-06-22 17:52:17.000000',1),(27,'attendances.create','Tạo chấm công','2025-06-22 17:52:17.000000',1),(28,'attendances.edit','Sửa chấm công','2025-06-22 17:52:17.000000',1),(29,'attendances.delete','Xóa chấm công','2025-06-22 17:52:17.000000',1),(30,'salary.read','Xem lương','2025-06-22 17:52:17.000000',1),(31,'salary.create','Tạo lương','2025-06-22 17:52:17.000000',1),(32,'salary.edit','Sửa lương','2025-06-22 17:52:17.000000',1),(33,'salary.delete','Xóa lương','2025-06-22 17:52:17.000000',1),(34,'projects.read','Xem dự án','2025-06-22 17:52:17.000000',1),(35,'projects.create','Tạo dự án','2025-06-22 17:52:17.000000',1),(36,'projects.edit','Sửa dự án','2025-06-22 17:52:17.000000',1),(37,'projects.delete','Xóa dự án','2025-06-22 17:52:17.000000',1),(38,'tasks.read','Xem công việc','2025-06-22 17:52:17.000000',1),(39,'tasks.create','Tạo công việc','2025-06-22 17:52:17.000000',1),(40,'tasks.edit','Sửa công việc','2025-06-22 17:52:17.000000',1),(41,'tasks.delete','Xóa công việc','2025-06-22 17:52:17.000000',1),(42,'orders.read','Xem đơn hàng','2025-06-22 17:52:17.000000',1),(43,'orders.create','Tạo đơn hàng','2025-06-22 17:52:17.000000',1),(44,'orders.edit','Sửa đơn hàng','2025-06-22 17:52:17.000000',1),(45,'orders.delete','Xóa đơn hàng','2025-06-22 17:52:17.000000',1),(46,'warehouse-transactions.read','Xem xuất nhập','2025-06-22 17:52:17.000000',1),(47,'warehouse-transactions.create','Tạo phiếu xuất nhập','2025-06-22 17:52:17.000000',1),(48,'warehouse-transactions.edit','Sửa xuất nhập','2025-06-22 17:52:17.000000',1),(49,'warehouse-transactions.delete','Xóa xuất nhập','2025-06-22 17:52:17.000000',1),(80,'departments.read','Xem phòng ban','2025-07-07 22:31:24.383786',1),(81,'departments.create','Tạo phòng ban','2025-07-07 22:31:24.383786',1),(82,'departments.edit','Sửa phòng ban','2025-07-07 22:31:24.383786',1),(83,'departments.delete','Xóa phòng ban','2025-07-07 22:31:24.383786',1),(84,'positions.read','Xem vị trí công việc','2025-07-07 22:31:24.383786',1),(85,'positions.create','Tạo vị trí công việc','2025-07-07 22:31:24.383786',1),(86,'positions.edit','Sửa vị trí công việc','2025-07-07 22:31:24.383786',1),(87,'positions.delete','Xóa vị trí công việc','2025-07-07 22:31:24.383786',1),(88,'warehouses-transfers.read','Xem chuyển kho','2025-07-07 22:31:24.383786',1),(89,'warehouses-transfers.create','Tạo chuyển kho','2025-07-07 22:31:24.383786',1),(90,'warehouses-transfers.edit','Sửa chuyển kho','2025-07-07 22:31:24.383786',1),(91,'warehouses-transfers.delete','Xóa chuyển kho','2025-07-07 22:31:24.383786',1),(92,'category-products.read','Xem danh mục sản phẩm','2025-07-07 22:31:24.383786',1),(93,'category-products.create','Tạo danh mục sản phẩm','2025-07-07 22:31:24.383786',1),(94,'category-products.edit','Sửa danh mục sản phẩm','2025-07-07 22:31:24.383786',1),(95,'category-products.delete','Xóa danh mục sản phẩm','2025-07-07 22:31:24.383786',1),(96,'partners.read','Xem đối tác','2025-07-07 22:31:24.383786',1),(97,'partners.create','Tạo đối tác','2025-07-07 22:31:24.383786',1),(98,'partners.edit','Sửa đối tác','2025-07-07 22:31:24.383786',1),(99,'partners.delete','Xóa đối tác','2025-07-07 22:31:24.383786',1),(100,'customers.read','Xem người dùng','2025-07-07 22:31:24.383786',1),(101,'customers.create','Tạo người dùng','2025-07-07 22:31:24.383786',1),(102,'customers.edit','Sửa người dùng','2025-07-07 22:31:24.383786',1),(103,'customers.delete','Xóa người dùng','2025-07-07 22:31:24.383786',1),(104,'dashboard.read','Xem trang thống kê','2025-07-08 18:59:14.021884',1);
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `positions`
--

DROP TABLE IF EXISTS `positions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `positions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `description` varchar(255) NOT NULL,
  `is_deleted` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e21258bdc3692b44960c623940` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `positions`
--

LOCK TABLES `positions` WRITE;
/*!40000 ALTER TABLE `positions` DISABLE KEYS */;
INSERT INTO `positions` VALUES (1,'cc','a','2025-06-26 18:31:59.565035','2025-06-29 17:08:08.000000','c',1),(2,'Manager','Trưởng phòng','2025-06-26 18:31:59.565035','2025-06-26 18:31:59.565035','Trưởng bộ phận',0),(3,'DeputyManager','Phó phòng','2025-06-26 18:31:59.565035','2025-06-26 18:31:59.565035','Hỗ trợ trưởng phòng',0),(4,'Staff','Nhân viên chính thức','2025-06-26 18:31:59.565035','2025-06-26 18:31:59.565035','Nhân sự phổ thông',0),(5,'Intern','Thực tập sinh','2025-06-26 18:31:59.565035','2025-06-26 18:31:59.565035','Sinh viên thực tập',0),(6,'Accountant','Kế toán viên','2025-06-26 18:31:59.565035','2025-06-26 18:31:59.565035','Riêng phòng kế toán',0),(7,'Developer','Kỹ sư phần mềm','2025-06-26 18:31:59.565035','2025-06-26 18:31:59.565035','Phòng IT',0),(8,'WarehouseMan','Nhân viên kho','2025-06-26 18:31:59.565035','2025-06-26 18:31:59.565035','Phòng kho',0),(9,'Salesperson','Nhân viên bán hàng','2025-06-26 18:31:59.565035','2025-06-26 18:31:59.565035','Phòng Kinh doanh',0),(10,'b','a','2025-06-26 21:39:00.431769','2025-06-29 17:08:06.000000','a',1),(11,'c','c','2025-06-26 21:39:46.379090','2025-06-26 21:39:57.000000','b',1),(12,'v','v','2025-06-26 21:42:03.377393','2025-06-26 21:42:18.000000','v',1);
/*!40000 ALTER TABLE `positions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `unit_price` decimal(15,2) NOT NULL,
  `unit` varchar(50) DEFAULT NULL,
  `avatar_url` varchar(255) DEFAULT 'https://res.cloudinary.com/dzxupp48t/image/upload/v1751188121/image-product-ERP/lomgyunhneuzrlj8to5c.webp',
  `avatar_id` varchar(255) DEFAULT NULL,
  `status` enum('Hoạt động','Không hoạt động') NOT NULL DEFAULT 'Hoạt động',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `category_id` int DEFAULT NULL,
  `is_deleted` tinyint NOT NULL DEFAULT '0',
  `original_price` decimal(15,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_9a5f6868c96e0069e699f33e124` (`category_id`),
  CONSTRAINT `FK_9a5f6868c96e0069e699f33e124` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Smart TV 55 inch Samsung','Tivi thông minh 55 inch độ phân giải 4K',12990000.00,'cái',NULL,NULL,'Hoạt động','2025-06-29 10:46:49.000000','2025-06-30 11:54:33.306812',1,0,3000000.00),(2,'Máy giặt LG 9kg','Máy giặt cửa trước tiết kiệm điện năng',7990000.00,'cái',NULL,NULL,'Hoạt động','2025-06-29 10:46:49.000000','2025-06-30 11:54:33.307373',5,0,2500000.00),(3,'Tủ lạnh Toshiba Inverter 340L','Tủ lạnh ngăn đá trên, tiết kiệm điện',9990000.00,'cái',NULL,NULL,'Hoạt động','2025-06-29 10:46:49.000000','2025-06-30 11:54:33.307572',6,0,4400000.00),(4,'Lò vi sóng Sharp 23L','Lò vi sóng cơ, công suất 800W',1590000.00,'cái',NULL,NULL,'Hoạt động','2025-06-29 10:46:49.000000','2025-06-30 11:54:33.307700',12,0,400000.00),(5,'Điện thoại iPhone 15 Pro 128GB','Điện thoại thông minh Apple cao cấp',27990000.00,'cái',NULL,NULL,'Hoạt động','2025-06-29 10:46:49.000000','2025-06-30 11:54:33.307814',2,0,8000000.00),(6,'Máy hút bụi Panasonic','Máy hút bụi công suất lớn, nhiều chế độ làm sạch',2990000.00,'cái',NULL,NULL,'Hoạt động','2025-06-29 10:46:49.000000','2025-06-30 11:54:33.307921',8,0,1000000.00),(7,'Loa Bluetooth Sony Extra Bass','Loa di động, chống nước, pin 24 giờ',1690000.00,'cái',NULL,NULL,'Hoạt động','2025-06-29 10:46:49.000000','2025-06-30 11:54:33.308021',15,0,700000.00),(8,'Máy lạnh Daikin Inverter 1HP','Máy lạnh 1 chiều tiết kiệm điện',7590000.00,'cái',NULL,NULL,'Hoạt động','2025-06-29 10:46:49.000000','2025-06-30 11:54:33.308115',7,0,2000000.00),(9,'Camera an ninh Xiaomi','Camera wifi trong nhà, hỗ trợ AI',850000.00,'cái',NULL,NULL,'Hoạt động','2025-06-29 10:46:49.000000','2025-06-30 11:54:33.308207',10,0,100000.00),(10,'Máy sấy tóc Philips','Máy sấy tóc công suất 1800W, 3 chế độ',690000.00,'cái',NULL,NULL,'Hoạt động','2025-06-29 10:46:49.000000','2025-06-30 11:54:33.308295',18,0,120000.00),(11,'Bếp điện từ Sunhouse','Bếp đơn mặt kính chịu lực, cảm ứng',990000.00,'cái',NULL,NULL,'Hoạt động','2025-06-29 10:46:49.000000','2025-06-30 11:54:33.308386',12,0,300000.00),(12,'Máy pha cà phê Electrolux','Pha cà phê tự động cho gia đình',2150000.00,'cái',NULL,NULL,'Hoạt động','2025-06-29 10:46:49.000000','2025-06-30 11:54:33.308485',13,0,450000.00),(13,'Tivi Android TCL 43 inch','Tivi thông minh Android hỗ trợ YouTube, Netflix',6490000.00,'cái',NULL,NULL,'Hoạt động','2025-06-29 10:46:49.000000','2025-06-30 11:54:33.308654',1,0,1200000.00),(14,'Router WiFi TP-Link AX1500','Router chuẩn WiFi 6, tốc độ cao',1190000.00,'cái',NULL,NULL,'Hoạt động','2025-06-29 10:46:49.000000','2025-06-30 11:54:33.308758',9,0,330000.00),(15,'Bình nóng lạnh Ferroli 20L','Bình nóng lạnh chống giật, tiết kiệm điện',2490000.00,'cái',NULL,NULL,'Hoạt động','2025-06-29 10:46:49.000000','2025-06-30 11:54:33.308853',14,0,790000.00),(16,'Máy ép trái cây Bluestone','Máy ép chậm giữ nguyên dưỡng chất',1890000.00,'cái',NULL,NULL,'Hoạt động','2025-06-29 10:46:49.000000','2025-06-30 11:54:33.308943',13,0,300000.00),(17,'Máy lọc không khí Sharp','Diện tích 25m2, khử mùi và bụi mịn',3490000.00,'cái',NULL,NULL,'Hoạt động','2025-06-29 10:46:49.000000','2025-06-30 11:54:33.309037',17,0,500000.00),(18,'Máy chiếu mini Wanbo T2','Máy chiếu LED, hỗ trợ Full HD',2790000.00,'cái',NULL,NULL,'Hoạt động','2025-06-29 10:46:49.000000','2025-06-30 11:54:33.309130',19,0,350000.00),(19,'Nồi chiên không dầu Lock&Lock','Dung tích 5.5L, bảng điều khiển điện tử',2290000.00,'cái',NULL,NULL,'Hoạt động','2025-06-29 10:46:49.000000','2025-06-30 11:54:33.309270',11,0,280000.00),(20,'Máy in Canon LBP2900','Máy in laser đen trắng khổ A4',3250000.00,'cái',NULL,NULL,'Hoạt động','2025-06-29 10:46:49.000000','2025-06-30 11:54:33.309358',20,0,1000000.00),(61,'test','test',1000000.00,'cái','https://res.cloudinary.com/dzxupp48t/image/upload/v1751188121/image-product-ERP/lomgyunhneuzrlj8to5c.webp',NULL,'Hoạt động','2025-06-30 10:45:00.657558','2025-06-30 11:54:33.309642',2,1,290000.00),(62,'test01','test01',100000.00,'bộ','https://res.cloudinary.com/dzxupp48t/image/upload/v1751188121/image-product-ERP/lomgyunhneuzrlj8to5c.webp',NULL,'Hoạt động','2025-06-30 10:50:33.583447','2025-06-30 11:54:33.309782',2,1,50000.00),(63,'1','1',11111.00,'hộp','https://res.cloudinary.com/dzxupp48t/image/upload/v1751282119/image-ERP/trrwsspzbzrnicgwtdwi.jpg','image-ERP/trrwsspzbzrnicgwtdwi','Hoạt động','2025-06-30 11:00:42.513422','2025-06-30 11:54:33.309884',2,1,40000.00),(64,'qq','qq',100000.00,'bộ','https://res.cloudinary.com/dzxupp48t/image/upload/v1751282007/image-ERP/z2zbyltbniugplwyoai3.jpg','image-ERP/z2zbyltbniugplwyoai3','Hoạt động','2025-06-30 11:05:22.017777','2025-06-30 11:54:33.309985',6,0,30000.00),(65,'cc','cc',111111.00,'bộ','https://res.cloudinary.com/dzxupp48t/image/upload/v1751287965/image-ERP/fiiyggy3sav4l0bvsd4s.jpg','image-ERP/fiiyggy3sav4l0bvsd4s','Hoạt động','2025-06-30 12:52:45.656597','2025-06-30 13:13:27.000000',4,0,11111.00);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_members`
--

DROP TABLE IF EXISTS `project_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_members` (
  `project_id` int NOT NULL,
  `employee_id` int NOT NULL,
  `role_in_project` varchar(100) NOT NULL,
  PRIMARY KEY (`project_id`,`employee_id`),
  KEY `FK_983edb29503f23c905f843c0322` (`employee_id`),
  CONSTRAINT `FK_983edb29503f23c905f843c0322` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_b5729113570c20c7e214cf3f58d` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_members`
--

LOCK TABLES `project_members` WRITE;
/*!40000 ALTER TABLE `project_members` DISABLE KEYS */;
INSERT INTO `project_members` VALUES (1,17,'tester');
/*!40000 ALTER TABLE `project_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `status` enum('Đang triển khai','Đã hoàn thành','Trễ hạn','Loại bỏ') NOT NULL DEFAULT 'Đang triển khai',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `owner_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_b1bd2fbf5d0ef67319c91acb5cf` (`owner_id`),
  CONSTRAINT `FK_b1bd2fbf5d0ef67319c91acb5cf` FOREIGN KEY (`owner_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'test','test','2025-07-03',NULL,'Đang triển khai','2025-07-03 17:08:19.049081','2025-07-03 17:46:27.000000',20),(2,'a','a','2025-07-03',NULL,'Đang triển khai','2025-07-03 17:11:43.734560','2025-07-03 17:11:43.734560',19),(3,'a','a','2025-07-03',NULL,'Đang triển khai','2025-07-03 17:12:09.782745','2025-07-03 17:12:09.782745',19),(4,'a','a','2025-07-03',NULL,'Đang triển khai','2025-07-03 17:12:30.658590','2025-07-03 17:12:30.658590',19),(5,'a','a','2025-07-03',NULL,'Đang triển khai','2025-07-03 17:12:43.306973','2025-07-03 17:12:43.306973',19),(6,'q','q','2025-07-01',NULL,'Đang triển khai','2025-07-03 17:13:57.550022','2025-07-03 17:13:57.550022',16),(7,'r','r','2025-07-03',NULL,'Loại bỏ','2025-07-03 17:14:59.656017','2025-07-03 17:53:41.000000',20);
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permissions`
--

DROP TABLE IF EXISTS `role_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permissions` (
  `role_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`role_id`,`permission_id`),
  KEY `FK_17022daf3f885f7d35423e9971e` (`permission_id`),
  CONSTRAINT `FK_17022daf3f885f7d35423e9971e` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_178199805b901ccd220ab7740ec` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permissions`
--

LOCK TABLES `role_permissions` WRITE;
/*!40000 ALTER TABLE `role_permissions` DISABLE KEYS */;
INSERT INTO `role_permissions` VALUES (1,2),(2,2),(6,2),(7,2),(9,2),(11,2),(1,3),(3,3),(6,3),(8,3),(9,3),(11,3),(1,4),(4,4),(7,4),(8,4),(9,4),(11,4),(1,5),(5,5),(11,5),(1,6),(2,6),(6,6),(7,6),(9,6),(12,6),(1,7),(3,7),(6,7),(8,7),(9,7),(12,7),(1,8),(4,8),(7,8),(8,8),(9,8),(12,8),(1,9),(5,9),(12,9),(1,10),(2,10),(6,10),(7,10),(9,10),(13,10),(1,11),(3,11),(6,11),(8,11),(9,11),(13,11),(1,12),(4,12),(7,12),(8,12),(9,12),(13,12),(1,13),(5,13),(13,13),(1,14),(2,14),(6,14),(7,14),(9,14),(14,14),(1,15),(3,15),(6,15),(8,15),(9,15),(14,15),(1,16),(4,16),(7,16),(8,16),(9,16),(14,16),(1,17),(5,17),(14,17),(1,18),(2,18),(6,18),(7,18),(9,18),(15,18),(1,19),(3,19),(6,19),(8,19),(9,19),(15,19),(1,20),(4,20),(7,20),(8,20),(9,20),(15,20),(1,21),(5,21),(15,21),(1,22),(2,22),(6,22),(7,22),(9,22),(16,22),(1,23),(3,23),(6,23),(8,23),(9,23),(16,23),(1,24),(4,24),(7,24),(8,24),(9,24),(16,24),(1,25),(5,25),(16,25),(1,26),(2,26),(6,26),(7,26),(9,26),(17,26),(1,27),(3,27),(6,27),(8,27),(9,27),(17,27),(1,28),(4,28),(7,28),(8,28),(9,28),(17,28),(1,29),(5,29),(17,29),(1,30),(2,30),(6,30),(7,30),(9,30),(18,30),(1,31),(3,31),(6,31),(8,31),(9,31),(18,31),(1,32),(4,32),(7,32),(8,32),(9,32),(18,32),(1,33),(5,33),(18,33),(1,34),(2,34),(6,34),(7,34),(9,34),(19,34),(1,35),(3,35),(6,35),(8,35),(9,35),(19,35),(1,36),(4,36),(7,36),(8,36),(9,36),(19,36),(1,37),(5,37),(19,37),(1,38),(2,38),(6,38),(7,38),(9,38),(20,38),(1,39),(3,39),(6,39),(8,39),(9,39),(20,39),(1,40),(4,40),(7,40),(8,40),(9,40),(20,40),(1,41),(5,41),(20,41),(1,42),(2,42),(6,42),(7,42),(9,42),(21,42),(1,43),(3,43),(6,43),(8,43),(9,43),(21,43),(1,44),(4,44),(7,44),(8,44),(9,44),(21,44),(1,45),(5,45),(21,45),(1,46),(2,46),(6,46),(7,46),(9,46),(22,46),(1,47),(3,47),(6,47),(8,47),(9,47),(22,47),(1,48),(4,48),(7,48),(8,48),(9,48),(22,48),(1,49),(5,49),(22,49),(1,80),(2,80),(6,80),(7,80),(9,80),(23,80),(32,80),(1,81),(3,81),(6,81),(8,81),(9,81),(23,81),(32,81),(1,82),(4,82),(7,82),(8,82),(9,82),(23,82),(1,83),(5,83),(23,83),(1,84),(2,84),(6,84),(7,84),(9,84),(24,84),(32,84),(1,85),(3,85),(6,85),(8,85),(9,85),(24,85),(32,85),(1,86),(4,86),(7,86),(8,86),(9,86),(24,86),(32,86),(1,87),(5,87),(24,87),(32,87),(1,88),(2,88),(6,88),(7,88),(9,88),(25,88),(1,89),(3,89),(6,89),(8,89),(9,89),(25,89),(1,90),(4,90),(7,90),(8,90),(9,90),(25,90),(1,91),(5,91),(25,91),(1,92),(2,92),(6,92),(7,92),(9,92),(26,92),(1,93),(3,93),(6,93),(8,93),(9,93),(26,93),(1,94),(4,94),(7,94),(8,94),(9,94),(26,94),(1,95),(5,95),(26,95),(1,96),(2,96),(6,96),(7,96),(9,96),(27,96),(1,97),(3,97),(6,97),(8,97),(9,97),(27,97),(1,98),(4,98),(7,98),(8,98),(9,98),(27,98),(1,99),(5,99),(27,99),(1,100),(2,100),(6,100),(7,100),(9,100),(28,100),(1,101),(3,101),(6,101),(8,101),(9,101),(28,101),(1,102),(4,102),(7,102),(8,102),(9,102),(28,102),(1,103),(5,103),(28,103),(1,104),(2,104),(6,104),(7,104),(9,104),(10,104);
/*!40000 ALTER TABLE `role_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` text,
  `allow_delete` tinyint NOT NULL DEFAULT '0',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_648e3f5447f725579d7d4ffdfb` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Quản trị viên','Toàn quyền hệ thống',0,'2025-06-22 17:52:17.000000'),(2,'Chỉ đọc tất cả','Chỉ có quyền đọc trên toàn hệ thống',0,'2025-06-22 17:52:17.000000'),(3,'Chỉ tạo tất cả','Chỉ có quyền tạo trên toàn hệ thống',0,'2025-06-22 17:52:17.000000'),(4,'Chỉ sửa tất cả','Chỉ có quyền sửa trên toàn hệ thống',0,'2025-06-22 17:52:17.000000'),(5,'Chỉ xóa tất cả','Chỉ có quyền xóa trên toàn hệ thống',0,'2025-06-22 17:52:17.000000'),(6,'Chỉ đọc + tạo','Chỉ có quyền đọc và tạo',0,'2025-06-22 17:52:17.000000'),(7,'Chỉ đọc + sửa','Chỉ có quyền đọc và sửa',0,'2025-06-22 17:52:17.000000'),(8,'Chỉ tạo + sửa','Chỉ có quyền tạo và sửa',0,'2025-06-22 17:52:17.000000'),(9,'Chỉ đọc + tạo + sửa','Chỉ có quyền đọc, tạo và sửa',0,'2025-06-22 17:52:17.000000'),(10,'Chỉ quyền hạn trên phần thống kê','Chỉ có quyền trên mục thống kê',0,'2025-06-22 17:52:17.000000'),(11,'Chỉ quyền hạn trên phần danh sách người dùng','Chỉ có quyền trên mục danh sách người dùng',0,'2025-06-22 17:52:17.000000'),(12,'Chỉ quyền hạn trên phần quyền','Chỉ có quyền trên mục quyền',0,'2025-06-22 17:52:17.000000'),(13,'Chỉ quyền hạn trên phần vai trò','Chỉ có quyền trên mục vai trò',0,'2025-06-22 17:52:17.000000'),(14,'Chỉ quyền hạn trên phần nhân sự','Chỉ có quyền trên mục nhân sự',0,'2025-06-22 17:52:17.000000'),(15,'Chỉ quyền hạn trên phần kho','Chỉ có quyền trên mục kho',0,'2025-06-22 17:52:17.000000'),(16,'Chỉ quyền hạn trên phần sản phẩm','Chỉ có quyền trên mục sản phẩm',0,'2025-06-22 17:52:17.000000'),(17,'Chỉ quyền hạn trên phần chấm công','Chỉ có quyền trên mục chấm công',0,'2025-06-22 17:52:17.000000'),(18,'Chỉ quyền hạn trên phần lương','Chỉ có quyền trên mục lương',0,'2025-06-22 17:52:17.000000'),(19,'Chỉ quyền hạn trên phần dự án','Chỉ có quyền trên mục dự án',0,'2025-06-22 17:52:17.000000'),(20,'Chỉ quyền hạn trên phần công việc','Chỉ có quyền trên mục công việc',0,'2025-06-22 17:52:17.000000'),(21,'Chỉ quyền hạn trên phần đơn hàng','Chỉ có quyền trên mục đơn hàng',0,'2025-06-22 17:52:17.000000'),(22,'Chỉ quyền hạn trên phần xuất nhập','Chỉ có quyền trên mục xuất nhập',0,'2025-06-22 17:52:17.000000'),(23,'Chỉ quyền hạn trên phần phòng ban','Chỉ có quyền trên mục phòng ban',0,'2025-07-08 18:21:18.405094'),(24,'Chỉ quyền hạn trên phần vị trí công việc','Chỉ có quyền trên mục vị trí công việc',0,'2025-07-08 18:21:18.408383'),(25,'Chỉ quyền hạn trên phần chuyển kho','Chỉ có quyền trên mục chuyển kho',0,'2025-07-08 18:21:18.408507'),(26,'Chỉ quyền hạn trên phần danh mục sản phẩm','Chỉ có quyền trên mục danh mục sản phẩm',0,'2025-07-08 18:21:18.408585'),(27,'Chỉ quyền hạn trên phần đối tác','Chỉ có quyền trên mục đối tác',0,'2025-07-08 18:21:18.408659'),(28,'Chỉ quyền hạn trên phần người dùng','Chỉ có quyền trên mục người dùng',0,'2025-07-08 18:21:18.408784'),(32,'wwww','wwwww',1,'2025-07-14 17:10:05.592479');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salaries`
--

DROP TABLE IF EXISTS `salaries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salaries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `base_salary` decimal(15,2) NOT NULL,
  `bonus` decimal(15,2) NOT NULL DEFAULT '0.00',
  `allowance` decimal(15,2) NOT NULL DEFAULT '0.00',
  `deduction` decimal(15,2) NOT NULL DEFAULT '0.00',
  `net_salary` decimal(15,2) GENERATED ALWAYS AS ((((`base_salary` + `bonus`) + `allowance`) - `deduction`)) STORED NOT NULL,
  `note` text,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `employee_id` int DEFAULT NULL,
  `salary_month` varchar(255) NOT NULL,
  `status` enum('Đã trả lương','Chưa trả lương') NOT NULL DEFAULT 'Chưa trả lương',
  PRIMARY KEY (`id`),
  KEY `FK_9ac79195d31e77bb6df432eab13` (`employee_id`),
  CONSTRAINT `FK_9ac79195d31e77bb6df432eab13` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salaries`
--

LOCK TABLES `salaries` WRITE;
/*!40000 ALTER TABLE `salaries` DISABLE KEYS */;
INSERT INTO `salaries` (`id`, `base_salary`, `bonus`, `allowance`, `deduction`, `note`, `created_at`, `updated_at`, `employee_id`, `salary_month`, `status`) VALUES (1,5000000.00,1000000.00,1000000.00,300000.00,'đi trễ 2 ngày trừ lương 2 ngày','2025-07-02 17:31:55.794892','2025-07-02 18:00:59.000000',19,'2025-06','Đã trả lương');
/*!40000 ALTER TABLE `salaries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `title` varchar(255) NOT NULL,
  `description` text,
  `status` enum('Quá hạn','Đang làm','Đã hoàn thành') NOT NULL DEFAULT 'Đang làm',
  `project_id` int DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` int NOT NULL AUTO_INCREMENT,
  `assigned_employee_id` int DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `priority` enum('Thấp','Trung bình','Cao') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_9eecdb5b1ed8c7c2a1b392c28d4` (`project_id`),
  KEY `FK_23f8b2efcb24e9f05a66af9f010` (`assigned_employee_id`),
  CONSTRAINT `FK_23f8b2efcb24e9f05a66af9f010` FOREIGN KEY (`assigned_employee_id`) REFERENCES `employees` (`id`) ON DELETE SET NULL,
  CONSTRAINT `FK_9eecdb5b1ed8c7c2a1b392c28d4` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES ('aaa','aaaa','Đã hoàn thành',6,'2025-07-03 20:28:26.097790','2025-07-03 20:37:54.000000',1,19,'2025-07-03','2025-07-29','Trung bình'),('ccccc','cccc','Quá hạn',7,'2025-07-03 20:36:29.208839','2025-07-03 20:37:11.000000',2,19,'2025-06-03','2025-06-30','Trung bình');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `typeorm_metadata`
--

DROP TABLE IF EXISTS `typeorm_metadata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `typeorm_metadata` (
  `type` varchar(255) NOT NULL,
  `database` varchar(255) DEFAULT NULL,
  `schema` varchar(255) DEFAULT NULL,
  `table` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `value` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `typeorm_metadata`
--

LOCK TABLES `typeorm_metadata` WRITE;
/*!40000 ALTER TABLE `typeorm_metadata` DISABLE KEYS */;
INSERT INTO `typeorm_metadata` VALUES ('GENERATED_COLUMN',NULL,'erp_mini','salaries','net_salary','base_salary + bonus + allowance - deduction');
/*!40000 ALTER TABLE `typeorm_metadata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `role_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`role_id`,`user_id`),
  KEY `FK_87b8888186ca9769c960e926870` (`user_id`),
  CONSTRAINT `FK_87b8888186ca9769c960e926870` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_b23c65e50a758245a33ee35fda1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (1,21),(1,32),(2,32),(2,33);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `is_delete` tinyint NOT NULL DEFAULT '0',
  `can_query` tinyint NOT NULL DEFAULT '1',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `employee_id` int DEFAULT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_fe0bb3f6520ee0469504521e71` (`username`),
  UNIQUE KEY `REL_9760615d88ed518196bb79ea03` (`employee_id`),
  CONSTRAINT `FK_9760615d88ed518196bb79ea03d` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (21,'administrator','$2a$12$SzGjTeDxxvMwiyej04CwHOuvnygalW8MEN4GgfLHNHOhHvePcQuly',1,0,0,'2025-06-25 18:35:47.851145',NULL,'admin'),(32,'lochoang','$2b$10$vXo.yTFlog3NyK8aTvpzauYJwapqxRyUAfbmpmXMoCdczJH1o5xzK',1,0,1,'2025-07-07 18:15:52.476806',19,'user'),(33,'lochoang1','$2b$10$mz7M8PcDquSjo5XTEWB3ke/ZRJW5LmyqAV1VuDorZDZmMmXK28b72',1,0,1,'2025-07-09 17:47:22.867426',20,'user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warehouse_products`
--

DROP TABLE IF EXISTS `warehouse_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warehouse_products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `product_id` int NOT NULL,
  `warehouse_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_e8fd5d5eff0a010e2b0ffbabfb0` (`product_id`),
  KEY `FK_5d88e688ec4102a78a32a7aa6e2` (`warehouse_id`),
  CONSTRAINT `FK_5d88e688ec4102a78a32a7aa6e2` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouses` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_e8fd5d5eff0a010e2b0ffbabfb0` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouse_products`
--

LOCK TABLES `warehouse_products` WRITE;
/*!40000 ALTER TABLE `warehouse_products` DISABLE KEYS */;
INSERT INTO `warehouse_products` VALUES (21,10,1,1),(22,9,2,1),(23,8,3,1),(24,14,4,1),(25,6,5,1),(26,16,6,1),(27,11,7,1),(28,9,8,1),(29,15,9,1),(30,7,10,1),(31,13,11,2),(32,10,12,2),(33,9,13,2),(34,16,14,2),(35,7,15,2),(36,18,16,2),(37,5,17,2),(38,12,18,2),(39,6,19,2),(40,11,20,2),(43,11,65,1),(44,26,6,2),(45,3,2,2);
/*!40000 ALTER TABLE `warehouse_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warehouse_transaction_items`
--

DROP TABLE IF EXISTS `warehouse_transaction_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warehouse_transaction_items` (
  `quantity` int NOT NULL,
  `product_id` int DEFAULT NULL,
  `transaction_id` int NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `unit_price` decimal(12,2) DEFAULT NULL,
  `total_price` decimal(12,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_557e5f980a7812b261ac31fe06d` (`transaction_id`),
  KEY `FK_2a3537dcce5325a4bcfc9fb998f` (`product_id`),
  CONSTRAINT `FK_2a3537dcce5325a4bcfc9fb998f` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `FK_557e5f980a7812b261ac31fe06d` FOREIGN KEY (`transaction_id`) REFERENCES `warehouse_transactions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouse_transaction_items`
--

LOCK TABLES `warehouse_transaction_items` WRITE;
/*!40000 ALTER TABLE `warehouse_transaction_items` DISABLE KEYS */;
INSERT INTO `warehouse_transaction_items` VALUES (11,6,9,7,2990000.00,32890000.00);
/*!40000 ALTER TABLE `warehouse_transaction_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warehouse_transactions`
--

DROP TABLE IF EXISTS `warehouse_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warehouse_transactions` (
  `type` enum('Nhập kho','Xuất kho') NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `note` text,
  `id` int NOT NULL AUTO_INCREMENT,
  `partner_id` int DEFAULT NULL,
  `warehouse_id` int DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `status` enum('Chưa xử lý','Đã xử lý','Từ chối') NOT NULL DEFAULT 'Chưa xử lý',
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1135f5c31171c15ba445cbaeb5e` (`warehouse_id`),
  KEY `FK_e48d7bc745e8c23e88606731e55` (`partner_id`),
  KEY `FK_c40de640d80ac8091143f602822` (`user_id`),
  CONSTRAINT `FK_1135f5c31171c15ba445cbaeb5e` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouses` (`id`),
  CONSTRAINT `FK_c40de640d80ac8091143f602822` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_e48d7bc745e8c23e88606731e55` FOREIGN KEY (`partner_id`) REFERENCES `partners` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouse_transactions`
--

LOCK TABLES `warehouse_transactions` WRITE;
/*!40000 ALTER TABLE `warehouse_transactions` DISABLE KEYS */;
INSERT INTO `warehouse_transactions` VALUES ('Nhập kho','2025-07-04 18:26:33.274427','aaaqqq',9,1,2,'2025-07-04 18:44:45.000000','Đã xử lý',NULL);
/*!40000 ALTER TABLE `warehouse_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warehouse_transfer_items`
--

DROP TABLE IF EXISTS `warehouse_transfer_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warehouse_transfer_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `transfer_id` int DEFAULT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_8e1299fa944125bb73b38e825e6` (`transfer_id`),
  KEY `FK_92fe565d1acaba65598df7e9ec9` (`product_id`),
  CONSTRAINT `FK_8e1299fa944125bb73b38e825e6` FOREIGN KEY (`transfer_id`) REFERENCES `warehouse_transfers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_92fe565d1acaba65598df7e9ec9` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouse_transfer_items`
--

LOCK TABLES `warehouse_transfer_items` WRITE;
/*!40000 ALTER TABLE `warehouse_transfer_items` DISABLE KEYS */;
INSERT INTO `warehouse_transfer_items` VALUES (2,4,6,6),(3,3,6,2);
/*!40000 ALTER TABLE `warehouse_transfer_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warehouse_transfers`
--

DROP TABLE IF EXISTS `warehouse_transfers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warehouse_transfers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `note` text,
  `from_warehouse_id` int DEFAULT NULL,
  `to_warehouse_id` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `is_deleted` tinyint NOT NULL DEFAULT '0',
  `status` enum('Chưa xác nhận','Hoàn tất','Từ chối') NOT NULL DEFAULT 'Chưa xác nhận',
  PRIMARY KEY (`id`),
  KEY `FK_af1d039ce0cc028cc6bc301d22c` (`created_by`),
  KEY `FK_21782d2cf3c1fbc4432fc75abc1` (`from_warehouse_id`),
  KEY `FK_78587322256bf95ee864a5b387a` (`to_warehouse_id`),
  CONSTRAINT `FK_21782d2cf3c1fbc4432fc75abc1` FOREIGN KEY (`from_warehouse_id`) REFERENCES `warehouses` (`id`),
  CONSTRAINT `FK_78587322256bf95ee864a5b387a` FOREIGN KEY (`to_warehouse_id`) REFERENCES `warehouses` (`id`),
  CONSTRAINT `FK_af1d039ce0cc028cc6bc301d22c` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouse_transfers`
--

LOCK TABLES `warehouse_transfers` WRITE;
/*!40000 ALTER TABLE `warehouse_transfers` DISABLE KEYS */;
INSERT INTO `warehouse_transfers` VALUES (3,'2025-07-01 17:50:47.603579','chuyển kho',1,2,NULL,1,'Chưa xác nhận'),(4,'2025-07-01 17:52:51.311526','a',2,1,NULL,1,'Chưa xác nhận'),(5,'2025-07-01 18:15:11.383626','aa',1,2,NULL,0,'Chưa xác nhận'),(6,'2025-07-01 18:15:46.363309','qq',1,2,NULL,0,'Hoàn tất');
/*!40000 ALTER TABLE `warehouse_transfers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warehouses`
--

DROP TABLE IF EXISTS `warehouses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warehouses` (
  `name` varchar(255) NOT NULL,
  `location` text NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` int NOT NULL AUTO_INCREMENT,
  `is_deleted` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouses`
--

LOCK TABLES `warehouses` WRITE;
/*!40000 ALTER TABLE `warehouses` DISABLE KEYS */;
INSERT INTO `warehouses` VALUES ('Kho TP.HCM - Quận 1','123 Nguyễn Huệ, Quận 1, TP.HCM','2025-06-29 16:49:49.638737','2025-06-29 16:49:49.638737',1,0),('Kho TP.HCM - Tân Bình','456 Cộng Hòa, Quận Tân Bình, TP.HCM','2025-06-29 16:49:49.638737','2025-06-29 16:49:49.638737',2,0),('kho 1','tân phú hcm','2025-06-30 15:54:58.999445','2025-06-30 16:17:43.000000',3,1),('a','a','2025-07-11 17:45:28.391588','2025-07-11 17:45:28.391588',4,0);
/*!40000 ALTER TABLE `warehouses` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-18 21:44:47
