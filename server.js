const inquirer = require('inquirer');
const fs = require('fs');
const cTable = require('console.table');
const {questions} = require('./js/helper');
const {db} = require('./js/connection');

const departments = "./db/allDepartments.sql";
const roles = "./db/allRoles.sql";
const employees = "./db/allEmployees.sql"

//retrieve data from a table
async function getAllDataFrom(source){
    fs.readFile(source, 'utf8', function (err, data) {
        db.query(data, function (err, results) {
            console.log(cTable.getTable(results));
        });
    });
}

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
                    break;
                case questions[2]:
                    getAllDataFrom(roles);
                    break;
                case questions[3]:
                    getAllDataFrom(employees);
                    break;
                default:
                    break;
            }
            await questionsHandler(answers.option);   
        }
        
        console.clear();
        process.exit(); 
        
    });
}

async function init(){
    await questionsHandler();
}

init();