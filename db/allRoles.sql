select role.id, title, department.name, salary from role 
inner join department ON role.department_id = department.id;