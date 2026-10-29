const form = document.querySelector('#formDaftar'); 
const nama = document.querySelector('#nama'); 
const email = document.querySelector('#email'); 
const daftar = document.querySelector('#daftar'); 

form.addEventListener('submit', function (e) { 
  e.preventDefault(); 
  const isiNama = nama.value; 
  const isiEmail = email.value; 
  const item = document.createElement('li'); 
  item.className = 'list-group-item'; 
  item.textContent = isiNama + ' (' + isiEmail + ')'; 
  daftar.append(item); 
  form.reset(); 
  console.log('Nama = ' + isiNama + ' -  Email = ' + isiEmail); 
}); 
