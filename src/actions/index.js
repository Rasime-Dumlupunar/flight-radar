import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../constants";



export const getFlights = createAsyncThunk("flights/getFlight", 
async () => {
    //1- API isteği atacağız
    const res  = await axios.request(options); 
    //2- API'den gelen verileri formatla (aircraft dizisi içerisindeki her bir uçuş verisi dizi olarak gelmişti projede kullanımı kolaylaştırmak için bu dizileri nesneye çevirdik)
    const formatted = res.data.aircraft.map((item) => ({
            id: item[0],
            code: item[1],
            lat: item[2],
            lng: item[3],
            
    }));    
    //3- aksiyonun payload'ını return et
    return formatted;
   
});


// Klasik bir aksiyonda bulunması gereken iki faktör, type ve payload'dır.
// Klasik action
// { type: "add_data",
// payload: {id:"1312"};
// } 


// asenkron yazacağımız zaman yine type ve payload isteniyor. Ama farklı şekilde yazıyoruz. 
// ÖRNEK
// type kısmı : 
//  export const getFlights = createAsyncThunk("flights/getFlight", );
// payload kısmı: aksiyonu payload'ını API den alacağımız için , payload'ı fonksiyon aracılığı ile ifade ediyoruz. 
// 