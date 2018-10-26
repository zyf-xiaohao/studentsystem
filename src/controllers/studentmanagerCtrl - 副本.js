const path = require('path');

//mongodb:数据库处理中间件
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'sz23zyf';


exports.getStudentListPage = (req, res) => {
    const keywords = req.query.keywords || '';
    MongoClient.connect(url, function (err, client) {
        if (err) {
            console.log(err);
            return false;
        }
        console.log("连接成功");
        const db = client.db(dbName);
        const collection = db.collection('studentInfo');
        collection.find({
            name: {
                $regex: keywords
            }
        }).toArray((err, docs) => {
            res.render(path.join(__dirname, '../statics/views/list.html'), {
                students: docs,
                keywords
            });
            client.close();
        });

    });
};

exports.addStudentPage = (req, res) => {
    res.render(path.join(__dirname, '../statics/views/add.html'), {});
}

exports.addStudent = (req, res) => {
    MongoClient.connect(url, function (err, client) {
        if (err) {
            console.log(err);
            return false;
        }
        console.log("连接成功");
        const db = client.db(dbName);
        const collection = db.collection('studentInfo');
        collection.insertOne(req.body,(err,result)=>{
            if(result == null){
                res.send("<script>alert('新增失败');</script>");
            }else{
                res.send("<script>window.location.href='/studentmanager/list';</script>");
            }
            client.close();
        })
    });
}