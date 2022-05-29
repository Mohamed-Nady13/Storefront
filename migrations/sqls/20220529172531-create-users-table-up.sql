CREATE TABLE public.users
(
    id serial,
    firstname character varying(50) COLLATE pg_catalog."default",
    lastname character varying(50) COLLATE pg_catalog."default",
    password character varying(500) COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id)
);
