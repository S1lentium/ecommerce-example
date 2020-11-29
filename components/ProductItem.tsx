import { Box, Card, CardActionArea, CardContent, CardMedia, Chip, makeStyles, Typography } from '@material-ui/core';
import Link from 'next/link';
import { Product } from '../interfaces';
import { sizeShorthand } from '../utils/helpers';

const useStyles = makeStyles({
  cardMedia: {
    paddingTop: '160%',
  },
  chip: {
    '& + &': {
      marginLeft: 3,
    },
  },
  price: {
    fontSize: '1.2rem',
    color: '#f97369',
  }
});

type ProductItemProps = {
  product: Product;
}

export default function ProductItem({ product }: ProductItemProps) {
  const classes = useStyles();

  return (
    <Card >
      <CardActionArea>
        <Link href={`/product/${product.id}`}>
          <div>
            <CardMedia
              className={classes.cardMedia}
              image={product.image}
              title={product.name}
            />
            <CardContent>
              <Typography gutterBottom>{product.name}</Typography>
              <Box mb={1}>
                <span>Sizes: </span>
                {product.sizes.map((label, i) => (
                  <Chip
                    key={i}
                    className={classes.chip}
                    variant="outlined"
                    size="small"
                    label={sizeShorthand(label)}
                  />
                ))}
              </Box>
              <Typography className={classes.price}>{product.price}</Typography>
            </CardContent>
          </div>
        </Link>
      </CardActionArea>
    </Card>
  );
}
