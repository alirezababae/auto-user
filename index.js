// const express = require('express')
// const mongoose = require('mongoose')
// const cors = require('cors')
// require('dotenv').config()
// const app = express()
// const morgan = require('morgan')
// app.use(morgan('dev'))
// app.use(express.json())
// app.use(cors())



// const userRouters = require('./routes/userroutes')
// app.use('/test', userRouters)




// mongoose.connect('mongodb://localhost:27017/autho')
// .then(()=>{

// console.log('yes connect db');


// })
// .catch((errors)=>{

//     console.log('no coonect' + errors);
    

// })

// app.listen(3000 , ()=>{


// console.log('run');


// })



const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())

app.use(express.json())

const Fun = require('./a')

const users = require('./routes/userroutes')

app.use('/a',Fun)
app.use('/rej', users )



mongoose.connect('mongodb://localhost:27017/autho',{

useCreateIndex:true,
useNewUrlParser:true,
useUnifiedTopology:true

})
.then(()=>{

console.log('yes connect db');


})
.catch((errors)=>{

    console.log('no coonect' + errors);
    

})


app.get('/',(req,res)=>{


res.send('testing')


})



app.listen(3001)










