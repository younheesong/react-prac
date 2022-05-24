const express = require("express");
const app = express();
const port = 3000;

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://younheesong:gb7HvzR29MFDebgo@basic.zrmmot3.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("connect well"))
  .catch((err) => console.log(err));
//
// mongodb+srv://younheesong:<password>@basic.zrmmot3.mongodb.net/?retryWrites=true&w=majority
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
