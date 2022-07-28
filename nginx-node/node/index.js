const express = require("express");
const app = express();
const port = 3000;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};

const mysql = require("mysql");
const connection = mysql.createConnection(config);

connection.connect((err) => {
  if (err) {
    console.error("mysql connection error:" + err);
    return;
  }

  console.log("mysql connection successful");
});

let sql = `INSERT INTO people (name) values ('Anderson');`;
connection.query(sql);

sql = `INSERT INTO people (name) values ('Igor');`;
connection.query(sql);

sql = "SELECT * FROM people ORDER BY id";

let str_result = "";
connection.query(sql, function (err, result) {
  if (err) throw err;

  result.forEach((element) => {
    str_result += "<p>" + element.name + "</p>";
  });
});

connection.end();

app.get("/", (_, res) => {
  res.send("<h1>Full Cycle Rocks!</h1>" + str_result);
});

app.listen(port, () => {
  console.log("Rodando na porta " + port);
});
