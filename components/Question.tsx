"use client"

import React from 'react'

const Question = () => {
    const [value, setValue] = React.useState("");
    onchange = (e) => {
        e.preventDefault();
    }
  return <div>
      <form >
          <input 
            value={value}
            onChange={onchange}
            type="text"  
            placeholder="Ask a Question!" 
            className="border border-black/20 px-4 py-6 text-lg rounded-lg "
          />
          <button type='submit' className='bg-blue-400 px-4 py-2 rounded-lg text-lg'>
            Ask
          </button>
      </form>
  </div> ;
  
}

export default Question
