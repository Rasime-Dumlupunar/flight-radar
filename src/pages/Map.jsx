import { MapContainer, TileLayer, Marker, Popup, Polyline} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { useDispatch, useSelector } from 'react-redux';
import {icon} from "leaflet";
import { setPath } from '../redux/slices/flight';


const Map = ({setDetailId}) => {
  // burada obje dağıtma yöntemi ile başlangıç değerlerini yazabiliyoruz.
  const { flights, path} = useSelector(
    (store) => store.flightReducer);
    const dispatch = useDispatch();

    // marker için kendi iconumuzu oluşturalım.
    const planeIcon = icon({
      iconUrl: "plane-icon.png",
      iconSize: [20, 20],
    });

    
  
  return (
    <div >
      {/* MapContainer harita merkezinin enlem ve boylam noktasını gösterir. yazılan koordinatlar sayfa yenilendiğinde haritanın merkezi oluyor. ZOOM ise sayfa yenilendiği andaki zoom değerini verir.  scroollwheelzoom ise mouse'un orta tekerleğinin aktifliği belirler.*/}
      <MapContainer center={[39.340544, 35.310927]} 
      zoom={6} 
      scrollWheelZoom={false}>
        {/* TileLayer haritanın kendisini temsil ediyor. attribution ise haritanın adresine denk geliyor.   */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* marker ekranda gördüğümüz imleçler, position ise imlecin koordinat konumunu verir.  */}

        {flights.map((flight) => (          
          <Marker 
          key={flight.id}
          icon={planeIcon} 
          position={[flight.lat, flight.lng]}>
          {/* marker'ın üzerine tıklayınca çıkacak popup ayarlanır. */}
          <Popup>
            <div className='popup' >
              <span>
                Kod: {flight.code}
              </span>
              <button onClick={() => setDetailId(flight.id)}> Detay</button>
              {path.length > 1 && <button onClick={() => dispatch(setPath([]))}>Rotayı Temizle</button>}
            </div>
          </Popup>
        </Marker>
        ))}
        <Polyline positions={path} />
      </MapContainer>

    </div>
  )
};

export default Map;
