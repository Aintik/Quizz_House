const cors = require("cors");
const {frontURL} = require("./env")

const corsOptions = {
  origin: ["http://localhost:3000", "https://yourfrontend.com", frontURL],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

const applyCors = (app) => {
  app.use(cors(corsOptions));
};

module.exports = { corsOptions, applyCors };
