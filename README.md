
# NoSQL: Social Network API [![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)

The purpose of this application was to showcase our understanding of NoSQL Databases and how they interact not only with the code with wrote but eachother within the database. For the purposes of this application we have Users, Thoughts, and Reactions. The user (using Insomnia) will be able to add new Users to the social network database, create thoughts based on their user Id, add friends to a User via userId, and create reactions to other users thoughts. All of these can be updated or deleted at will. A simple .populate() can be added to both thoughts and users to fill, but for these purposes the users will be created by JSON.

## Usage

The User will enter "node server.js" to activate the mongoose server. They will then use Insomnia to interact with the server. I have created 4 folders for use within the project in Insomnia - USER, THOUGHTS, REACTIONS, and FRIENDS. Within each of this folders will be http requests that will allow the user to call into the database. Wether that be gathering data on all users or thoughts, passing new JSON information into the database, augmenting existing information in the database, or deleting the information entirely from the database. The majority of usage will be showcased in the Screencastify link below.

## Conclusion

This project was one that I initially thought to be a walk in the park on first glance, but did find myself challenged in small ways throughout. I found that I understood the base of how my code will cause the database to receive information, but as with many of my projects ran into issues with capitalization and keeping my variables consistent. Overall I feel that my understanding of javascript is growing on a daily basis as more and more concepts have become more internalized to me. One of the most important things I will need to do moving forward is be consistent in my use of variables and my control of functions between files as exporting them becomes more the norm.

# Screencastify

ADD HERE

# Licensing

MPL 2.0