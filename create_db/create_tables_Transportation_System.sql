CREATE DATABASE Transportation_System;
USE Transportation_System;

CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(30),
    UserPassword VARCHAR(20),
    UserPhone VARCHAR(11),
    UserPermission ENUM('driver', 'admin', 'user'),
    UserEmail VARCHAR(35)
);

CREATE TABLE Station (
    StationID INT AUTO_INCREMENT PRIMARY KEY,
    Address VARCHAR(50),
    City VARCHAR(20)
);

CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(30),
    UserPassword VARCHAR(20),
    UserPhone VARCHAR(11),
    UserPermission ENUM('driver', 'admin', 'user'),
    UserEmail VARCHAR(35)
);

CREATE TABLE Transportation (
    TransportationID INT PRIMARY KEY,
    Transportation_Date DATE,
    Transportation_Time TIME,
    Transportation_Status ENUM('active', 'cancel'),
    DriverID INT,
    MaxPassengers INT,
    FOREIGN KEY (DriverID) REFERENCES Users(UserID)
);

CREATE TABLE Station_In_Transportation (
    TransportationID INT,
    StationID INT,
    Station_Status ENUM('active', 'cancel'),
    Station_Type ENUM('Starting', 'Destination', 'Intermediate'), 
    PRIMARY KEY (TransportationID, StationID),
    FOREIGN KEY (TransportationID) REFERENCES Transportation(TransportationID),
    FOREIGN KEY (StationID) REFERENCES Station(StationID)
);

CREATE TABLE Registrations_To_Transportation (
    UserID INT,
    TransportationID INT,
    PickupStationID INT,
    DropoffStationID INT,
    ExecutionDate DATETIME,
    Registration_Status ENUM('active', 'cancel'),
    PRIMARY KEY (UserID, TransportationID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (TransportationID) REFERENCES Transportation(TransportationID),
    FOREIGN KEY (PickupStationID) REFERENCES Station(StationID),
    FOREIGN KEY (DropoffStationID) REFERENCES Station(StationID)
);
CREATE TABLE Message (
    MessageID INT AUTO_INCREMENT PRIMARY KEY,
    SenderID INT,
    MessageText VARCHAR(300),
    Message_Status ENUM('active', 'cancel'),
    SendTime DATETIME,
    FOREIGN KEY (SenderID) REFERENCES Users(UserID)
);
CREATE TABLE Message_To_Transportation (
    TransportationID INT,
    MessageID INT,
    PRIMARY KEY (MessageID),
    FOREIGN KEY (MessageID) REFERENCES Message(MessageID),
    FOREIGN KEY (TransportationID) REFERENCES Transportation(TransportationID)
);
CREATE TABLE General_Message (
    AttachedFiles TEXT, 
    MessageID INT,
    PRIMARY KEY (MessageID),
    FOREIGN KEY (MessageID) REFERENCES Message(MessageID)
);
