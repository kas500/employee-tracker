INSERT INTO department (name)
VALUES ("Dev"),
       ("QA"),
       ("HR"),
       ("Payroll"),
       ("Sales");

INSERT INTO role (title, salary,department_id)
VALUES ("Senior developer", 200000.00,1),
       ("Junior developer", 100000.00,1),
       ("Dev manager",210000.00,1),
       ("Senior QA Analist", 150000.00,2),
       ("Junior QA Engineer", 80000.00,2),
       ("QA manager", 160000.00,2),
       ("HR manager", 100000.00,3),
       ("HR specialist", 80000.00,3),
       ("Accountant",150000.00,4),
       ("Sales manager",200000.00,5),
       ("Sales specialist", 100000.00,5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Steve","Smith", 3, NULL),
       ("Anton","Krasnikov",1,1),
       ("Krissie","Bueno",2,1),
       ("Drew", "Young",2,1),
       ("Emilly", "Nots",6, NULL),
       ("Nick", "Frost",4,5),
       ("Richard","Lee",5,5),
       ("Jim", "Gross",7, NULL),
       ("Leandra","Gonzales",8,8),
       ("Wim","Hoff",9, NULL),
       ("Ben","Johnson",10, NULL),
       ("Bruce","Willis",11,10);

     