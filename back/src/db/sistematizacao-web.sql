PGDMP         &                |            postgres     14.10 (Debian 14.10-1.pgdg120+1) %   14.10 (Ubuntu 14.10-0ubuntu0.22.04.1) #    *           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            +           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ,           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            -           1262    13780    postgres    DATABASE     \   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';
    DROP DATABASE postgres;
                postgres    false            .           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    3373                        2615    16384    sistematizacao-web    SCHEMA     $   CREATE SCHEMA "sistematizacao-web";
 "   DROP SCHEMA "sistematizacao-web";
                postgres    false            �            1259    16415    appointments    TABLE     �   CREATE TABLE "sistematizacao-web".appointments (
    id integer NOT NULL,
    id_doctor integer,
    date timestamp without time zone,
    id_patient integer,
    canceled integer DEFAULT 0
);
 .   DROP TABLE "sistematizacao-web".appointments;
       sistematizacao-web         heap    postgres    false    5            �            1259    16414    appointments_id_seq    SEQUENCE     �   CREATE SEQUENCE "sistematizacao-web".appointments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE "sistematizacao-web".appointments_id_seq;
       sistematizacao-web          postgres    false    5    217            /           0    0    appointments_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE "sistematizacao-web".appointments_id_seq OWNED BY "sistematizacao-web".appointments.id;
          sistematizacao-web          postgres    false    216            �            1259    16406    doctors    TABLE     �   CREATE TABLE "sistematizacao-web".doctors (
    id integer NOT NULL,
    name character varying NOT NULL,
    id_specialty integer NOT NULL
);
 )   DROP TABLE "sistematizacao-web".doctors;
       sistematizacao-web         heap    postgres    false    5            �            1259    16405    doctors_id_seq    SEQUENCE     �   CREATE SEQUENCE "sistematizacao-web".doctors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE "sistematizacao-web".doctors_id_seq;
       sistematizacao-web          postgres    false    215    5            0           0    0    doctors_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE "sistematizacao-web".doctors_id_seq OWNED BY "sistematizacao-web".doctors.id;
          sistematizacao-web          postgres    false    214            �            1259    16395    patients    TABLE     �   CREATE TABLE "sistematizacao-web".patients (
    id integer NOT NULL,
    cpf character varying NOT NULL,
    name character varying NOT NULL
);
 *   DROP TABLE "sistematizacao-web".patients;
       sistematizacao-web         heap    postgres    false    5            �            1259    16394    patients_id_seq    SEQUENCE     �   CREATE SEQUENCE "sistematizacao-web".patients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE "sistematizacao-web".patients_id_seq;
       sistematizacao-web          postgres    false    213    5            1           0    0    patients_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE "sistematizacao-web".patients_id_seq OWNED BY "sistematizacao-web".patients.id;
          sistematizacao-web          postgres    false    212            �            1259    16386    specialties    TABLE     p   CREATE TABLE "sistematizacao-web".specialties (
    id integer NOT NULL,
    name character varying NOT NULL
);
 -   DROP TABLE "sistematizacao-web".specialties;
       sistematizacao-web         heap    postgres    false    5            �            1259    16385    specialties_id_seq    SEQUENCE     �   CREATE SEQUENCE "sistematizacao-web".specialties_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE "sistematizacao-web".specialties_id_seq;
       sistematizacao-web          postgres    false    211    5            2           0    0    specialties_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE "sistematizacao-web".specialties_id_seq OWNED BY "sistematizacao-web".specialties.id;
          sistematizacao-web          postgres    false    210            �           2604    16418    appointments id    DEFAULT     �   ALTER TABLE ONLY "sistematizacao-web".appointments ALTER COLUMN id SET DEFAULT nextval('"sistematizacao-web".appointments_id_seq'::regclass);
 L   ALTER TABLE "sistematizacao-web".appointments ALTER COLUMN id DROP DEFAULT;
       sistematizacao-web          postgres    false    217    216    217            �           2604    16409 
   doctors id    DEFAULT     �   ALTER TABLE ONLY "sistematizacao-web".doctors ALTER COLUMN id SET DEFAULT nextval('"sistematizacao-web".doctors_id_seq'::regclass);
 G   ALTER TABLE "sistematizacao-web".doctors ALTER COLUMN id DROP DEFAULT;
       sistematizacao-web          postgres    false    214    215    215            �           2604    16398    patients id    DEFAULT     �   ALTER TABLE ONLY "sistematizacao-web".patients ALTER COLUMN id SET DEFAULT nextval('"sistematizacao-web".patients_id_seq'::regclass);
 H   ALTER TABLE "sistematizacao-web".patients ALTER COLUMN id DROP DEFAULT;
       sistematizacao-web          postgres    false    212    213    213            �           2604    16389    specialties id    DEFAULT     �   ALTER TABLE ONLY "sistematizacao-web".specialties ALTER COLUMN id SET DEFAULT nextval('"sistematizacao-web".specialties_id_seq'::regclass);
 K   ALTER TABLE "sistematizacao-web".specialties ALTER COLUMN id DROP DEFAULT;
       sistematizacao-web          postgres    false    211    210    211            '          0    16415    appointments 
   TABLE DATA           _   COPY "sistematizacao-web".appointments (id, id_doctor, date, id_patient, canceled) FROM stdin;
    sistematizacao-web          postgres    false    217   b(       %          0    16406    doctors 
   TABLE DATA           G   COPY "sistematizacao-web".doctors (id, name, id_specialty) FROM stdin;
    sistematizacao-web          postgres    false    215   �(       #          0    16395    patients 
   TABLE DATA           ?   COPY "sistematizacao-web".patients (id, cpf, name) FROM stdin;
    sistematizacao-web          postgres    false    213   *)       !          0    16386    specialties 
   TABLE DATA           =   COPY "sistematizacao-web".specialties (id, name) FROM stdin;
    sistematizacao-web          postgres    false    211   e)       3           0    0    appointments_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('"sistematizacao-web".appointments_id_seq', 2, true);
          sistematizacao-web          postgres    false    216            4           0    0    doctors_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('"sistematizacao-web".doctors_id_seq', 1, false);
          sistematizacao-web          postgres    false    214            5           0    0    patients_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('"sistematizacao-web".patients_id_seq', 1, true);
          sistematizacao-web          postgres    false    212            6           0    0    specialties_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('"sistematizacao-web".specialties_id_seq', 1, false);
          sistematizacao-web          postgres    false    210            �           2606    16421    appointments appointments_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY "sistematizacao-web".appointments
    ADD CONSTRAINT appointments_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY "sistematizacao-web".appointments DROP CONSTRAINT appointments_pkey;
       sistematizacao-web            postgres    false    217            �           2606    16413    doctors doctors_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY "sistematizacao-web".doctors
    ADD CONSTRAINT doctors_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY "sistematizacao-web".doctors DROP CONSTRAINT doctors_pkey;
       sistematizacao-web            postgres    false    215            �           2606    16404    patients patients_cpf_key 
   CONSTRAINT     a   ALTER TABLE ONLY "sistematizacao-web".patients
    ADD CONSTRAINT patients_cpf_key UNIQUE (cpf);
 Q   ALTER TABLE ONLY "sistematizacao-web".patients DROP CONSTRAINT patients_cpf_key;
       sistematizacao-web            postgres    false    213            �           2606    16402    patients patients_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY "sistematizacao-web".patients
    ADD CONSTRAINT patients_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY "sistematizacao-web".patients DROP CONSTRAINT patients_pkey;
       sistematizacao-web            postgres    false    213            �           2606    16393    specialties specialties_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY "sistematizacao-web".specialties
    ADD CONSTRAINT specialties_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY "sistematizacao-web".specialties DROP CONSTRAINT specialties_pkey;
       sistematizacao-web            postgres    false    211            '   )   x�3�422�4202�50�50Q00�20 "NCN�=... k�      %      x�-�1
1��:9Ŝ ��Vn�vb3�2��=�1�}��'���u�$�O�D��H�`�����9��5�5��M�xlt]�$�a�,�uбW�;E��R�x���H�_�,w��t��/o,V      #   +   x�3�40520�4264��t/-.I,�Wp��+NMN����� ��      !   3   x�36�tN,J����O�L�26�tI-�M,��9�3K3K���=... ���     