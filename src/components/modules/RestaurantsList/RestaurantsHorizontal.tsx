import { Grid } from "@mui/material";

import { RestaurantCard } from "@portal/components/elements/RestaurantCard/RestaurantCard";

interface RestaurantsHorizontalProps {
  data: IRestaurants.IRestaurant[];
  title: string;
  titleColor?: string;
  className?: string;
}

export const RestaurantsHorizontal = (props: RestaurantsHorizontalProps) => (
  <section className={`restaurants-horizontal w-full mt-10 flex flex-col ${props.className}`}>
    <h2
      className="text-xl bold pd-sides"
      style={{
        color: props.titleColor ?? "white",
      }}>
      {props.title}
    </h2>
    <div className="flex-row overflow-y-hidden overflow-x-scroll pd-sides py-6">
      {props.data.map((item, index) => (
        <Grid marginLeft={3} key={index}>
          <div className="w-72">
            <RestaurantCard
              name={item.name}
              description={item.description}
              backgroundUrl={item.backgroundUrl ?? ""}
              iconUrl={item.logoUrl ?? ""}
            />
          </div>
        </Grid>
      ))}
    </div>
  </section>
);
