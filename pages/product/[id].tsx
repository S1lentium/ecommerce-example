
import { GetServerSidePropsContext } from "next";
import { Box, Button, Divider, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import he from "he";
import Layout from "../../components/Layout";
import { Product } from "../../interfaces";
import { useStore } from "../../components/StoreProvider";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import SizeSelector from "../../components/SizeSelector";
import { getProduct } from "../../utils/api";

type ProductDetailsProps = {
  product: Product;
}

const useStyles = makeStyles({
  image: {
    borderRadius: 6,
  },
  price: {
    color: '#f97369',
    fontSize: '1.75rem',
    marginBottom: 10,
  },
  description: {
    margin: '20px 0',
    fontSize: '1rem',
  },
  divider: {
    marginTop: 20,
    marginBottom: 20,
  },
  sizeButton: {
    '& + &': {
      marginLeft: 5,
    }
  }
});

const ProductDetails = observer(({ product }: ProductDetailsProps) => {
  const classes = useStyles();
  const store = useStore();
  const [size, setSize] = useState<string>();

  return (
    <Layout>
      <Grid container spacing={6}>
        <Grid item>
          <img
            className={classes.image}
            src={product.image}
            alt={product.name}
          />
        </Grid>
        <Grid item xs>
          <Typography variant="h4" component="h1" gutterBottom>{product.name}</Typography>
          <Typography className={classes.price}>{product.price}</Typography>
          <Box mb={2}>
            <Typography variant="subtitle2" component="span">MODEL:&nbsp;</Typography>
            {product.model}
          </Box>
          <Box mb={2}>
            <Typography variant="subtitle2">SIZE:</Typography>
            <SizeSelector sizes={product.sizes} value={size} onClick={(label: string) => setSize(label)} />
          </Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
            disabled={size === undefined}
            onClick={() => { store?.cartStore.addItem(product, size || '') }}
          >
            Add To Cart
          </Button>
          <Divider className={classes.divider} />
          <div className={classes.description} dangerouslySetInnerHTML={{__html: he.decode(product.description)}} />
        </Grid>
      </Grid>
    </Layout>
  );
});

export default ProductDetails;

export async function getServerSideProps({ params }: GetServerSidePropsContext) {
  const id = params?.id;
  const product = await getProduct(Number(id));

  if (Object.keys(product).length === 0) {
    return { notFound: true }
  }

  return { props: { product }};
}
