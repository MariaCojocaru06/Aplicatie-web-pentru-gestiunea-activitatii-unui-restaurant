const sequelize = require('../sequelize.js');
const { DataTypes } = require('sequelize');

const Category=sequelize.define('client',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    nume:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    img:{
        type:DataTypes.STRING,
        allowNull:true

    }
})
module.exports=Category