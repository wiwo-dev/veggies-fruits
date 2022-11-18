--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-1.pgdg20.04+1)
-- Dumped by pg_dump version 14.3

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
-- Name: heroku_ext; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA heroku_ext;


ALTER SCHEMA heroku_ext OWNER TO postgres;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: yaquxqppzssjpg
--

CREATE TYPE public."Role" AS ENUM (
    'USER',
    'ADMIN'
);


ALTER TYPE public."Role" OWNER TO yaquxqppzssjpg;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Cart; Type: TABLE; Schema: public; Owner: yaquxqppzssjpg
--

CREATE TABLE public."Cart" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "userId" text
);


ALTER TABLE public."Cart" OWNER TO yaquxqppzssjpg;

--
-- Name: CartItem; Type: TABLE; Schema: public; Owner: yaquxqppzssjpg
--

CREATE TABLE public."CartItem" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "productId" integer NOT NULL,
    quantity integer DEFAULT 1 NOT NULL,
    "cartId" integer
);


ALTER TABLE public."CartItem" OWNER TO yaquxqppzssjpg;

--
-- Name: CartItem_id_seq; Type: SEQUENCE; Schema: public; Owner: yaquxqppzssjpg
--

CREATE SEQUENCE public."CartItem_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."CartItem_id_seq" OWNER TO yaquxqppzssjpg;

--
-- Name: CartItem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yaquxqppzssjpg
--

ALTER SEQUENCE public."CartItem_id_seq" OWNED BY public."CartItem".id;


--
-- Name: Cart_id_seq; Type: SEQUENCE; Schema: public; Owner: yaquxqppzssjpg
--

CREATE SEQUENCE public."Cart_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Cart_id_seq" OWNER TO yaquxqppzssjpg;

--
-- Name: Cart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yaquxqppzssjpg
--

ALTER SEQUENCE public."Cart_id_seq" OWNED BY public."Cart".id;


--
-- Name: Category; Type: TABLE; Schema: public; Owner: yaquxqppzssjpg
--

CREATE TABLE public."Category" (
    id integer NOT NULL,
    name text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    icon text
);


ALTER TABLE public."Category" OWNER TO yaquxqppzssjpg;

--
-- Name: Category_id_seq; Type: SEQUENCE; Schema: public; Owner: yaquxqppzssjpg
--

CREATE SEQUENCE public."Category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Category_id_seq" OWNER TO yaquxqppzssjpg;

--
-- Name: Category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yaquxqppzssjpg
--

ALTER SEQUENCE public."Category_id_seq" OWNED BY public."Category".id;


--
-- Name: Order; Type: TABLE; Schema: public; Owner: yaquxqppzssjpg
--

CREATE TABLE public."Order" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    status text DEFAULT 'NEW_ORDER'::text NOT NULL,
    "userId" text,
    "deliveryAddress" jsonb
);


ALTER TABLE public."Order" OWNER TO yaquxqppzssjpg;

--
-- Name: Order_id_seq; Type: SEQUENCE; Schema: public; Owner: yaquxqppzssjpg
--

CREATE SEQUENCE public."Order_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Order_id_seq" OWNER TO yaquxqppzssjpg;

--
-- Name: Order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yaquxqppzssjpg
--

ALTER SEQUENCE public."Order_id_seq" OWNED BY public."Order".id;


--
-- Name: Product; Type: TABLE; Schema: public; Owner: yaquxqppzssjpg
--

CREATE TABLE public."Product" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    name text,
    description text,
    published boolean DEFAULT true NOT NULL,
    "stockCount" integer DEFAULT 0 NOT NULL,
    "mainPhotoUrl" text,
    available boolean DEFAULT false NOT NULL,
    slug text,
    price double precision DEFAULT 1.0 NOT NULL,
    unit text
);


ALTER TABLE public."Product" OWNER TO yaquxqppzssjpg;

--
-- Name: Product_id_seq; Type: SEQUENCE; Schema: public; Owner: yaquxqppzssjpg
--

CREATE SEQUENCE public."Product_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Product_id_seq" OWNER TO yaquxqppzssjpg;

--
-- Name: Product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yaquxqppzssjpg
--

ALTER SEQUENCE public."Product_id_seq" OWNED BY public."Product".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: yaquxqppzssjpg
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text,
    name text,
    address text,
    city text,
    country text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "phoneNumber" text,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "emailVerified" timestamp(3) without time zone,
    image text,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL,
    address2 text,
    postcode text
);


ALTER TABLE public."User" OWNER TO yaquxqppzssjpg;

--
-- Name: _CartItemToOrder; Type: TABLE; Schema: public; Owner: yaquxqppzssjpg
--

CREATE TABLE public."_CartItemToOrder" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_CartItemToOrder" OWNER TO yaquxqppzssjpg;

--
-- Name: _CategoryToProduct; Type: TABLE; Schema: public; Owner: yaquxqppzssjpg
--

CREATE TABLE public."_CategoryToProduct" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_CategoryToProduct" OWNER TO yaquxqppzssjpg;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: yaquxqppzssjpg
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO yaquxqppzssjpg;

--
-- Name: Cart id; Type: DEFAULT; Schema: public; Owner: yaquxqppzssjpg
--

ALTER TABLE ONLY public."Cart" ALTER COLUMN id SET DEFAULT nextval('public."Cart_id_seq"'::regclass);


--
-- Name: CartItem id; Type: DEFAULT; Schema: public; Owner: yaquxqppzssjpg
--

ALTER TABLE ONLY public."CartItem" ALTER COLUMN id SET DEFAULT nextval('public."CartItem_id_seq"'::regclass);


--
-- Name: Category id; Type: DEFAULT; Schema: public; Owner: yaquxqppzssjpg
--

ALTER TABLE ONLY public."Category" ALTER COLUMN id SET DEFAULT nextval('public."Category_id_seq"'::regclass);


