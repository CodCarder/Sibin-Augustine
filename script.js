// Show QR popup
function showPopup() {
  const popup = document.getElementById('qrPopup');
  const overlay = document.getElementById('overlay');
  popup.style.display = 'block';
  overlay.style.display = 'block';
}

// Close QR popup
function closePopup() {
  const popup = document.getElementById('qrPopup');
  const overlay = document.getElementById('overlay');
  popup.style.display = 'none';
  overlay.style.display = 'none';
}

// Show contact info popup
function showContactPopup() {
  const popup = document.getElementById('contactPopup');
  const overlay = document.getElementById('overlay');
  popup.style.display = 'block';
  overlay.style.display = 'block';
}

// Close contact info popup
function closeContactPopup() {
  const popup = document.getElementById('contactPopup');
  const overlay = document.getElementById('overlay');
  popup.style.display = 'none';
  overlay.style.display = 'none';
}

// Download the card as image using html2canvas

 function downloadCard() {
      const link = document.createElement('a');
      link.href = 'vcard.png';
      link.download = 'vcard.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }


// Share this page using Web Share API if supported
function shareThisPage() {
  if (navigator.share) {
    navigator.share({
      title: document.title,
      url: window.location.href
    }).then(() => {
      console.log('Thanks for sharing!');
    }).catch(console.error);
  } else {
    alert('Your browser does not support the Web Share API.');
  }
}

//Initialize the gallery images

const galleryImages = [
  "1 (1).jpg",
  "1 (2).jpg",
  "1 (3).jpg",
  "1 (4).jpg",
  "1 (5).jpg",
  "1 (6).jpg",
  "1 (7).jpg"
];

let currentIndex = 0;
let modalInterval = null;
let carouselInterval = null;

function updateCarousel() {
  const imgs = document.querySelectorAll('#gallery img');
  imgs.forEach((img, i) => {
    img.classList.remove('active');
    if (i === currentIndex) img.classList.add('active');
  });
}

function startCarouselAutoPlay() {
  updateCarousel();
  carouselInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    updateCarousel();
  }, 3000);
}

function stopCarouselAutoPlay() {
  clearInterval(carouselInterval);
}

function openModal(index) {
  currentIndex = index;
  document.getElementById("modalViewer").style.display = "flex";
  document.getElementById("modalImage").src = galleryImages[currentIndex];
  modalInterval = setInterval(() => {
    changeImage(1);
  }, 3000);
}

function closeModal() {
  document.getElementById("modalViewer").style.display = "none";
  clearInterval(modalInterval);
}

function changeImage(direction) {
  currentIndex += direction;
  if (currentIndex < 0) currentIndex = galleryImages.length - 1;
  if (currentIndex >= galleryImages.length) currentIndex = 0;
  document.getElementById("modalImage").src = galleryImages[currentIndex];
  updateCarousel(); // sync carousel if open
}

// Swipe Support for Modal
let startX = 0;
const modalViewer = document.getElementById("modalViewer");

modalViewer.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

modalViewer.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) changeImage(1);
  else if (endX - startX > 50) changeImage(-1);
});

// Start autoplay on page load
document.addEventListener("DOMContentLoaded", () => {
  startCarouselAutoPlay();
});

// Initialize the gallery images end