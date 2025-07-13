/*
SONUÇ VE RAPOR SAYFASI DENEMESİ İÇİN BU YAPILD!!!
hastaVerisi diye bir obje oluşturduk. İçinde ad, yaş, cinsiyet gibi hasta bilgileri var.
Bir buton koyduk: Tahmin Et
Butona tıklayınca handleSubmit fonksiyonu çalışıyor.
Bu fonksiyon bizi React Router'ın navigate fonksiyonu ile /result sayfasına götürüyor.
navigate fonksiyonuna ikinci parametre olarak { state: hastaVerisi } verdik.
Yani /result sayfasına hastaya ait bilgileri taşıdık. 
*/
/*Gerçek uygulamada burası şu şekilde çalışacak:
 1. Kullanıcı form alanlarına hastanın adı, soyadı, yaşı, cinsiyeti,
kan değerleri ve diğer parametreleri girer.
2. Formdaki bu bilgiler React state veya form yönetim kütüphanesi
(örneğin Formik, React Hook Form) ile tutulur.
3. "Tahmin Et" butonuna tıklandığında, girilen tüm veriler toplanır
 ve arka planda çalışan yapay zeka veya tahmin servisine API çağrısı
(fetch/axios ile POST isteği) yapılır.
4. Yapay zeka servisi tahmini yaptıktan sonra sonuçlar bu frontend
uygulamasına döner.
5. Gelen sonuçlar ve hastaya ait bilgiler React Router'ın navigate
fonksiyonu ile `/result` sayfasına state olarak aktarılır.
6. `/result` sayfasında bu bilgiler kullanılarak hasta verileri,
 ultrason görüntüsü ve tahmin sonucu gösterilir.
  Böylece kullanıcı, hasta bilgilerini girer, tahmini yaptırır
  ve sonucu aynı uygulama içinde detaylı bir rapor olarak görür.
*/ 
import React from "react";
import { useNavigate } from "react-router-dom";

const FormPage = () => {
  const navigate = useNavigate();

  const hastaVerisi = {
    name: "Ayşe Yılmaz",
    age: 45,
    gender: "Kadın",
  };

  const handleSubmit = () => {
    navigate("/result", { state: hastaVerisi });
  };

  return (
    <div>
      <h2>Hasta Formu</h2>
      {/* Form elemanları buraya */}
      <button onClick={handleSubmit}>Tahmin Et</button>
    </div>
  );
};

export default FormPage;
