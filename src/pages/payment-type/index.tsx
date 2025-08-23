import { NextPage } from "next/types";
import PaymentTypePage from "src/views/pages/payment-type";

export interface TPropsPaymentType {

}
const MANAGE_PaymentType:NextPage<TPropsPaymentType> = () => {
  
 return (
  <PaymentTypePage />
 )
}

export default MANAGE_PaymentType