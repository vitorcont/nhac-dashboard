"use client";
/* eslint-disable @next/next/no-img-element */
import { Grid } from "@mui/material";
import { $Enums } from "@prisma/client";
import { useEffect, useMemo } from "react";

import { Banner } from "@portal/components/elements/Banner/Banner";
import { RestaurantsHorizontal } from "@portal/components/modules/RestaurantsList/RestaurantsHorizontal";
import { RestaurantsVertical } from "@portal/components/modules/RestaurantsList/RestaurantsVertical";
import { restaurantsApi } from "@portal/service/restaurants.api";
import useRestaurantsStore from "@portal/store/restaurants.store";
export default function Home() {
  const { restaurantList, setRestaurantFilteredList, setRestaurantList } = useRestaurantsStore(
    (state) => state
  );
  const newRestaurants = useMemo(
    () => restaurantList.filter((restaurant) => restaurant.category === $Enums.Category.NEW),
    [restaurantList]
  );
  const otherRestaurants = useMemo(
    () => restaurantList.filter((restaurant) => restaurant.category !== $Enums.Category.NEW),
    [restaurantList]
  );
  const fetchRestaurants = async () => {
    try {
      const data = await restaurantsApi.list();
      setRestaurantList(data);
      setRestaurantFilteredList(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <main>
      <Grid container>
        <img src="/ic_background.svg" className="cover-icon" alt="logo" />
        <RestaurantsHorizontal className="mt-14" data={newRestaurants} title="Novidades!" />
        <div className="w-full flex flex-row justify-between px-24">
          <Grid item xs={5.5}>
            <Banner />
          </Grid>
          <Grid item xs={5.5}>
            <Banner />
          </Grid>
        </div>
        <RestaurantsVertical data={otherRestaurants} title="Outros restaurantes" />
      </Grid>
    </main>
  );
}
