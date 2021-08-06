# ClayPal

![Screenshot](client/src/components/img/cpscreenshoot.png)
[ClayPal Deployed](https://claypal.herokuapp.com/)

ClayPal is a score tracker for skeet and trap shooters. Using this makes keeping scores and stations organized, eaisily accessable and will keep the competitive drive between other users and yourself flowing with a leaderboard that shows all relevant stats.

Challenges overcame were capturing data to display to each card accurately and individually between stations, targets hit and the users that the stats apply to.

Using this Full Stack application, a user can interact with our ClayPal application to:

- `Create an account`
- `Login or logout of the application`
- `Add a skeet and trap score`
- `Browse your dashbaord to see a trend in your previous scores`
- `Browse the leaderboards to see where you rank against others`
- `Make sure to click the links to ensure gun safety measures`

# Table of Contents

- [Installation](#installation)
- [Technologies](#technologies)
- [License](#license)
- [Contributors](#contributors)
- [Test](#tests)
- [Questions](#questions)

# Installation/Running

If you'd like to try out the app you can visit the deployed version: [ClayPal](https://claypal.herokuapp.com/)

For local development installation:
	**Dependencies:** 
		npm
		docker

	*Note:* All commands below should be run from the project's root unless specified otherwise.

	1. Run `npm i` 
	2. Run `docker-compose up -d` to spin up the database locally.
	3. If this is your first time running the program, you should seed the database by running `npm run seed`
	4. Rename `secrets.json.example` in the project root to `secrets.json` and change the userAuth string to a random, secret string.
	5. Run `npm run develop`, which will open a browser and show the app.

# Technologies

A list of technologies used within the project:

- [Javascript](https://www.javascript.com/)
- [HTML](https://html.com/)
- [MaterialUI](https://material-ui.com/)
- [Express.js](https://expressjs.com/)
- [Node.js](https://nodejs.org/en/)
- [GraphQL](https://graphql.org/)
- [MongoDB](https://www.mongodb.com/)

# License

None at this time.

# Contributors

- [TJ Courey](https://github.com/TJCourey)
- [Nick Strong](https://github.com/strong-one)
- [Jack Neuner](https://github.com/jneuner21)
- [Josh Brown](https://github.com/Brownies-SE)

# Questions

If you have any questions feel free to contact me and fellow contributors at:

- tjcourey84@gmail.com
- nstrong92@yahoo.com
- Jneuner2165@gmail.com
- brownjoshalan@gmail.com
