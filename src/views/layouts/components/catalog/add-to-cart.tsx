import { Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { CartItem } from "src/configs/@type/shopping-cart"
import { useAuth } from "src/hooks/useAuth"
import { RootState } from "src/stores"
import { updateToCartAction } from "src/stores/shoppingcart"
interface TPropsAddTocart {
  item:CartItem
}
const AddToCartFunc = (props:TPropsAddTocart) => {
  const {item} = props
  const cartItem:CartItem = {
      product:item.product,
      name:item.name,
      image:item.image,
      price:item.price,
      discount:item.discount,
      amount:1
  }
  /** dispatch */
  const dispatch = useDispatch();
  const cartItems = useSelector((state:RootState) => state.cartSlide.cartItems);
  //**auth*/
  const {user} = useAuth()

  const hanleAddTocart = () => {
    let cloneCartItems = [...cartItems]
    const index = cloneCartItems.findIndex((citem) => citem .product == cartItem.product)
    if(index != -1) {
        cloneCartItems = cloneCartItems.map((cart) => {
          return cart.product == cartItem.product ? {...cart,amount:cart.amount + 1} : cart
        })
    } else {
      cloneCartItems = [...cloneCartItems,cartItem]
    }
    //  const {totalItem,totalPrice} = updateCartAction(cloneCartItems)
    if(user) {
      dispatch(updateToCartAction({carts:cloneCartItems,userId:user._id}))
    } else {
         //   dispatch(updateToCartAction({carts:cloneCartItems,userId:"guesidstring"}))
    }
  }
  return (
    <Button size="small" onClick={hanleAddTocart}>Add To Cart</Button>
  )
}

export default AddToCartFunc