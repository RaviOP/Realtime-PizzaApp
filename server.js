const express = require('express')
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

const viewsPath = path.join(__dirname, 'resources/views')

app.set('view engine', 'ejs')
app.set('views', viewsPath)
app.use(expressLayout)

app.listen(PORT, () => {
    console.log(`Server is Up and Running On Port ${PORT}`)
})