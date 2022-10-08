
use scepterDB;

DROP TABLE IF EXISTS `disabledStudents`;

create table disabledStudents( email varchar(40), password varchar(40), firstname varchar (40), lastname varchar (40), age int (3), enrollmentStart date, enrollmentEnd date, PRIMARY KEY (email));

INSERT INTO `scepterDB`.`disabledStudents` (`email`, `firstname`, `lastname`, `age`) VALUES ('billgates@gmail.com', 'William', 'Gates', '21');


DROP TABLE IF EXISTS `Assistants`;

create table Assistants( email varchar(40), password varchar(40), firstname varchar (40), lastname varchar (40), enrollmentStart date, enrollmentEnd date, PRIMARY KEY (email));

INSERT INTO `scepterDB`.`Assistants` (`email`, `firstname`, `lastname`) VALUES ('timjohnson@gmail.com', 'Timothy', 'Johnson');

DROP TABLE IF EXISTS `AssistantSchedules`;

create table AssistantSchedules( email varchar(40), dayofweek int, starttime time, endtime time);

INSERT INTO `scepterDB`.`AssistantSchedules` (`email`, `dayofweek`) VALUES ('timjohnson@gmail.com', 2);

DROP TABLE IF EXISTS `Requests`;

create table Requests( requesterEmail varchar(40), assistantEmail varchar(40), requestDate date,
 requestTime time, requestStartLocation  POINT , requestEndLocation POINT, 
 requestStatus int, requestType varchar (40));

INSERT INTO `scepterDB`.`Requests` (`requesterEmail`) VALUES ('billgates@gmail.com');
