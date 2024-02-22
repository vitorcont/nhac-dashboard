import { useRouter } from "next/navigation";

export interface BannerProps {}

export const Banner = (props: IPromotions.IPromotion) => {
  const router = useRouter();

  return (
    <div className="banner" onClick={() => router.push(`/details/${props.restaurantId}`)}>
      <img className="banner__img" src={props.imageUrl} alt="" />
      <div className="px-4 mb-6 z-10">
        <h1 className="text-lg text-white bold">{props.title}</h1>
        <p className="text-white ">{props.description}</p>
      </div>
    </div>
  );
};
