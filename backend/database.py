import psycopg2
from flask import g
from psycopg2.extras import RealDictCursor
import uuid
import datetime


def get_connection():
    if 'db' not in g:
        g.db = psycopg2.connect(
            dbname="Dep1_db",
            host="localhost",
            port="5432",
            user="postgres", 
            password="3842"
    )
    return g.db

def generate_uuid():
    return str(uuid.uuid4())


def current_timestamp():
    return datetime.now()


#Table1-Dep_heads

# Create a Dep Head
def create_dep_head(head_name, contact, email, pro_pic=None, dep_id=None):
    query = """
    INSERT INTO dep_heads (head_name, contact, email, pro_pic, dep_id, created_at, updated_at)
    VALUES (%s, %s, %s, %s, %s, %s, %s)
    RETURNING email;
    """
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute(query, (head_name, contact, email, pro_pic, dep_id, current_timestamp(), current_timestamp()))
        conn.commit()
        return cursor.fetchone()[0]


# Read Dep Heads
def read_dep_heads():
    query = "SELECT * FROM dep_heads"
    conn = get_connection()
    with conn.cursor(cursor_factory=RealDictCursor) as cursor:
        cursor.execute(query)
        return cursor.fetchall()


# Update Dep Head
def update_dep_head(email, head_name=None, contact=None, pro_pic=None, dep_id=None):
    query = """
    UPDATE dep_heads
    SET head_name = COALESCE(%s, head_name),
        contact = COALESCE(%s, contact),
        pro_pic = COALESCE(%s, pro_pic),
        dep_id = COALESCE(%s, dep_id),
        updated_at = %s
    WHERE email = %s;
    """
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute(query, (head_name, contact, pro_pic, dep_id, current_timestamp(), email))
        conn.commit()


# Delete Dep Head
def delete_dep_head(email):
    query = "DELETE FROM dep_heads WHERE email = %s"
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute(query, (email,))
        conn.commit()


#Table2- departments 

# Create a Department
def create_department(dep_name, loc, contact, description=None):
    query = """
    INSERT INTO departments (dep_name, loc, contact, description, created_at, updated_at)
    VALUES (%s, %s, %s, %s, %s, %s)
    RETURNING dep_id;
    """
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute(query, (dep_name, loc, contact, description, current_timestamp(), current_timestamp()))
        conn.commit()
        return cursor.fetchone()[0]


# Read Departments
def read_departments():
    query = "SELECT * FROM departments"
    conn = get_connection()
    with conn.cursor(cursor_factory=RealDictCursor) as cursor:
        cursor.execute(query)
        return cursor.fetchall()


# Update Department
def update_department(dep_id, dep_name=None, loc=None, contact=None, description=None):
    query = """
    UPDATE departments
    SET dep_name = COALESCE(%s, dep_name),
        loc = COALESCE(%s, loc),
        contact = COALESCE(%s, contact),
        description = COALESCE(%s, description),
        updated_at = %s
    WHERE dep_id = %s;
    """
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute(query, (dep_name, loc, contact, description, current_timestamp(), dep_id))
        conn.commit()

# Delete Department
def delete_department(dep_id):
    query = "DELETE FROM departments WHERE dep_id = %s"
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute(query, (dep_id,))
        conn.commit()



#Table3-employees
# Create an Employee
def create_employee(emp_name, cont, email, role, dep_id=None):
    query = """
    INSERT INTO employees (emp_name, cont, email, role, dep_id, created_at, updated_at)
    VALUES (%s, %s, %s, %s, %s, %s, %s)
    RETURNING emp_id;
    """
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute(query, (emp_name, cont, email, role, dep_id, current_timestamp(), current_timestamp()))
        conn.commit()
        return cursor.fetchone()[0]


# Read Employees
def read_employees():
    query = "SELECT * FROM employees"
    conn = get_connection()
    with conn.cursor(cursor_factory=RealDictCursor) as cursor:
        cursor.execute(query)
        return cursor.fetchall()


