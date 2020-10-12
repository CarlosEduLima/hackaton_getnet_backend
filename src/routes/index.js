const routes = require("express").Router();

routes.use(require('./auth'));
routes.use(require('./users'));
routes.use(require('./users'));
routes.use(require('./contacts'));
routes.use(require('./posts'));
routes.use(require('./shops'));
routes.use(require('./rates'));
routes.use(require('./cart'));
routes.use(require('./likes'));


routes.post("/test", (req, res) => {
  res.json({ success: true, message: "the app is online" });
});

module.exports = routes;