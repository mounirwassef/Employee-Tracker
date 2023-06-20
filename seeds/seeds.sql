INSERT INTO department (name) VALUES ('Sales'), ('Marketing'), ('Finance'), ('Human Resources'), ('Research and Development');

INSERT INTO role (title, salary, department_id) VALUES 
('Manager', 50000.00, 1),
('Engineer', 60000.00, 2),
('Analyst', 45000.00, 3),
('Sales Representative', 40000.00, 1),
 ('Administrator', 55000.00, 2);


 INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Smith', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Michael', 'Johnson', 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Emily', 'Williams', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('David', 'Brown', 4, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Sarah', 'Miller', 3, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Robert', 'Jones', 1, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jennifer', 'Davis', 2, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Daniel', 'Wilson', 4, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Olivia', 'Anderson', 3, 4);

