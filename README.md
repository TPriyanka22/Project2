# CMPE 281: Cloud Project2 -  Showtime Drivein

University Name: San Jose State University http://www.sjsu.edu/<br/>
Course: Cloud Technologies<br/>
Professor: Sanjay Garje <br/>
Students: [Priyanka Turumalla][2], [Sri Akhil Thaneti][3], [Sai Sanketh Ravva][4]


[1]: https://www.linkedin.com/in/sanjaygarje/  "Sanjay Garje"
[2]: https://www.linkedin.com/in/priyanka-turumalla/  "Priyanka Turumalla"
[3]: https://www.linkedin.com/in/akhil-thaneti/  "Sri Akhil Thaneti"
[4]: https://www.linkedin.com/in/sai-sanketh-ravva/ "Sai Sanketh Ravva"

## Abstract:
Show time Drive-in application is a platform that allows users to explore
information about the movies offered across all the available drive-in locations and enable the users to book slots.
The application offers an admin view along with a User view. The admin will have
access to add and remove the movies based on the upcoming buzz. The users will
have access to the available movies and also utilize the chatbot feature to book the tickets. Image recognition feature
is used to showcase the cast details based on the poster uploaded.

## Architecture Diagram:
<img width="1285" alt="Articture Diagram STdrivein " src="https://user-images.githubusercontent.com/111544172/202353040-641f86de-a23c-4c6a-8859-6ecad21240a4.png">

## AWS Services implemented in the project

1. Amazon Cognito: We have created a user pool in Cognito for users to register or signup and also enabled admin group to add an admin for the application
EC2: We have deployed the application in the EC2 instance. Cloned the repository from github and also installed and configured NGNIX.<br/>

2. Auto Scaling Group: Auto scaling automates the process of addling and removing instances based on the traffic on the application, have set the auto-scaling policy with the desired instance of 1 and a maximum instance of 2 to make the system highly available.<br/>

3. Load Balancer: It aids in the automated distribution of incoming application traffic among various destinations, such as Amazon EC2 instances. This may be applied to several AZs which helps in the fault tolerance.<br/>A application load balancer has been created as part of our project which helps to load balance HTTP/HTTPS applications. Health checks in the load balancer help to check the state of the instance by periodically sending requests to them.<br/>

4. S3: It stands for simple storage service and is object storage in the cloud. It is a place to store flat files This is used to handle and store files such as movie images as per our use case. This bucket will be kept in Standard S3 storage.<br/>

5. DynamoDB: We have created DynamoDB instance to keep track of the user’s associated information. <br/>

6. Route 53: Amazon Route 53 is a domain name service. DNS is used to translate domain names into IP addresses. Computers use IP addresses to identify one another on a network. We registered a domain in AWS ‘https://showtimedrivein.com/’ and created hosted zone and records to route the traffic to the specific domain.<br/>

7. CloudWatch: When the CPU consumption of ec2 instances reaches a high or low threshold, this will be used to generate monitoring for the auto-scaling, ec2, S3 etc.<br/>

8. Lambda: We have configured lambda in implementation of Image Rekognition and Amazon Lex. In case of former the celebrity recognition is performed in the lamda which would be triggered one an image is uploaded in S3.<br/>

9. SNS: The SNS service will be sending the confirmation of slot details to the admin through the mail.<br/>

10. AWS Lex Bot:  We have created a movie booking feature through ChatBot that helps to enhance the user experience.<br/>

11. Amazon Image Rekognition: When ever admin uploads an image/poster to create a slot/movie thus this image is saved in S3 , on upload a lambda event is triggered and image rekognition is performed on the poster to identify the celebrity faces in the poster and save the cast details in dynamo DB.<br/>
