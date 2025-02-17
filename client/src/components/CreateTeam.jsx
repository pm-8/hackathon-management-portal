import React, { useEffect, useState } from 'react';

function CreateTeam() {
  const [teamName,setTeamName] = useState('');
  // useEffect(()=>{
  const postName = async (e) => {
    e.preventDefault();
    try{
      const response = fetch("http://localhost:3000/",
        {
          method:"POST",
          body:JSON.stringify({teamName}),
          headers:{'Content-Type':'application/json'}
        }
      );
      const data = await response.json();
      console.log(data);
    }
    catch{
      console.log("Error in creating name",err);
    }
  }
  // },[]);
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center space-x-4 border border-gray-400 rounded-lg p-2 shadow-lg">
        <input 
          type="text"
          className="w-full max-w-md px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-green-400"
          placeholder="Enter Your Team Name"
          value = {teamName}
          onChange={(e)=>{
            setTeamName(e.target.value)
          }}
        />
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700" onSubmit={postName}>
          Create
        </button>
      </div>
    </div>
  );
}

export default CreateTeam;