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
        return await this.db.query('select role.id, title, salary, department.name as department from role inner join department on department.id = role.department_id;');
    }

    //insert to department
    async insertToDepartment(department){
        return await this.db.query(`insert into department (name) values ("${department.getName()}")`);
    }

    //insert to role
    async insertToRole(role){
        return  await this.db.query(`insert into role (title, salary, department_id) values ("${role.getTitle()}","${role.getSalary()}","${role.getDepartmentId()}")`);
    }

}   

module.exports = new QueryFrom(db);
