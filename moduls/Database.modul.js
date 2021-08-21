'use strict'

const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
    title: String,
    imageUrl: String,
    id: Number,

});

const user = mongoose.model('user', colorSchema);

function seedData() {
    let userData = new user({

        "id": 14,
        "title": "Black",
        "imageUrl": "http://www.colourlovers.com/img/000000/100/100/Black.png",

    })
    userData.save();
}
// seedData();

class objData{
    constructor(data){
        this.id=data.id;
        this.title=data.title;
        this.imageUrl=data.imageUrl;

    }
}

module.exports={user,objData}