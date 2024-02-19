import { Grid } from "@mui/material";

import { ItemCard } from "@portal/components/elements/ItemCard/ItemCard";

interface ItemListProps {
  data: IItems.IItem[];
  title: string;
  titleColor?: string;
  className?: string;
}

export const ItemList = (props: ItemListProps) => (
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
        <Grid item xs={6} sm={6} md={4} lg={3} xl={3} key={index}>
          <ItemCard
            name={item.name}
            description={item.description}
            imageUrl={item.imageUrl ?? ""}
            price={`${item.price}`}
          />
        </Grid>
      ))}
    </Grid>
  </section>
);
