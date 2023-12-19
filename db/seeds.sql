
INSERT INTO department
(name)
VALUES
("Programming"),
('Sales'),
('HR'),
('Finance');


INSERT INTO role
(title, salary, department_id)
VALUES
("Programmer", 100000, 1),
('Salesperson', 75000, 2),
('Accountant', 125000, 3);


INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
("John", "Smith", 1, NULL);

INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
("Bob", "Smith", 1, 1);

INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
("Julia", "Jones", 3, 1);