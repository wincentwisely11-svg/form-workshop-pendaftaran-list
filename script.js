const form = document.querySelector('#formDaftar');
const fields = form.querySelectorAll('input');
const nama = document.querySelector('#nama');
const email = document.querySelector('#email');
const daftar = document.querySelector('#daftar')

nama.minLength = 3;

const pesan = {
  nama: { kosong: 'Nama wajib diisi.', pendek: 'Nama minimal 3 huruf.' },
  email: { kosong: 'Email wajib diisi.', format: 'Format email belum benar. Contoh: nama@domain.com' },
};

function showError(input, teks) {
  input.classList.add('is-invalid');
  input.setAttribute('aria-invalid', 'true');
  input.dataset.pernahError = 'true';
  document.getElementById(input.id + '-error').textContent = teks;
  return false;
}

function clearError(input) {
  input.classList.remove('is-invalid');
  input.removeAttribute('aria-invalid');
  document.getElementById(input.id + '-error').textContent = '';
  return true;
}

function cekField(input) {
  const v = input.validity;
  const p = pesan[input.id];

  if (input.value.trim() === '') return showError(input, p.kosong);
  if (input.minLength > 0 && input.value.trim().length < input.minLength) return showError(input, p.pendek);
  if (v.typeMismatch || v.patternMismatch) return showError(input, p.format);
  return clearError(input);
}

function semuaFieldValid() {
  let valid = true;
  for (const input of fields) {
    if (!cekField(input)) valid = false;
  }
  return valid;
}

function saatBlur(event) {
  cekField(event.target);
}

function saatInput(event) {
  const input = event.target;
  if (input.dataset.pernahError) cekField(input);
}

for (const input of fields) {
  input.addEventListener('blur', saatBlur);
  input.addEventListener('input', saatInput);
}

form.addEventListener('submit', function (e) {
  if (!semuaFieldValid()) {
    e.preventDefault();
    e.stopImmediatePropagation();
    form.querySelector('[aria-invalid="true"]').focus();
  }
});

form.addEventListener('submit', function (e){
    e.preventDefault(); //halaman tidak reload
    const isiNama = nama.value; //ambil isian nama dari inputan form
    const isiEmail = email.value; //ambil isian email dari inputan form

    console.log('Nama = ' + isiNama + ' - Email = ' +isiEmail);
   
    const item = document.createElement('li'); 
    item.className = 'list-group-item'; 
    item.textContent = isiNama + ' (' + isiEmail + ')'; 
    daftar.append(item); 
    form.reset(); 
});

form.addEventListener('reset', function () {
  for (const input of fields) {
    delete input.dataset.pernahError;
    clearError(input);
  }
});