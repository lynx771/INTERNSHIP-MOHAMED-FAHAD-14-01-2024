const mongoose= require("mongoose")
const studentSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required:true
        },
        rollno:{
            type:Number,
            required:true   
        },
        mobile_No:{
            type: String,
            required:true
        },
        ClassId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Class',
            required:true
        }
    },
    {
        timestamps: true
    }
);


const Student=mongoose.model('Student',studentSchema);
module.exports= Student;