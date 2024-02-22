"use client";

import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { RestaurantsVertical } from "@portal/components";
import { restaurantsApi } from "@portal/service/restaurants.api";
import useRestaurantsStore from "@portal/store/restaurants.store";

const FavoritePage = () => {
  const { setRestaurantFavorites, restaurantsFavorites } = useRestaurantsStore((state) => state);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const data = await restaurantsApi.listFavorites();
      setRestaurantFavorites(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div>
      <Grid container>
        <img src="/ic_background.svg" className="cover-icon" alt="logo" />
        {loading || restaurantsFavorites.length > 0 ? (
          <div className={"bottom-pd w-full z-10 mt-2"}>
            <RestaurantsVertical
              titleColor="#FFF"
              loading={loading}
              data={restaurantsFavorites}
              title={t("UTILS.TITLES.FAVORITES")}
            />
          </div>
        ) : (
          <section className="w-full flex items-center flex-col z-10">
            <div className="info-container bottom-pd">
              <h1 className="mb-16 text-xl text-center bold text-white">
                {t("PAGES.FAVORITES.EMPTY")}
              </h1>
              <img src="/ic_empty-favs.svg" className="mb-16" alt="logo" />
            </div>
          </section>
        )}
      </Grid>
    </div>
  );
};

export default FavoritePage;
