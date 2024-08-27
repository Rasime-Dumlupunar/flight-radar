import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { detailOpt } from '../constants';
import Loader from './Loader';
import formatDate from '../utils/formatDate';
import { useDispatch } from 'react-redux';
import { setPath } from '../redux/slices/flight';
import c from '../utils/checkValid'; // projede çok kullanacağımız için adını kısaltarak c ile tanımladık


const Modal = ({close, detailId}) => {
    // uçuş detay verisini sadece modal bileşeni içerisinde kullanacağımız için store'da saklama ihtiyacı duymadık.
    const [d, setDetail] = useState(); // projede sürekli detail ismi kullanacağımız için detail kelimesini kısaltarak d olarak tanımladık. 
    const dispatch = useDispatch();
    useEffect(() => {

            // eski state'i sıfırla
            setDetail(null);
            // api isteğinin parametresini belirle
            detailOpt.params.flight = detailId;
            // api isteği at (cevabı state'e aktar)
            axios.request(detailOpt)
            .then((res) => {
                // uçuş verilerini state'e aktar
            setDetail(res.data);
            // rota bilgisini reducer'a aktarıyor , rota bilgisini reducer'a aktarma sebebi buna MAP bileşeninde ihtiyacımız olması
            dispatch(setPath(res.data.trail));
        });
     }, [detailId]);        
        

  return (
    <div className='modal-outer'>
      <div className='modal-inner'>
        <div className='close-wrapper'>
            <button onClick={close}> X </button>
        </div>
        
        {!d ? ( <Loader /> 
        ) : (
            <>
            <h2>{c(d.aircraft.model?.text)} </h2>
            <h2>{c(d.aircraft.model?.code)}</h2>

            <p>
                <span>Kuyruk Kodu : </span>
                <span>{c(d.aircraft?.registration)} </span>
            </p>
            {d.aircraft.images?.large ? (<img src= {d.aircraft.images.large[0].src} />
            ) : (
                <p> Fotoğraf Bulunamadı</p>
            )}
            <p>
                <span> Şirket : </span>
                <span> {c(d.airline?.name)} </span>
            </p>
            <p>
                <span> Kalkış : </span>
                <a target="_blank" href={d.airport?.origin?.website}> {c(d.airport?.origin?.name)}</a>
            </p>
            <p>
                <span> Hedef : </span>
                <a target="_blank" href={d.airport?.destination?.website}> {c(d.airport?.destination?.name)}</a>
            </p>
            <p>
                <span> Kalkış Zamanı : </span>
                <span> {d.time.scheduled?.departure ? formatDate(d.time.scheduled?.departure) : "Tarih Bilinmiyor"} </span>
            </p>
            <p>
                <span> İniş Zamanı : </span>
                <span> {d.time.scheduled?.arrival ? formatDate(d.time.scheduled?.arrival) : " Tarih Bilinmiyor"}</span>
            </p>

            <p className={d.status.icon}>
                <span>{d.status?.text}</span>
            </p>
            </>
        )
        }
      </div>
    </div>
  );
}; 

export default Modal;
