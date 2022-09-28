const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

// Unsplash API
const count = 10;
const apiKey = "5zpBs6y527ZoJ9EtpjW5yfVyf6SMCpDZ3BLVd0FAmg4";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let photosArray = [];
let imagesLoaded = 0;
let totalImages = 0;
let ready = false;

// Check of all images are loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Create Elemnt for links & photos and add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = count;
  photosArray.forEach((photo) => {
    // Create <a> to link to unlsplash
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");

    // create <img> for photo
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);

    // Event Listener, check when each image is finished loading
    img.addEventListener("load", imageLoaded);
    // put <img> inside <a>, then put both inside imageContainer
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from unsplash api
async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();
    displayPhotos();
    console.log(photosArray);
  } catch (error) {
    console.log(error);
  }
}

// Load more photos if scroll bar is near bottom of the page
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
