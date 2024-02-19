export const formatAddress = (address: IRestaurants.IAddress) =>
  `${address?.street}, ${address?.number} - ${address?.neighborhood}, ${address?.city} - ${address?.state}, ${address?.zipcode}`;

export const formatPhone = (phone: string) =>
  phone.replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3");
