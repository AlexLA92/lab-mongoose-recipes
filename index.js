const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { modelName } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // Iteration 3
    return Recipe.insertMany(data)
  })
  .then(() => {
    // Iteration 3
    filter  = {}
    project = {title: 1 , _id:0}
    return Recipe.find(filter, project)
  })
  .then((recipeList) => {
    // Iteration 3
    console.log('We successfully imported',recipeList)
  })
  .then(() => {
    // Iteration 4
    const recipeTitle = 'Rigatoni alla Genovese'
    const filter = {title: recipeTitle}
    const update = {duration: 100}
    return Recipe.findOneAndUpdate(filter, update, {new : true})
  })
  .then((updatedRecipe) => {
    // Iteration 4
    console.log("We successfully updated" , updatedRecipe.title)
  })
  .then(() => {
    // Iteration 5
    const recipeTitle = 'Carrot Cake'
    const filter = {title: recipeTitle}
    return Recipe.findOneAndDelete(filter)
  })
  .then((deletedRecipe) => {
    // Iteration 5
    console.log("We successfully deleted " , deletedRecipe.title)
  })
  .then(() => {
    // Iteration 6
    mongoose.connection.close()
  })
  .then(() => {
    // Iteration 6
    console.log("We successfully closed the connection")
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
