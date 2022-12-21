// https://api.openweathermap.org/data/2.5/weather?q=Amritsar&appid=0b74ef194a6d79557b3ddd43029975af

const http = require('http');
const fs = require('fs');
// http.createServer();
var requests = require("requests");
const { connect } = require('http2');
const homeFile = fs.readFileSync("home.html",'utf-8');
const replaceVal=(tempVal,orgVal)=>{
    let temperature = tempVal.replace("%tempval%",orgVal.main.temp);
    temperature = temperature.replace("%tempmin%",orgVal.main.temp_min);
    temperature = temperature.replace("%tempmax%",orgVal.main.temp_max);
    temperature = temperature.replace("%location%",orgVal.name);
    temperature = temperature.replace("%country%",orgVal.sys.country);
    return temperature;
}
const server = http.createServer((req,res)=>{
    if(req.url=='/'){
        requests('https://api.openweathermap.org/data/2.5/weather?q=Amritsar&appid=0b74ef194a6d79557b3ddd43029975af')
        .on('data',function(chunk){
            const objData = JSON.parse(chunk);
            const arrData =[objData];
            // console.log(arrData[0].main.temp);
            const realTimeData = arrData.map((val)=>replaceVal(homeFile,val)).join("");
            res.write(realTimeData);

           
        })
        .on('end',function(err){
            if(err) return console.log("connection cloased due to errors",err);
            res.end();
        })
    }
});

server.listen(8000,'127.0.0.1');