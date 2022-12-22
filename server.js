const dataFromDb = require("./js/queries");
const cTable = require('console.table');
const inquirer = require('inquirer');
const {questions} = require('./js/helper');
const Department = require('./lib/Deparment');
const Role = require('./lib/Role');
const Employee = require("./lib/Employee");

async function init() {
    inquirer.prompt(
        [
            {
                type: 'list',
                message: questions[0],
                name: 'option',
                choices: [questions[1],
                          questions[2],
                          questions[3],
                          questions[4],
                          questions[5],
                          questions[6],
                          questions[7],
                          questions[8]]
            }
        ]
    )
    .then((answers)=>{
        switch (answers.option) {
            case questions[1]:
                return viewAllDepartments();
            case questions[2]:
                return  viewAllRoles();
            case questions[3]:
                return viewAllEmployees();
            case questions[4]:
                return addDepartment();    
            case questions[5]:
                return addRole();    
            case questions[6]:
                return addEmployee();      
            default:
                break;
        }
            })
}

init();

//view employees
async function viewAllEmployees(){
    const employees = await dataFromDb.getAllEmployees();
    console.table(employees);
    init();
}

//view deps
async function viewAllDepartments(){
    const departments = await dataFromDb.getAllDepartments();
    console.table(departments);
    init();
}

//view roles
async function viewAllRoles(){
    const roles = await dataFromDb.getAllRoles();
    console.table(roles);
    init();
}

//add dep
async function addDepartment(){
    inquirer.prompt(
        [
            {
                type: 'input',
                message: questions[9],
                name: 'departmentName',
            }
        ]
    )
    .then(answer =>{
        dataFromDb.insertToDepartment(new Department(answer.departmentName));
        init();
    })

}
//add role
async function addRole(){
    let departments =  await dataFromDb.getAllDepartments();
    departmentsOptions = departments.map(({ id, name }) => ({ name: name, value: id }));
    inquirer.prompt(
        [
            {
                type: 'input',
                message: questions[10],
                name: 'title',
            },
            {
                type: 'input',
                message: questions[11],
                name: 'salary',
            },
            {
                type: 'list',
                message: questions[12],
                name: 'depId',
                choices: departmentsOptions,
            }
        ]
    )
    .then(answer =>{
        dataFromDb.insertToRole(new Role(answer.title, answer.salary, answer.depId))
        init();
    })
}

//add employee
async function addEmployee(){
    const managers = await dataFromDb.getAllManagers();
    managers.push({id:null,name:"None"});
    managersOptions = managers.map(({ id, name }) => ({ name: name, value: id }));
    const roles = await dataFromDb.getAllRoles();
    rolesOptions = roles.map(({ id, title }) => ({ name: title, value: id }));
    inquirer.prompt(
        [
            {
                type: 'input',
                message: questions[13],
                name: 'first_name',
            },
            {
                type: 'input',
                message: questions[14],
                name: 'last_name',
            },
            {
                type: 'list',
                message: questions[15],
                name: 'role_id',
                choices: rolesOptions,
            },
            {
                type: 'list',
                message: questions[16],
                name: 'manager_id',
                choices: managersOptions,
            },
        ]
    )
    .then(answers =>{
        dataFromDb.insertToEmployee(new Employee(answers.first_name,answers.last_name,answers.role_id, answers.manager_id));
        init();
    })
}


