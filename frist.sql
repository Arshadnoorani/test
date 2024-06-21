-- use airline_management
-- CREATE TABLE airlines (
--     airlines_id INT(11) NOT NULL AUTO_INCREMENT,
--     airlines_at_id INT(11) NOT NULL,
--     airlines_name VARCHAR(255) NOT NULL,
--     airlines_no VARCHAR(255) NOT NULL,
--     airlines_from INT(11) NOT NULL,
--     airlines_departure VARCHAR(255) NOT NULL,
--     airlines_to INT(11) NOT NULL,
--     airlines_arrival VARCHAR(255) NOT NULL,
--     airlines_travel_time VARCHAR(255) NOT NULL,
--     airlines_total_distance INT(11) NOT NULL,
--     PRIMARY KEY (airlines_id)
-- ) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- CREATE TABLE airlines_type (
--     at_id INT(11) NOT NULL AUTO_INCREMENT,
--     at_name VARCHAR(255) NOT NULL,
--     PRIMARY KEY (at_id)
-- ) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- CREATE TABLE booking (
--     booking_id INT(11) NOT NULL AUTO_INCREMENT,
--     booking_user_id VARCHAR(255) NOT NULL,
--     booking_route_id VARCHAR(255) NOT NULL,
--     booking_date VARCHAR(255) NOT NULL,
--     booking_total_fare VARCHAR(255) NOT NULL,
--     booking_journey_date VARCHAR(255) NOT NULL,
--     booking_seat_type VARCHAR(255) NOT NULL,
--     booking_status VARCHAR(255) NOT NULL DEFAULT '8',
--     PRIMARY KEY (booking_id)
-- ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- CREATE TABLE city (
--     city_id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
--     city_name VARCHAR(45) NOT NULL,
--     PRIMARY KEY (city_id)
-- ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- select * from booking

-- CREATE TABLE passenger (
--     passenger_id INT(11) NOT NULL AUTO_INCREMENT,
--     passenger_booking_id VARCHAR(255) NOT NULL,
--     passenger_type VARCHAR(255) NOT NULL,
--     passenger_name VARCHAR(255) NOT NULL,
--     passenger_gender VARCHAR(255) NOT NULL,
--     passenger_age VARCHAR(255) NOT NULL,
--     passenger_seat_no VARCHAR(255) NOT NULL,
--     PRIMARY KEY (passenger_id)
-- ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- CREATE TABLE route (
--     route_id INT(11) NOT NULL AUTO_INCREMENT,
--     route_airlines_id VARCHAR(255) NOT NULL,
--     route_from_city VARCHAR(255) NOT NULL,
--     route_from_arrival VARCHAR(255) NOT NULL,
--     route_from_departure VARCHAR(255) NOT NULL,
--     route_to_city VARCHAR(255) NOT NULL,
--     route_economy_fare VARCHAR(255) NOT NULL,
--     route_business_fare VARCHAR(255) NOT NULL,
--     PRIMARY KEY (route_id)
-- ) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- Auto Increment for Tables

-- ALTER TABLE airlines
-- ADD PRIMARY KEY (airlines_id);

-- ALTER TABLE airlines
-- MODIFY airlines_id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

-- ALTER TABLE airlines_type
-- MODIFY at_id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

-- ALTER TABLE booking
-- MODIFY booking_id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

-- ALTER TABLE city
-- MODIFY city_id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

-- ALTER TABLE passenger
-- MODIFY passenger_id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

-- ALTER TABLE route
-- MODIFY route_id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

-- SQL Statements
-- SELECT COUNT(*) AS 'Total Count' FROM airlines;

-- SELECT MAX(airlines_total_distance) AS 'Maximum Travel Distance' FROM airlines;

-- SELECT MIN(airlines_total_distance) AS 'Minimum Travel Distance' FROM airlines;

-- SELECT AVG(airlines_total_distance) AS 'Average Travel Distance' FROM airlines;

-- SELECT UCASE(airlines_name) FROM airlines;

-- SELECT LCASE(airlines_name) FROM airlines;

-- SELECT CONCAT(airlines_name, ', ', airlines_no) FROM airlines;

-- SELECT TRIM(airlines_name) FROM airlines;

-- SELECT SUBSTR(airlines_name, 1, 3) FROM airlines;

-- SELECT REVERSE(airlines_name) FROM airlines;

-- Use of SELECT FROM WHERE GROUP
-- error in below code below 6 line  
	-- SELECT COUNT(*) as "TotalCount", airlines_at_id FROM airlines
-- 	WHERE airlines_from = 2
-- 	GROUP BY airlines_at_id
-- 	HAVING TotalCount > 3
-- 	ORDER BY airlines_name
-- 	LIMIT 0, 3;

-- select * from airlines

-- Join Operations
-- inner join
-- SELECT * FROM airlines
-- INNER JOIN route ON airlines.airlines_id = route.route_airlines_id;

-- Left Join Example
-- SELECT * FROM airlines
-- LEFT JOIN route ON airlines.airlines_id = route.route_airlines_id;

-- Right Join Example
-- SELECT * FROM airlines
-- RIGHT JOIN route ON airlines.airlines_id = route.route_airlines_id;

-- Cross Join Example
-- SELECT * FROM airlines
-- CROSS JOIN route;

-- Full Join Example (Note: MySQL does not support FULL JOIN directly)
-- SELECT * FROM airlines
-- LEFT JOIN route ON airlines.airlines_id = route.route_airlines_id
-- UNION
-- SELECT * FROM airlines
-- RIGHT JOIN route ON airlines.airlines_id = route.route_airlines_id;

-- Subqueries
-- SELECT * FROM airlines
-- WHERE airlines_id IN (SELECT route_airlines_id FROM route);

-- Create User Admin with All Permissions
-- CREATE USER 'admin'@'localhost' IDENTIFIED BY 'test';
-- FLUSH PRIVILEGES;
-- GRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost';

-- Create User Tester with SELECT, UPDATE, INSERT Permissions
-- CREATE USER 'tester'@'localhost' IDENTIFIED BY 'test';
-- GRANT SELECT, UPDATE, INSERT ON airlines_reservation_system_dbms.* TO 'tester'@'localhost';
-- FLUSH PRIVILEGES;
-- REVOKE DELETE ON airlines_reservation_system_dbms.* FROM 'tester'@'localhost';

-- Create User Developer with SELECT, UPDATE, INSERT, DELETE, CREATE, ALTER Permissions
-- CREATE USER 'developer'@'localhost' IDENTIFIED BY 'test';
-- GRANT SELECT, UPDATE, INSERT, DELETE, CREATE, ALTER ON airlines_reservation_system_dbms.* TO 'developer'@'localhost';
-- FLUSH PRIVILEGES;

-- Create User User with SELECT Permission
-- CREATE USER 'user'@'localhost' IDENTIFIED BY 'test';
-- GRANT SELECT ON airlines_reservation_system_dbms.* TO 'user'@'localhost';
-- FLUSH PRIVILEGES;

-- Drop All Users 
-- DROP USER 'admin'@'localhost';
-- DROP USER 'tester'@'localhost';
-- DROP USER 'developer'@'localhost';
-- DROP USER 'user'@'localhost';

-- Stored Procedure for Getting Airlines Details
-- DELIMITER //
-- CREATE PROCEDURE get_all_airlines (IN id CHAR(20))
-- BEGIN
--     SELECT * FROM airlines WHERE airlines_id = id;
-- END //
-- DELIMITER ;
-- CALL get_all_airlines(2);

-- Stored Procedure for Getting Booking Details of Airlines
-- DELIMITER //
-- CREATE PROCEDURE get_all_airlines_booking (IN id CHAR(20))
-- BEGIN
--     SELECT * FROM airlines, booking, route 
--     WHERE route_id = booking_route_id 
--     AND route_airlines_id = airlines_id 
--     AND airlines_id = id;
-- END //
-- DELIMITER ;
-- CALL get_all_airlines_booking(2);

-- Transaction Management
-- Commit Example
-- START TRANSACTION;
-- UPDATE airlines SET airlines_total_distance = 9000 WHERE 1;
-- COMMIT;

-- Rollback Example
-- START TRANSACTION;
-- UPDATE airlines SET airlines_total_distance = 7000 WHERE 1;
-- ROLLBACK;

-- Trigger for Insert Statement
-- DELIMITER $$
-- CREATE TRIGGER insert_booking AFTER INSERT ON booking
-- FOR EACH ROW
-- BEGIN
--     INSERT INTO latest_booking
--     SET lb_booking_id = NEW.booking_id,
--         lb_date = NOW(),
--         lb_action = 'Booking Details Inserted';
-- END $$
-- DELIMITER ;

-- Trigger for Delete Statement
-- DELIMITER $$
-- CREATE TRIGGER delete_airlines BEFORE DELETE ON airlines
-- FOR EACH ROW
-- BEGIN
--     DELETE FROM route WHERE route_airlines_id = OLD.airlines_id;
-- END $$
-- DELIMITER ;

-- Trigger for Update Statement
-- DELIMITER $$
-- CREATE TRIGGER update_booking AFTER UPDATE ON booking
-- FOR EACH ROW
-- BEGIN
--     UPDATE latest_booking
--     SET lb_booking_id = NEW.booking_id,
--         lb_date = NOW(),
--         lb_action = 'Booking Details Updated';
-- END $$
-- DELIMITER ;

-- View 1: Get All Airlines
-- CREATE VIEW get_all_airlines AS
-- SELECT * FROM airlines;

-- View 2: Get All Airlines with Routes
-- CREATE VIEW get_all_airlines_route AS
-- SELECT * FROM airlines
-- LEFT JOIN route ON airlines.airlines_id = route.route_airlines_id;

-- View 3: Get All Airlines with Bookings
-- CREATE VIEW get_all_airlines_bookings AS
-- SELECT * FROM airlines, booking, route
-- WHERE route_id = booking_route_id
-- AND route_airlines_id = airlines_id;
