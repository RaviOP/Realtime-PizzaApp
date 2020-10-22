const express = require('express')
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')
const InitRoute = require('./routes/web')
const connection = require('./db/mongoose')
const session = require('express-session')
const flash = require('express-flash')
const { urlencoded } = require('express')
const MongoDbStore = require('connect-mongo')(session)
const passport = require('passport')

const app = express()
const PORT = process.env.PORT || 3000
//Session Store
let mongoStore = new MongoDbStore({
    mongooseConnection: connection,
    collection: 'sessions'
})

//Session Config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

//Passport Config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())


app.use(flash())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const viewsPath = path.join(__dirname, 'resources/views')
const publicPath = path.join(__dirname, 'public')

//Global Middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

app.set('view engine', 'ejs')
app.set('views', viewsPath)
app.use(express.static(publicPath))
app.use(expressLayout)

app.use(InitRoute)

app.listen(PORT, () => {
    console.log(`Server is Up and Running On Port ${PORT}`)
})