-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema ds_proj
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ds_proj
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ds_proj` DEFAULT CHARACTER SET utf8 ;
USE `ds_proj` ;

-- -----------------------------------------------------
-- Table `ds_proj`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ds_proj`.`User` ;

CREATE TABLE IF NOT EXISTS `ds_proj`.`User` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `fullName` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `phoneNumber` VARCHAR(10) NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ds_proj`.`Role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ds_proj`.`Role` ;

CREATE TABLE IF NOT EXISTS `ds_proj`.`Role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ds_proj`.`User_has_Role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ds_proj`.`User_has_Role` ;

CREATE TABLE IF NOT EXISTS `ds_proj`.`User_has_Role` (
  `User_id` INT NOT NULL,
  `Role_id` INT NOT NULL,
  PRIMARY KEY (`User_id`, `Role_id`),
  INDEX `fk_User_has_Role_Role1_idx` (`Role_id` ASC),
  INDEX `fk_User_has_Role_User_idx` (`User_id` ASC),
  CONSTRAINT `fk_User_has_Role_User`
    FOREIGN KEY (`User_id`)
    REFERENCES `ds_proj`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_has_Role_Role1`
    FOREIGN KEY (`Role_id`)
    REFERENCES `ds_proj`.`Role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ds_proj`.`Address`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ds_proj`.`Address` ;

CREATE TABLE IF NOT EXISTS `ds_proj`.`Address` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `city` VARCHAR(45) NOT NULL,
  `street` VARCHAR(45) NOT NULL,
  `number` VARCHAR(45) NOT NULL,
  `User_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_Address_User1_idx` (`User_id` ASC),
  CONSTRAINT `fk_Address_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `ds_proj`.`User` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;		

-- -----------------------------------------------------
-- Table `ds_proj`.`Product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ds_proj`.`Product` ;

CREATE TABLE IF NOT EXISTS `ds_proj`.`Product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `price` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ds_proj`.`Order`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ds_proj`.`Order` ;

CREATE TABLE IF NOT EXISTS `ds_proj`.`Order` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Address_id` INT,
  `status` VARCHAR(45) NULL DEFAULT 'NEW',
  PRIMARY KEY (`id`),
  INDEX `fk_Order_Address1_idx` (`Address_id` ASC),
  CONSTRAINT `fk_Order_Address1`
    FOREIGN KEY (`Address_id`)
    REFERENCES `ds_proj`.`Address` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ds_proj`.`Order_has_Product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ds_proj`.`Order_has_Product` ;

CREATE TABLE IF NOT EXISTS `ds_proj`.`Order_has_Product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Order_id` INT,
  `Product_id` INT,
  `quantity` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Order_has_Product_Product1_idx` (`Product_id` ASC),
  INDEX `fk_Order_has_Product_Order1_idx` (`Order_id` ASC),
  CONSTRAINT `fk_Order_has_Product_Order1`
    FOREIGN KEY (`Order_id`)
    REFERENCES `ds_proj`.`Order` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Order_has_Product_Product1`
    FOREIGN KEY (`Product_id`)
    REFERENCES `ds_proj`.`Product` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ds_proj`.`Notification`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ds_proj`.`Notification` ;

CREATE TABLE IF NOT EXISTS `ds_proj`.`Notification` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `seen` TINYINT(1) NOT NULL,
  `text` VARCHAR(100) NULL,
  `createdAt` DATETIME NOT NULL,
  `Order_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_Notification_Order1_idx` (`Order_id` ASC),
  CONSTRAINT `fk_Notification_Order1`
    FOREIGN KEY (`Order_id`)
    REFERENCES `ds_proj`.`Order` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


INSERT INTO `ds_proj`.`role` (`name`) VALUES ('ADMIN');
INSERT INTO `ds_proj`.`role` (`name`) VALUES ('EMPLOYEE');
INSERT INTO `ds_proj`.`role` (`name`) VALUES ('CLIENT');

INSERT INTO `ds_proj`.`user` (`username`,`password`,`fullName`,`email`,`phoneNumber`,`enabled`) 
VALUES ('admin','admin','administrator','admin@test.ds','0101010101',1);

INSERT INTO `ds_proj`.`user` (`username`,`password`,`fullName`,`email`,`phoneNumber`,`enabled`) 
VALUES ('employee','employee','employee','employee@test.ds','0123401234',1);

INSERT INTO `ds_proj`.`user` (`username`,`password`,`fullName`,`email`,`phoneNumber`,`enabled`) 
VALUES ('client1','client1','client one','client1@test.ds','0123456789',1);
INSERT INTO `ds_proj`.`user` (`username`,`password`,`fullName`,`email`,`phoneNumber`,`enabled`) 
VALUES ('client2','client2','client two','client2@test.ds','0123456789',1);

INSERT INTO `ds_proj`.`user_has_role` (`User_id`, `Role_id`) VALUES ('1', '1');
INSERT INTO `ds_proj`.`user_has_role` (`User_id`, `Role_id`) VALUES ('2', '2');
INSERT INTO `ds_proj`.`user_has_role` (`User_id`, `Role_id`) VALUES ('3', '3');
INSERT INTO `ds_proj`.`user_has_role` (`User_id`, `Role_id`) VALUES ('4', '3');

INSERT INTO `ds_proj`.`product` (`name`, `price`) VALUES ('Ciorba de fasole', 1.0);
INSERT INTO `ds_proj`.`product` (`name`, `price`) VALUES ('Ciorba de burta', 7.0);
INSERT INTO `ds_proj`.`product` (`name`, `price`) VALUES ('Ciorba de peste', 15.0);
INSERT INTO `ds_proj`.`product` (`name`, `price`) VALUES ('Iahnie de fasole', 8.0);
INSERT INTO `ds_proj`.`product` (`name`, `price`) VALUES ('Cartofi prajiti', 7.5);
INSERT INTO `ds_proj`.`product` (`name`, `price`) VALUES ('Varza a la Cluj', 9.5);

INSERT INTO `ds_proj`.`address` (`city`,`street`,`number`,`User_id`) VALUES ('Cluj-Napoca','Str. Observatorului','35',3);
INSERT INTO `ds_proj`.`address` (`city`,`street`,`number`,`User_id`) VALUES ('Cluj-Napoca','Dorobantilor','12',3);
INSERT INTO `ds_proj`.`address` (`city`,`street`,`number`,`User_id`) VALUES ('Cluj-Napoca','Str. 21 Decembrie','101',4);

INSERT INTO `ds_proj`.`order` (`Address_id`,`status`) VALUES (1,'NEW');
INSERT INTO `ds_proj`.`order` (`Address_id`,`status`) VALUES (1,'NEW');
INSERT INTO `ds_proj`.`order` (`Address_id`,`status`) VALUES (2,'NEW');

INSERT INTO `ds_proj`.`order_has_product` (`Order_id`,`Product_id`,`quantity`) VALUES (1,2,1);
INSERT INTO `ds_proj`.`order_has_product` (`Order_id`,`Product_id`,`quantity`) VALUES (1,3,2);
INSERT INTO `ds_proj`.`order_has_product` (`Order_id`,`Product_id`,`quantity`) VALUES (2,4,3);
INSERT INTO `ds_proj`.`order_has_product` (`Order_id`,`Product_id`,`quantity`) VALUES (3,1,5);
