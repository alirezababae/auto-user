// const jwt = require('jsonwebtoken')



// const auth = (req , res , next) => {


// try{

//     const token = req.header("x-auth-token")
//     if(!token)
//     return res.status(401).json({msg:"No autho tokens auth js"})

//     const verifed = jwt.verify(token,process.env.JWT_SECRET)
//     if(!verifed)
//     return res
//     .status(401).
//     json({msg:"Token verfyed failed"})
// // console.log(verifed);
// res.user = verifed.id
// next()
// }catch(err){
//     res.status(500).json({error:err})
// }

// }

// module.exports = auth


const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res
        .status(401)
        .json({ msg: "No authentication token, authorization denied." });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied." });

    req.user = verified.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
