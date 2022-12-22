const {db} = require("./connection");

class QueryFrom{
    constructor(db){
        this.db = db;
    }

    //get all employees
    getAllEmployees(){
        return this.db.query('select * from employee;', async function (err, results) {
            console.log(results);
        });
    }

    //get all departments
    getAllDepartments(){
        return this.db.query('select * from department;', async function (err, results) {
            console.log(results);
        });
    }

    //get all roles
    getAllRoles(){
        return this.db.query('select * from role;', async function (err, results) {
            console.log(results);
        });
    }

}   

module.exports = new QueryFrom(db);
