const scheduler = require('node-schedule');
const jobs = require('./scheduledJobs');

console.log('scheduler script is running...')

let dailyRule = new scheduler.RecurrenceRule();
dailyRule.hour = 9; // everyday at 12:01am cst
dailyRule.minute = 34

let every30secRule = new scheduler.RecurrenceRule();
every30secRule.second = 30; // every 30 seconds

let testRule = new scheduler.RecurrenceRule();
testRule.hour = 12; // everyday at 12:01am cst
testRule.minute = 36

scheduler.scheduleJob(dailyRule, jobs.selectSuggestion)

scheduler.scheduleJob(dailyRule, jobs.rolledOverTasks) // creates rollover tasks from yesterday

scheduler.scheduleJob(dailyRule, jobs.recurringTasks) // creates daily tasks from yesterday
