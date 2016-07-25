var AWS = require('aws-sdk');
var program = require ('commander');

program
.usage('[options] <log-group>')
.option('-r, --aws-region [region]', 'AWS region', 'us-west-2')
.option('-f, --follow', 'Follow logs')
.option('-l, --limit [limit]', 'Limit')
.parse(process.argv);

var cloudwatchlogs = new AWS.CloudWatchLogs({region:program.awsRegion});

var initialParams = {
  logGroupName: program.args[0], /* required */
  interleaved: true,
  limit: program.limit
};

initialParams.startTime = new Date().getTime()-60000;

function getLogs(params) {
    cloudwatchlogs.filterLogEvents(params, function(error, data) {
        if (error) {
            return console.error(error);
        }
        if (data.events.length !== 0) {
            data.events.forEach(function(event) {
                console.log(new Date(event.timestamp) + ' : ' + event.message);
            });
        }

        if (data.nextToken){
          params.nextToken = data.nextToken;
          return setTimeout(getLogs, 0, params);
        }

        if (program.follow){
          params.startTime = (data.events.length && data.events[data.events.length -1].timestamp+1)||(initialParams.startTime);
          params.nextToken = undefined;
          setTimeout(getLogs, 2000, params);
        }
    });
}

setTimeout(getLogs, 2000, initialParams);
