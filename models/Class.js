const mongoose= require("mongoose")
const classSchema = mongoose.Schema({
    standard:{
        type: String,
        required:true
    },
    division:{
        type: String,
        required:true   
    }
},
    {
        timestamps: true
    })
const Class=mongoose.model('Class',classSchema);
module.exports= Class;