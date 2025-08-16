import bcrypt from 'bcrypt'

const usuarios = [
    {
        nombre: 'Admin',
        email: 'admin@example.com',
        confirmado: 1,
        role: 'admin',
        password: bcrypt.hashSync('secret123', 10)
    },
    {
        nombre: 'Usuario1',
        email: 'user1@example.com',
        confirmado: 1,
        role: 'cliente',
        password: bcrypt.hashSync('pass1234', 10)
    },
    {
        nombre: 'Usuario2',
        email: 'user2@example.com',
        confirmado: 1,
        role: 'cliente',
        password: bcrypt.hashSync('pass1234', 10)
    },
    {
        nombre: 'Usuario3',
        email: 'user3@example.com',
        confirmado: 1,
        role: 'cliente',
        password: bcrypt.hashSync('pass1234', 10)
    },
    {
        nombre: 'Usuario4',
        email: 'user4@example.com',
        confirmado: 1,
        role: 'cliente',
        password: bcrypt.hashSync('pass1234', 10)
    },
    {
        nombre: 'Usuario5',
        email: 'user5@example.com',
        confirmado: 1,
        role: 'cliente',
        password: bcrypt.hashSync('pass1234', 10)
    },
    {
        nombre: 'Usuario6',
        email: 'user6@example.com',
        confirmado: 1,
        role: 'cliente',
        password: bcrypt.hashSync('pass1234', 10)
    },
    {
        nombre: 'Usuario7',
        email: 'user7@example.com',
        confirmado: 1,
        role: 'cliente',
        password: bcrypt.hashSync('pass1234', 10)
    },
    {
        nombre: 'Usuario8',
        email: 'user8@example.com',
        confirmado: 1,
        role: 'cliente',
        password: bcrypt.hashSync('pass1234', 10)
    },
    {
        nombre: 'Usuario9',
        email: 'user9@example.com',
        confirmado: 1,
        role: 'cliente',
        password: bcrypt.hashSync('pass1234', 10)
    }
]

export default usuarios