var http = require('http');
var port = process.env.PORT || 5000;;

const orders = [
  {
    name: 'Livi優活 抽取式衛生紙(100抽x10包x10串/箱)',
    logo: 'https://static.oopocket.com/store/iconMaji@3x.png',
    status: '已取消',
    date: '107/6/12'
  },
  {
    name: 'BALMUDA The Toaster 百慕達烤麵包機黑色',
    logo: 'https://static.oopocket.com/store/iconMaji@3x.png',
    status: '已成立',
    date: '108/7/21'
  },
  {
    name: '贈短慧萬用鍋HD2133+三合一濾網「LG樂金」韓國原裝...',
    logo: 'https://static.oopocket.com/store/iconMaji@3x.png',
    status: '處理中',
    date: '108/6/2'
   },
   {
    name: 'Apple AirPds 2',
    logo: 'https://static.oopocket.com/store/iconMaji@3x.png',
    status: '已送達',
    date: '108/3/02'
  }
]

var app = http.createServer(function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify(orders));
});
app.listen(port);

console.log('RESTful API server started on: ' + port);
