/** @format */

import axios from "axios";

const APIKey = "e3273e4012mshb169198bca82a66p12aa08jsn5078ac8bffc7";

export const fetchRestaurantList = async () => {
  try {
    const response = await axios.get(
      "https://travel-advisor.p.rapidapi.com/restaurants/list",
      {
        params: {
          location_id: "293919",
          restaurant_tagcategory: "10591",
          restaurant_tagcategory_standalone: "10591",
          currency: "USD",
          lunit: "km",
          // limit: '8',
          open_now: "false",
          lang: "en_US",
        },
        headers: {
          "X-RapidAPI-Key": APIKey,
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchRestaurantDetails = async (id) => {
  try {
    const response = await axios.get(
      `https://travel-advisor.p.rapidapi.com/restaurants/get-details`,
      {
        params: {
          location_id: id,
          currency: "USD",
          lang: "en_US",
        },
        headers: {
          "X-RapidAPI-Key": APIKey,
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
