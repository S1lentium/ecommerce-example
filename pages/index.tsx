import { Box } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import { ChangeEvent } from 'react';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import ProductList from '../components/ProductList';
import { DataList, Product } from '../interfaces';
import { getProducts } from '../utils/api'

type IndexPageProps = DataList<Product>;

export default function IndexPage({ data, pageCount, page }: IndexPageProps) {
  const router = useRouter();

  const handleChange = (_event: ChangeEvent<unknown>, value: number) => {
    router.push({
      query: {
        page: value,
      }
    })
  };

  return (
    <Layout>
      <ProductList>
        {data.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ProductList>
      <Box display="flex" justifyContent="center" mt={5}>
        <Pagination
          page={page}
          onChange={handleChange}
          count={pageCount} 
          color="primary" 
          variant="outlined"
        />
      </Box>
    </Layout>
  );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const page = query.page || 1;
  const data = await getProducts(Number(page));

  return { props: { ...data }};
}
