

select a.*,b.title,b.salary,c.name as department_name 
from employee a,role b,department c 
where a.role_id = b.id and b.department_id = c.id;


SELECT SUM(b.salary) as sum_salary, c.name AS department_name FROM employee a, role b, department c WHERE a.role_id = b.id AND b.department_id = c.id GROUP BY c.name;