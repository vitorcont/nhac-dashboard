"use client";
/* eslint-disable @next/next/no-img-element */
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import RoomIcon from "@mui/icons-material/Room";
import { Grid, IconButton, Skeleton } from "@mui/material";
import { useContext, useEffect, useState } from "react";

import { ItemList, RestaurantsHorizontal } from "@portal/components";
import { AuthContext } from "@portal/context/auth-provider";
import { favoriteApi } from "@portal/service/favorite.api";
import { restaurantsApi } from "@portal/service/restaurants.api";
import useRestaurantsStore from "@portal/store/restaurants.store";
import { formatAddress, formatPhone } from "@portal/utils/formatters";

export default function RestaurantDetails({ params }: { params: { id: string } }) {
  const {
    restaurantList,
    restaurantDetails,
    setRestaurantDetails,
    setRestaurantList,
    setRestaurantFilteredList,
  } = useRestaurantsStore((state) => state);
  const {
    state: { user },
  } = useContext(AuthContext);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [loadingList, setLoadingList] = useState(false);

  const favoriteDetails = restaurantDetails?.userFavorites;
  const info = {
    ...(restaurantDetails &&
      restaurantDetails.address && {
        address: {
          icon: <RoomIcon color="primary" />,
          text: formatAddress(restaurantDetails.address),
        },
      }),
    ...(restaurantDetails &&
      restaurantDetails.phone && {
        phone: {
          icon: <LocalPhoneIcon color="primary" />,
          text: formatPhone(restaurantDetails?.phone),
        },
      }),
  };

  const findDetails = async () => {
    try {
      setLoadingDetails(true);
      const data = await restaurantsApi.getById(params.id);
      setRestaurantDetails(data);
      setLoadingDetails(false);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRestaurants = async () => {
    try {
      setLoadingList(true);
      const data = await restaurantsApi.list();
      setRestaurantList(data);
      setRestaurantFilteredList(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFavorite = async () => {
    try {
      if (favoriteDetails && favoriteDetails?.length > 0) {
        await favoriteApi.delete(favoriteDetails[0].id);
      } else {
        await favoriteApi.add(restaurantDetails?.id ?? "");
      }
      const data = await restaurantsApi.getById(restaurantDetails?.id ?? "");
      setRestaurantDetails(data);
      setLoadingDetails(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDetails(false);
    }
  };

  useEffect(() => {
    findDetails();
    if (!restaurantList.length) {
      fetchRestaurants();
    }
  }, []);

  return (
    <Grid container flexDirection="column" alignItems={"flex-end"} justifyContent={"space-between"}>
      <section className="pd-sides w-full">
        <div className="restaurant-details__background">
          {loadingDetails ? (
            <Skeleton variant="rounded" width={"100%"} height="100%" />
          ) : (
            <>
              <div className="restaurant-details__background__icon">
                <img
                  className="restaurant-details__background__icon__image"
                  src={restaurantDetails?.logoUrl}
                  alt={""}
                />
              </div>
              <img src={restaurantDetails?.backgroundUrl} className="w-full h-full object-cover" />
            </>
          )}
        </div>
      </section>
      <section className=" mt-8 pd-sides w-full">
        {loadingDetails ? (
          <Skeleton variant="rounded" width={"100%"} height={160} />
        ) : (
          <>
            <div className="restaurant-details__details">
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <div className="flex flex-row items-center">
                  <h1 className="text-3xl semi-bold text-secundary">{restaurantDetails?.name}</h1>
                  {user && (
                    <IconButton className="ml-2" onClick={() => handleFavorite()}>
                      {favoriteDetails && favoriteDetails?.length > 0 ? (
                        <FavoriteIcon color="primary" />
                      ) : (
                        <FavoriteBorderIcon color="primary" />
                      )}
                    </IconButton>
                  )}
                </div>
                <p className="mt-2">{restaurantDetails?.description}</p>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                lg={4}
                xl={3}
                className="restaurant-details__details__address">
                <div className="restaurant-details__details__line"></div>
                <div className="flex flex-col">
                  {info.address && (
                    <span className="flex-row mt-2">
                      <>{info.address.icon}</>
                      <a
                        className="ml-2 underline"
                        href={`https://www.google.com/maps/search/?q=${encodeURI(info.address.text)}`}>
                        {info.address.text}
                      </a>
                    </span>
                  )}
                  {info.phone && (
                    <span className="flex-row mt-2">
                      <>{info.phone.icon}</>
                      <p className="ml-2">{info.phone.text}</p>
                    </span>
                  )}
                </div>
              </Grid>
            </div>
          </>
        )}
      </section>
      <ItemList
        className="overflow-hidden "
        title="Cardápio"
        loading={loadingDetails}
        data={restaurantDetails?.items ?? []}
      />
      <section className={`w-full bg-primary bottom-pd`}>
        <RestaurantsHorizontal loading={loadingList} data={restaurantList} title="Outras opções" />
      </section>
    </Grid>
  );
}
