import React from 'react'
import PageNotFoundImage from '../Images/404.jpg'
export default function PageNotFound() {
  return (
    <div>
        <img src={PageNotFoundImage} alt={"logo"} style={{width:800,height:800,margin:10,padding:50}}/>
    </div>
  )
}
