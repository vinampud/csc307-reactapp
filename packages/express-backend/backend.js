// backend.js
import express from "express"; //imports express module

const app = express(); //creates an instance of express
const port = 8000; //localhost:8000

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
 const findUserByName = (name) => { 
    return users['users_list']
        .filter( (user) => user['name'] === name); //filtering based on argument
}

app.get('/users', (req, res) => {//endpoint to acceot http GET requests
    const name = req.query.name;
    if (name != undefined){
        let result = findUserByName(name);
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
    users['users_list'].push(user);
    return user;
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.send();
})

app.listen(port, () => { //has backend server listen to incoming requests on defined port
    console.log(`Example app listening at http://localhost:${port}`);
}); 