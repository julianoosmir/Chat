const { Socket } = require('dgram');
const express = require ('express');
const path =  require ('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname,'public')));
app.set('views',path.join(__dirname,'public'));
app.engine('html',require('ejs').renderFile);
app.set('view engine','html');


let messagens = []
app.use('/',(req,res)=>{
    res.render('index.html')
});

io.on('connection',socket=>{
    

    socket.emit('previousMessages',messagens);
    socket.on('sendMenssage',data=>{
        messagens.push(data);
        console.log(messagens)

        socket.broadcast.emit('receivedMessage',messagens);
    })
})
server.listen(3000);