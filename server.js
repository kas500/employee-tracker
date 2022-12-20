const inquirer = require('inquirer');
const fs = require('fs');
const cTable = require('console.table');
const {questions} = require('./js/helper');
const {db} = require('./js/connection');
const { clear } = require('console');
const Department = require('./lib/Deparment');
const Role = require('./lib/Role');

const departments = "./db/allDepartments.sql";
const roles = "./db/allRoles.sql";
const employees = "./db/allEmployees.sql"

//retrieve data from a table
async function getAllDataFrom(source){
    fs.readFile(source, 'utf8', function (err, data) {
        db.query(data, async function (err, results) {
            console.log("\n");
            //console.log(results);
            console.log(cTable.getTable(results));
            console.log("\n");
            await questionsHandler();
        });
    });
}

//add department
async function addDepartment(department){
        console.log(department.getName());
        db.query(`insert into department (name) values ("${department.getName()}");`, async function (err, results) {
            console.log("Department added");
        });
}

//

// function handles questions
async function questionsHandler(){
    await inquirer.prompt(
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

    ).then(async (answers)=>{
        if (answers.option !=="Quit") {
            switch (answers.option) {
                case questions[1]:
                    await getAllDataFrom(departments);
                    await questionsHandler();
                    break;
                case questions[2]:
                    await getAllDataFrom(roles);
                    await questionsHandler(); 
                    break;
                case questions[3]:
                    await getAllDataFrom(employees);
                    await questionsHandler(); 
                    break;
                case questions[4]:
                    await inquirer.prompt(
                        [
                            {
                                type: 'input',
                                message: questions[9],
                                name: 'depName'
                            }, 
                        ]
                    )
                    .then(async (answers)=>{
                        const dep = new Department(answers.depName);
                        await addDepartment(dep);
                        await questionsHandler();
                    })
                    break;    
                default:
                    break;
            }
            
        }
        
        console.clear();
        
        process.exit(); 
        
    });
}

async function init(){
    await questionsHandler();
}

init();