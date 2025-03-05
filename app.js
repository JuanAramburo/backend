const http = require('http');
const express = require('express');
const fs = require('fs');
const path = require('path');

//generar el objeto principal
const app = express();
app.set('view engine','ejs');

app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());



let datos = JSON.parse(fs.readFileSync('datos.json','utf8'));

// Primer peticion por metodo get
app.get('/',(req,res)=>{
    res.render('index',{titulo:"Listado de Alumnos",listado:datos});
})
app.get('/practica1',(req,res)=>{
    res.render('practica01',{numero: ""});
})

app.post('/p01',(req,res)=>{
    // Parametros para recibir los datos
    const params = {
        numero:req.body.numero
    }
    // body : cuando los datos viene en un formulario por el metodo post
    //      : Usa libreria
    res.render('practica01',params);
})

app.get('/practica2',(req,res)=>{
    res.render('practica02');
})
app.get('/practica3',(req,res)=>{
    res.render('practica03');
})




const puerto = 3000;
app.listen(puerto, ()=>{
    console.log("El puerto esta escuchando");

})


