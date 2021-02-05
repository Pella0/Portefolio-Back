DROP TABLE IF EXISTS Techno;
CREATE TABLE `Techno` (
  `idTech` int NOT NULL,
  `Name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idTech`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS projets;
CREATE TABLE `projets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `Logo` varchar(500) DEFAULT NULL,
  `Client_description` varchar(800) DEFAULT NULL,
  `Projet_Description` varchar(800) DEFAULT NULL,
  `Methode` varchar(50) DEFAULT NULL,
  `Details_Client` varchar(500) DEFAULT NULL,
  `Lien_Client` varchar(500) DEFAULT NULL,
  `Techno_id` int NOT NULL,
  `Client_name` varchar(255) DEFAULT NULL,
  `screen1` varchar(500) DEFAULT NULL,
  `screen2` varchar(500) DEFAULT NULL,
  `screen3` varchar(500) DEFAULT NULL,
  `screen4` varchar(500) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `projet_context` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Clients_Techno_idx` (`Techno_id`),
  CONSTRAINT `fk_Clients_Techno` FOREIGN KEY (`Techno_id`) REFERENCES `Techno` (`idTech`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;




