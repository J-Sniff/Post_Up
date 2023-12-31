const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const controllers = require("./controllers");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const helpers = require("./utils/helpers");
const path = require("path");

const hbs = exphbs.create({ helpers });

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: "Secret",
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(controllers);

// sequelize.sync({ force: true }).then(() => {
//   app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));
// });

app.listen(PORT, () => {
  console.log(`Now listening on PORT ${PORT}`)
  sequelize.sync({ force: true })
});
