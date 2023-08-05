/*
SQLyog Ultimate v11.11 (64 bit)
MySQL - 5.5.5-10.4.25-MariaDB : Database - railway
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`railway` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `railway`;

/*Table structure for table `pedidos` */

DROP TABLE IF EXISTS `pedidos`;

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `docId` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL DEFAULT 0,
  `productoId` int(11) DEFAULT NULL,
  `estado` varchar(100) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;

/*Data for the table `pedidos` */

insert  into `pedidos`(`id`,`docId`,`userId`,`productoId`,`estado`,`createdAt`,`updatedAt`) values (1,'Amigos',1,NULL,NULL,NULL,NULL),(2,'Fútbol',1,NULL,NULL,NULL,NULL),(3,'Videojuegos',1,NULL,NULL,NULL,NULL),(4,'ed0c00d7-7fbf-4374-8af1-366fbcdb6d19',1,NULL,'pendiente','2023-08-04 16:46:24','2023-08-04 16:46:24'),(5,'150a40c6-e3a8-4549-9fd8-baa08b0f7ceb',1,1,'pendiente','2023-08-04 16:47:18','2023-08-04 16:47:18'),(6,'343c9645-277e-4cf2-98e6-5a2d47ebca8e',1,1,'pendiente','2023-08-04 16:52:49','2023-08-04 16:52:49'),(7,'03c724f4-e524-46f4-91e9-b1d7eb927989',1,1,'pendiente','2023-08-04 16:59:51','2023-08-04 16:59:51'),(8,'4f641208-cf21-4ff4-ade7-661e2b902ff2',1,1,'pendiente','2023-08-04 16:59:51','2023-08-04 16:59:51'),(9,'f69349b0-8fda-40db-9839-0f95fd7d0a02',1,1,'pendiente','2023-08-04 17:00:57','2023-08-04 17:00:57'),(10,'435a0d05-f1da-4183-81c6-737d7b038fc0',1,1,'pendiente','2023-08-04 17:11:10','2023-08-04 17:11:10');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `users` */

insert  into `users`(`id`,`nombre`,`password`,`email`,`image`,`createdAt`,`updatedAt`) values (1,'Cesar','$2a$10$ipEuxdu4lfCmmrYxTx0uh.JLq3luLa8jC97WoJXvMXPVHAbOld4gy','cesar@gmail.com','b084de7d-66c3-4232-b592-756529e83edb.jpg',NULL,'2022-09-26 08:59:16'),(2,'Carlos','$2a$10$JL/gwxZ5D1zKSyfAcH0fHuLL7jKJznyHUaIoGHZwt4.dZM/nMKl1a','carlos@gmail.com','8358ef4c-dad7-4617-932c-f8d8d5749f8b.jpg',NULL,'2023-08-01 16:33:10');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
