const scheduler = require('node-schedule');
const jobs = require('./scheduledJobs');

console.log('scheduler script is running...')

let dailyRule = new scheduler.RecurrenceRule();
dailyRule.hour = 9; // everyday at 12:01am cst
dailyRule.minute = 34

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
// jobs.recurringTasks();

let testRule = new scheduler.RecurrenceRule();
testRule.hour = 12; // everyday at 12:01am cst
testRule.minute = 5

scheduler.scheduleJob(testRule, jobs.selectSuggestion)

scheduler.scheduleJob(dailyRule, jobs.rolledOverTasks) // creates rollover tasks from yesterday
scheduler.scheduleJob(dailyRule, jobs.recurringTasks) // creates daily tasks from yesterday
