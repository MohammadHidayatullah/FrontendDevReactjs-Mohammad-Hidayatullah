/** @format */

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchRestaurantDetails } from "../../action/restaurant";
import { IoIosArrowBack } from "react-icons/io";
import { Rating } from "react-simple-star-rating";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const DetailRestaurant = () => {
  const { id } = useParams();
  const [restaurantDetails, setRestaurantDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await fetchRestaurantDetails(id);
        setRestaurantDetails(details);
        console.log(details);
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      }
    };
    fetchDetails();
  }, [id]);

  if (!restaurantDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className='App mx-auto lg:max-w-6xl px-8 w-full h-36 md:h-64 md:px-16 my-12 space-y-6 text-sm'>
      <Link
        to={"/"}
        className='bg-blue-900 p-2 flex items-center w-fit rounded-sm text-white space-x-1'>
        <IoIosArrowBack className='text-sm' />
        <span>List of Restaurants</span>
      </Link>
      <div className='flex items-center space-x-1'>
        <h1 className='text-2xl'>{restaurantDetails?.name}</h1>
        <Rating
          initialValue={restaurantDetails?.rating}
          size={20}
          transition
          allowFractions
          emptyStyle={{ display: "flex" }}
          fillStyle={{ display: "-webkit-inline-box" }}
          readonly
        />
      </div>
      <img
        className='w-full h-44 object-cover rounded-md'
        src={
          restaurantDetails?.photo?.images?.small?.url ||
          "https://via.placeholder.com/300"
        }
        alt=''
      />
      <div className='desc pb-12 space-y-2'>
        <p className='text-xs'>{restaurantDetails?.address}</p>
        <div className='flex items-center'>
          <p>Restaurant Category:{""} </p>
          {restaurantDetails?.cuisine?.map((cuisine, index) => (
            <div key={index} className='text-xs space-x-2'>
              <span className='bg-blue-900 text-white px-2 rounded-full'>
                {cuisine.name}
              </span>
            </div>
          ))}
        </div>
        <p>{restaurantDetails?.description}</p>
      </div>

      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{
          lat: 12.934995,
          lng: 100.88226,
        }}
        defaultZoom={11}>
        <AnyReactComponent
          lat={
            restaurantDetails?.latitude === undefined
              ? 12.934995
              : restaurantDetails?.latitude
          }
          lng={
            restaurantDetails?.longitude === undefined
              ? 100.88226
              : restaurantDetails?.longitude
          }
          text='My Marker'
        />
      </GoogleMapReact>

      <div className='reviews space-y-2 pb-12'>
        <h3 className='text-lg'>Customer Reviews</h3>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {restaurantDetails?.reviews?.map((review, index) => (
            <div
              className='p-7 bg-gray-300 rounded-md space-y-2'
              key={index}
              id={`slide${index + 1}`}>
              <div className='flex justify-between'>
                <p>{review?.author}</p>
                <p>
                  {new Date(review?.publised_date).toLocaleString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <Rating
                initialValue={review?.rating}
                size={20}
                transition
                allowFractions
                emptyStyle={{ display: "flex" }}
                fillStyle={{ display: "-webkit-inline-box" }}
                readonly
              />
              <p className='text-2xl'>{review?.title}</p>

              <p>{review?.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailRestaurant;
