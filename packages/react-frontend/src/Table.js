import React from "react";


//custom made table
//naming convention for React components: capitalized, different from HTML elements


function TableHeader() { //header of columns, id, name, and job
    return (
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Job</th>
        </tr>
      </thead>
    );
  }
 
  //allows for deleting user of a specific provided id rather than just deleting any user of random index
  function TableBody(props) {
    const rows = props.characterData.map((row) => {
      return (
        <tr key={row.id}> 
          <td>{row.id}</td>
          <td>{row.name}</td>
	        <td>{row.job}</td>
	      <td>
			        <button onClick={() => 
				        props.removeCharacter(row.id)}>
				        Delete
			        </button>
	      </td>
        </tr>
      );
     }
    );
    return (
        <tbody>
          {rows}
         </tbody>
     );
  }


  function Table (props) {
    return (
      <table>
        <TableHeader />
        <TableBody characterData={props.characterData} 
            removeCharacter={props.removeCharacter} />
      </table>
    );
    //only passing one property characterData
}


export default Table;