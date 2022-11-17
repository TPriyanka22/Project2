var AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {

    const slots = event.currentIntent.slots;
    const movieName = slots.MovieName;
    const movieLocation = slots.MovieLocation;
    const movieDate = slots.MovieDate;
    const userEmail = slots.Useremail;
    const movieTickets = slots.Tickets;
    
    if(movieName && !(movieName === "") && (movieLocation == null))
    {
        
        const params = { 
            TableName: "movies",
            FilterExpression: 'contains (movie_name, :movie_name)',
            ExpressionAttributeValues: {
                ':movie_name':movieName.toUpperCase(),
            },
        }; 
        
        dynamoDb.scan(params, (error, result) => {

            if (error) { 
                console.log(error);
            }
            console.log(params);
            console.log("result is",result);
            console.log(result.Count);
            if (result.Count > 0) { 
                console.log(result);
                let response = {
                    sessionAttributes: event.sessionAttributes,
                    dialogAction: {
                        type: "Delegate",
                        slots: event.currentIntent.slots,
                    }
                };
                callback(null, response);
            } 
            else { 
                
                let response = { 
                    sessionAttributes: event.sessionAttributes,
                    dialogAction: {
                        type: "ElicitSlot",
                        message: {
                            contentType: "PlainText",
                            content: `please enter valid movie name.`
                        },
                        intentName: event.currentIntent.name,
                        slots: slots,
                        slotToElicit : "MovieName",
                    }
                };
                callback(null, response);
            }  
        });
    }
    if(movieName && !(movieName === "") && movieLocation && !(movieLocation === "") && (movieDate === null))
    {
        
        const event_search_params = {
            TableName: "movies",
            IndexName: 'city-index',
            KeyConditionExpression: "#city = :city",
            FilterExpression: 'contains (movie_name, :movie_name)',
            ExpressionAttributeNames: {
                '#city': 'city'
            },
            ExpressionAttributeValues: {
                ':city': movieLocation.toUpperCase(),
                ':movie_name': movieName.toUpperCase()
            }
        };
        dynamoDb.query(event_search_params, (error, result) => {

            if (error) { 
                console.log(error);
            }
            if (result.Count > 0) { 
                let response = {
                    sessionAttributes: event.sessionAttributes,
                    dialogAction: {
                        type: "Delegate",
                        slots: event.currentIntent.slots,
                    }
                };
                callback(null, response);
            } 
            else { 
                
                let response = { 
                    sessionAttributes: event.sessionAttributes,
                    dialogAction: {
                        type: "ElicitSlot",
                        message: {
                            contentType: "PlainText",
                            content: `please enter valid movie location.`
                        },
                        intentName: event.currentIntent.name,
                        slots: slots,
                        slotToElicit : "MovieLocation",
                    }
                };
                callback(null, response);
            }  
        });

    }
    else if(movieName == null || movieDate || userEmail || movieTickets)
    {
        let response = {
                sessionAttributes: event.sessionAttributes,
                dialogAction: {
                    type: "Delegate",
                    slots: event.currentIntent.slots,
                }
            };
        callback(null, response);
    }
};

