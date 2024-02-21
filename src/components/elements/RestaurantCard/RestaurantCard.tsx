import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
export interface RestaurantCardProps {
  iconUrl: string;
  backgroundUrl: string;
  name: string;
  description?: string;
}

export const RestaurantCard = (props: IRestaurants.IRestaurant) => (
  <Link href={`/details/${props.id}`}>
    <div className="restaurant-card">
      <div className="relative flex">
        <div className="restaurant-card__icon">
          <img className="restaurant-card__icon__image" src={props.logoUrl} alt={props.name} />
        </div>
        <img
          className="restaurant-card__background-img"
          src={props.backgroundUrl}
          alt={props.name}
        />
      </div>
      <div className="px-4 py-3">
        <p className="bold">{props.name}</p>
        <p className="restaurant-card__description">{props.description}</p>
      </div>
    </div>
  </Link>
);