--
-- Name: Order id; Type: DEFAULT; Schema: public; Owner: yaquxqppzssjpg
--

ALTER TABLE ONLY public."Order" ALTER COLUMN id SET DEFAULT nextval('public."Order_id_seq"'::regclass);


--
-- Name: Product id; Type: DEFAULT; Schema: public; Owner: yaquxqppzssjpg
--

ALTER TABLE ONLY public."Product" ALTER COLUMN id SET DEFAULT nextval('public."Product_id_seq"'::regclass);


--
-- Data for Name: Cart; Type: TABLE DATA; Schema: public; Owner: yaquxqppzssjpg
--

COPY public."Cart" (id, "createdAt", "updatedAt", "userId") FROM stdin;
\.


--
-- Data for Name: CartItem; Type: TABLE DATA; Schema: public; Owner: yaquxqppzssjpg
--

COPY public."CartItem" (id, "createdAt", "updatedAt", "productId", quantity, "cartId") FROM stdin;
1	2022-06-17 09:46:23.628	2022-06-17 09:46:23.63	1	2	\N
3	2022-06-17 09:54:15.759	2022-06-17 09:54:15.76	1	2	\N
4	2022-06-17 09:55:30.873	2022-06-17 09:55:30.874	1	2	\N
5	2022-06-17 10:08:19.985	2022-06-17 10:08:19.986	1	5	\N
6	2022-06-17 10:08:36.297	2022-06-17 10:08:36.297	3	5	\N
7	2022-06-17 10:09:56.965	2022-06-17 10:09:56.965	3	5	\N
8	2022-06-17 10:10:08.6	2022-06-17 10:10:08.601	1	5	\N
9	2022-06-17 10:19:56.464	2022-06-17 10:19:56.466	2	2	\N
10	2022-06-17 10:19:56.464	2022-06-17 10:19:56.467	1	6	\N
11	2022-06-17 10:19:56.464	2022-06-17 10:19:56.467	5	3	\N
12	2022-06-17 10:19:56.464	2022-06-17 10:19:56.467	4	4	\N
13	2022-06-17 10:22:53.064	2022-06-17 10:22:53.065	2	4	\N
14	2022-06-17 10:22:53.064	2022-06-17 10:22:53.065	1	3	\N
15	2022-06-17 10:22:53.064	2022-06-17 10:22:53.065	5	2	\N
16	2022-06-17 10:56:27.902	2022-06-17 10:56:27.903	2	4	\N
17	2022-06-17 10:56:27.902	2022-06-17 10:56:27.903	1	3	\N
18	2022-06-17 10:56:27.902	2022-06-17 10:56:27.903	5	2	\N
19	2022-06-17 11:05:47.577	2022-06-17 11:05:47.578	3	3	\N
20	2022-06-17 11:05:47.577	2022-06-17 11:05:47.578	2	3	\N
21	2022-06-17 11:05:47.577	2022-06-17 11:05:47.578	1	3	\N
22	2022-07-06 08:41:58.22	2022-07-06 08:41:58.222	3	3	\N
23	2022-07-06 08:41:58.22	2022-07-06 08:41:58.222	4	3	\N
24	2022-07-07 07:53:21.837	2022-07-07 07:53:21.838	2	4	\N
25	2022-07-07 07:53:21.837	2022-07-07 07:53:21.838	3	2	\N
26	2022-07-07 07:53:21.837	2022-07-07 07:53:21.838	5	5	\N
27	2022-07-07 07:53:21.837	2022-07-07 07:53:21.838	4	4	\N
28	2022-07-07 07:58:53.036	2022-07-07 07:58:53.037	2	4	\N
29	2022-07-07 07:58:53.036	2022-07-07 07:58:53.037	3	2	\N
30	2022-07-07 07:58:53.036	2022-07-07 07:58:53.037	5	5	\N
31	2022-07-07 07:58:53.036	2022-07-07 07:58:53.037	4	4	\N
32	2022-07-07 08:02:39.487	2022-07-07 08:02:39.488	2	4	\N
33	2022-07-07 08:02:39.487	2022-07-07 08:02:39.488	3	2	\N
34	2022-07-07 08:02:39.487	2022-07-07 08:02:39.488	5	5	\N
35	2022-07-07 08:02:39.487	2022-07-07 08:02:39.488	4	4	\N
36	2022-07-12 09:49:17.305	2022-07-12 09:49:17.308	4	4	\N
37	2022-07-12 09:49:17.305	2022-07-12 09:49:17.308	1	4	\N
38	2022-07-12 09:49:17.305	2022-07-12 09:49:17.308	3	3	\N
39	2022-07-12 10:48:00.372	2022-07-12 10:48:00.374	4	4	\N
40	2022-07-12 10:48:00.372	2022-07-12 10:48:00.374	5	3	\N
41	2022-07-12 10:48:00.372	2022-07-12 10:48:00.374	1	2	\N
42	2022-07-12 10:51:58.975	2022-07-12 10:51:58.976	4	3	\N
43	2022-07-12 10:51:58.975	2022-07-12 10:51:58.976	2	3	\N
44	2022-07-12 10:51:58.975	2022-07-12 10:51:58.976	1	3	\N
45	2022-07-12 10:56:22.287	2022-07-12 10:56:22.288	4	3	\N
46	2022-07-12 10:56:22.287	2022-07-12 10:56:22.288	1	4	\N
47	2022-07-12 10:56:22.287	2022-07-12 10:56:22.288	2	3	\N
48	2022-07-12 10:57:39.734	2022-07-12 10:57:39.735	4	3	\N
49	2022-07-12 10:57:39.734	2022-07-12 10:57:39.735	2	3	\N
50	2022-07-12 11:00:04.455	2022-07-12 11:00:04.456	4	4	\N
51	2022-07-12 11:00:04.455	2022-07-12 11:00:04.456	5	1	\N
52	2022-07-12 11:06:12.167	2022-07-12 11:06:12.167	4	2	\N
53	2022-07-12 11:06:12.167	2022-07-12 11:06:12.167	1	4	\N
54	2022-07-13 07:16:42.842	2022-07-13 07:16:42.845	5	2	\N
55	2022-07-13 07:16:42.842	2022-07-13 07:16:42.845	1	3	\N
56	2022-07-13 07:23:34.78	2022-07-13 07:23:34.781	5	2	\N
57	2022-07-13 07:23:34.78	2022-07-13 07:23:34.781	1	3	\N
58	2022-07-13 07:26:05.154	2022-07-13 07:26:05.155	5	2	\N
59	2022-07-13 07:26:05.154	2022-07-13 07:26:05.155	1	3	\N
60	2022-07-13 07:37:36.693	2022-07-13 07:37:36.694	5	2	\N
61	2022-07-13 07:37:36.693	2022-07-13 07:37:36.694	1	3	\N
62	2022-07-13 07:39:47.902	2022-07-13 07:39:47.903	5	2	\N
63	2022-07-13 07:39:47.902	2022-07-13 07:39:47.903	1	3	\N
64	2022-07-13 07:41:04.385	2022-07-13 07:41:04.386	5	2	\N
65	2022-07-13 07:41:04.385	2022-07-13 07:41:04.386	1	3	\N
66	2022-07-13 07:43:04.359	2022-07-13 07:43:04.36	5	2	\N
67	2022-07-13 07:43:04.359	2022-07-13 07:43:04.36	1	3	\N
68	2022-07-13 07:45:26.288	2022-07-13 07:45:26.289	5	2	\N
69	2022-07-13 07:45:26.288	2022-07-13 07:45:26.289	1	3	\N
70	2022-07-13 07:46:34.948	2022-07-13 07:46:34.949	5	2	\N
71	2022-07-13 07:46:34.948	2022-07-13 07:46:34.949	1	3	\N
72	2022-07-13 07:47:48.331	2022-07-13 07:47:48.332	5	2	\N
73	2022-07-13 07:47:48.331	2022-07-13 07:47:48.332	1	3	\N
74	2022-07-13 07:49:18.384	2022-07-13 07:49:18.385	5	2	\N
75	2022-07-13 07:49:18.384	2022-07-13 07:49:18.385	1	3	\N
76	2022-07-13 07:51:13.43	2022-07-13 07:51:13.431	5	2	\N
77	2022-07-13 07:51:13.43	2022-07-13 07:51:13.431	1	3	\N
78	2022-07-13 08:00:22.621	2022-07-13 08:00:22.622	5	2	\N
79	2022-07-13 08:00:22.621	2022-07-13 08:00:22.622	1	3	\N
80	2022-07-13 08:01:14.288	2022-07-13 08:01:14.289	5	2	\N
81	2022-07-13 08:01:14.288	2022-07-13 08:01:14.289	1	3	\N
82	2022-07-13 08:09:14.534	2022-07-13 08:09:14.535	5	2	\N
83	2022-07-13 08:09:14.534	2022-07-13 08:09:14.535	1	3	\N
84	2022-07-13 08:10:43.198	2022-07-13 08:10:43.199	5	2	\N
85	2022-07-13 08:10:43.198	2022-07-13 08:10:43.199	1	3	\N
86	2022-07-13 08:11:28.099	2022-07-13 08:11:28.1	5	2	\N
87	2022-07-13 08:11:28.099	2022-07-13 08:11:28.1	1	3	\N
88	2022-07-13 08:12:51.546	2022-07-13 08:12:51.547	5	2	\N
89	2022-07-13 08:12:51.546	2022-07-13 08:12:51.547	1	3	\N
90	2022-07-13 08:13:51.733	2022-07-13 08:13:51.734	5	2	\N
91	2022-07-13 08:13:51.733	2022-07-13 08:13:51.734	1	3	\N
92	2022-07-13 08:16:12.499	2022-07-13 08:16:12.5	5	2	\N
93	2022-07-13 08:16:12.5	2022-07-13 08:16:12.5	1	3	\N
94	2022-07-13 08:17:52.658	2022-07-13 08:17:52.659	5	2	\N
95	2022-07-13 08:17:52.658	2022-07-13 08:17:52.659	1	3	\N
96	2022-07-13 08:19:23.23	2022-07-13 08:19:23.231	5	2	\N
97	2022-07-13 08:19:23.23	2022-07-13 08:19:23.231	1	3	\N
98	2022-07-13 08:26:52.555	2022-07-13 08:26:52.556	5	2	\N
99	2022-07-13 08:26:52.555	2022-07-13 08:26:52.556	1	3	\N
100	2022-07-13 08:27:27.976	2022-07-13 08:27:27.976	5	2	\N
101	2022-07-13 08:27:27.976	2022-07-13 08:27:27.976	1	3	\N
102	2022-07-13 08:49:56.816	2022-07-13 08:49:56.817	4	3	\N
103	2022-07-13 08:49:56.816	2022-07-13 08:49:56.817	2	3	\N
104	2022-07-13 08:56:44.086	2022-07-13 08:56:44.087	3	3	\N
105	2022-07-13 08:56:44.086	2022-07-13 08:56:44.087	4	2	\N
106	2022-07-13 08:58:42.032	2022-07-13 08:58:42.033	3	3	\N
107	2022-07-13 08:58:42.032	2022-07-13 08:58:42.033	4	2	\N
108	2022-07-13 09:01:45.677	2022-07-13 09:01:45.677	3	3	\N
109	2022-07-13 09:01:45.677	2022-07-13 09:01:45.677	4	2	\N
110	2022-07-13 09:09:48.53	2022-07-13 09:09:48.53	3	3	\N
111	2022-07-13 09:09:48.53	2022-07-13 09:09:48.53	4	2	\N
112	2022-07-13 09:09:48.53	2022-07-13 09:09:48.53	1	2	\N
113	2022-07-22 07:02:46.225	2022-07-22 07:02:46.228	5	4	\N
114	2022-07-22 07:02:46.225	2022-07-22 07:02:46.228	4	3	\N
115	2022-07-22 08:38:15.885	2022-07-22 08:38:15.887	4	3	\N
116	2022-07-22 08:38:15.885	2022-07-22 08:38:15.887	3	3	\N
117	2022-07-22 08:38:15.885	2022-07-22 08:38:15.887	2	3	\N
\.


