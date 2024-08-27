// Eğer ki parametre olarak aldığı değer tanımlıysa o değeri geri döndüren, ama tanımsız ise BİLİNMİYOR metni döndüren fonksiyon yazalım.

const checkValid = (value) => {
    return !value ? "Bilinmiyor" : value;
};

export default checkValid;