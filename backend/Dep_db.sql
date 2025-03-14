CREATE TABLE departments (
    dep_id INTEGER PRIMARY KEY,  
    dep_name VARCHAR(255) NOT NULL UNIQUE,
    loc VARCHAR(255) NOT NULL,
    contact VARCHAR(255) NOT NULL,
    descr TEXT,
    num_workers INT CHECK (num_workers >= 0), 
    resources TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE departments
ALTER COLUMN resources TYPE JSONB USING resources::JSONB;

ALTER TABLE departments
DROP COLUMN num_workers;

INSERT INTO departments (dep_id, dep_name, loc, contact, descr, resources)
VALUES 
(1001, 'Public Works Department', 'Kolkata', '033-23456789', 'Responsible for road construction and maintenance.', 
'{
    "machinery": {
        "Excavators": 10, 
        "Road Rollers": 5, 
        "Drilling Machines": 3
    }, 
    "worker": 4
}'),

(1002, 'Water Supply Department', 'Kolkata', '033-12345678', 'Manages water distribution and pipeline maintenance.', 
'{
    "machinery": {
        "Water Pumps": 20, 
        "Pipelines": 50
    }, 
    "worker": 4
}'),

(1003, 'Metro Rail Department', 'Kolkata', '033-87654321', 'Responsible for planning, construction, and operation of metro rail services.', 
'{
    "machinery": {
        "Metro Trains": 12, 
        "Survey Equipment": 8
    }, 
    "worker": 4
}'),

(1004, 'Electricity Department', 'Kolkata', '033-56789012', 'Manages electricity distribution and maintenance.', 
'{
    "machinery": {
        "Transformers": 15, 
        "Cables": 100
    }, 
    "worker": 4
}'),

(1005, 'Gas Supply Department', 'Kolkata', '033-98765432', 'Responsible for the supply and maintenance of gas pipelines.', 
'{
    "machinery": {
        "Gas Meters": 30, 
        "Pipelines": 25
    }, 
    "worker": 4
}'),

(1006, 'Parks and Recreation Department', 'Kolkata', '033-23409876', 'Oversees the development and maintenance of public parks.', 
'{
    "machinery": {
        "Gardening Equipment": 25, 
        "Playground Equipment": 10
    }, 
    "worker": 4
}'),

(1007, 'Health Department', 'Kolkata', '033-12340987', 'Responsible for public health services and hospital management.', 
'{
    "machinery": {
        "Ambulances": 20, 
        "Medical Equipment": 50
    }, 
    "worker": 4
}'),

(1008, 'Fire Department', 'Kolkata', '033-45678901', 'Provides fire safety and emergency response services.', 
'{
    "machinery": {
        "Fire Trucks": 12, 
        "Fire Extinguishers": 100
    }, 
    "worker": 4
}'),

(1009, 'Solid Waste Management Department', 'Kolkata', '033-78901234', 'Manages waste collection and disposal.', 
'{
    "machinery": {
        "Garbage Trucks": 15, 
        "Recycling Machines": 5
    }, 
    "worker": 4
}'),

(1010, 'Urban Development Department', 'Kolkata', '033-23456789', 'Oversees urban planning and development projects.', 
'{
    "machinery": {
        "Survey Equipment": 10, 
        "Planning Software": 5
    }, 
    "worker": 4
}');

SELECT * FROM departments;


CREATE TABLE dep_heads (
    head_name VARCHAR(255) NOT NULL,
    contact VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,  
    pro_pic VARCHAR(255),
    dep_id INTEGER REFERENCES departments(dep_id) ON DELETE SET NULL,  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO dep_heads (head_name, contact, email, pro_pic, dep_id)
VALUES 
-- Department 1: Public Works Department
('Anil Kumar', '011-45678901', 'deepsubhra3@gmail.com', NULL, 1001),

-- Department 2: Water Supply Department
('Ramesh Gupta', '022-56789012', '49guptarishav@gmail.com', NULL, 1002),

-- Department 3: Metro Rail Department
('Ravi Singh', '080-67890123', 'business.atul01@gmail.com',  NULL, 1003),

-- Department 4: Electricity Department
('Priya Patel', '044-78901234', 'srijitasphere@gmail.com ',  NULL, 1004),

-- Department 5: Gas Supply Department
('Rajiv Menon', '040-89012345', 'minatobots30@gmail.com',  NULL, 1005),

-- Department 6: Parks and Recreation Department
('Isha Gupta', '033-90123456', 'kritiisha.2004@gmail.com',  NULL, 1006),

-- Department 7: Health Department
('Amit Verma', '020-12345678', 'amit.verma@health.example.com',  NULL, 1007),

-- Department 8: Fire Department
('Sunil Mishra', '022-34567890', 'sunil.mishra@fire.example.com',  NULL, 1008),

-- Department 9: Solid Waste Management Department
('Ravi Kumar', '033-45678901', 'ravi.kumar@waste.example.com',  NULL, 1009),

-- Department 10: Urban Development Department
('Neha Joshi', '044-56789012', 'neha.joshi@urban.example.com',  NULL, 1010);

select * from dep_heads;


CREATE TYPE role_type AS ENUM ('ProjectManager', 'Engineer', 'Worker');


CREATE TABLE employees (
    emp_id INTEGER PRIMARY KEY,  
    emp_name VARCHAR(255) NOT NULL,
    cont VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role role_type NOT NULL,  -- Using the ENUM type for role
    dep_id INTEGER REFERENCES departments(dep_id) ON DELETE SET NULL,  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO employees (emp_id, emp_name, cont, email, role, dep_id, created_at, updated_at)
VALUES 
-- Department 1001: Public Works Department
(1101, 'Isha Kumari', '011-45678901', 'ishakriti.2004@gmail.com', 'ProjectManager', 1001, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1102, 'Neha Sharma', '011-45678902', 'neha11bsharma027@gmail.com', 'Engineer', 1001, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1103, 'Sitaraman', '011-45678903', 'sitaraman1.pwd@example.com', 'Worker', 1001, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1104, 'Suman Sharma', '011-45678904', 'suman.pwd@example.com', 'Worker', 1001, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1105, 'Ravi Singh', '011-45678905', 'ravi.pwd@example.com', 'Worker', 1001, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1106, 'Kiran Patel', '011-45678906', 'kiran.pwd@example.com', 'Worker', 1001, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Department 1002: Water Supply Department
(1107, 'Mohan Sinha', '022-56789012', 'mohan.water@example.com', 'ProjectManager', 1002, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1108, 'Preeti Nair', '022-56789013', 'preeti.water@example.com', 'Engineer', 1002, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1109, 'Ravi Sharma', '022-56789014', 'ravi1.water@example.com', 'Worker', 1002, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1110, 'Sonia Gupta', '022-56789015', 'sonia.water@example.com', 'Worker', 1002, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1111, 'Pooja Kumari', '022-56789016', 'pooja.water@example.com', 'Worker', 1002, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1112, 'Arun Singh', '022-56789017', 'arun.water@example.com', 'Worker', 1002, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Department 1003: Metro Rail Department
(1113, 'Neha Joshi', '033-67890123', 'neha.metro@example.com', 'ProjectManager', 1003, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1114, 'Gopal Rao', '033-67890124', 'gopal.metro@example.com', 'Engineer', 1003, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1115, 'Ankit Sharma', '033-67890125', 'ankit.metro@example.com', 'Worker', 1003, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1116, 'Rani Patel', '033-67890126', 'rani.metro@example.com', 'Worker', 1003, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1117, 'Suresh Singh', '033-67890127', 'suresh.metro@example.com', 'Worker', 1003, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1118, 'Priti Kumari', '033-67890128', 'priti.metro@example.com', 'Worker', 1003, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Department 1004: Electricity Department
(1119, 'Deepak Saini', '044-78901234', 'deepak.elec@example.com', 'ProjectManager', 1004, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1120, 'Sunil Mishra', '044-78901235', 'sunil.elec@example.com', 'Engineer', 1004, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1121, 'Amit Sharma', '044-78901236', 'amit.elec@example.com', 'Worker', 1004, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1122, 'Poonam Yadav', '044-78901237', 'poonam.elec@example.com', 'Worker', 1004, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1123, 'Vikram Singh', '044-78901238', 'vikram.elec@example.com', 'Worker', 1004, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1124, 'Anita Sharma', '044-78901239', 'anita.elec@example.com', 'Worker', 1004, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Department 1005: Gas Supply Department
(1125, 'Jyoti Patel', '055-89012345', 'jyoti.gas@example.com', 'ProjectManager', 1005, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1126, 'Alok Pandey', '055-89012346', 'alok.gas@example.com', 'Engineer', 1005, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1127, 'Kiran Rao', '055-89012347', 'kiran.gas@example.com', 'Worker', 1005, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1128, 'Ravi Kumar', '055-89012348', 'ravi1.gas@example.com', 'Worker', 1005, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1129, 'Meena Gupta', '055-89012349', 'meena.gas@example.com', 'Worker', 1005, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1130, 'Rajesh Kumar', '055-89012350', 'rajesh.gas@example.com', 'Worker', 1005, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Department 1006: Parks and Recreation Department
(1131, 'Anita Sharma', '066-90123456', 'anita.parks@example.com', 'ProjectManager', 1006, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1132, 'Ravi Kumar', '066-90123457', 'ravi.parks@example.com', 'Engineer', 1006, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1133, 'Sita Devi', '066-90123458', 'sita.parks@example.com', 'Worker', 1006, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1134, 'Raj Kumar', '066-90123459', 'raj.parks@example.com', 'Worker', 1006, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1135, 'Amit Sinha', '066-90123460', 'amit.parks@example.com', 'Worker', 1006, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10136, 'Neha Gupta', '066-90123461', 'neha.parks@example.com', 'Worker', 1006, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Department 1007: Health Department
(1137, 'Sonia Gupta', '077-01234567', 'sonia.health@example.com', 'ProjectManager', 1007, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1138, 'Mohan Singh', '077-01234568', 'mohan.health@example.com', 'Engineer', 1007, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1139, 'Ravi Sharma', '077-01234569', 'ravi1.health@example.com', 'Worker', 1007, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1140, 'Pooja Kumar', '077-01234570', 'pooja.health@example.com', 'Worker', 1007, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1141, 'Rajesh Kumar', '077-01234571', 'rajesh1.health@example.com', 'Worker', 1007, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1142, 'Suman Yadav', '077-01234572', 'suman.health@example.com', 'Worker', 1007, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Department 1008: Fire Department
(1143, 'Meena Reddy', '088-12345678', 'meena.fire@example.com', 'ProjectManager', 1008, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1144, 'Kiran Desai', '088-12345679', 'kiran.fire@example.com', 'Engineer', 1008, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1145, 'Ravi Kumar', '088-12345680', 'ravi.fire@example.com', 'Worker', 1008, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1146, 'Anita Sharma', '088-12345681', 'anita.fire@example.com', 'Worker', 1008, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1147, 'Rajeev Gupta', '088-12345682', 'rajeeve.fire@example.com', 'Worker', 1008, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1148, 'Sita Devi', '088-12345683', 'sita.fire@example.com', 'Worker', 1008, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

--Department 1009: Solid Waste Management Department
(1149, 'Suresh Rao', '099-23456789', 'suresh.waste@example.com', 'ProjectManager', 1009, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1150, 'Neha Sinha', '099-23456790', 'neha.waste@example.com', 'Engineer', 1009, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1151, 'Ravi Kumar', '099-23456791', 'ravi2.waste@example.com', 'Worker', 1009, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1152, 'Suman Gupta', '099-23456792', 'suman.waste@example.com', 'Worker', 1009, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1153, 'Rajesh Sharma', '099-23456793', 'rajesh2.waste@example.com', 'Worker', 1009, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1154, 'Pooja Yadav', '099-23456794', 'pooja.waste@example.com', 'Worker', 1009, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Department 1010: Urban Development Department
(1155, 'Anil Gupta', '010-34567890', 'anil.urb@example.com', 'ProjectManager', 1010, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1156, 'Preeti Sinha', '010-34567891', 'preeti.urb@example.com', 'Engineer', 1010, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1157, 'Suresh Singh', '010-34567892', 'suresh2.urb@example.com', 'Worker', 1010, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1158, 'Rajesh Kumar', '010-34567893', 'rajesh3.urb@example.com', 'Worker', 1010, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1159, 'Kiran Yadav', '010-34567894', 'kiran.urb@example.com', 'Worker', 1010, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1160, 'Amit Kumar', '010-34567895', 'amit.urb@example.com', 'Worker', 1010, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

select * from employees;


CREATE TABLE engineers (
    eng_id INTEGER PRIMARY KEY,
    eng_name VARCHAR(255) NOT NULL UNIQUE,
	pro_pic VARCHAR(255)
);


INSERT INTO engineers (eng_id, eng_name, pro_pic)
VALUES 
(1102, 'Neha Sharma',  NULL),
(1108, 'Preeti Nair',  NULL),
(1114, 'Gopal Rao',  NULL),
(1120, 'Sunil Mishra',  NULL),
(1126, 'Alok Pandey',  NULL),
(1132, 'Ravi Kumar',  NULL),
(1138, 'Mohan Singh',  NULL),
(1144, 'Kiran Desai',  NULL),
(1150, 'Neha Sinha',  NULL),
(1156, 'Preeti Sinha',  NULL);

SELECT * FROM engineers;


CREATE TABLE project_managers (
    pm_id INTEGER PRIMARY KEY,  
    pm_name VARCHAR(255) NOT NULL UNIQUE,  
    pro_pic VARCHAR(255)
);


INSERT INTO project_managers (pm_id, pm_name, pro_pic)
VALUES 
(1101, 'Isha Kumari', NULL),
(1107, 'Mohan Sinha', NULL),
(1113, 'Neha Joshi', NULL),
(1119, 'Deepak Saini', NULL),
(1125, 'Jyoti Patel', NULL),
(1131, 'Anita Sharma', NULL),
(1137, 'Sonia Gupta', NULL),
(1143, 'Meena Reddy', NULL),
(1149, 'Suresh Rao', NULL),
(1155, 'Anil Gupta', NULL);


CREATE TABLE worker (
	w_id INTEGER PRIMARY KEY,
	w_name VARCHAR(255) NOT NULL,
	pro_pic VARCHAR(255)
);


INSERT INTO worker (w_id, w_name, pro_pic)
VALUES
--department 1001
(1103, 'Sitaraman', NULL),
(1104, 'Suman Sharma', NULL),
(1105, 'Ravi Singh', NULL),
(1106, 'Kiran Patel', NULL),

--department 1002
(1109, 'Ravi Sharma', NULL),
(1110, 'Sonia Gupta', NULL),
(1111, 'Pooja Kumari', NULL),
(1112, 'Arun Singh', NULL),

--department 1003
(1115, 'Ankit Sharma', NULL),
(1116, 'Rani Patel', NULL),
(1117, 'Suresh Singh', NULL),
(1118, 'Priti Kumari', NULL),

--department 1004
(1121, 'Amit Sharma', NULL),
(1122, 'Poonam Yadav', NULL),
(1123, 'Vikram Singh', NULL),
(1124, 'Anita Sharma', NULL),

--department 1005
(1127, 'Kiran Rao', NULL),
(1128, 'Ravi Kumar', NULL),
(1129, 'Meena Gupta', NULL),
(1130, 'Rajesh Kumar', NULL),

--department 1006
(1133, 'Sita Devi', NULL),
(1134, 'Raj Kumar', NULL),
(1135, 'Amit Sinha', NULL),
(1136, 'Neha Gupta', NULL),

--department 1007
(1139, 'Ravi Sharma', NULL),
(1140, 'Pooja Kumar', NULL),
(1141, 'Rajesh Kumar', NULL),
(1142, 'Suman Yadav', NULL),

--department 1008
(1145, 'Ravi Kumar', NULL),
(1146, 'Anita Sharma', NULL),
(1147, 'Rajeev Gupta', NULL),
(1148, 'Sita Devi', NULL),

--department 1009
(1151, 'Ravi Kumar', NULL),
(1152, 'Suman Gupta', NULL),
(1153, 'Rajesh Sharma', NULL),
(1154, 'Pooja Yadav', NULL),

--department 1010
(1157, 'Suresh Singh', NULL),
(1158, 'Rajesh Kumar', NULL),
(1159, 'Kiran Yadav', NULL),
(1160, 'Amit Kumar', NULL);

select * from worker;

CREATE TABLE inventory (
    in_id INTEGER PRIMARY KEY, 
    in_name VARCHAR(255) NOT NULL,
    machinery JSONB,
    --descr TEXT,
    dep_id INTEGER NOT NULL REFERENCES departments(dep_id) ON DELETE CASCADE,  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO inventory (in_id,in_name, machinery, dep_id, created_at, updated_at)
VALUES 
-- Department 1001: Public Works Department
(1,'Public Works Machinery', '{"Excavators": 10, "Road Rollers": 5, "Drilling Machines": 3}', 
1001, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Department 1002: Water Supply Department
(2,'Water Supply Machinery', '{"Water Pumps": 20, "Pipelines": 50}', 
1002, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Department 1003: Metro Rail Department
(3,'Metro Rail Machinery', '{"Metro Trains": 12, "Survey Equipment": 8}', 
1003, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Department 1004: Electricity Department
(4,'Electricity Department Machinery', '{"Transformers": 15, "Cables": 100}', 
1004, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Department 1005: Gas Supply Department
(5,'Gas Supply Machinery', '{"Gas Meters": 30, "Pipelines": 25}', 
1005, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Department 1006: Parks and Recreation Department
(6,'Parks and Recreation Machinery', '{"Gardening Equipment": 25, "Playground Equipment": 10}', 
1006, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Department 1007: Health Department
(7,'Health Department Machinery', '{"Ambulances": 20, "Medical Equipment": 50}', 
1007, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Department 1008: Fire Department
(8,'Fire Department Machinery', '{"Fire Trucks": 12, "Fire Extinguishers": 100}', 
1008, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Department 1009: Solid Waste Management Department
(9,'Solid Waste Management Machinery', '{"Garbage Trucks": 15, "Recycling Machines": 5}', 
1009, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Department 1010: Urban Development Department
(10,'Urban Development Machinery', '{"Survey Equipment": 10, "Planning Software": 5}', 
1010, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

SELECT * FROM inventory;

CREATE TABLE public_users (
    uname VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
    contact VARCHAR(255),
    complain TEXT,
	pro_pic VARCHAR(255),
    stat VARCHAR(50) CHECK (stat IN ('Pending', 'Resolved', 'Rejected')) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO public_users (uname, email, contact, complain, pro_pic, stat, created_at, updated_at)
VALUES 
('Amit Sharma', 'amit.sharma@example.com', '9876543210', 'Pothole issue on main road.', 'amit_profile.jpg', 'Pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Priya Verma', 'priya.verma@example.com', '9123456789', 'Water leakage in apartment.', 'priya_profile.jpg', 'Resolved', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Rohit Singh', 'rohit.singh@example.com', '9012345678', 'Streetlight not working.', 'rohit_profile.jpg', 'Pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Neha Patel', 'neha.patel@example.com', '9823456712', 'Garbage not collected for 3 days.', 'neha_profile.jpg', 'Rejected', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Vikram Joshi', 'vikram.joshi@example.com', '9023456781', 'Illegal parking on street.', 'vikram_profile.jpg', 'Resolved', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Anjali Gupta', 'anjali.gupta@example.com', '9987654321', 'Tree blocking the road.', 'anjali_profile.jpg', 'Pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

CREATE TABLE tasks (
    t_id INTEGER PRIMARY KEY,  
    title VARCHAR(255) NOT NULL,
    descr TEXT,
    assign_to INTEGER REFERENCES employees(emp_id) ON DELETE SET NULL, 
    dept_id INTEGER REFERENCES departments(dep_id) ON DELETE SET NULL,  
    stat VARCHAR(50) CHECK (stat IN ('Pending', 'In Progress', 'Completed', 'On Hold')) DEFAULT 'Pending',
    priority VARCHAR(50) CHECK (priority IN ('Low', 'Medium', 'High')),
    loc POINT,
    due DATE,
    req VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO tasks (t_id, title, descr, assign_to, dept_id, stat, priority, loc, due, req)
VALUES 
-- Department 1001 (Road Development)
(101, 'Road Expansion Project', 'Expand the main highway by 5 km', 1101, 1001, 'In Progress', 'High', POINT(22.5726, 88.3639), '2024-10-15', 'Heavy Machinery Required'),
(102, 'Bridge Inspection', 'Conduct routine inspection for the new bridge', 1101, 1001, 'Pending', 'Medium', POINT(22.5720, 88.3630), '2024-10-25', 'Inspection Team Required'),
(103, 'Street Light Installation', 'Install street lights along the highway extension', 1102, 1001, 'Pending', 'Medium', POINT(22.5710, 88.3610), '2024-11-01', 'Electricians Required'),
(104, 'Pavement Repair', 'Repair damaged pavement in sector 8', 1102, 1001, 'In Progress', 'High', POINT(22.5740, 88.3645), '2024-09-30', 'Pavement Repair Equipment'),

-- Department 1002 (Water Supply)
(105, 'Pipeline Maintenance', 'Repair the damaged pipelines in sector 9', 1107, 1002, 'In Progress', 'High', POINT(22.5800, 88.3700), '2024-10-05', 'Water Pump Tools'),
(106, 'Water Quality Testing', 'Test the water quality in sector 5', 1108, 1002, 'Pending', 'Medium', POINT(22.5600, 88.3500), '2024-09-30', 'Testing Kit Required'),
(107, 'Sewage System Cleaning', 'Clean the sewage system in sector 12', 1107, 1002, 'Pending', 'Medium', POINT(22.5730, 88.3660), '2024-10-20', 'Sewage Cleaning Team'),

-- Department 1004 (Power Department)
(109, 'Transformer Installation', 'Install new transformers in the north zone', 1119, 1004, 'On Hold', 'High', POINT(22.5900, 88.3750), '2024-11-10', 'Cranes and Power Cables'),
(110, 'Routine Electrical Inspection', 'Inspect power lines for damage and wear', 1120, 1004, 'Pending', 'Low', POINT(22.5700, 88.3650), '2024-09-20', 'Inspection Tools'),

-- Department 1007 (Health Department)
(111, 'Ambulance Maintenance', 'Perform maintenance checks on ambulances', 1137, 1007, 'In Progress', 'Medium', POINT(22.5750, 88.3550), '2024-09-25', 'Spare Parts Required'),
(112, 'Medical Supplies Inventory', 'Check and update inventory of medical supplies', 1138, 1007, 'Pending', 'Low', POINT(22.5650, 88.3620), '2024-10-01', 'Inventory System Update');

SELECT * FROM tasks;


CREATE TABLE forum_posts (
    postId INTEGER PRIMARY KEY,
    email VARCHAR(255) NOT NULL REFERENCES public_users(email) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL REFERENCES public_users(uname),
    title VARCHAR(255) NOT NULL,
    postTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT 0,
    replies VARCHAR(255), 
    sentiment VARCHAR(50)
);