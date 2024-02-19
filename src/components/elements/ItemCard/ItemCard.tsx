/* eslint-disable @next/next/no-img-element */
export interface ItemCardProps {
  imageUrl: string;
  name: string;
  description?: string;
  price?: string;
}

export const ItemCard = (props: IItems.IItem) => (
  <div className="item-card">
    <div className="relative flex">
      <img className="item-card__background-img" src={props.imageUrl} alt={props.name} />
    </div>
    <div className="px-4 py-3">
      <p className="bold">{props.name}</p>
      <p>{props.description}</p>
      <p className="mt-2 semi-bold">{`R$ ${props.price}`}</p>
    </div>
  </div>
);
