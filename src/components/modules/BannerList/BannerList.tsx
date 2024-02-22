import { Grid, Skeleton } from "@mui/material";

import { Banner } from "@portal/components";

interface BannerListProps {
  data: IPromotions.IPromotion[];
  loading?: boolean;
}

export const BannerList = (props: BannerListProps) => (
  <div className="w-full flex flex-row justify-between pd-sides">
    {props.loading ? (
      <Grid item xs={12}>
        <Skeleton variant="rounded" width={"100%"} height={320} />
      </Grid>
    ) : (
      props.data.length > 0 &&
      props.data.map((item, index) => (
        <Grid key={index} item xs={props.data.length > 1 ? 5.9 : 12}>
          <Banner {...item} />
        </Grid>
      ))
    )}
  </div>
);
