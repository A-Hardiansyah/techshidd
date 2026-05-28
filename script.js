const API_URL = 'https://script.google.com/macros/s/AKfycbzsJ_pwaguh8emvYGBKL8fSPH0wdPe_y0V5aDQyxneAbYLInhWGmoXDhqOr88O_w_zKVQ/exec';

async function loadProducts() {
  const response = await fetch(API_URL);
  const data = await response.json();

  const container = document.getElementById('product-container');
  container.innerHTML = '';

  data.forEach(item => {
    container.innerHTML += `
      <div class="card">
        <img src="${item.gambar}" />
        <h3>${item.nama_barang}</h3>
        <p>Kode: ${item.kode_barang}</p>
        <p>Stok: ${item.stok}</p>

        <button onclick="potongStok('${item.kode_barang}')">
          Potong Stok
        </button>
      </div>
    `;
  });
}

async function potongStok(kodeBarang) {
  const cashbill = prompt('Masukkan Nomor Cashbill');
  const qty = prompt('Masukkan Qty Potong');

  if (!cashbill || !qty) return;

  await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({
      action: 'potongStok',
      kode_barang: kodeBarang,
      cashbill: cashbill,
      qty: qty
    })
  });

  alert('Stok berhasil dipotong');
  loadProducts();
}

loadProducts();
