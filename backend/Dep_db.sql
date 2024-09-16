PGDMP                      |            Dep_db    16.4    16.4 &    X           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
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
    resources jsonb,
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
    public          avnadmin    false    216   6       N          0    16548    departments 
   TABLE DATA           |   COPY public.departments (dep_id, dep_name, loc, contact, descr, num_workers, resources, created_at, updated_at) FROM stdin;
    public          avnadmin    false    215   �7       P          0    16574 	   employees 
   TABLE DATA           h   COPY public.employees (emp_id, emp_name, cont, email, role, dep_id, created_at, updated_at) FROM stdin;
    public          avnadmin    false    217   i:       Q          0    16591 	   engineers 
   TABLE DATA           >   COPY public.engineers (eng_id, eng_name, pro_pic) FROM stdin;
    public          avnadmin    false    218   �<       S          0    16609 	   inventory 
   TABLE DATA           _   COPY public.inventory (in_id, in_name, qty, descr, dep_id, created_at, updated_at) FROM stdin;
    public          avnadmin    false    220   �=       R          0    16600    project_managers 
   TABLE DATA           C   COPY public.project_managers (pm_id, pm_name, pro_pic) FROM stdin;
    public          avnadmin    false    219   �=       T          0    16623    public_users 
   TABLE DATA           n   COPY public.public_users (uname, email, contact, complain, pro_pic, stat, created_at, updated_at) FROM stdin;
    public          avnadmin    false    221   �>       U          0    16636    tasks 
   TABLE DATA           ~   COPY public.tasks (t_id, title, descr, assign_to, dept_id, stat, priority, loc, due, req, created_at, updated_at) FROM stdin;
    public          avnadmin    false    222   �@       �           2606    16568    dep_heads dep_heads_pkey 
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
       public          avnadmin    false    4259    216    215            �           2606    16586    employees employees_dep_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_dep_id_fkey FOREIGN KEY (dep_id) REFERENCES public.departments(dep_id) ON DELETE SET NULL;
 I   ALTER TABLE ONLY public.employees DROP CONSTRAINT employees_dep_id_fkey;
       public          avnadmin    false    217    215    4259            �           2606    16618    inventory inventory_dep_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_dep_id_fkey FOREIGN KEY (dep_id) REFERENCES public.departments(dep_id) ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.inventory DROP CONSTRAINT inventory_dep_id_fkey;
       public          avnadmin    false    215    220    4259            �           2606    16648    tasks tasks_assign_to_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_assign_to_fkey FOREIGN KEY (assign_to) REFERENCES public.employees(emp_id) ON DELETE SET NULL;
 D   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_assign_to_fkey;
       public          avnadmin    false    222    217    4265            �           2606    16653    tasks tasks_dept_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_dept_id_fkey FOREIGN KEY (dept_id) REFERENCES public.departments(dep_id) ON DELETE SET NULL;
 B   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_dept_id_fkey;
       public          avnadmin    false    222    4259    215            O   �  x���Mn�0F��� �1�@Vm7UUU�)�J�40����}�C�El�I~�|�@�MF?�4�A��0��$%�V�/�e] �W�X������Dp�<���
