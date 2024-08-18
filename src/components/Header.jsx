import React from 'react'
import { LuPhoneIncoming } from "react-icons/lu";
import { RiGlobalLine } from "react-icons/ri";

const Header = () => {

  return (
    <header style={{backgroundColor: "#0D2613", marginBottom: "3.85rem"}}>
      <div className='header'>
      <div>
        <a href="#">GG</a>
        <div>
          <LuPhoneIncoming style={{color: "#fff"}}/>
        <p>+4904-049-950</p>
        </div>
      </div>
      <div>
       <p>
       Get 50% Off on the Selected items
       </p>
       <a href="#">Shop now</a>
      </div>
      <div>
        <select name="language">
          <option value="english">English</option>
        </select>
        <div>
        <RiGlobalLine />
        <p>Location</p>
        </div>
      </div>
      </div>
    </header>
  )
}

export default Header 
