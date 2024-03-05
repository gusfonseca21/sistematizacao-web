--
-- PostgreSQL database cluster dump
--

-- Started on 2024-03-05 20:43:23 -03

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS;






--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.10 (Ubuntu 14.10-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.10 (Ubuntu 14.10-0ubuntu0.22.04.1)

-- Started on 2024-03-05 20:43:23 -03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2024-03-05 20:43:24 -03

--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.10 (Ubuntu 14.10-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.10 (Ubuntu 14.10-0ubuntu0.22.04.1)

-- Started on 2024-03-05 20:43:24 -03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 16388)
-- Name: sistematizacao-web; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA "sistematizacao-web";


ALTER SCHEMA "sistematizacao-web" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16500)
-- Name: appointments; Type: TABLE; Schema: sistematizacao-web; Owner: postgres
--

CREATE TABLE "sistematizacao-web".appointments (
    id integer NOT NULL,
    id_doctor integer,
    date timestamp without time zone,
    id_patient integer,
    canceled integer DEFAULT 0
);


ALTER TABLE "sistematizacao-web".appointments OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16499)
-- Name: appointments_id_seq; Type: SEQUENCE; Schema: sistematizacao-web; Owner: postgres
--

CREATE SEQUENCE "sistematizacao-web".appointments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "sistematizacao-web".appointments_id_seq OWNER TO postgres;

--
-- TOC entry 3396 (class 0 OID 0)
-- Dependencies: 216
-- Name: appointments_id_seq; Type: SEQUENCE OWNED BY; Schema: sistematizacao-web; Owner: postgres
--

ALTER SEQUENCE "sistematizacao-web".appointments_id_seq OWNED BY "sistematizacao-web".appointments.id;


--
-- TOC entry 213 (class 1259 OID 16400)
-- Name: doctors; Type: TABLE; Schema: sistematizacao-web; Owner: postgres
--

CREATE TABLE "sistematizacao-web".doctors (
    id integer NOT NULL,
    name character varying NOT NULL,
    id_specialty integer NOT NULL
);


ALTER TABLE "sistematizacao-web".doctors OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 16399)
-- Name: doctors_id_seq; Type: SEQUENCE; Schema: sistematizacao-web; Owner: postgres
--

CREATE SEQUENCE "sistematizacao-web".doctors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "sistematizacao-web".doctors_id_seq OWNER TO postgres;

--
-- TOC entry 3397 (class 0 OID 0)
-- Dependencies: 212
-- Name: doctors_id_seq; Type: SEQUENCE OWNED BY; Schema: sistematizacao-web; Owner: postgres
--

ALTER SEQUENCE "sistematizacao-web".doctors_id_seq OWNED BY "sistematizacao-web".doctors.id;


--
-- TOC entry 215 (class 1259 OID 16438)
-- Name: patients; Type: TABLE; Schema: sistematizacao-web; Owner: postgres
--

CREATE TABLE "sistematizacao-web".patients (
    id integer NOT NULL,
    cpf character varying NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE "sistematizacao-web".patients OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16437)
-- Name: patients_id_seq; Type: SEQUENCE; Schema: sistematizacao-web; Owner: postgres
--

CREATE SEQUENCE "sistematizacao-web".patients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "sistematizacao-web".patients_id_seq OWNER TO postgres;

--
-- TOC entry 3398 (class 0 OID 0)
-- Dependencies: 214
-- Name: patients_id_seq; Type: SEQUENCE OWNED BY; Schema: sistematizacao-web; Owner: postgres
--

ALTER SEQUENCE "sistematizacao-web".patients_id_seq OWNED BY "sistematizacao-web".patients.id;


--
-- TOC entry 211 (class 1259 OID 16390)
-- Name: specialties; Type: TABLE; Schema: sistematizacao-web; Owner: postgres
--

CREATE TABLE "sistematizacao-web".specialties (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE "sistematizacao-web".specialties OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 16389)
-- Name: specialties_id_seq; Type: SEQUENCE; Schema: sistematizacao-web; Owner: postgres
--

CREATE SEQUENCE "sistematizacao-web".specialties_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "sistematizacao-web".specialties_id_seq OWNER TO postgres;

