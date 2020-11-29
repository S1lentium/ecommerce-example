import { styled } from "@material-ui/styles"

const ProductList = styled('div')({
  display: 'grid',
  gap: 20,
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
});

export default ProductList;
