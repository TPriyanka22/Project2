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

1. Amazon Cognito: We have created a user pool in Cognito for users to register or signup and also enabled the admin group to add an admin for the application.<br/>

2. EC2: We have deployed the application in the EC2 instance. Cloned the repository from GitHub and also installed and configured NGNIX.<br/>

3. Auto Scaling Group: Auto scaling automates the process of addling and removing instances based on the traffic on the application, have set the auto-scaling policy with the desired instance of 1 and a maximum instance of 2 to make the system highly available.<br/>

4. Load Balancer: It aids in the automated distribution of incoming application traffic among various destinations, such as Amazon EC2 instances. This may be applied to several AZs which helps in the fault tolerance.<br/>A application load balancer has been created as part of our project which helps to load balance HTTP/HTTPS applications. Health checks in the load balancer help to check the state of the instance by periodically sending requests to them.<br/>

5. S3: It stands for simple storage service and is object storage in the cloud. It is a place to store flat files. This is used to handle and store files such as movie images as per our use case. This bucket will be kept in Standard S3 storage and also replicated lifecycle rules and multi-region access points for disaster recovery.<br/>

6. DynamoDB: We have created DynamoDB tables to keep track of the movies created by the admin and movie/slot bookings made by users and also to store the cast details from image rekognition. The tables created as part of our usecase are ‘Movies’, ‘MovieBookings, ’Cast_Details’.<br/>

7. Route 53: Amazon Route 53 is a domain name service. DNS is used to translate domain names into IP addresses. Computers use IP addresses to identify one another on a network. We registered a domain in AWS ‘https://showtimedrivein.com/’ and created hosted zone and records to route the traffic to the specific domain.<br/>

8. CloudWatch: When the CPU consumption of ec2 instances reaches a high or low threshold, this will be used to generate monitoring for the auto-scaling, ec2, S3 etc.<br/>

9. Lambda: We have configured lambda for the implementation of Image Rekognition and Aws Lex. In the case of former, the celebrity recognition is performed in the lamda which would be triggered once an image is uploaded in S3 and in the latter case lex would trigger lambda for every input user enters in the chatbot.<br/>

10. SNS: The SNS service will be sending the confirmation of slot details to the admin through the mail and also sends mail to admin if any bookings are made by user <br/>

11. AWS Lex Bot:  We have created a movie booking feature through ChatBot that helps to enhance the user experience. We have validated the user input using the Dynamo DB table – ‘movies’. We integrated Lex with the react app using amplify.<br/>

12. Amazon Image Rekognition: When ever admin uploads an image/poster to create a slot/movie thus this image is saved in S3 , on upload a lambda event is triggered and image rekognition is performed on the poster to identify the celebrity faces in the poster and save the cast details in dynamo DB.<br/>

## Prerequisites:<br/>

•	Create an AWS account to avail the services used in the application.<br/>

•	Cognito set-up should be done to register the user and admin details.<br/>

•	 An S3 bucket should be created to store the images uploaded by the admin.<br/>

•	Dynamo DB should be created to store movie and movie booking details.<br/>

•	Lambda functions should be set up to do the image rekognition and lex.<br/>

•	Aws lex should be set up to use the chat feature.<br/>

## Steps to run the project locally:<br/>

•	Softwares required – Nodejs and NPM <br/>

•	Clone the project from the given git repository link.<br/>

•	Run ‘npm install’ on both the backend and frontend.<br/>

•	Include a .env file to set the access key and secret key.<br/>

•	Change the configuration in CognitoDetails.js to point to localhost.<br/>

•	On frontend – run ‘npm start’ command and in backend run ‘node index,js’.<br/>

## Demo Screenshots:

•	Home Page of the application:

<img width="453" alt="image" src="https://user-images.githubusercontent.com/111544172/202510450-2f3e0579-7322-42ed-a10f-f59f2cd4fa1e.png">

•	Upon click of login, it redirects to Cognito and the login page appears, before login new user can sign up as shown below:

<img width="453" alt="image" src="https://user-images.githubusercontent.com/111544172/202510634-15dc7e31-5ac4-4c15-b100-d066c66d9d7c.png">


•	Signing in as admin, this user has been created as admin by adding the user mail to the admin group in Cognito.

