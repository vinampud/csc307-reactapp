// src/Form.js
import React, {useState} from 'react';

function Form(props) {
  const [person, setPerson] = useState(
     {
        id: "",
        name: "",
        job: "",
     }
  );

  function handleChange(event) {
    const { name, value } = event.target;
    const randomID = generateRandomID();
    
    if (name === "job")
      setPerson(
         {id: randomID, name: person['name'], job: value}
      );
    else     
       setPerson(
         {id: randomID, name: value, job: person['job']}   
       );
  }

  function submitForm() {
    props.handleSubmit(person);
    setPerson({id: '', name: '', job: ''});
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
  


  return (
    <form>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={person.name}
        onChange={handleChange} />
      <label htmlFor="job">Job</label>
      <input
        type="text"
        name="job"
        id="job"
        value={person.job}
        onChange={handleChange} />
      <input 
        type="button" 
        value="Submit" 
        onClick={submitForm} />
    </form>
);

}
export default Form;