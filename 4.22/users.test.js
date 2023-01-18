const bcrypt = require('bcrypt')
const listHelper = require('./utils/list_helper')
const supertest = require('supertest')
const app = require('./app')
const User = require('./models/user')

const api = supertest(app)

const saltRounds = 10

beforeEach(async () => {
    const initialUsers = [{
        username: 'admin',
        name: 'Adam',
        passwordHash: await bcrypt.hash('admin', saltRounds)
    },
    {
        username: 'user',
        name: 'Eva',
        passwordHash: await bcrypt.hash('__Ev4UsesSmartPassw0rds!', saltRounds)
    }]
    await User.deleteMany({})
    let userObject = new User(initialUsers[0])
    await userObject.save()
    userObject = new User(initialUsers[1])
    await userObject.save()
})

describe('API user tests', () => {
    test('users are returned as json', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('cant create a user with a username already used', async () => {
        const newUser = {
            username: 'admin',
            name: 'Adam',
            passwordHash: await bcrypt.hash('admin', saltRounds)
        }
        await api
            .post('/api/users').send(newUser)
            .expect(403)
    })
})
