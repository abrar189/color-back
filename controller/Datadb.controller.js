'use strict'

const { default: axios } = require('axios');
const {user,objData}=require('../moduls/Database.modul')

function dataDBfun(req,res){

    user.find({},(error,data)=>{
        if(error){
            res.send(error)
        }else{
            res.send(data);
        }
    })
}


let memory={};
async function dataAPIfun(req,res){
    const url='https://ltuc-asac-api.herokuapp.com/allColorData';
    if (memory["dataapi"] !== undefined){
        res.send(memory["dataapi"] )
    }else{
        const apiData= await axios.get(url);
        const apiMap=apiData.data.map(item=>{
            return new objData(item);
        })
        memory["dataapi"]=apiMap;
        res.send(apiMap);
    }
}

function addtofavFun(req,res){
    let color=new objData(req.body);
    let id=color.id
    user.find({id:id},(error,data)=>{
        if(data.length>0){
            res.send(req.body);
        }else{
            let colorModel=new user(color)
            colorModel.save().then(data=>res.send((data)).catch(error=>res.send(error)))

        }
    })
}


function deleteFun(req,res){
   
const idx = req.params.id;
user.find({}, (error, data) => {
    if (error) {
        res.send(error);

    } else {
        data[idx].remove();
        user.find({}, (error, data) => {
            res.send(data);
           
        }
        );
    }
})
}

function updateFun(req,res){
   
    const idx = req.params.idx;
    const{
        id,
        title,
      imageUrl,
    }=req.body;

    user.find({}, (error, data) => {
        if (error) {
            res.send(error);
    
        } else {
            data[idx].id=id;
            data[idx].title=title;
            data[idx].imageUrl=imageUrl;
            data[idx].save(),
          
                res.send(data);
               
            
        }
    })
    }








module.exports={dataDBfun,dataAPIfun,addtofavFun,deleteFun,updateFun}