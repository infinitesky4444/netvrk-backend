Simple authenticator written in JS using passport and email authentication with 0auth2.

Installation instructions:
------------------------------------------------------------------------------------------------------------
For installation please install node version 18.13. For simple installation use nvm

npm install (This will install required packages)

npm audit fix (This will upgrade/downgrade packages to stable version to mitigate for vulnerabilities)

Once everything is installed you can use 

npm start (This will start the webserver)

Usage examples:
------------------------------------------------------------------------------------------------------------
Once server is started you can register, login, reset the password, verify email, logout

Please do not cause a lot of registrations or password resets as it ACTUALLY sends emails using my personal email address with the associated tokens. 


Updating email address:
------------------------------------------------------------------------------------------------------------
To generate your own tokens you need to go to cloudAPI (https://console.cloud.google.com/) and create your new webapp. Copy over the clientID and clientSecret onto the appropriate locations within the authcontroller file.

Afterwards you will need to add (https://developers.google.com/oauthplayground) as redirect URL to your google cloud api webapp 

Once all of that is complete proceed to https://developers.google.com/oauthplayground

There find gmail and use that to generate your refresh token. 

To do that: Click the cogwheel on the top right, check use your own oauth credentials, paste your client ID and client secret. Afterwards click authorize apis which will generate authorization token. 

Underneath authorization token click exchange authorization code for tokens which generates the refresh token.

Populate refresh token to appropriate positions in the authcontroller code. 
