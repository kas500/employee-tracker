const { connectable } = require("rxjs");
const {db} = require("./connection");

class QueryFrom{
    constructor(db){
        this.db = db;
    }

    //get all employees
    async getAllEmployees(){
        return await this.db.query(
        `select a.id,
        a.first_name,
        a.last_name,
        title,
        department.name as department,
        salary,
        concat(b.first_name, ' ',b.last_name) as manager
        from employee a
        left join employee b on b.id = a.manager_id
        inner join role on role.id = a.role_id
        join department on department.id = role.department_id;`);
    }

    //get all departments
    async getAllDepartments(){
        return await this.db.query('select * from department;')
    }

    //get all roles
    async getAllRoles(){
        return await this.db.query('select * from role;');
    }

}   

module.exports = new QueryFrom(db);
