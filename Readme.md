# Backend link to render.com that returns all the lessons
Render.com link for backend: https://backend-hhxg.onrender.com/lessons

# Backend repositary link
Link to my GitHub repository = https://github.com/Laxsan24/Backend.git

# Backend
For backend I used server.js,node.js, express.js, mongoDB atlas, morgan, cors, dotenv, fs, path and I involved my images folder.
In my server.js file node.js and express are connected to mongoDB atlas. The API has my lessons,orders, images and static files from the application.

I used a .env and .gitignore files which protects the important information like the MongoDB URL password, username and port number. It also ignores the node_modules folder as it takes a lot of information.



# Running the code
node server.js

# API endpoints
GET /lessons which returns the lessons collections
POST /orders which creates new orders inside the order collections
PUT /lessons/:id which updates the lessons by MongoDB.

# Static files
Images are stored in the /images folder

# Logger middleware
Using morgan which used for logging HTTP requests and involved information of requests like URL, IP address, method and date.

# Error 404
Gives an error that doesn't go to the route it needs to go to.

# Database
Connected to the database from mongoDB atlas called shopping and has two collections which are lessons and orders.

# Testing API
Testing the API you use POSTMAN and test methods to see if its working.