// Ambil semua element video
const videos = Array.from(document.querySelectorAll("[data-duration]"));

// Pilih hanya yang JAVASCRIPT LANJUTAN
const playlists = videos
  .filter(video => video.textContent.includes("JAVASCRIPT LANJUTAN"))

  // Ambil durasi masing-masing video
  .map(duration => duration.dataset.duration)

  // Konversi durasi menjadi int dan ubah menit menjadi detik
  .map(waktu => {
    const parts = waktu.split(":").map(part => parseFloat(part));
    return parts[0] * 60 + parts[1];
  });

// Jumlahkan semua detik
let totalDurasi = playlists.reduce((acc, cur) => acc + cur);

// Ubah formatnya menjadi jam:menit:detik
const hour = Math.floor(totalDurasi / 3600);
totalDurasi = totalDurasi - hour * 3600;
const mnt = Math.floor(totalDurasi / 60);
const sec = totalDurasi - mnt * 60;

// Simpan di DOM
const jumlah = document.querySelector(".jumlah-video");
jumlah.innerHTML = playlists.length;

const total = document.querySelector(".total-durasi");
total.innerHTML = hour + ":" + mnt + ":" + sec;
