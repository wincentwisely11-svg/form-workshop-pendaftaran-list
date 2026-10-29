// 1. Ambil elemen dari HTML 
const form = document.querySelector('#formDaftar'); 
const nama = document.querySelector('#nama'); 
const email = document.querySelector('#email'); 
const daftar = document.querySelector('#daftar'); 

// 2. Jalankan saat form dikirim 
form.addEventListener('submit', function (e) { 
  e.preventDefault();// halaman tidak reload 
  const isiNama = nama.value;// ambil isian nama dari inputan form 
  const isiEmail = email.value;// ambil isian email dari inputan form 
  console.log('Nama = ' + isiNama + ' -  Email = ' + isiEmail); 
}); 
