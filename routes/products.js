import express from 'express';

import products from "../models/products";
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

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const router = express.Router();
const productsSchema = products(sequelize, Sequelize);

/* GET listing. */
router.get('/', function(req, res, next) {
    productsSchema.findAll().then(products=>{
        res.send(JSON.stringify(products));
        return next();
    }).catch(e=>{
        res.send(e)
    });
});

router.get('/:id', function(req, res, next) {
    const { id } = req.params;

    productsSchema.findAll({
        where: {
            id
        }
    }).then(product=>{
        if(!product){
            res.sendStatus(404);
            next();
        }
        res.send(JSON.stringify(product));
        return next();
    }).catch(e=>{
        res.send(e);
    });
});

router.post('/', function(req, res, next) {
    if(!req.body){
        res.sendStatus(500);
    }
    const {name} = req.body;
    
    productsSchema.build(
        {
            name,
            createdAt: Date(),
            updatedAt: Date()
        }
    ).save().then(result=>{
        res.status(200).send(result);
        next();
    }).catch(e=>{
        res.send(e);
        next()
    });

    
});

export default router;