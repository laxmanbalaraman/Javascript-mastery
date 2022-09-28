// Unsplash API
const count = 10;
const apiKey = "5zpBs6y527ZoJ9EtpjW5yfVyf6SMCpDZ3BLVd0FAmg4";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from unsplash api

async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

getPhotos();
