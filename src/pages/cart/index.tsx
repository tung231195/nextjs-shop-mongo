import { ReactNode } from "react"
import { getCartItemsStoreData } from "src/helpers/storage"
import ListCart from "src/views/layouts/components/shoppingcart/cart"
import DefaultLayout from "src/views/layouts/DefaultLayout"

const Shoppingcart = () => {

  return (
    <><ListCart /></>
  )
}
export default Shoppingcart
Shoppingcart.getLayout =  (page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>