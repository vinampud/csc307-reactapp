// backend.js
import express from "express"; //imports express module
import cors from "cors";

const app = express(); //creates an instance of express
const port = 8000; //localhost:8000

app.use(cors());
app.use(express.json());

const users = { 
    users_list : [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'pudi121', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

 //?: prompts query 
 //query argument + = : searches for a match in that query argument
 const findUserByName = (cur, name) => { 
    return cur.filter( (user) => user['name'] === name); //filtering based on argument
}

const findUserByJob = (cur, job) => { 
    return cur.filter( (user) => user['job'] === job); //filtering based on argument
}

app.get('/users', (req, res) => {//endpoint to acceot http GET requests
    const name = req.query.name;
    const job = req.query.job;
    let result = users['users_list'];

    //if either query is provided
    if(name != undefined || job != undefined){

        if (name != undefined){
            result = findUserByName(result, name);
        }

        if (job != undefined){
            result = findUserByJob(result, job);
        }

        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);//processes request 
    }
})

const findUserById = (id) =>
    users['users_list']
        .find( (user) => user['id'] === id);
    
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.send(result);
    }
})

const addUser = (user) => {
    const randomID = generateRandomID();
    user.id = randomID;
    //How do I assign randomID to user's ID?
    users['users_list'].push(user);
    return user;
}

function generateRandomID() {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    let randomID = '';
  
    // Generate 3 random lowercase letters
    for (let i = 0; i < 3; i++) {
      const randomLetter = letters[Math.floor(Math.random() * letters.length)];
      randomID += randomLetter;
    }
  
    // Generate 3 random numbers
    for (let i = 0; i < 3; i++) {
      const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
      randomID += randomNumber;
    }
  
    return randomID;
  }

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    const addedUser = addUser(userToAdd);

    if (addedUser) {
        res.status(201).json(addedUser);
    } else {
        res.status(500).json({ error: 'Failed to add user' });
    }
})


// Helper function to delete a user by ID
const deleteUserById = (id) => {
    const userIndex = users['users_list'].findIndex((user) => user['id'] === id);

    if (userIndex !== -1) {
        // User found, remove the user from the array
        users['users_list'].splice(userIndex, 1);
        return true; // User deleted successfully
    }
    return false; // User not found
}

app.delete('/users/:id', (req, res) => {
    const id = req.params.id; // Get the user ID from the URL parameter

    const deleted = deleteUserById(id);

    if (deleted) {
        // User deleted successfully, respond with a 204 status code
        res.status(204).send(); // 204 No Content
    } else {
        // User not found, respond with a 404 status code
        res.status(404).send('User not found.');
    }
})

app.listen(port, () => { //has backend server listen to incoming requests on defined port
    console.log(`Example app listening at http://localhost:${port}`);
}); 