--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: yaquxqppzssjpg
--

COPY public."Category" (id, name, "createdAt", "updatedAt", icon) FROM stdin;
1	vegetables	2022-05-17 11:56:18.189	2022-06-24 10:37:51.326	carrot
2	fruits	2022-05-17 12:39:20.616	2022-06-24 10:38:04.163	apple
\.


--
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: yaquxqppzssjpg
--

COPY public."Order" (id, "createdAt", "updatedAt", status, "userId", "deliveryAddress") FROM stdin;
2	2022-06-17 09:46:23.627	2022-06-17 09:46:23.63	NEW_ORDER	\N	\N
4	2022-06-17 09:54:15.758	2022-06-17 09:54:15.76	NEW_ORDER	\N	\N
5	2022-06-17 09:55:30.873	2022-06-17 09:55:30.874	NEW_ORDER	\N	\N
1	2022-06-17 06:36:58.284	2022-06-17 10:02:38.733	CHANGED	\N	\N
6	2022-06-17 10:08:19.985	2022-06-17 10:08:19.986	NEW_ORDER_NOT_PAID	\N	\N
7	2022-06-17 10:08:36.296	2022-06-17 10:08:36.297	NEW_ORDERRR	\N	\N
8	2022-06-17 10:09:56.964	2022-06-17 10:09:56.965	NEW_ORDER	\N	\N
9	2022-06-17 10:10:08.6	2022-06-17 10:10:08.601	NEW_ORDER_NOT_PAID	\N	\N
10	2022-06-17 10:19:56.463	2022-06-17 10:19:56.466	NEW_SEND	\N	\N
11	2022-06-17 10:22:53.064	2022-06-17 10:22:53.065	NEW_SEND	\N	\N
12	2022-06-17 10:56:27.902	2022-06-17 10:56:27.903	NEW_SEND	\N	\N
13	2022-06-17 11:05:47.577	2022-06-17 11:05:47.578	NEW_SEND	\N	\N
14	2022-07-06 08:41:58.219	2022-07-06 08:41:58.222	NEW_SEND	\N	\N
15	2022-07-07 04:42:43.361	2022-07-07 04:42:43.365	NEW_SEND	\N	{"city": "Poznan", "name": "Jan Więcławski", "email": "wojtekwieclawski@gmail.com", "address": "new address", "country": "Poland", "address2": null, "postcode": "11111", "phoneNumber": "+48123123123"}
16	2022-07-07 04:50:48.161	2022-07-07 04:50:48.162	NEW_SEND	cl3cpdb6x00063e096e6d2jwy	{"city": "Poznan", "name": "Wojciech Więcławski", "email": "wojtekwieclawski@gmail.com", "address": "newnew address", "country": "Poland", "address2": null, "postcode": "66-666", "phoneNumber": "+48123123123"}
18	2022-07-07 07:53:21.837	2022-07-07 07:53:21.838	NEW_SEND	cl3cpdb6x00063e096e6d2jwy	{"city": "Poznan", "name": "Wojciech Więcławski", "email": "wojtekwieclawski@gmail.com", "address": "changed address", "country": "Poland", "address2": null, "postcode": "66-666", "phoneNumber": "+48123123123"}
19	2022-07-07 07:58:53.036	2022-07-07 07:58:53.037	NEW_SEND	cl3cpdb6x00063e096e6d2jwy	{"city": "Poznan", "name": "Wojciech Więcławski", "email": "wojtekwieclawski@gmail.com", "address": "changed address", "country": "Poland", "address2": null, "postcode": "66-666", "phoneNumber": "+48123123123"}
20	2022-07-07 08:02:39.487	2022-07-07 08:02:39.488	NEW_SEND	cl3cpdb6x00063e096e6d2jwy	{"city": "Poznan", "name": "Wojciech Więcławski", "email": "wojtekwieclawski@gmail.com", "address": "changed address", "country": "Poland", "address2": null, "postcode": "66-666", "phoneNumber": "+48123123123"}
21	2022-07-12 09:49:17.304	2022-07-12 09:49:17.307	NEW_SEND	cl3cpdb6x00063e096e6d2jwy	{"city": "Poznan", "name": "Wojciech Więcławski", "email": "wojtekwieclawski@gmail.com", "address": "changed address", "country": "Poland", "address2": null, "postcode": "66-666", "phoneNumber": "+48123123123"}
22	2022-07-12 09:50:05.262	2022-07-12 09:50:05.263	NEW_SEND	cl3cpdb6x00063e096e6d2jwy	{"city": "Poznan", "name": "Wojciech Więcławski", "email": "wojtekwieclawski@gmail.com", "address": "changed address", "country": "Poland", "address2": null, "postcode": "66-666", "phoneNumber": "+48123123123"}
23	2022-07-12 10:48:00.371	2022-07-12 10:48:00.374	NEW_SEND	cl3cpdb6x00063e096e6d2jwy	{"city": "Poznan", "name": "Wojciech Więcławski", "email": "wojtekwieclawski@gmail.com", "address": "Testowa 22", "country": "Poland", "address2": null, "postcode": "66-666", "phoneNumber": "+48123123123"}
24	2022-07-12 10:51:58.975	2022-07-12 10:51:58.976	NEW_SEND	cl3cpdb6x00063e096e6d2jwy	{"city": "Poznan", "name": "Wojciech Więcławski", "email": "wojtekwieclawski@gmail.com", "address": "changed address", "country": "Poland", "address2": null, "postcode": "66-666", "phoneNumber": "+48123123123"}
25	2022-07-12 10:56:22.287	2022-07-12 10:56:22.288	NEW_SEND	cl3cpdb6x00063e096e6d2jwy	{"city": "Poznan", "name": "Wojciech Więcławski", "email": "wojtekwieclawski@gmail.com", "address": "changed address", "country": "Poland", "address2": null, "postcode": "66-666", "phoneNumber": "+48123123123"}
26	2022-07-12 10:57:39.734	2022-07-12 10:57:39.735	NEW_SEND	cl3cpdb6x00063e096e6d2jwy	{"city": "Poznan", "name": "Wojciech Więcławski", "email": "wojtekwieclawski@gmail.com", "address": "changed address", "country": "Poland", "address2": null, "postcode": "66-666", "phoneNumber": "+48123123123"}
27	2022-07-12 11:00:04.455	2022-07-12 11:00:04.456	NEW_SEND	cl3cpdb6x00063e096e6d2jwy	{"city": "Poznan", "name": "Wojciech Więcławski", "email": "wojtekwieclawski@gmail.com", "address": "changed address", "country": "Poland", "address2": null, "postcode": "66-666", "phoneNumber": "+48123123123"}
28	2022-07-12 11:06:12.167	2022-07-12 11:06:12.167	NEW_SEND	cl3cpdb6x00063e096e6d2jwy	{"city": "Poznan", "name": "Wojciech Więcławski", "email": "wojtekwieclawski@gmail.com", "address": "changed address", "country": "Poland", "address2": null, "postcode": "66-666", "phoneNumber": "+48123123123"}
29	2022-07-13 01:53:21.432	2022-07-13 01:53:21.433	NEW_SEND	\N	{}
30	2022-07-13 01:59:15.585	2022-07-13 01:59:15.587	NEW_SEND	\N	{}
31	2022-07-13 02:00:22.17	2022-07-13 02:00:22.171	NEW_SEND	\N	{}
32	2022-07-13 02:26:49.576	2022-07-13 02:26:49.577	NEW_SEND	\N	{}
33	2022-07-13 02:29:09.217	2022-07-13 02:29:09.218	NEW_SEND	\N	{}
34	2022-07-13 02:32:44.909	2022-07-13 02:32:44.91	NEW_SEND	\N	{}
35	2022-07-13 07:16:42.842	2022-07-13 07:16:42.844	NEW_SEND	\N	{}
36	2022-07-13 07:23:34.78	2022-07-13 07:23:34.781	NEW_SEND	\N	{}
37	2022-07-13 07:26:05.154	2022-07-13 07:26:05.155	NEW_SEND	\N	{}
38	2022-07-13 07:37:36.693	2022-07-13 07:37:36.694	NEW_SEND	\N	{}
39	2022-07-13 07:39:47.901	2022-07-13 07:39:47.903	NEW_SEND	\N	{}
40	2022-07-13 07:41:04.385	2022-07-13 07:41:04.386	NEW_SEND	\N	{}
41	2022-07-13 07:43:04.358	2022-07-13 07:43:04.36	NEW_SEND	\N	{}
42	2022-07-13 07:45:26.288	2022-07-13 07:45:26.289	NEW_SEND	\N	{}
43	2022-07-13 07:46:34.948	2022-07-13 07:46:34.949	NEW_SEND	\N	{}
44	2022-07-13 07:47:48.331	2022-07-13 07:47:48.332	NEW_SEND	\N	{}
45	2022-07-13 07:49:18.384	2022-07-13 07:49:18.385	NEW_SEND	\N	{}
46	2022-07-13 07:51:13.43	2022-07-13 07:51:13.431	NEW_SEND	\N	{}
47	2022-07-13 08:00:22.621	2022-07-13 08:00:22.622	NEW_SEND	\N	{}
48	2022-07-13 08:01:14.288	2022-07-13 08:01:14.289	NEW_SEND	\N	{}
49	2022-07-13 08:09:14.534	2022-07-13 08:09:14.535	NEW_SEND	\N	{}
50	2022-07-13 08:10:43.198	2022-07-13 08:10:43.199	NEW_SEND	\N	{}
51	2022-07-13 08:11:28.099	2022-07-13 08:11:28.1	NEW_SEND	\N	{}
52	2022-07-13 08:12:51.546	2022-07-13 08:12:51.547	NEW_SEND	\N	{}
53	2022-07-13 08:13:51.733	2022-07-13 08:13:51.734	NEW_SEND	\N	{}
54	2022-07-13 08:16:12.499	2022-07-13 08:16:12.5	NEW_SEND	\N	{}
55	2022-07-13 08:17:52.657	2022-07-13 08:17:52.659	NEW_SEND	\N	{}
56	2022-07-13 08:19:23.23	2022-07-13 08:19:23.231	NEW_SEND	\N	{}
57	2022-07-13 08:26:52.555	2022-07-13 08:26:52.556	NEW_SEND	\N	{}
58	2022-07-13 08:27:27.976	2022-07-13 08:27:27.976	NEW_SEND	\N	{}
59	2022-07-13 08:49:56.816	2022-07-13 08:49:56.817	NEW_SEND	\N	{}
60	2022-07-13 08:56:44.086	2022-07-13 08:56:44.087	NEW_SEND	\N	{}
61	2022-07-13 08:58:42.032	2022-07-13 08:58:42.033	NEW_SEND	\N	{}
62	2022-07-13 09:01:45.676	2022-07-13 09:01:45.677	NEW_SEND	\N	{}
63	2022-07-13 09:09:48.53	2022-07-13 09:10:24.112	PAID	\N	{}
64	2022-07-22 07:02:46.224	2022-07-22 07:02:46.227	NEW_SEND	\N	{}
65	2022-07-22 08:38:15.885	2022-07-22 08:38:15.887	NEW_SEND	\N	{}
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: yaquxqppzssjpg
--

