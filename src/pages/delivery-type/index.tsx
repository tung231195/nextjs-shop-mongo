import { NextPage } from "next/types";
import DeliveryTypePage from "src/views/pages/delivery-type";

export interface TPropsDeliveryType {

}
const MANAGE_DeliveryType:NextPage<TPropsDeliveryType> = () => {
  
 return (
  <DeliveryTypePage />
 )
}

export default MANAGE_DeliveryType