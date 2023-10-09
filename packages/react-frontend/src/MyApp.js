import React, {useState, useEffect} from 'react'; //need to make our MyApp component call fetchUser function 
//the first time the component is rendered, to start the process of requesting the data
import Table from "./Table";
import Form from './Form';


function MyApp() {
    //current state value: characters, update function: setCharacters
    //const makes a tuple pair 
    const [characters, setCharacters] = useState([]);
    
    function fetchUsers() {
      const promise = fetch("http://localhost:8000/users");
      return promise; //built in promise: asynchronus processing in JS, need to perform an operation 
      //which will take time to finish/may never finish. don't want code to wait for data to come back to server
    }
    // makes a request to the URL which is given as a parameter. 
    // But instead of waiting for the response, it returns immediately with a promise. 
    // This promise will be fulfilled when the response is received back from the server.
    
    useEffect(() => {//when the promise returned by fetchUsers is fulfilled, we want to set the component state using setCharacters:
      fetchUsers()
        .then((res) => res.json()) // returns a promise, which is only fulfilled when the data is successfully decoded.
        .then((json) => setCharacters(json["users_list"])) //parse response into javascript object, initialize state of comp with given data
        .catch((error) => { console.log(error); });
    }, [] );

    function removeOneCharacter (index) {
      const updated = characters.filter((character, i) => {
        return i !== index
      });
      setCharacters(updated);
    }

    function updateList(person) {
        setCharacters([...characters, person]);
      }

    return (
        <div className="container">
            <Table characterData={characters} 
                removeCharacter={removeOneCharacter} />
            <Form handleSubmit={updateList} />
        </div>  
    )

  }


  export default MyApp; //makes component available to be
  //imported into other comps