COPY public."Product" (id, "createdAt", "updatedAt", name, description, published, "stockCount", "mainPhotoUrl", available, slug, price, unit) FROM stdin;
25	2022-09-06 12:55:41.76	2022-09-06 12:55:41.761	Blueberru	lorem lorem loremlorem lorem loremlorem lorem loremlorem lorem loremlorem lorem loremlorem lorem loremlorem lorem loremlorem lorem lorem	t	5	https://veggies-and-fruits.imgix.net/test-category/blueberry.jpeg-20220906T144707.jpg	t	blueberru	1.22	1 kg bag
26	2022-09-06 13:56:51.692	2022-09-06 13:56:51.693	Pinaple	The pineapple[2][3] (Ananas comosus) is a tropical plant with an edible fruit; it is the most economically significant plant in the family Bromeliaceae.[4] The pineapple is indigenous to South America, where it has been cultivated for many centuries. The introduction of the pineapple to Europe in the 17th century made it a significant cultural icon of luxury. Since the 1820s, pineapple has been commercially grown in greenhouses and many tropical plantations.	t	100	https://veggies-and-fruits.imgix.net/test-category/pinaple.jpeg-20220906T155509.jpg	t	pinaple	3.33	1 pcs
3	2022-05-18 09:50:15.563	2022-06-23 10:43:19.271	Apple	lorem ipsum lorem ipsum lorem ipsum lorem ipsum	t	0	https://veggies-and-fruits.imgix.net/fruits/apple-20220606T194247.jpg	f	apple	2.22	1 kg
4	2022-05-19 06:02:03.492	2022-06-23 10:43:19.273	Tomato	lorem ipsum lorem ipsum lorem ipsum lorem ipsum	t	0	https://veggies-and-fruits.imgix.net/vegetables/tomato.jpeg	f	tomato	5.3	1 pc
5	2022-05-19 06:08:02.012	2022-06-23 10:43:19.274	Potato	lorem ipsum lorem ipsum lorem ipsum lorem ipsum	t	0	https://veggies-and-fruits.imgix.net/vegetables/potato-20220606T194340.jpg	f	potato	1.23	Bag of 500g
2	2022-05-17 12:40:34.152	2022-06-23 10:43:19.274	Banana	From Wolof banaana, via Spanish or Portuguese, of unknown origin, but potentially from Arabic بَنَان‎ (banān, “fingertip”)[1]. In reference to well-assimilated East Asians, derived from the fruit's exotic origins and the slur that they are "yellow on the outside, white on the inside".	t	5	https://veggies-and-fruits.imgix.net/fruits/banana2.jpeg	t	banana	7.66	5 pc
1	2022-05-17 11:57:33.763	2022-06-23 10:43:19.274	Carrot	The carrot (Daucus carota subsp. sativus) is a root vegetable, typically orange in color, though purple, black, red, white, and yellow cultivars exist,[2][3][4] all of which are domesticated forms of the wild carrot, Daucus carota, native to Europe and Southwestern Asia. The plant probably originated in Persia and was originally cultivated for its leaves and seeds. The most commonly eaten part of the plant is the taproot, although the stems and leaves are also eaten. The domestic carrot has been selectively bred for its enlarged, more palatable, less woody-textured taproot.	t	3	https://veggies-and-fruits.imgix.net/vegetables/carrot-20220606T193819.jpg	t	carrot	3.21	1 pc
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: yaquxqppzssjpg
--

