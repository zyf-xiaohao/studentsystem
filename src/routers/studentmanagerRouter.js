const express = require('express');
const path = require('path');

const studentmanagerRouter = express.Router(); //创建路由对象
const studentmanagerCtrl = require(path.join(__dirname, '../controllers/studentmanagerCtrl.js')); //导入控制器

//加载学生列表页面
studentmanagerRouter.get('/list', studentmanagerCtrl.getStudentListPage); 

//加载新增页面
studentmanagerRouter.get('/add', studentmanagerCtrl.addStudentPage); 

//新增页面
studentmanagerRouter.post('/add', studentmanagerCtrl.addStudent);

//编辑页面
studentmanagerRouter.get('/edit/:studentId', studentmanagerCtrl.editStudentListPage);

//编辑学生
studentmanagerRouter.post('/edit/:studentId', studentmanagerCtrl.editStudent);

//删除学生
studentmanagerRouter.get('/delete/:studentId', studentmanagerCtrl.delStudent);

//退出登录
studentmanagerRouter.get('/logout', studentmanagerCtrl.logout); 

module.exports = studentmanagerRouter; //导出路由   