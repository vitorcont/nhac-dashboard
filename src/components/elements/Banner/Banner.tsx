export interface BannerProps {}

export const Banner = (props: BannerProps) => (
  <div className="banner">
    <img
      className="banner__img"
      src="https://cdn.vox-cdn.com/thumbor/5d_RtADj8ncnVqh-afV3mU-XQv0=/0x0:1600x1067/1200x900/filters:focal(672x406:928x662)/cdn.vox-cdn.com/uploads/chorus_image/image/57698831/51951042270_78ea1e8590_h.7.jpg"
      alt=""
    />
    <div className="px-4 mb-6 z-10">
      <h1 className="text-lg text-white bold">Promoção!</h1>
      <p className="text-white ">sadjn sadjksa asndjasd nsajdk asndjjsad</p>
    </div>
  </div>
);