# Update Employee
def update_employee(emp_id, emp_name=None, cont=None, email=None, role=None, dep_id=None):
    query = """
    UPDATE employees
    SET emp_name = COALESCE(%s, emp_name),
        cont = COALESCE(%s, cont),
        email = COALESCE(%s, email),
        role = COALESCE(%s, role),
        dep_id = COALESCE(%s, dep_id),
        updated_at = %s
    WHERE emp_id = %s;
    """
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute(query, (emp_name, cont, email, role, dep_id, current_timestamp(), emp_id))
        conn.commit()

# Delete Employee
def delete_employee(emp_id):
    query = "DELETE FROM employees WHERE emp_id = %s"
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute(query, (emp_id,))
        conn.commit()



#Table4-engineers
# Create an Engineer
def create_engineer(eng_name, pro_pic=None):
    query = """
    INSERT INTO engineers (eng_name, pro_pic, created_at, updated_at)
    VALUES (%s, %s, %s, %s)
    RETURNING eng_id;
    """
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute(query, (eng_name, pro_pic, current_timestamp(), current_timestamp()))
        conn.commit()
        return cursor.fetchone()[0]


# Read Engineers
def read_engineers():
    query = "SELECT * FROM engineers"
    conn = get_connection()
    with conn.cursor(cursor_factory=RealDictCursor) as cursor:
        cursor.execute(query)
        return cursor.fetchall()


# Update Engineer
def update_engineer(eng_id, eng_name=None, pro_pic=None):
    query = """
    UPDATE engineers
    SET eng_name = COALESCE(%s, eng_name),
        pro_pic = COALESCE(%s, pro_pic),
        updated_at = %s
    WHERE eng_id = %s;
    """
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute(query, (eng_name, pro_pic, current_timestamp(), eng_id))
        conn.commit()


# Delete Engineer
def delete_engineer(eng_id):
    query = "DELETE FROM engineers WHERE eng_id = %s"
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute(query, (eng_id,))
        conn.commit()



#Table5-Project_managers
# Create a Project Manager
def create_project_manager(pm_name, pro_pic=None):
    query = """
    INSERT INTO project_managers (pm_name, pro_pic, created_at, updated_at)
    VALUES (%s, %s, %s, %s)
    RETURNING pm_id;
    """
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute(query, (pm_name, pro_pic, current_timestamp(), current_timestamp()))
        conn.commit()
        return cursor.fetchone()[0]


# Read Project Managers
def read_project_managers():
    query = "SELECT * FROM project_managers"
    conn = get_connection()
    with conn.cursor(cursor_factory=RealDictCursor) as cursor:
        cursor.execute(query)
        return cursor.fetchall()


# Update Project Manager
def update_project_manager(pm_id, pm_name=None, pro_pic=None):
    query = """
    UPDATE project_managers
    SET pm_name = COALESCE(%s, pm_name),
        pro_pic = COALESCE(%s, pro_pic),
        updated_at = %s
    WHERE pm_id = %s;
    """
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute(query, (pm_name, pro_pic, current_timestamp(), pm_id))
        conn.commit()

# Delete Project Manager
def delete_project_manager(pm_id):
    query = "DELETE FROM project_managers WHERE pm_id = %s"
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute(query, (pm_id,))
        conn.commit()



#Table6-Public_users
# Create a Public User
def create_public_user(uname, email, contact=None, complain=None, pro_pic=None, stat='Pending'):
    query = """
    INSERT INTO public_users (uname, email, contact, complain, pro_pic, stat, created_at, updated_at)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    RETURNING email;
    """
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute(query, (uname, email, contact, complain, pro_pic, stat, current_timestamp(), current_timestamp()))
        conn.commit()
        return cursor.fetchone()[0]


# Read Public Users
def read_public_users():
    query = "SELECT * FROM public_users"
    conn = get_connection()
    with conn.cursor(cursor_factory=RealDictCursor) as cursor:
        cursor.execute(query)
        return cursor.fetchall()


