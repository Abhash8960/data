import { User } from "../modal/User.js";
import {File} from "../modal/File.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { otp } from "../utlis/common.js";
import { imagepath } from "../index.js";




export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashpasword = await bcrypt.hash(password, 12);

    let user = await User.findOne({ username});
    if (user) {
      return res.status(400).json({ message: "User Name Already exist" });
    } else {
      user = new User({ username,password: hashpasword });
      await user.save();
      res.status(200).json({ message: "User registered successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "somthing went wrong" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({username});
    if (!user) return res.status(400).json({ message: "invalid credential" });
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "invalid credential" });
    
    
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
    
    const data = { _id:user._id,username:user.username}
    
    res.json({ message: "login successfull", data, token });
   
  } catch (error) {
    res.status(500).json({ message: "somthing went wrong" });
  }
};


export const userProfile = async(req,res) => { 
  try {
    const hashpasword = await bcrypt.hash(otp, 12);
    const user = req.user;
    const filename= req.file.filename;
    const code  =  hashpasword;
    let data = new File({user,filename,code})
    data.save()
    res.json({message:`your code ${otp}`})

  } catch (error) {
    res.status(500).json({ message: "somthing went wrong" });
  }
}

export const getuserProfile = async(req,res) => { 
  try {
     const files = await File.find({ user: req.user._id});
     res.json(files);
  } catch (error) {
    res.status(500).json({ message: "somthing went wrong" });
  }
}

export const deleteuserProfile = async(req,res) => { 
  try {
    const {id} = req.params;
    const dltUser = await File.findByIdAndDelete({_id:id});
    

        res.status(201).json({message:"delete successful",dltUser});
  } catch (error) {
    res.status(500).json({ message: "somthing went wrong" });
  }
}

export const downloadImage = async(req,res) => { 
  try {
    const {id,otp}=req.body
    const findData = await File.findById({_id:id})  
     const match = await bcrypt.compare(otp, findData.code);
   if(match){
      let file = findData.filename
      res.json({massage:"hello",data:`http://localhost:8080/${file}`})
    }else{
    res.status(400).json({ message: "code not match" });
   }   
  } catch (error) {
    res.status(500).json({ message: "somthing went wrong" });
  }   
}

