import json
import urllib.parse
import boto3

print('Loading function')
sns = boto3.client('sns')

def lambda_handler(event, context):
    print(event)
    movie_name=event['Records'][0]['dynamodb']['NewImage']['MovieName']['S']
    movie_location=event['Records'][0]['dynamodb']['NewImage']['MovieLocation']['S']
    movie_date=event['Records'][0]['dynamodb']['NewImage']['BookingDate']['S']
    user_email=event['Records'][0]['dynamodb']['NewImage']['UserEmail']['S']
    slots=event['Records'][0]['dynamodb']['NewImage']['MovieSlots']['S']
   
    sns_message = str("your movie "+movie_name+" on "+movie_date+" at "+  movie_location+" user: "+user_email+" slots " +slots+" was booked......!")
    try:
        
        sns_response = sns.publish(
        TargetArn='arn:aws:sns:us-east-1:130140781510:movie_booking',
        Message= str(sns_message),
        Subject= str("your movie is booked")
        
        )

    except Exception as e:
        print(e)
    
        raise e