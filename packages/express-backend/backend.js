// backend.js
import express from "express"; //imports express module

const app = express(); //creates an instance of express
const port = 8000; //localhost:8000

app.use(express.json());

app.get('/', (req, res) => { //endpoint to acceot http GET requests
    res.send('Hello World!'); //processes request and response is a simple text
});

app.listen(port, () => { //has backend server listen to incoming requests on defined port
    console.log(`Example app listening at http://localhost:${port}`);
}); 