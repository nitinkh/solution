This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)

## Table of Contents

- [Prequisite](#prequisite)
- [Google Maps Api Configuration](#google-maps-api-configuration)
- [Folder Structure](#folder-structure)
- [Client Messages](#client-messages)

## Prequisite

To run the project on your machine you need to have node installed in your machine<br>
Run the command npm install which will install all the dependecies<br>
Driving route can be easily tested by adding Hoi Fai Road, Hong Kong as origin and Hoi Shing Road, Tsuen Wan, Hong Kong as destination

## Google-Maps-Api-Configuration

To make this project running correctly, you need to have google API key and needs to be inserted in .env file

## Folder Structure

After running npm install your project should look like this

```
solution/
  README.md
  node_modules/
  package.json
  .env
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    index.css
    index.js
    logo.svg
    axios.js
    configureStore.js
    serviceWorker.js
    actions/
        action.test.js
        actionTypes.js
        index.js
    components/
        AutoComplete/
            AutoComplete.css
            AutoComplete.js
        MapRenderer/
            MapRender.js
        UserInputForm/
            UserInputForm.css
            UserInputForm.js
            UserInputForm.test.js
    reducers/
        index.js
        respReducer.js
        respReducer.test.js
```

## Client Messages

App will display Error Encountered on server if there is 500 status error from server<br>
App will display Location is not accessible by car if server status is failure<br>
App will display waypoints if server status is success

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!
