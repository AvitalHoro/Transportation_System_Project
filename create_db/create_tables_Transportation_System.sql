CREATE DATABASE Transportation_System;
USE Transportation_System;

CREATE TABLE Station (
    StationID INT AUTO_INCREMENT PRIMARY KEY,
    Address VARCHAR(50),
    City VARCHAR(20)
);
CREATE TABLE Transportation (
    TransportationID INT AUTO_INCREMENT PRIMARY KEY,
    Transportation_Date DATETIME,
    Transportation_Time TIME,
    Transportation_Status ENUM('Active', 'Delayed', 'Cancelled', 'In Transit', 'Completed'),
    Driver VARCHAR(20),
    MaxPassengers INT
);
CREATE TABLE Station_In_Transportation (
    TransportationID INT,
    StationID INT,
    Station_Status ENUM('Active', 'Delayed', 'Cancelled'),
    Station_Type ENUM('Starting', 'Destination', 'Intermediate'), 
    PRIMARY KEY (TransportationID, StationID),
    FOREIGN KEY (TransportationID) REFERENCES Transportation(TransportationID),
    FOREIGN KEY (StationID) REFERENCES Station(StationID)
);
CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(20),
    UserPassword VARCHAR(20),
    UserPhone VARCHAR(10),
    UserPermission ENUM('Driver', 'Manager', 'Passenger'),
    UserEmail VARCHAR(25)
);
CREATE TABLE Registrations_To_Transportation (
    UserID INT,
    TransportationID INT,
    PickupStationID INT,
    DropoffStationID INT,
    ExecutionDate DATETIME,
    Registrations_Status ENUM('Pending', 'Confirmed', 'Cancelled', 'Completed', 'Waiting List', 'In Transit'),
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
    GeneralMessage_Status ENUM('Sent', 'Delivered', 'Pending', 'Failed', 'Archived', 'Not Delivered', 'Deleted'),
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

ALTER TABLE Transportation
DROP COLUMN Driver;
ALTER TABLE Transportation

ADD COLUMN DriverID INT,
ADD CONSTRAINT FK_Driver
FOREIGN KEY (DriverID) REFERENCES Users(UserID);


-- ALTER TABLE Message_To_Transportation
-- ADD CONSTRAINT Check_Sender_Permission_Message
-- CHECK (SenderID IN (
--     SELECT UserID
--     FROM Users
--     WHERE UserPermission IN ('Driver', 'Manager')
-- ));

-- ALTER TABLE General_Message
-- ADD CONSTRAINT Check_Sender_Permission_General
-- CHECK (SenderID IN (
--     SELECT UserID
--     FROM Users
--     WHERE UserPermission = 'Manager'
-- ));








