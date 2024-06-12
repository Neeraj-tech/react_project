import React, { Suspense, useEffect, useState } from "react";
import axios from 'axios';
import { Context } from './contexts/context';

import './App.css';

import LoadingComp from "./components/loading";

function App() {

  console.log('App rerendered');

  let Gallery = React.lazy(()=> import('./components/gallery'))

  let [list, setList] = useState([]);

  let [search, setSearch] = useState('');

  let [toggle, setToggle] = useState(false);

  useEffect(()=>{

  },[])

  let onChangeHandler = (val) => {
    setToggle(false);
    setSearch(val);
  }

  let onClickHandler = ()=>{

    let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key={----------------YOURKEY----------------}&tags=${search}&format=json&nojsoncallback=1`

    axios.get(url)
    .then( response =>{
      setList(response.data.photos.photo.slice(0,12));
      setToggle(true);
  }).catch( error =>{
    console.log("ERROR: ",error.error);
    setList([]);    
    setToggle(true);
    //return error.send({message: "Image Not Found"}).status(404);
  });
  }


  return  <div >
      <h1>Search Image</h1>
      <div className= 'search-form'>
      <label  htmlFor = 'name' />
      <span className="material-icons">search</span>
      <input  
            id = 'name'
            type= 'text'
            onChange = {(evt) => onChangeHandler(evt.currentTarget.value)}        
             />
      <button
            onClick= {onClickHandler}> 
            search 
      </button>
      </div>  
      {toggle && <div>
      
      <Context.Provider value={{list , search}}>
        <Suspense fallback = { <LoadingComp/>}><Gallery /></Suspense>
      </Context.Provider>
      </div>
}
    </div>
}

export default App;
