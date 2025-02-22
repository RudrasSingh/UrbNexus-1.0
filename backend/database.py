import os
import psycopg2
from flask import g
from psycopg2.extras import RealDictCursor
import uuid
import datetime
import json
from dotenv import load_dotenv
from datetime import datetime

#Load environment variables from .env file
load_dotenv()


with open("D:/Kriti Port Folio/SIH'24/UrbNexus-1.0/backend/db_conf.json") as config_file:
    config = json.load(config_file)

db_config = config["Servers"]["1"]


#Function to generate uuid
def generate_uuid():
    return str(uuid.uuid4())

#Function to get current timestamp
def current_timestamp():
    return datetime.datetime.now()

#Function to get connection
def get_connection():
    if 'db' not in g:
         # Get the path for sslrootcert
        sslrootcert_path = os.path.join(os.path.dirname(__file__), db_config["sslrootcert"])

        #Establish the connection
        g.db = psycopg2.connect(
            dbname=db_config["MaintenanceDB"],
            user=db_config["Username"],
            password=os.getenv("DB_PASSWORD"),
            host=db_config["Host"],
            port=db_config["Port"],
            sslmode=db_config["SSLMode"],
            sslrootcert=sslrootcert_path
        )
    return g.db


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
def create_department(dep_id, dep_name, loc, resources, contact, descr=None):
    query = """
    INSERT INTO departments (dep_id, dep_name, loc, resources, contact, descr, created_at, updated_at)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    RETURNING dep_id;
    """
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute(query, (dep_id, dep_name, loc, json.dumps(resources), contact, descr, current_timestamp(), current_timestamp()))
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
def update_department(dep_id, dep_name=None, loc=None, resources=None, contact=None, descr=None):
    query = """
    UPDATE departments
    SET dep_name = COALESCE(%s, dep_name),
        loc = COALESCE(%s, loc),
        resources = COALESCE(%s, resources),
        contact = COALESCE(%s, contact),
        resources = COALESCE(%s::jsonb,resources),
        descr = COALESCE(%s, descr),
        updated_at = %s
    WHERE dep_id = %s;
    """
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute(query, (dep_name, loc, json.dumps(resources), contact, descr, current_timestamp(), dep_id))
        conn.commit()
        return cursor.fetchone()[0]

# Delete Department
def delete_department(dep_id):
    query = """
    DELETE FROM departments 
    WHERE dep_id = %s
    RETURNING dep_id;
    """
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute(query, (dep_id,))
        conn.commit()
        return cursor.fetchone()[0]



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



#Table9-Workers
# Create a Worker
def create_worker(w_name, pro_pic=None):
    query = """
    INSERT INTO workers (w_name, pro_pic)
    VALUES (%s, %s)
    RETURNING w_id;
    """
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute(query, (w_name, pro_pic))
        conn.commit()
        return cursor.fetchone()[0]
    

# Read Workers
def read_workers():
    query = "SELECT * FROM workers"
    conn = get_connection()
    with conn.cursor(cursor_factory=RealDictCursor) as cursor:
        cursor.execute(query)
        return cursor.fetchall()
    

# Update Worker
def update_worker(w_id, w_name=None, pro_pic=None):
    query = """
    UPDATE workers
    SET w_name = COALESCE(%s, w_name),
        pro_pic = COALESCE(%s, pro_pic)
        updated_at = %s
    WHERE w_id = %s;
    """
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute(query, (w_name, pro_pic, current_timestamp(), w_id))
        conn.commit()

#delete worker
def delete_worker(w_id):
    query = "DELETE FROM workers WHERE w_id = %s"
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute(query, (w_id,))
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

def read_public_user_by_email(email):
    query = "SELECT * FROM public_users WHERE email = %s"
    conn = get_connection()
    with conn.cursor(cursor_factory=RealDictCursor) as cursor:
        cursor.execute(query, (email,))
        return cursor.fetchone()  # Return the user record as a dictionary (or None if not found)




#Table7-tasks
# Create a Task
def create_task(t_id, title, descr=None, assign_to=None, dept_id=None, stat='Pending', priority=None, loc=None, due=None, req=None):
    query = """
    INSERT INTO tasks (t_id, title, descr, assign_to, dept_id, stat, priority, loc, due, req, created_at, updated_at)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    RETURNING t_id;
    """
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute(query, (t_id, title, descr, assign_to, dept_id, stat, priority, loc, due, req, current_timestamp(), current_timestamp()))
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
def create_inventory(in_name, machinery, dep_id=None):
    query = """
    INSERT INTO inventory (in_name, machinery, dep_id, created_at, updated_at)
    VALUES (%s, %s, %s, %s, %s)
    RETURNING in_id;
    """
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute(query, (in_name, json.dumps(machinery), dep_id, current_timestamp(), current_timestamp()))
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
def update_inventory(in_id, in_name=None, machinery=None, dep_id=None):
    query = """
    UPDATE inventory
    SET in_name = COALESCE(%s, in_name),
        macihery = COALESCE(%s, machinery),
        dep_id = COALESCE(%s, dep_id),
        updated_at = %s
    WHERE in_id = %s;
    """
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute(query, (in_name, json.dumps(machinery), dep_id, current_timestamp(), in_id))
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

"""-------------------forum---------------------"""
def create_post(postId, email, name, title, content, sentiment=None):
    query = """
    INSERT INTO forum_posts (postId, email, name, title, postTime, content, likes, sentiment)
    VALUES (%s, %s, %s, %s, NOW(), %s, 0, %s)
    RETURNING postId;
    """
    with get_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query, (postId, email, name, title, content, sentiment))
            conn.commit()
            return cursor.fetchone()[0]  # Return postId for confirmation


def add_reply(postId, reply_content, replier_name):
    query_get_replies = "SELECT replies FROM forum_posts WHERE postId = %s"
    query_update_replies = """
    UPDATE forum_posts 
    SET replies = %s 
    WHERE postId = %s
    """
    
    with get_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query_get_replies, (postId,))
            replies = cursor.fetchone()[0]  # Get existing replies
            
            # Prepare new reply
            new_reply = {
                "replier_name": replier_name,
                "reply_content": reply_content,
                "reply_time": datetime.now().isoformat()
            }
            
            replies.append(new_reply)  # Add new reply to the list
            
            # Update the replies field
            cursor.execute(query_update_replies, (json.dumps(replies), postId))
            conn.commit()


def read_all_posts():
    query = "SELECT * FROM forum_posts ORDER BY postTime DESC"
    
    with get_connection() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(query)
            return cursor.fetchall()  # Returns a list of all posts as dictionaries, including title and likes

def update_likes(postId, increment=True):
    """
    Updates the likes for a given post.
    
    :param postId: The ID of the post to update.
    :param increment: If True, increment likes; if False, decrement likes.
    :return: The updated number of likes for the post.
    """
    query = """
    UPDATE forum_posts 
    SET likes = likes + %s 
    WHERE postId = %s
    RETURNING likes;
    """
    
    # Determine the value to increment or decrement likes
    like_change = 1 if increment else -1
    
    with get_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query, (like_change, postId))
            conn.commit()
            return cursor.fetchone()[0]  # Return the updated likes count

def delete_post(postId):
    query = "DELETE FROM forum_posts WHERE postId = %s"
    
    with get_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query, (postId,))
            conn.commit()

def get_all_post_ids():
    query = "SELECT postId FROM forum_posts"
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute(query)
        post_ids = [row[0] for row in cursor.fetchall()]  # Extracting postId into a list
        return post_ids

