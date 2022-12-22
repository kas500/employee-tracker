const dataFromDb = require("./js/queries");
const cTable = require('console.table');
const inquirer = require('inquirer');
const {questions} = require('./js/helper');
const Department = require('./lib/Deparment');

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
            default:
                break;
        }
            })
}

init();


async function viewAllEmployees(){
    const employees = await dataFromDb.getAllEmployees();
    console.table(employees);
    init();
}

async function viewAllDepartments(){
    const departments = await dataFromDb.getAllDepartments();
    console.table(departments);
    init();
}

async function viewAllRoles(){
    const roles = await dataFromDb.getAllDepartments();
    console.table(roles);
    init();
}

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


