PGDMP  '                    |            dep1_db    16.4    16.4 &    <           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            =           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            >           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    32768    dep1_db    DATABASE     z   CREATE DATABASE dep1_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
    DROP DATABASE dep1_db;
                postgres    false            �            1259    32910 	   dep_heads    TABLE     i  CREATE TABLE public.dep_heads (
    head_name character varying(255) NOT NULL,
    contact character varying(20) NOT NULL,
    email character varying(255) NOT NULL,
    pro_pic character varying(255),
    dep_id uuid,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.dep_heads;
       public         heap    postgres    false            �            1259    32898    departments    TABLE     ~  CREATE TABLE public.departments (
    dep_id uuid DEFAULT gen_random_uuid() NOT NULL,
    dep_name character varying(255) NOT NULL,
    loc character varying(255) NOT NULL,
    contact character varying(255) NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.departments;
       public         heap    postgres    false            �            1259    32924 	   employees    TABLE     7  CREATE TABLE public.employees (
    emp_id uuid DEFAULT gen_random_uuid() NOT NULL,
    emp_name character varying(255) NOT NULL,
    cont character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    role character varying(50) NOT NULL,
    dep_id uuid,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT employees_role_check CHECK (((role)::text = ANY ((ARRAY['ProjectManager'::character varying, 'Engineer'::character varying])::text[])))
);
    DROP TABLE public.employees;
       public         heap    postgres    false            �            1259    32942 	   engineers    TABLE     �   CREATE TABLE public.engineers (
    eng_id uuid DEFAULT gen_random_uuid() NOT NULL,
    eng_name character varying(255) NOT NULL,
    pro_pic character varying(255)
);
    DROP TABLE public.engineers;
       public         heap    postgres    false            �            1259    32972 	   inventory    TABLE     R  CREATE TABLE public.inventory (
    in_id uuid DEFAULT gen_random_uuid() NOT NULL,
    in_name character varying(255) NOT NULL,
    qty integer NOT NULL,
    descr text,
    dep_id uuid NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.inventory;
       public         heap    postgres    false            �            1259    32952    project_managers    TABLE     �   CREATE TABLE public.project_managers (
    pm_id uuid DEFAULT gen_random_uuid() NOT NULL,
    pm_name character varying(255) NOT NULL,
    pro_pic character varying(255)
);
 $   DROP TABLE public.project_managers;
       public         heap    postgres    false            �            1259    32987    public_users    TABLE     Z  CREATE TABLE public.public_users (
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
       public         heap    postgres    false            �            1259    33000    tasks    TABLE       CREATE TABLE public.tasks (
    t_id uuid DEFAULT gen_random_uuid() NOT NULL,
    title character varying(255) NOT NULL,
    descr text,
    assign_to uuid,
    dept_id uuid,
    stat character varying(50) DEFAULT 'Pending'::character varying,
    priority character varying(50) DEFAULT 'Medium'::character varying,
    loc point,
    due date,
    req character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT tasks_priority_check CHECK (((priority)::text = ANY ((ARRAY['Low'::character varying, 'Medium'::character varying, 'High'::character varying])::text[]))),
    CONSTRAINT tasks_stat_check CHECK (((stat)::text = ANY ((ARRAY['Pending'::character varying, 'In Progress'::character varying, 'Completed'::character varying, 'On Hold'::character varying])::text[])))
);
    DROP TABLE public.tasks;
       public         heap    postgres    false            3          0    32910 	   dep_heads 
   TABLE DATA           g   COPY public.dep_heads (head_name, contact, email, pro_pic, dep_id, created_at, updated_at) FROM stdin;
    public          postgres    false    216   &6       2          0    32898    departments 
   TABLE DATA           j   COPY public.departments (dep_id, dep_name, loc, contact, description, created_at, updated_at) FROM stdin;
    public          postgres    false    215   C6       4          0    32924 	   employees 
   TABLE DATA           h   COPY public.employees (emp_id, emp_name, cont, email, role, dep_id, created_at, updated_at) FROM stdin;
    public          postgres    false    217   `6       5          0    32942 	   engineers 
   TABLE DATA           >   COPY public.engineers (eng_id, eng_name, pro_pic) FROM stdin;
    public          postgres    false    218   }6       7          0    32972 	   inventory 
   TABLE DATA           _   COPY public.inventory (in_id, in_name, qty, descr, dep_id, created_at, updated_at) FROM stdin;
    public          postgres    false    220   �6       6          0    32952    project_managers 
   TABLE DATA           C   COPY public.project_managers (pm_id, pm_name, pro_pic) FROM stdin;
    public          postgres    false    219   �6       8          0    32987    public_users 
   TABLE DATA           n   COPY public.public_users (uname, email, contact, complain, pro_pic, stat, created_at, updated_at) FROM stdin;
    public          postgres    false    221   �6       9          0    33000    tasks 
   TABLE DATA           ~   COPY public.tasks (t_id, title, descr, assign_to, dept_id, stat, priority, loc, due, req, created_at, updated_at) FROM stdin;
    public          postgres    false    222   �6       �           2606    32918    dep_heads dep_heads_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.dep_heads
    ADD CONSTRAINT dep_heads_pkey PRIMARY KEY (email);
 B   ALTER TABLE ONLY public.dep_heads DROP CONSTRAINT dep_heads_pkey;
       public            postgres    false    216            �           2606    32909 $   departments departments_dep_name_key 
   CONSTRAINT     c   ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_dep_name_key UNIQUE (dep_name);
 N   ALTER TABLE ONLY public.departments DROP CONSTRAINT departments_dep_name_key;
       public            postgres    false    215            �           2606    32907    departments departments_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (dep_id);
 F   ALTER TABLE ONLY public.departments DROP CONSTRAINT departments_pkey;
       public            postgres    false    215            �           2606    32936    employees employees_email_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key UNIQUE (email);
 G   ALTER TABLE ONLY public.employees DROP CONSTRAINT employees_email_key;
       public            postgres    false    217            �           2606    32934    employees employees_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (emp_id);
 B   ALTER TABLE ONLY public.employees DROP CONSTRAINT employees_pkey;
       public            postgres    false    217            �           2606    32951     engineers engineers_eng_name_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.engineers
    ADD CONSTRAINT engineers_eng_name_key UNIQUE (eng_name);
 J   ALTER TABLE ONLY public.engineers DROP CONSTRAINT engineers_eng_name_key;
       public            postgres    false    218            �           2606    32949    engineers engineers_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.engineers
    ADD CONSTRAINT engineers_pkey PRIMARY KEY (eng_id);
 B   ALTER TABLE ONLY public.engineers DROP CONSTRAINT engineers_pkey;
       public            postgres    false    218            �           2606    32981    inventory inventory_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_pkey PRIMARY KEY (in_id);
 B   ALTER TABLE ONLY public.inventory DROP CONSTRAINT inventory_pkey;
       public            postgres    false    220            �           2606    32959 &   project_managers project_managers_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.project_managers
    ADD CONSTRAINT project_managers_pkey PRIMARY KEY (pm_id);
 P   ALTER TABLE ONLY public.project_managers DROP CONSTRAINT project_managers_pkey;
       public            postgres    false    219            �           2606    32961 -   project_managers project_managers_pm_name_key 
   CONSTRAINT     k   ALTER TABLE ONLY public.project_managers
    ADD CONSTRAINT project_managers_pm_name_key UNIQUE (pm_name);
 W   ALTER TABLE ONLY public.project_managers DROP CONSTRAINT project_managers_pm_name_key;
       public            postgres    false    219            �           2606    32997    public_users public_users_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.public_users
    ADD CONSTRAINT public_users_pkey PRIMARY KEY (email);
 H   ALTER TABLE ONLY public.public_users DROP CONSTRAINT public_users_pkey;
       public            postgres    false    221            �           2606    32999 #   public_users public_users_uname_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.public_users
    ADD CONSTRAINT public_users_uname_key UNIQUE (uname);
 M   ALTER TABLE ONLY public.public_users DROP CONSTRAINT public_users_uname_key;
       public            postgres    false    221            �           2606    33013    tasks tasks_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (t_id);
 :   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_pkey;
       public            postgres    false    222            �           2606    32919    dep_heads dep_heads_dep_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.dep_heads
    ADD CONSTRAINT dep_heads_dep_id_fkey FOREIGN KEY (dep_id) REFERENCES public.departments(dep_id) ON DELETE SET NULL;
 I   ALTER TABLE ONLY public.dep_heads DROP CONSTRAINT dep_heads_dep_id_fkey;
       public          postgres    false    4743    216    215            �           2606    32937    employees employees_dep_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_dep_id_fkey FOREIGN KEY (dep_id) REFERENCES public.departments(dep_id) ON DELETE SET NULL;
 I   ALTER TABLE ONLY public.employees DROP CONSTRAINT employees_dep_id_fkey;
       public          postgres    false    215    4743    217            �           2606    32982    inventory inventory_dep_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_dep_id_fkey FOREIGN KEY (dep_id) REFERENCES public.departments(dep_id) ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.inventory DROP CONSTRAINT inventory_dep_id_fkey;
       public          postgres    false    4743    220    215            �           2606    33014    tasks tasks_assign_to_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_assign_to_fkey FOREIGN KEY (assign_to) REFERENCES public.employees(emp_id) ON DELETE SET NULL;
 D   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_assign_to_fkey;
       public          postgres    false    222    4749    217            �           2606    33019    tasks tasks_dept_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_dept_id_fkey FOREIGN KEY (dept_id) REFERENCES public.departments(dep_id) ON DELETE SET NULL;
 B   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_dept_id_fkey;
       public          postgres    false    222    215    4743            3      x������ � �      2      x������ � �      4      x������ � �      5      x������ � �      7      x������ � �      6      x������ � �      8      x������ � �      9      x������ � �     