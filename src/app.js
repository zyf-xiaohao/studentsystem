const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

//atr-template
app.engine('html', require('express-art-template'));

// 解析 application/json
app.use(bodyParser.json());
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

//集成express-session中间件,session之后可以req.session点出session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'statics'))); //导入静态资源

app.all('/*',(req,res,next)=>{
    if(req.url.includes('/account')){
        next();
    }else{
        if(req.session.username){
            next();
        }else{
           res.send("<script>window.location.href='/account/login';</script>"); 
        }
    }
})

//导入路由
const accountRouter = require(path.join(__dirname, 'routers/accountRouter.js'));
app.use('/account', accountRouter); //集成路由

const studentmanagerRouter = require(path.join(__dirname, 'routers/studentmanagerRouter.js'));
app.use('/studentmanager', studentmanagerRouter); //集成路由

app.listen(3000, (req, res) => {
    console.log('start ok');
})