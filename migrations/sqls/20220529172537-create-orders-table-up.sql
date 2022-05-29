CREATE TABLE public.orders
(
    id serial,
    product_id integer NOT NULL,
    user_id integer NOT NULL,
    quantity integer NOT NULL,
    status bit(1) NOT NULL,
    CONSTRAINT orders_pkey PRIMARY KEY (id)
);
