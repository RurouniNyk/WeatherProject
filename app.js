const express = require ("express");

const https = require("https");
const bodyParser=require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req, res){
  res.sendFile(__dirname+"/index.html");
});


app.post("/", function(req,res){
  const search=req.body.cityName;
  const apikey="a597b533bf4e278bf81ce742eb7b21d1";
  const units="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+search+"&appid="+apikey+"&units="+units;
  https.get(url, function(response){
    response.on("data", function(data){
      const weatherdata=JSON.parse(data)
      const temp=weatherdata.main.temp
      const des = weatherdata.weather[0].description
      const icon= weatherdata.weather[0].icon
      const imgdata="http://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<h1>The tempature in"+search+" is "+temp+" degree celcius</h1>");
      res.write("<h3>The current weather is "+des+"</h3>");
      res.write("<img src= "+imgdata+">");
      res.send();
  });
});
});

app.listen(3000, function(){
  console.log("server 3000");
})
