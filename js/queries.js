const db = require("./connection");

class Query{
    constructor(db){
        this.db = db;
    }

    //get all employees
    getAllEmployees(){
        return this.db.query("select * from employee");
    }
}