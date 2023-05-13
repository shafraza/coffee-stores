//initialize unsplash

import { createApi } from "unsplash-js";

// on your node server
const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  //...other fetch options
});
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'fsq32w/H0ZRvB0W0gh0T7fZbC4lpsjbrCk3QIKkS4bajais='
  }
};



const getUrlForCoffeeStores = (latLong, query, limit) => {
  const url = `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;

  return fetch(url, options)
    .then(response => response.json())
    .then(data => {
      // Save the response to a variable and return it

      return data;
    })
    .catch(error => {
      console.error(error);
      return null;
    });
};

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee shop",
    perPage: 30,
  });

  const unsplashResults = photos.response?.results || [];
  return unsplashResults.map((result) => result.urls["small"]);
};

export const fetchCoffeeStores = async (
  latLong = "43.653833032607096%2C-79.37896808855945",
  limit = 6
) => {
  const photos = await getListOfCoffeeStorePhotos();
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };



  const getCoffeeStoresCustom = async (latLong, query, limit) => {
    const response = await getUrlForCoffeeStores(latLong, query, limit);
    return response;
  };

  const coffeeStoresResp = await getCoffeeStoresCustom('40.7,-74', 'coffee', 9);





  return coffeeStoresResp.results.map((result, idx) => {
    const neighborhood = result.location.neighborhood;
    return {
      id: result.fsq_id,
      address: result.location.address,
      name: result.name,
      neighbourhood: neighborhood?.length > 0 ? neighborhood[0] : "",
      imgUrl: photos.length > 0 ? photos[idx] : null,
    };
  });
};
