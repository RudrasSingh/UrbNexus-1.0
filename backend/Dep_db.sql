PGDMP  !                    |            Dep_db    16.4    16.4 /    k           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            l           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            m           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            n           1262    16430    Dep_db    DATABASE     t   CREATE DATABASE "Dep_db" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';
    DROP DATABASE "Dep_db";
                avnadmin    false            T           1247    16807 	   role_type    TYPE     ]   CREATE TYPE public.role_type AS ENUM (
    'ProjectManager',
    'Engineer',
    'Worker'
);
    DROP TYPE public.role_type;
       public          avnadmin    false            �            1259    16855 	   dep_heads    TABLE     l  CREATE TABLE public.dep_heads (
    head_name character varying(255) NOT NULL,
    contact character varying(20) NOT NULL,
    email character varying(255) NOT NULL,
    pro_pic character varying(255),
    dep_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.dep_heads;
       public         heap    avnadmin    false            �            1259    16728    departments    TABLE     v  CREATE TABLE public.departments (
    dep_id integer NOT NULL,
    dep_name character varying(255) NOT NULL,
    loc character varying(255) NOT NULL,
    contact character varying(255) NOT NULL,
    descr text,
    resources jsonb,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.departments;
       public         heap    avnadmin    false            �            1259    16813 	   employees    TABLE     �  CREATE TABLE public.employees (
    emp_id integer NOT NULL,
    emp_name character varying(255) NOT NULL,
    cont character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    role public.role_type NOT NULL,
    dep_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.employees;
       public         heap    avnadmin    false    852            �            1259    16869 	   engineers    TABLE     �   CREATE TABLE public.engineers (
    eng_id integer NOT NULL,
    eng_name character varying(255) NOT NULL,
    pro_pic character varying(255)
);
    DROP TABLE public.engineers;
       public         heap    avnadmin    false            �            1259    16943    forum_posts    TABLE     �  CREATE TABLE public.forum_posts (
    postid integer NOT NULL,
    email character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    posttime timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    content text NOT NULL,
    likes integer DEFAULT 0,
    replies character varying(255),
    sentiment character varying(50)
);
    DROP TABLE public.forum_posts;
       public         heap    avnadmin    false            �            1259    16894 	   inventory    TABLE     )  CREATE TABLE public.inventory (
    in_id integer NOT NULL,
    in_name character varying(255) NOT NULL,
    machinery jsonb,
    dep_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.inventory;
       public         heap    avnadmin    false            �            1259    16878    project_managers    TABLE     �   CREATE TABLE public.project_managers (
    pm_id integer NOT NULL,
    pm_name character varying(255) NOT NULL,
    pro_pic character varying(255)
);
 $   DROP TABLE public.project_managers;
       public         heap    avnadmin    false            �            1259    16908    public_users    TABLE     Z  CREATE TABLE public.public_users (
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
       public         heap    avnadmin    false            �            1259    16921    tasks    TABLE     J  CREATE TABLE public.tasks (
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
       public         heap    avnadmin    false            �            1259    16887    worker    TABLE     �   CREATE TABLE public.worker (
    w_id integer NOT NULL,
    w_name character varying(255) NOT NULL,
    pro_pic character varying(255)
);
    DROP TABLE public.worker;
       public         heap    avnadmin    false            a          0    16855 	   dep_heads 
   TABLE DATA           g   COPY public.dep_heads (head_name, contact, email, pro_pic, dep_id, created_at, updated_at) FROM stdin;
    public          avnadmin    false    217   �@       _          0    16728    departments 
   TABLE DATA           o   COPY public.departments (dep_id, dep_name, loc, contact, descr, resources, created_at, updated_at) FROM stdin;
    public          avnadmin    false    215   B       `          0    16813 	   employees 
   TABLE DATA           h   COPY public.employees (emp_id, emp_name, cont, email, role, dep_id, created_at, updated_at) FROM stdin;
    public          avnadmin    false    216   �D       b          0    16869 	   engineers 
   TABLE DATA           >   COPY public.engineers (eng_id, eng_name, pro_pic) FROM stdin;
    public          avnadmin    false    218   _I       h          0    16943    forum_posts 
   TABLE DATA           o   COPY public.forum_posts (postid, email, name, title, posttime, content, likes, replies, sentiment) FROM stdin;
    public          avnadmin    false    224   J       e          0    16894 	   inventory 
   TABLE DATA           ^   COPY public.inventory (in_id, in_name, machinery, dep_id, created_at, updated_at) FROM stdin;
    public          avnadmin    false    221   J       c          0    16878    project_managers 
   TABLE DATA           C   COPY public.project_managers (pm_id, pm_name, pro_pic) FROM stdin;
    public          avnadmin    false    219   �K       f          0    16908    public_users 
   TABLE DATA           n   COPY public.public_users (uname, email, contact, complain, pro_pic, stat, created_at, updated_at) FROM stdin;
    public          avnadmin    false    222   �L       g          0    16921    tasks 
   TABLE DATA           ~   COPY public.tasks (t_id, title, descr, assign_to, dept_id, stat, priority, loc, due, req, created_at, updated_at) FROM stdin;
    public          avnadmin    false    223   	N       d          0    16887    worker 
   TABLE DATA           7   COPY public.worker (w_id, w_name, pro_pic) FROM stdin;
    public          avnadmin    false    220   Q       �           2606    16863    dep_heads dep_heads_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.dep_heads
    ADD CONSTRAINT dep_heads_pkey PRIMARY KEY (email);
 B   ALTER TABLE ONLY public.dep_heads DROP CONSTRAINT dep_heads_pkey;
       public            avnadmin    false    217            �           2606    16739 $   departments departments_dep_name_key 
   CONSTRAINT     c   ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_dep_name_key UNIQUE (dep_name);
 N   ALTER TABLE ONLY public.departments DROP CONSTRAINT departments_dep_name_key;
       public            avnadmin    false    215            �           2606    16737    departments departments_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (dep_id);
 F   ALTER TABLE ONLY public.departments DROP CONSTRAINT departments_pkey;
       public            avnadmin    false    215            �           2606    16823    employees employees_email_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key UNIQUE (email);
 G   ALTER TABLE ONLY public.employees DROP CONSTRAINT employees_email_key;
       public            avnadmin    false    216            �           2606    16821    employees employees_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (emp_id);
 B   ALTER TABLE ONLY public.employees DROP CONSTRAINT employees_pkey;
       public            avnadmin    false    216            �           2606    16877     engineers engineers_eng_name_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.engineers
    ADD CONSTRAINT engineers_eng_name_key UNIQUE (eng_name);
 J   ALTER TABLE ONLY public.engineers DROP CONSTRAINT engineers_eng_name_key;
       public            avnadmin    false    218            �           2606    16875    engineers engineers_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.engineers
    ADD CONSTRAINT engineers_pkey PRIMARY KEY (eng_id);
 B   ALTER TABLE ONLY public.engineers DROP CONSTRAINT engineers_pkey;
       public            avnadmin    false    218            �           2606    16951    forum_posts forum_posts_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.forum_posts
    ADD CONSTRAINT forum_posts_pkey PRIMARY KEY (postid);
 F   ALTER TABLE ONLY public.forum_posts DROP CONSTRAINT forum_posts_pkey;
       public            avnadmin    false    224            �           2606    16902    inventory inventory_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_pkey PRIMARY KEY (in_id);
 B   ALTER TABLE ONLY public.inventory DROP CONSTRAINT inventory_pkey;
       public            avnadmin    false    221            �           2606    16884 &   project_managers project_managers_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.project_managers
    ADD CONSTRAINT project_managers_pkey PRIMARY KEY (pm_id);
 P   ALTER TABLE ONLY public.project_managers DROP CONSTRAINT project_managers_pkey;
       public            avnadmin    false    219            �           2606    16886 -   project_managers project_managers_pm_name_key 
   CONSTRAINT     k   ALTER TABLE ONLY public.project_managers
    ADD CONSTRAINT project_managers_pm_name_key UNIQUE (pm_name);
 W   ALTER TABLE ONLY public.project_managers DROP CONSTRAINT project_managers_pm_name_key;
       public            avnadmin    false    219            �           2606    16918    public_users public_users_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.public_users
    ADD CONSTRAINT public_users_pkey PRIMARY KEY (email);
 H   ALTER TABLE ONLY public.public_users DROP CONSTRAINT public_users_pkey;
       public            avnadmin    false    222            �           2606    16920 #   public_users public_users_uname_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.public_users
    ADD CONSTRAINT public_users_uname_key UNIQUE (uname);
 M   ALTER TABLE ONLY public.public_users DROP CONSTRAINT public_users_uname_key;
       public            avnadmin    false    222            �           2606    16932    tasks tasks_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (t_id);
 :   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_pkey;
       public            avnadmin    false    223            �           2606    16893    worker worker_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.worker
    ADD CONSTRAINT worker_pkey PRIMARY KEY (w_id);
 <   ALTER TABLE ONLY public.worker DROP CONSTRAINT worker_pkey;
       public            avnadmin    false    220            �           2606    16864    dep_heads dep_heads_dep_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.dep_heads
    ADD CONSTRAINT dep_heads_dep_id_fkey FOREIGN KEY (dep_id) REFERENCES public.departments(dep_id) ON DELETE SET NULL;
 I   ALTER TABLE ONLY public.dep_heads DROP CONSTRAINT dep_heads_dep_id_fkey;
       public          avnadmin    false    4270    215    217            �           2606    16824    employees employees_dep_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_dep_id_fkey FOREIGN KEY (dep_id) REFERENCES public.departments(dep_id) ON DELETE SET NULL;
 I   ALTER TABLE ONLY public.employees DROP CONSTRAINT employees_dep_id_fkey;
       public          avnadmin    false    216    215    4270            �           2606    16952 "   forum_posts forum_posts_email_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.forum_posts
    ADD CONSTRAINT forum_posts_email_fkey FOREIGN KEY (email) REFERENCES public.public_users(email) ON DELETE CASCADE;
 L   ALTER TABLE ONLY public.forum_posts DROP CONSTRAINT forum_posts_email_fkey;
       public          avnadmin    false    4290    222    224            �           2606    16957 !   forum_posts forum_posts_name_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.forum_posts
    ADD CONSTRAINT forum_posts_name_fkey FOREIGN KEY (name) REFERENCES public.public_users(uname);
 K   ALTER TABLE ONLY public.forum_posts DROP CONSTRAINT forum_posts_name_fkey;
       public          avnadmin    false    224    222    4292            �           2606    16903    inventory inventory_dep_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_dep_id_fkey FOREIGN KEY (dep_id) REFERENCES public.departments(dep_id) ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.inventory DROP CONSTRAINT inventory_dep_id_fkey;
       public          avnadmin    false    221    4270    215            �           2606    16933    tasks tasks_assign_to_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_assign_to_fkey FOREIGN KEY (assign_to) REFERENCES public.employees(emp_id) ON DELETE SET NULL;
 D   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_assign_to_fkey;
       public          avnadmin    false    216    4274    223            �           2606    16938    tasks tasks_dept_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_dept_id_fkey FOREIGN KEY (dept_id) REFERENCES public.departments(dep_id) ON DELETE SET NULL;
 B   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_dept_id_fkey;
       public          avnadmin    false    4270    223    215            a   b  x��ӻn� �?�_ ��v&g��*Q�H����4���o_�Ћ���O�je?
4���,_eEz�7�AhH�ِ�N��1�	M2L+̊�VK�/iE����T�'P܈�n�- �$�S	ʪ�ji�3-	�F�d{��{*E��ȖC�e3-ҶZ~B��D�{-CF˓�`z�5��b�e�����y۵N��c9R��:kR:�,���N�w���Kt���ia$qm̰E�R���\��@(�RE���d��Zph� �T��?b$���׮}=�� 2S��K�~���0����/�F��r���<��;{���w;|茐��������4�����AF��=�����      _   �  x����o�0ǟ�_a��VN�ϾM+�	A����$x5vf;���������t �%��ٟ�ޝ�0��Q5�"���<Xz%7n	ʑoZ>p�	˲�4k�;�^����ZY1�@g�P�yAs�8S�NhE�*��@q��yn>bh0�kں��%�B�Y��ss��w�X|M��}ı�����#�jN���۳?H���%�_&]�:�m�\���K��4�Rr�:��R��!'f2������TD�j�Z��p�У�K����<�jYzS�Ng����t̅<F��vڭ,M�,%W
�|�Jы��K0<@�]�=��ÂY�lr<����t�_L*��5��D������-2���6�pGEE̒t'*��H�qE?s�a,a�'r*�]�Nڧc��-�5���(z �[ ����Wq����[��~ɦ�'��P���Q�2�~���!7��� b�|_�ր
z�V u(��@�8�J�O�-7�xU��x$�znt���ג3ػ�+p���A��S#�"zo{0�/�-����K�Ǭa���V��*\B!r���>��G��([��$#�W�@������X�Ha��551�ѹ���I��;�4xr(r%�bӢ��>�h)
zϭ:���p�AYk�j񎹿�^.QG��\�W���A�b�NZ�o����P���Ʒ�K���+�Z�
���%���)����uR�s]���6�D��#7p�ϫF��*T��      `   l  x����n�8�����H %�ԫHQ�E� v��ް1�f��!)���w(�L�b@Z�j���?3d�2����[)E(c>��4�!� phT���R�yW
U/uI���U�t��;�F��!�Os���>1��� �N�Bw�ѐ�����^4���
��j�Sk	_����jxD6��(Ee�#Ҏ�Yp|�~����X��g�V�9�@ƫ�ms��lL��IyU��64&|w�L���V�D'����������j�Ce�R�wXNs���:\������S���G��f`�z:�CFi4�O�͐Mʗs%��R���v�.�1iu�����~5f�	9�+pHj�M��]Q��0���6E>�:��2(e��7t-�s�>��{��d�?��mQ����:��j���Б�I�
p��R�{l��R��)ԇF��Q\��B}�Wdm\P�Ϸɐ3p.�8��Aʣ8x�* s9���@�冴����_o�*�Gh|a/ LG�|[�+Ȍܗ��8!S�I�
j�}����؊��M�oB�8"�tW��8#�>���D���It&Gܘ|�]wg�c��Wv����x9=!�E} x���m:��-�����Rh�]�5�$z3Z�޻lh���hN���}����'Ԉ�V_u���lLa�:�ˮ�P������Q4�[rN�/ �8c�Oq���m=����� O��f��8�5�^����{���b�X����M�P��Pa.J��o�����u���rhISŜ�в����7�._@fU]�2Tg`+z�jP4��rm��̩=�Y�����
̮LӐ���M���ݖA����
a}z��-��,�Q�֧T#o�#�<�>�A�B��;�	ޖ�
p|Q(�܌�b�5�^M�ʣ�2,�n�i�ly��p�^��$�3�.���ꈙ��q�\湏�����]��-M���b��C�<�s:Ԫ)ݖ�
.����^��ؤ{v�.Ԗ����v=�&C�Я��c�B�6d~~Tt��]�Sͨ�ʦ�>������]�N�Gk�������o	{���ːC���}N�pv���8ǲ��2\�e�z����l6z����wpww���      b   �   x�=�K
�0���s���(n�.Dݺhh��Db-��-$�������0XG8;J+�2�dc���8�l��5n�q��EK���{�]*Q�����n����0ы�;V*mU}tp�pwٌ����.v'�V��+u�;���$�� k�7�      h      x������ � �      e   �  x����n�0D��W^7�HY~��M7;�7�\�76�T)ʍ���GXM��^>�hfDF�f���ck�q�mK���''p���9e�:\�ѕQ
��+��z�v2��²����U6�b���|:g�zT�s�/,8ـCK�MU��CT�
իH��β9Vaĳ(|��K�9Y����@��l�Y�:Z���'l��W#�#j��Ө��T��B�ҵ�+�.\�!�[�)���I��S���������z��MI�yr��:&%����Ba�4��v�:����HR*h��4���KL�L�A��g1|=nZ$GBK�I�Q$�IO�)�.-~���l#�+G�'�jd}x�D�(�=)fdm����=��=~��m���'d��l��oC��'��O/��+'T��@��2�\�':6hm�o����o�r=� Θeh      c   �   x�E�A
�0����s��4qY(�Z�b�nH�&b��۷�@��{D�#Z��6��`�QQA,{4�[>�4t��mΨ����o4�|�s	���'��W������PW`�w��mI�.Z���8��j0�*�b�ᠲ��M��pRJ} ��8U      f   e  x����n�0E��W�`��+��
��
AE7�����cG����k���@���s��;�i#,,+42t�wA?�76�$���ǣ᠟�I���VZ���h
Fc����5z+��nK6'UU�4N��8�%#��I�N����a�d�Es#�+�d���@Ȓ4���q��ђI����)��mHY~�_�-���@ŝl]����*f����l��-�!�R���-|i�s���}`f�T!�]�)'y���,OPI�fh�>+O��R��R[m ��w��V��;�Vbg���U�B�k_�w�-aώ�D	n�>0�Ẑ%?�9ԩ�Q
��[�v!���5��6�7Gk�7��VtY��}�X?xE?�l�      g   �  x����r�0���)���4�eclrk��$�d�tz�E`�ؒ#ɡ�黒�`�$�`�V��[��Ј�;�J���0i��Ph���,�oJ�56b�ٲ,w��cM(Ž4k�i��1�
�ȇ8�Y<����d���Hœs�Ӕ\q���[������S+4/CL4;�PzA�$�ل&�;K#���õ4*G2W�lW�j-��J{(ɷ��(���kr�K��=HǱǈS�O��էc$da5�n����XVU��t?����E`��k����m��E���D��9F^V��J�N癐�=�K�g5LhP���y	M���2��%�~�U��|����O�S�%�o܋�姤��yn��XW&W�gpE���� d�@2��{�l�)���Y��h�����Q�ZV	�C��<��^��/?u�{ݩӝݯ'��a���ደ��&#�Ų�bg,�a^q&�
��k7!����v������頑�>_��w���g�^c����������;v�]���v�t��Ƅ|�p��r��Y�M��\�9���s�P[�<gˊ�<���L`�p�v_��ɂ��\-�ul9��� �}ܨmw�.V���P=�(%��e[��=h߂kWv��ֽ�Ն�`N��1�<�N����Mi�!AJ�
���#���/ڦ�V�Z>�TSzG�N�/u۔���n	���F�mt@y ��*��d�����q]+~�i���9�F�;Q�      d   1  x�mR�j�0<���_P$Y��h�L�B.��Z.��������avfvV��Z3��-\N	�LB;�W�v�z$P�g���~u�p4���7aтQΠ���u�7�C3WL����n��WPۛc�ܛX���gv����Kh�Md"8����K�}���8�����^BI!}_W<^Pg)���U𦵍ZȘ�]��1[��L�3��"��%��6�N���w�!YX<a|'���J�zZK�;���.��0�,�R�INm���ʶx����H�O��U�l�*:Y0������%I�? ��     