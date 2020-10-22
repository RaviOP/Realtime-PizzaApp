const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})

mongoose.connection.once('open', () => {
    console.log(`Connection Has Been Made`)
}).on('error', (error) => {
    console.log(`Error is : ${error}`)
})

const connection = mongoose.connection

module.exports = connection
