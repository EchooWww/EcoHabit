# EcoHabit

## 1. Project Description
EcoHabit is an educational habit builder to help users make lifestyle changes that reduce their impact on climate change.

## 2. Names of Contributors
* Azura Lasai 
* Echo Wang 
* Kalvin Leung 
	
## 3. Technologies and Resources Used
* HTML, CSS, JavaScript
* node.js
* express.js
* JQuery
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
* Edit your profile in your profile page.

## 5. Known Bugs and Limitations
* Adding habits would sometimes add duplicate documents in firebase.
* The resetting function of habit sometimes doesn't work.

## 6. Features for Future
What we'd like to build in the future:
* Share stats with friends
* Achievement system
* More interactions with the polar bear
* Media queries for web browsers with wider resolutions
	
## 7. Contents of Folder
Content of the project folder:
```bash
Top level of project folder: 
├── .gitignore               # Git ignore file
├── package.json             # Json file to manage dependencies and scripts for the project.
├── package-lock.json        # Contains the version of the installed packages
├── server.js                # The server-side js for the project.
└── README.md                # The read me file 

Subfolders and files:
    ├── app                     # Contains the HTML files for the different pages of the app
    │   └── html
    │       ├── aboutus.html    # About Us page
    │       ├── chat.html       # AI chat page
    │       ├── index.html      # Landing page
    │       ├── login.html      # Login page
    │       ├── main.html       # Main page
    │       ├── profile.html    # Profile page
    │       └── stats.html      # Calendar page
    ├── public                  # Contains the CSS, JS, and image files for the app
    │   ├── css
    │   │   ├── style.css       # CSS file for styling the app
    │   │   ├── profile.css     # CSS file for styling the profile page
    │   │   └── stats.css       # CSS file for styling the stats page
    │   ├── js
    │   │   ├── authentication.js   # JS file for authentication
    │   │   ├── chat.js         # JS file for chat functionality
    │   │   ├── common.js       # JS file for common functionality
    │   │   ├── index.js        # JS file for index page functionality
    │   │   ├── main.js         # JS file for main page functionality
    │   │   ├── profile.js      # JS file for profile page functionality
    │   │   ├── scroll.js       # JS file for scroll functionality in chat.html
    │   │   ├── skeleton.js     # JS file for skeleton functionality
    │   │   └── stats.js        # JS file for stats page functionality
    │   └── img
    │   │   ├── apple-touch-icon.png    # Polar bear icon           Source: 
    │   │   ├── Azura.jpeg              # About us profile picture
    │   │   ├── background.jpg          # Background image          Source: https://coolwallpapers.me/2638488-mountains.html
    │   │   ├── backgroundprofile.jpg   # Profile background image  Source: https://coolwallpapers.me/2638488-mountains.html
    │   │   ├── Echo.jpeg               # About us profile picture
    │   │   ├── favicon-16x16.png       # Favicon icon              Source: 
    │   │   ├── favicon-32x32.png       # Favicon icon              Source: 
    │   │   ├── favicon.png             # Favicon icon              Source: 
    │   │   ├── home-active.svg         # Active Home icon          Source: 
    │   │   ├── home.svg                # Inactive Home icon        Source: 
    │   │   ├── kalvin.png              # About us profile picture
    │   │   ├── learn-active.svg        # Active Learn icon         Source: 
    │   │   ├── learn.svg               # Inactive Learn icon       Source: 
    │   │   ├── logo.png                # Polar bear logo           Source: 
    │   │   ├── logo2.png               # Polar bear logo #2        Source: https://vectorified.com/download-image#polar-bear-icon-34.png
    │   │   ├── logo3.png               # EcoHabit logo
    │   │   ├── Screen1.png             # Phone mockup #1
    │   │   ├── Screen2.png             # Phone mockup #2
    │   │   ├── Screen3.png             # Phone mockup #3
    │   │   ├── sit-interact.gif        # Active sitting bear gif
    │   │   ├── sit.gif                 # Sitting bear gif
    │   │   ├── sleep-interaction.gif   # Active sleeping bear gif
    │   │   ├── sleep.gif               # Sleeping bear gif
    │   │   ├── stats-active.svg        # Active stats icon         Source:
    │   │   ├── stats.svg               # Inactive stats icon       Source:     
    │   │   └── user-profile.png        # Default profile picture   Source:
    └── text                    # Contains the HTML files for the header and navigation
        ├── header.html         # HTML file for the header
        ├── nav.html            # HTML file for the navigation
        └── nonactive-nav.html  # HTML file for the non-active navigation
```