COPY public."User" (id, email, name, address, city, country, "createdAt", "phoneNumber", "updatedAt", "emailVerified", image, role, address2, postcode) FROM stdin;
cl3crst000006rh09kubuji54	wojciech.wieclawski7@gmail.com	Wojciech Więcławski	\N	\N	\N	2022-05-19 08:48:00.72	\N	2022-05-19 08:48:00.721	\N	https://lh3.googleusercontent.com/a/AATXAJyN1V3-Zd-l_-lFdnM-JvCEDLX7V8tmv6kNyn36=s96-c	USER	\N	\N
cl3cs1dbu0099rh09hqro81gr	wiwotestowy@gmail.com	Jan Testowy	\N	\N	\N	2022-05-19 08:54:40.314	\N	2022-05-19 08:54:40.315	\N	https://lh3.googleusercontent.com/a/AATXAJwp4Ie4OOFO-tlCHVA-TC9Ex-ioVI-xIvljiYoi=s96-c	USER	\N	\N
cl4rxtzcm0002fj096otpaf6r	admin@example.com	A Admin	\N	\N	\N	2022-06-24 04:13:08.278	\N	2022-06-24 04:13:08.279	\N	\N	USER	\N	\N
cl3cpdb6x00063e096e6d2jwy	wojtekwieclawski@gmail.com	Wojciech Więcławski	changed address	Poznan	Poland	2022-05-19 07:39:58.57	+48123123123	2022-06-24 08:45:50.999	\N	https://lh3.googleusercontent.com/a/AATXAJyDsaZHOmDeEfuzpw_j0nyt2QZMHnMyYF8LsOwe=s96-c	ADMIN	\N	66-666
\.


