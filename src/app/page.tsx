"use client";
/* eslint-disable @next/next/no-img-element */
import { Grid } from "@mui/material";
import { $Enums } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { Banner, BannerList, RestaurantsHorizontal, RestaurantsVertical } from "@portal/components";
import { promotionsApi } from "@portal/service/promotions.spi";
import { restaurantsApi } from "@portal/service/restaurants.api";
import usePromotionsStore from "@portal/store/promotions.store";
import useRestaurantsStore from "@portal/store/restaurants.store";

export default function Home() {
  const { restaurantList, setRestaurantFilteredList, setRestaurantList } = useRestaurantsStore(
    (state) => state
  );
  const { promotionsList, setPromotionsList } = usePromotionsStore((state) => state);
  const newRestaurants = useMemo(
    () => restaurantList.filter((restaurant) => restaurant.category === $Enums.Category.NEW),
    [restaurantList]
  );
  const otherRestaurants = useMemo(
    () => restaurantList.filter((restaurant) => restaurant.category !== $Enums.Category.NEW),
    [restaurantList]
  );
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      const restaurants = await restaurantsApi.list();
      const promotions = await promotionsApi.list();
      setRestaurantList(restaurants);
      setPromotionsList(promotions);
      setRestaurantFilteredList(restaurants);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  return (
    <Grid container>
      <img src="/ic_background.svg" className="cover-icon" alt="logo" />
      <RestaurantsHorizontal
        loading={loading}
        className="mt-14"
        data={newRestaurants}
        title={t("UTILS.TITLES.NEWS")}
      />
      <BannerList data={promotionsList} loading={loading} />
      <div className={"bottom-pd w-full"}>
        <RestaurantsVertical
          loading={loading}
          data={otherRestaurants}
          title={t("UTILS.TITLES.ANOTHER_RESTAURANTS")}
        />
      </div>
    </Grid>
  );
}
