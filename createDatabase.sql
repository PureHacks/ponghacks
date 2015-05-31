SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `PongHacks` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `PongHacks` ;

-- -----------------------------------------------------
-- Table `PongHacks`.`User`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `PongHacks`.`User` (
  `userId` INT NOT NULL ,
  `email` VARCHAR(100) NOT NULL ,
  `name` VARCHAR(150) NOT NULL ,
  `mentionName` VARCHAR(45) NOT NULL ,
  `avatarUrl` VARCHAR(150) NULL ,
  PRIMARY KEY (`userId`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PongHacks`.`Game`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `PongHacks`.`Game` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `winnerUserId` INT NOT NULL ,
  `winnerScore` INT NOT NULL ,
  `loserUserId` INT NOT NULL ,
  `loserScore` INT NOT NULL ,
  `date` DATETIME NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `winnerUserId` (`winnerUserId` ASC) ,
  INDEX `loserUserId` (`loserUserId` ASC) ,
  CONSTRAINT `winnerUserId`
    FOREIGN KEY (`winnerUserId` )
    REFERENCES `PongHacks`.`User` (`userId` )
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `loserUserId`
    FOREIGN KEY (`loserUserId` )
    REFERENCES `PongHacks`.`User` (`userId` )
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;

USE `PongHacks` ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
