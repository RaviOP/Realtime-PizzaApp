const express = require('express')
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

const viewsPath = path.join(__dirname, 'resources/views')
const publicPath = path.join(__dirname, 'public')

app.set('view engine', 'ejs')
app.set('views', viewsPath)
app.use(express.static(publicPath))
app.use(expressLayout)

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/cart', (req, res) => {
    res.render('customer/cart')
})

app.get('/login', (req, res) => {
    res.render('auth/login')
})

app.get('/register', (req, res) => {
    res.render('auth/register')
})

app.listen(PORT, () => {
    console.log(`Server is Up and Running On Port ${PORT}`)
})