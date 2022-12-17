select a.id,
       a.first_name,
       a.last_name,
       a.role_id,
       title,
       department.name as department,
       salary,
       concat(b.first_name, ' ',b.last_name) as manager
from employee a
left join employee b on b.id = a.manager_id
inner join role on role.id = a.role_id
join department on department.id = role.department_id;