--
-- TOC entry 3399 (class 0 OID 0)
-- Dependencies: 210
-- Name: specialties_id_seq; Type: SEQUENCE OWNED BY; Schema: sistematizacao-web; Owner: postgres
--

ALTER SEQUENCE "sistematizacao-web".specialties_id_seq OWNED BY "sistematizacao-web".specialties.id;


--
-- TOC entry 3228 (class 2604 OID 16503)
-- Name: appointments id; Type: DEFAULT; Schema: sistematizacao-web; Owner: postgres
--

ALTER TABLE ONLY "sistematizacao-web".appointments ALTER COLUMN id SET DEFAULT nextval('"sistematizacao-web".appointments_id_seq'::regclass);


--
-- TOC entry 3226 (class 2604 OID 16403)
-- Name: doctors id; Type: DEFAULT; Schema: sistematizacao-web; Owner: postgres
--

ALTER TABLE ONLY "sistematizacao-web".doctors ALTER COLUMN id SET DEFAULT nextval('"sistematizacao-web".doctors_id_seq'::regclass);


--
-- TOC entry 3227 (class 2604 OID 16441)
-- Name: patients id; Type: DEFAULT; Schema: sistematizacao-web; Owner: postgres
--

ALTER TABLE ONLY "sistematizacao-web".patients ALTER COLUMN id SET DEFAULT nextval('"sistematizacao-web".patients_id_seq'::regclass);


--
-- TOC entry 3225 (class 2604 OID 16393)
-- Name: specialties id; Type: DEFAULT; Schema: sistematizacao-web; Owner: postgres
--

ALTER TABLE ONLY "sistematizacao-web".specialties ALTER COLUMN id SET DEFAULT nextval('"sistematizacao-web".specialties_id_seq'::regclass);


--
-- TOC entry 3390 (class 0 OID 16500)
-- Dependencies: 217
-- Data for Name: appointments; Type: TABLE DATA; Schema: sistematizacao-web; Owner: postgres
--

COPY "sistematizacao-web".appointments (id, id_doctor, date, id_patient, canceled) FROM stdin;
\.


--
-- TOC entry 3386 (class 0 OID 16400)
-- Dependencies: 213
-- Data for Name: doctors; Type: TABLE DATA; Schema: sistematizacao-web; Owner: postgres
--

COPY "sistematizacao-web".doctors (id, name, id_specialty) FROM stdin;
221	Dr. Zerbini	31
222	Dra. Rosa Maria Negri	31
223	Dr. Alberto Goldman	32
224	Dra. Denise Steiner	32
225	Dr. Durval Costa	33
226	Dra. Nise da Silveira	33
\.


--
-- TOC entry 3388 (class 0 OID 16438)
-- Dependencies: 215
-- Data for Name: patients; Type: TABLE DATA; Schema: sistematizacao-web; Owner: postgres
--

COPY "sistematizacao-web".patients (id, cpf, name) FROM stdin;
\.


--
-- TOC entry 3384 (class 0 OID 16390)
-- Dependencies: 211
-- Data for Name: specialties; Type: TABLE DATA; Schema: sistematizacao-web; Owner: postgres
--

COPY "sistematizacao-web".specialties (id, name) FROM stdin;
31	Cardiologia
32	Dermatologia
33	Psiquiatria
\.


--
-- TOC entry 3400 (class 0 OID 0)
-- Dependencies: 216
-- Name: appointments_id_seq; Type: SEQUENCE SET; Schema: sistematizacao-web; Owner: postgres
--

SELECT pg_catalog.setval('"sistematizacao-web".appointments_id_seq', 28, true);


--
-- TOC entry 3401 (class 0 OID 0)
-- Dependencies: 212
-- Name: doctors_id_seq; Type: SEQUENCE SET; Schema: sistematizacao-web; Owner: postgres
--

SELECT pg_catalog.setval('"sistematizacao-web".doctors_id_seq', 226, true);


--
-- TOC entry 3402 (class 0 OID 0)
-- Dependencies: 214
-- Name: patients_id_seq; Type: SEQUENCE SET; Schema: sistematizacao-web; Owner: postgres
--

SELECT pg_catalog.setval('"sistematizacao-web".patients_id_seq', 1325, true);


--
-- TOC entry 3403 (class 0 OID 0)
-- Dependencies: 210
-- Name: specialties_id_seq; Type: SEQUENCE SET; Schema: sistematizacao-web; Owner: postgres
--

