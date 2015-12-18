# Rev(n) - iteration nirvana

### OVERVIEW

Rev(n) is an app designed to shorten the design/development iteration cycles that occur when clients and agencies partner on high-budget deliverables, i.e., large format digital displays in the high-traffic consumer space.

This app allows the user(s) to review a digital display design and make real-time edits to copy, artwork and animation styles with the goal of arriving at a decision point for next steps in the deliverable production timeline.

The front-end is hosted [here]( http://resource11.github.io/rev_n_frontend/) and the back end is hosted [here](https://stormy-oasis-7808.herokuapp.com/), ** integrating 4 Restful APIs and JS animation libraries**. A link to the back-end repo is [here](https://github.com/resource11/rev_n_api)).

## HIGH-LEVEL PROJECT GOALS
- **Build a single-page application (SPA)** with **basic user authentication** that interacts with a **custom API built by me**
- Build an app that can **create, read, update, and delete data** in a SQL database
- **Create detailed user stories and wireframes** (before writing code) as part of my app planning process.

- **Leverage distinct JS animation libraries to achieve a simulation of a digitial display animation as it would appear on the final product.

- **Confidently present my finished app** to a technical audience (5-10 minute presentation)

---

### Necessary Deliverables

* A **working API**, hosted somewhere on the internet
* A **working front-end**, hosted somewhere on the internet
* A **link to my hosted working app** in the URL section of my Github repo
* A **git repository hosted on Github**, with a link to my hosted project, and frequent commits dating back to the very beginning of the project
* **A ``readme.md`` file** with:
    * An embedded screenshot of the app
    * Explanations of the **technologies** used
    * A couple paragraphs about the **general approach you took**
    * **Installation instructions** for any dependencies
    * Link to your **user stories** – who are your users, what do they want, and why?
    * Link to your **wireframes** – sketches of major views / interfaces in your application
    * Link to your **pitch deck** – documentation of your wireframes, user stories, and proposed architecture
    * Descriptions of any **unsolved problems** or **major hurdles** you had to overcome

---

##### Stretch Goals.
* Put some extra thought and effort into visual and UI design.
* Integrate photo upload
* Integrate some jQuery and CSS animations

##User stories
* The users in this scenario are individuals seeing to list a singlespeed bike for sale and favorite other bikes listed for sale.
The features of this app will address the following user stories.
* As a user, I can register an account.
* As a user, I can log in.
* As a user, I can create a new billboard rev.
* As a user, I can load a billboard rev into the viewport.
* As a user, I can edit and save a billboard's rev changes.
* As a user, I can delete one of my billboard revs.


##Wireframe
* The initial wireframe mockup of a potential site design is located [here.](TBD)

##App approach
* I leveraged my knowledge of HTML, CSS, Javascript, jQuery and AJAX to build a decently functional app prototype
* After sketching a [wireframe](TBD) and reviewing my user stories (see above section), I mocked up the HTML file and added some basic CSS3 styling. Then I worked through the [user journey and app logic](TBD) to solve the problem of creating, reading, updating, and deleting data.
* I also created a Rails backend, and structure my [ERD models](TBD) and associations, leveraging Ruby, SQL and ActiveRecord.
* After completing many data validation tests on the back end, I integrated the back-end to the front-end for functionality tests.
* Lastly, I challenged myself by exploring various Javascript animation libraries with the goal of achieving complex animations on a timeline and in the 3D space.

##Challenges
* My first challenge was figuring out the [data models], and how the data would relate to each other in the most logical manner with a goal of keeping my controllers skinny.
* My second challenge was creating a [user journey map](TBD) and [wireframes](TBD) that accurately achieved the goals of my user stories, while setting up a workflow process. I heavily leveraged Trello to keep track of items to do, in development and completed.
* My third challenge was structuring my code in a way that could more easily integrate the ajax requests/response while paying attention to separation of concerns.
* My fourth challenge was learning the correct syntax for using the Greensock Animation library (GSAP).
* My fifth challenge was descoping animations and leverating Velocity.js as an animation tool while I was debugging issues with GSAP.
* My sixth challenge was gathering the data from the back end successfully and structuring my controllers and serializers to achieve this goal.
* As of yet, I have not been successful in dynamically updating the content state of the viewport when a user favorites, unfavorites, or deletes a bike without refreshing the browser. I need to work on some more jQuery event handlers to make that functionality happen.

##Final Thoughts
* In general, I think this is a fantastic capstone project for showing what I have learned at GA, and am looking forward to taking this app to the next level.

[License](LICENSE)
------------------

Source code distributed under the MIT license. Text and other visual assets copyright
resource11, all rights reserved.
