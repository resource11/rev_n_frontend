# Rev(n) - iteration nirvana

### OVERVIEW

Have you ever worked on a project where you wished you could make in-the-moment design iterations help save a team hours of back and forth between designers, developers, and key stakeholders? It'd be pretty cool to find a way to make a quick change on a project while you're in a client meeting, so that client can see a vision more clearly, right? Well... let me introduce you to **Rev(n)**.

Rev(n) is a designed to **shorten** those design/development iteration --- aka, **rev** --- cycles that *sometimes occur* on higher-budget projects. Large format digital displays in the high-traffic consumer space, is a good example for this proof of concept.

![Rev(n)](img/rev_n_4up.jpg?raw=true "Rev(n) 4-panel view")

This app allows the user(s) to review a digital display design and make real-time edits to copy, artwork and animation styles and arrive at a decision point for next steps in the deliverable production timeline.

The [deployed front-end](http://resource11.github.io/rev_n_frontend/) leverages a Heroku-deployed backend, **integrating 4 Restful APIs and JS animation libraries**. If you're curious, here's the [back-end repo](https://github.com/resource11/rev_n_api)).


## User stories
The users in this scenario are individuals seeking to create a digital billboard revision (a rev). The features of this app will address the following user stories.
* Users can
** Register an account.
** Log in.
** Create a new billboard rev.
** Load a billboard rev into the viewport.
** Edit and save a billboard's rev.
** Delete a billboard rev.


## Wireframes

* My initial low-fidelity mockups of a potential site design.

![Rev(n)](img/rev_n_wireframe_4up_01.jpg?raw=true "Rev(n) 4-up wireframe 01")
![Rev(n)](img/rev_n_wireframe_4up_02.jpg?raw=true "Rev(n) 4-up wireframe 02")
![Rev(n)](img/rev_n_wireframe_4up_03.jpg?raw=true "Rev(n) 4-up wireframe 03")

* Go here for scaled-up [wireframes view](https://www.dropbox.com/s/ffwctdr9jr7iwy1/rev_n_wireframes.pdf?dl=0).

## App approach
* I leveraged my knowledge of HTML, CSS, Javascript, jQuery and AJAX to build a decently functional app prototype targeting a tablet-sized layout.
* After sketching [wireframes](https://www.dropbox.com/s/ffwctdr9jr7iwy1/rev_n_wireframes.pdf?dl=0) and reviewing my user stories (see above section), I mocked up the HTML file and added some basic CSS3 styling.
* I also created a Rails backend, and structure my [ERD models](https://www.dropbox.com/s/gbybcpbelwhuv7t/Rev_n_ERD.png?dl=0) and associations, leveraging Ruby, SQL and ActiveRecord.
* After completing many data validation tests on the back end, I integrated the back-end to the front-end for functionality tests.
* Lastly, I challenged myself by exploring various Javascript animation libraries, such as [Greensock Animation](https://greensock.com/) and [Velocity.js](http://julian.com/research/velocity/) with the goal of achieving complex animations on a timeline and in the 3D space.

## Challenges
* Figuring out the [data models], and how the data would relate to each other in the most logical manner with a goal of keeping my controllers skinny.
* Creating wireframes that accurately achieved the goals of my user stories, while setting up a workflow process. I heavily leveraged Trello to keep track of items to do, in development and completed.
* Structuring my code in a way that could more easily integrate the ajax requests/response while paying attention to separation of concerns.
* Learning the correct syntax for using the [Greensock Animation library (GSAP)](https://greensock.com/).
* Descoping animations and leveraging [Velocity.js](http://julian.com/research/velocity/) as an animation tool while I was debugging issues with GSAP.
* Gathering the data from the back end successfully and structuring my controllers and serializers to achieve this goal.
* Figuring out the most efficient way to add perspective views of each panel -- it's not as straigtforward as manipulating an element in a 3D-specific software program.
* Solving for css-generated gradients continuously repaint on the page when a div has a 3d transform property applied. Discovered a conflict with the snow.js canvas element animation.

## Unsolved Issues
* GSAP has a bit of a learning curve, I'm working on integrating better animations for the panel contents and overall UX. Initial GSAP motions added to billboard text.

## Upcoming versions
* More complex text and background animations to come in future builds.
* Leveraging modern front-end frameworks to handle data binding in a more efficient manner.
* Exploring layouts for even smaller screens --- in landscape mode.

[License](LICENSE)
------------------

Source code distributed under the MIT license. Text and other visual assets copyright resource11, all rights reserved.
