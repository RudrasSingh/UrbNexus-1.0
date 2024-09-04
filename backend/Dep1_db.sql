PGDMP                      |            dep1_db    16.4    16.4 (    @           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            A           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            B           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            C           1262    24589    dep1_db    DATABASE     z   CREATE DATABASE dep1_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
    DROP DATABASE dep1_db;
                postgres    false            �            1259    24619 	   dep_heads    TABLE     u  CREATE TABLE public.dep_heads (
    head_id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(255) NOT NULL,
    contact character varying(20) NOT NULL,
    email character varying(255) NOT NULL,
    dep_id uuid,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.dep_heads;
       public         heap    postgres    false            �            1259    24590    departments    TABLE     ~  CREATE TABLE public.departments (
    dep_id uuid DEFAULT gen_random_uuid() NOT NULL,
    dep_name character varying(255) NOT NULL,
    loc character varying(255) NOT NULL,
    contact character varying(255) NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.departments;
       public         heap    postgres    false            �            1259    24636 	   employees    TABLE     7  CREATE TABLE public.employees (
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
       public         heap    postgres    false            �            1259    24662 	   engineers    TABLE     �   CREATE TABLE public.engineers (
    eng_id uuid DEFAULT gen_random_uuid() NOT NULL,
    eng_name character varying(255) NOT NULL
);
    DROP TABLE public.engineers;
       public         heap    postgres    false            �            1259    24781 	   inventory    TABLE     R  CREATE TABLE public.inventory (
    in_id uuid DEFAULT gen_random_uuid() NOT NULL,
    in_name character varying(255) NOT NULL,
    qty integer NOT NULL,
    descr text,
    dep_id uuid NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.inventory;
       public         heap    postgres    false            �            1259    24654    project_managers    TABLE     �   CREATE TABLE public.project_managers (
    pm_id uuid DEFAULT gen_random_uuid() NOT NULL,
    pm_name character varying(255) NOT NULL
);
 $   DROP TABLE public.project_managers;
       public         heap    postgres    false            �            1259    24670    public_users    TABLE     b  CREATE TABLE public.public_users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    uname character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    contact character varying(255),
    comp text,
    stat character varying(50) DEFAULT 'Pending'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT public_users_stat_check CHECK (((stat)::text = ANY ((ARRAY['Pending'::character varying, 'Resolved'::character varying, 'Rejected'::character varying])::text[])))
);
     DROP TABLE public.public_users;
       public         heap    postgres    false            �            1259    24827    tasks    TABLE     ~  CREATE TABLE public.tasks (
    t_id uuid DEFAULT gen_random_uuid() NOT NULL,
    title character varying(255) NOT NULL,
    descr text,
    assign_to uuid,
    dept_id uuid,
    stat character varying(50) DEFAULT 'Pending'::character varying,
    loc character varying(255),
    due date,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT tasks_stat_check CHECK (((stat)::text = ANY ((ARRAY['Pending'::character varying, 'In Progress'::character varying, 'Completed'::character varying, 'On Hold'::character varying])::text[])))
);
    DROP TABLE public.tasks;
       public         heap    postgres    false            7          0    24619 	   dep_heads 
   TABLE DATA           b   COPY public.dep_heads (head_id, name, contact, email, dep_id, created_at, updated_at) FROM stdin;
    public          postgres    false    216   [7       6          0    24590    departments 
   TABLE DATA           j   COPY public.departments (dep_id, dep_name, loc, contact, description, created_at, updated_at) FROM stdin;
    public          postgres    false    215   x7       8          0    24636 	   employees 
   TABLE DATA           h   COPY public.employees (emp_id, emp_name, cont, email, role, dep_id, created_at, updated_at) FROM stdin;
    public          postgres    false    217   �7       :          0    24662 	   engineers 
   TABLE DATA           5   COPY public.engineers (eng_id, eng_name) FROM stdin;
    public          postgres    false    219   �7       <          0    24781 	   inventory 
   TABLE DATA           _   COPY public.inventory (in_id, in_name, qty, descr, dep_id, created_at, updated_at) FROM stdin;
    public          postgres    false    221   �7       9          0    24654    project_managers 
   TABLE DATA           :   COPY public.project_managers (pm_id, pm_name) FROM stdin;
    public          postgres    false    218   �7       ;          0    24670    public_users 
   TABLE DATA           e   COPY public.public_users (id, uname, email, contact, comp, stat, created_at, updated_at) FROM stdin;
    public          postgres    false    220   	8       =          0    24827    tasks 
   TABLE DATA           o   COPY public.tasks (t_id, title, descr, assign_to, dept_id, stat, loc, due, created_at, updated_at) FROM stdin;
    public          postgres    false    222   &8       �           2606    24630    dep_heads dep_heads_email_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.dep_heads
    ADD CONSTRAINT dep_heads_email_key UNIQUE (email);
 G   ALTER TABLE ONLY public.dep_heads DROP CONSTRAINT dep_heads_email_key;
       public            postgres    false    216            �           2606    24628    dep_heads dep_heads_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.dep_heads
    ADD CONSTRAINT dep_heads_pkey PRIMARY KEY (head_id);
 B   ALTER TABLE ONLY public.dep_heads DROP CONSTRAINT dep_heads_pkey;
       public            postgres    false    216            �           2606    24601 $   departments departments_dep_name_key 
   CONSTRAINT     c   ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_dep_name_key UNIQUE (dep_name);
 N   ALTER TABLE ONLY public.departments DROP CONSTRAINT departments_dep_name_key;
       public            postgres    false    215            �           2606    24599    departments departments_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (dep_id);
 F   ALTER TABLE ONLY public.departments DROP CONSTRAINT departments_pkey;
       public            postgres    false    215            �           2606    24648    employees employees_email_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key UNIQUE (email);
 G   ALTER TABLE ONLY public.employees DROP CONSTRAINT employees_email_key;
       public            postgres    false    217            �           2606    24646    employees employees_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (emp_id);
 B   ALTER TABLE ONLY public.employees DROP CONSTRAINT employees_pkey;
       public            postgres    false    217            �           2606    24669     engineers engineers_eng_name_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.engineers
    ADD CONSTRAINT engineers_eng_name_key UNIQUE (eng_name);
 J   ALTER TABLE ONLY public.engineers DROP CONSTRAINT engineers_eng_name_key;
       public            postgres    false    219            �           2606    24667    engineers engineers_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.engineers
    ADD CONSTRAINT engineers_pkey PRIMARY KEY (eng_id);
 B   ALTER TABLE ONLY public.engineers DROP CONSTRAINT engineers_pkey;
       public            postgres    false    219            �           2606    24790    inventory inventory_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_pkey PRIMARY KEY (in_id);
 B   ALTER TABLE ONLY public.inventory DROP CONSTRAINT inventory_pkey;
       public            postgres    false    221            �           2606    24659 &   project_managers project_managers_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.project_managers
    ADD CONSTRAINT project_managers_pkey PRIMARY KEY (pm_id);
 P   ALTER TABLE ONLY public.project_managers DROP CONSTRAINT project_managers_pkey;
       public            postgres    false    218            �           2606    24661 -   project_managers project_managers_pm_name_key 
   CONSTRAINT     k   ALTER TABLE ONLY public.project_managers
    ADD CONSTRAINT project_managers_pm_name_key UNIQUE (pm_name);
 W   ALTER TABLE ONLY public.project_managers DROP CONSTRAINT project_managers_pm_name_key;
       public            postgres    false    218            �           2606    24685 #   public_users public_users_email_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.public_users
    ADD CONSTRAINT public_users_email_key UNIQUE (email);
 M   ALTER TABLE ONLY public.public_users DROP CONSTRAINT public_users_email_key;
       public            postgres    false    220            �           2606    24681    public_users public_users_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.public_users
    ADD CONSTRAINT public_users_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.public_users DROP CONSTRAINT public_users_pkey;
       public            postgres    false    220            �           2606    24683 #   public_users public_users_uname_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.public_users
    ADD CONSTRAINT public_users_uname_key UNIQUE (uname);
 M   ALTER TABLE ONLY public.public_users DROP CONSTRAINT public_users_uname_key;
       public            postgres    false    220            �           2606    24838    tasks tasks_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (t_id);
 :   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_pkey;
       public            postgres    false    222            �           2606    24631    dep_heads dep_heads_dep_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.dep_heads
    ADD CONSTRAINT dep_heads_dep_id_fkey FOREIGN KEY (dep_id) REFERENCES public.departments(dep_id) ON DELETE SET NULL;
 I   ALTER TABLE ONLY public.dep_heads DROP CONSTRAINT dep_heads_dep_id_fkey;
       public          postgres    false    216    4743    215            �           2606    24649    employees employees_dep_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_dep_id_fkey FOREIGN KEY (dep_id) REFERENCES public.departments(dep_id) ON DELETE SET NULL;
 I   ALTER TABLE ONLY public.employees DROP CONSTRAINT employees_dep_id_fkey;
       public          postgres    false    215    4743    217            �           2606    24791    inventory inventory_dep_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_dep_id_fkey FOREIGN KEY (dep_id) REFERENCES public.departments(dep_id) ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.inventory DROP CONSTRAINT inventory_dep_id_fkey;
       public          postgres    false    221    4743    215            �           2606    24839    tasks tasks_assign_to_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_assign_to_fkey FOREIGN KEY (assign_to) REFERENCES public.employees(emp_id) ON DELETE SET NULL;
 D   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_assign_to_fkey;
       public          postgres    false    222    217    4751            �           2606    24844    tasks tasks_dept_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_dept_id_fkey FOREIGN KEY (dept_id) REFERENCES public.departments(dep_id) ON DELETE SET NULL;
 B   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_dept_id_fkey;
       public          postgres    false    222    4743    215            7      x������ � �      6      x������ � �      8      x������ � �      :      x������ � �      <      x������ � �      9      x������ � �      ;      x������ � �      =      x������ � �     