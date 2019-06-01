# install
1. npm install

# run
1. node app.js

# description
1. API Server for BookGo run in Heroku

# api endpoint
## User
GET users
req: {
}
res: {
  list of 
  {
    "uid",
    "idname",
    "password",
    "nickname",
    "name",
    "phonenumber",
    "isAuthenticate"
  }
}

GET users/idname/:idname
req: {
}
res: {
  {
    "uid",
    "idname",
    "password",
    "nickname",
    "name",
    "phonenumber",
    "isAuthenticate"
  }
}

POST users
req: {
  "idname",
  "password",
  "nickname",
  "name",
  "phonenumber",
  "isAuthenticate"
}
res: {
  "success"
}

POST users/login
req: {
  "idname",
  "password"
}
res: {
  "nickname"
}

POST users/authenticate
req: {
  "idname",
  "isAuthenticate"
}
res: {
  "success"
}

DELETE users/:id
req: {
  "uid"
}
res: {
  "success"
}


## Book
GET books
req: {
}
res: {
  list of 
  {
    "uid",
    "title",
    "category"
  }
}

GET books/:uid
req: {
}
res: {
  "uid",
  "title",
  "category"
}

POST books
req: {
  "title"
}
res: {
  "success"
}

DELETE books/:uid
req: {
}
res: {
  "success"
}


## Product
GET products
req: {
}
res: {
  list of 
  {
    "uid",
    "book_id",
    "seller_id",
    "price",
    "soldout"
  }
}

GET products/:book_name
req: {
}
res: {
  list of 
  {
    "uid",
    "book_id",
    "seller_id",
    "price",
    "soldout"
  }
}

POST products
req: {
  "book_id",
  "seller_id",
  "price"
}
res: {
  "success"
}

POST products/soldOut
req: {
  "uid",
  "soldout"
}
res: {
  "success"
}

POST products/changePrice
req: {
  "uid",
  "price"
}
res: {
  "success"
}

DELETE products/:uid
req: {
}
res: {
  "success"
}


## Transaction
GET transactions
req:{
}
res: {
  list of 
  {
    "uid",
    "book_id",
    "buyer_id",
    "seller_id",
    "price"
  }
}

GET transaction/buyer_id/:buyer_id
req:{
}
res:{
  list of 
  {
    "uid",
    "book_id",
    "buyer_id",
    "seller_id",
    "price"
  }
}

GET transaction/seller_id/:seller_id
req:{
}
res:{
  list of 
  {
    "uid",
    "book_id",
    "buyer_id",
    "seller_id",
    "price"
  }
}

## Interest
GET interests
req:{
}
res: {
  list of 
  {
    "uid",
    "user_id",
    "book_id"
  }
}

GET interests/:user_id
req:{
}
res: {
  list of 
  {
    "uid",
    "user_id",
    "book_id"
  }
}

POST interests
req:{
  "user_id",
  "book_id"
}
res:{
  "success"
}

DELETE interests/:user_id/:book_id
req:{
}
res:{
  "success"
}
