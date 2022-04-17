const express = require('express')
// sessions
const session = require('express-session')

//require handlebars
const exphbs = require('express-handlebars')

// used to connect front and backend
const path = require('path')

const app = express ()
const PORT = process.env.PORT || 3001;


//databse connection
const sequelize = require('./config/connection')

// express sessions
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const sess = {
    secret: "Session ",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}

app.use(session(sess))

// instantiate handlebars
const hbs =exphbs.create({})
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')


//??
app.use(express.json())
app.use(express.urlencoded({extended:false}))
//connect backend and frontend
// app.use(express.static(path.join( __dirname, 'public')))

// routes
app.use(require('./controllers'))

sequelize.sync({ force: false}).then (() => {
    app.listen(PORT, () => console.log(`LISTENING ON ${PORT}`))
})