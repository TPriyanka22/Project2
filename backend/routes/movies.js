const express = require('express');
const AWS = require('aws-sdk');
const router = new express.Router();
const uuid = require('uuidv4').default;

const dynamodbDocClient = new AWS.DynamoDB.DocumentClient({
    region: process.env.region,

    endpoint: "http://dynamodb.us-east-1.amazonaws.com",
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey}
);


router.put('/:movie_id', async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    const movie_id = req.params.movie_id;
    console.log("Updating records based on movie_id", movie_id);
    try {
        const movies_params = {
            TableName: "movies",
            Key: {
                "movie_id": movie_id
            },
            UpdateExpression: "set movie_name = :name,#location=:location, city=:city, about=:about, genre=:genre, release_date=:release_date, #booking_date=:booking_date, booking_time=:booking_time, movie_length=:movie_length",
            ExpressionAttributeNames: {
                '#booking_date': 'booking_date',
                '#location': 'location'
            },
            ExpressionAttributeValues: {
                ":name": req.body.name,
                ":location": req.body.location,
                ":city": req.body.city,
                ":about": req.body.about,
                ":genre": req.body.genre,
                ":release_date": req.body.releasedate,
                ":booking_date": req.body.bookingdate,
                ":booking_time": req.body.bookingtime,
                ":movie_length": req.body.movielength,
            },
            ReturnValues: "UPDATED_NEW"
        };
        let movies_update_result = await dynamodbDocClient.update(movies_params).promise();
        console.log("movies update results", movies_update_result);
        return res.json(movies_update_result);

    } catch (err) {
        console.log(err);
        res.status(500).json({error_message: "Error occurred while updating movie", error: err});
    }
})

router.get('/all', async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    let movie_results;
    const movie_params = {
        TableName: "movies",
    };
    try {
        movie_results = await dynamodbDocClient.scan(movie_params).promise();
        
        if (movie_results && movie_results.Items && movie_results.Items.length > 0) {
            return res.json(movie_results.Items);
        } else {
            return res.status(404).json({error: "events not found"});
        }
    } catch (err) {
        res.status(500).json({error_message: "Error occurred while fetching event", error: err});
    }
})

router.get('/:movie_id', async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    const movie_id = req.params.movie_id;
    console.log("Getting movies based on movie id", movie_id);
    try {
        const movies_param = {
            TableName: "movies",
            KeyConditionExpression: "#movie_id = :movie_id",
            ExpressionAttributeNames: {
                '#movie_id': 'movie_id',
            },
            ExpressionAttributeValues: {
                ':movie_id': movie_id
            }
        };
        let movie_result;

        movie_result = await dynamodbDocClient.query(movies_param).promise();
        //console.log("event query results :", event_result);
        if(movie_result && movie_result.Items && movie_result.Items.length > 0) {
            console.log("Event Query results in backend", movie_result.Items);
            return res.json(movie_result.Items);
        }
        else {
            return res.status(404).json({error: "Event not found"});
        }
    }
    catch (err) {
        res.status(500).json({error_message: "Error occurred while fetching event", error: err});
    }
})
router.get('/:image_name/cast', async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    const image_name = req.params.image_name;
    console.log("Getting cast based on image_name", image_name);
    try {
        const movies_param = {
            TableName: "cast_details",
            KeyConditionExpression: "#poster_name = :poster_name",
            ExpressionAttributeNames: {
                '#poster_name': 'poster_name',
            },
            ExpressionAttributeValues: {
                ':poster_name': image_name
            }
        };
        let movie_result;

        movie_result = await dynamodbDocClient.query(movies_param).promise();
       
        if(movie_result && movie_result.Items && movie_result.Items.length > 0) {
           
            return res.json(movie_result.Items);
        }
        else {
            return res.status(404).json({error: "Event not found"});
        }
    }
    catch (err) {
        res.status(500).json({error_message: "Error occurred while fetching event", error: err});
    }
})
module.exports = router;
