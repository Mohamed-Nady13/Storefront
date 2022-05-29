# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index `(/products)(GET)`
- Show `(/products/:id)(GET)`
- Create [token required] `(/products)(POST)`
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required] `(/users)(GET)`
- Show [token required] `(/users/:id)(GET)`
- Create N[token required] `(/users)(POST)`

#### Orders
- Current Order by user (args: user id)[token required] `(/orders/:id)(GET)`
- [OPTIONAL] Completed Orders by user (args: user id)[token required]
- Add product to order `(/orders/products)(POST)`

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## Tables Schema
### Products
```bash
CREATE TABLE public.products
(
    id serial,
    name character varying(50) NOT NULL,
    price integer NOT NULL,
    category character varying(50),
    CONSTRAINT product_pkey PRIMARY KEY (id)
);
```

### Users
```bash
CREATE TABLE public.users
(
    id serial,
    firstname character varying(50),
    lastname character varying(50),
    password character varying(500),
    CONSTRAINT users_pkey PRIMARY KEY (id)
);
```

### Orders
```bash
CREATE TABLE public.orders
(
    id serial,
    product_id integer NOT NULL,
    user_id integer NOT NULL,
    quantity integer NOT NULL,
    status bit(1) NOT NULL,
    CONSTRAINT orders_pkey PRIMARY KEY (id)
);
```