# Update Public User
def update_public_user(email, uname=None, contact=None, complain=None, pro_pic=None, stat=None):
    query = """
    UPDATE public_users
    SET uname = COALESCE(%s, uname),
        contact = COALESCE(%s, contact),
        complain = COALESCE(%s, complain),
        pro_pic = COALESCE(%s, pro_pic),
        stat = COALESCE(%s, stat),
        updated_at = %s
    WHERE email = %s;
    """
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute(query, (uname, contact, complain, pro_pic, stat, current_timestamp(), email))
        conn.commit()


# Delete Public User
def delete_public_user(email):
    query = "DELETE FROM public_users WHERE email = %s"
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute(query, (email,))
        conn.commit()



#Table7-tasks
# Create a Task
def create_task(title, descr=None, assign_to=None, dept_id=None, stat='Pending', priority='Medium', loc=None, due=None, req=None):
    query = """
    INSERT INTO tasks (title, descr, assign_to, dept_id, stat, priority, loc, due, req, created_at, updated_at)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    RETURNING t_id;
    """
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute(query, (title, descr, assign_to, dept_id, stat, priority, loc, due, req, current_timestamp(), current_timestamp()))
        conn.commit()
        return cursor.fetchone()[0]


# Read Tasks
def read_tasks():
    query = "SELECT * FROM tasks"
    conn = get_connection()
    with conn.cursor(cursor_factory=RealDictCursor) as cursor:
        cursor.execute(query)
        return cursor.fetchall()


# Update Task
def update_task(t_id, title=None, descr=None, assign_to=None, dept_id=None, stat=None, priority=None, loc=None, due=None, req=None):
    query = """
    UPDATE tasks
    SET title = COALESCE(%s, title),
        descr = COALESCE(%s, descr),
        assign_to = COALESCE(%s, assign_to),
        dept_id = COALESCE(%s, dept_id),
        stat = COALESCE(%s, stat),
        priority = COALESCE(%s, priority),
        loc = COALESCE(%s, loc),
        due = COALESCE(%s, due),
        req = COALESCE(%s, req),
        updated_at = %s
    WHERE t_id = %s;
    """
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute(query, (title, descr, assign_to, dept_id, stat, priority, loc, due, req, current_timestamp(), t_id))
        conn.commit()


# Delete Task
def delete_task(t_id):
    query = "DELETE FROM tasks WHERE t_id = %s"
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute(query, (t_id,))
        conn.commit()


#Table8-inventory
# Create an Inventory Item
def create_inventory(in_name, qty, descr=None, dep_id=None):
    query = """
    INSERT INTO inventory (in_name, qty, descr, dep_id, created_at, updated_at)
    VALUES (%s, %s, %s, %s, %s, %s)
    RETURNING in_id;
    """
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute(query, (in_name, qty, descr, dep_id, current_timestamp(), current_timestamp()))
        conn.commit()
        return cursor.fetchone()[0]

# Read Inventory
def read_inventory():
    query = "SELECT * FROM inventory"
    conn = get_connection()
    with conn.cursor(cursor_factory=RealDictCursor) as cursor:
        cursor.execute(query)
        return cursor.fetchall()


# Update Inventory Item
def update_inventory(in_id, in_name=None, qty=None, descr=None, dep_id=None):
    query = """
    UPDATE inventory
    SET in_name = COALESCE(%s, in_name),
        qty = COALESCE(%s, qty),
        descr = COALESCE(%s, descr),
        dep_id = COALESCE(%s, dep_id),
        updated_at = %s
    WHERE in_id = %s;
    """
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute(query, (in_name, qty, descr, dep_id, current_timestamp(), in_id))
        conn.commit()


# Delete Inventory Item
def delete_inventory(in_id):
    query = "DELETE FROM inventory WHERE in_id = %s"
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute(query, (in_id,))
        conn.commit()



def close_database(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()

