import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Skeleton, Stack } from "@mui/material";

const Carousal = () => {
  const [image, setImage] = useState([]);
  const [data, setData] = useState();
  const [SkeletonLoader, setSkeletonLoader] = useState(true);

  const getAllBanners = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      process.env.REACT_APP_BASE_URL + "banner/19",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        if (result.status === 200) {
          setImage(result.image);
          setData(result.message);
          setSkeletonLoader(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getAllBanners();
  }, []);
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {image.map((item, index) => (
          <SwiperSlide
            className="h-full relative rounded-lg overflow-hidden"
            key={index + 1}
          >
            <div className="text-sm text-gray-600 hover:text-emerald-dark">
              <img
                layout="responsive"
                src={"https://azamdeal.com/apk_api/azamDeals/public/" + item}
                // alt={item.title}
                className="w-full object-cover md:object-fill lg:object-fill h-[300px] md:h-[500px] lg:h-[600px]"
              />
            </div>
            <div className="absolute top-0 left-0 z-10 p-r-16 flex-col flex w-full h-full place-items-start justify-center">
              <div className="pl-4 pr-12 sm:pl-10 sm:pr-16 w-10/12 lg:w-8/12 xl:w-7/12">
                <h1 className="mb-2 font-serif text-xl sm:text-lg md:text-2xl line-clamp-1 md:line-clamp-none  lg:line-clamp-none  lg:text-3xl font-bold text-white shadow-lg">
                  {data && data.banner_title}
                </h1>
                <p className="text-base leading-6 text-white font-sans line-clamp-1  md:line-clamp-none lg:line-clamp-none">
                  {data && data.banner_description}
                </p>
                <Link
                // href={item.url}
                >
                  <button className="hidden sm:inline-block lg:inline-block text-sm leading-6 font-serif font-medium mt-6 px-6 py-2 bg-emerald-500 text-center rounded-md text-white hover:bg-emerald-600">
                    Shop Now
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {SkeletonLoader && (
        <Stack>
          <Skeleton
            variant="rounded"
            animation="wave"
            height={500}
            className="w-full"
          />
        </Stack>
      )}
    </>
  );
};

export default Carousal;
