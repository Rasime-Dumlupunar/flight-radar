import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Map from './pages/Map';
import List from './pages/List';
import { useDispatch } from 'react-redux';
import { getFlights } from './actions';
import  Modal  from "./components/Modal";


const App = () => {

  const [isMapView, setIsMapView] = useState(true);
  const [detailId, setDetailId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFlights());

    // setInterval(() => {
      // dispatch(getFlights());      
    //}, 3000);  -- API isteğinin bitmemesi için yorum satırına alındı
    } , []);

  return (
    <div>
      <Header />

      <div className='buttons'>
        <button 
        className={isMapView ? "active" : ""} onClick={() => setIsMapView(true)}>Harita Görünümü</button>
        <button 
        className={isMapView ? "" : "active"} onClick={() => setIsMapView(false)}>Liste Görünümü </button>
      </div>

      {isMapView ? (
        <Map setDetailId={setDetailId}/>
       ) : (
       <List setDetailId={setDetailId} />
      )}

      {detailId && <Modal detailId={detailId} close={() => setDetailId(null)} /> }

      
    </div>
  )
}

export default App;
