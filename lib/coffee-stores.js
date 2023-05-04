
import { createApi } from 'unsplash-js';
import nodeFetch from 'node-fetch';

const unsplash = createApi({
  accessKey: process.env.UN_SPLASH_ACCESS_KEY,
  fetch: nodeFetch,
});



export const fetchCoffeeStores = async ()  =>  {

  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    perPage: 6,
  });


  const coffeeStorePhotosFetched = photos.response.results.map((result) => result.urls["small"])


    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.FOUR_SQUARE_API_KEY
        }
      };
      
      const response = await fetch('https://api.foursquare.com/v3/places/search?query=coffee&ll=43.652684003980085%2C-79.38711133296046&limit=6', options);
      const data = await  response.json()
      data.results.map((result,index) =>{       
              result.imgUrl = coffeeStorePhotosFetched[index];
      })
      return data.results
}


