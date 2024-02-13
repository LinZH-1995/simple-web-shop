# Simple-Web-Shop
A simple web shop app - made by [Express](https://expressjs.com/) on [Node.js](https://nodejs.org/en/)

## Built With
* [VS Code](https://code.visualstudio.com/) - version 1.78.2
* [Node.js](https://nodejs.org/en/) - version 18.14.2
* [Nodemon](https://github.com/remy/nodemon) - version 2.0.22
* [Express](https://github.com/expressjs/express) - version 4.18.2
* [Express-Hanlebars](https://github.com/express-handlebars/express-handlebars) - version 7.0.7
* [Method-Override](https://github.com/expressjs/method-override#readme) - version 3.0.0
* [Express-Session](https://github.com/expressjs/session#readme) - version 1.17.3
* [Dotenv](https://github.com/motdotla/dotenv#readme) - version 16.0.3
* [Mysql2](https://github.com/sidorares/node-mysql2#readme) - version 3.3.1
* [Sequelize](https://github.com/sequelize/sequelize) - version 6.31.1
* [Sequelize-Cli](https://github.com/sequelize/cli) - version 6.6.0
* [Faker.js](https://github.com/faker-js/faker) - version 8.0.1
* [Nodemailer](https://github.com/nodemailer/nodemailer) - version 6.9.2

## Getting Started
### Install - Use Terminal

#### 1. Copy project
```
git clone https://github.com/LinZH-1995/simple-web-shop.git
```
#### 2. Open project directory
```
cd simple-web-shop
```
#### 3. Install package
```
npm install
```
#### 4. Import seed data (for test feature)
```
create database simple-web-shop;
```
```
npx sequelize db:migrate
```
```
npx sequelize db:seed:all
```
#### 5. Run the project
```
npm run start   // Node
```
```
npm run dev   // Nodemon
```
#### 6. Connect - [localhost](http://localhost:3000/)
```
http://localhost:3000/
```

## Preview Images
![Home-Page](https://github.com/LinZH-1995/simple-web-shop/blob/main/images/simple-web-shop.png)

![Cart](https://github.com/LinZH-1995/simple-web-shop/blob/main/images/simple-web-shop2.png)

![Orders](https://github.com/LinZH-1995/simple-web-shop/blob/main/images/simple-web-shop3.png)

![Order-ready-pay](https://github.com/LinZH-1995/simple-web-shop/blob/main/images/simple-web-shop4.png)

![NewebPay-Page](https://github.com/LinZH-1995/simple-web-shop/blob/main/images/simple-web-shop5.png)
