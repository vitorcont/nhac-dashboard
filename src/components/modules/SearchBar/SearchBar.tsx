"use client";

import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

import { DefaultAutocomplete } from "@portal/components/elements/DefaultAutocomplete/DefaultAutocomplete";
import { restaurantsApi } from "@portal/service/restaurants.api";
import useRestaurantsStore from "@portal/store/restaurants.store";

export const SearchBar = () => {
  const { restaurantFilteredList, restaurantList, setRestaurantFilteredList } = useRestaurantsStore(
    (state) => state
  );

  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  const onChange = (searchedText: string) => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    if (!searchedText) {
      console.log("reset");
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
      InputProps={{
        startAdornment: <SearchIcon className="ml-2" fontSize="medium" color="primary" />,
      }}
      noOptionsText="Nenhum restaurante encontrado..."
      renderOption={(props, option: IRestaurants.IRestaurant) => (
        <div {...(props as any)}>
          <img className="item-icon" src={option.logoUrl} />
          <p className="ml-2">{option.name}</p>
        </div>
      )}
      size="small"
      placeholder="Buscar restaurantes..."
      onChangeText={(value) => {
        onChange(value);
      }}
    />
  );
};
