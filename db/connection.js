// import { Sequelize, Model, DataTypes } from "sequelize";
import mongoose from 'mongoose'



const ConnectToDB = () => {
  mongoose
    .connect(process.env.DB_CON)
    .then(() => {
      console.log("Connected to db....");
    })
    .catch((error) => {
      console.error('DB connection failed!!!!!', error);
    });
};


export default ConnectToDB