--
-- Data for Name: _CartItemToOrder; Type: TABLE DATA; Schema: public; Owner: yaquxqppzssjpg
--

COPY public."_CartItemToOrder" ("A", "B") FROM stdin;
1	2
3	4
4	5
5	6
6	7
7	8
8	9
9	10
10	10
11	10
12	10
13	11
14	11
15	11
16	12
17	12
18	12
19	13
20	13
21	13
22	14
23	14
24	18
25	18
26	18
27	18
28	19
29	19
30	19
31	19
32	20
33	20
34	20
35	20
36	21
37	21
38	21
39	23
40	23
41	23
42	24
43	24
44	24
45	25
46	25
47	25
48	26
49	26
50	27
51	27
52	28
53	28
54	35
55	35
56	36
57	36
58	37
59	37
60	38
61	38
62	39
63	39
64	40
65	40
66	41
67	41
68	42
69	42
70	43
71	43
72	44
73	44
74	45
75	45
76	46
77	46
78	47
79	47
80	48
81	48
82	49
83	49
84	50
85	50
86	51
87	51
88	52
89	52
90	53
91	53
92	54
93	54
94	55
95	55
96	56
97	56
98	57
99	57
100	58
101	58
102	59
103	59
104	60
105	60
106	61
107	61
108	62
109	62
110	63
111	63
112	63
113	64
114	64
115	65
116	65
117	65
\.


