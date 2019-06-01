# install
1. npm install

# run
1. node app.js

# description
1. API Server for BookGo run in Heroku

# api endpoint
## User
GET users <br/>
req: {
}<br/>
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
}<br/>

GET users/idname/:idname <br/>
req: {
}<br/>
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
}<br/>

POST users <br/>
req: {
  "idname",
  "password",
  "nickname",
  "name",
  "phonenumber",
  "isAuthenticate"
}<br/>
res: {
  "success"
}<br/>

POST users/login<br/>
req: {
  "idname",
  "password"
}<br/>
res: {
  "nickname"
}<br/>

POST users/authenticate<br/>
req: {
  "idname",
  "isAuthenticate"
}<br/>
res: {
  "success"
}<br/>

DELETE users/:id<br/>
req: {
  "uid"
}<br/>
res: {
  "success"
}<br/>


## Book
GET books<br/>
req: {
}<br/>
res: {
  list of 
  {
    "uid",
    "title",
    "category"
  }
}<br/>

GET books/:uid<br/>
req: {
}<br/>
res: {
  "uid",
  "title",
  "category"
}<br/>

POST books<br/>
req: {
  "title"
}<br/>
res: {
  "success"
}<br/>

DELETE books/:uid<br/>
req: {
}<br/>
res: {
  "success"
}<br/>


## Product
GET products<br/>
req: {
}<br/>
res: {
  list of 
  {
    "uid",
    "book_id",
    "seller_id",
    "price",
    "soldout"
  }
}<br/>

GET products/:book_name<br/>
req: {
}<br/>
res: {
  list of 
  {
    "uid",
    "book_id",
    "seller_id",
    "price",
    "soldout"
  }
}<br/>

POST products<br/>
req: {
  "book_id",
  "seller_id",
  "price"
}<br/>
res: {
  "success"
}<br/>

POST products/soldOut<br/>
req: {
  "uid",
  "soldout"
}<br/>
res: {
  "success"
}<br/>

POST products/changePrice<br/>
req: {
  "uid",
  "price"
}<br/>
res: {
  "success"
}<br/>

DELETE products/:uid<br/>
req: {
}<br/>
res: {
  "success"
}<br/>


## Transaction
GET transactions<br/>
req:{
}<br/>
res: {
  list of 
  {
    "uid",
    "book_id",
    "buyer_id",
    "seller_id",
    "price"
  }
}<br/>

GET transaction/buyer_id/:buyer_id<br/>
req:{
}<br/>
res:{
  list of 
  {
    "uid",
    "book_id",
    "buyer_id",
    "seller_id",
    "price"
  }
}<br/>

GET transaction/seller_id/:seller_id<br/>
req:{
}<br/>
res:{
  list of 
  {
    "uid",
    "book_id",
    "buyer_id",
    "seller_id",
    "price"
  }
}<br/>

## Interest
GET interests<br/>
req:{
}<br/>
res: {
  list of 
  {
    "uid",
    "user_id",
    "book_id"
  }
}<br/>

GET interests/:user_id<br/>
req:{
}<br/>
res: {
  list of 
  {
    "uid",
    "user_id",
    "book_id"
  }
}<br/>

POST interests<br/>
req:{
  "user_id",
  "book_id"
}<br/>
res:{
  "success"
}<br/>

DELETE interests/:user_id/:book_id<br/>
req:{
}<br/>
res:{
  "success"
}<br/>
