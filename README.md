# tejahang-shop-ui

tejahang-shop-api is an API written in **node with express** for a fictional e-commerce platform 'Tejahang Shop'.  



## Features

- user signup/login
- JWT authentication
- protected routes
- basic admin panel
- API Endpoints
- MVC architecture



# Installation

> **ProTip:** Create the database before doing any API setup. 

#### 1. Clone the repo
```bash
  git clone https://github.com/tejahang/tejahang-shop-api.git
  cd <into-the-project>
```


#### 2. Install dependencies
```bash
  npm install
```
#### 3. Start server
```bash
  npm start
```

#### 4. Setup an '.env' file

Set up an **.env** file in your root directory

```bash

DB_NAME='YOUR-DB-NAME'

DB_USERNAME='YOUR-DB-USERNAME'

DB_PASSWORD='YOUR-DB-PASSWORD'

SECRET='YOUR-SECRET-KEY'

```

#### 5. Create a database and run migrations
> **Note:** Your database name should match the name in DB_NAME
```bash
knex migrate:latest
```


#### 6. Populate 'products' table with data

```bash
- Visit 'localhost:5000/add_product.html' to populate products table. 
```

## API Reference

#### Get all products

```http
  GET /api/products     
```
#### Get all categories

```http
  GET /api/products/categories    
```


#### Add a product

```http
  POST /api/products/add-product
```

#### Search a product

```http
  POST /api/products/search
```

#### Get all transaction list

```http
  GET /api/products/transactionList
```
### Post to a cart

```http
  POST /api/products/cart
```
### Get all cart items

```http
  GET /api/products/getCart
```

### Create a user

```http
  POST /api/users/signup
```
### log a user

```http
  POST /api/users/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `jwt` | `string` | **Required**. Your jwt token |
