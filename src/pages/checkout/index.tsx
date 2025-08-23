import { Icon } from "@iconify/react/dist/iconify.js";
import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { Button, FormControl, Grid } from "@mui/material";
import { Avatar, Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "src/components/modal";
import CustomTextField from "src/components/text-field";
import { ProductItem } from "src/configs/@type/checkout";
import { PaymentTypeDataType } from "src/configs/@type/payment-type";
import { getCartItemsStoreData } from "src/helpers/storage";
import { useAuth } from "src/hooks/useAuth";
import { AppDispatch, RootState } from "src/stores";
import { createOrderAction } from "src/stores/checkout/checkout-action";
import { getAllDeliveryTypeAction } from "src/stores/delivery-type/deliveryTypeAction";
import { getAllPaymentTypeAction } from "src/stores/payment-type/paymentTypeAction";
import EditAddressForm from "src/views/layouts/components/checkout/EditAddressForm";
import EditDeliveryMethod from "src/views/layouts/components/checkout/EditDeliveryMethod";
import NewEditAdressForm from "src/views/layouts/components/checkout/NewEditAdressForm";
import DefaultLayout from "src/views/layouts/DefaultLayout";

const CheckoutPage = () => {
  //**state */
  const [listItem, setListItems] = useState<ProductItem[]>([]);

  //const [delivery, setDelivery] = useState("");
  const [payment, setPayment] = useState<PaymentTypeDataType>();
  const [showPayments, setShowPayments] = useState(false);
  const [openModalDelivery, setOpenModalDelivery] = useState(false);
  const [openModalAdress, setOpenModalAdress] = useState(false);
  const [openModalNewEditAdress, setOpenModalNewEditAdress] = useState({
    open: false,
    _id: "",
  });

  //** router */
  const router = useRouter();

  //** dispatch */
  const dispatch = useDispatch<AppDispatch>();
  const deliveryMethodSelected = useSelector(
    (state: RootState) => state.checkoutSlide.deliveryMethod
  );
  const deliveryOptions = useSelector(
    (state: RootState) => state.deliverySlide.deliveries
  );
  const carts = getCartItemsStoreData();
  const { user } = useAuth();
  let objCarts = [];
  try {
    objCarts = JSON.parse(carts.cartItems as string);
  } catch (e) {
    console.log("missing", e);
  }

  const { orderItems, totalPricesOrder } = router.query;
  console.log("ttttttttttt", orderItems, totalPricesOrder);
  const paymentList = useSelector(
    (state: RootState) => state.paymentSlide.payments
  );
  let orderObjItems = [];

  useEffect(() => {
    if (user && user._id) {
      orderObjItems = objCarts && objCarts[user?._id];
      const orders = orderObjItems.filter((item: ProductItem) =>
        orderItems?.includes(item.product)
      );
      console.log("router", orderObjItems, orders);
      setListItems(orders);
    }
  }, [user, orderItems]);
  useEffect(() => {
    dispatch(getAllPaymentTypeAction({ page: -1, limit: -1 }));
  }, []);

  const params = { limit: -1, page: -1 };
  useEffect(() => {
    dispatch(getAllDeliveryTypeAction(params));
  }, []);

  //**hanlde checkout */
  const handlAddNewAddress = () => {
    setOpenModalAdress(false);
    setOpenModalNewEditAdress({ open: true, _id: "" });
  };
  const handleBackAdress = () => {
    setOpenModalAdress(true);
    setOpenModalNewEditAdress({ open: false, _id: "" });
  };
  const handleOrderSubmit = () => {
    const orderData = {
      orderItems: listItem,
      paymentMethod: payment,
      itemsPrice: totalPricesOrder,
      shippingPrice: 0,
      totalPrice: totalPricesOrder,
      fullName: user?.email,
      address: "xom 6 ha noi",
      city: { name: "ha noi", _id: "6892c650927fedf0baa21633" },
      phone: "098988888888",
      user: user,
      isPaid: 0,
      paidAt: new Date(),
      email: user?.email,
      deliveryMethod: deliveryMethodSelected,
    };
    dispatch(createOrderAction(orderData));
    toast.success("checkout successfull");
    console.log("submit order", orderData);
  };
  const hanldeUpdateAdress = (e: any, id: string) => {
    console.log("is edit", id);
    setOpenModalNewEditAdress({ open: true, _id: id });
  };

  // const handleOnChangeDelivery = (
  //   event: SelectChangeEvent<typeof delivery>
  // ) => {
  //   console.log("delivery change");
  //   const {
  //     target: { value },
  //   } = event;
  //   setDelivery(value);
  //   console.log("delivery change", value);
  // };
  const handleChangePayment = () => {
    setShowPayments(true);
  };

  // const getNameFromId = (list: any, id: string) => {
  //   const item = list.length && list.find((l: any) => l._id === id);
  //   console.log("list aa", list);
  //   return item?.name ?? id + "-" + item.label;
  // };
  // let deliverySelect = deliveryOptions.map((delivery) => {

  //   return { label: delivery.name, value: delivery._id };
  // });

  return (
    <Box sx={{ width: "1200px", margin: "0 auto" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <Icon icon="mdi:address-marker-outline" />
          <Typography>Address</Typography>
        </Box>
        <hr />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <p>
            Nguyen danh Tung (+84) 967672682 Xóm 6 thôn thụy khuê, Xã Sài Sơn,
            Huyện Quốc Oai, Hà Nội
          </p>
          <Button onClick={() => setOpenModalAdress(true)}>
            Change Address
          </Button>
        </Box>

        {openModalAdress && (
          <CustomModal
            onClose={() => {
              setOpenModalAdress(false);
            }}
            open={openModalAdress}
          >
            <EditAddressForm
              user={user}
              handlAddNewAddress={handlAddNewAddress}
              hanldeUpdateAdress={hanldeUpdateAdress}
            />
          </CustomModal>
        )}

        {openModalNewEditAdress.open && (
          <CustomModal
            onClose={() => {
              setOpenModalNewEditAdress({ open: false, _id: "" });
            }}
            open={openModalNewEditAdress.open}
          >
            <NewEditAdressForm
              openModalNewEditAdress={openModalNewEditAdress}
              user={user}
              handleBackAdress={handleBackAdress}
            />
          </CustomModal>
        )}
      </Box>
      <Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", width: "100%" }}>
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
              <Typography>Total Item</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {listItem ? (
            listItem.map((item: ProductItem) => {

              return (
                <Box key={item.product} sx={{ display: "flex", width: "100%" }}>
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
                    <Typography>{item.price * item.amount}</Typography>
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
          ></Box>
        </Box>
      </Box>
      <Box>
        <Grid container>
          <Grid item md={6}>
            <CustomTextField label="Note" />
          </Grid>
          <Grid item md={6}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Typography>
                Delivery Method:{" "}
                {deliveryMethodSelected
                  ? deliveryMethodSelected.name
                  : deliveryMethodSelected}
              </Typography>
              <Button
                onClick={() => {
                  setOpenModalDelivery(true);
                }}
              >
                Change
              </Button>
              {openModalDelivery && (
                <CustomModal
                  onClose={() => {
                    setOpenModalDelivery(false);
                  }}
                  open={openModalDelivery}
                >
                  <EditDeliveryMethod deliveryOptions={deliveryOptions} />
                </CustomModal>
              )}
            </Box>

            {/* <CustomSelectField onChange = {handleOnChangeDelivery} options={deliverySelect} /> */}
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Grid container>
          <Grid item md={6}>
            <Box>
              <Typography>
                Payment Method: {payment ? payment.name : payment}{" "}
              </Typography>
              {showPayments && (
                <FormControl>
                  <FormLabel id="payment-list">Gender</FormLabel>
                  <RadioGroup
                    aria-labelledby="payment-list"
                    defaultValue={payment}
                    name="radio-buttons-group"
                  >
                    {paymentList &&
                      paymentList.map((p) => {

                        return (
                          <React.Fragment key={p._id}>
                            <FormControlLabel
                              onChange={() => setPayment(p)}
                              value={p._id}
                              control={<Radio />}
                              label={p.name}
                            />
                          </React.Fragment>
                        );
                      })}
                  </RadioGroup>
                </FormControl>
              )}
            </Box>
          </Grid>
          <Grid item md={6}>
            {!showPayments && (
              <Button onClick={handleChangePayment}>Change</Button>
            )}
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Typography>Total Price Item: {totalPricesOrder}</Typography>
        <Typography>Total Price Shipping: </Typography>
        <Typography>Total Price: </Typography>
      </Box>
      <Box>
        <Button onClick={handleOrderSubmit}>Check out</Button>
      </Box>
    </Box>
  );
};

export default CheckoutPage;
CheckoutPage.getLayout = (page: ReactNode) => (
  <DefaultLayout>{page}</DefaultLayout>
);
