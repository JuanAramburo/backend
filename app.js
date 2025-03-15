const http = require('http');
const express = require('express');
const fs = require('fs');
const path = require('path');
const { param } = require('express/lib/request');

//generar el objeto principal
const app = express();
app.set('view engine','ejs');

app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());



let datos = JSON.parse(fs.readFileSync('datos.json','utf8'));
let productos = JSON.parse(fs.readFileSync('productos.json','utf8'));
let alumnos = JSON.parse(fs.readFileSync('alumnos.json','utf8'));


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

app.get('/cotizacion',(req,res)=>{
    const params = {
        valor : req.query.valor,
        pinicial : req.query.pinicial,
        plazos : req.query.plazos
    }
    res.render('practica02', params);
})

app.post('/cotizacion',(req,res)=>{
    const params = {
        valor : req.body.valor,
        pinicial : req.body.pinicial,
        plazos : req.body.plazos
    }
    res.render('practica02',params);
})

app.get('/pago', (req, res) => {
    const params = {
        recibo: req.query.recibo || '',
        nombre: req.query.nombre || '',
        puestos: req.query.puestos || '1',
        niveles: req.query.niveles || '1',
        calculoPago: req.query.calculoPago,
        calculoImpuesto: req.query.calculoImpuesto,
        totalPagar: req.query.totalPagar
    };
    res.render('practica03', params);
});


app.post('/pago', (req, res) => {
    const params = {
        recibo : req.body.recibo,
        nombre : req.body.nombre,
        puestos : req.body.puestos,
        niveles : req.body.niveles,
        calculoPago : req.body.calculoPago,
        calculoImpuesto : req.body.calculoImpuesto,
        totalPagar : req.body.totalPagar
    };

    res.render('practica03', params);
});

app.get('/preexamen',(req,res) => {
    res.render('preexamen', {lista:[]});
});

app.post('/preexamen',(req,res) => {
    const tipoSeleccionado = parseInt(req.body.tipo);
    const productosFiltrados = productos.filter(producto => producto.tipo === tipoSeleccionado);
    res.render('preexamen', { lista: productosFiltrados });
});

app.get('/examen', (req, res) => {
    const nivel = req.query.nivel;
    const turno = req.query.turno;
    const tipo = req.query.tipo;   

    res.render('examenU2', { alumnos, nivel, turno, tipo });
});

app.post('/examen', (req, res) => {
    const { nivel, turno, tipo } = req.body;
    res.render('examenU2', { alumnos, nivel, turno, tipo });
});


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


