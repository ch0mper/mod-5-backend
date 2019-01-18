const scheduler = require('node-schedule');
const jobs = require('./scheduledJobs');

console.log('scheduler script is running...')

let dailyRule = new scheduler.RecurrenceRule();
dailyRule.hour = 0; // everyday at 9:30am cst
dailyRule.minute = 01

let every30secRule = new scheduler.RecurrenceRule();
every30secRule.second = 30; // every 30 seconds

// scheduler.scheduleJob(every30secRule, jobs.test);
// scheduler.scheduleJob(every30secRule, jobs.testWithTasks);
// scheduler.scheduleJob(every30secRule, function(){
//   console.log('recurring at 11am cst');
// });

// scheduler.scheduleJob(dailyRule, function(){
//   console.log('this runs at 1:42pm cst');
// });

scheduler.scheduleJob(dailyRule, jobs.recurringTasks) // should create daily tasks from yesterday
scheduler.scheduleJob(dailyRule, jobs.rolledOverTasks) // should create rollover tasks from yesterday
