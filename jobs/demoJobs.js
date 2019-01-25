// const mongoose = require("mongoose");
const User = require("../models/User.js");
const Task = require("../models/Task.js");

// mongoose.connect(
//   "mongodb://localhost/mod-5",
//   { useNewUrlParser: true }
// );

const sixHours = 216e5; // adjusts to CST
const sevenHours = 252e5; // when job runs at 12:01am, this time is 11:01pm previous day
const twentyFourHours = 864e5;

incrementStreakForCompletedDailies = (today) => {
  console.log('incrementing streak for completed dailies from', today, '...')
  return new Promise(resolve => {
    Task.find({simpleDateUpdated: today, isRecurring: true, isCompleted: true}, (err, tasks) => {
      tasks.map(task => {
        task.streak++

        task.save( err => {
          if(err) {
            console.error('ERROR!');
          }
        });
      })
      resolve()
    })
  });
}

clearStreakForDailies = (today) => {
  console.log('clearing streak for not done dailies from', today, '...')
  return new Promise(resolve => {
    Task.find({simpleDateUpdated: today, isRecurring: true, isCompleted: false}, (err, tasks) => {
      tasks.map(task => {
        task.streak = 0

        task.save( err => {
          if(err) {
            console.error('ERROR!');
          }
        });
        console.log('not complete streak is 0', task)
      })
      resolve()
    })
  });
}

createDailyTasks = (today) => {
  console.log('creating daily tasks from today...');
  Task.find({simpleDateUpdated: today, isRecurring: true}, (err, tasks) => {
    tasks.map(task => {
      new Task({
        content: task.content,
        userId: task.userId,
        isCompleted: false,
        // isPriority: false,
        isBacklog: false,
        isRecurring: true,
        streak: task.streak,
        dateCreated: new Date(Date.now() + twentyFourHours), // 18 hours ahead of CST for demo
        dateUpdated: new Date(Date.now() + twentyFourHours), // 18 hours ahead of CST for demo
        simpleDateUpdated: parseInt((new Date(Date.now() + twentyFourHours)).toISOString().slice(0,10).replace(/-/g,""))
      }).save()
    })
  });
}

exports.recurringTasks = async () => {
  let simpleToday = parseInt((new Date(Date.now() - sixHours)).toISOString().slice(0,10).replace(/-/g,""))
  await incrementStreakForCompletedDailies(simpleToday);
  await clearStreakForDailies(simpleToday);
  createDailyTasks(simpleToday);
}

exports.rolledOverTasks = () => {
  console.log('should create rollover tasks from today')
  let simpleToday = parseInt((new Date(Date.now() - sixHours)).toISOString().slice(0,10).replace(/-/g,""))
  Task.find({simpleDateUpdated: simpleToday, isCompleted: false, isRecurring: false, isBacklog: false}, (err, tasks) => {
    tasks.map(task => {
      new Task({
        content: task.content,
        userId: task.userId,
        isCompleted: false,
        isPriority: false,
        isBacklog: false,
        isRecurring: false,
        rolledOver: true,
        dateCreated: new Date(Date.now() + twentyFourHours), // 18 hours ahead of CST for demo
        dateUpdated: new Date(Date.now() + twentyFourHours), // 18 hours ahead of CST for demo
        simpleDateUpdated: parseInt((new Date(Date.now() + twentyFourHours)).toISOString().slice(0,10).replace(/-/g,""))
      }).save()
    })
  });
}


setBacklogToFalse = () => {
  console.log('setting backlog .isSuggested to false')
  return new Promise(resolve => {
    Task.find({isBacklog: true}, (err, tasks) => {
      tasks.map(task => {
        task.isSuggested = false

        task.save( err => {
          if(err) {
            console.error('ERROR!');
          }
        });
      })
      resolve()
    })
  });
}

selectItem = () => {
  console.log('sort backlog by priority and .selected')

  User.find({}, (err, users) => {
    users.forEach( user => {
      Task.find({userId: user._id, isBacklog: true}, (err, tasks) => {
        if (!!tasks.length) {
          tasks.sort(function(a,b){return b.isPriority-a.isPriority});
          tasks.sort(function(a,b){return a.suggested-b.suggested});
          let suggestedTask = tasks[0]
          suggestedTask.isSuggested = true
          suggestedTask.suggested++
          suggestedTask.save(err => {
            if(err) {
              console.error('ERROR!');
            }
          })
        }
        // select tasks[0] to update .isSuggested to true, and .suggested++ and save
      })

    })
  })
}

exports.selectSuggestion = async () => {
  //sets all backlog items.isSuggested to false, sorts by priority and .suggested counter
  //then toggles one backlog item to suggest: true, and increments suggested
  await setBacklogToFalse(); // sets all to false
  selectItem();
}
