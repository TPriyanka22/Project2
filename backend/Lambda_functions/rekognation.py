from __future__ import print_function
import boto3
import time, urllib
import json
print ("*"*80)
print ("Initializing..")
print ("*"*80)
dy_client=boto3.client('dynamodb')
Tab_name="cast_details"
s3 = boto3.client('s3')

def lambda_handler(event, context):
    print("source_bucket",event);
    print("target",context);
    source_bucket = event['Records'][0]['s3']['bucket']['name']
    print("firstbucket",source_bucket)
    object_key = event['Records'][0]['s3']['object']['key']
    print("2ndbucket",object_key)
    rekognition = boto3.client('rekognition')
    response = rekognition.recognize_celebrities(
        Image={
            'S3Object': {
                'Bucket': source_bucket,
                'Name': object_key
            }
        }
    )
    
    people = []
    for face in response['CelebrityFaces']:

        info = rekognition.get_celebrity_info(
            Id=face['Id']
        )

        people.append(face['Name'])
    print("hi")
    print(people)
    listToStr = ' || '.join(map(str, people))
    response=dy_client.put_item(
        TableName=Tab_name,
        Item={
            'poster_name':{
                'S':object_key
            },
            'cast':{
                'S':listToStr
            }
        }
    )