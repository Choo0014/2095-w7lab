const express = require('express');
const router = express.Router();
const path2Views = __dirname + "/views";
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const morgan = require('morgan');
const url = 'mongodb://localhost:27017/';

const OBJECTID = mongodb.ObjectID;
let db = null;

//Connecting to MongoDB
MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err, client) {
    if (err) {
        console.log('Err  ', err);
    } else {
        console.log("Connected successfully to server");
        db = client.db("week6Lab");
    }
});

//home page
router.get('/', function (req, res) {
    res.sendFile(path2Views + '/index.html');
});

//adding task page
router.get('/addTask', function (req, res) {
    res.sendFile(path2Views + '/addTask.html');
});

//getting input
router.post('/formTask', function (req, res) {
    //checking parameters in log
    console.log(req.body.newTask);
    console.log(req.body.newInCharge);
    console.log(req.body.newDue);
    console.log(req.body.newDesc);
    console.log(req.body.newStatus);

    //Passing into MongoDB
    db.collection("week6lab").insertOne({
        taskName: req.body.newTask,
        taskPersonInCharge: req.body.newInCharge,
        taskDueDate: req.body.newDue,
        taskDesc: req.body.newDesc,
        taskStatus: req.body.newStatus
    });
    res.redirect('/listTask');
})

//adding Insert Many page
router.get('/insertMany', function (req, res) {
    res.sendFile(path2Views + '/insertMany.html');
});

//Adding many tasks
router.post('/formInsertMany', function (req, res) {
    //checking parameters in log
    console.log(req.body.newTask);
    console.log(req.body.newInCharge);
    console.log(req.body.newDue);
    console.log(req.body.newDesc);
    console.log(req.body.newInsertMany);
    console.log(req.body.newStatus);

    let countNo = req.body.newInsertMany;
    let arrayMany = [];

    // let obj = {
    //     taskName: req.body.newTask,
    //     taskPersonInCharge: req.body.newInCharge,
    //     taskDueDate: req.body.newDue,
    //     taskDesc: req.body.newDesc,
    //     taskStatus: req.body.newStatus
    // };
    // console.log("Object:" + obj);
    for (let i = 0; i < countNo; i++) { //loop input x times
        arrayMany.push(
            {taskName: req.body.newTask,
            taskPersonInCharge: req.body.newInCharge,
            taskDueDate: req.body.newDue,
            taskDesc: req.body.newDesc,
            taskStatus: req.body.newStatus}
            )
            console.log("InloopArray:" + arrayMany);

    }
    console.log("Array:" + arrayMany);
    db.collection("week6lab").insertMany(arrayMany); //passs in the array of objects
    res.redirect('/listTask');
})


//listing task page
router.get('/listTask', function (req, res) {

    db.collection("week6lab").find({}).toArray(function (err, data) {
        res.render('listTask.html', {
            taskDb: data
        });
    });

});

//delete task page
router.get('/deleteTask', function (req, res) {
    res.sendFile(path2Views + '/deleteTask.html');
});

// getting input for ID
router.post('/formDeleteTask', function (req, res) {
    let details = new OBJECTID(req.body.delTask);
    console.log(details);
    let filter = {
        _id: details
    }
    console.log(filter);

    db.collection('week6lab').deleteOne(filter);
    res.redirect('/listTask');

});

//delete all completed task page
router.get('/delAllCompleted', function (req, res) {
    res.sendFile(path2Views + '/delAllCompleted.html');
});

// getting input for ID
router.post('/formDeleteAll', function (req, res) {
    let details = req.body.delAll;
    console.log(details);
    let filter = {
        taskStatus: details
    }
    console.log(filter);

    db.collection('week6lab').deleteMany(filter);
    res.redirect('/listTask');

});

//Update task page
router.get('/updateTask', function (req, res) {
    res.sendFile(path2Views + '/updateTask.html');
});
//updatting task by ID
router.post('/formUpdateTask', function (req, res) {
    let details = new OBJECTID(req.body.updateTask);
    console.log(details);
    let filter = {
        _id: details
    }
    console.log(filter);
    let theUpdate = {
        $set: {
            taskStatus: req.body.newStatus //db attribute: input from form
        }
    };

    db.collection('week6lab').updateOne(filter, theUpdate);
    res.redirect('/listTask');

});
module.exports = router;