#Cloudwatch Logs CLI
Use this package to fetch Cloudwatch logs from the command line.

## Installation
```
npm install -g cloudwatch-logs
```

## Usage
```
Usage: cloudwatch-logs [options] <log-group>

  Options:

    -h, --help                 output usage information
    -r, --aws-region [region]  AWS region
    -f, --follow               Follow logs
    -l, --limit [limit]        Limit
```

For example:
```
cloudwatch-logs -f server-logs
```

## Prerequisites
You should have your AWS credentials defined in your environment variables.
To make sure, run `aws configure`.
