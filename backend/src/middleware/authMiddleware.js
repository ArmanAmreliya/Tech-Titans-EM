<<<<<<< HEAD
const jwt=require('jsonwebtoken');

const authEmployee= async(req,res,next)=>{

    try{
       const {token}=req.headers
       if(!token){
        return   res.json({sucess:false,message:"Not authorized login again"})
       }
       const decode=jwt.verify(token,process.env.JWT_SECRET);
       if(!req.body) req.body={};
       req.body.userId=decode.id;
       next()
    }
    catch(err){
          console.log(err);
     res.json({sucess:false,message:err.message})

    }

}

const authManager= async(req,res,next)=>{

    try{
       const {token}=req.headers
       if(!token){
        return   res.json({sucess:false,message:"Not authorized login again"})
       }
       const decode=jwt.verify(token,process.env.JWT_SECRET);
       if(!req.body) req.body={};
       req.body.managerId=decode.id;
       next()
    }
    catch(err){
          console.log(err);
     res.json({sucess:false,message:err.message})

    }

}

const authFinance= async(req,res,next)=>{

    try{
       const {token}=req.headers
       if(!token){
        return   res.json({sucess:false,message:"Not authorized login again"})
       }
       const decode=jwt.verify(token,process.env.JWT_SECRET);
       if(!req.body) req.body={};
       req.body.financeId=decode.id;
       next()
    }
    catch(err){
          console.log(err);
     res.json({sucess:false,message:err.message})

    }

}

const authDirector= async(req,res,next)=>{

    try{
       const {token}=req.headers
       if(!token){
        return   res.json({sucess:false,message:"Not authorized login again"})
       }
       const decode=jwt.verify(token,process.env.JWT_SECRET);
       if(!req.body) req.body={};
       req.body.Id=decode.id;
       next()
    }
    catch(err){
          console.log(err);
     res.json({sucess:false,message:err.message})

    }

}

module.exports={authEmployee,authManager,authFinance,authDirector}  
=======
// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Hardcoded JWT secret for now (later move to .env)
const JWT_SECRET = 'supersecretkey';

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from headers
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach user to request
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ error: 'User not found' });

    req.user = {
      id: user._id,
      role: user.role,
      name: user.name,
      email: user.email
    };

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
>>>>>>> b041541 (Backend middleware , controller , routes)
