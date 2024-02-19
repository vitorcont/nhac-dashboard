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
export default function Restauranttails() {
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
  const findDetails = async () => {
    try {
      const data = await restaurantsApi.list();
      setRestaurantList(data);
      setRestaurantFilteredList(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    findDetails();
  }, []);

  return (
    <Grid container>
      <section className="pd-sides w-full">
        <div className="restaurant-details__background">
          <div className="restaurant-details__background__icon">
            <img
              className="restaurant-details__background__icon__image"
              src={
                "https://s2-oglobo.glbimg.com/MD1_gg8cx1FgBBx_ZIKBSci1YPA=/0x0:1361x907/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2023/5/B/5cdNh1RqeRocBOLQRs2g/adega-santiago-ambiente-credito-rodrigo-azevedo-8-1-.jpg"
              }
              alt={""}
            />
          </div>
          <img
            src="https://s2-oglobo.glbimg.com/MD1_gg8cx1FgBBx_ZIKBSci1YPA=/0x0:1361x907/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2023/5/B/5cdNh1RqeRocBOLQRs2g/adega-santiago-ambiente-credito-rodrigo-azevedo-8-1-.jpg"
            className="w-full h-full object-cover"></img>
        </div>
      </section>
      <section className=" mt-8 pd-sides w-full">
        <div className="restaurant-details__details">
          <Grid item xs={6}>
            <h1 className="text-3xl semi-bold text-secundary">Adega Santiago</h1>
            <p className="mt-2">
              O restaurante Adega Santiago é um dos mais tradicionais de São Paulo, com um ambiente
              agradável e uma culinária de dar água na boca.
            </p>
          </Grid>
          <Grid item xs={4} className="flex flex-row">
            <div className="h-full w-[10px] mx-3 bg-primary rounded-xl"></div>
            <div>
              <p className="mt-2">O restaurante Adega Santiago é um dos mais tradici</p>
            </div>
          </Grid>
        </div>
      </section>
    </Grid>
  );
}
