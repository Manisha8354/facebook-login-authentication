const express =require('express')
const mysql= require('mysql')
const bodyParser=require('body-parser')

let app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
let port = 3000


let db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'8354006658',
    database:'facebook'
})
db.connect ((err)=>{
    if(err)throw err
    else{
        console.log('database is a connected')
    }
})
app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/signup.html')
})

app.post('/',(req,res)=>{
    let  Firstname=req.body.Firstname
    let Surname=req.body.Surname
    let phone=req.body.phone
    let password=req.body.password
    let date=req.body.date
    let dateofbirth = req.body.dateofbirth
    let value=[[Firstname,Surname,phone,password,date,dateofbirth]]

    let sql='insert into fbdata (Firstname,Surname,phone,password,date,dateofbirth ) values ?'

    db.query(sql,[value],(err,result)=>{
        if(err) throw err
        else{
            res.redirect('/login')
        }
    })
})

app.get('/login', (req,res)=>{
    res.sendFile(__dirname + '/login.html')
})


app.post('/login', (req,res)=>{
    let email=req.body.email
    let Newpassword=req.body.Newpassword

    let sql = 'select * from fbdata where email=? and Newpassword=?'
    db.query(sql,[email, Newpassword],(err,result)=>{
        if(err)throw err 
        else{
            if(result.length>0){
                res.redirect('/welcome')
            }else{
                res.redirect('/login')
            }
        }
    })
})
app.get('/welcome', (req,res)=>{
    res.sendFile(__dirname + '/welcome.html')
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})