const mongoose = require('mongoose');
const {
    MONGO: {
        SRV
    }
} = require('./../helper/settings');

let database;
let userSchema;

const connectDatabase = async () => {
    database = database || mongoose.connect(SRV, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    return database;
}


const createUserSchema = async (database) => {
    if (userSchema) {
        return;
    }

    userSchema = new database.Schema({
        name: String
    }, {
        timestamps: true
    });

    database.model('User', userSchema);
}

const getUSer = async () => {
    const database = await connectDatabase();

    await createUserSchema(database);

    const {
        User
    } = database.models;

    const users = User.find();

    return users;
};

const createUSer = async ({
    name
}) => {
    const database = await connectDatabase();

    await createUserSchema(database);

    const {
        User
    } = database.models;

    const user = new User({
        name
    });

    return user.save();
};

const updateUser = async ({
    id
}, {
    name
}) => {
    const database = await connectDatabase();

    await createUserSchema(database);

    const {
        User
    } = database.models;

    return User.update({
        _id: id
    }, {
        name
    });
};

const deleteUser = async ({
    id
}) => {
    const database = await connectDatabase();

    await createUserSchema(database);

    const {
        User
    } = database.models;

    return User.deleteOne({
        _id: id
    });
};

module.exports = {
    getUSer,
    createUSer,
    updateUser,
    deleteUser
}