var express = require("express");
var mysql = require("mysql");
var dbconfig = require("./config/database.js");
var connection = mysql.createConnection(dbconfig);
var bodyParser = require('body-parser').json();
var cors = require('cors')


var app = express();

app.use(cors())
// app.use(bodyParser.urlencoded({ extended: true }));

app.set("port", process.env.PORT || 5000);

app.get("/", (req, res) => {
  res.send("Root");
});

app.get("/chatterroom", (req, res) => {
  connection.query(
    "select * from ChatterRoom, Messages where ChatterRoom.id=Messages.room_num",
    (err, rows) => {
      if (err) {
        throw err;
      } else {
        res.send(rows);
      }
    }
  );
});

app.post("/messages",bodyParser ,function(req, res) {
  var body = req.body;
  console.log(req.body)
  
  var username = body.username
  var message = body.message;
  var room_num = body.room_num;

  // var sql = `INSERT INTO Messages (message, room_num, username) VALUES (?, ?, ?)`;
  
  // connection.query(sql, [username, message, room_num], function (err, data) {
  //   if (err) throw err;;
    
  //     console.log("1 record inserted");
  
  // })
  

  connection.query(
    'INSERT INTO Messages (username, message, room_num) VALUES ("' + username + '", "' + message + '", ' + room_num + ')',
    function(err, result) {
      if (err) throw err;

      console.log("1 record inserted");
    }
  );
 
  var newMessages = connection.query("select * from ChatterRoom, Messages where ChatterRoom.id=Messages.room_num");

  res.send("newMessages post");
  
  
});

app.listen(app.get("port"), () => {
  console.log(
    "*****Express server listening on port " + app.get("port") + "*****"
  );
});
