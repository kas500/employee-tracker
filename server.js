const dataFromDb = require("./js/queries");
const cTable = require('console.table');
const inquirer = require('inquirer');
const {questions} = require('./js/helper');
const Department = require('./lib/Deparment');
const Role = require('./lib/Role');
const Employee = require("./lib/Employee");
const { asyncScheduler } = require("rxjs");
const { updateEmployeeManager, deleteDepartmentById } = require("./js/queries");

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
                          questions[17],
                          questions[18],
                          questions[19],
                          questions[20],
                          questions[21],
                          questions[22],
                          questions[8],]
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
            case questions[7]:
                return updateEmployeeRole();  
            case questions[17]:
                return updateManager();  
            case questions[18]:
                return viewEmployeesByManager();      
            case questions[19]:
                return viewEmployeesByDepartment();   
            case questions[20]:
                return removeDepartmentById();
            case questions[21]:
                return removeRoleById();  
            case questions[22]:
                return removeEmployeeById();      
            case questions[8]:
                console.clear();
                process.exit();         
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
    const departments =  await dataFromDb.getAllDepartments();
    const departmentsOptions = departments.map(({ id, name }) => ({ name: name, value: id }));
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
    const managersOptions = managers.map(({ id, name }) => ({ name: name, value: id }));
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

//update employee role
async function updateEmployeeRole(){
    const employees = await dataFromDb.getListOfEmployeesNames();
    const employeesOptions = employees.map(({ id, name }) => ({ name: name, value: id }));
    const roles = await dataFromDb.getAllRoles();
    rolesOptions = roles.map(({ id, title }) => ({ name: title, value: id }));
    inquirer.prompt(
        [
            {   
                type: 'list',
                message: "Which employee's role you want to update?",
                name: 'employeeId',
                choices: employeesOptions,
            },
            {   
                type: 'list',
                message: "Which role do you want to assign to the selected employee?",
                name: 'roleId',
                choices: rolesOptions,
            },
        ]
    )
    .then(answers =>{
        dataFromDb.updateRoleForEmployee(answers.employeeId,answers.roleId);
        init();
    }
        )
}

//update employee manager
async function updateManager(){
    const employees = await dataFromDb.getListOfEmployeesNames();
    const employeesOptions = employees.map(({ id, name }) => ({ name: name, value: id }));
    const managers = await dataFromDb.getAllManagers();
    managers.push({id:null,name:"None"});
    const managersOptions = managers.map(({ id, name }) => ({ name: name, value: id }));
    inquirer.prompt(
        [
            {   
                type: 'list',
                message: "Which employee's manager you want to update?",
                name: 'employeeId',
                choices: employeesOptions,
            },
            {   
                type: 'list',
                message: "What manager name do you want to assign to the selected employee?",
                name: 'managerId',
                choices: managersOptions,
            },
        ]
    )
    .then(answers =>{
        dataFromDb.updateEmployeeManager(answers.employeeId,answers.managerId);
        init();
    }
        )


}
//view employees by manager
async function viewEmployeesByManager() {
    const managers = await dataFromDb.getAllManagers();
    managers.push({id:null,name:"None"});
    const managersOptions = managers.map(({ id, name }) => ({ name: name, value: id }));
    inquirer.prompt(
        [
            {   
                type: 'list',
                message: "Select the manager",
                name: 'managerId',
                choices: managersOptions,
            },
        ]
    )
    .then(async answers =>{
        const employees = await dataFromDb.selectEmployeesByManager(answers.managerId);
        console.table(await employees);
        init();
    }
        )
}

async function viewEmployeesByDepartment(){
    const departments =  await dataFromDb.getAllDepartments();
    const departmentsOptions = departments.map(({ id, name }) => ({ name: name, value: id }));
    inquirer.prompt(
        [
            {   
                type: 'list',
                message: "Select the department",
                name: 'departmentId',
                choices: departmentsOptions,
            },
        ]
    )
    .then(async answers =>{
        const employees = await dataFromDb.selectEmployeesByDepartment(answers.departmentId);
        console.table(await employees);
        init();
    }
        )
}

//delete department by id
async function removeDepartmentById() {
    const departments =  await dataFromDb.getAllDepartments();
    const departmentsOptions = departments.map(({ id, name }) => ({ name: name, value: id }));
    inquirer.prompt(
        [
            {   
                type: 'list',
                message: "Select the department",
                name: 'departmentId',
                choices: departmentsOptions,
            },
        ]
    )
    .then(async answers =>{
        await dataFromDb.deleteDepartmentById(answers.departmentId);
        init();
    }
        )
}

//delete role by id
async function removeRoleById() {
    const roles = await dataFromDb.getAllRoles();
    rolesOptions = roles.map(({ id, title }) => ({ name: title, value: id }));
    inquirer.prompt(
        [
            {   
                type: 'list',
                message: "Select the role",
                name: 'roleId',
                choices: rolesOptions,
            },
        ]
    )
    .then(async answers =>{
        await dataFromDb.deleteRoleById(answers.roleId);
        init();
    }
        )
}

//delete employee by id
async function removeEmployeeById() {
    const employees = await dataFromDb.getListOfEmployeesNames();
    const employeesOptions = employees.map(({ id, name }) => ({ name: name, value: id }));
    inquirer.prompt(
        [
            {   
                type: 'list',
                message: "Select the employee",
                name: 'employeeId',
                choices: employeesOptions,
            },
        ]
    )
    .then(async answers =>{
        await dataFromDb.deleteEmployeeById(answers.employeeId);
        init();
    }
        )
}