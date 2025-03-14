const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 7000;

const meds=require("./routes/meds");
app.use(cors());
app.use(bodyParser.json());
app.use("/meds",meds);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
