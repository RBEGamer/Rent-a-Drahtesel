-- phpMyAdmin SQL Dump
-- version 4.2.12deb2+deb8u2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Erstellungszeit: 07. Jan 2018 um 09:11
-- Server Version: 5.5.58-0+deb8u1
-- PHP-Version: 5.6.30-0+deb8u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `rent_a_bike`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Benutzer`
--

CREATE TABLE IF NOT EXISTS `Benutzer` (
`pk_ID` int(11) NOT NULL,
  `email` varchar(80) NOT NULL,
  `pw` varchar(80) NOT NULL,
  `verified` tinyint(1) DEFAULT '0',
  `verification_hash` varchar(80) DEFAULT NULL,
  `housenumber` varchar(80) NOT NULL,
  `country` varchar(80) NOT NULL,
  `city` varchar(80) NOT NULL,
  `zip` varchar(80) NOT NULL,
  `phone` varchar(80) DEFAULT NULL,
  `street` varchar(80) NOT NULL,
  `picture` text,
  `lat` double DEFAULT NULL,
  `lon` double DEFAULT NULL,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `Benutzer`
--

INSERT INTO `Benutzer` (`pk_ID`, `email`, `pw`, `verified`, `verification_hash`, `housenumber`, `country`, `city`, `zip`, `phone`, `street`, `picture`, `lat`, `lon`, `creation_date`) VALUES
(15, 'marcel.ochsendorf@gmail.com', '$2a$10$oAOAzVh4gQqAWkVL5.34z.bRLNLa0qFfOKhXowDYRVJCDnnBE86de', 1, '447e', '15', 'Germany', 'Aachen', '52066', NULL, 'Krugenofen', 'data:image/jpeg;base64,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', 10.5, 10.9, '2017-12-22 02:16:47'),
(20, 'demo@demo.com', '$2a$10$qZu85pUTs1rFUdQIcKEpx.JcyRcFUzJQ1tej8xXO58ny24ZmZ5b/K', 1, 'cf09', '10', 'Deutschland', 'Aachen', '52066', NULL, 'Hauptstraße', NULL, 10.5, 10.8, '2017-12-22 02:49:51'),
(21, 'failure@failure.com', '$2a$10$0fIZulRg.Cck1ogKefMcg.fppF/NgfcdVaYXJMk7ucse5JEMYZUxO', 1, '622f', '', '', '', '', NULL, '', NULL, NULL, NULL, '2017-12-22 02:52:42'),
(22, 't986353@mvrht.net', '$2a$10$bNLYMEbV3vlmWY2slxeKrO1u75/lVo52F8YuSYR6pSUCSbBipY13i', 0, '47d4', '', '', '', '', NULL, '', NULL, NULL, NULL, '2017-12-24 18:11:20'),
(23, 'testmail@google.de', '$2a$10$YNNIcoaadfc89PswbGmOGevJCl/rNvxANHKPyAXRZLOkyFlJh6I6G', 1, 'e50f', '117', 'Deutschland', 'Altenberge', '48341', NULL, 'Waltrup', NULL, NULL, NULL, '2017-12-30 14:37:21'),
(57, 'tobias.arndt@alumni.fh-aachen.de', '$2a$10$9MopgUe/vhW2aMw8ug7vSejK.rP5vOTHcdyCohwSgdr/0vWQzGuae', 1, '5cb3', '32', 'Deutschland', 'Aachen', '52066', '0190767676', 'Viktoriaallee', '', NULL, NULL, '2018-01-03 03:00:09'),
(63, 'asd@asd.deafd', '$2a$10$7q4JDSSEES9D5AI1HmzPqui7Go2/DK9GRIZqziLPA0X2KGUuUxtKm', 0, '0471', '123', 'Ägypten', 'gead', '12345', '198938', 'asdasd', NULL, NULL, NULL, '2018-01-07 01:05:49'),
(64, 'test@asdasd.de', '$2a$10$qQpdMpdnwLX/W3EidzeaR.lwGpXkKk85Du5kuU6sQngxZNYri1dTy', 0, '102e', '32', 'Algerien', 'asdasd', '12345', '12345', 'asdasd', 'B8iox9KCMAEBvES.jpg', NULL, NULL, '2018-01-07 01:18:14');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Bestellung`
--

