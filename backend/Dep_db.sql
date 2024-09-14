PGDMP      1                 |            Dep_db    16.4    16.4 &    X           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            Y           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            Z           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            [           1262    16430    Dep_db    DATABASE     t   CREATE DATABASE "Dep_db" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';
    DROP DATABASE "Dep_db";
                avnadmin    false            �            1259    16560 	   dep_heads    TABLE     l  CREATE TABLE public.dep_heads (
    head_name character varying(255) NOT NULL,
    contact character varying(20) NOT NULL,
    email character varying(255) NOT NULL,
    pro_pic character varying(255),
    dep_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.dep_heads;
       public         heap    avnadmin    false            �            1259    16548    departments    TABLE     �  CREATE TABLE public.departments (
    dep_id integer NOT NULL,
    dep_name character varying(255) NOT NULL,
    loc character varying(255) NOT NULL,
    contact character varying(255) NOT NULL,
    descr text,
    num_workers integer,
    resources text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT departments_num_workers_check CHECK ((num_workers >= 0))
);
    DROP TABLE public.departments;
       public         heap    avnadmin    false            �            1259    16574 	   employees    TABLE     #  CREATE TABLE public.employees (
    emp_id integer NOT NULL,
    emp_name character varying(255) NOT NULL,
    cont character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    role character varying(50) NOT NULL,
    dep_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT employees_role_check CHECK (((role)::text = ANY ((ARRAY['ProjectManager'::character varying, 'Engineer'::character varying])::text[])))
);
    DROP TABLE public.employees;
       public         heap    avnadmin    false            �            1259    16591 	   engineers    TABLE     �   CREATE TABLE public.engineers (
    eng_id integer NOT NULL,
    eng_name character varying(255) NOT NULL,
    pro_pic character varying(255)
);
    DROP TABLE public.engineers;
       public         heap    avnadmin    false            �            1259    16609 	   inventory    TABLE     >  CREATE TABLE public.inventory (
    in_id integer NOT NULL,
    in_name character varying(255) NOT NULL,
    qty integer NOT NULL,
    descr text,
    dep_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.inventory;
       public         heap    avnadmin    false            �            1259    16600    project_managers    TABLE     �   CREATE TABLE public.project_managers (
    pm_id integer NOT NULL,
    pm_name character varying(255) NOT NULL,
    pro_pic character varying(255)
);
 $   DROP TABLE public.project_managers;
       public         heap    avnadmin    false            �            1259    16623    public_users    TABLE     Z  CREATE TABLE public.public_users (
    uname character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    contact character varying(255),
    complain text,
    pro_pic character varying(255),
    stat character varying(50) DEFAULT 'Pending'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT public_users_stat_check CHECK (((stat)::text = ANY ((ARRAY['Pending'::character varying, 'Resolved'::character varying, 'Rejected'::character varying])::text[])))
);
     DROP TABLE public.public_users;
       public         heap    avnadmin    false            �            1259    16636    tasks    TABLE     J  CREATE TABLE public.tasks (
    t_id integer NOT NULL,
    title character varying(255) NOT NULL,
    descr text,
    assign_to integer,
    dept_id integer,
    stat character varying(50) DEFAULT 'Pending'::character varying,
    priority character varying(50),
    loc point,
    due date,
    req character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT tasks_priority_check CHECK (((priority)::text = ANY ((ARRAY['Low'::character varying, 'Medium'::character varying, 'High'::character varying])::text[]))),
    CONSTRAINT tasks_stat_check CHECK (((stat)::text = ANY ((ARRAY['Pending'::character varying, 'In Progress'::character varying, 'Completed'::character varying, 'On Hold'::character varying])::text[])))
);
    DROP TABLE public.tasks;
       public         heap    avnadmin    false            O          0    16560 	   dep_heads 
   TABLE DATA           g   COPY public.dep_heads (head_name, contact, email, pro_pic, dep_id, created_at, updated_at) FROM stdin;
    public          avnadmin    false    216   6       N          0    16548    departments 
   TABLE DATA           |   COPY public.departments (dep_id, dep_name, loc, contact, descr, num_workers, resources, created_at, updated_at) FROM stdin;
    public          avnadmin    false    215   6       P          0    16574 	   employees 
   TABLE DATA           h   COPY public.employees (emp_id, emp_name, cont, email, role, dep_id, created_at, updated_at) FROM stdin;
    public          avnadmin    false    217   <6       Q          0    16591 	   engineers 
   TABLE DATA           >   COPY public.engineers (eng_id, eng_name, pro_pic) FROM stdin;
    public          avnadmin    false    218   Y6       S          0    16609 	   inventory 
   TABLE DATA           _   COPY public.inventory (in_id, in_name, qty, descr, dep_id, created_at, updated_at) FROM stdin;
    public          avnadmin    false    220   v6       R          0    16600    project_managers 
   TABLE DATA           C   COPY public.project_managers (pm_id, pm_name, pro_pic) FROM stdin;
    public          avnadmin    false    219   �6       T          0    16623    public_users 
   TABLE DATA           n   COPY public.public_users (uname, email, contact, complain, pro_pic, stat, created_at, updated_at) FROM stdin;
    public          avnadmin    false    221   �6       U          0    16636    tasks 
   TABLE DATA           ~   COPY public.tasks (t_id, title, descr, assign_to, dept_id, stat, priority, loc, due, req, created_at, updated_at) FROM stdin;
    public          avnadmin    false    222   �6       �           2606    16568    dep_heads dep_heads_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.dep_heads
    ADD CONSTRAINT dep_heads_pkey PRIMARY KEY (email);
 B   ALTER TABLE ONLY public.dep_heads DROP CONSTRAINT dep_heads_pkey;
       public            avnadmin    false    216            �           2606    16559 $   departments departments_dep_name_key 
   CONSTRAINT     c   ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_dep_name_key UNIQUE (dep_name);
 N   ALTER TABLE ONLY public.departments DROP CONSTRAINT departments_dep_name_key;
       public            avnadmin    false    215            �           2606    16557    departments departments_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (dep_id);
 F   ALTER TABLE ONLY public.departments DROP CONSTRAINT departments_pkey;
       public            avnadmin    false    215            �           2606    16585    employees employees_email_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key UNIQUE (email);
 G   ALTER TABLE ONLY public.employees DROP CONSTRAINT employees_email_key;
       public            avnadmin    false    217            �           2606    16583    employees employees_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (emp_id);
 B   ALTER TABLE ONLY public.employees DROP CONSTRAINT employees_pkey;
       public            avnadmin    false    217            �           2606    16599     engineers engineers_eng_name_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.engineers
    ADD CONSTRAINT engineers_eng_name_key UNIQUE (eng_name);
 J   ALTER TABLE ONLY public.engineers DROP CONSTRAINT engineers_eng_name_key;
       public            avnadmin    false    218            �           2606    16597    engineers engineers_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.engineers
    ADD CONSTRAINT engineers_pkey PRIMARY KEY (eng_id);
 B   ALTER TABLE ONLY public.engineers DROP CONSTRAINT engineers_pkey;
       public            avnadmin    false    218            �           2606    16617    inventory inventory_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_pkey PRIMARY KEY (in_id);
 B   ALTER TABLE ONLY public.inventory DROP CONSTRAINT inventory_pkey;
       public            avnadmin    false    220            �           2606    16606 &   project_managers project_managers_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.project_managers
    ADD CONSTRAINT project_managers_pkey PRIMARY KEY (pm_id);
 P   ALTER TABLE ONLY public.project_managers DROP CONSTRAINT project_managers_pkey;
       public            avnadmin    false    219            �           2606    16608 -   project_managers project_managers_pm_name_key 
   CONSTRAINT     k   ALTER TABLE ONLY public.project_managers
    ADD CONSTRAINT project_managers_pm_name_key UNIQUE (pm_name);
 W   ALTER TABLE ONLY public.project_managers DROP CONSTRAINT project_managers_pm_name_key;
       public            avnadmin    false    219            �           2606    16633    public_users public_users_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.public_users
    ADD CONSTRAINT public_users_pkey PRIMARY KEY (email);
 H   ALTER TABLE ONLY public.public_users DROP CONSTRAINT public_users_pkey;
       public            avnadmin    false    221            �           2606    16635 #   public_users public_users_uname_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.public_users
    ADD CONSTRAINT public_users_uname_key UNIQUE (uname);
 M   ALTER TABLE ONLY public.public_users DROP CONSTRAINT public_users_uname_key;
       public            avnadmin    false    221            �           2606    16647    tasks tasks_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (t_id);
 :   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_pkey;
       public            avnadmin    false    222            �           2606    16569    dep_heads dep_heads_dep_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.dep_heads
    ADD CONSTRAINT dep_heads_dep_id_fkey FOREIGN KEY (dep_id) REFERENCES public.departments(dep_id) ON DELETE SET NULL;
 I   ALTER TABLE ONLY public.dep_heads DROP CONSTRAINT dep_heads_dep_id_fkey;
       public          avnadmin    false    215    4259    216            �           2606    16586    employees employees_dep_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_dep_id_fkey FOREIGN KEY (dep_id) REFERENCES public.departments(dep_id) ON DELETE SET NULL;
 I   ALTER TABLE ONLY public.employees DROP CONSTRAINT employees_dep_id_fkey;
       public          avnadmin    false    217    215    4259            �           2606    16618    inventory inventory_dep_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_dep_id_fkey FOREIGN KEY (dep_id) REFERENCES public.departments(dep_id) ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.inventory DROP CONSTRAINT inventory_dep_id_fkey;
       public          avnadmin    false    220    215    4259            �           2606    16648    tasks tasks_assign_to_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_assign_to_fkey FOREIGN KEY (assign_to) REFERENCES public.employees(emp_id) ON DELETE SET NULL;
 D   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_assign_to_fkey;
       public          avnadmin    false    4265    222    217            �           2606    16653    tasks tasks_dept_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_dept_id_fkey FOREIGN KEY (dept_id) REFERENCES public.departments(dep_id) ON DELETE SET NULL;
 B   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_dept_id_fkey;
       public          avnadmin    false    215    222    4259            O      x������ � �      N      x������ � �      P      x������ � �      Q      x������ � �      S      x������ � �      R      x������ � �      T      x������ � �      U      x������ � �     