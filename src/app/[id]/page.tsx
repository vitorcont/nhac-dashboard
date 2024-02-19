"use client";
/* eslint-disable @next/next/no-img-element */
import LanguageIcon from "@mui/icons-material/Language";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import RoomIcon from "@mui/icons-material/Room";
import { Grid } from "@mui/material";
import { $Enums } from "@prisma/client";
import { useEffect, useMemo } from "react";

import { ItemList } from "@portal/components/modules/ItemList/ItemList";
import { RestaurantsHorizontal } from "@portal/components/modules/RestaurantsList/RestaurantsHorizontal";
import { restaurantsApi } from "@portal/service/restaurants.api";
import useRestaurantsStore from "@portal/store/restaurants.store";
export default function Restauranttails() {
  const { restaurantList, setRestaurantFilteredList, setRestaurantList } = useRestaurantsStore(
    (state) => state
  );

  const info = {
    address: {
      icon: <RoomIcon color="primary" />,
      text: "Rua Sampaio Vidal, 1072 - Jardim Paulistano, São Paulo - SP, 01434-001",
    },
    phone: {
      icon: <LocalPhoneIcon color="primary" />,
      text: "(11) 3081-5211",
    },
  };

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
    <Grid container flexDirection="column" alignItems={"flex-end"} justifyContent={"space-between"}>
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
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <h1 className="text-3xl semi-bold text-secundary">Adega Santiago</h1>
            <p className="mt-2">
              O restaurante Adega Santiago é um dos mais tradicionais de São Paulo, com um ambiente
              agradável e uma culinária de dar água na boca.
            </p>
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
              <span className="flex-row mt-2">
                <>{info.address.icon}</>
                <a
                  className="ml-2 underline"
                  href={`https://www.google.com/maps/search/?q=${encodeURI(info.address.text)}`}>
                  {info.address.text}
                </a>
              </span>
              <span className="flex-row mt-2">
                <>{info.phone.icon}</>
                <p className="ml-2">{info.phone.text}</p>
              </span>
            </div>
          </Grid>
        </div>
      </section>
      <ItemList
        className="overflow-hidden "
        title="Cardápio"
        data={[
          {
            id: "1",
            name: "Item 1",
            price: 10.99,
            description: "Lorem ipsum dolor sit amet,  nunc ac nunc.'",
            restaurantId: "1234",
            imageUrl: "https://via.placeholder.com/150",
          },
          {
            id: "1",
            name: "Item 1",
            price: 10.99,
            description: "Lorem ipsum dolor sit amet,  nunc ac nunc.'",
            restaurantId: "1234",
            imageUrl: "https://via.placeholder.com/150",
          },
          {
            id: "1",
            name: "Item 1",
            price: 10.99,
            description: "Lorem ipsum dolor sit amet,  nunc ac nunc.'",
            restaurantId: "1234",
            imageUrl: "https://via.placeholder.com/150",
          },
          {
            id: "1",
            name: "Item 1",
            price: 10.99,
            description: "Lorem ipsum dolor sit amet,  nunc ac nunc.'",
            restaurantId: "1234",
            imageUrl: "https://via.placeholder.com/150",
          },
          {
            id: "1",
            name: "Item 1",
            price: 10.99,
            description: "Lorem ipsum dolor sit amet,  nunc ac nunc.'",
            restaurantId: "1234",
            imageUrl: "https://via.placeholder.com/150",
          },
          {
            id: "1",
            name: "Item 1",
            price: 10.99,
            description: "Lorem ipsum dolor sit amet,  nunc ac nunc.'",
            restaurantId: "1234",
            imageUrl: "https://via.placeholder.com/150",
          },
          {
            id: "1",
            name: "Item 1",
            price: 10.99,
            description: "Lorem ipsum dolor sit amet,  nunc ac nunc.'",
            restaurantId: "1234",
            imageUrl: "https://via.placeholder.com/150",
          },
        ]}
      />
      <section className="w-full bg-primary pb-4 ">
        <RestaurantsHorizontal data={restaurantList} title="Outras opções" />
      </section>
    </Grid>
  );
}
