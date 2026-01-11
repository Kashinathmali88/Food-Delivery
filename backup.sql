--
-- PostgreSQL database dump
--

\restrict Ag469UbOghjdWQh1LlgEbPp8DUk1xDRmThSRYrfnivAHPxiMTJjpaRV8bEgN00X

-- Dumped from database version 18.1 (Debian 18.1-1.pgdg13+2)
-- Dumped by pg_dump version 18.1 (Debian 18.1-1.pgdg13+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DeliveryStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."DeliveryStatus" AS ENUM (
    'CONFIRMED',
    'PREPARING',
    'SERVED',
    'CANCELLED'
);


ALTER TYPE public."DeliveryStatus" OWNER TO postgres;

--
-- Name: PaymentMethod; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."PaymentMethod" AS ENUM (
    'COD',
    'RAZORPAY'
);


ALTER TYPE public."PaymentMethod" OWNER TO postgres;

--
-- Name: UserRole; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."UserRole" AS ENUM (
    'USER',
    'ADMIN'
);


ALTER TYPE public."UserRole" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Foods; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Foods" (
    id text NOT NULL,
    title text NOT NULL,
    price double precision NOT NULL,
    category text NOT NULL,
    image text NOT NULL,
    description text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Foods" OWNER TO postgres;

--
-- Name: Order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Order" (
    id text NOT NULL,
    "userId" text NOT NULL,
    items jsonb NOT NULL,
    amount double precision NOT NULL,
    address jsonb NOT NULL,
    status public."DeliveryStatus" DEFAULT 'CONFIRMED'::public."DeliveryStatus" NOT NULL,
    payment boolean DEFAULT false NOT NULL,
    "paymentMethod" public."PaymentMethod" DEFAULT 'COD'::public."PaymentMethod" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Order" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role public."UserRole" DEFAULT 'USER'::public."UserRole" NOT NULL,
    "cartItem" jsonb DEFAULT '{}'::jsonb NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
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


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Data for Name: Foods; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Foods" (id, title, price, category, image, description, "createdAt", "updatedAt") FROM stdin;
cmjwo523s000030usg80g7swd	Greek salad	12	Salad	https://ik.imagekit.io/8fivhxqyi/foods/food_1_3USyfU5T9.png	Fresh cucumbers, juicy tomatoes, olives, and feta cheese tossed with olive oil for a light Mediterranean classic.	2026-01-02 09:25:38.918	2026-01-02 09:25:38.918
cmjwo713n000130usymne4bta	Veg salad	18	Salad	https://ik.imagekit.io/8fivhxqyi/foods/food_2_LWg_BmqNc.png	A crunchy mix of seasonal vegetables lightly dressed for a refreshing and healthy bite.	2026-01-02 09:27:10.931	2026-01-02 09:27:10.931
cmjwo88yt000230usjx5ykyc5	Clover Salad	16	Salad	https://ik.imagekit.io/8fivhxqyi/foods/food_3_7n3g-FheO.png	A colorful blend of greens and vegetables with a mild dressing for a wholesome meal.	2026-01-02 09:28:07.781	2026-01-02 09:28:07.781
cmjwo9f2y000330uso5kha6uc	Chicken Salad	24	Salad	https://ik.imagekit.io/8fivhxqyi/foods/food_4_lpNONoOoU.png	Tender grilled chicken mixed with fresh vegetables and creamy dressing for a protein-rich salad.	2026-01-02 09:29:02.362	2026-01-02 09:29:02.362
cmjwoar9i000430us747di7lz	Lasagna Rolls	14	Rolls	https://ik.imagekit.io/8fivhxqyi/foods/food_5_fb_XXoJVc.png	Rolled pasta sheets filled with rich cheese and sauce, baked to perfection.	2026-01-02 09:30:04.806	2026-01-02 09:30:04.806
cmjwobqmb000530ust2dpsso9	Peri Peri Rolls	12	Rolls	https://ik.imagekit.io/8fivhxqyi/foods/food_6_dJFk3EgvC.png	Spicy peri peri filling wrapped in a soft roll for a bold and fiery flavor.	2026-01-02 09:30:50.627	2026-01-02 09:30:50.627
cmjwocrhw000630uscp2fkfmn	Chicken Rolls	12	Rolls	https://ik.imagekit.io/8fivhxqyi/foods/food_7_ZaijvitQ0.png	Juicy chicken wrapped with spices and sauces for a satisfying handheld meal.	2026-01-02 09:31:38.42	2026-01-02 09:31:38.42
cmjwodp85000730uszpxs3ehg	Veg Rolls	15	Rolls	https://ik.imagekit.io/8fivhxqyi/foods/food_8_gErgVlbr0.png	Crispy vegetables rolled in soft bread with flavorful seasonings.	2026-01-02 09:32:22.132	2026-01-02 09:32:22.132
cmjwoezl5000830usdz4nfe40	Ripple Ice Cream	14	Deserts	https://ik.imagekit.io/8fivhxqyi/foods/food_9_vajIa8cZN.png	Creamy ice cream swirled with rich ripples for a smooth and indulgent treat.	2026-01-02 09:33:22.216	2026-01-02 09:33:22.216
cmjwoiadd000a30uskgfypcam	Fruit Ice Cream	22	Deserts	https://ik.imagekit.io/8fivhxqyi/foods/food_10_RMkaVriyN.png	Loaded with real fruit flavors, this ice cream is fresh, sweet, and refreshing.	2026-01-02 09:35:56.161	2026-01-02 09:35:56.161
cmjwokke0000b30us7si8mwoo	Jar Ice Cream	10	Deserts	https://ik.imagekit.io/8fivhxqyi/foods/food_11_8MWAGD8ne.png	Perfectly layered ice cream served in a jar for a delightful dessert experience.	2026-01-02 09:37:42.456	2026-01-02 09:37:42.456
cmjwoljz5000c30uskhnvphnr	Vanilla Ice Cream	12	Deserts	https://ik.imagekit.io/8fivhxqyi/foods/food_12_MEZnYMHRK.png	Classic vanilla ice cream with a smooth texture and rich aroma.	2026-01-02 09:38:28.577	2026-01-02 09:38:28.577
cmjwon41j000d30usus152ln6	Chicken Sandwich	12	Sandwich	https://ik.imagekit.io/8fivhxqyi/foods/food_13_hD_IqnHnZ.png	Grilled chicken layered with fresh veggies and sauce in toasted bread.	2026-01-02 09:39:41.239	2026-01-02 09:39:41.239
cmjwoo72o000e30usde9xi1i8	Vegan Sandwich	18	Sandwich	https://ik.imagekit.io/8fivhxqyi/foods/food_14_tIEHtZfVL.png	Plant-based fillings packed with fresh vegetables and flavorful spreads.	2026-01-02 09:40:31.824	2026-01-02 09:40:31.824
cmjwop1an000f30usjmfjwby2	Grilled Sandwich	16	Sandwich	https://ik.imagekit.io/8fivhxqyi/foods/food_15_zbZSiiWOw.png	Golden grilled bread stuffed with melted cheese and savory fillings.	2026-01-02 09:41:10.99	2026-01-02 09:41:10.99
cmjwoq2oj000g30usnudqyivn	Bread Sandwich	24	Sandwich	https://ik.imagekit.io/8fivhxqyi/foods/food_16_m8gBtrkf2.png	Simple yet tasty sandwich made with soft bread and classic fillings.	2026-01-02 09:41:59.443	2026-01-02 09:41:59.443
cmjwor543000h30usiu2lipo3	Cup Cake	14	Cake	https://ik.imagekit.io/8fivhxqyi/foods/food_17_1fyYDcr4Z.png	Soft and fluffy cupcake topped with sweet frosting for a quick dessert fix.	2026-01-02 09:42:49.25	2026-01-02 09:42:49.25
cmjwos7li000i30usmj5f62uo	Vegan Cake	12	Cake	https://ik.imagekit.io/8fivhxqyi/foods/food_18_TPVU8aRzh.png	Dairy-free and egg-free cake that’s moist, soft, and full of flavor.	2026-01-02 09:43:39.126	2026-01-02 09:43:39.126
cmjwot3qw000j30us51v7j4u8	Butterscotch Cake	20	Cake	https://ik.imagekit.io/8fivhxqyi/foods/food_19_aJJnuI3aH.png	Rich butterscotch flavor layered with creamy frosting and crunchy bits.	2026-01-02 09:44:20.791	2026-01-02 09:44:20.791
cmjwou2ig000k30usvckn0ywm	Sliced Cake	15	Cake	https://ik.imagekit.io/8fivhxqyi/foods/food_20_RTH32L4-2.png	Perfectly sliced cake with a moist texture and balanced sweetness.	2026-01-02 09:45:05.848	2026-01-02 09:45:05.848
cmjwp3g1z000l30usvfij55s6	Garlic Mushroom	14	Pure Veg	https://ik.imagekit.io/8fivhxqyi/foods/food_21_ks0zX3PLGx.png	Sautéed mushrooms infused with garlic and herbs for a savory delight.	2026-01-02 09:52:23.303	2026-01-02 09:52:23.303
cmjwp5u0l000m30usim9x5dvh	Fried Cauliflower	22	Pure Veg	https://ik.imagekit.io/8fivhxqyi/foods/food_22_efs4WMsI6.png	Crispy fried cauliflower coated with spices for a crunchy snack.	2026-01-02 09:54:14.709	2026-01-02 09:54:14.709
cmjwp72th000n30uspsrml334	Mix Veg Pulao	10	Pure Veg	https://ik.imagekit.io/8fivhxqyi/foods/food_23_rFhyT3669.png	Aromatic rice cooked with mixed vegetables and mild spices.	2026-01-02 09:55:12.773	2026-01-02 09:55:12.773
cmjwp9563000o30usfgkv7l1g	Rice Zucchini	24	Pure Veg	https://ik.imagekit.io/8fivhxqyi/foods/food_24_qip8SUv-L.png	Light rice dish cooked with fresh zucchini and subtle seasoning.	2026-01-02 09:56:49.131	2026-01-02 09:56:49.131
cmjwpao0m000p30usb7fb3o69	Cheese Pasta	12	Pasta	https://ik.imagekit.io/8fivhxqyi/foods/food_25_Mtk6vqdho.png	Creamy pasta loaded with melted cheese for ultimate comfort food.	2026-01-02 09:58:00.214	2026-01-02 09:58:00.214
cmjwpbk3v000q30usie0jys0t	Tomato Pasta	18	Pasta	https://ik.imagekit.io/8fivhxqyi/foods/food_26_V-99HabxW.png	Tangy tomato sauce tossed with pasta for a classic Italian taste.	2026-01-02 09:58:41.803	2026-01-02 09:58:41.803
cmjwpce3w000r30uswbs9kmzi	Creamy Pasta	16	Pasta	https://ik.imagekit.io/8fivhxqyi/foods/food_27_AiwdMyqYcH.png	Rich and smooth cream-based pasta with a velvety texture.	2026-01-02 09:59:20.683	2026-01-02 09:59:20.683
cmjwpd4f4000s30us7953c5cy	Chicken Pasta	24	Pasta	https://ik.imagekit.io/8fivhxqyi/foods/food_28_LDtlWSY5w.png	Pasta mixed with tender chicken pieces in a flavorful sauce.	2026-01-02 09:59:54.784	2026-01-02 09:59:54.784
cmjwpeor4000t30us2n0enwij	Buttter Noodles	14	Noodles	https://ik.imagekit.io/8fivhxqyi/foods/food_29_W1-S0yP0p4.png	Soft noodles tossed in butter for a simple yet satisfying dish.	2026-01-02 10:01:07.792	2026-01-02 10:01:07.792
cmjwpfls2000u30usx911alqu	Veg Noodles	12	Noodles	https://ik.imagekit.io/8fivhxqyi/foods/food_30_cvA_B9j0m.png	Stir-fried noodles with fresh vegetables and savory seasoning.	2026-01-02 10:01:50.594	2026-01-02 10:01:50.594
cmjwpgixs000v30us64ytmq9t	Somen Noodles	20	Noodles	https://ik.imagekit.io/8fivhxqyi/foods/food_31_CQ6ti5I2q.png	Light and thin noodles cooked to perfection with delicate flavors.	2026-01-02 10:02:33.568	2026-01-02 10:02:33.568
cmjwphhcc000w30usmkryerzi	Cooked Noodles	15	Noodles	https://ik.imagekit.io/8fivhxqyi/foods/food_32_ORbFdyxbF.png	Perfectly cooked noodles seasoned for a quick and tasty meal.	2026-01-02 10:03:18.155	2026-01-02 10:03:18.155
\.


--
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Order" (id, "userId", items, amount, address, status, payment, "paymentMethod", "createdAt", "updatedAt") FROM stdin;
cmjb8pl0h000034us2q26547n	cmjb3yfsq0002ususcjh25j1h	{"cmjb3y2b50001usus645pj2az": {"qty": 1}}	124.22	{}	PREPARING	f	COD	2025-12-18 09:30:32.992	2025-12-18 10:43:30.327
cmjb56bnf0000esusl3spxsja	cmjb3yfsq0002ususcjh25j1h	{"cmj9v9elu000198us64izsl8s": {"qty": 1}}	124.22	{}	PREPARING	f	COD	2025-12-18 07:51:35.546	2025-12-18 10:45:07.09
cmjb8sit00000m4uslr2ts1m6	cmjb3yfsq0002ususcjh25j1h	{"cmjb3y2b50001usus645pj2az": {"qty": 1}}	124.22	{}	PREPARING	f	COD	2025-12-18 09:32:50.097	2025-12-18 10:45:42.494
cmk2j3trz0000agush14fwbve	cmk12mvgp0000ccusvvttm3kc	{"cmjwo713n000130usymne4bta": {"quantity": 4}, "cmjwoezl5000830usdz4nfe40": {"quantity": 3}, "cmjwoiadd000a30uskgfypcam": {"quantity": 2}, "cmjwoo72o000e30usde9xi1i8": {"quantity": 2}}	199	{"zip": "413216", "city": "Akkalkot", "email": "kashinathmali88@gmail.com", "phone": "07558768123", "state": "Maharashtra", "street": "1/765 Sanjay nagar hasapur road akkalkot", "country": "India", "lastName": "Mali", "firstName": "Kashinath"}	CONFIRMED	f	COD	2026-01-06 11:51:20.447	2026-01-06 11:51:20.447
cmk3nimhc0000ykusuubfq66i	cmk12mvgp0000ccusvvttm3kc	{"cmjwo523s000030usg80g7swd": {"quantity": 2}}	29	{"zip": "413216", "city": "Akkalkot", "email": "kashinathmali88@gmail.com", "phone": "07558768123", "state": "Maharashtra", "street": "1/765 Sanjay nagar hasapur road akkalkot", "country": "India", "lastName": "Mali", "firstName": "Kashinath"}	CONFIRMED	f	COD	2026-01-07 06:42:35.472	2026-01-07 06:42:35.472
cmk3nqj7h0001ykusztlh5ycw	cmk12mvgp0000ccusvvttm3kc	{"cmjwo88yt000230usjx5ykyc5": {"quantity": 2}}	37	{"zip": "413216", "city": "Akkalkot", "email": "kashinathmali88@gmail.com", "phone": "07558768123", "state": "Maharashtra", "street": "1/765 Sanjay nagar hasapur road akkalkot", "country": "India", "lastName": "Mali", "firstName": "Kashinath"}	CONFIRMED	f	COD	2026-01-07 06:48:44.477	2026-01-07 06:48:44.477
cmk3oeg130002ykuswuuk685y	cmk12mvgp0000ccusvvttm3kc	{"cmjwoiadd000a30uskgfypcam": {"quantity": 2}}	49	{"zip": "413216", "city": "Akkalkot", "email": "kashinathmali88@gmail.com", "phone": "07558768123", "state": "Maharashtra", "street": "1/765 Sanjay nagar hasapur road akkalkot", "country": "India", "lastName": "Mali", "firstName": "Kashinath"}	CONFIRMED	f	COD	2026-01-07 07:07:20.102	2026-01-07 07:07:20.102
cmk3ogd2o0003ykusz24qbzfl	cmk12mvgp0000ccusvvttm3kc	{"cmjwot3qw000j30us51v7j4u8": {"quantity": 2}}	45	{"zip": "413216", "city": "Akkalkot", "email": "kashinathmali88@gmail.com", "phone": "07558768123", "state": "Maharashtra", "street": "1/765 Sanjay nagar hasapur road akkalkot", "country": "India", "lastName": "Mali", "firstName": "Kashinath"}	CONFIRMED	f	COD	2026-01-07 07:08:49.584	2026-01-07 07:08:49.584
cmk3oi7330004ykusqtdsnybc	cmk12mvgp0000ccusvvttm3kc	{"cmjwobqmb000530ust2dpsso9": {"quantity": 2}}	29	{"zip": "413216", "city": "Akkalkot", "email": "kashinathmali88@gmail.com", "phone": "07558768123", "state": "Maharashtra", "street": "1/765 Sanjay nagar hasapur road akkalkot", "country": "India", "lastName": "Mali", "firstName": "Kashinath"}	CONFIRMED	f	COD	2026-01-07 07:10:15.135	2026-01-07 07:10:15.135
cmk3oju3y0005ykuseuav7tr5	cmk12mvgp0000ccusvvttm3kc	{"cmjwo523s000030usg80g7swd": {"quantity": 2}}	29	{"zip": "413216", "city": "Akkalkot", "email": "kashinathmali88@gmail.com", "phone": "07558768123", "state": "Maharashtra", "street": "1/765 Sanjay nagar hasapur road akkalkot", "country": "India", "lastName": "Mali", "firstName": "Kashinath"}	CONFIRMED	f	COD	2026-01-07 07:11:31.63	2026-01-07 07:11:31.63
cmk3p0v2m0006ykus45qcxv2z	cmk12mvgp0000ccusvvttm3kc	{"cmjwo523s000030usg80g7swd": {"quantity": 0}, "cmjwoo72o000e30usde9xi1i8": {"quantity": 2}}	41	{"zip": "413216", "city": "Akkalkot", "email": "kashinathmali88@gmail.com", "phone": "07558768123", "state": "Maharashtra", "street": "1/765 Sanjay nagar hasapur road akkalkot", "country": "India", "lastName": "Mali", "firstName": "Kashinath"}	CONFIRMED	f	COD	2026-01-07 07:24:46.03	2026-01-07 07:24:46.03
cmk3vegq40001ewustkfkvep9	cmk3vdnzw0000ewusb6t6vppf	{"cmjwo88yt000230usjx5ykyc5": {"quantity": 1}}	21	{"zip": "413216", "city": "Akkalkot", "email": "kashinathmali88@gmail.com", "phone": "07558768123", "state": "Maharashtra", "street": "1/765 Sanjay nagar hasapur road akkalkot", "country": "India", "lastName": "Mali", "firstName": "Kashinath"}	CONFIRMED	f	COD	2026-01-07 10:23:18.316	2026-01-07 10:23:18.316
cmk85wl1h0000mwusy5w1fk6c	cmk84okbw00006kusqzik2stz	{"cmjwocrhw000630uscp2fkfmn": {"quantity": 1}, "cmjwokke0000b30us7si8mwoo": {"quantity": 1}, "cmjwpce3w000r30uswbs9kmzi": {"quantity": 1}}	43	{"zip": "413216", "city": "Akkalkot", "email": "kashinathmali88@gmail.com", "phone": "07558768123", "state": "Maharashtra", "street": "1/765 Sanjay nagar hasapur road akkalkot", "country": "India", "lastName": "Mali", "firstName": "Kashinath"}	CONFIRMED	f	COD	2026-01-10 10:28:24.58	2026-01-10 10:28:24.58
cmk862zu10000lwuswh7rvr1q	cmk84okbw00006kusqzik2stz	{"cmjwo713n000130usymne4bta": {"quantity": 1}}	23	{"zip": "413216", "city": "Akkalkot", "email": "kashinathmali88@gmail.com", "phone": "07558768123", "state": "Maharashtra", "street": "1/765 Sanjay nagar hasapur road akkalkot", "country": "India", "lastName": "Mali", "firstName": "Kashinath"}	CONFIRMED	f	COD	2026-01-10 10:33:23.689	2026-01-10 10:33:23.689
cmk864m1v0001lwuskk0ed901	cmk84okbw00006kusqzik2stz	{"cmjwoar9i000430us747di7lz": {"quantity": 1}}	19	{"zip": "413216", "city": "Akkalkot", "email": "kashinathmali88@gmail.com", "phone": "07558768123", "state": "Maharashtra", "street": "1/765 Sanjay nagar hasapur road akkalkot", "country": "India", "lastName": "Mali", "firstName": "Kashinath"}	CONFIRMED	f	COD	2026-01-10 10:34:39.138	2026-01-10 10:34:39.138
cmk868lc10002lwusvirec16r	cmk84okbw00006kusqzik2stz	{"cmjwo523s000030usg80g7swd": {"quantity": 1}}	17	{"zip": "413216", "city": "Akkalkot", "email": "kashinathmali88@gmail.com", "phone": "07558768123", "state": "Maharashtra", "street": "1/765 Sanjay nagar hasapur road akkalkot", "country": "India", "lastName": "Mali", "firstName": "Kashinath"}	CONFIRMED	f	COD	2026-01-10 10:37:44.833	2026-01-10 10:37:44.833
cmk86mnzg0003lwuslxp2y6a4	cmk84okbw00006kusqzik2stz	{"cmjwo713n000130usymne4bta": {"quantity": 1}}	23	{"zip": "413216", "city": "Akkalkot", "email": "kashinathmali88@gmail.com", "phone": "07558768123", "state": "Maharashtra", "street": "1/765 Sanjay nagar hasapur road akkalkot", "country": "India", "lastName": "Mali", "firstName": "Kashinath"}	CONFIRMED	f	COD	2026-01-10 10:48:41.452	2026-01-10 10:48:41.452
cmk86p7nx0004lwusk3luvmqi	cmk84okbw00006kusqzik2stz	{"cmjwphhcc000w30usmkryerzi": {"quantity": 2}}	35	{"zip": "", "city": "", "email": "", "phone": "", "state": "", "street": "", "country": "", "lastName": "", "firstName": ""}	CONFIRMED	f	COD	2026-01-10 10:50:40.269	2026-01-10 10:50:40.269
cmk86r0bi0005lwust2e0ljg4	cmk84okbw00006kusqzik2stz	{"cmjwo713n000130usymne4bta": {"quantity": 1}}	23	{"zip": "413216", "city": "Akkalkot", "email": "kashinathmali88@gmail.com", "phone": "07558768123", "state": "Maharashtra", "street": "1/765 Sanjay nagar hasapur road akkalkot", "country": "India", "lastName": "Mali", "firstName": "Kashinath"}	CONFIRMED	f	COD	2026-01-10 10:52:04.062	2026-01-10 10:52:04.062
cmk86tyex0006lwusjyg23i4a	cmk84okbw00006kusqzik2stz	{"cmjwo713n000130usymne4bta": {"quantity": 1}}	23	{"zip": "413216", "city": "Akkalkot", "email": "kashinathmali88@gmail.com", "phone": "07558768123", "state": "Maharashtra", "street": "1/765 Sanjay nagar hasapur road akkalkot", "country": "India", "lastName": "Mali", "firstName": "Kashinath"}	CONFIRMED	f	COD	2026-01-10 10:54:21.561	2026-01-10 10:54:21.561
cmk8734850007lwusbagbzlhw	cmk82xisr00002oustbosvoya	{"cmjwo523s000030usg80g7swd": {"quantity": 1}}	17	{"zip": "413216", "city": "Akkalkot", "email": "kashinathmali88@gmail.com", "phone": "07558768123", "state": "Maharashtra", "street": "1/765 Sanjay nagar hasapur road akkalkot", "country": "India", "lastName": "Mali", "firstName": "Kashinath"}	CONFIRMED	f	COD	2026-01-10 11:01:28.996	2026-01-10 11:01:28.996
cmk874kcf0008lwusri1igjb1	cmk82xisr00002oustbosvoya	{"cmjwo88yt000230usjx5ykyc5": {"quantity": 1}}	21	{"zip": "413216", "city": "Akkalkot", "email": "kashinathmali88@gmail.com", "phone": "07558768123", "state": "Maharashtra", "street": "1/765 Sanjay nagar hasapur road akkalkot", "country": "India", "lastName": "Mali", "firstName": "Kashinath"}	CONFIRMED	f	COD	2026-01-10 11:02:36.543	2026-01-10 11:02:36.543
cmk878et90009lwusnhqaeo29	cmk82xisr00002oustbosvoya	{"cmjwo523s000030usg80g7swd": {"quantity": 1}}	17	{"zip": "413216", "city": "Akkalkot", "email": "kashinathmali88@gmail.com", "phone": "07558768123", "state": "Maharashtra", "street": "1/765 Sanjay nagar hasapur road akkalkot", "country": "India", "lastName": "Mali", "firstName": "Kashinath"}	CONFIRMED	f	COD	2026-01-10 11:05:35.997	2026-01-10 11:05:35.997
cmk879c2m000alwusnn2jjij9	cmk82xisr00002oustbosvoya	{"cmjwoar9i000430us747di7lz": {"quantity": 1}}	19	{"zip": "413216", "city": "Akkalkot", "email": "kashinathmali88@gmail.com", "phone": "07558768123", "state": "Maharashtra", "street": "1/765 Sanjay nagar hasapur road akkalkot", "country": "India", "lastName": "Mali", "firstName": "Kashinath"}	CONFIRMED	f	COD	2026-01-10 11:06:19.102	2026-01-10 11:06:19.102
cmk87eihh0000ewus3vyzjwm6	cmk87dldu000blwus335znqwd	{"cmjwo713n000130usymne4bta": {"quantity": 1}, "cmjwo88yt000230usjx5ykyc5": {"quantity": 1}}	39	{"zip": "413216", "city": "Akkalkot", "email": "kashinathmali88@gmail.com", "phone": "07558768123", "state": "Maharashtra", "street": "1/765 Sanjay nagar hasapur road akkalkot", "country": "India", "lastName": "Mali", "firstName": "Kashinath"}	CONFIRMED	f	COD	2026-01-10 11:10:20.693	2026-01-10 11:10:20.693
cmk9draqa0001cgusiw2dhfn8	cmk9dqpjb0000cgus1c3l6dux	{"cmjwo713n000130usymne4bta": {"quantity": 1}}	23	{"zip": "413216", "city": "Akkalkot", "email": "kashinathmali88@gmail.com", "phone": "07558768123", "state": "Maharashtra", "street": "1/765 Sanjay nagar hasapur road akkalkot", "country": "India", "lastName": "Mali", "firstName": "Kashinath"}	CONFIRMED	f	COD	2026-01-11 06:56:01.042	2026-01-11 06:56:01.042
cmk9eq9eo0002cgusmrk20ncp	cmk9dqpjb0000cgus1c3l6dux	{"cmjwp5u0l000m30usim9x5dvh": {"quantity": 1}}	27	{"city": "Akkalkot", "email": "kashinathmali88@gmail.com", "phone": "7558768123", "state": "Maharashtra", "street": "1/765 Sanjay nagar hasapur road akkalkot", "country": "India", "zipCode": "413216", "lastName": "Mali", "firstName": "Kashinath"}	CONFIRMED	f	COD	2026-01-11 07:23:12.287	2026-01-11 07:23:12.287
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, username, email, password, role, "cartItem", "createdAt", "updatedAt") FROM stdin;
cmjb3vpu90000ususdlgu8gj9	admin	admin@admin.com	$2b$10$jp2zuHfUAVvliTDH075nYe9I2vwkWRcVlaOJqqkdnQAUQ76X1j0Qq	ADMIN	{}	2025-12-18 07:15:21.105	2025-12-18 07:15:21.105
cmk12mvgp0000ccusvvttm3kc	rohitzoon	rohitzoon@gmail.com	$2b$10$McSfI5Tnz.u6.FUt24XAIeNCnNq06Ner1Xx0W2SFzUCeyas4xkQbW	USER	{"cmjwocrhw000630uscp2fkfmn": {"quantity": 1}, "cmjwokke0000b30us7si8mwoo": {"quantity": 2}, "cmjwoo72o000e30usde9xi1i8": {"quantity": 2}}	2026-01-05 11:22:29.445	2026-01-10 08:38:44.276
cmk841elg00012ousvc343rid	baduser	baduser@gamil.com	$2b$10$CnCB.zF4DmhuWWb48MwPpO5VnL.Jdhnf1C8ZyOD.e3tMjU7f3cl0e	USER	{}	2026-01-10 09:36:10.276	2026-01-10 09:36:10.276
cmjh3bg8t00002oustamdthoy	a	a@a.com	$2b$10$5MBpivhOdqPw88KjTPpzO.Khw7ndHZtaQU7MjJDPadb1ftwF3btmS	USER	{}	2025-12-22 11:46:12.602	2025-12-22 11:46:12.602
cmk8433fc00022ousuaabecl3	dkjflsajlk	op@op.com	$2b$10$R/yFTtOamFyt5EVwX3HjA.0nlRr5ii8BAU0tEhH9LMyNSxS6u64w6	USER	{}	2026-01-10 09:37:29.112	2026-01-10 09:37:29.112
cmjgsqr8q0000k0ushjz0yt5y	kashinathmali88	kashinathmali88@gmail.com	$2b$10$vkp2DAodOapq4fRwkY8Wn.S2imfkCE7g4S0S0JvoF2ILWuK.LzW9u	USER	{"cmjb3y2b50001usus645pj2az": {"qty": 2}}	2025-12-22 06:50:10.92	2025-12-23 08:15:34.033
cmk82xisr00002oustbosvoya	newuser	newuser@gmail.com	$2b$10$X65Pe1bz9CbTC5VczstJCe/72h/XF/t1ukHs2rQx4vycJGQCQRnQe	USER	{}	2026-01-10 09:05:09.481	2026-01-10 11:06:19.105
cmk87dldu000blwus335znqwd	appu	appu@gmail.com	$2b$10$5nH/9Ad1pkuALIfMxjbsWOqvpTLSRuPYSscI8Bp9lHx5RtRQE1wse	USER	{}	2026-01-10 11:09:37.794	2026-01-10 11:10:20.699
cmk3vdnzw0000ewusb6t6vppf	user	user@gmail.com	$2b$10$7sBD2ZDg8jOJbM0D4fmTsuJVGyraUoo2lJH0NSzThaanDv0odWwJe	USER	{}	2026-01-07 10:22:41.082	2026-01-07 10:23:18.321
cmk9dqpjb0000cgus1c3l6dux	gooduser	gooduser@gmail.com	$2b$10$rbacHHYJhmYbvOvCpe8ps.l74sRYpWhLHhdSN3Ade7BTqeKrn3oMK	USER	{}	2026-01-11 06:55:33.575	2026-01-11 07:23:12.296
cmk84okbw00006kusqzik2stz	randomx	radnomx@gmail.com	$2b$10$hb8/AXx7OjAQu7tN8wcR3O.76pXtMoC8pajhA30kD2jYl6jWAMzEG	USER	{}	2026-01-10 09:54:10.796	2026-01-10 10:54:21.57
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
4f968e6f-3521-41ba-9ef4-f5a1de8a7f87	3f33d9bf8661d198f4d428e0d401a94043be803d9b862fba56c10515e7c9c243	2025-12-18 07:13:37.76785+00	20251218071337_inital_shcema	\N	\N	2025-12-18 07:13:37.755696+00	1
\.


--
-- Name: Foods Foods_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Foods"
    ADD CONSTRAINT "Foods_pkey" PRIMARY KEY (id);


--
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);


--
-- PostgreSQL database dump complete
--

\unrestrict Ag469UbOghjdWQh1LlgEbPp8DUk1xDRmThSRYrfnivAHPxiMTJjpaRV8bEgN00X

