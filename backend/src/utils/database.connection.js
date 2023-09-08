import mongoose from 'mongoose';
import configs from '../configs/index.js';
import  Logger  from './logger';

let database;

const connect =async () => {
    const uri = configs.DB_CONNECTION_STRING;
    if(database) return;

    mongoose.connect(uri)
    .then((connection) => {
        database = connection;
        Logger.info('Database connection established');
    })
    .catch((error) => {
        Logger.error('Database connection failed');
    })

};

export { connect }