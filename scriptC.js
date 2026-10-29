const form = document.querySelector('#formDaftar');
const fields = form.querySelectorAll('input');
const nama = document.querySelector('#nama');
const email = document.querySelector('#email');
const daftar = document.querySelector('#daftar')

nama.minLength = 3;

const pesan = {
  nama: { kosong: 'Nama wajib diisi.', pendek: 'Nama minimal 3 huruf.' },
  email: { kosong: 'Email wajib diisi.', format: 'Format email belum benar. Contoh: nama@domain.com' },
  hp: { kosong: 'Nomor WhatsApp wajib diisi.', format: 'Nomor diawali 08 dan terdiri dari 10–13 digit.' },
  tanggal: { kosong: 'Pilih tanggal kehadiran.', lampau: 'Tanggal paling cepat hari ini.' },
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
  if (v.rangeUnderflow) return showError(input, p.lampau);
  return clearError(input);
}

function semuaFieldValid() {
  let valid = true;
  for (const input of fields) {
    if (!cekField(input)) valid = false;
  }
  return valid;
}

function formatTanggal(d) {
  const bulan = String(d.getMonth() + 1).padStart(2, '0');
  const tgl = String(d.getDate()).padStart(2, '0');
  return d.getFullYear() + '-' + bulan + '-' + tgl;
}
tanggal.min = formatTanggal(new Date());

const namaBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
function formatIndonesia(teks) {
  const bagian = teks.split('-');
  return Number(bagian[2]) + ' ' + namaBulan[Number(bagian[1]) - 1] + ' ' + bagian[0];
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
    
    const isiNama = nama.value;
    const isiEmail = email.value;
    const isiHp = hp.value
    const isiHadir = formatIndonesia(tanggal.value);

    const item = document.createElement('li');
    const baris1 = document.createElement('div');
    const baris2 = document.createElement('div');
  
    if (!semuaFieldValid()) { //Berhenti jika ada inputan yang salah, ke field input yang salah
      form.querySelector('[aria-invalid="true"]').focus();
      return;
    }

    item.className = 'list-group-item';
    baris1.className = 'fw-semibold';
    baris1.textContent = isiNama;
    baris2.className = 'small text-body-secondary';
    baris2.textContent = isiEmail + ' · ' + isiHp + ' · Hadir: ' + isiHadir;
    item.append(baris1, baris2);
    daftar.append(item);

    console.log('Nama = ' + isiNama + ' -  Email = ' + isiEmail + ' -  HP = ' + isiHp  + ' -  Hadir = ' + isiHadir)
});

form.addEventListener('reset', function () {
  for (const input of fields) {
    delete input.dataset.pernahError;
    clearError(input);
  }
});