import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import ItemCard from "../components/ItemCard";

//special feature
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  SwiperCore.use([Navigation]);
  console.log(offerListings);
  console.log(rentListings);
  console.log(saleListings);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=5");
        const data = await res.json();
        setOfferListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=5");
        const data = await res.json();
        setRentListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=5");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
    fetchRentListings();
    fetchSaleListings();
  }, []);

  return (
    <div>
      {/* top */}

      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Discover Your Ultimate<span className="text-slate-500">Tech</span>
          <br />
          Solutions Here
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Welcome to our revolutionary technology app! With our platform, you can effortlessly explore and find the perfect devices to suit your needs.
          <br />
          Whether you're searching for the latest smartphones, cutting-edge laptops, high-performance gaming equipment, or innovative smart home gadgets, we've got you covered.
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-600 font-bold hover:underline"
        >
          Let`s get started...
        </Link>
      </div>

      {/* swiper */}
      <Swiper Navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results for offer, sale and rent */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-1">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>

const imageUrls = [
   https://www.javatpoint.com/ram,
  // Add more image URLs as needed
];
            
<div className="flex flex-wrap gap-4">
  {offerListings.map((listing) => (
    <ItemCard
      key={listing._id}
      image={listing.imageUrls[0]}
      description={listing.description}
      price={listing.price}
    />
  ))}
</div>

            
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent products for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=rent"}
              >
                Show more products for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent products for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sale"}
              >
                Show more products for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}
