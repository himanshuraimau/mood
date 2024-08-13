"use client"

import React from 'react'

const Question = () => {
    const [value, setValue] = React.useState("");
     const onChange = (e:any) => {
             setValue(e.target.value);
    }
    const handleSubmit = (e:any) => {
        e.preventDefault();
    }
  return <div>
      <form className='flex' onSubmit={handleSubmit}>
          <input 
            value={value}
            onChange={onChange}
            type="text"  
            placeholder="Ask a Question!" 
            className="border border-black/20 px-4 py-3 text-lg rounded-lg "
          />
          <div className='pt-1 pl-3'>
          <button type='submit' className='bg-blue-400 px-4 py-2 rounded-lg text-lg hover:bg-blue-300'>
            Ask
          </button>
          </div>
      </form>
  </div> ;
  
}

export default Question