<img width="453" alt="image" src="https://user-images.githubusercontent.com/111544172/202510780-9119dd0c-f04d-4d56-9d8b-0dba3d5fa3c3.png">


•	The admin view of the Showtime Drive-in showing the available movies :

<img width="453" alt="image" src="https://user-images.githubusercontent.com/111544172/202510875-c422ff3c-307e-4b0b-a675-2b26b90e8887.png">

•	To Create a new slot/movie admin will click on the ‘Create a Slot ‘ button and the below page appears:

<img width="453" alt="image" src="https://user-images.githubusercontent.com/111544172/202511016-a8a2a7fa-692d-42cb-9c2f-933371d8ebe9.png">

<img width="453" alt="image" src="https://user-images.githubusercontent.com/111544172/202511038-b8e29248-f28b-4fa7-b3d9-93f4c1ee73fd.png">

•	Admin would fill the movie details and click on submit:

<img width="453" alt="image" src="https://user-images.githubusercontent.com/111544172/202511101-9a41bb23-218c-47f9-baf5-c2af8dc02237.png">

•	Upon clicking on submit, the slot/movie gets created as below:

<img width="453" alt="image" src="https://user-images.githubusercontent.com/111544172/202511215-78f219b5-d64d-494e-815d-9352b4738bc9.png">

•	On click of the update on the same slot/movie the update movie page appears with prefilled values and the admin can edit the details,  here as per the demo trying to edit the movie length:

<img width="453" alt="image" src="https://user-images.githubusercontent.com/111544172/202511307-d69958e4-64a9-41d4-856a-028d7afd142d.png">

•	Once the admin clicks on the Update button, the user view would be updated with the latest changes as below- ‘RRR’ move length has been changed:

<img width="453" alt="image" src="https://user-images.githubusercontent.com/111544172/202511365-50635317-0c69-4fb4-b28c-54a8920898fb.png">

•	To delete the slot admin will click on the delete button as shown below which would delete the movie here as well in the Dynamo DB Table

<img width="453" alt="image" src="https://user-images.githubusercontent.com/111544172/202511407-e5f73203-b81f-44b6-802b-2e47870177b7.png">


•	Click on logout and  now login in as a ‘user’  to get into user view:

<img width="453" alt="image" src="https://user-images.githubusercontent.com/111544172/202511500-4c948e6a-d365-49ea-9054-60e86f868958.png">

•	The user view page would display the movies created by the admin where the user cannot create/update/delete the records but can browse through the available movies and book the tickets or can also book through the chatbot.

<img width="453" alt="image" src="https://user-images.githubusercontent.com/111544172/202511567-fe556c3c-77a9-4286-8da6-3d1fda23c213.png">

•	On click of the movie the poster would be visible along with the other details:

<img width="453" alt="image" src="https://user-images.githubusercontent.com/111544172/202511631-a65a0536-d15c-45bd-9e0c-dd21e4b20aba.png">

<img width="453" alt="image" src="https://user-images.githubusercontent.com/111544172/202511710-6faa99f6-cd1e-4ac9-a511-c66447c221a4.png">


•	Users can book the drive-in slots using the book button :

<img width="453" alt="image" src="https://user-images.githubusercontent.com/111544172/202511797-4848f7f8-bc9f-46ce-b801-38da9de090ef.png">

•	Users can also book the tickets using the chatbot feature as shown below:

<img width="453" alt="image" src="https://user-images.githubusercontent.com/111544172/202511868-26824b26-7673-47d8-a514-f4adf3046429.png">

<img width="453" alt="image" src="https://user-images.githubusercontent.com/111544172/202511900-4a0ddb70-4b93-460e-9cf0-fd722290c72a.png">

•	User bookings can be viewed upon clicking on the user on the top-right corner and the below page would appear which would include the total no of bookings made by the user and the tickets booked through the chatbot and the user view page(showcased above) are also attached below:

<img width="453" alt="image" src="https://user-images.githubusercontent.com/111544172/202512028-2aec486d-1ba2-4597-896f-ee7d9e69a5b6.png">

<img width="453" alt="image" src="https://user-images.githubusercontent.com/111544172/202512067-8d04631b-496c-4872-8b0e-1bd6ae4f0c79.png">

<img width="453" alt="image" src="https://user-images.githubusercontent.com/111544172/202512107-dcc58adb-eba8-4bbe-a750-a3a6a69ba9a6.png">

