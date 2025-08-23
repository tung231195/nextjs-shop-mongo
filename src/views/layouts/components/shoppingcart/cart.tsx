import { Button, Checkbox} from "@mui/material";
import { Avatar, Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItemsStoreData } from "src/helpers/storage";
import { useAuth } from "src/hooks/useAuth";
import { AppDispatch, RootState } from "src/stores";
import { updateToCartAction } from "src/stores/shoppingcart";

const ListCart = () => {

  //**state */
  const [checkItems, setCheckItems] = useState<string[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { cartItems } = useSelector((state: RootState) => state.cartSlide);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const { user } = useAuth();
  const userId = user?._id;
  const router = useRouter();
  useEffect(() => {
    const listCarts = getCartItemsStoreData();
    const parseCartData = JSON.parse(listCarts.cartItems as string);
    if (userId) {
      dispatch(
        updateToCartAction({ carts: parseCartData[userId], userId: userId })
      );
    }
  }, []);
  const totalPrices = useMemo(() => {
    const totalPrice = cartItems.reduce((total, cartItem) => {
      const discount = (cartItem.discount / 100) * cartItem.price;

      return total + cartItem.amount * (cartItem.price - discount);
    }, 0);

    return totalPrice;
  }, [cartItems]);

    const totalPricesOrder = useMemo(() => {
    const totalPrice = cartItems.reduce((total, item) => {
      if(checkItems.includes(item.product)) {
        const discount = (item.discount / 100) * item.price;

        return total + item.amount * (item.price - discount);
      }

      return total

    }, 0);

    return totalPrice;
  }, [checkItems]);


  //** */
  const handleActionCart = (action: string, _id: string) => {
    const cloneCartITems = [...cartItems];
    let newItems = [];
    if (action == "increase") {
      newItems = cloneCartITems.map((item) => {
        if (item.product == _id) {

          return { ...item, amount: item.amount + 1 };
        } else {

          return { ...item };
        }
      });
    } else {
      newItems = cloneCartITems.map((item) => {
        if (item.amount > 0 && item.product == _id) {

          return { ...item, amount: item.amount - 1 };
        } else {

          return { ...item };
        }
      });
    }
    dispatch(updateToCartAction({ carts: newItems }));
  };
  const hanldCheckItem = (e: any) => {
    const value = e.target.value;
    if (checkItems.includes(value)) {
      setCheckItems((prevState) => prevState.filter((item) => item !== value));
    } else {
      setCheckItems([...checkItems, value]);
    }
  };

  const handleCheckAllItem = () => {
    //setIsCheckAll(!isCheckAll)
    //setCheckALl(e.target.checked);
    const checkAllValue = cartItems.map((item) => {

      return item.product;
    });
    if (isCheckAll) {
      setCheckItems([]);
    } else {
      setCheckItems(checkAllValue);
    }
  };

  const handleCheckout = () => {

    router.push({
        pathname:'/checkout',
        query: { orderItems:JSON.stringify(checkItems), totalPricesOrder},
      },
      'checkout'
    )
  };

  useEffect(() => {
    if (
      cartItems.length &&
      cartItems.every((cart) => checkItems.includes(cart.product))
    ) {
      setIsCheckAll(true);
    } else {
      setIsCheckAll(false);
    }
  }, [checkItems]);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", width: "100%" }}>
          <Box sx={{ width: "5%" }}>
            <Checkbox onClick={handleCheckAllItem} checked={isCheckAll} />
          </Box>
          <Box sx={{ width: "5%" }}>
            <Typography>Image</Typography>
          </Box>
          <Box sx={{ width: "20%" }}>
            <Typography>Name</Typography>
          </Box>
          <Box sx={{ width: "20%" }}>
            <Typography>Amount</Typography>
          </Box>
          <Box sx={{ width: "20%" }}>
            <Typography>Price</Typography>
          </Box>
          <Box sx={{ width: "20%" }}>
            <Typography>Action</Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {cartItems ? (
          cartItems.map((item) => {
            const isCheck = checkItems.includes(item.product);

            return (
              <Box key={item.product} sx={{ display: "flex", width: "100%" }}>
                <Box sx={{ width: "5%" }}>
                  <Checkbox
                    checked={isCheck}
                    value={item.product}
                    onClick={hanldCheckItem}
                  />
                </Box>
                <Box sx={{ width: "5%" }}>
                  <Avatar src={`data:image/png;base64,${item.image}`} />
                </Box>
                <Box sx={{ width: "20%" }}>
                  <Typography>{item.name}</Typography>
                </Box>
                <Box sx={{ width: "20%" }}>
                  <Typography>{item.amount}</Typography>
                </Box>
                <Box sx={{ width: "20%" }}>
                  <Typography>{item.price}</Typography>
                </Box>
                <Box sx={{ width: "20%" }}>
                  <Button
                    onClick={() => handleActionCart("increase", item.product)}
                  >
                    +
                  </Button>
                  <Button>{item.amount}</Button>
                  <Button
                    onClick={() => handleActionCart("deascrea", item.product)}
                  >
                    -
                  </Button>
                </Box>
              </Box>
            );
          })
        ) : (
          <Box>{"NO ITEM IN CART"}</Box>
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Typography>Grand: {totalPrices}</Typography>
          <Typography>Total Price checked: {totalPricesOrder}</Typography>
          <Button onClick={handleCheckout}>Check out</Button>
        </Box>
      </Box>
    </>
  );
};

export default ListCart;
