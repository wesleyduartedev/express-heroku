const mongoose = require('mongoose');
const controller = require('./../../../src/controllers/controller');
const mockUserList = require('./../mock/userList.json');

jest.mock('mongoose');
let database;

const SRV = process.env.MONGO_SRV;

describe('Suite de testes unitários do controller', () => {
    beforeAll(() => {
        database = class Mongoose {};

        database.Schema = class {};

        database.model = jest.fn().mockResolvedValue(null);

        database.models = {};
        database.models.User = class {
            constructor(params) {
                this.name = params.name;
            }

            save() {
                return {
                    user: this.name,
                    status: 200,
                    message: 'OK'
                };
            }
        };

        database.models.User.find = jest.fn().mockResolvedValue(mockUserList);
        database.models.User.update = jest.fn().mockResolvedValue(...mockUserList);
        database.models.User.deleteOne = jest.fn().mockResolvedValue({
            status: '200'
        });

        mongoose.connect.mockResolvedValue(database);
    });

    describe('getUSer()', () => {
        it('Deve retornar um usuário do banco de dados', async () => {
            const result = await controller.getUSer();

            expect(mongoose.connect).toHaveBeenCalledTimes(1);
            expect(mongoose.connect).toHaveBeenCalledWith(SRV, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });

            expect(database.model).toHaveBeenCalledTimes(1);
            expect(database.model).toHaveBeenCalledWith('User', new database.Schema());

            expect(database.models.User.find).toHaveBeenCalledTimes(1);
            expect(database.models.User.find).toHaveBeenCalledWith();

            expect(result).toEqual(mockUserList);
        });
    });

    describe('createUSer()', () => {
        it('Deve criar um usuário do banco de dados', async () => {
            const result = await controller.createUSer({
                name: 'fakeData'
            });

            expect(mongoose.connect).toHaveBeenCalledTimes(1);
            expect(mongoose.connect).toHaveBeenCalledWith(SRV, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });

            expect(database.model).toHaveBeenCalledTimes(1);
            expect(database.model).toHaveBeenCalledWith('User', new database.Schema());

            expect(result).toEqual({
                user: 'fakeData',
                status: 200,
                message: 'OK'
            });
        });
    });

    describe('updateUser()', () => {
        it('Deve atualizar um usuário do banco de dados', async () => {
            const result = await controller.updateUser({
                id: 1
            }, {
                name: 'fakeData'
            });

            expect(mongoose.connect).toHaveBeenCalledTimes(1);
            expect(mongoose.connect).toHaveBeenCalledWith(SRV, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });

            expect(database.model).toHaveBeenCalledTimes(1);
            expect(database.model).toHaveBeenCalledWith('User', new database.Schema());

            expect(database.models.User.update).toHaveBeenCalledTimes(1);
            expect(database.models.User.update).toHaveBeenCalledWith({
                _id: 1
            }, {
                name: 'fakeData'
            });

            expect(result).toEqual(...mockUserList);
        });
    });

    describe('deleteUser()', () => {
        it('Deve apagar um usuário do banco de dados', async () => {
            const result = await controller.deleteUser({
                id: 1
            });

            expect(mongoose.connect).toHaveBeenCalledTimes(1);
            expect(mongoose.connect).toHaveBeenCalledWith(SRV, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });

            expect(database.model).toHaveBeenCalledTimes(1);
            expect(database.model).toHaveBeenCalledWith('User', new database.Schema());

            expect(database.models.User.deleteOne).toHaveBeenCalledTimes(1);
            expect(database.models.User.deleteOne).toHaveBeenCalledWith({
                _id: 1
            });

            expect(result).toEqual({
                status: '200'
            });
        });
    });
});