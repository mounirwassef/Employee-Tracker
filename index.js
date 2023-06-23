const inquirer = require('inquirer');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employees_db'
});

connection.connect(); // Establish the MySQL connection

WhatDo();

function WhatDo() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'What would you like to do?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'Update employee managers',
                    'View employees by manager',
                    'View employees by department',
                    'Delete department',
                    'Delete role',
                    'Delete employee',
                    'View the total utilized budget of a department',
                    'Exit'
                ]
            }
        ])
        .then((answer) => {
            switch (answer.choice) {
                case 'View all departments':
                    viewAllDepartments();
                    break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                case 'View all employees':
                    viewAllEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateEmployeeRole();
                    break;
                case 'Update employee managers':
                    updateEmployeeMana();
                    break;
                case 'View employees by manager':
                    viewEmployeeByMana();
                    break;
                case 'View employees by department':
                    viewEmployeeByDepa();
                    break;
                case 'Delete department':
                    deleteDepartment();
                    break;
                case 'Delete role':
                    deleteRole();
                    break;
                case 'Delete employee':
                    deleteEmployee();
                    break;
                case 'View the total utilized budget of a department':
                    viewTheBudget();
                    break
                case 'Exit':
                    quit();
                    break;
            }
        });
}

function viewAllDepartments() {
    const request = 'SELECT * FROM department';
    connection.query(request, function (err, res) {
        if (err) throw err;
        console.log('Departments:');
        console.table(res);
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'newChoice',
                    message: 'Select a new option',
                    choices: ['Main Menu', 'Quit']
                }
            ])
            .then((answer) => {
                switch (answer.newChoice) {
                    case 'Main Menu':
                        WhatDo();
                        break;
                    case 'Quit':
                        quit();
                        break;
                }
            });
    });
}

function viewAllRoles() {
    const request = 'SELECT a.*,b.name as department_name FROM role a,department b where a.department_id=b.id';
    connection.query(request, function (err, res) {
        if (err) throw err;
        console.log('roles:');
        console.table(res);
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'newChoice',
                    message: 'Select a new option',
                    choices: ['Main Menu', 'Quit']
                }
            ])
            .then((answer) => {
                switch (answer.newChoice) {
                    case 'Main Menu':
                        WhatDo();
                        break;
                    case 'Quit':
                        quit();
                        break;
                }
            });
    });
}

function viewAllEmployees() {
    const request = 'select a.*,b.title,b.salary,c.name as department_name from employee a,role b,department c where a.role_id = b.id and b.department_id = c.id';
    connection.query(request, function (err, res) {
        if (err) throw err;
        console.log('employees:');
        console.table(res);
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'newChoice',
                    message: 'Select a new option',
                    choices: ['Main Menu', 'Quit']
                }
            ])
            .then((answer) => {
                switch (answer.newChoice) {
                    case 'Main Menu':
                        WhatDo();
                        break;
                    case 'Quit':
                        quit();
                        break;
                }
            });
    });
}

function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Enter the new department name:',
                name: 'name'
            }
        ])
        .then(function (response) {
            connection.query('INSERT INTO department (name) VALUES (?)', [response.name], function (
                err,
                res
            ) {
                if (err) throw err;
                console.log('Department added successfully!');
                inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'newChoice',
                            message: 'Select a new option:',
                            choices: ['Main Menu', 'Quit']
                        }
                    ])
                    .then((answer) => {
                        switch (answer.newChoice) {
                            case 'Main Menu':
                                WhatDo();
                                break;
                            case 'Quit':
                                quit();
                                break;
                        }
                    });
            });
        });
}

function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Enter the new title:',
                name: 'title'
            },
            {
                type: 'input',
                message: 'Enter the salary:',
                name: 'salary'
            },
            {
                type: 'input',
                message: 'Enter the department_id:',
                name: 'departmentId'
            }
        ])
        .then(function (response) {
            connection.query('INSERT INTO role (title,salary,department_id) VALUES (?,?,?)', [response.title, response.salary, response.departmentId], function (
                err,
                res
            ) {
                if (err) throw err;
                console.log('role added successfully!');
                inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'newChoice',
                            message: 'Select a new option:',
                            choices: ['Main Menu', 'Quit']
                        }
                    ])
                    .then((answer) => {
                        switch (answer.newChoice) {
                            case 'Main Menu':
                                WhatDo();
                                break;
                            case 'Quit':
                                quit();
                                break;
                        }
                    });
            });
        });
}

function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Enter first name:',
                name: 'firstName'
            },
            {
                type: 'input',
                message: 'Enter last name:',
                name: 'lastName'
            },
            {
                type: 'input',
                message: 'Enter the role id:',
                name: 'roleID'
            },
            {
                type: 'input',
                message: 'Enter the manager id:',
                name: 'managerID'
            },
        ])
        .then(function (response) {
            connection.query('INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)',
                [response.firstName, response.lastName, response.roleID, response.managerID], function (
                    err,
                    res
                ) {
                if (err) throw err;
                console.log('employee added successfully!');
                inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'newChoice',
                            message: 'Select a new option:',
                            choices: ['Main Menu', 'Quit']
                        }
                    ])
                    .then((answer) => {
                        switch (answer.newChoice) {
                            case 'Main Menu':
                                WhatDo();
                                break;
                            case 'Quit':
                                quit();
                                break;
                        }
                    });
            });
        });
}

