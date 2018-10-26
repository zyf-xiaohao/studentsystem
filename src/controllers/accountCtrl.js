const path = require('path');

const doMongodb = require(path.join(__dirname, '../tools/doMongodb.js'));
//captchapng:随机数生成验证码图片中间件
const captchapng = require('captchapng');

exports.getRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../statics/views/registor.html')); //导入注册页面
};
/**等价于以下代码
 * const getRegisterPage = (req,res)=>{
 *      res.sendFile(path.join(__dirname,'../statics/views/registor.html'));//导入注册页面
 *  };
 *  module.exports = {getRegisterPage} ;
 */

//注册新用户
exports.registor = (req, res) => {
    doMongodb.findOne('userInfo', {
        username: req.body.username
    }, function (err, doc) {
        if (!doc) { //注册新用户
            doMongodb.insert('userInfo', req.body, function (err, result) {
                if (result == null) {
                    res.send(JSON.stringify({
                        status: 2,
                        message: '插入失败'
                    }));
                } else {
                    res.send(JSON.stringify({
                        status: 0,
                        message: '注册成功'
                    }));
                }
            })
        } else {
            res.send(JSON.stringify({
                status: 1,
                message: '用户已存在'
            }));
            client.close();
        }
    })

}

exports.getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../statics/views/login.html')); //导入登陆页面
};

//生成验证码图片
exports.getVcodeImg = (req, res) => {
    const vcode = parseInt(Math.random() * 9000 + 1000);
    //console.log(req.session);
    req.session.vcode = vcode; //把生成的二维码数字存入session(请求头)

    var p = new captchapng(80, 30, vcode); // width,height,numeric captcha
    p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}

//验证用户登录
exports.login = (req, res) => {
    const result = {
        status: 0,
        message: '登陆成功'
    }
    if (req.body.vcode != req.session.vcode) {
        result.status = 2;
        result.message = '验证码输入错误';
        res.json(result);
        return false;
    }

    doMongodb.findOne('userInfo', {
        username: req.body.username,
        password: req.body.password
    }, (err, doc) => {
        //console.log(doc);
        if (doc == null) {
            result.status = 1;
            result.message = '用户名或密码错误';
        }else{
            req.session.username = req.body.username;
        }
        res.json(result);
    })

}