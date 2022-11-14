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

console.log("bookings",AWS.config);

router.post('', async (req, res) => {
    let booking_id = uuid();
    let movie_id = req.params.movie_id;
    let result_booking;


const movie_booking_params = {
        TableName: "MovieBookings",
        Item: {
            "BookingId" : booking_id,
            "MovieName" : req.body.MovieName,
            "MovieLocation" : req.body.MovieLocation,
            "BookingDate" : req.body.BookingDate,
            "MovieSlots" : req.body.MovieSlots,
            "UserEmail" : req.body.UserEmail
        },
        ConditionExpression: "attribute_not_exists(booking_id)"
    };
    res.setHeader('Access-Control-Allow-Origin', '*');
    try{
        result_booking = await dynamodbDocClient.put(movie_booking_params).promise();
    } catch (err) {
        console.error("Unable to add booking to movie booking table", JSON.stringify(err));
        return res.status(500).json({error: "Unable to add booking to movie booking table"});
    }
    res.status(200).json({message: "Booking created successfully"})
})

module.exports = router;