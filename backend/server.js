const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
const port = 7000;

// Routes
const meds = require("./routes/meds");
const browsemeds = require("./routes/browsemeds");
const signupadmin = require("./routes/signupadmin");
const loginadmin = require("./routes/loginadmin");
const signupclient = require("./routes/signupclient");
const loginclient = require("./routes/loginclient");
const chatbot = require("./routes/chatbot");
const browsemedscl = require("./routes/browsemedscl");

app.use(cors());
app.use(bodyParser.json());
app.use("/browse", browsemeds);
app.use("/auth", signupadmin);
app.use("/loginadmin", loginadmin);
app.use("/signupclient", signupclient);
app.use("/loginclient", loginclient);
app.use("/browsemedscl", browsemedscl);
app.use("/chatbot", chatbot);



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});