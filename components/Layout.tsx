import React, { ReactNode } from 'react'
import Head from 'next/head'
import { Badge, Container, IconButton, makeStyles, Toolbar } from '@material-ui/core'
import Link from 'next/link';
import { LocalMallOutlined as LocalMallOutlinedIcon } from '@material-ui/icons';
import { useStore } from './StoreProvider';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/dist/client/router';

type Props = {
  children?: ReactNode
  title?: string
}

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: 20,
    justifyContent: 'space-between',

  },
  brand: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#333',
    textDecoration: 'none',
  },
  container: {
    marginTop: 40,
    marginBottom: 40,
  }
}));

const Layout = observer(({ children, title = 'This is the default title' }: Props) => {
  const classes = useStyles();
  const store = useStore();
  const router = useRouter();

  const handleCartButton = () => {
    router.push('/cart');
  }
  
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{title}</title>
      </Head>
      <Container maxWidth="lg" className={classes.container}>
        <Toolbar className={classes.toolbar}>
          <Link href="/">
            <a className={classes.brand}>Shop</a>
          </Link>
          <IconButton onClick={handleCartButton}>
            <Badge badgeContent={store?.cartStore.count} color="primary">
              <LocalMallOutlinedIcon fontSize="large" />
            </Badge>
          </IconButton>
        </Toolbar>
        <main>
          {children}
        </main>
      </Container>
    </>
  );
});

export default Layout;
