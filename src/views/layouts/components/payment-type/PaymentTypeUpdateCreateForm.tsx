import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import {
  Box,
  createTheme,
  CssBaseline,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import CustomTextField from "src/components/text-field";
import { TPramsCreatePaymentType, TPramsUpdatePaymentType } from "src/configs/@type/payment-type";
import { CreatePaymentType, updatePaymentType } from "src/service/payment-type";
import { AppDispatch } from "src/stores";
import {
  createPaymentTypeAction,
  updatePaymentTypeAction,
} from "src/stores/payment-type/paymentTypeAction";
import * as yup from "yup";

const PaymentTypeUpdateCreateForm = (props: any) => {
  const { updateData, handleClose } = props;
  const defaultTheme = createTheme();
  const { t } = useTranslation();
  const schema = yup
    .object({
      name: yup.string().required(),
      type: yup.string().required(),
    })
    .required();
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  // const onSubmit = (data) => console.log(data)
  const onSubmit = (params: TPramsCreatePaymentType): void => {
    console.log("submit type", updateData,params);
    if (!updateData) {
      mutation.mutate(params)
      toast.success('Add successfully!')
    } else {
      mutationUpdate.mutate(
          {    
            _id: updateData._id,
           type: params.type,
           name: params.name
          }
        )
      toast.success('Update data succesfully!')  
    }
    handleClose();
  };

  const queryClient = useQueryClient()
  const postItem = (params:TPramsCreatePaymentType) => {
      return CreatePaymentType(params)
  }
    // Mutations
  const mutation = useMutation({
    mutationFn: postItem,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['fetch_all_payment'] })
      //queryClient.fetchInfiniteQuery('fetch_all_payment')
    },
  })
  const postEditItem = (data:TPramsUpdatePaymentType) => {
      return updatePaymentType(data)
  }
  // Mutations
  const mutationUpdate = useMutation({
    mutationFn: postEditItem,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['fetch_all_payment'] })
      //queryClient.fetchInfiniteQuery('fetch_all_payment')
    },
  })

  //use effect
  useEffect(() => {
    if (updateData) {
      reset({
        name: updateData.name,
        type: updateData.type,
      });
    } else {
      reset({});
    }
  }, [updateData]);
  return (
    <Grid container component="main" sx={{ height: "auto" }}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} />
      <Grid item xs={12} sm={8} md={12} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            {!updateData ? t("create_new") : t("update")}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    placeholder="Payment Type  name"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value ?value : ""}
                  />
                )}
                name="name"
              />
            </Box>
            <Box>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    placeholder="Type"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value ?value : ""}
                  />
                )}
                name="type"
              />
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {!updateData ? t("create_new") : t("update")}
            </Button>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default PaymentTypeUpdateCreateForm;
