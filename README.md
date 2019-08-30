# memory
A simple memory game in js 

SQL query for database creation:

CREATE DATABASE IF NOT EXISTS `memory1`;
USE `memory1`;
CREATE TABLE IF NOT EXISTS `times` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `time` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8;

Demo :

http://memory.romain-cuzon.fr

