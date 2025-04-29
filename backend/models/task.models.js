const {Schema, model}= require("mongoose")

const taskSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["complete","incomplete"],
        default:"incomplete"
    },
    priority:{
        type:String,
        enum:["Low","Medium","High"],
        default:"medium"
    },
    creataionDate:{
        type:Date,
        default:Date.now
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{versionKey:false,timestamps:true})

const taskModel= model("Task", taskSchema)

module.exports={taskModel}