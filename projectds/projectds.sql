/*
 Navicat Premium Data Transfer

 Source Server         : WAMPP
 Source Server Type    : MySQL
 Source Server Version : 100410
 Source Host           : localhost:3306
 Source Schema         : projectds

 Target Server Type    : MySQL
 Target Server Version : 100410
 File Encoding         : 65001

 Date: 26/06/2024 17:01:10
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `nama_admin` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL
) ENGINE = MyISAM CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('admin', 'admin');

-- ----------------------------
-- Table structure for obat
-- ----------------------------
DROP TABLE IF EXISTS `obat`;
CREATE TABLE `obat`  (
  `id_obat` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `deskripsi` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  PRIMARY KEY (`id_obat`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 4 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of obat
-- ----------------------------
INSERT INTO `obat` VALUES (1, 'CENDO CENFRESH  MINIDOSE 0,6 ML', 'Obat Mata');

-- ----------------------------
-- Table structure for pembelian
-- ----------------------------
DROP TABLE IF EXISTS `pembelian`;
CREATE TABLE `pembelian`  (
  `id_pembelian` int NOT NULL AUTO_INCREMENT,
  `id_obat` int NULL DEFAULT NULL,
  `jumlah` int NULL DEFAULT NULL,
  `periode` date NULL DEFAULT NULL,
  PRIMARY KEY (`id_pembelian`) USING BTREE,
  INDEX `id_obat`(`id_obat`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 30 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of pembelian
-- ----------------------------
INSERT INTO `pembelian` VALUES (1, 1, 34, '2022-01-03');
INSERT INTO `pembelian` VALUES (2, 1, 36, '2022-02-02');
INSERT INTO `pembelian` VALUES (3, 1, 71, '2022-03-01');
INSERT INTO `pembelian` VALUES (4, 1, 47, '2022-04-01');
INSERT INTO `pembelian` VALUES (5, 1, 55, '2022-05-03');
INSERT INTO `pembelian` VALUES (6, 1, 49, '2022-06-03');
INSERT INTO `pembelian` VALUES (7, 1, 64, '2022-07-01');
INSERT INTO `pembelian` VALUES (8, 1, 72, '2022-08-01');
INSERT INTO `pembelian` VALUES (9, 1, 63, '2022-09-01');
INSERT INTO `pembelian` VALUES (10, 1, 95, '2022-10-01');
INSERT INTO `pembelian` VALUES (11, 1, 104, '2022-11-01');
INSERT INTO `pembelian` VALUES (12, 1, 90, '2022-12-01');
INSERT INTO `pembelian` VALUES (13, 1, 259, '2023-01-17');
INSERT INTO `pembelian` VALUES (14, 1, 247, '2023-02-07');
INSERT INTO `pembelian` VALUES (15, 1, 246, '2023-03-04');
INSERT INTO `pembelian` VALUES (16, 1, 105, '2023-04-17');
INSERT INTO `pembelian` VALUES (17, 1, 130, '2023-05-12');
INSERT INTO `pembelian` VALUES (18, 1, 126, '2023-06-09');
INSERT INTO `pembelian` VALUES (19, 1, 157, '2023-07-27');
INSERT INTO `pembelian` VALUES (20, 1, 120, '2023-08-04');
INSERT INTO `pembelian` VALUES (21, 1, 121, '2023-09-07');
INSERT INTO `pembelian` VALUES (22, 1, 123, '2023-10-06');
INSERT INTO `pembelian` VALUES (23, 1, 138, '2023-11-16');
INSERT INTO `pembelian` VALUES (24, 1, 97, '2023-12-20');
INSERT INTO `pembelian` VALUES (25, 1, 125, '2024-01-06');
INSERT INTO `pembelian` VALUES (26, 1, 130, '2024-02-07');
INSERT INTO `pembelian` VALUES (27, 1, 99, '2024-03-08');
INSERT INTO `pembelian` VALUES (28, 1, 105, '2024-04-02');

-- ----------------------------
-- Table structure for pemesanan
-- ----------------------------
DROP TABLE IF EXISTS `pemesanan`;
CREATE TABLE `pemesanan`  (
  `id_pemesanan` int NOT NULL AUTO_INCREMENT,
  `id_obat` int NULL DEFAULT NULL,
  `jumlah` int NULL DEFAULT NULL,
  `periode` date NULL DEFAULT NULL,
  PRIMARY KEY (`id_pemesanan`) USING BTREE,
  INDEX `id_obat`(`id_obat`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 29 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of pemesanan
-- ----------------------------
INSERT INTO `pemesanan` VALUES (1, 1, 20, '2022-01-03');
INSERT INTO `pemesanan` VALUES (2, 1, 51, '2022-02-02');
INSERT INTO `pemesanan` VALUES (3, 1, 30, '2022-03-01');
INSERT INTO `pemesanan` VALUES (4, 1, 0, '2022-04-01');
INSERT INTO `pemesanan` VALUES (5, 1, 100, '2022-05-03');
INSERT INTO `pemesanan` VALUES (6, 1, 100, '2022-06-03');
INSERT INTO `pemesanan` VALUES (7, 1, 30, '2022-07-01');
INSERT INTO `pemesanan` VALUES (8, 1, 100, '2022-08-01');
INSERT INTO `pemesanan` VALUES (9, 1, 130, '2022-09-01');
INSERT INTO `pemesanan` VALUES (10, 1, 100, '2022-10-01');
INSERT INTO `pemesanan` VALUES (11, 1, 100, '2022-11-01');
INSERT INTO `pemesanan` VALUES (12, 1, 30, '2022-12-01');
INSERT INTO `pemesanan` VALUES (13, 1, 240, '2023-01-17');
INSERT INTO `pemesanan` VALUES (14, 1, 328, '2023-02-07');
INSERT INTO `pemesanan` VALUES (15, 1, 190, '2023-03-04');
INSERT INTO `pemesanan` VALUES (16, 1, 150, '2023-04-17');
INSERT INTO `pemesanan` VALUES (17, 1, 60, '2023-05-12');
INSERT INTO `pemesanan` VALUES (18, 1, 260, '2023-06-09');
INSERT INTO `pemesanan` VALUES (19, 1, 100, '2023-07-27');
INSERT INTO `pemesanan` VALUES (20, 1, 40, '2023-08-04');
INSERT INTO `pemesanan` VALUES (21, 1, 80, '2023-09-07');
INSERT INTO `pemesanan` VALUES (22, 1, 240, '2023-10-06');
INSERT INTO `pemesanan` VALUES (23, 1, 80, '2023-11-16');
INSERT INTO `pemesanan` VALUES (24, 1, 120, '2023-12-20');
INSERT INTO `pemesanan` VALUES (25, 1, 140, '2024-01-06');
INSERT INTO `pemesanan` VALUES (26, 1, 128, '2024-02-07');
INSERT INTO `pemesanan` VALUES (27, 1, 80, '2024-03-08');
INSERT INTO `pemesanan` VALUES (28, 1, 80, '2024-04-02');

-- ----------------------------
-- Table structure for prediksi
-- ----------------------------
DROP TABLE IF EXISTS `prediksi`;
CREATE TABLE `prediksi`  (
  `id_prediksi` int NOT NULL AUTO_INCREMENT,
  `id_obat` int NULL DEFAULT NULL,
  `jumlah` int NULL DEFAULT NULL,
  `periode` date NULL DEFAULT NULL,
  PRIMARY KEY (`id_prediksi`) USING BTREE,
  INDEX `id_obat`(`id_obat`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of prediksi
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