��*�2N�!O���dt��.�p!�����Т��m�y�L�N�4�t��Å���Vj�&�%�ӿ�&�+p�p��Q���$���y�(���\����C���l�����[����9s3�^�vW�è��5�i�vzX�7P�sD��p�u Hc!;B3_�N���^WUf��h%͖q\2Aꁱ�����%��L�tڠ��n�ᙉU�rE���h����ܞ5b+�m�b�[�kK�~ڮ-;o:?�]���/��/bR[�V�j�J���.���)�f���$CEm      N   �  x���Mo1���WX9'h�r��J*�T\z1��1k�������c��H{�=�y��3fd�̥(�L�'K�As��P;�M�'�8I��&�����	X�j+��Bj�h�+�4�����蚋�A���$M��j�R�w�ث;ʒkz5�%%���R�K:��J��׳�xC��$�V�4��{w��&����;��̸C���r{����Ȉ�|	�>��J ��7 -4`apJ�
O6������Ki� ##pF�	�R���m�g);�EK^����'�\���@�tr�Âوl�dA�����Y�h��l`K���}5��o�����_��<�s	K��Q̙H���|��"�q^��-��:Z��j/��8k���L�jc蛢�K�xo6T�%o��>��Q�H��4�-s��	��).O��3��L���`R+�G��h�>¤恛
�7O\�ƒo�F5x��k	�#_�K��_�{���e�b��/�JY-�H����<��i=o�'�]�<#�D�g�a��0}�E����:���ڈ
�]�Ӗ/�E�a�f	u��&��Qó�	qV<�=,_���ڵMҒa@�J��θu@G��D�?ˏ��,��������r��i�`s<}D⽅ߖo������s�^y��G?�o������m�/��c8��wFn�>���jឹ��<?��N�zK[�      P   H  x����n�0E�/_� ��h:��*U�H]��M≝������2iKH�����Z�ǎ`��+�K�[�@�(H�y�4㲰~�}���Knu?�^*�D�(KZQJ�c�]L�"��ވf6�E�]`'Pe,��\WF��]���pcXT�%/�T�hN����[n��2Obb]��<�4@�$�	�n}9��N�A�X�5j˥��Ma�Ê�FOW�=�sx�ɣn���@�����QS_n�NI;��n~޹Y�KB^��t�ē��=�5���m�$
f�>������X��HV�v�4��g S@��{l�����-bD��[i�-/�fŇ!.�@��z�#k�WI��
Mo��&��h�W��}���i#��ė�U��.�������
�l�ڋ^P�}�\
�e+�g��6ZI$]�b/��`�:j��N�I���7({Q��|tA�[>�7�e�aɹB��ݩ7�Yʕ.�����̎�7��@�O^6}b/���R���������x뫳�kN�G����ȣ�ʍ��wc�^�(��/TW���Aa�N�p�[k�����%s���%�g��_Ag�      Q   �   x�]��
�0��}�<�Z�.�E)��+!��MS[��m�?N:MG'�m�r������I�ݧ��M���>��7@��;.����J�����x!"�F�h����v�.y��:B}3�a��n$	[ɉU�:�ꒋ�5��[������qґ�������=+9�'a[���h�G��̦S�,8���N/����8I�Q߈y      S      x������ � �      R   �   x�M�Mj�0����:A����B �`b� �ZXrcIHN���G�L�/�7i�B�do5�G�_�f�����,ˠsjEvE�bfI��$Dy��UHdg㥊�ބO$!*�ޅ���zTzφ`ܓ��,K8�fQ��E�c7qK����U��D7c쐌�`!��z����.{��H��i�"�Fvð�l&�(dm�Bḡ�wi���|�����7��!�Mt��)���C�$?�<      T     x����n�0��ާ���7�ɩR�J�U�2����fi޾�벰�z�8�	����t�ʳ�!0�����V��I�Y^<O����\(Gy�GG�3 �JѴ��� #�Ǉ�ԅ����Y���q�G�c�4M���S��"Ί��?�WP�^����<n-�4
�1y�_#XG_��8��ϴ��AqU�,������W8P�KQC�i�xf����8
�	�
p�x}�Z�a�p	���ZWR�Z�������JWee������(X�䛵#�	�Dn*ԡ��j'�Z����~�p+kn�,�V8 ���;�8
��16(1��+�h%.@%���qUv�&���J� Ɍ��V1ˢ`�c|���3��d�q�+�@3Jn�+���8���L�"H��]��(�o����@����Rt�~��.���G6��u�'QP|�$]��؛ͥ�*����l�4\�!mE�����;Ա�6��3k�\1߷�/?ء����W�ROdf����G\n�7����]��JqUv���d���jI�m      U   }   x�3426�t��-�I-IU(��JM.Qp�O.�M�+I,�����"�<������bN���Ncs=ssK]C##=CKMN##c W����3�5����̬L-�,,�̀������� *J%�     