function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Enter the new role_id',
                name: 'roleID'
            },
            {
                type: 'input',
                message: 'Enter the employee_id',
                name: 'employeeID'
            }
        ])
        .then(function (response) {
            connection.query('UPDATE employee set role_id = (?) where id = (?)', [response.roleID, response.employeeID], function (
                err,
                res
            ) {
                if (err) throw err;
                console.log('role updated !');
                inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'newChoice',
                            message: 'Select a new option:',
                            choices: ['Main Menu', 'Quit']
                        }
                    ])
                    .then((answer) => {
                        switch (answer.newChoice) {
                            case 'Main Menu':
                                WhatDo();
                                break;
                            case 'Quit':
                                quit();
                                break;
                        }
                    });
            });
        });
}

function updateEmployeeMana() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Enter the new manager_id',
                name: 'managerID'
            },
            {
                type: 'input',
                message: 'Enter the employee_id',
                name: 'employeeID'
            }
        ])
        .then(function (response) {
            connection.query('UPDATE employee set manager_id = (?) where id = (?)', [response.managerID, response.employeeID], function (
                err,
                res
            ) {
                if (err) throw err;
                console.log('manager updated !');
                inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'newChoice',
                            message: 'Select a new option:',
                            choices: ['Main Menu', 'Quit']
                        }
                    ])
                    .then((answer) => {
                        switch (answer.newChoice) {
                            case 'Main Menu':
                                WhatDo();
                                break;
                            case 'Quit':
                                quit();
                                break;
                        }
                    });
            });
        });
}

function viewEmployeeByMana() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Enter the manager_id',
                name: 'managerIDne'
            }
        ])
        .then(function (response) {
            const request = 'SELECT a.*, b.title, b.salary, b.department_id, c.name AS department_name FROM employee a, role b, department c WHERE a.role_id = b.id AND b.department_id = c.id AND a.manager_id= ?';
            connection.query(request, [response.managerIDne], function (err, res) {
                if (err) throw err;
                console.log('employees:');
                console.table(res);

                inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'newChoice',
                            message: 'Select a new option:',
                            choices: ['Main Menu', 'Quit']
                        }
                    ])
                    .then((answer) => {
                        switch (answer.newChoice) {
                            case 'Main Menu':
                                WhatDo();
                                break;
                            case 'Quit':
                                quit();
                                break;
                        }
                    });
            });
        });
}

function viewEmployeeByDepa() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Enter the department_id',
                name: 'departmentID'
            }
        ])
        .then(function (response) {
            const request = 'SELECT a.*, b.title, b.salary, b.department_id, c.name AS department_name FROM employee a, role b, department c WHERE a.role_id = b.id AND b.department_id = c.id AND b.department_id = ?';
            connection.query(request, [response.departmentID], function (err, res) {
                if (err) throw err;
                console.log('employees:');
                console.table(res);

                inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'newChoice',
                            message: 'Select a new option:',
                            choices: ['Main Menu', 'Quit']
                        }
                    ])
                    .then((answer) => {
                        switch (answer.newChoice) {
                            case 'Main Menu':
                                WhatDo();
                                break;
                            case 'Quit':
                                quit();
                                break;
                        }
                    });
            });
        });
}

function deleteDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Enter the new department id:',
                name: 'departmentID'
            }
        ])
        .then(function (response) {
            connection.query('DELETE FROM department WHERE id = (?)', [response.departmentID], function (
                err,
                res
            ) {
                if (err) throw err;
                console.log('Department deleted!');
                inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'newChoice',
                            message: 'Select a new option:',
                            choices: ['Main Menu', 'Quit']
                        }
                    ])
                    .then((answer) => {
                        switch (answer.newChoice) {
                            case 'Main Menu':
                                WhatDo();
                                break;
                            case 'Quit':
                                quit();
                                break;
                        }
                    });
            });
        });
}

function deleteRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Enter the role id',
                name: 'roleID'
            }
        ])
        .then(function (response) {
            connection.query('DELETE FROM role WHERE id = (?)', [response.roleID], function (
                err,
                res
            ) {
                if (err) throw err;
                console.log('role deleted');
                inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'newChoice',
                            message: 'Select a new option:',
                            choices: ['Main Menu', 'Quit']
                        }
                    ])
                    .then((answer) => {
                        switch (answer.newChoice) {
                            case 'Main Menu':
                                WhatDo();
                                break;
                            case 'Quit':
                                quit();
                                break;
                        }
                    });
            });
        });
}

function deleteEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Enter the new employee id',
                name: 'employeeid'
            }
        ])
        .then(function (response) {
            connection.query('DELETE FROM employee WHERE id = (?)', [response.employeeid], function (
                err,
                res
            ) {
                if (err) throw err;
                console.log('employee deleted');
                inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'newChoice',
                            message: 'Select a new option:',
                            choices: ['Main Menu', 'Quit']
                        }
                    ])
                    .then((answer) => {
                        switch (answer.newChoice) {
                            case 'Main Menu':
                                WhatDo();
                                break;
                            case 'Quit':
                                quit();
                                break;
                        }
                    });
            });
        });
}

function viewTheBudget() {
    const request = 'SELECT SUM(b.salary) as sum_salary, c.name AS department_name FROM employee a, role b, department c WHERE a.role_id = b.id AND b.department_id = c.id GROUP BY c.name;';
    connection.query(request, function (err, res) {
        if (err) throw err;
        console.log('salary sum:');
        console.table(res);
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'newChoice',
                    message: 'Select a new option',
                    choices: ['Main Menu', 'Quit']
                }
            ])
            .then((answer) => {
                switch (answer.newChoice) {
                    case 'Main Menu':
                        WhatDo();
                        break;
                    case 'Quit':
                        quit();
                        break;
                }
            });
    });
}

function quit() {
    process.exit();
}