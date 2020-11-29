import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, makeStyles, IconButton } from "@material-ui/core";
import { DeleteForeverOutlined as DeleteForeverOutlinedIcon} from "@material-ui/icons";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import Layout from "../components/Layout";
import { useStore } from "../components/StoreProvider";
import { Order } from "../interfaces";
import { placeOrder } from "../utils/api";

const useStyles = makeStyles((theme) => ({
  image: {
    borderRadius: theme.shape.borderRadius,
    width: 75,
    height: 120
  },
  total: {
    fontSize: '0.85rem',
    fontWeight: 500,
  },
  price: {
    color: '#f97369',
    fontSize: '1rem',
  },
}));

const Cart = observer(() => {
  const store = useStore();
  const classes = useStyles();
  const [order, setOrder] = useState<Order>();

  const handleCheckout = async () => {
    const products = store?.cartStore.items.map((item) => ({
      id: item.product.id,
      size: item.size,
    }));

    if (products) {
      const response = await placeOrder({ products });

      setOrder(response);

      store?.cartStore.clearItems();
    }
  }

  return (
    <Layout>
      {order ? (
        <Box>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
          >
            We have received your order
          </Typography>
          <Typography
            variant="h6"
            align="center"
          >
            Order no# {order.orderId}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={8}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={4}>My Cart</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {store?.cartStore.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <img className={classes.image} src={item.product.image} alt={item.product.name} />
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">{item.product.name}</Typography>
                        <Typography variant="subtitle1">Size: {item.size}</Typography>
                      </TableCell>
                      <TableCell className={classes.price}>{item.product.price}</TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => store.cartStore.removeItem(index)}>
                          <DeleteForeverOutlinedIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={4}>
            <Box bgcolor="#eee" p={2} borderRadius={4}>
              <Grid container style={{ marginBottom: 10 }}>
                <Grid item xs={9}>
                  <Typography variant="overline" className={classes.total}>Total:</Typography>
                </Grid>
                <Grid item xs={3} style={{ textAlign: 'right' }}>
                  <Typography variant="overline" className={classes.total}>{store?.cartStore.total}</Typography>
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={!store?.cartStore.count}
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
});

export default Cart;
