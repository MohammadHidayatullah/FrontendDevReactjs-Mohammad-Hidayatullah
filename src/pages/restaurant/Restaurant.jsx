/** @format */

import React, { useEffect, useState } from "react";
import { fetchRestaurantList } from "../../action/restaurant";
import { Rating } from "react-simple-star-rating";
import { Link } from "react-router-dom";

const Restaurant = () => {
  const [loading, setLoading] = useState(true);
  const [restaurantData, setRestaurantData] = useState(null);
  const [visibleRestaurantCount, setVisibleRestaurantCount] = useState(8);
  const [error, setError] = useState(null);
  const [openNow, setOpenNow] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  console.log("openNow", openNow);
  console.log("price", price);
  console.log("category", category);
  console.log("visibleRestaurantCount", visibleRestaurantCount);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRestaurantList();
        setRestaurantData(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleLoadMore = () => {
    setVisibleRestaurantCount((prevCount) => prevCount + 4);
  };

  return (
    <div className='App mx-auto lg:max-w-6xl px-8 w-full h-36 md:h-64 md:px-16 my-5 text-xs'>
      <h1 className='text-2xl'>Restaurants</h1>
      <p>
        Available restaurants in your area. <br />
        Please select one to place an order. Available restaurants in your area.
      </p>

      <div className='filter'>
        <div className='flex justify-between items-center'>
          <div className='flex justify-between w-full'>
            <div className='filter flex items-center space-x-2'>
              <p>Filter by:</p>

              <div className='flex items-center space-x-1 border border-blue-900 py-2 rounded-sm my-9 w-fit text-blue-900 px-2'>
                <input
                  className='border border-blue-900 rounded-sm text-blue-900'
                  type='checkbox'
                  id='openNow'
                  name='openNow'
                  value={openNow}
                  onChange={() =>
                    setOpenNow(openNow === "Open Now" ? "" : "Open Now")
                  }
                />
                <label htmlFor='openNow'>Open Now</label>
              </div>

              <select
                className='border border-blue-900 py-2 rounded-sm my-9 w-fit text-blue-900 px-2'
                name='price'
                id='price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}>
                <option value=''>Price</option>
                <option value='$'>Inexpensive</option>
                <option value='$$ - $$$'>Moderate</option>
                <option value='$$$$'>Pricey</option>
              </select>

              <select
                className='border border-blue-900 py-2 rounded-sm my-9 w-fit text-blue-900 px-2'
                name='category'
                id='category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}>
                <option value=''>Category</option>
                <option value='10648'>International</option>
                <option value='10662'>British</option>
                <option value='10654'>European</option>
                <option value='10659'>Asian</option>
                <option value='10660'>Thai</option>
                <option value='10345'>Steakhouse</option>
                <option value='10683'>Gastropub</option>
                <option value='10665'>Vegetarian Friendly</option>
                <option value='10992'>Gluten Free Options</option>
                <option value='10643'>Seafood</option>
                <option value='10653'>Sushi</option>
                <option value='10697'>Vegan Options</option>
                <option value='10640'>Bar</option>
              </select>
            </div>
            <button
              className='border border-blue-900 py-2 rounded-sm my-9 w-fit text-blue-900 px-12'
              onClick={() => {
                setOpenNow("");
                setPrice("");
                setCategory("");
              }}>
              Reset Filter
            </button>
          </div>
        </div>
      </div>

      <div className='content'>
        <h2 className='text-lg text-gray-500 mb-5'>
          {/* All Restaurants or use the filter to find your favorite */}
          {openNow === "" && price === "" && category === ""
            ? "All Restaurants"
            : "Filter Results"}
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {restaurantData?.data
            ?.filter((restaurant) => {
              const isOpenNow =
                openNow === "" || restaurant?.open_now_text === openNow;

              const isMatchingPrice =
                price === "" || restaurant?.price_level === price;

              const isMatchingCategory =
                category === "" ||
                restaurant?.category?.name === category ||
                (restaurant?.cuisine &&
                  restaurant?.cuisine.some(
                    (cuisine) => cuisine?.key === category
                  ));

              return isOpenNow && isMatchingPrice && isMatchingCategory;
            })
            ?.slice(0, visibleRestaurantCount)
            .map((restaurant) => (
              <div
                className='item flex flex-col justify-between space-y-4'
                key={restaurant?.location_id}>
                <img
                  className='w-full h-44 object-cover'
                  src={
                    restaurant.photo?.images?.small?.url ||
                    "https://via.placeholder.com/300"
                  }
                  alt=''
                />
                <div className='desc'>
                  <h3>{restaurant.name}</h3>
                  <h3>{restaurant?.price_level}</h3>
                  <Rating
                    initialValue={restaurant.rating}
                    size={20}
                    transition
                    allowFraction
                    emptyStyle={{ display: "flex" }}
                    fillStyle={{ display: "-webkit-inline-box" }}
                    readonly
                  />
                  <div className='flex justify-between'>
                    <div className='left'>
                      <p>
                        {restaurant?.address_obj?.country || "-"} .{" "}
                        {restaurant?.price || "-"}
                      </p>
                    </div>
                    <div className='shrink-0'>
                      {restaurant?.open_now_text === "Open Now" ? (
                        <div className='flex items-center space-x-1 uppercase'>
                          <div className='bg-green-500 h-2 w-2 rounded-full'></div>
                          <span>{restaurant?.open_now_text}</span>
                        </div>
                      ) : (
                        <div className='flex items-center space-x-1 uppercase'>
                          <div className='bg-red-500 h-2 w-2 rounded-full'></div>
                          <span>{restaurant?.open_now_text}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <Link
                  to={`/${restaurant?.location_id}`}
                  className='bg-blue-900 py-1 text-center w-full rounded-sm text-white'>
                  LEARN MORE
                </Link>
              </div>
            ))}
        </div>
        {loading ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {[...Array(8)].map((_, index) => (
              <div className='item flex flex-col justify-between space-y-2 animate-pulse '>
                <div className='skeleton bg-slate-700 h-44 w-full rounded-md'></div>
                <div className='desc space-y-1'>
                  <div className='skeleton bg-slate-700 h-4 w-1/2 rounded-md'></div>
                  <div className='skeleton bg-slate-700 h-4 w-1/4 rounded-md'></div>
                  <div className='skeleton bg-slate-700 h-4 w-1/4 rounded-md'></div>
                  <div className='skeleton bg-slate-700 h-4 w-1/4 rounded-md'></div>
                </div>
                <div className='skeleton bg-slate-700 h-8 w-full rounded-sm'></div>
              </div>
            ))}
          </div>
        ) : (
          <div className='w-full flex justify-center'>
            <button
              className='border border-blue-900 py-2 rounded-sm my-9 w-fit text-blue-900 px-12'
              onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurant;
