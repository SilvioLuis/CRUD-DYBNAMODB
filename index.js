const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

app.set("port", process.env.PORT || 8000); //3000
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api", require("./src/routes/api.routes.js"));

app.listen(app.get("port"), function () {
	console.log("WS escutando porta " + app.get("port"));
});
