CREATE TABLE public.products
(
    id serial,
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    price integer NOT NULL,
    category character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT product_pkey PRIMARY KEY (id)
);
