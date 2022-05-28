CREATE TABLE public.orders
(
    id serial,
    product_id integer NOT NULL,
    user_id integer NOT NULL,
    quantity integer NOT NULL,
    status bit(1) NOT NULL,
    CONSTRAINT orders_pkey PRIMARY KEY (id)
);

CREATE TABLE public.products
(
    id serial,
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    price integer NOT NULL,
    category character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT product_pkey PRIMARY KEY (id)
);

CREATE TABLE public.users
(
    id serial,
    firstname character varying(50) COLLATE pg_catalog."default",
    lastname character varying(50) COLLATE pg_catalog."default",
    password character varying(500) COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id)
);