SELECT pg_catalog.setval('"sistematizacao-web".specialties_id_seq', 33, true);


--
-- TOC entry 3239 (class 2606 OID 16506)
-- Name: appointments appointments_pkey; Type: CONSTRAINT; Schema: sistematizacao-web; Owner: postgres
--

ALTER TABLE ONLY "sistematizacao-web".appointments
    ADD CONSTRAINT appointments_pkey PRIMARY KEY (id);


--
-- TOC entry 3233 (class 2606 OID 16407)
-- Name: doctors doctors_pkey; Type: CONSTRAINT; Schema: sistematizacao-web; Owner: postgres
--

ALTER TABLE ONLY "sistematizacao-web".doctors
    ADD CONSTRAINT doctors_pkey PRIMARY KEY (id);


--
-- TOC entry 3235 (class 2606 OID 16447)
-- Name: patients patients_cpf_key; Type: CONSTRAINT; Schema: sistematizacao-web; Owner: postgres
--

ALTER TABLE ONLY "sistematizacao-web".patients
    ADD CONSTRAINT patients_cpf_key UNIQUE (cpf);


--
-- TOC entry 3237 (class 2606 OID 16445)
-- Name: patients patients_pkey; Type: CONSTRAINT; Schema: sistematizacao-web; Owner: postgres
--

ALTER TABLE ONLY "sistematizacao-web".patients
    ADD CONSTRAINT patients_pkey PRIMARY KEY (id);


--
-- TOC entry 3231 (class 2606 OID 16397)
-- Name: specialties specialties_pkey; Type: CONSTRAINT; Schema: sistematizacao-web; Owner: postgres
--

ALTER TABLE ONLY "sistematizacao-web".specialties
    ADD CONSTRAINT specialties_pkey PRIMARY KEY (id);


--
-- TOC entry 3240 (class 1259 OID 16521)
-- Name: unique_appointment_time; Type: INDEX; Schema: sistematizacao-web; Owner: postgres
--

CREATE UNIQUE INDEX unique_appointment_time ON "sistematizacao-web".appointments USING btree (date) WHERE (canceled = 0);


--
-- TOC entry 3242 (class 2606 OID 16507)
-- Name: appointments appointments_id_doctor_fkey; Type: FK CONSTRAINT; Schema: sistematizacao-web; Owner: postgres
--

ALTER TABLE ONLY "sistematizacao-web".appointments
    ADD CONSTRAINT appointments_id_doctor_fkey FOREIGN KEY (id_doctor) REFERENCES "sistematizacao-web".doctors(id) ON DELETE CASCADE;


--
-- TOC entry 3243 (class 2606 OID 16512)
-- Name: appointments appointments_id_patient_fkey; Type: FK CONSTRAINT; Schema: sistematizacao-web; Owner: postgres
--

ALTER TABLE ONLY "sistematizacao-web".appointments
    ADD CONSTRAINT appointments_id_patient_fkey FOREIGN KEY (id_patient) REFERENCES "sistematizacao-web".patients(id) ON DELETE CASCADE;


--
-- TOC entry 3241 (class 2606 OID 16408)
-- Name: doctors doctors_id_specialty_fkey; Type: FK CONSTRAINT; Schema: sistematizacao-web; Owner: postgres
--

ALTER TABLE ONLY "sistematizacao-web".doctors
    ADD CONSTRAINT doctors_id_specialty_fkey FOREIGN KEY (id_specialty) REFERENCES "sistematizacao-web".specialties(id);


-- Completed on 2024-03-05 20:43:24 -03

--
-- PostgreSQL database dump complete
--

--
-- Database "sis-web" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.10 (Ubuntu 14.10-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.10 (Ubuntu 14.10-0ubuntu0.22.04.1)

-- Started on 2024-03-05 20:43:24 -03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3348 (class 1262 OID 16384)
-- Name: sis-web; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "sis-web" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'pt_BR.UTF-8';


ALTER DATABASE "sis-web" OWNER TO postgres;

\connect -reuse-previous=on "dbname='sis-web'"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2024-03-05 20:43:24 -03

--
-- PostgreSQL database dump complete
--

-- Completed on 2024-03-05 20:43:24 -03

--
-- PostgreSQL database cluster dump complete
--

