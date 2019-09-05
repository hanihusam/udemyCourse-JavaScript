document.getElementById("profesi-form").addEventListener("submit", function(e) {
  e.preventDefault();

  // Hide result
  document.getElementById("results").style.display = "none";
  // Show loader
  document.getElementById("loading").style.display = "block";

  // Calculate
  setTimeout(calculateZakat, 1500);
});

var rupiah = document.querySelector("[id*='rupiah']");
rupiah.addEventListener("keyup", function(e) {
  // tambahkan 'Rp.' pada saat form di ketik
  // gunakan fungsi formatRupiah() untuk mengubah angka yang di ketik menjadi format angka
  rupiah.value = formatRupiah(this.value);
});

// Calculate result
function calculateZakat() {
  console.log("Calculating...");
  // UI vars
  const UIsalary = document.getElementById("salary");
  const UIotherSalary = document.getElementById("other-salary");
  const UIloan = document.getElementById("loan");
  const UIresult = document.getElementById("result");

  const salary = parseFloat(UIsalary.value);
  let otherSalary = parseFloat(UIotherSalary.value);
  let loan = parseFloat(UIloan.value);
  const nisab = 522 * 7000;

  // Calculate zakat
  if (isNaN(otherSalary)) {
    otherSalary = 0;
  }
  if (isNaN(loan)) {
    loan = 0;
  }
  const result = (salary + otherSalary - loan) * 0.025;
  if (isFinite(salary)) {
    if (result < nisab) {
      showWarning();
    } else {
      UIresult.value = result;
      document.getElementById("results").style.display = "block";
      document.getElementById("loading").style.display = "none";
    }
  } else {
    showError("Mohon periksa borang Anda kembali");
  }
}

// Nisab warning handler function
function showWarning() {
  document.getElementById("results").style.display = "none";
  document.getElementById("loading").style.display = "none";

  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Create warning element
  const errDiv = document.createElement("div");
  errDiv.className = "alert alert-warning";
  errDiv.innerHTML =
    "Zakat Anda belum memenuhi nisab.<br/>Nisab saat ini adalah Rp 3.654.000<br/>(harga beras Rp 7.000/kg)";
  // Insert error element above heading element
  card.insertBefore(errDiv, heading);
  // Set timeout
  setTimeout(clearWarning, 4500);
}

// Error handler function
function showError(error) {
  document.getElementById("results").style.display = "none";
  document.getElementById("loading").style.display = "none";

  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Create error element
  const errDiv = document.createElement("div");
  errDiv.className = "alert alert-danger";
  errDiv.appendChild(document.createTextNode(error));
  // Insert error element above heading element
  card.insertBefore(errDiv, heading);
  // Set timeout
  setTimeout(clearError, 3000);
}

// Timeout function
function clearError() {
  document.querySelector(".alert-danger").remove();
}
function clearWarning() {
  document.querySelector(".alert-warning").remove();
}

// Split with dot function
function formatRupiah(angka) {
  var number_string = angka.replace(/[^,\d]/g, "").toString(),
    split = number_string.split(","),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  // Tambahkan titik jika yang di input sudah menjadi angka ribuan
  if (ribuan) {
    separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
  return rupiah;
}
