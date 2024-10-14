require('dotenv').config();
const apiKey = process.env.GOOGLE_MAPS_API_KEY;
const photos = [
  {
    "photoReference": "AdCG2DPLuFWGpi2FxCtpL7XDHZJ3eAlyiiZIAt3mTYTRAIB1u2Pk6fWMnAibZwW4hvIgpYErp2ezJu6tBG6LliV2kUJReF8BhwgRamjWiGvKaNEAiWxDQpje3K9CunKc-i1CpmH1byu9-eBHtiX3YExrLr4dJWsuogZTFHtzhBmfYCUPnoWZ",
    "width": 4032,
    "height": 3024,
  },
  {
    "photoReference": "AdCG2DMqJHfxaD5qSYaNqFA7pyrNheG3YNzzuwjqLLxoXMEpL-0Z7LaKH-TmwbV9MqwVovzXOFRt6ndsmUaHg3qKp7vGMqESQZfCjinYuwj0PD-m6LPzYS2fdWtY19StAX9_-f1RHKHXe7SWC7Ey6CSmtYjzZT60Fpm0zFFYuhmB4BG5__b_",
    "width": 3072,
    "height": 4096
  },
  {
    "photoReference": "AdCG2DO7uphEmS_QvR_75nlMonLAoGViF9wSKflCEFTmNaUBtrUH3B3LUbB6Xb2LUGk0gcbRk47v1sC8irDHunrsZSDGkKU0FQIFWPJqKZoS7ekhz_P3WMBh-SNbVNqMpWhtbMoJbAy0tS7DzAAPMXnWUh1BtwSiPyWt-LfNXPMnBzcqAE7z",
    "width": 3024,
    "height": 4032
  }
];

const getPhotoUrl = (photoReference, width) => {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${width}&photo_reference=${photoReference}&key=${apiKey}`;
};

photos.forEach(photo => {
  const photoUrl = getPhotoUrl(photo.photoReference, photo.width);
  console.log(photoUrl);
});