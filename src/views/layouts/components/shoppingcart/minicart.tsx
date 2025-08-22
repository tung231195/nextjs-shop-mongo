import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/stores";
import {
  removeCartAction,
  updateCartAction,
} from "src/stores/shoppingcart/shopping-cart-action";
import { updateToCartAction } from "src/stores/shoppingcart";
import { getCartItemsStoreData } from "src/helpers/storage";
import { useAuth } from "src/hooks/useAuth";
import { useRouter } from "next/router";
const MiniCart = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: RootState) => state.cartSlide);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handRemoveItem = (itemId: string) => {
    let listCart = cartItems.filter((item) => item._id != itemId);
    const { cloneCartItems, totalItem, totalPrice } =
      updateCartAction(listCart);
    dispatch(
      updateToCartAction({
        carts: cloneCartItems,
        totalItem: totalItem,
        totalPrice,
      })
    );
  };

  //router 
  const router = useRouter();

  // const {totalItem}  = useSelector((state:RootState) => state.cartSlide)
  const totalItemMemo = React.useMemo(() => {
    const totalItem = cartItems.reduce(
      (total, currentValue) => total + currentValue.amount,
      0
    );
    return totalItem;
  }, [cartItems]);

  const totalPriceMemo = React.useMemo(() => {
    const totalPrice = cartItems.reduce((total, cartItem) => {
      let discount = (cartItem.discount / 100) * cartItem.price;
      return total + cartItem.amount * (cartItem.price - discount);
    }, 0);
    return totalPrice;
  }, [cartItems]);
  const {user} = useAuth()
    const userId = user?._id;
    //effect 
    React.useEffect(() => {
      console.log('run to cart')
      let CartItemsStore = getCartItemsStoreData();
      let parseCartItemsStore = JSON.parse(CartItemsStore.cartItems as string) ?? []
      console.log('aaaaaaaaaaaaaaaaaaaaa a',userId,parseCartItemsStore)
         if(userId) {
              dispatch(updateToCartAction({carts:parseCartItemsStore[userId],userId:userId}))
         }else {
         // dispatch(updateToCartAction({carts:parseCartItemsStore[userId],userId:"guesidstring"}))
         }
    },[userId])

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Box>
              <Icon icon="lineicons:cart-1" width="24" height="24" />
              <Typography sx={{ color: "red" }}>{totalItemMemo}</Typography>
            </Box>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={handleClose}
          sx={{ display: "flex", flexDirection: "column", width: 300 }}
        >
          {cartItems &&
            cartItems.map((item) => {
              return (
                <Box key={item._id} sx={{ display: "flex" }}>
                  <Avatar src={`data:image/png;base64,${item.image}`} />
                  <Box>
                    <Typography>{item.name}</Typography>
                    <Typography>{item.amount}</Typography>
                    <Typography>{item.price}</Typography>
                  </Box>
                  <Box>
                    <Icon
                      icon="mdi:remove"
                      onClick={() => handRemoveItem(item._id)}
                    />
                  </Box>
                </Box>
              );
            })}
          <Box>
            <Typography variant="h5">Total Price: {totalPriceMemo}</Typography>
          </Box>
          <Box>
            <Button onClick={() => router.push('/cart')}>Checkout</Button>
          </Box>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default MiniCart;