--
-- Data for Name: _CategoryToProduct; Type: TABLE DATA; Schema: public; Owner: yaquxqppzssjpg
--

COPY public."_CategoryToProduct" ("A", "B") FROM stdin;
1	1
2	2
1	3
1	4
2	25
2	26
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: yaquxqppzssjpg
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
56c3aaa5-33ca-4d3c-8032-1c2881630dac	caf9858580fd1e9314936e7afd0c8655b3334b576b114e13c96896905519f8f5	2022-05-17 11:33:23.520162+00	20220517113317_init	\N	\N	2022-05-17 11:33:21.905026+00	1
ccc06e64-0c5d-47ad-aeab-f68e7f84d54c	59dab18439ad3d258db671d1405b3dfb2001342c82683a6fa2250601a4fa45d8	2022-05-17 11:55:31.901161+00	20220517115525_first_db_setup	\N	\N	2022-05-17 11:55:30.672637+00	1
939fddad-76ba-4f57-a49b-f424c4a00cfe	47125c255d9670daef15e87fa7bfc4770d3320c02b29f98b88903b3dd60831d1	2022-06-23 10:41:47.048425+00	20220623104140_product	\N	\N	2022-06-23 10:41:45.71904+00	1
ce008929-3d2e-4669-8011-6dc26230fc89	97556b048ba4d90e524aa89c09cdaa2011663560334a5f43b627da6787d6432c	2022-05-19 07:23:55.869211+00	20220519072348_nextauth	\N	\N	2022-05-19 07:23:53.249064+00	1
d8c3ac7d-2ebb-4735-a34f-b542df4ba129	bb42d1d65a438a3c28d66f744d902567458d8747f6a9d87193038d48588f6d1f	2022-05-19 07:39:33.41419+00	20220519073927_nextauth_2	\N	\N	2022-05-19 07:39:32.123371+00	1
6896e413-04fd-496d-915d-2489796e022b	03e59483ab2df84961dd0b0eadcd3b08b7e79708a399358446204919fec49edb	2022-05-19 07:52:14.007757+00	20220519075207_nextauth_user_role	\N	\N	2022-05-19 07:52:12.904792+00	1
1b66dbf6-16ca-4098-9fb6-8ebb549ba3c4	f968f3fa37cc6fc070335fd3ff0b038bb192197a734c5770daaf7773785c6a31	2022-06-24 10:36:00.841487+00	20220624103553_category	\N	\N	2022-06-24 10:35:59.203262+00	1
4c958d2c-3812-4c92-97c9-929a6e18a6bf	f7bc0cad4194e42c58ccda4b576de05f6017f2ec32afa66d54a8f465fe28a776	2022-06-04 09:42:48.45088+00	20220604094241_adding	\N	\N	2022-06-04 09:42:47.108746+00	1
b444406f-fd91-464c-9efd-2325ecac793f	67fe523861c3df66b978dd40b31a5090e100fc804ae8a0fd9ba8284bf6dd9879	2022-06-04 09:51:46.196122+00	20220604095139_slug	\N	\N	2022-06-04 09:51:44.85657+00	1
22fe59df-5501-474d-af4d-1906bf3ecd64	d04c6859f648f7905fa6417f3ac676c6b0c5b11204215e005d09eb6ab7fd533d	2022-06-13 06:28:18.295881+00	20220613062810_adding	\N	\N	2022-06-13 06:28:16.786005+00	1
c865b33c-07bf-48c1-af35-53846b032886	9deaabc050b96d6eeae6c72cb79568570b33d3a54dcf257084da2738f5ec1af2	2022-07-07 04:06:18.053928+00	20220707040611_delivery_address	\N	\N	2022-07-07 04:06:16.550226+00	1
f13089f5-e591-4186-baaf-8359fefed5aa	907e3f3fa89b379f4bf49388b746e521ec151dffbcb56c23e44d83c6015714c2	2022-06-17 05:37:06.367917+00	20220617053658_no	\N	\N	2022-06-17 05:37:04.029204+00	1
48644d5f-baa4-4036-938b-f095eda89fa8	d2ca76c3eaa55e26ce9eebd7a0c43bc8e37e921d83bbeb6758fa0ae61f5a082a	2022-06-17 05:37:59.344136+00	20220617053752_no	\N	\N	2022-06-17 05:37:57.836051+00	1
4532d057-d739-4cdf-a8c8-5a9c19c869c2	6b68a3588e8283e253295b62b5e911baf20fae8950f4891dfe84f844ea6f9f61	2022-06-17 06:42:05.509617+00	20220617064158_no	\N	\N	2022-06-17 06:42:04.094455+00	1
aee79e20-59bc-437c-a729-57501c0ffb81	ff346672d5c17257dbe778552672d7a84f03216f8fc9828151e1c741478871cf	2022-07-07 07:52:57.139377+00	20220707075250_user	\N	\N	2022-07-07 07:52:55.859529+00	1
654213dc-0bac-4731-b39f-10e4c0793ae3	7e47efe4e8fb6b9104f71b6c64a0d3d3fc81d0e6279ddea9e93fff362e565a48	2022-06-17 09:53:52.937967+00	20220617095345_cart	\N	\N	2022-06-17 09:53:51.375363+00	1
11357b67-3606-4970-b506-1bfe88687148	28a764f7f6bd571dd5e43dd75aecac7890babcbab5674d5d1372a37f5a64062e	2022-06-22 08:38:35.784389+00	20220622083828_simplifying	\N	\N	2022-06-22 08:38:34.168973+00	1
de1dfb3e-8f6c-4609-aadb-3c57a0527dce	98ed141861860b904315b952bd8b1dfd6d2c9b3858f8265854f5d19dfe7e2ff2	2022-06-23 03:00:39.858655+00	20220623030034_user	\N	\N	2022-06-23 03:00:38.780014+00	1
\.


