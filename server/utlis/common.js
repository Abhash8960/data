import multer from "multer";
import path from "path"
import otpGenerator from 'otp-generator';


 const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});


export const upload = multer({storage: storage});


export const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})