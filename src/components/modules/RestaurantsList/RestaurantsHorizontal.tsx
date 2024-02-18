import { Grid } from "@mui/material";

import { RestaurantCard } from "@portal/components/elements/RestaurantCard/RestaurantCard";

interface RestaurantsHorizontalProps {
  data: IItems.IItem[];
  title: string;
  titleColor?: string;
  className?: string;
}

export const RestaurantsHorizontal = (props: RestaurantsHorizontalProps) => (
  <section className={`restaurants-horizontal w-full mt-10 flex flex-col ${props.className}`}>
    <h2
      className="text-xl bold ml-24"
      style={{
        color: props.titleColor ?? "white",
      }}>
      {props.title}
    </h2>
    <div className="flex-row overflow-y-hidden overflow-x-scroll px-24 py-6">
      {[1, 2, 3, 4, 5, 6].map((__unused, index) => (
        <Grid marginLeft={3} key={index}>
          <div className="w-72">
            <RestaurantCard
              name="Marmitaria e Cia"
              description="Comida caseira e saudável"
              backgroundUrl="https://cdn.vox-cdn.com/thumbor/5d_RtADj8ncnVqh-afV3mU-XQv0=/0x0:1600x1067/1200x900/filters:focal(672x406:928x662)/cdn.vox-cdn.com/uploads/chorus_image/image/57698831/51951042270_78ea1e8590_h.7.jpg"
              iconUrl="https://cdn.vox-cdn.com/thumbor/5d_RtADj8ncnVqh-afV3mU-XQv0=/0x0:1600x1067/1200x900/filters:focal(672x406:928x662)/cdn.vox-cdn.com/uploads/chorus_image/image/57698831/51951042270_78ea1e8590_h.7.jpg"
            />
          </div>
        </Grid>
      ))}
    </div>
  </section>
);
