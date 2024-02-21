import { Grid, Skeleton, Theme, useMediaQuery } from "@mui/material";

import { ItemCard } from "@portal/components/elements/ItemCard/ItemCard";

interface ItemListProps {
  data: IItems.IItem[];
  title: string;
  titleColor?: string;
  className?: string;
  loading?: boolean;
}

export const ItemList = (props: ItemListProps) => {
  const downMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  return (
    <section className={`restaurants-vertical ${props.className}`}>
      <h2
        className="text-xl bold pd-sides"
        style={{
          color: props.titleColor ?? "#787878",
        }}>
        {props.title}
      </h2>
      <Grid container spacing={3} className="pd-sides w-full flex flex-row overflow-hidden py-6">
        {props.loading
          ? Array.from({ length: downMd ? 6 : 8 }).map((__, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={index}>
                <Skeleton variant="rounded" width={"100%"} height={230} />
              </Grid>
            ))
          : props.data.map((item, index) => (
              <Grid item xs={6} sm={6} md={4} lg={3} xl={3} key={index}>
                <ItemCard {...item} />
              </Grid>
            ))}
      </Grid>
    </section>
  );
};
