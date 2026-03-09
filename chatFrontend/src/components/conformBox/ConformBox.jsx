import React from 'react'
import "./ConformBox.css"

const ConformBox = ({fn, text, conform, setConform}) => {
  return (
    <div className='conform-box'>
        <p>{text}</p>
        <div className="buttons">
            <button onClick={()=>fn()}>Yes</button>
            <button onClick={()=>setConform(false)}>No</button>
        </div>
         
    </div>
  )
}

export default ConformBox