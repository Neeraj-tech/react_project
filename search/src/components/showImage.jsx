import { useParams } from "react-router-dom";
import {useContext} from 'react';
import { Context } from "../contexts/context";
let ShowImage = () => {
  
  let params = useParams();

  let {list} = useContext(Context);

  let photo
  let photoUrl
  console.log(list,params.arg1);
  if(list){
   photo = list.find( e => e.id === params.arg1)
  }

  if(!photo){
    photo =list[0];
  }

  if(photo){
  photoUrl = `http://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`
  }
  return <div>{ 
    photoUrl ? <div><img alt={photo.title} src={photoUrl} /><br/><>{photo.title}</></div> : <h3>Nothing to display</h3>
  }</div>
  
}
export default ShowImage