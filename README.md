# EcoHabit

## 1. Project Description
EcoHabit is an educational habit builder to help users make lifestyle changes that reduce their impact on climate change.

## 2. Names of Contributors
* Azura L - 
* Echo W - 
* Kalvin L - 
	
## 3. Technologies and Resources Used
* HTML, CSS, JavaScript
* node.js
* express.js
* Bootstrap 5.0 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)
* OpenAI API (for accessing AI model developed by OpenAI.)
* Sweet Alert 2 (Frontend library to make the popup more visually pleasing)

## 4. Complete setup/installion/usage
* Run the following commands on your cmd / terminal:
     npm init
     npm install
     node server.js
*    and open http://localhost:8080/
* Create an account or login with your email address and password, and you will be redirected to the main page of EcoHabit.
* Add or remove habits to your habit list, keep track of it everyday.
* See your history stats in the stats page.
* Learn more knowledge about green habits and climate change in the chatbot page.
*  Edit your profile in your profile page.

## 5. Known Bugs and Limitations
* ...
* ...
* ...

## 6. Features for Future
What we'd like to build in the future:
* Share stats with friends
* Ranking
* More interactions with the polar bear
	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── package.json             # Json file to manage dependencies and scripts for the project.
├── package-lock.json        # Contains the version of the installed packages
├── server.js                # The server-side js for the project.
└── README.md                # The read me file 

It has the following subfolders and files:
├── app/html                 # contains the HTML files for different pages     
    /index.html              
    /login.html
    /main.html
    /stats.html
    /chat.html
    /profile.html
    /aboutus.html
├── public                   
    ├── css                   # contains the styling rules for the application
        /style.css
    ├── js                    # contains several JavaScript files used in the application
        /authentication.js
        /common.js
        /index.js
        /chat.js
        /main.js
        /scroll.js
        /skeleton.js
        /stats.js         
├── text                      # contains header and navbar files.
    /header.html
    /nav.html
    /nonactive-nav.html                
