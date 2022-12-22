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
        return  await this.db.query(
        `insert into role (title, salary, department_id) 
        values ("${role.getTitle()}","${role.getSalary()}","${role.getDepartmentId()}")`);
    }

    //insert to employee
    async insertToEmployee(employee){
        return await this.db.query(
        `insert into employee (first_name, last_name, role_id, manager_id)
        values ("${employee.getFirstName()}","${employee.getLastName()}","${employee.getRoleId()}",${(!null)?employee.getManagerId():NULL})`
        );
    }

    //select managers
    async getAllManagers(){
        return await this.db.query("select id, concat(first_name,' ',last_name) as name  from employee where manager_id is NULL ");
    }

    //select and concat all Employees (first and last name)
    async getListOfEmployeesNames(){
        return await this.db.query("select id, concat(first_name,' ',last_name) as name  from employee");
    }

    //update role for Employee
    async updateRoleForEmployee(employeeId,roleId){
        return await this.db.query(`update employee set role_id=${roleId} where employee.id=${employeeId}`);
    }

    //update employee manager
    async updateEmployeeManager(employeeId,managerId){
        return await this.db.query(`update employee set manager_id=${(!null)?managerId:NULL} where employee.id=${employeeId}`);
    }

    //select employees by manager
    async selectEmployeesByManager(managerId){
        return await this.db.query(`select employee.id, first_name, last_name from employee where manager_id=${(!null)?managerId:NULL}`);
    }

    //select employees by department
    async selectEmployeesByDepartment(departmentId){
        return await this.db.query(`
        select a.id,
        concat(a.first_name,' ',a.last_name) as name,
        title,
        department.name as department
        from employee a
        left join employee b on b.id = a.manager_id
        inner join role on role.id = a.role_id
        join department on department.id = role.department_id where department_id=${departmentId}`);
    }


}   

module.exports = new QueryFrom(db);
