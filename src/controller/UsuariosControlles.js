const { timeStamp } = require('console');
const mongoose = require ('mongoose');
const express= require('express');
const { stringify } = require('querystring');
const linkMongo = ('mongodb://127.0.0.1:27017/bancoProjeto')

let database;
let userSchema;

const conectDatabase = async () =>{
    database = database || mongoose.connect(`${linkMongo}`,{
        useNewUrlParser : true,
        useUnifiedTopology : true


    });

    return database;
}


const createUserSchema = async (database) =>{
  if (userSchema){
  return;
  }
  userSchema = new database.Schema({
      nome: {
        type :String,
        required: true
      },
      senha: {
        type :String,
        required: true
      },
      email: {
        type :String,
        required: true
      }, 
     
      
     
      
  });
   userSchema.set("timestamps",true)

  database.model('User', userSchema);

}

const createUser = async (body) =>{
   let database = await conectDatabase();

   await createUserSchema(database)
   const {User} = database.models

   const user = new User ({...body});

   user.save()

   return user;
}

const readUsers = async () =>{
  let database = await conectDatabase();

  await createUserSchema(database);
  const {User} = database.models

  const users = User.find();
  
  return users;
}

 const updateUsers = async (params,body) =>{


 }


module.exports = {
  createUser,
  readUsers,
  updateUsers
}