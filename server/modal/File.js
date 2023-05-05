import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true, },
    filename: {type: String,required: true,},
    code: {type: String, required: true,unique: true,},
  },{timestamps:true});

  export const File = mongoose.model('File',fileSchema );