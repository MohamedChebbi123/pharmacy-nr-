const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 7000;

const meds=require("./routes/meds");
const browsemeds=require("./routes/browsemeds");
const signupadmin=require("./routes/signupadmin")
app.use(cors());
app.use(bodyParser.json());
app.use("/meds",meds);
app.use("/browse",browsemeds);
app.use("/auth",signupadmin)


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
