
var AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();


exports.handler = (event, context, callback) => {
  
  console.log(event);
  console.log(context);
    const slots = event.currentIntent.slots;
    const movieName = slots.MovieName;
    const movieLocation = slots.MovieLocation;
    const movieDate = slots.MovieDate;
    const userEmail = slots.Useremail;
    const movieTickets = slots.Tickets;
    
    console.log(slots);
    
    console.log(movieLocation);
    
    const params = {  
      TableName: "MovieBookings",
      Item: {
        BookingId: context.awsRequestId,
        MovieName: movieName,
        MovieLocation: movieLocation,
        BookingDate:movieDate,
        UserEmail: userEmail,
        MovieSlots:movieTickets,
        //UserCVV: userCVV
      }
    };
    
    console.log(params);
    
    dynamoDb.put(params, (error, result) =>{
      if(error){
       console.log(error); 
      }
      else{
        
        callback(null, {
          "sessionAttributes": JSON.stringify(event.slots),
          "dialogAction": {
          "type": "Close",
          "fulfillmentState": "Fulfilled",
          "message": {
              "contentType": "PlainText",
              "content": "We have successfully booked your show for "+movieName.toUpperCase()+" at "+movieLocation.toUpperCase()+" on "+movieDate+" with "+ movieTickets+" tickets , Thank You for choosing ShowTime DriveIn..!"
          }
          }
        });
      }
    });
};
