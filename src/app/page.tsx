/* eslint-disable @next/next/no-img-element */
import { Grid } from "@mui/material";

import { RestaurantCard } from "@portal/components/elements/RestaurantCard/RestaurantCard";
export default function Home() {
  return (
    <main>
      <Grid container spacing={2}>
        <section className="flex-row overflow-y-scroll">
          {[1, 2, 3, 4, 5, 6].map((__unused, index) => (
            <Grid marginLeft={2} key={index} item xs={12} md={12} lg={12}>
              <div className="w-96">
                <RestaurantCard
                  name="Marmitaria e Cia"
                  description="Comida caseira e saudável"
                  backgroundUrl="https://cdn.vox-cdn.com/thumbor/5d_RtADj8ncnVqh-afV3mU-XQv0=/0x0:1600x1067/1200x900/filters:focal(672x406:928x662)/cdn.vox-cdn.com/uploads/chorus_image/image/57698831/51951042270_78ea1e8590_h.7.jpg"
                  iconUrl="https://cdn.vox-cdn.com/thumbor/5d_RtADj8ncnVqh-afV3mU-XQv0=/0x0:1600x1067/1200x900/filters:focal(672x406:928x662)/cdn.vox-cdn.com/uploads/chorus_image/image/57698831/51951042270_78ea1e8590_h.7.jpg"
                />
              </div>
            </Grid>
          ))}
        </section>
      </Grid>
    </main>
  );
}
