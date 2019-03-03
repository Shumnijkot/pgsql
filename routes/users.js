var express = require('express');
var router = express.Router();

import user from "../models/user";
import Sequelize from "sequelize";

const sequelize = new Sequelize("pgsql","postgres","somePassword",
{
    host: "localhost",
    dialect: "postgres",
    protocol:"postgres",
    operatorsAliases: false,
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
});
const usersSchema = products(sequelize, Sequelize);
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


/* GET listing. */
router.get('/', function(req, res, next) {
    usersSchema.findAll().then(users=>{
        res.send(JSON.stringify(users));
        return next();
    }).catch(e=>{
        res.send(e)
    });
});

export default router;