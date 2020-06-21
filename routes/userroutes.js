// // const express = require('express')

// // const routerr = express.Router()

// // routerr.post('/rejster', async (req, res) => {

// //     console.log('hi Routers!!!!');

// //     try {
// //         const { email, password, verfiy, displayName } = req.body

// //         if (!email || !password || !verfiy)


// //             return res.status(404).json({

// //                 msg: 'error find all inpout'
// //             })

// //         if (password.length < 5)

// //             return res.status(400).json({

// //                 msg: 'error not inpout pass < 5'

// //             })



// //         if (password !== verfiy)

// //             return res.status(400).json({

// //                 msg: 'enter some pass'

// //             })
// //     } catch (err) {

// //         res.status(500).json({

// //             msg: 'error' + err
// //         })

// //     }

// // })


// // module.exports = routerr


// const express = require('express')
// const Routing = express.Router()
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const Autho = require('../middlewers/auth')
// const USermodel = require('../models/userModels')



// Routing.use(express.json())



// Routing.post('/rejs', async (req,res)=>{

// try{
//         let { email, password, verfiy, displayName } = req.body


// if(!email || !password || !verfiy)

// return res.status(404).json({

//     msg:'void all inpout'

// })

// if(password.length > 5 )

// return res.status(404).json({

//     msg:'noeed some 5'

// })
// if(password !== verfiy)

// return res.status(500).json({

//     msg:'no password == chedcked'

// })


// const rejsuser =  await USermodel.findOne({email:email})
// if(rejsuser)

// return res.status(400).json({
// msg:"not find email"

// })
// if(!displayName)
// displayName = email

// const salt = await bcrypt.genSalt()
// const passwordhash = await bcrypt.hash(password, salt)
// console.log(passwordhash);
// console.log(email , password , verfiy , displayName);

// const newUser = new USermodel({

//     email,
//     password:passwordhash,
//     displayName
// })
// const Svaveuser = await newUser.save()
// res.json(Svaveuser)

// }catch(err){

//      res.status(404).json({

//         msg:'error all' + err
    
//     })

// }


// })



// Routing.post('/login', async (req,res)=>{


//     try{

//         const {email , password } = req.body
// if(!email || !password)
// return res.status(400).json({

//     msg:'not find pass or email'

// })

// const user = await USermodel.findOne({email:email})
// if(!user)

// return res.status(400).json({

//     msg:'void pass or email no Accunt?'

// })
// // SECRET  
// const isMatch = await bcrypt.compare(password , user.password)

// if(!isMatch)

// return res.status(400).json({

//     msg:'Invaint created'

// })

// // let strong = "ppt{j%GrJ#$G/s:M]~'we=hy]LTX-F\~Nf7%:5[nZg/]eB#GXL"

// const token = jwt.sign({id: user._id},process.env.JWT_SECRET )

// console.log(token);

// res.json({
// token,
// user:{
// id:user._id,
// displayName:user.displayName,
//      email:user.email
// }

// })

//     }catch(err){

// res.status(500).json({

// msg:'error' + err

// })

//     }



// })

  
// Routing.delete('/del', Autho , async (req,res)=>{

// try{
// const delteuser = await USermodel.findByIdAndDelete(req.user)
// res.json(delteuser)
// }catch(err){
// res.status(500).json({

// msg:'error' + err

// })

//     }



// })

// Routing.post('/tokenValid' , async (req,res)=>{

//     try{

//         const token = req.header("x-auth-token")
// if(!token)
// return res.json(false)
// // let strong = "ppt{j%GrJ#$G/s:M]~'we=hy]LTX-F\~Nf7%:5[nZg/]eB#GXL"

// const verifed = jwt.verify(token , process.env.JWT_SECRET)
// if(!verifed)
// return res.json(false)


// const user = await USermodel.findById(verifed.id)
// if(!user)
// return res.json(false)
// return res.json(true)
//     }catch(err){
// res.status(500).json({

// msg:'error' + err

// })

//     }

// })



// Routing.get('/find', Autho , async (req,res)=>{

//     // try{
//         const user = await USermodel.findById(req.user)
    
//         res.json({
//             displayName: user.displayName,
//             id: user._id,
//         })
//     // }catch(err){
    
//     //     res.status(400).json({
    
//     //        msg:'error get Routing' + err
       
//     //    })
    
//     // }
    
    
//     })


 
// module.exports = Routing




const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middlewers/auth");
const User = require("../models/userModels");

router.post("/register", async (req, res) => {
  try {
    let { email, password, verfiy, displayName } = req.body;

    // validate

    if (!email || !password || !verfiy)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });
    if (password !== verfiy)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    if (!displayName) displayName = email;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      displayName,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    displayName: user.displayName,
    id: user._id,
  });
});

module.exports = router;
