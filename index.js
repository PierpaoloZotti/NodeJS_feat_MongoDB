//initial config
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();



//forma de ler JSON / middleware
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(cors());
app.use(express.json());

//rotas da API

const personRouter = require('./routes/personRoutes');

app.use('/person', personRouter);

//rota inicial
app.get('/', (req, res) => {
    res.json({ message: 'oi mundo' });
});

//entregar uma porta 
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hrvkehw.mongodb.net/bancodoapi?retryWrites=true&w=majority`)
    .then(() => {
        console.log('conectado');
        app.listen(3000)
    }
    )
    .catch(err => { console.log(err) });

