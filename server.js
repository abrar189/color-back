'use strict'

require('dotenv').config();
const express=require('express');
const cors=require('cors');
const app =express();
const mongoose=require('mongoose');
const PORT=process.env.PORT
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGODB,{ useNewUrlParser: true, useUnifiedTopology: true });
const user=require('./moduls/Database.modul');
const {dataDBfun,dataAPIfun,addtofavFun,deleteFun,updateFun}=require('./controller/Datadb.controller')
// http://localhost:3008
app.get('/',(req,res)=>{
  res.send('hellooo')
})

// http://localhost:3008/dataDB
app.get('/dataDB',dataDBfun)

// http://localhost:3008/dataAPI
app.get('/dataAPI',dataAPIfun)

// http://localhost:3008/addtofav
app.post('/addtofav',addtofavFun)

// http://localhost:3008/delete/
app.delete('/delete/:id',deleteFun)

// http://localhost:3008/update/
app.put('/update/:idx',updateFun)

app.listen(PORT,()=>{
  console.log(`listen to ${PORT}`);
})

