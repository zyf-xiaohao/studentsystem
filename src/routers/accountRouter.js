const express = require('express');
const path = require('path');

const accountRouter = express.Router(); //创建路由对象
const accountCtrl = require(path.join(__dirname, '../controllers/accountCtrl.js')); //导入控制器

//加载注册页面
accountRouter.get('/register', accountCtrl.getRegisterPage); //执行语句
/**等价于以下代码
 * accountRouter.get('/register',(req,res)=>{
 *    accountCtrl.getRegisterPage(req,res);
 * });
 */
//注册新用户
accountRouter.post('/register', accountCtrl.registor);

//跳转登陆页面
accountRouter.get('/login', accountCtrl.getLoginPage); 

//加载验证码
accountRouter.get('/vcode',accountCtrl.getVcodeImg);

//实现用户登陆
accountRouter.post('/login', accountCtrl.login);

module.exports = accountRouter; //导出路由