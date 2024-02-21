"use client";
/* eslint-disable @next/next/no-img-element */
import { Grid } from "@mui/material";
import { $Enums } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";

import { Banner, RestaurantsHorizontal, RestaurantsVertical } from "@portal/components";
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
  const [loading, setLoading] = useState(false);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const data = await restaurantsApi.list();
      setRestaurantList(data);
      setRestaurantFilteredList(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <Grid container>
      <img src="/ic_background.svg" className="cover-icon" alt="logo" />
      <RestaurantsHorizontal
        loading={loading}
        className="mt-14"
        data={newRestaurants}
        title="Novidades!"
      />
      <div className="w-full flex flex-row justify-between pd-sides">
        <Grid item xs={5.9}>
          <Banner />
        </Grid>
        <Grid item xs={5.9}>
          <Banner />
        </Grid>
      </div>
      <div className={"bottom-pd w-full"}>
        <RestaurantsVertical
          loading={loading}
          data={otherRestaurants}
          title="Outros restaurantes"
        />
      </div>
    </Grid>
  );
}