CREATE TABLE IF NOT EXISTS `Bestellung` (
  `pk_ID_Benutzer` int(11) NOT NULL,
  `pk_ID_Fahrrad` int(11) NOT NULL,
  `Rentdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `booked_days` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `Bestellung`
--

INSERT INTO `Bestellung` (`pk_ID_Benutzer`, `pk_ID_Fahrrad`, `Rentdate`, `booked_days`) VALUES
(20, 1, '2017-12-23 20:07:51', '2017-12-13,2017-12-14'),
(20, 1, '2017-12-28 18:29:44', '2017-12-25,2017-12-26,2017-12-27'),
(20, 1, '2017-12-28 19:20:19', '2017-12-03'),
(20, 1, '2017-12-28 19:21:28', '2017-12-05,2017-12-06'),
(20, 1, '2017-12-28 19:25:39', '2017-12-18,2017-12-17,2017-12-19'),
(20, 1, '2017-12-29 21:44:54', '2017-12-31'),
(20, 1, '2017-12-29 22:19:33', '2018-01-10,2018-01-11'),
(20, 1, '2018-01-02 16:23:26', ''),
(20, 1, '2018-01-02 16:24:19', '2018-01-09,2018-01-16,2018-01-23,2018-01-03,2018-01-04,2018-01-17,2018-01-24,2018-01-28,2018-01-14,2018-01-26,2018-01-20,2018-01-06,2018-01-22,2018-01-31'),
(20, 2, '2017-12-28 18:40:57', '2017-12-03,2017-12-04'),
(20, 2, '2017-12-28 19:24:26', '2017-12-11,2017-12-12'),
(57, 1, '2018-01-05 01:03:34', '2018-01-12,2018-01-13');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `BewertungBenutzer`
--

CREATE TABLE IF NOT EXISTS `BewertungBenutzer` (
`pk_ID_Rating` int(11) NOT NULL,
  `pk_ID` int(11) NOT NULL,
  `Rating` tinyint(4) NOT NULL,
  `Description` varchar(200) DEFAULT NULL,
  `Rater` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `BewertungBenutzer`
--

INSERT INTO `BewertungBenutzer` (`pk_ID_Rating`, `pk_ID`, `Rating`, `Description`, `Rater`) VALUES
(4, 20, 8, '-- SUPER GOOD STUFF --', 15),
(5, 57, 4, '-- BAD STUFF', 21),
(7, 20, 1, 'Der Kerl war ein totales Arschlosch. Sehr unfreundlich und nicht weiterzuempfehlen! Schade, dass es solche Leute auf diesen Plattformen noch gibt. Hoffentlich stirbt er bald. PENIS', 21);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `BewertungFahrrad`
--

CREATE TABLE IF NOT EXISTS `BewertungFahrrad` (
  `pk_ID` int(11) NOT NULL,
`pk_ID_Rating` int(11) NOT NULL,
  `Rating` tinyint(4) NOT NULL,
  `Description` varchar(200) DEFAULT NULL,
  `Rater` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `BewertungFahrrad`
--

INSERT INTO `BewertungFahrrad` (`pk_ID`, `pk_ID_Rating`, `Rating`, `Description`, `Rater`) VALUES
(1, 1, 7, 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores ', 20),
(2, 2, 4, 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores ', 21);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Bild`
--

CREATE TABLE IF NOT EXISTS `Bild` (
  `ID_Fahrrad` int(11) NOT NULL,
`pk_ID_Bild` int(11) NOT NULL,
  `Picture` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `Bild`
--

INSERT INTO `Bild` (`ID_Fahrrad`, `pk_ID_Bild`, `Picture`) VALUES
(1, 1, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAACTCAYAAADC1jSVAAAAAXNSR0IArs4c6QAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAAHyUlEQVR4Ae2d628VRRTAz33RQnm0tBQKpSWUhxRLEWgJDYhoAU1E1A/g44N+9i8w8bOJfwEfjEZjhAganhp5xYBgAC02La9CKYFSKAVqoUCL3JfnDLncB8vt8e7svbOXMwR2Z+fs7JzfPXNmd3aH44EM0qYvPotmcFrOT/nk0889mTTCm8lJz9s5AonxiwskgcQgwBARSxJIDAIMET9DxjiRefVLoGRiGUQikafa5vX5oO9aN3SdP/NUWaYHXAlp1gt1UDmj5pk6dxQUaoUkPumZqOMFeQlJ9+NAXkKK24CePYHE4CiQGJBcObr1XL4Iw0MPIBwOwegxRVBdMwdVzegBn4EIwBWQCnBIr5lXB51n2iAYfAStJ448Ua6svAKqZs4Gj+c5hhQIjILmtzYqEOMmFMOJwweeAFI7io1zgOgaxltSKBSC1uO/w9D9QahbvAzuD96FM61/JoNyOGe8445GI1CFPufhw2HYv+sHKBxdBOOLJzqMJbl64y2JHHJH+0nlc+7fG4Turgu4n93fViukYnzorF3YAKFQEABve/3oT7xej3oQ/Xd4GLovXYCiceNh8tTpajDyIIBAQQFEwhGIRqMwcLsP+q5fhWnVNVA0dpz6OemB1ev14kgWRrkwXOu+BGHsglUz58D5060QtXjITbYD+zmtkEpKJykgF3AU8qFixZhvWvUGjB0/QbW08eVmuNJ1XjlfGo2i+Gd2bT0sbFz+ZHQiwCcO74eOU3+Dz+eHUTiyLV25Gioqq1Udi5athP5bN6Dl6G9A+51n2xBwBM/32afxjBr02i0qTo71Tv8tVKQPujpOw47NXyrriF2/Eq2kYno13L7ZC/03b8DxQ/vgwO6tEHz0SIn4/QGorW8AsiCC0dtzGfZs/UZ1uVgdpZOmYB0z4OK5dljc9ErssGNbvZAsmknQfvnxO2VBVOzz+2HF6nXQuOI1zD0eugnmr9u/xxHsnqqhpKwc1m34GK1nhspT9zq0d6ca5VQ/xqMLljRhHc2qG8bqUcIO/KMXEvqVsehzaPSZiIrG/haOHgPtLcfgATreWFrctArWvv0e0M0gddPBOwNwrr1F+SaSGYM+6c0NH0F9Q5PqtuTvOtFy+q5djVWBWw+CO4Jb3c/9CZfAXa0+aeCf28rpzn+pMekqZC/BYBD2Y7cihzwVu4rXiw4Zu9TcukXox8LKpgbvDsBP326CaTihNgFBk98qLi2HQnz0UAlZtBw7BOFgSD2KnMVRj5y606OdVkjki44e/DkJkFWGule6RP4qnjxomSUK2NCDe8p3ETwa5SiVTa6Iizq0pxWSM22MwouLlipIdAtRNnkqXML567sD/c5czqJWvT7J4gJ2D5HVEBS6HViz/n0IYbfNJiBqv/GW5A8EoGH5qzjxPwva/voDTp08lszdWZ+trmU8JLp/OrB7m7rppBtM60SknJsJMB4SQXk4PJRkQXSPVFo+RT2e0KQbdUknkysgpQKorpmb9r1bqrzdvPGO21rBLDiihAu7FFKCBlnYFUgMyC6FlN5Rpy9lUEkRcSmkFC0czrpydLvYcQrnonrTfnqjk5srIZ1ra9HJYMS6pLuNiAhAIAkkBgGGiFiSQGIQYIiIJQkkBgGGiFiSQGIQYIiIJbkNUnlFpXp9TVuTkjHPbvTd4+vvfqheHdEHo3u3b8ZPdTqNYGVMd6vB9SL0bo0SbSlvSjIGUgDfryWm1HxiWbb3jYGUbcX/z/UEEoOWQBJIDAIMEbEkgcQgwBARSxJIDAIMEbEkgcQgwBARSxJIDAIMEbEkgcQgwBARS2JAsj0zSTOKtGbt8YRZZt8yRiJRXChYldRcyjev26AWFSYVsDMetSSe1sPZneG0BYnmote+8wHQGjXdiRYSzq5dYLvamXPnw64tX8PN3p6M67LV3QiSE4Ay1sbiRGqf3RcLtiDRr6PW21o0zpRD1D47VkR62OpudPF9O7Zo8Um0xja2VpcaRisue3uuaPFJOYVEypBTtOsYqZ416zcipPgbkr7r3XBwzzYqynmy1d1y3vosNUAgMUALJIHEIMAQEUsSSAwCDBGxJIHEIMAQEUsSSAwCDBGxJIHEIMAQEUsSSAwCDBGxJDdBov+EKjGl5hPLsr1vjCV14eJj+n6bEm0pb0qyNX2rUwma3dy5+SuYMq0KbmAgBLtTrjrbZgwkUorAmAQnBtqY7hZrkIlbgcT4VQSSQGIQYIiIJQkkBgGGiFiSQGIQYIiIJQkkBgGGiFiSQGIQYIiIJQkkBgGGiFgSA5JR80mM9kK2I5dSm1wHKduRSwmSdDeiMELKO0iZLdxITynvIKVXN7NSgcTgJpAYkFw3umU7cikxNB5SriOXGg/JhMilxkMyIXIpQTLacZsQudR4S6LQP7mOXKoVUr5GLtUKKV8jlxIkfT4Jgz7lY+RSvZCotpSUD5FLSSV9lpSnkUsJkrY77nyNXKoVUr5GLtUKiSrTn3IfuZR00ueT9BNSYRJzHbmU1NLmkxxgBCZELjUekgmRS42HRA3MdeRSV0CiRiambEcupWsb7bgT4cT3nXhpFK/das+FkKzUcPaYQGLwdSGk9LFJ05cyiFiIuBCShRYOHzL6ZtJK92xHLqU2uA5StiOXEiTpbkRhhCSQRgBExQJJIDEIMETEkhiQ/gPxqj3FuUdxagAAAABJRU5ErkJggg=='),
(2, 2, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAACTCAYAAADC1jSVAAAAAXNSR0IArs4c6QAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAAHyUlEQVR4Ae2d628VRRTAz33RQnm0tBQKpSWUhxRLEWgJDYhoAU1E1A/g44N+9i8w8bOJfwEfjEZjhAganhp5xYBgAC02La9CKYFSKAVqoUCL3JfnDLncB8vt8e7svbOXMwR2Z+fs7JzfPXNmd3aH44EM0qYvPotmcFrOT/nk0889mTTCm8lJz9s5AonxiwskgcQgwBARSxJIDAIMET9DxjiRefVLoGRiGUQikafa5vX5oO9aN3SdP/NUWaYHXAlp1gt1UDmj5pk6dxQUaoUkPumZqOMFeQlJ9+NAXkKK24CePYHE4CiQGJBcObr1XL4Iw0MPIBwOwegxRVBdMwdVzegBn4EIwBWQCnBIr5lXB51n2iAYfAStJ448Ua6svAKqZs4Gj+c5hhQIjILmtzYqEOMmFMOJwweeAFI7io1zgOgaxltSKBSC1uO/w9D9QahbvAzuD96FM61/JoNyOGe8445GI1CFPufhw2HYv+sHKBxdBOOLJzqMJbl64y2JHHJH+0nlc+7fG4Turgu4n93fViukYnzorF3YAKFQEABve/3oT7xej3oQ/Xd4GLovXYCiceNh8tTpajDyIIBAQQFEwhGIRqMwcLsP+q5fhWnVNVA0dpz6OemB1ev14kgWRrkwXOu+BGHsglUz58D5060QtXjITbYD+zmtkEpKJykgF3AU8qFixZhvWvUGjB0/QbW08eVmuNJ1XjlfGo2i+Gd2bT0sbFz+ZHQiwCcO74eOU3+Dz+eHUTiyLV25Gioqq1Udi5athP5bN6Dl6G9A+51n2xBwBM/32afxjBr02i0qTo71Tv8tVKQPujpOw47NXyrriF2/Eq2kYno13L7ZC/03b8DxQ/vgwO6tEHz0SIn4/QGorW8AsiCC0dtzGfZs/UZ1uVgdpZOmYB0z4OK5dljc9ErssGNbvZAsmknQfvnxO2VBVOzz+2HF6nXQuOI1zD0eugnmr9u/xxHsnqqhpKwc1m34GK1nhspT9zq0d6ca5VQ/xqMLljRhHc2qG8bqUcIO/KMXEvqVsehzaPSZiIrG/haOHgPtLcfgATreWFrctArWvv0e0M0gddPBOwNwrr1F+SaSGYM+6c0NH0F9Q5PqtuTvOtFy+q5djVWBWw+CO4Jb3c/9CZfAXa0+aeCf28rpzn+pMekqZC/BYBD2Y7cihzwVu4rXiw4Zu9TcukXox8LKpgbvDsBP326CaTihNgFBk98qLi2HQnz0UAlZtBw7BOFgSD2KnMVRj5y606OdVkjki44e/DkJkFWGule6RP4qnjxomSUK2NCDe8p3ETwa5SiVTa6Iizq0pxWSM22MwouLlipIdAtRNnkqXML567sD/c5czqJWvT7J4gJ2D5HVEBS6HViz/n0IYbfNJiBqv/GW5A8EoGH5qzjxPwva/voDTp08lszdWZ+trmU8JLp/OrB7m7rppBtM60SknJsJMB4SQXk4PJRkQXSPVFo+RT2e0KQbdUknkysgpQKorpmb9r1bqrzdvPGO21rBLDiihAu7FFKCBlnYFUgMyC6FlN5Rpy9lUEkRcSmkFC0czrpydLvYcQrnonrTfnqjk5srIZ1ra9HJYMS6pLuNiAhAIAkkBgGGiFiSQGIQYIiIJQkkBgGGiFiSQGIQYIiIJbkNUnlFpXp9TVuTkjHPbvTd4+vvfqheHdEHo3u3b8ZPdTqNYGVMd6vB9SL0bo0SbSlvSjIGUgDfryWm1HxiWbb3jYGUbcX/z/UEEoOWQBJIDAIMEbEkgcQgwBARSxJIDAIMEbEkgcQgwBARSxJIDAIMEbEkgcQgwBARS2JAsj0zSTOKtGbt8YRZZt8yRiJRXChYldRcyjev26AWFSYVsDMetSSe1sPZneG0BYnmote+8wHQGjXdiRYSzq5dYLvamXPnw64tX8PN3p6M67LV3QiSE4Ay1sbiRGqf3RcLtiDRr6PW21o0zpRD1D47VkR62OpudPF9O7Zo8Um0xja2VpcaRisue3uuaPFJOYVEypBTtOsYqZ416zcipPgbkr7r3XBwzzYqynmy1d1y3vosNUAgMUALJIHEIMAQEUsSSAwCDBGxJIHEIMAQEUsSSAwCDBGxJIHEIMAQEUsSSAwCDBGxJDdBov+EKjGl5hPLsr1vjCV14eJj+n6bEm0pb0qyNX2rUwma3dy5+SuYMq0KbmAgBLtTrjrbZgwkUorAmAQnBtqY7hZrkIlbgcT4VQSSQGIQYIiIJQkkBgGGiFiSQGIQYIiIJQkkBgGGiFiSQGIQYIiIJQkkBgGGiFgSA5JR80mM9kK2I5dSm1wHKduRSwmSdDeiMELKO0iZLdxITynvIKVXN7NSgcTgJpAYkFw3umU7cikxNB5SriOXGg/JhMilxkMyIXIpQTLacZsQudR4S6LQP7mOXKoVUr5GLtUKKV8jlxIkfT4Jgz7lY+RSvZCotpSUD5FLSSV9lpSnkUsJkrY77nyNXKoVUr5GLtUKiSrTn3IfuZR00ueT9BNSYRJzHbmU1NLmkxxgBCZELjUekgmRS42HRA3MdeRSV0CiRiambEcupWsb7bgT4cT3nXhpFK/das+FkKzUcPaYQGLwdSGk9LFJ05cyiFiIuBCShRYOHzL6ZtJK92xHLqU2uA5StiOXEiTpbkRhhCSQRgBExQJJIDEIMETEkhiQ/gPxqj3FuUdxagAAAABJRU5ErkJggg==');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Countries`
--

CREATE TABLE IF NOT EXISTS `Countries` (
  `code` char(2) CHARACTER SET utf8 NOT NULL,
  `en` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `de` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `es` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `fr` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `it` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `ru` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `Countries`
--

INSERT INTO `Countries` (`code`, `en`, `de`, `es`, `fr`, `it`, `ru`) VALUES
('AD', 'Andorra', 'Andorra', 'Andorra', 'ANDORRE', 'Andorra ', 'Андорра'),
('AE', 'United Arab Emirates', 'Vereinigte Arabische Emirate', 'Emiratos Árabes Unidos', 'ÉMIRATS ARABES UNIS', 'Emirati Arabi Uniti ', 'ОАЭ'),
('AF', 'Afghanistan', 'Afghanistan', 'Afganistán', 'AFGHANISTAN', 'Afghanistan', 'Афганистан'),
('AG', 'Antigua and Barbuda', 'Antigua und Barbuda', 'Antigua y Barbuda', 'ANTIGUA-ET-BARBUDA', 'Antigua e Barbuda', 'Антигуа и Барбуда'),
('AI', 'Anguilla', 'Anguilla', 'Anguila', 'ANGUILLA', 'Anguilla', 'Ангилья'),
('AL', 'Albania', 'Albanien', 'Albania', 'ALBANIE', 'Albania ', 'Албания'),
('AM', 'Armenia', 'Armenien', 'Armenia', 'ARMÉNIE', 'Armenia ', 'Армения'),
('AN', 'Netherlands Antilles', 'Niederländische Antillen', 'Antillas Neerlandesas', '', '', ''),
('AO', 'Angola', 'Angola', 'Angola', 'ANGOLA', 'Angola ', 'Ангола'),
('AQ', 'Antarctica', 'Antarktis', 'Antártida', 'ANTARCTIQUE', 'Antartide ', 'Антарктида'),
('AR', 'Argentina', 'Argentinien', 'Argentina', 'ARGENTINE', 'Argentina ', 'Аргентина'),
('AS', 'American Samoa', 'Amerikanisch-Samoa', 'Samoa Americana', 'SAMOA AMÉRICAINES', 'Samoa Americane', 'Американское Самоа'),
('AT', 'Austria', 'Österreich', 'Austria', 'AUTRICHE', 'Austria', 'Австрия'),
('AU', 'Australia', 'Australien', 'Australia', 'AUSTRALIE', 'Australia', 'Австралия'),
('AW', 'Aruba', 'Aruba', 'Aruba', 'ARUBA', 'Aruba', 'Аруба'),
('AX', 'Aland Islands', 'Åland', 'Islas Áland', 'ÅLAND, ÎLES', 'Isole Åland', 'Аландские острова'),
('AZ', 'Azerbaijan', 'Aserbaidschan', 'Azerbaiyán', 'AZERBAÏDJAN', 'Azerbaigian', 'Азербайджан'),
('BA', 'Bosnia and Herzegovina', 'Bosnien und Herzegowina', 'Bosnia y Herzegovina', 'BOSNIE-HERZÉGOVINE', 'Bosnia ed Erzegovina', 'Босния и Герцеговина'),
('BB', 'Barbados', 'Barbados', 'Barbados', 'BARBADE', 'Barbados', 'Барбадос'),
('BD', 'Bangladesh', 'Bangladesch', 'Bangladesh', 'BANGLADESH', 'Bangladesh', 'Бангладеш'),
('BE', 'Belgium', 'Belgien', 'Bélgica', 'BELGIQUE', 'Belgio', 'Бельгия'),
('BF', 'Burkina Faso', 'Burkina Faso', 'Burkina Faso', 'BURKINA FASO', 'Burkina Faso', 'Буркина-Фасо'),
('BG', 'Bulgaria', 'Bulgarien', 'Bulgaria', 'BULGARIE', 'Bulgaria', 'Болгария'),
('BH', 'Bahrain', 'Bahrain', 'Bahréin', 'BAHREÏN', 'Bahrein', 'Бахрейн'),
('BI', 'Burundi', 'Burundi', 'Burundi', 'BURUNDI', 'Burundi', 'Бурунди'),
('BJ', 'Benin', 'Benin', 'Benin', 'BÉNIN', 'Benin', 'Бенин'),
('BM', 'Bermuda', 'Bermuda', 'Bermudas', 'BERMUDES', 'Bermuda', 'Бермуды'),
('BN', 'Brunei', 'Brunei Darussalam', 'Brunéi', 'BRUNÉI DARUSSALAM', 'Brunei', 'Бруней'),
('BO', 'Bolivia', 'Bolivien', 'Bolivia', 'BOLIVIE, ÉTAT PLURINATIONAL DE', 'Bolivia', 'Боливия'),
('BR', 'Brazil', 'Brasilien', 'Brasil', 'BRÉSIL', 'Brasile', 'Бразилия'),
('BS', 'Bahamas', 'Bahamas', 'Bahamas', 'BAHAMAS', 'Bahamas', 'Багамы'),
('BT', 'Bhutan', 'Bhutan', 'Bhután', 'BHOUTAN', 'Bhutan', 'Бутан'),
('BV', 'Bouvet Island', 'Bouvetinsel', 'Isla Bouvet', 'BOUVET, ÎLE', 'Isola Bouvet', 'Остров Буве'),
('BW', 'Botswana', 'Botswana', 'Botsuana', 'BOTSWANA', 'Botswana', 'Ботсвана'),
('BY', 'Belarus', 'Belarus (Weißrussland)', 'Belarús', 'BÉLARUS', 'Bielorussia', 'Белоруссия'),
('BZ', 'Belize', 'Belize', 'Belice', 'BELIZE', 'Belize', 'Белиз'),
('CA', 'Canada', 'Kanada', 'Canadá', 'CANADA', 'Canada', 'Канада'),
('CC', 'Cocos (Keeling) Islands', 'Kokosinseln (Keelinginseln)', 'Islas Cocos', 'COCOS (KEELING), ÎLES', 'Isole Cocos (Keeling)', 'Кокосовые острова'),
('CD', 'Congo (Kinshasa)', 'Kongo', 'Congo', 'CONGO, LA RÉPUBLIQUE DÉMOCRATIQUE DU', 'RD del Congo', 'Демократическая Республика Конго'),
('CF', 'Central African Republic', 'Zentralafrikanische Republik', 'República Centro-Africana', 'CENTRAFRICAINE, RÉPUBLIQUE', 'Rep. Centrafricana', 'ЦАР'),
('CG', 'Congo (Brazzaville)', 'Republik Kongo', 'Congo', 'CONGO', 'Rep. del Congo', 'Республика Конго'),
('CH', 'Switzerland', 'Schweiz', 'Suiza', 'SUISSE', 'Svizzera', 'Швейцария'),
('CI', 'Ivory Coast', 'Elfenbeinküste', 'Costa de Marfil', 'CÔTE D’IVOIRE', 'Costa d''Avorio', 'Кот-д’Ивуар'),
('CK', 'Cook Islands', 'Cookinseln', 'Islas Cook', 'COOK, ÎLES', 'Isole Cook', 'Острова Кука'),
('CL', 'Chile', 'Chile', 'Chile', 'CHILI', 'Cile', 'Чили'),
('CM', 'Cameroon', 'Kamerun', 'Camerún', 'CAMEROUN', 'Camerun', 'Камерун'),
('CN', 'China', 'China, Volksrepublik', 'China', 'CHINE', 'Cina', 'КНР (Китайская Народная Республика)'),
('CO', 'Colombia', 'Kolumbien', 'Colombia', 'COLOMBIE', 'Colombia', 'Колумбия'),
('CR', 'Costa Rica', 'Costa Rica', 'Costa Rica', 'COSTA RICA', 'Costa Rica', 'Коста-Рика'),
('CU', 'Cuba', 'Kuba', 'Cuba', 'CUBA', 'Cuba', 'Куба'),
('CV', 'Cape Verde', 'Kap Verde', 'Cabo Verde', 'CABO VERDE', 'Capo Verde', 'Кабо-Верде'),
('CX', 'Christmas Island', 'Weihnachtsinsel', 'Islas Christmas', 'CHRISTMAS, ÎLE', 'Isola di Natale', 'Остров Рождества'),
('CY', 'Cyprus', 'Zypern', 'Chipre', 'CHYPRE', 'Cipro', 'Кипр'),
('CZ', 'Czech Republic', 'Tschechische Republik', 'República Checa', 'TCHÈQUE, RÉPUBLIQUE', 'Rep. Ceca', 'Чехия'),
('DE', 'Germany', 'Deutschland', 'Alemania', 'ALLEMAGNE', 'Germania', 'Германия'),
('DJ', 'Djibouti', 'Dschibuti', 'Yibuti', 'DJIBOUTI', 'Gibuti', 'Джибути'),
('DK', 'Denmark', 'Dänemark', 'Dinamarca', 'DANEMARK', 'Danimarca', 'Дания'),
('DM', 'Dominica', 'Dominica', 'Domínica', 'DOMINIQUE', 'Dominica', 'Доминика'),
('DO', 'Dominican Republic', 'Dominikanische Republik', 'República Dominicana', 'DOMINICAINE, RÉPUBLIQUE', 'Rep. Dominicana', 'Доминиканская Республика'),
('DZ', 'Algeria', 'Algerien', 'Argelia', 'ALGÉRIE', 'Algeria', 'Алжир'),
('EC', 'Ecuador', 'Ecuador', 'Ecuador', 'ÉQUATEUR', 'Ecuador', 'Эквадор'),
('EE', 'Estonia', 'Estland (Reval)', 'Estonia', 'ESTONIE', 'Estonia', 'Эстония'),
('EG', 'Egypt', 'Ägypten', 'Egipto', 'ÉGYPTE', 'Egitto', 'Египет'),
('EH', 'Western Sahara', 'Westsahara', 'Sahara Occidental', 'SAHARA OCCIDENTAL', 'Sahara Occidentale', 'САДР'),
('ER', 'Eritrea', 'Eritrea', 'Eritrea', 'ÉRYTHRÉE', 'Eritrea', 'Эритрея'),
('ES', 'Spain', 'Spanien', 'España', 'ESPAGNE', 'Spagna', 'Испания'),
('ET', 'Ethiopia', 'Äthiopien', 'Etiopía', 'ÉTHIOPIE', 'Etiopia', 'Эфиопия'),
('FI', 'Finland', 'Finnland', 'Finlandia', 'FINLANDE', 'Finlandia', 'Финляндия'),
('FJ', 'Fiji', 'Fidschi', 'Fiji', 'FIDJI', 'Figi', 'Фиджи'),
('FK', 'Falkland Islands', 'Falklandinseln (Malwinen)', 'Islas Malvinas', 'FALKLAND, ÎLES (MALVINAS)', 'Isole Falkland', 'Фолклендские острова'),
('FM', 'Micronesia', 'Mikronesien', 'Micronesia', 'MICRONÉSIE, ÉTATS FÉDÉRÉS DE', 'Micronesia', 'Микронезия'),
('FO', 'Faroe Islands', 'Färöer', 'Islas Faroe', 'FÉROÉ, ÎLES', 'Fær Øer', 'Фареры'),
('FR', 'France', 'Frankreich', 'Francia', 'FRANCE', 'Francia', 'Франция'),
('GA', 'Gabon', 'Gabun', 'Gabón', 'GABON', 'Gabon', 'Габон'),
('GB', 'United Kingdom', 'Großbritannien und Nordirland', 'Reino Unido', 'ROYAUME-UNI', 'Regno Unito', 'Великобритания'),
('GD', 'Grenada', 'Grenada', 'Granada', 'GRENADE', 'Grenada', 'Гренада'),
('GE', 'Georgia', 'Georgien', 'Georgia', 'GÉORGIE', 'Georgia', 'Грузия'),
('GF', 'French Guiana', 'Französisch-Guayana', 'Guayana Francesa', 'GUYANE FRANÇAISE', 'Guyana francese', 'Гвиана'),
('GG', 'Guernsey', 'Guernsey (Kanalinsel)', 'Guernsey', 'GUERNESEY', 'Guernsey', 'Гернси'),
('GH', 'Ghana', 'Ghana', 'Ghana', 'GHANA', 'Ghana', 'Гана'),
('GI', 'Gibraltar', 'Gibraltar', 'Gibraltar', 'GIBRALTAR', 'Gibilterra', 'Гибралтар'),
('GL', 'Greenland', 'Grönland', 'Groenlandia', 'GROENLAND', 'Groenlandia', 'Гренландия'),
('GM', 'Gambia', 'Gambia', 'Gambia', 'GAMBIE', 'Gambia', 'Гамбия'),
('GN', 'Guinea', 'Guinea', 'Guinea', 'GUINÉE', 'Guinea', 'Гвинея'),
('GP', 'Guadeloupe', 'Guadeloupe', 'Guadalupe', 'GUADELOUPE', 'Guadalupa', 'Гваделупа'),
('GQ', 'Equatorial Guinea', 'Äquatorialguinea', 'Guinea Ecuatorial', 'GUINÉE ÉQUATORIALE', 'Guinea Equatoriale', 'Экваториальная Гвинея'),
('GR', 'Greece', 'Griechenland', 'Grecia', 'GRÈCE', 'Grecia ', 'Греция'),
('GS', 'South Georgia and the South Sandwich Islands', 'Südgeorgien und die Südl. Sandwichinseln', 'Georgia del Sur e Islas Sandwich del Sur', 'GÉORGIE DU SUD ET LES ÎLES SANDWICH DU SUD', 'Georgia del Sud e isole Sandwich meridionali', 'Южная Георгия и Южные Сандвичевы Острова'),
('GT', 'Guatemala', 'Guatemala', 'Guatemala', 'GUATEMALA', 'Guatemala', 'Гватемала'),
('GU', 'Guam', 'Guam', 'Guam', 'GUAM', 'Guam', 'Гуам'),
('GW', 'Guinea-Bissau', 'Guinea-Bissau', 'Guinea-Bissau', 'GUINÉE-BISSAU', 'Guinea-Bissau', 'Гвинея-Бисау'),
('GY', 'Guyana', 'Guyana', 'Guayana', 'GUYANA', 'Guyana', 'Гайана'),
('HK', 'Hong Kong S.A.R., China', 'Hongkong', 'Hong Kong', 'HONG KONG', 'Hong Kong', 'Гонконг'),
('HM', 'Heard Island and McDonald Islands', 'Heard- und McDonald-Inseln', 'Islas Heard y McDonald', 'HEARD ET MACDONALD, ÎLES', 'Isole Heard e McDonald', 'Херд и Макдональд'),
('HN', 'Honduras', 'Honduras', 'Honduras', 'HONDURAS', 'Honduras', 'Гондурас'),
('HR', 'Croatia', 'Kroatien', 'Croacia', 'CROATIE', 'Croazia', 'Хорватия'),
('HT', 'Haiti', 'Haiti', 'Haití', 'HAÏTI', 'Haiti ', 'Гаити'),
('HU', 'Hungary', 'Ungarn', 'Hungría', 'HONGRIE', 'Ungheria', 'Венгрия'),
('ID', 'Indonesia', 'Indonesien', 'Indonesia', 'INDONÉSIE', 'Indonesia', 'Индонезия'),
('IE', 'Ireland', 'Irland', 'Irlanda', 'IRLANDE', 'Irlanda ', 'Флаг Ирландии Ирландия'),
('IL', 'Israel', 'Israel', 'Israel', 'ISRAËL', 'Israele ', 'Израиль'),
('IM', 'Isle of Man', 'Insel Man', 'Isla de Man', 'ÎLE DE MAN', 'Isola di Man', 'Остров Мэн'),
('IN', 'India', 'Indien', 'India', 'INDE', 'India ', 'Индия Индия'),
('IO', 'British Indian Ocean Territory', 'Britisches Territorium im Indischen Ozean', 'Territorio Británico del Océano Índico', 'OCÉAN INDIEN, TERRITOIRE BRITANNIQUE DE L''', 'Territorio britannico dell''oceano', 'Британская территория в Индийском океане'),
('IQ', 'Iraq', 'Irak', 'Irak', 'IRAQ', 'Iraq ', 'Ирак'),
('IR', 'Iran', 'Iran', 'Irán', 'IRAN, RÉPUBLIQUE ISLAMIQUE D''', 'Iran ', 'Иран'),
('IS', 'Iceland', 'Island', 'Islandia', 'ISLANDE', 'Islanda ', 'Исландия'),
('IT', 'Italy', 'Italien', 'Italia', 'ITALIE', 'Italia ', 'Италия'),
('JE', 'Jersey', 'Jersey (Kanalinsel)', 'Jersey', 'JERSEY', 'Jersey ', 'Джерси'),
('JM', 'Jamaica', 'Jamaika', 'Jamaica', 'JAMAÏQUE', 'Giamaica', 'Ямайка'),
('JO', 'Jordan', 'Jordanien', 'Jordania', 'JORDANIE', 'Giordania ', 'Иордания'),
('JP', 'Japan', 'Japan', 'Japón', 'JAPON', 'Giappone ', 'Япония'),
('KE', 'Kenya', 'Kenia', 'Kenia', 'KENYA', 'Kenya ', 'Кения'),
('KG', 'Kyrgyzstan', 'Kirgisistan', 'Kirguistán', 'KIRGHIZISTAN', 'Kirghizistan', 'Киргизия'),
('KH', 'Cambodia', 'Kambodscha', 'Camboya', 'CAMBODGE', 'Cambogia ', 'Камбоджа'),
('KI', 'Kiribati', 'Kiribati', 'Kiribati', 'KIRIBATI', 'Kiribati ', 'Кирибати'),
('KM', 'Comoros', 'Komoren', 'Comoros', 'COMORES', 'Comore ', 'Коморы'),
('KN', 'Saint Kitts and Nevis', 'St. Kitts und Nevis', 'San Cristóbal y Nieves', 'SAINT-KITTS-ET-NEVIS', 'Saint Kitts e Nevis', 'Сент-Китс и Невис'),
('KP', 'North Korea', 'Nordkorea', 'Corea del Norte', 'CORÉE, RÉPUBLIQUE POPULAIRE DÉMOCRATIQUE DE', 'Corea del Nord ', 'КНДР (Корейская Народно-Демократическая Республика)'),
('KR', 'South Korea', 'Südkorea', 'Corea del Sur', 'CORÉE, RÉPUBLIQUE DE', 'Corea del Sud ', 'Республика Корея'),
('KW', 'Kuwait', 'Kuwait', 'Kuwait', 'KOWEÏT', 'Kuwait ', 'Кувейт'),
('KY', 'Cayman Islands', 'Kaimaninseln', 'Islas Caimán', 'CAÏMANES, ÎLES', 'Isole Cayman', 'Острова Кайман'),
('KZ', 'Kazakhstan', 'Kasachstan', 'Kazajstán', 'KAZAKHSTAN', 'Kazakistan ', 'Казахстан'),
('LA', 'Laos', 'Laos', 'Laos', 'LAO, RÉPUBLIQUE DÉMOCRATIQUE POPULAIRE', 'Laos ', 'Лаос'),
('LB', 'Lebanon', 'Libanon', 'Líbano', 'LIBAN', 'Libano', 'Ливан'),
('LC', 'Saint Lucia', 'St. Lucia', 'Santa Lucía', 'SAINTE-LUCIE', 'Santa Lucia', 'Сент-Люсия'),
('LI', 'Liechtenstein', 'Liechtenstein', 'Liechtenstein', 'LIECHTENSTEIN', 'Liechtenstein', 'Лихтенштейн'),
('LK', 'Sri Lanka', 'Sri Lanka', 'Sri Lanka', 'SRI LANKA', 'Sri Lanka ', 'Шри-Ланка'),
('LR', 'Liberia', 'Liberia', 'Liberia', 'LIBÉRIA', 'Liberia ', 'Либерия'),
('LS', 'Lesotho', 'Lesotho', 'Lesotho', 'LESOTHO', 'Lesotho ', 'Лесото'),
('LT', 'Lithuania', 'Litauen', 'Lituania', 'LITUANIE', 'Lituania', 'Литва'),
('LU', 'Luxembourg', 'Luxemburg', 'Luxemburgo', 'LUXEMBOURG', 'Lussemburgo', 'Люксембург'),
('LV', 'Latvia', 'Lettland', 'Letonia', 'LETTONIE', 'Lettonia ', 'Латвия'),
('LY', 'Libya', 'Libyen', 'Libia', 'LIBYE', 'Libia ', 'Ливия'),
('MA', 'Morocco', 'Marokko', 'Marruecos', 'MAROC', 'Marocco', 'Марокко'),
('MC', 'Monaco', 'Monaco', 'Mónaco', 'MONACO', 'Monaco ', 'Монако'),
('MD', 'Moldova', 'Moldawien', 'Moldova', 'MOLDOVA', 'Moldavia', 'Молдавия'),
('MG', 'Madagascar', 'Madagaskar', 'Madagascar', 'MADAGASCAR', 'Madagascar ', 'Мадагаскар'),
('MH', 'Marshall Islands', 'Marshallinseln', 'Islas Marshall', 'MARSHALL, ÎLES', 'Isole Marshall', 'Маршалловы Острова'),
('MK', 'Macedonia', 'Mazedonien', 'Macedonia', 'MACÉDOINE, L''EX-RÉPUBLIQUE YOUGOSLAVE DE', 'Macedonia ', 'Македония'),
('ML', 'Mali', 'Mali', 'Mali', 'MALI', 'Mali ', 'Мали'),
('MM', 'Myanmar', 'Myanmar (Burma)', 'Myanmar', 'MYANMAR', 'Birmania', 'Мьянма'),
('MN', 'Mongolia', 'Mongolei', 'Mongolia', 'MONGOLIE', 'Mongolia', 'Монголия'),
('MO', 'Macao S.A.R., China', 'Macau', 'Macao', 'MACAO', 'Macao ', 'Макао'),
('MP', 'Northern Mariana Islands', 'Nördliche Marianen', 'Islas Marianas del Norte', 'MARIANNES DU NORD, ÎLES', 'Isole Marianne Settentrionali', 'Северные Марианские острова'),
('MQ', 'Martinique', 'Martinique', 'Martinica', 'MARTINIQUE', 'Martinica', 'Мартиника'),
('MR', 'Mauritania', 'Mauretanien', 'Mauritania', 'MAURITANIE', 'Mauritania', 'Мавритания'),
('MS', 'Montserrat', 'Montserrat', 'Montserrat', 'MONTSERRAT', 'Montserrat', 'Монтсеррат'),
('MT', 'Malta', 'Malta', 'Malta', 'MALTE', 'Malta ', 'Мальта'),
('MU', 'Mauritius', 'Mauritius', 'Mauricio', 'MAURICE', 'Mauritius', 'Маврикий'),
('MV', 'Maldives', 'Malediven', 'Maldivas', 'MALDIVES', 'Maldive ', 'Мальдивы'),
('MW', 'Malawi', 'Malawi', 'Malawi', 'MALAWI', 'Malawi ', 'Малави'),
('MX', 'Mexico', 'Mexiko', 'México', 'MEXIQUE', 'Messico ', 'Мексика'),
('MY', 'Malaysia', 'Malaysia', 'Malasia', 'MALAISIE', 'Malesia ', 'Малайзия'),
('MZ', 'Mozambique', 'Mosambik', 'Mozambique', 'MOZAMBIQUE', 'Mozambico', 'Мозамбик'),
('NA', 'Namibia', 'Namibia', 'Namibia', 'NAMIBIE', 'Namibia ', 'Намибия'),
('NC', 'New Caledonia', 'Neukaledonien', 'Nueva Caledonia', 'NOUVELLE-CALÉDONIE', 'Nuova Caledonia', 'Новая Каледония'),
('NE', 'Niger', 'Niger', 'Níger', 'NIGER', 'Niger ', 'Нигер'),
('NF', 'Norfolk Island', 'Norfolkinsel', 'Islas Norkfolk', 'NORFOLK, ÎLE', 'Isola Norfolk', 'Остров Норфолк'),
('NG', 'Nigeria', 'Nigeria', 'Nigeria', 'NIGÉRIA', 'Nigeria ', 'Нигерия'),
('NI', 'Nicaragua', 'Nicaragua', 'Nicaragua', 'NICARAGUA', 'Nicaragua', 'Никарагуа'),
('NL', 'Netherlands', 'Niederlande', 'Países Bajos', 'PAYS-BAS', 'Paesi Bassi', 'Нидерланды'),
('NO', 'Norway', 'Norwegen', 'Noruega', 'NORVÈGE', 'Norvegia ', 'Норвегия'),
('NP', 'Nepal', 'Nepal', 'Nepal', 'NÉPAL', 'Nepal ', 'Непал'),
('NR', 'Nauru', 'Nauru', 'Nauru', 'NAURU', 'Nauru ', 'Науру'),
('NU', 'Niue', 'Niue', 'Niue', 'NIUÉ', 'Niue ', 'Ниуэ'),
('NZ', 'New Zealand', 'Neuseeland', 'Nueva Zelanda', 'NOUVELLE-ZÉLANDE', 'Nuova Zelanda', 'Новая Зеландия'),
('OM', 'Oman', 'Oman', 'Omán', 'OMAN', 'Oman ', 'Оман'),
('PA', 'Panama', 'Panama', 'Panamá', 'PANAMA', 'Panamá', 'Панама'),
('PE', 'Peru', 'Peru', 'Perú', 'PÉROU', 'Perù ', 'Перу'),
('PF', 'French Polynesia', 'Französisch-Polynesien', 'Polinesia Francesa', 'POLYNÉSIE FRANÇAISE', 'Polinesia Francese ', 'Французская Полинезия'),
('PG', 'Papua New Guinea', 'Papua-Neuguinea', 'Papúa Nueva Guinea', 'PAPOUASIE-NOUVELLE-GUINÉE', 'Papua Nuova Guinea ', 'Папуа — Новая Гвинея'),
('PH', 'Philippines', 'Philippinen', 'Filipinas', 'PHILIPPINES', 'Filippine ', 'Филиппины'),
('PK', 'Pakistan', 'Pakistan', 'Pakistán', 'PAKISTAN', 'Pakistan ', 'Пакистан'),
('PL', 'Poland', 'Polen', 'Polonia', 'POLOGNE', 'Polonia ', 'Польша'),
('PM', 'Saint Pierre and Miquelon', 'St. Pierre und Miquelon', 'San Pedro y Miquelón', 'SAINT-PIERRE-ET-MIQUELON', 'Saint-Pierre e Miquelon', 'Сен-Пьер и Микелон'),
('PN', 'Pitcairn', 'Pitcairninseln', 'Islas Pitcairn', 'PITCAIRN', 'Isole Pitcairn ', 'Острова Питкэрн'),
('PR', 'Puerto Rico', 'Puerto Rico', 'Puerto Rico', 'PORTO RICO', 'Porto Rico ', 'Пуэрто-Рико'),
('PS', 'Palestine', 'Palästina', 'Palestina', 'ÉTAT DE PALESTINE', 'Palestina ', 'Государство Палестина'),
('PT', 'Portugal', 'Portugal', 'Portugal', 'PORTUGAL', 'Portogallo ', 'Португалия'),
('PW', 'Palau', 'Palau', 'Islas Palaos', 'PALAOS', 'Palau ', 'Палау'),
('PY', 'Paraguay', 'Paraguay', 'Paraguay', 'PARAGUAY', 'Paraguay ', 'Парагвай'),
('QA', 'Qatar', 'Katar', 'Qatar', 'QATAR', 'Qatar ', 'Катар'),
('RE', 'Reunion', 'Réunion', 'Reunión', 'RÉUNION', 'Riunione ', 'Реюньон'),
('RO', 'Romania', 'Rumänien', 'Rumanía', 'ROUMANIE', 'Romania ', 'Румыния'),
('RU', 'Russia', 'Russische Föderation', 'Rusia', 'RUSSIE, FÉDÉRATION DE', 'Russia ', 'Россия'),
('RW', 'Rwanda', 'Ruanda', 'Ruanda', 'RWANDA', 'Ruanda ', 'Руанда'),
('SA', 'Saudi Arabia', 'Saudi-Arabien', 'Arabia Saudita', 'ARABIE SAOUDITE', 'Arabia Saudita', 'Саудовская Аравия'),
('SB', 'Solomon Islands', 'Salomonen', 'Islas Solomón', 'SALOMON, ÎLES', 'Isole Salomone', 'Соломоновы Острова'),
('SC', 'Seychelles', 'Seychellen', 'Seychelles', 'SEYCHELLES', 'Seychelles', 'Сейшельские Острова'),
('SD', 'Sudan', 'Sudan', 'Sudán', 'SOUDAN', 'Sudan ', 'Судан'),
('SE', 'Sweden', 'Schweden', 'Suecia', 'SUÈDE', 'Svezia', 'Швеция'),
('SG', 'Singapore', 'Singapur', 'Singapur', 'SINGAPOUR', 'Singapore', 'Сингапур'),
('SH', 'Saint Helena', 'St. Helena', 'Santa Elena', 'SAINTE-HÉLÈNE, ASCENSION ET TRISTAN DA CUNHA', 'Sant''Elena, Ascensione e Tristan da Cunha', 'Острова Святой Елены, Вознесения и Тристан-да-Кунья'),
('SI', 'Slovenia', 'Slowenien', 'Eslovenia', 'SLOVÉNIE', 'Slovenia Slovenia', 'Словения'),
('SJ', 'Svalbard and Jan Mayen', 'Svalbard und Jan Mayen', 'Islas Svalbard y Jan Mayen', 'SVALBARD ET ÎLE JAN MAYEN', 'Svalbard e Jan Mayen', 'Флаг Шпицбергена и Ян-Майена Шпицберген и Ян-Майен'),
('SK', 'Slovakia', 'Slowakei', 'Eslovaquia', 'SLOVAQUIE', 'Slovacchia ', 'Словакия'),
('SL', 'Sierra Leone', 'Sierra Leone', 'Sierra Leona', 'SIERRA LEONE', 'Sierra Leone', 'Сьерра-Леоне'),
('SM', 'San Marino', 'San Marino', 'San Marino', 'SAINT-MARIN', 'San Marino ', 'Сан-Марино'),
('SN', 'Senegal', 'Senegal', 'Senegal', 'SÉNÉGAL', 'Senegal ', 'Сенегал'),
('SO', 'Somalia', 'Somalia', 'Somalia', 'SOMALIE', 'Somalia ', 'Сомали'),
('SR', 'Suriname', 'Suriname', 'Surinam', 'SURINAME', 'Suriname', 'Суринам'),
('ST', 'Sao Tome and Principe', 'São Tomé und Príncipe', 'Santo Tomé y Príncipe', 'SAO TOMÉ-ET-PRINCIPE', 'São Tomé e Príncipe', 'Сан-Томе и Принсипи'),
('SV', 'El Salvador', 'El Salvador', 'El Salvador', 'EL SALVADOR', 'El Salvador ', 'Сальвадор'),
('SY', 'Syria', 'Syrien', 'Siria', 'SYRIENNE, RÉPUBLIQUE ARABE', 'Siria ', 'Сирия'),
('SZ', 'Swaziland', 'Swasiland', 'Suazilandia', 'SWAZILAND', 'Swaziland', 'Свазиленд'),
('TC', 'Turks and Caicos Islands', 'Turks- und Caicosinseln', 'Islas Turcas y Caicos', 'TURKS ET CAÏQUES, ÎLES', 'Turks e Caicos ', 'Тёркс и Кайкос'),
('TD', 'Chad', 'Tschad', 'Chad', 'TCHAD', 'Ciad ', 'Чад'),
('TF', 'French Southern Territories', 'Französische Süd- und Antarktisgebiete', 'Territorios Australes Franceses', 'TERRES AUSTRALES FRANÇAISES', 'Terre australi e antartiche francesi', 'Французские Южные и Антарктические Территории'),
('TG', 'Togo', 'Togo', 'Togo', 'TOGO', 'Togo ', 'Того'),
('TH', 'Thailand', 'Thailand', 'Tailandia', 'THAÏLANDE', 'Thailandia', 'Таиланд'),
('TJ', 'Tajikistan', 'Tadschikistan', 'Tayikistán', 'TADJIKISTAN', 'Tagikistan', 'Таджикистан'),
('TK', 'Tokelau', 'Tokelau', 'Tokelau', 'TOKELAU', 'Tokelau ', 'Токелау'),
('TL', 'East Timor', 'Timor-Leste', 'Timor-Leste', 'TIMOR-LESTE', 'Timor Est', 'Восточный Тимор'),
('TM', 'Turkmenistan', 'Turkmenistan', 'Turkmenistán', 'TURKMÉNISTAN', 'Turkmenistan', 'Туркмения'),
('TN', 'Tunisia', 'Tunesien', 'Túnez', 'TUNISIE', 'Tunisia ', 'Тунис'),
('TO', 'Tonga', 'Tonga', 'Tonga', 'TONGA', 'Tonga ', 'Тонга'),
('TR', 'Turkey', 'Türkei', 'Turquía', 'TURQUIE', 'Turchia', 'Турция'),
('TT', 'Trinidad and Tobago', 'Trinidad und Tobago', 'Trinidad y Tobago', 'TRINITÉ-ET-TOBAGO', 'Trinidad e Tobago', 'Тринидад и Тобаго'),
('TV', 'Tuvalu', 'Tuvalu', 'Tuvalu', 'TUVALU', 'Tuvalu ', 'Тувалу'),
('TW', 'Taiwan', 'Taiwan', 'Taiwán', 'TAÏWAN, PROVINCE DE CHINE', 'Taiwan ', 'Китайская Республика'),
('TZ', 'Tanzania', 'Tansania', 'Tanzania', 'TANZANIE, RÉPUBLIQUE UNIE DE', 'Tanzania ', 'Танзания'),
('UA', 'Ukraine', 'Ukraine', 'Ucrania', 'UKRAINE', 'Ucraina ', 'Украина'),
('UG', 'Uganda', 'Uganda', 'Uganda', 'OUGANDA', 'Uganda ', 'Уганда'),
('UM', 'United States Minor Outlying Islands', 'Amerikanisch-Ozeanien', 'Islas menores periféricas de los Estados Unidos', 'ÎLES MINEURES ÉLOIGNÉES DES ÉTATS-UNIS', 'Isole minori esterne degli Stati Uniti', 'Внешние малые острова (США)'),
('US', 'United States', 'Vereinigte Staaten von Amerika', 'Estados Unidos de América', 'ÉTATS-UNIS', 'Stati Uniti', 'США'),
('UY', 'Uruguay', 'Uruguay', 'Uruguay', 'URUGUAY', 'Uruguay ', 'Уругвай'),
('UZ', 'Uzbekistan', 'Usbekistan', 'Uzbekistán', 'OUZBÉKISTAN', 'Uzbekistan', 'Узбекистан'),
('VA', 'Vatican', 'Vatikanstadt', 'Ciudad del Vaticano', 'SAINT-SIÈGE (ÉTAT DE LA CITÉ DU VATICAN)', 'Città del Vaticano', 'Ватикан'),
('VC', 'Saint Vincent and the Grenadines', 'St. Vincent und die Grenadinen', 'San Vicente y las Granadinas', 'SAINT-VINCENT-ET-LES-GRENADINES', 'Saint Vincent e Grenadine', 'Сент-Винсент и Гренадины'),
('VE', 'Venezuela', 'Venezuela', 'Venezuela', 'VENEZUELA, RÉPUBLIQUE BOLIVARIENNE DU', 'Venezuela ', 'Венесуэла'),
('VG', 'British Virgin Islands', 'Britische Jungferninseln', 'Islas Vírgenes Británicas', 'ÎLES VIERGES BRITANNIQUES', 'Isole Vergini britanniche ', 'Британские Виргинские острова'),
('VI', 'U.S. Virgin Islands', 'Amerikanische Jungferninseln', 'Islas Vírgenes de los Estados Unidos de América', 'ÎLES VIERGES DES ÉTATS-UNIS', 'Isole Vergini americane ', 'Виргинские Острова (США)'),
('VN', 'Vietnam', 'Vietnam', 'Vietnam', 'VIET NAM', 'Vietnam', 'Вьетнам'),
('VU', 'Vanuatu', 'Vanuatu', 'Vanuatu', 'VANUATU', 'Vanuatu', 'Вануату'),
('WF', 'Wallis and Futuna', 'Wallis und Futuna', 'Wallis y Futuna', 'WALLIS-ET-FUTUNA', 'Wallis e Futuna', 'Уоллис и Футуна'),
('WS', 'Samoa', 'Samoa', 'Samoa', 'SAMOA', 'Samoa ', 'Самоа'),
('YE', 'Yemen', 'Jemen', 'Yemen', 'YÉMEN', 'Yemen ', 'Йемен'),
('YT', 'Mayotte', 'Mayotte', 'Mayotte', 'MAYOTTE', 'Mayotte ', 'Майотта'),
('ZA', 'South Africa', 'Südafrika', 'Sudáfrica', 'AFRIQUE DU SUD', 'Sudafrica ', 'ЮАР'),
('ZM', 'Zambia', 'Sambia', 'Zambia', 'ZAMBIE', 'Zambia ', 'Замбия'),
('ZW', 'Zimbabwe', 'Simbabwe', 'Zimbabue', 'ZIMBABWE', 'Zimbabwe', 'Зимбабве'),
('RS', 'Serbia', 'Serbien', 'Serbia', 'SERBIE', 'Serbia ', 'Сербия'),
('ME', 'Montenegro', 'Montenegro', 'Montenegro', 'MONTÉNÉGRO', 'Montenegro', 'Черногория'),
('BL', 'Saint Barthelemy !Saint Barthélemy', 'Saint-Barthélemy', 'Saint Barthélemy', 'SAINT-BARTHÉLEMY', 'Saint-Barthélemy', 'Сен-Бартелеми'),
('BQ', 'Bonaire, Sint Eustatius and Saba', 'Bonaire, Sint Eustatius und Saba', 'Bonaire, San Eustaquio y Saba', 'BONAIRE, SAINT-EUSTACHE ET SABA', 'Isole BES', 'Синт-Эстатиус и Саба'),
('CW', 'Curacao !Curaçao', 'Curaçao', 'Curaçao', 'CURAÇAO', 'Curaçao', 'Кюрасао'),
('MF', 'Saint Martin (French part)', 'Saint-Martin (franz. Teil)', 'Saint Martin (parte francesa)', 'SAINT-MARTIN (PARTIE FRANÇAISE)', 'Saint-Martin', 'Сен-Мартен'),
('SX', 'Sint Maarten (Dutch part)', 'Sint Maarten (niederl. Teil)', 'Sint Maarten (parte neerlandesa)', 'SAINT-MARTIN (PARTIE NÉERLANDAISE)', 'Sint Maarten ', 'Синт-Мартен'),
('SS', 'South Sudan', 'Sudsudan!Südsudan', 'Sudán del Sur', 'SOUDAN DU SUD', 'Sudan del Sud', 'Южный Судан');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Fahrrad`
--

CREATE TABLE IF NOT EXISTS `Fahrrad` (
`pk_ID` int(11) NOT NULL,
  `Biketype` enum('MOUNTAINBIKE','ELEKTROFAHRRAD','DAMENRAD','HERRENRAD') DEFAULT NULL,
  `Size` enum('12','14','16','18','20','22','24','26','28') DEFAULT NULL,
  `Price` double NOT NULL,
  `Description` varchar(300) NOT NULL,
  `Porter` tinyint(1) DEFAULT '0',
  `Childseat` tinyint(1) DEFAULT '0',
  `Threeday` double NOT NULL,
  `Sevenday` double NOT NULL,
  `Country` varchar(80) NOT NULL,
  `City` varchar(80) NOT NULL,
  `Street` varchar(80) NOT NULL,
  `ZIP` varchar(80) NOT NULL,
  `Housenumber` varchar(80) NOT NULL,
  `Lat` double DEFAULT NULL,
  `Lon` double DEFAULT NULL,
  `pk_ID_Benutzer` int(11) NOT NULL,
  `Name` varchar(80) NOT NULL DEFAULT 'Fahrradname'
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `Fahrrad`
--

INSERT INTO `Fahrrad` (`pk_ID`, `Biketype`, `Size`, `Price`, `Description`, `Porter`, `Childseat`, `Threeday`, `Sevenday`, `Country`, `City`, `Street`, `ZIP`, `Housenumber`, `Lat`, `Lon`, `pk_ID_Benutzer`, `Name`) VALUES
(1, 'MOUNTAINBIKE', '18', 10, 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est', 1, 1, 3, 5, 'Deutschland', 'Aachen', 'Straßenstraße', '52080', '22', 51.8, 10.6, 57, 'Longboard Monster Bike'),
(2, 'ELEKTROFAHRRAD', '22', 120, 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est', 0, 1, 0, 0, 'Deutschland', 'Aachen', 'Mozartstraße', '52080', '12', 49, 10, 57, 'Marcels Bike 1'),
(3, 'MOUNTAINBIKE', '12', 5, 'toll', 0, 0, 3, 5, 'Deutschland', 'Aachen', 'franzstraße', '52064', '24', 10, 10, 20, 'Janas bike'),
(4, 'HERRENRAD', '28', 8, 'richtig schön <3', 0, 0, 20, 50, 'Deutschland', 'Aachen', 'peterstraße', '52064', '5', 10, 10, 20, 'Janas 2. bike'),
(5, 'ELEKTROFAHRRAD', '12', 2.22, 'hübsch und klein', 0, 0, 3, 2, 'Deutschland', 'Aachen', 'boxgraben', '52064', '5', 10, 10, 20, 'Janas 3. bike'),
(6, 'DAMENRAD', '28', 16, 'für große frauen', 0, 1, 33, 66, 'Deutschland', 'Aachen', 'krugenofen', '52064', '5', 10, 10, 20, 'schönes teil'),
(7, 'HERRENRAD', '18', 6.99, 'super sportliches bmx rad', 0, 0, 0, 1, 'Deutschland', 'Altenberge', 'Waltrup', '48341', '117', 10, 10, 20, 'Hammer BMX!!'),
(8, 'MOUNTAINBIKE', '12', 102, 'Cox', 0, 0, 10, 20, 'Deutschland', 'Aachen', 'Eupenerstr', '52066', '70', 10, 10, 20, 'Cox');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Geschaeftsbenutzer`
--

CREATE TABLE IF NOT EXISTS `Geschaeftsbenutzer` (
  `pk_ID` int(11) NOT NULL DEFAULT '0',
  `Firmenname` varchar(80) NOT NULL,
  `Banner` blob,
  `WebUrl` varchar(80) DEFAULT NULL,
  `TwitterUrl` varchar(80) DEFAULT NULL,
  `FacebookUrl` varchar(80) DEFAULT NULL,
  `InstagramUrl` varchar(80) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `Geschaeftsbenutzer`
--

INSERT INTO `Geschaeftsbenutzer` (`pk_ID`, `Firmenname`, `Banner`, `WebUrl`, `TwitterUrl`, `FacebookUrl`, `InstagramUrl`) VALUES
(15, 'FIRMA', NULL, 'marcelochsendorf.com', 'twitter.com/lol', 'fb.com/hzu', NULL),
(23, 'FH Aachen', NULL, 'www.fh-aachen.de', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Privatbenutzer`
--

CREATE TABLE IF NOT EXISTS `Privatbenutzer` (
  `pk_ID` int(11) NOT NULL DEFAULT '0',
  `Name` varchar(80) NOT NULL DEFAULT 'Secondname',
  `Vorname` varchar(80) NOT NULL DEFAULT 'Firstname'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `Privatbenutzer`
--

INSERT INTO `Privatbenutzer` (`pk_ID`, `Name`, `Vorname`) VALUES
(20, 'Nach', 'Vor'),
(57, 'Arndt', 'Tobias'),
(63, 'asd', 'asd'),
(64, 'asd', 'asd');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `Benutzer`
--
ALTER TABLE `Benutzer`
 ADD PRIMARY KEY (`pk_ID`), ADD UNIQUE KEY `E-mail` (`email`);

--
-- Indizes für die Tabelle `Bestellung`
--
ALTER TABLE `Bestellung`
 ADD PRIMARY KEY (`pk_ID_Benutzer`,`pk_ID_Fahrrad`,`Rentdate`), ADD KEY `pk_ID_Fahrrad` (`pk_ID_Fahrrad`);

--
-- Indizes für die Tabelle `BewertungBenutzer`
--
ALTER TABLE `BewertungBenutzer`
 ADD PRIMARY KEY (`pk_ID_Rating`), ADD UNIQUE KEY `pk_ID_Rating` (`pk_ID_Rating`), ADD KEY `Rater` (`Rater`), ADD KEY `Rated` (`pk_ID`);

--
-- Indizes für die Tabelle `BewertungFahrrad`
--
ALTER TABLE `BewertungFahrrad`
 ADD PRIMARY KEY (`pk_ID_Rating`), ADD KEY `Rater` (`Rater`), ADD KEY `BewertungFahrrad_ibfk_1` (`pk_ID`);

--
-- Indizes für die Tabelle `Bild`
--
ALTER TABLE `Bild`
 ADD PRIMARY KEY (`pk_ID_Bild`), ADD KEY `Bild_ibfk_1` (`ID_Fahrrad`);

--
-- Indizes für die Tabelle `Countries`
--
ALTER TABLE `Countries`
 ADD PRIMARY KEY (`code`), ADD KEY `de` (`de`), ADD KEY `en` (`en`);

--
-- Indizes für die Tabelle `Fahrrad`
--
ALTER TABLE `Fahrrad`
 ADD PRIMARY KEY (`pk_ID`), ADD KEY `pk_ID_Benutzer` (`pk_ID_Benutzer`);

--
-- Indizes für die Tabelle `Geschaeftsbenutzer`
--
ALTER TABLE `Geschaeftsbenutzer`
 ADD PRIMARY KEY (`pk_ID`);

--
-- Indizes für die Tabelle `Privatbenutzer`
--
ALTER TABLE `Privatbenutzer`
 ADD PRIMARY KEY (`pk_ID`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `Benutzer`
--
ALTER TABLE `Benutzer`
MODIFY `pk_ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=65;
--
-- AUTO_INCREMENT für Tabelle `BewertungBenutzer`
--
ALTER TABLE `BewertungBenutzer`
MODIFY `pk_ID_Rating` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT für Tabelle `BewertungFahrrad`
--
ALTER TABLE `BewertungFahrrad`
MODIFY `pk_ID_Rating` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `Bild`
--
ALTER TABLE `Bild`
MODIFY `pk_ID_Bild` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `Fahrrad`
--
ALTER TABLE `Fahrrad`
MODIFY `pk_ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `Bestellung`
--
ALTER TABLE `Bestellung`
ADD CONSTRAINT `Bestellung_ibfk_1` FOREIGN KEY (`pk_ID_Benutzer`) REFERENCES `Privatbenutzer` (`pk_ID`) ON UPDATE CASCADE,
ADD CONSTRAINT `Bestellung_ibfk_2` FOREIGN KEY (`pk_ID_Fahrrad`) REFERENCES `Fahrrad` (`pk_ID`) ON UPDATE CASCADE;

--
-- Constraints der Tabelle `BewertungBenutzer`
--
ALTER TABLE `BewertungBenutzer`
ADD CONSTRAINT `Rated` FOREIGN KEY (`pk_ID`) REFERENCES `Benutzer` (`pk_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `Rater` FOREIGN KEY (`Rater`) REFERENCES `Benutzer` (`pk_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `BewertungFahrrad`
--
ALTER TABLE `BewertungFahrrad`
ADD CONSTRAINT `BewertungFahrrad_ibfk_1` FOREIGN KEY (`pk_ID`) REFERENCES `Fahrrad` (`pk_ID`) ON UPDATE CASCADE,
ADD CONSTRAINT `BewertungFahrrad_ibfk_2` FOREIGN KEY (`Rater`) REFERENCES `Benutzer` (`pk_ID`) ON UPDATE CASCADE;

--
-- Constraints der Tabelle `Bild`
--
ALTER TABLE `Bild`
ADD CONSTRAINT `Bild_ibfk_1` FOREIGN KEY (`ID_Fahrrad`) REFERENCES `Fahrrad` (`pk_ID`) ON UPDATE CASCADE;

--
-- Constraints der Tabelle `Fahrrad`
--
ALTER TABLE `Fahrrad`
ADD CONSTRAINT `Fahrrad_ibfk_1` FOREIGN KEY (`pk_ID_Benutzer`) REFERENCES `Benutzer` (`pk_ID`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `Geschaeftsbenutzer`
--
ALTER TABLE `Geschaeftsbenutzer`
ADD CONSTRAINT `Geschaeftsbenutzer_ibfk_1` FOREIGN KEY (`pk_ID`) REFERENCES `Benutzer` (`pk_ID`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `Privatbenutzer`
--
ALTER TABLE `Privatbenutzer`
ADD CONSTRAINT `Privatbenutzer_ibfk_1` FOREIGN KEY (`pk_ID`) REFERENCES `Benutzer` (`pk_ID`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
