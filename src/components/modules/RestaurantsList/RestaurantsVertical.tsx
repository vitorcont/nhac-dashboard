import { Grid } from "@mui/material";

import { RestaurantCard } from "@portal/components/elements/RestaurantCard/RestaurantCard";

interface RestaurantsVerticalProps {
  data: IRestaurants.IRestaurant[];
  title: string;
  titleColor?: string;
  className?: string;
}

export const RestaurantsVertical = (props: RestaurantsVerticalProps) => (
  <section className={`restaurants-vertical ${props.className}`}>
    <h2
      className="text-xl bold pd-sides"
      style={{
        color: props.titleColor ?? "#787878",
      }}>
      {props.title}
    </h2>
    <Grid container spacing={3} className="pd-sides w-full flex flex-row overflow-hidden py-6">
      {props.data.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={index}>
          <RestaurantCard {...item} />
        </Grid>
      ))}
    </Grid>
  </section>
);
