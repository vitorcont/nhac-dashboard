"use client";

import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { DefaultAutocomplete } from "@portal/components";
import { restaurantsApi } from "@portal/service/restaurants.api";
import useRestaurantsStore from "@portal/store/restaurants.store";

export const SearchBar = () => {
  const { restaurantFilteredList, restaurantList, setRestaurantFilteredList } = useRestaurantsStore(
    (state) => state
  );
  const { t } = useTranslation();
  const router = useRouter();

  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  const onChange = (searchedText: string) => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    if (!searchedText) {
      setRestaurantFilteredList(restaurantList);
      return;
    }

    const newTimeout = setTimeout(() => {
      handleSearch(searchedText);
    }, 2000);

    setTypingTimeout(newTimeout);
  };

  const handleSearch = async (value: string) => {
    try {
      const data = await restaurantsApi.list(value);
      setRestaurantFilteredList(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DefaultAutocomplete
      options={restaurantFilteredList}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      inputprops={{
        startAdornment: <SearchIcon className="ml-2" fontSize="medium" color="primary" />,
      }}
      noOptionsText={t("UTILS.TITLES.NO_OPTIONS")}
      renderOption={(props, option: IRestaurants.IRestaurant) => (
        <div {...(props as any)}>
          <img className="item-icon" src={option.logoUrl} />
          <p className="ml-2">{option.name}</p>
        </div>
      )}
      size="small"
      onChange={(event, value) => {
        if (!value) return;
        router.push(`/details/${value.id}`);
      }}
      placeholder={t("UTILS.BUTTONS.SEARCH_RESTAURANTS")}
      onChangeText={(value) => {
        onChange(value);
      }}
    />
  );
};
