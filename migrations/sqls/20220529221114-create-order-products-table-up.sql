CREATE TABLE IF NOT EXISTS public.order_products
(
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer
)