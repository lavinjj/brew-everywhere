#Code Samples for AngularJS Services

This project uses Node.js, NPM and Bower for builds and dependencies.

Ensure you have Node.js installed.

1.	Node.js:

    a.	In a browser navigate to [http://nodejs.org/download/](http://nodejs.org/download/)
      
    b.	Select and download the appropriate installer for your system.
    
    c.	Install Node.js, by double clicking on the installer.
    
    d.	To ensure everything has installed correctly from a DOS Command Shell or Terminal Screen enter **node –v**, if everything installed correctly you should see the version of node.js

2.	Bower

    a.	From a DOS Command Shell or Terminal Screen enter **npm install –g bower**
    
    b.	Npm should download the bower package and install it globally
    
    c.	On Mac OS X and Linux you may need to prefix the command with **sudo** 

3.	Grunt

    a.	From a DOS Command Shell or Terminal Screen enter **npm install –g grunt-cli**
    
    b.	Npm should download the bower package and install it globally
    
    c.	On Mac OS X and Linux you may need to prefix the command with **sudo** 

4.	Yeoman

    a.	From a DOS Command Shell or Terminal Screen enter **npm install –g yeoman**
    
    b.	Npm should download the bower package and install it globally
    
    c.	On Mac OS X and Linux you may need to prefix the command with **sudo** 

5.	MongoDB

    a.	Navigate to the MongoDB website located at [http://www.mongodb.org/](http://www.mongodb.org/)
    
    b.	Click on the **Download MongoDB** button. This will take you to the downloads page where the various versions of MongoDB are available for download.
    
    c.	Pick the version that matches your operating system and download it.
    
    d.	Install MongoDB, by double clicking on the installer

6.	Mongolabs.com Account and Database

    a.	Open a browser and navigate to the mongolabs.com home page at [http://www.monoglabs.com](http://www.monoglabs.com)
    
    b.	If you do not already have an account, click on the **Sign Up** button to create an account. Fill out the requested information and click the **Create** button.
    
    c.	Once your account has been created, you'll be redirected to your account home page. To create a new database, click on the **Create New** button in the Databases section.
    
    d.	You'll be redirected to the Create Shared Plan Database page. Enter **breweverywhere** for the database name; select your preferred Cloud Provider; select the free database; enter a username and password to create a new database user and click the **Create Database** button.
    
    e.	Once your database has been created, you'll be redirected to your account home page and you should see the new database under the Databases section. Click on the name of the database so you can start adding the collections to the database.
    
    f.	You'll be redirected to the Database Details page. To add a collection to the database, click on the add button.
    
    g.	Enter adjuncts and click the Create button. A new collection will be added to the Database.
    
    h.	Repeat the above step to add the following collections; brewers, brewingHistory, equipment, fermentables, hops, mashprofiles, recipes, styles, waterprofiles and yeast.
    
    i.	Once completed click on the Tools tab and click on the Import/Export link. You will be shown a list of MongoDB commands that will allow you to import and export data to/from your mongolabs.com database. Copy the Import command below the JSON heading, we'll need that information to import seed data into the database later.
    
    j.	You will also need to retrieve the API Key for the application. Click on user name link in the top right corner of the web page. Copy the API key shown towards the bottom of the page and paste it into the app.js file in the sample application on the line where mongolab.setApiKey(‘<YOUR API KEY>) is located.

7.	Loading the mongolabs.com database with the seed data

    a.	In the sample app source folder in the data folder there are two files import.cmd and import.sh.
    
    b.	Edit the file specific for your operating system. Use the information from step I under the Mongolabs.com Account and Database steps to replace <server>, <port>, <user> and <password>
    
    c.	Replace <mongodb_path> with the path to where you installed mongodb.
    
    d.	From a DOS Command prompt or Terminal window execute the import script. You should see mongodb connect to mongolabs.com and insert the seed data. Note: you may need to make the script executable under Mac OS X and Linux by typing the command chmod +x inmport.sh
    
    e.	You can ensure the seed data has been uploaded by navigating to the database on mongolabs.com and each collection should show the number of records imported.

8.	Google Develop App Creation

    a.	Log into https://console.developers.google.com/project or create a new account if you do not have one.
    
    b.	Click the Create Project button.
    
    c.	Enter breweverywhere for the project name and click Create.
    
    d.	Once the project is created and you are on the project dashboard click the APIS & Auth link then click the credentials link.
    
    e.	Click on Create New Client Id under OAuth
    
    f.	Click web browser
     
    g.	Enter http://localhost:9000/ in the AUTHORIZED JAVASCRIPT ORIGINS TEXT BOX.
    
    h.	Click Create Client ID
    
    i.	Copy the Client ID and enter it intothe app.js file where the line reads "clientId": "<YOUR CLIENT ID>”

9.	Facebook App Creation

    a.	Log into developers.facebook.com or create a new account if you do not have one.
    
    b.	Click on Apps | Create App
    
    c.	Enter the Name Brew Everywhere
    
    d.	Enter the namespace brew-everywhere
    
    e.	Select entertainment for the category.
    
    f.	Click Create App and answer the security captcha
    
    g.	On the App Dashboard click Settings.
    
    h.	Click Add Platform
    
    i.	Select website
    
    j.	Enter http://localhost:9000 for the Site Url and Mobile Site Url
    
    k.	Click Save Changes
    
    l.	Click on the Advanced Tab at the top of the page.
    
    m.	Look for the Client ID towards the middle of the page. Copy this and enter it into the app.js file where the line reads facebookAuthenticate.setApiKey('<YOUR_API_KEY>');
    
    n.	Click on the API Link and enable the Google+, Google Calendar and Goolge Tasks APIs


Then run the following commands in the directory:

    bower install
    npm install

To build the project use the following command:

    grunt build

To run the tests use the following command:

    grunt test

To run the web application use the following command:

    grunt serve

Then open a browser and navigate to http://localhost:9001

