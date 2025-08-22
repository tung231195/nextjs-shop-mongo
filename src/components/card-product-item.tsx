import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import {Button, Divider, Grid } from '@mui/material';
import AddToCartFunc from 'src/views/layouts/components/catalog/add-to-cart';
import { CartItem } from 'src/configs/@type/shopping-cart';

interface TPropsProductsPublic {
  item:CartItem
}
export default function ProductItem(props: TPropsProductsPublic) {
  const {item} = props
  return (
          <Grid item md={3} xs={6}>
              <Card>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                     src={`data:image/png;base64,${item.image}`}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <AddToCartFunc item={item} />
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
        </Grid>
  );
}