--
-- Name: CartItem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yaquxqppzssjpg
--

SELECT pg_catalog.setval('public."CartItem_id_seq"', 117, true);


--
-- Name: Cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yaquxqppzssjpg
--

SELECT pg_catalog.setval('public."Cart_id_seq"', 1, false);


--
-- Name: Category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yaquxqppzssjpg
--

SELECT pg_catalog.setval('public."Category_id_seq"', 3, true);


--
-- Name: Order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yaquxqppzssjpg
--

SELECT pg_catalog.setval('public."Order_id_seq"', 65, true);


--
-- Name: Product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yaquxqppzssjpg
--

SELECT pg_catalog.setval('public."Product_id_seq"', 26, true);


--
-- Name: CartItem CartItem_pkey; Type: CONSTRAINT; Schema: public; Owner: yaquxqppzssjpg
--

ALTER TABLE ONLY public."CartItem"
    ADD CONSTRAINT "CartItem_pkey" PRIMARY KEY (id);


--
-- Name: Cart Cart_pkey; Type: CONSTRAINT; Schema: public; Owner: yaquxqppzssjpg
--

ALTER TABLE ONLY public."Cart"
    ADD CONSTRAINT "Cart_pkey" PRIMARY KEY (id);


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: yaquxqppzssjpg
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: yaquxqppzssjpg
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: yaquxqppzssjpg
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: yaquxqppzssjpg
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: yaquxqppzssjpg
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: CartItem_cartId_key; Type: INDEX; Schema: public; Owner: yaquxqppzssjpg
--

CREATE UNIQUE INDEX "CartItem_cartId_key" ON public."CartItem" USING btree ("cartId");


--
-- Name: Cart_userId_key; Type: INDEX; Schema: public; Owner: yaquxqppzssjpg
--

CREATE UNIQUE INDEX "Cart_userId_key" ON public."Cart" USING btree ("userId");


--
-- Name: Product_slug_key; Type: INDEX; Schema: public; Owner: yaquxqppzssjpg
--

CREATE UNIQUE INDEX "Product_slug_key" ON public."Product" USING btree (slug);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: yaquxqppzssjpg
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: _CartItemToOrder_AB_unique; Type: INDEX; Schema: public; Owner: yaquxqppzssjpg
--

CREATE UNIQUE INDEX "_CartItemToOrder_AB_unique" ON public."_CartItemToOrder" USING btree ("A", "B");


--
-- Name: _CartItemToOrder_B_index; Type: INDEX; Schema: public; Owner: yaquxqppzssjpg
--

CREATE INDEX "_CartItemToOrder_B_index" ON public."_CartItemToOrder" USING btree ("B");


--
-- Name: _CategoryToProduct_AB_unique; Type: INDEX; Schema: public; Owner: yaquxqppzssjpg
--

CREATE UNIQUE INDEX "_CategoryToProduct_AB_unique" ON public."_CategoryToProduct" USING btree ("A", "B");


--
-- Name: _CategoryToProduct_B_index; Type: INDEX; Schema: public; Owner: yaquxqppzssjpg
--

CREATE INDEX "_CategoryToProduct_B_index" ON public."_CategoryToProduct" USING btree ("B");


--
-- Name: CartItem CartItem_cartId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: yaquxqppzssjpg
--

ALTER TABLE ONLY public."CartItem"
    ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES public."Cart"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: CartItem CartItem_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: yaquxqppzssjpg
--

ALTER TABLE ONLY public."CartItem"
    ADD CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Cart Cart_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: yaquxqppzssjpg
--

ALTER TABLE ONLY public."Cart"
    ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Order Order_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: yaquxqppzssjpg
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: _CartItemToOrder _CartItemToOrder_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: yaquxqppzssjpg
--

ALTER TABLE ONLY public."_CartItemToOrder"
    ADD CONSTRAINT "_CartItemToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES public."CartItem"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CartItemToOrder _CartItemToOrder_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: yaquxqppzssjpg
--

ALTER TABLE ONLY public."_CartItemToOrder"
    ADD CONSTRAINT "_CartItemToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CategoryToProduct _CategoryToProduct_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: yaquxqppzssjpg
--

ALTER TABLE ONLY public."_CategoryToProduct"
    ADD CONSTRAINT "_CategoryToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CategoryToProduct _CategoryToProduct_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: yaquxqppzssjpg
--

ALTER TABLE ONLY public."_CategoryToProduct"
    ADD CONSTRAINT "_CategoryToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA heroku_ext; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA heroku_ext TO yaquxqppzssjpg WITH GRANT OPTION;


--
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON LANGUAGE plpgsql TO yaquxqppzssjpg;


--
-- PostgreSQL database dump complete
--

