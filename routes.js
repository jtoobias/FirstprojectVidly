    // Create a joi class for exception handling
const Joi = require('joi');
const express = require('express');
const route = express();

// Need to create a genre array
const genres = [
    {id: 1, name: 'Comedy'},
    {id: 2, name: 'Action'},
    {id: 3, name: 'Romance'},
    {id: 4, name: 'Horror'},
    {id: 5, name: 'Thriller'},
    {id: 6, name: 'Mystery'},
    {id: 7, name: 'Drama'},
];


// Get (provide the user with the genre wanted), update(push), add (post), delete (delete)

// All them to see all of the genres
route.get('/api/genres',(req,res) =>{
    // Respond with the genres
   res.send(genres);
});


// Should also be able to the get the list of genres
// send back the genre for a given id
route.get('/api/genres/:id',(req,res) =>{
   
   const id = req.params.id;
   console.log(req.params.id);
   const result = validateGenre(id);
   // Handle error if the genre isnt there
   if(!result.error)
   {
       res.sendStatus(400).send(result.error.details[0].message);
   }
   // If it is there show them that genre and its ID
       // Search the courses array, c is the array passed into the func, so c.id = 1,2, or 3
  const genre = genres.find(c => c.id === parseInt(id));
   if(!genre)
   {

      // console.log();
       res.sendStatus(404).send("genre not found, id =" + parseInt(id));
   }
       // returns the genre at that id
   res.send(genre);

});



   // Post : are writes from the user posting to the server. 
route.post('/api/genres',(req,res) =>{

       // Add genre
   const genre = {
       id: genres.length+1,
       name: req.body.name    // Assuming in the request body that there is a object with a name property. This only works with parsing of json objects.
   };
       // Make sure (validate that there is a name field in the body)
   const result = validateGenre(genre);
    console.log(genre);   
   // Log result
   if(result.error){
       // Sends full object back
       //res.status(400).send(result.error);
       // This could be too complicated so send specific sections of object through...
       // Send just error msg
       res.sendStatus(400).send(result.error.details[0].message);
       return;
   }
             // We need this to read the course data from the request,
       // make our own course object from this data and add it to the courses array.
 
   // push into the array
   genres.push(genre);
   res.send(genre);  
});


route.delete('/api/genres/:id',(req,res) =>{
   console.log(req.params.id);
   // Handle error if the genre isnt there
   const result = validateId(req.params.id);
   // Handle error if the genre isnt there
   if(!result.error)
   {
       res.sendStatus(400).send(result.error.details[0].message);
       return;
   }

   const genre = genres.find(c => c.id === parseInt(req.params.id));

   if(!genre)
   {
       res.sendStatus(404).send("genre not found, id =" + parseInt(req.params.id));
       return;
   }
   // Find genre in our array
   const index = genres.indexOf(genre);

       // Take out the genre a index 'index' and only 1
   genres.splice(index,1);

   res.send(genre);
   // If it is there show them that genre and its ID
});

   // This can be used to update a specific genre
route.put('/api/genres/:id',(req, res) =>{
       // Find the genre in our array
   const genre = genres.find(c => c.id === parseInt(req.params.id));
   console.log(genre);
   if(!genre)
   {
       res.sendStatus(404).send("genre not found, id =" + parseInt(req.params.id));
       return;
   }

   const result = validateGenre(req.body);
   if(!result.error)
   {
       res.sendStatus(400).send(result.error.details[0].message);
       return;
   }

  // Update the genre with the new name from the body
  genre.name = req.body.name;

   console.log(genre);
   res.send(genres);
});


/*
   Functions
*/

function validateGenre(genre){
   // Define schema
  const schema = {
      // Define a critrea of name, min length of 2, and it is required
   name: Joi.string().min(4).required(),
   id: Joi.number().min(1).max(20).required()
  };
  return Joi.validate(genre,schema);
}

function validateId(id){
   // Define schema
  const schema = {
   id: Joi.number().min(1).max(20).required()
  };
  return Joi.validate(id,schema);
}

module.exports = route;