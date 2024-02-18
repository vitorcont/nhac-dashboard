/* eslint-disable @next/next/no-img-element */
import { Grid } from "@mui/material";

import { RestaurantsHorizontal } from "@portal/components/modules/RestaurantsList/RestaurantsHorizontal";
import { RestaurantsVertical } from "@portal/components/modules/RestaurantsList/RestaurantsVertical";
export default function Home() {
  return (
    <main>
      <Grid container>
        <img src="/ic_background.svg" className="cover-icon" alt="logo" />
        <RestaurantsHorizontal className="mt-14" data={[]} title="Novidades!" />
        <RestaurantsVertical data={[]} title="Outros restaurantes" />
      </Grid>
    </main>
  );
}
