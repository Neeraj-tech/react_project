import React, {useContext } from "react"
import { Context } from "../contexts/context";
import { BrowserRouter, NavLink, Routes, Route, Outlet } from 'react-router-dom'

import NotFoundComp from "./notFound";
import ShowImage from "./showImage";
const Gallery = () => {

  
  let toggle = false;

  let {list}= useContext(Context);

  if(list.length > 10){
    toggle = true;
  }

  return <div> {toggle && 
    <div className='photo-container'>
    <BrowserRouter>
    <div>
    <ul >
      {list.map( e => {
      let photoUrl = `http://farm${e.farm}.staticflickr.com/${e.server}/${e.id}_${e.secret}.jpg`
      return <li key={e.id} ><NavLink to={'/'+e.id} className={({isActive}) => isActive ? 'nav-link-selected' : 'nav-link'}><img className = 'img-thumbnail' alt={e.title} src={photoUrl} /></NavLink></li>
      }
     )}
     </ul>
     </div>
     <div>
     <Routes>
      <Route path='/:arg1' element={< ShowImage /> }/>
      <Route path='/' element={< ShowImage /> }/>
     </Routes>
     </div>
     </BrowserRouter>
     <Outlet/>
     </div>
    }
    {!toggle &&<NotFoundComp/>}

    </div>
  }
export default Gallery;
