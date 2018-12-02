//http://vidly.com/api/genres

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

// Create a joi class for exception handling
const Joi = require('joi');

// Grab the http app methods and create and hanlde the request and exceptions.
const express = require('express');
const app = express();

// Get (provide the user with the genre wanted), update(push), add (post), delete (delete)

// send back the genre for a given id
app.get('http://vidly.com/api/genres/id:',(req,res) =>{
    // Handle error if the genre isnt there

    // If it is there show them that genre and its ID
});

app.push('http://vidly.com/api/genres',(req,res) =>{
    // Handle error if the genre isnt there

    // If it is there show them that genre and its ID
});


app.post('http://vidly.com/api/genres',(req,res) =>{
    // Handle error if the genre isnt there

    // If it is there show them that genre and its ID
});


app.delete('http://vidly.com/api/genres',(req,res) =>{
    // Handle error if the genre isnt there

    // If it is there show them that genre and its ID
});

/*
    Functions
*/

function validateCourse(course){
    // Define schema
   const schema = {
       // Define a critrea of name, min length of 2, and it is required
    name: Joi.string().min(2).required()
   };
   return Joi.validate(course,schema);
}