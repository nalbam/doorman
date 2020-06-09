/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION

Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var bodyParser = require('body-parser')
var express = require('express')

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "doorman-users";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}

const userIdPresent = false; // TODO: update in case is required to use that definition
const partitionKeyName = "user_id";
const partitionKeyType = "S";
const sortKeyName = "latest";
const sortKeyType = "N";
const hasSortKey = sortKeyName !== "";
const path = "/items";
const UNAUTH = 'UNAUTH';
const hashKeyPath = '/:' + partitionKeyName;
const sortKeyPath = hasSortKey ? '/:' + sortKeyName : '';
// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

// convert url string param to expected Type
const convertUrlType = (param, type) => {
  switch (type) {
    case "N":
      return Number.parseInt(param);
    default:
      return param;
  }
}

/********************************
 * HTTP Get method for list objects *
 ********************************/

app.get(path + hashKeyPath, function (req, res) {
  console.log(`scan: ${JSON.stringify(req.params)}`);

  let image_type = req.params['user_id'];
  let latest = Date.now() - (60 * 60 * 1000);

  let queryParams = {
    TableName: tableName,
    FilterExpression: 'image_type = :image_type and latest > :latest',
    ExpressionAttributeValues: {
      ':image_type': image_type,
      ':latest': latest,
    },
  }

  console.log(`scan: ${JSON.stringify(queryParams)}`);
  dynamodb.scan(queryParams, (err, data) => {
    if (err) {
      console.log('scan: ' + err.message);
      res.statusCode = 500;
      res.json({ error: 'Could not load items: ' + err });
    } else {
      console.log('scan: ' + data.Items.length);
      res.json(data.Items);
    }
  });
});

/*****************************************
 * HTTP Get method for get single object *
 *****************************************/

app.get(path + '/object' + hashKeyPath + sortKeyPath, function (req, res) {
  var params = {};

  params[partitionKeyName] = req.params[partitionKeyName];
  try {
    params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: 'Wrong column type ' + err });
  }

  let getItemParams = {
    TableName: tableName,
    Key: params
  }

  console.log(`get: ${JSON.stringify(getItemParams)}`);
  dynamodb.get(getItemParams, (err, data) => {
    if (err) {
      console.log('get: ' + err.message);
      res.statusCode = 500;
      res.json({ error: 'Could not load items: ' + err.message });
    } else {
      if (data.Item) {
        res.json(data.Item);
      } else {
        res.json(data);
      }
    }
  });
});

/************************************
* HTTP put method for insert object *
*************************************/

app.put(path, function (req, res) {
  var params = {};
  try {
    params = {
      user_id: req.body.user_id,
    };
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: 'Wrong column type ' + err });
  }

  let latest = Date.now();

  let upateItemParams = {
    TableName: tableName,
    Key: params,
    UpdateExpression: 'SET user_name = :user_name, real_name = :real_name, image_type = :image_type, latest = :latest',
    ExpressionAttributeValues: {
      ':user_name': req.body.user_name,
      ':real_name': req.body.real_name,
      ':image_type': 'trained',
      ':latest': latest,
    },
  };

  console.log(`put: ${JSON.stringify(upateItemParams)}`);
  dynamodb.update(upateItemParams, (err, data) => {
    if (err) {
      console.log('put: ' + err.message);
      res.statusCode = 500;
      res.json({ error: err, url: req.url, body: req.body });
    } else {
      res.json({ success: 'put call succeed!', url: req.url, data: data })
    }
  });
});

app.listen(3000, function () {
  console.log('App started')
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
