CREATE DATABASE `employee_tracker_database`;

CREATE TABLE department (
id INT AUTO_INCREMENT,
name VARCHAR(30) NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE role (
id INT AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT NOT NULL,
PRIMARY KEY(id),
FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employee (
id INT AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT,
PRIMARY KEY(id),
FOREIGN KEY(role_id) REFERENCES role(id),
FOREIGN KEY(manager_id) REFERENCES employee(id)
);

INSERT INTO department(name)
VALUES ('Marketing'), ('Operations'), ('Accounting'), ('Scrum Team');

INSERT INTO role(title, salary, department_id)
VALUES ('Market Analyst', 65000 , 1),
('Marketing Intern', 35000 ,1),
('Marketing Manager', 110000 , 1),
('Social Media Specialist', 60000 ,1),
('Operations Manager',90000 ,2),
('Operations Analyst', 65000 , 2),
('Customer Service Rep', 40000 , 2),
('Accounting Manager', 85000 , 3),
('Junior Accountant', 45000 , 3),
('Product Owner', 75000 , 4),
('Scrum Master', 70000 , 4),
('Software Developer', 90000 , 4),
('Project Manager', 115000 , 4);




INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
('Lebron','James',1, null),
('Jim', 'Gaffigan', 2, 3),
('Kevin', 'Garnett', 3, null),
('Michael', 'Jordan', 4, null),
('Jimmy', 'Fallon', 5, null),
('Steve', 'Harvey', 6, null),
('Ellen', 'Degeneres', 7, 5),
('Taylor', 'Swift', 8, null),
('Mickey', 'Mouse', 9, 8),
('Jim', 'Carey', 10, 13), 
('Will', 'Ferrell', 11,null),
('Jennifer', 'Lopez', 12, null),
('Michelle', 'Obama', 13, null);