const express = require('express');
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const index = express()
const fileupload = require('express-fileupload');
let cors = require('cors');
const filesystem = require('fs');
const router = new express.Router();
const uuid = require('uuidv4').default;
const dotenv = require('dotenv');
const parseResult = dotenv.config()
if (parseResult.error) {
  throw parseResult.error
}

router.use(express.json())
  router.use(cors())
  router.use(express.urlencoded({ extended: true }))

router.use(fileupload({
    useTempFiles: true,
    tempFileDir: 'tmp'
  }));


function unlinkanddeletetempfilepath(tempFilePath) {
    try {
      filesystem.unlinkSync(tempFilePath)
    } catch (error) {
      console.error("There was an error in deleting the temp file " + error);
    }
  }
  
  const S3bucket = new AWS.S3({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey
  });
  
  const dynamoDB = new AWS.DynamoDB({ apiVersion: '2012-08-10' ,
      region: "us-east-1",
      endpoint: "http://dynamodb.us-east-1.amazonaws.com",
      accessKeyId: process.env.accessKeyId,
      secretAccessKey: process.env.secretAccessKey});

const dynamodbDocClient = new AWS.DynamoDB.DocumentClient({
    region: process.env.region,
    endpoint: "http://dynamodb.us-east-1.amazonaws.com",
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey}
);
router.post('/:user_id/movies', function (request, response) {
    console.log(request.files);
    console.log(request.body);
    const contentoffile = filesystem.createReadStream(request.files.inputFile.tempFilePath);
  const bucketparameters = {
    Bucket: "stdrivein",
    Key: request.files.inputFile.name,
    Body: contentoffile,
    ContentType: request.files.inputFile.mimetype
  };

  // Uploading files to the bucket
  S3bucket.upload(bucketparameters, function (error, data) {
    if (error) {
      console.log("Unable to upload file at this time", error);
      return response.status(500).send(`Unable to upload the file. ${error}`)
      // Send 500 Response 
    } else {
      unlinkanddeletetempfilepath(request.files.inputFile.tempFilePath);
      insertdetailsintoDB();
       console.log("request.body.name",request.body.name);
      console.log(`File uploaded successfully. ${data.Location}`);
      return response.status(200).send(`File has been uploaded successfully to the s3 bucket. ${data.Location}`)
    }
  });

function insertdetailsintoDB() {
    const movies_params = {
        TableName: "movies",
        Item: {
            "movie_id": { S : uuid() },
            "movie_name": { S: request.body.name },
            "about": { S: request.body.about },
            "genre": { S: request.body.genre },
            "release_date": { S: request.body.releasedate },
            "booking_date": { S: request.body.bookingdate },
            "booking_time": { S: request.body.bookingtime },
            "location": { S: request.body.location },
            "city": { S: request.body.city },
            "image_name": { S: request.files.inputFile.name },
            "movie_length": { S: request.body.movielength },
            "user_id": { S: request.params.user_id }
        },
        ConditionExpression: "attribute_not_exists(movie_id)"
    };
    dynamoDB.putItem(movies_params, function (error, data) {
        if (error) {
          console.log("There was an error inserting data", error);
        } else {
          console.log("data added successfully", data);
        }
      });
    // response.status(200).json({message: "movie added successfully"});
}
});

router.get('/:user_id/movies', async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    const user_id = req.params.user_id;
    console.log("Fetching records based on userid", user_id);
    let movie_results;
    const movie_params = {
        TableName: "movies",
        IndexName: 'users-index',
        KeyConditionExpression: "#user_id = :user_id",
        ExpressionAttributeNames: {
            '#user_id': 'user_id',
        },
        ExpressionAttributeValues: {
            ':user_id': user_id
        }
    };
    try {
        movie_results = await dynamodbDocClient.query(movie_params).promise();
        console.log("movie_results :", movie_results);

        if (movie_results && movie_results.Items && movie_results.Items.length > 0) {
            console.log("movie Query results", movie_results.Items);
            return res.json(movie_results.Items);
        } else {
            return res.status(404).json({error: "movies not found"});
        }
    } catch (err) {
        res.status(500).json({error_message: "Error occurred while fetching movies", error: err});
    }
})


router.delete('/:user_id/movies/:movie_id', async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    const user_id = req.params.user_id;
    const movie_id = req.params.movie_id;
    console.log(`Deleting records based on user_id = ${user_id} and event_id = ${movie_id}`);
    try {
        const movie_params = {
            TableName: "movies",
            Key: {
                "movie_id": movie_id
            }
        };
        let movies_result = await dynamodbDocClient.delete(movie_params).promise();
        console.log("movie delete results", movies_result);
        return res.status(200).json({message: "movie deleted successfully"});

    } catch (err) {
        console.log(`Error occurred deleting movie with movie_id ${movie_id}`);
        res.status(500).json({error_message: "Error occurred while deleting movie", error: err});
    }
})

router.delete('/:image_name/deletecast', async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    
    const image_name = req.params.image_name;
    
    try {
        const movie_params = {
            TableName: "cast_details",
            Key: {
                "poster_name": image_name
            }
        };
        let movies_result = await dynamodbDocClient.delete(movie_params).promise();
        console.log("cast delete results", movies_result);
        return res.status(200).json({message: "cast deleted successfully"});

    } catch (err) {
        console.log(`Error occurred deleting cast with postername ${image_name}`);
        res.status(500).json({error_message: "Error occurred while deleting cast", error: err});
    }
})


router.get('/:user_id/booking', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const user_id = req.params.user_id;
    console.log("Fetching bookings based on userid", user_id);
    let booking_results;
    const booking_params = {
        TableName: "MovieBookings",
        IndexName: 'users-index',
        KeyConditionExpression: "#UserEmail = :UserEmail",
        ExpressionAttributeNames: {
            '#UserEmail': 'UserEmail',
        },
        ExpressionAttributeValues: {
            ':UserEmail': user_id
        }
    };
    try {
        booking_results = await dynamodbDocClient.query(booking_params).promise();
        console.log("booking_results :", booking_results);

        if(booking_results && booking_results.Items && booking_results.Items.length > 0 ) {
            console.log("bookings Query results", booking_results.Items);
            return res.json(booking_results.Items);
        } else {
            return res.status(404).json({error: "Bookings not found"});
        }
    } catch (err) {
        res.status(500).json({error_message: "Error occurred while fetching booking", error: err});
    }
})

module.exports = router;
