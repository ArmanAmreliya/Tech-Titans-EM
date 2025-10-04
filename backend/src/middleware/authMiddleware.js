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