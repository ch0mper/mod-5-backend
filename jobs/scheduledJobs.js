const mongoose = require("mongoose");
const User = require("../models/User.js");
const Task = require("../models/Task.js");

mongoose.connect(
  "mongodb://localhost/mod-5",
  { useNewUrlParser: true }
);

const sixHours = 216e5; // adjusts to CST
const sevenHours = 252e5; // when job runs at 12:01am, this time is 11:01pm previous day
const twentyFourHours = 864e5;

exports.testWithTasks = () => {
  Task.find({isRecurring: true, isCompleted: true}, (err, tasks) => {
    console.log('recurring', tasks);
  });
}

exports.test = () => {
  console.log('scheduled job test')
}


incrementStreakForCompletedDailies = (yesterday) => {
  console.log('incrementing streak for completed dailies from', yesterday)
  return new Promise(resolve => {
    Task.find({simpleDateUpdated: yesterday, isRecurring: true, isCompleted: true}, (err, tasks) => {
      tasks.map(task => {
        streak: task.streak++

        task.save( err => {
          if(err) {
            console.error('ERROR!');
          }
        });
        resolve(task);
      })
    })
  });
}

createDailyTasks = (yesterday) => {
  Task.find({simpleDateUpdated: yesterday, isRecurring: true}, (err, tasks) => {
    tasks.map(task => {
      new Task({
        content: task.content,
        userId: task.userId,
        // isCompleted: false,
        // isPriority: false,
        // isBacklog: false,
        isRecurring: true,
        streak: task.streak,
        dateCreated: new Date(Date.now() - sixHours), // minus 6 hours for CST
        dateUpdated: new Date(Date.now() - sixHours), // minus 6 hours for CST
        simpleDateUpdated: parseInt((new Date(Date.now() - sixHours)).toISOString().slice(0,10).replace(/-/g,""))
      }).save()
    })
  });
}

exports.recurringTasks = async () => {
  console.log('creating daily tasks from yesterday');
  let simpleYesterday = parseInt((new Date(Date.now() - sevenHours)).toISOString().slice(0,10).replace(/-/g,""))

  await incrementStreakForCompletedDailies(simpleYesterday);
  createDailyTasks(simpleYesterday);

}

///////////////
///////////////
///////////////
///////////////
///////////////

exports.rolledOverTasks = () => {
  console.log('should create rollover tasks from yesterday')
  let simpleYesterday = parseInt((new Date(Date.now() - sevenHours)).toISOString().slice(0,10).replace(/-/g,""))
  Task.find({simpleDateUpdated: simpleYesterday, isCompleted: false, isRecurring: false, isBacklog: false}, (err, tasks) => {
    tasks.map(task => {
      new Task({
        content: task.content,
        userId: task.userId,
        isCompleted: false,
        isPriority: false,
        // isBacklog: false,
        // isRecurring: false,
        rolledOver: true,
        dateCreated: new Date(Date.now() - sixHours), // minus 6 hours for CST
        dateUpdated: new Date(Date.now() - sixHours), // minus 6 hours for CST
        simpleDateUpdated: parseInt((new Date(Date.now() - sixHours)).toISOString().slice(0,10).replace(/-/g,""))
      }).save()
    })
  });
}


// content: {type: String, required: true},
// userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   },
// isCompleted: {type: Boolean},
// isPriority: {type: Boolean},
// isBacklog: {type: Boolean},
// isRecurring: {type: Boolean},
// rolledOver: {type: Boolean},
// streak: {type: Number},
// dateCreated: {type: Date},
// dateUpdated: {type: Date},
// simpleDateUpdated: {type: Number}

/////////////////////////////////////////////

// content: input.content,
// userId: userId,
// isCompleted: false,
// isPriority: false,
// isBacklog: false,
// isRecurring: `${recurringStatus}`, //true from daily, false from mainlist
// rolledOver: true, //when true rendered in rolledover container
// dateCreated: new Date(),
// dateUpdated: new Date(),
// simpleDateUpdated: parseInt((new Date()).toISOString().slice(0,10).replace(/-/g,""))
