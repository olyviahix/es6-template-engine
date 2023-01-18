const http = require("http");
const express = require("express");
const templateEngine = require("express-es6-template-engine");
const app = express();
app.engine("html", templateEngine);
app.set("views", "templates"); // tells the server all the files needed for view will be in here.
app.set("view engine", "html");

const cats = [
  {
    id: "cwn",
    name: "Catwoman",
  },
  {
    id: "cldy",
    name: "CatLady",
  },
];

app.get("/", (req, res) => {
  res.render("homepage");
});

app.get("/cats", (req, res) => {
  res.render("catlist", {
    locals: {
      cats,
    },
  });
});

app.get("/cats/:catId", (req, res) => {
  const catId = req.params["catId"];
  const cat = cats.find((cat) => cat.id === catId);
  res.render("catinfo", {
    locals: {
      cat,
    },
  });
});

const server = http.createServer(app);
server.listen(3000, () => console.log("Server is running on port 3000"));