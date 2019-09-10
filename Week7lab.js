const express = require('express');
const router = express.Router();
const path2Views = __dirname + "/views";
const mongoose = require('mongoose');


const url = 'mongodb://localhost:27017/week7Lab';
const Developers = require('./Models/Developers.js'); //folder name !!!
const Tasks = require('./Models/tasks.js');



//Connecting to MongoDB via mongoose
mongoose.connect(url, {
    useNewUrlParser: true
}, function (err) {
    if (err) {
        console.log("Error... Can't connect");
        throw err;
    } else {
        console.log("Connected to week7Lab");
    }
});



//Home page
router.get('/', function (req, res) {
    res.sendFile(path2Views + '/index.html');
});




//Get Add task page
router.get('/addTask', function (req, res) {
    res.sendFile(path2Views + '/addTask.html');
});




// input from form
router.post('/formTask', function (req, res) {
    let tasks = new Tasks({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.newTask,
        developer: req.body.newInCharge,
        dueDate: req.body.newDue,
        desc: req.body.newDesc,
        status: req.body.newStatus
    });
    tasks.save(function (err) {
        if (err) {
            console.log('Error: Can\'t show the task form')
            throw err;
        } else {
            console.log('Added to week7Lab');
        }

    });

    res.redirect('/listTask');
});





//Get Insert Many tasks page
router.get('/insertMany', function (req, res) {
    Developers.find({}, function (err, data) {
        if (err) {
            console.log('Error: Insert MAny Page');
            throw error;
        } else {
            console.log('added multiple tasks successfully');
            res.sendFile(path2Views + '/insertMany.html', {
                devs: data
            });
        }
    });
});




//Inserting many tasks from form
router.post('/formInsertMany', function (req, res) {
    let countNo = req.body.newInsertMany;

    for (let i = 0; i < countNo; i++) {
        let tasks = new Tasks({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.newTask,
            developer: req.body.newInCharge,
            dueDate: req.body.newDue,
            desc: req.body.newDesc,
            status: req.body.newStatus
        });

        tasks.save(function (err) {
            if (err) {
                console.log('Error: Can\'t show the task form')
                throw err;
            } else {
                console.log('Added to week7Lab');
            }

        });
    }

    res.redirect('/listTask');


    // for (let i = 0; i < countNo; i++) { //loop input x times
    //     arrayMany.push({
    //         taskName: req.body.newTask,
    //         taskPersonInCharge: req.body.newInCharge,
    //         taskDueDate: req.body.newDue,
    //         taskDesc: req.body.newDesc,
    //         taskStatus: req.body.newStatus
    //     })
    //     console.log("InloopArray:" + arrayMany);

    // }
    // console.log("Array:" + arrayMany);
    // db.collection("week7Lab").insertMany(arrayMany); //pass in the array of objects
    // res.redirect('/listTask');
})

//listing task page
router.get('/listTask', function (req, res) {
    Tasks.find({}, function (err, data) {
        if (err) {
            console.log('Error: list devs');
            throw err;
        } else {
            res.render("listTask.html", {
                tasks: data
            });
        }
    });
});

//delete task page
router.get('/deleteTask', function (req, res) {
    res.sendFile(path2Views + '/deleteTask.html');
});


// getting input for ID
router.post('/formDeleteTask', function (req, res) {
    let id = new mongoose.Types.ObjectId(req.body.delTask);
    Tasks.deleteOne({
        _id: id
    }, function (err) {
        if (err) {
            console.log('Error: Delete Form');
            throw err;
        } else {
            console.log('Delete Successful');
        }
    });
    res.redirect('/listTask');

});

//Get del all completed task page
router.get('/delAllCompleted', function (req, res) {
    res.sendFile(path2Views + '/delAllCompleted.html');

});

// del all completed
router.post('/formDeleteAll', function (req, res) {
    Tasks.deleteMany({
        'status': 'Complete'
    }, function (err) {
        if (err) throw err;
    });
    res.redirect('/listTask');
});

//Get Update task page
router.get('/updateTask', function (req, res) {
    res.sendFile(path2Views + '/updateTask.html');
});

//Updating task by ID
router.post('/formUpdateTask', function (req, res) {
    let id = new mongoose.Types.ObjectId(req.body.updateTask);
    Tasks.updateOne({
        _id: id
    }, {
        $set: {
            'status': req.body.newStatus
        }
    }, function (err) {
        if (err) throw err;
    });
    res.redirect('/listTask');

});

//Adding new Developer Page

router.get('/addDevs', function (req, res) {
    res.sendFile(path2Views + '/addDevs.html');
});

//getting input for devs
router.post('/formAddDevs', function (req, res) {
    let Devs = new Developers({
        _id: new mongoose.Types.ObjectId(),
        name: {
            firstName: req.body.newDevFirstName,
            lastName: req.body.newDevLastName
        },
        level: req.body.newDevLvl,
        address: {
            state: req.body.newDevState,
            suburb: req.body.newDevSuburb,
            street: req.body.newDevStreet,
            unit: req.body.newDevUnit
        }
    });
    Devs.save(function (err) {
        if (err) {
            console.log('Error: Can\'t store the details of developer')
            throw err;
        } else {
            console.log('Added to week7Lab');
        }
    });
    res.redirect('/listDevs');
});



//Get the list Developers Page

router.get('/listDevs', function (req, res) {
    Developers.find({}, function (err, data) {
        if (err) throw err;
        res.render(path2Views + '/listDevs.html', {
            devs: data
        });
    });
});

//delete devs page
router.get('/deleteDevs', function (req, res) {
    res.sendFile(path2Views + '/deleteDevs.html');
});


// getting input for dev ID
router.post('/formDeleteDevs', function (req, res) {
    let id = new mongoose.Types.ObjectId(req.body.delDevs);
    Developers.deleteOne({
        _id: id
    }, function (err) {
        if (err) {
            console.log('Error: Delete Form');
            throw err;
        } else {
            console.log('Delete Successful');
        }
    });
    res.redirect('/listDevs');

});

module.exports = router;