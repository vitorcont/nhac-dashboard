import { Grid, Skeleton } from "@mui/material";

import { RestaurantCard } from "@portal/components/elements/RestaurantCard/RestaurantCard";

interface RestaurantsHorizontalProps {
  data: IRestaurants.IRestaurant[];
  title: string;
  titleColor?: string;
  className?: string;
  loading?: boolean;
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
      <>
        {props.loading
          ? Array.from({ length: 5 }).map((__, index) => (
              <Grid marginLeft={3} key={index}>
                <div className="w-72">
                  <Skeleton variant="rounded" width={"100%"} height={200} />
                </div>
              </Grid>
            ))
          : props.data.map((item, index) => (
              <Grid marginLeft={3} key={index}>
                <div className="w-72">
                  <RestaurantCard {...item} />
                </div>
              </Grid>
            ))}
      </>
    </div>
  </section>
);
