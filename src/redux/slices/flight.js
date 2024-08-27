import { createSlice } from "@reduxjs/toolkit";
import { getFlights } from "../../actions";

const initialState = {
    isLoading: true,
    error: null, 
    flights: [],
    path: [],
}

const flightSlice = createSlice({
    name: "flight",
    initialState,
    reducers: {
        setPath: (state, {payload}) => {
            state.path = payload;
        },
        
    },

    extraReducers:(builder) => {
        // rejected ve fulfilled olaylarında data geleceği için action'u da almamız gerekiyor, ama pending durumunda sadece veri yüklenmeye başladığını ifade ettiği için ve action içinde birşey gelmediği için burada action parametre olarak alınmıyor.
        builder.addCase(getFlights.pending, (state) => {
            state.isLoading = true; // pending actionu tetiklendiyse isLoading durumunu true'ya çek.
        });
        // state yanına aldığımız action ve error.message önüne yazacağımız action'u kaldırarak , action içindeki herhangi bir nesneye erişme noktasında action nesnesini dağıtıp erişirsek daha az kod yazarız, o nedenle error nesnesini yazdık.
        builder.addCase(getFlights.rejected, (state, { error}) => {
            state.isLoading = false;
            state.error = error.message;
        });
        builder.addCase(getFlights.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.flights = action.payload; // action payload'ı flights state'ine ekle.
        });
    },
    
});

// buradaki reducer yukarıda tanımladığımız flightSlice fonksiyonundan geliyor. 
// Biz createSlice'a değerleri giriyoruz, o da bizim yerimize REDUCER üretiyor ve biz de onu kullanıyoruz. Aşağıdaki reducer createSlice'ın ürettiği REDUCER oluyor.

export const { setPath} = flightSlice.actions;
export default flightSlice.reducer;
