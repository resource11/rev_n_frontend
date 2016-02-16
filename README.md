# Rev(n) - iteration nirvana

### OVERVIEW

Rev(n) is a tablet-targeted app designed to shorten the design/development iteration cycles that occur when clients and agencies partner on high-budget deliverables, i.e., large format digital displays in the high-traffic consumer space.

![Rev(n)](img/rev_n.png?raw=true "Rev(n) intro view")

This app allows the user(s) to review a digital display design and make real-time edits to copy, artwork and animation styles with the goal of arriving at a decision point for next steps in the deliverable production timeline.

The front-end is hosted [here](http://resource11.github.io/rev_n_frontend/) and the back end is hosted [here](https://stormy-oasis-7808.herokuapp.com/), **integrating 4 Restful APIs and JS animation libraries**. A link to the back-end repo is [here](https://github.com/resource11/rev_n_api)).


##User stories
* The users in this scenario are individuals seeking to create a digital billboard revision (a rev).
The features of this app will address the following user stories.
* As a user, I can register an account.
* As a user, I can log in.
* As a user, I can create a new billboard rev.
* As a user, I can load a billboard rev into the viewport.
* As a user, I can edit and save a billboard's rev changes.
* As a user, I can delete one of my billboard revs.


##Wireframe
* These are the initial [wireframe](https://www.dropbox.com/s/ffwctdr9jr7iwy1/rev_n_wireframes.pdf?dl=0)mockups of a potential site design.

##App approach
* I leveraged my knowledge of HTML, CSS, Javascript, jQuery and AJAX to build a decently functional app prototype.
* After sketching [wireframes](https://www.dropbox.com/s/ffwctdr9jr7iwy1/rev_n_wireframes.pdf?dl=0) and reviewing my user stories (see above section), I mocked up the HTML file and added some basic CSS3 styling.
* I also created a Rails backend, and structure my [ERD models](https://www.dropbox.com/s/gbybcpbelwhuv7t/Rev_n_ERD.png?dl=0) and associations, leveraging Ruby, SQL and ActiveRecord.
* After completing many data validation tests on the back end, I integrated the back-end to the front-end for functionality tests.
* Lastly, I challenged myself by exploring various Javascript animation libraries, such as [Greensock Animation](https://greensock.com/) and [Velocity.js](http://julian.com/research/velocity/) with the goal of achieving complex animations on a timeline and in the 3D space.

##Challenges
* My first challenge was figuring out the [data models], and how the data would relate to each other in the most logical manner with a goal of keeping my controllers skinny.
* My second challenge was creating a [user journey map](TBD) and [wireframes](https://www.dropbox.com/s/ffwctdr9jr7iwy1/rev_n_wireframes.pdf?dl=0) that accurately achieved the goals of my user stories, while setting up a workflow process. I heavily leveraged Trello to keep track of items to do, in development and completed.
* My third challenge was structuring my code in a way that could more easily integrate the ajax requests/response while paying attention to separation of concerns.
* My fourth challenge was learning the correct syntax for using the [Greensock Animation library (GSAP)](https://greensock.com/).
* My fifth challenge was descoping animations and leveraging [Velocity.js](http://julian.com/research/velocity/) as an animation tool while I was debugging issues with GSAP.
* My sixth challenge was gathering the data from the back end successfully and structuring my controllers and serializers to achieve this goal.
* My seventh challenge was figuring out the most efficient way to add perspective views of each panel -- it's not as straigtforward as manipulating an element in a 3D-specific software program.
* My eighth challenge was solving for css-generated gradients continuously repaint on the page when a div has a 3d transform property applied. Discovered a conflict with the snow.js animation

##Unsolved Issues
* GSAP has a bit of a learning curve, I'm working on integrating better animations for the panel contents and overall UX. Initial GSAP motions added to billobard text.

##Upcoming versions
* More complex text and background animations to come in future builds.

[License](LICENSE)
------------------

Source code distributed under the MIT license. Text and other visual assets copyright resource11, all rights reserved.
