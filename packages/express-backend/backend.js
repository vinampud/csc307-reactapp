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
          id: 'yat999', 
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

app.get('/users', (req, res) => { //endpoint to acceot http GET requests
    res.send(users); //processes request and response is a simple text
});

app.listen(port, () => { //has backend server listen to incoming requests on defined port
    console.log(`Example app listening at http://localhost:${port}/users`);
}); 