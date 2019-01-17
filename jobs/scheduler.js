const scheduler = require('node-schedule');
const jobs = require('./scheduledJobs');

console.log('scheduler script is running...')

let dailyRule = new scheduler.RecurrenceRule();
dailyRule.hour = 12; // everyday at 11am cst

let every30secRule = new scheduler.RecurrenceRule();
every30secRule.second = 30; // every 30 seconds

// scheduler.scheduleJob(every30secRule, jobs.test);

// scheduler.scheduleJob(every30secRule, function(){
//   console.log('recurring at 11am cst');
// });

scheduler.scheduleJob(dailyRule, function(){
  console.log('this runs at 12pm cst');
});


// scheduler.scheduleJob('3 11 * * *', function(){
//   console.log('executes when the hour is 11:03am cst');
// });

// let rule = new scheduler.RecurrenceRule();
// rule.hour = 7
// rule.dayOfWeek = new schedule.Range(0,6)
//
// let dailyJob = schedule.scheduleJob(date, function(){
//   console.log('I run on days at 7:00');
// });

// '00 30 11 * * 1-5' - Runs every weekday (Monday through Friday) at 11:30:00 AM. It does not run on Saturday or Sunday.
