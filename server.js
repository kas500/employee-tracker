const fs = require('fs');
const cTable = require('console.table');
const {questions} = require('./js/helper');
const {db} = require('./js/connection');

const departments = "./db/allDepartments.sql";
const roles = "./db/allRoles.sql";
const employees = "./db/allEmployees.sql"

function getAllDataFrom(source){
    fs.readFile(source, 'utf8', function(err, data){
        db.query(data, function (err, results) {
            console.log(cTable.getTable(results));
        });  
    });
}

getAllDataFrom(employees);