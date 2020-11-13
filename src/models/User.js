const mongoose = require ('mongoose');
const UserSchema = new mongoose.Schema({
    name:{type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    isoperator : {type: Boolean, required: true, default: false},// aqui colocamos os campos do site 
    createdAt: {type: Date, default: Date.now }
});
const User = mongoose.model('User', UserSchema);
module.exports= User;