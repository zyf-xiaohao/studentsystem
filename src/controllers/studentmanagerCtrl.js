const path = require('path');

const doMongodb = require(path.join(__dirname, '../tools/doMongodb.js'));
//console.log(doMongodb);

exports.getStudentListPage = (req, res) => {
    const keywords = req.query.keywords || '';
    doMongodb.find('studentInfo', {
        name: {
            $regex: keywords
        }
    }, function (err, docs) {
        res.render(path.join(__dirname, '../statics/views/list.html'), {
            students: docs,
            keywords,
            username: req.session.username
        });
    })
};

exports.addStudentPage = (req, res) => {
    res.render(path.join(__dirname, '../statics/views/add.html'), {
        username: req.session.username
    });
}

exports.addStudent = (req, res) => {
    doMongodb.insert('studentInfo', req.body, function (err, result) {
        if (result == null) {
            res.send("<script>alert('新增失败');</script>");
        } else {
            res.send("<script>window.location.href='/studentmanager/list';</script>");
        }
    })
}

exports.editStudentListPage = (req, res) => {
    doMongodb.findOne('studentInfo', {
        _id: doMongodb.ObjectId(req.params.studentId)
    }, function (err, doc) {
        //console.log(doc);
        doc.username = req.session.username;
        res.render(path.join(__dirname, '../statics/views/edit.html'), doc);
    })
};

exports.editStudent = (req, res) => {
    doMongodb.updateOne('studentInfo', {
        _id: doMongodb.ObjectId(req.params.studentId)
    }, req.body, function (err, result) {
        if (result == null) {
            res.send("<script>alert('修改失败');</script>");
        } else {
            res.send("<script>window.location.href='/studentmanager/list';</script>");
        }
    })
};

exports.delStudent = (req, res) => {
    doMongodb.deleteOne('studentInfo', {
        _id: doMongodb.ObjectId(req.params.studentId)
    }, function (err, result) {
        if (result == null) {
            res.send("<script>alert('修改失败');</script>");
        } else {
            res.send("<script>window.location.href='/studentmanager/list';</script>");
        }
    })
};

exports.logout = (req, res) => {
    req.session.username = null;
    res.send("<script>window.location.href='/account/login';</script>");
};