import { useRouter } from 'next/router';
import { trpc } from '@ps/utils/trpc';
import { Box } from '@mui/material';
import { BreadCrumbs } from '@ps/components/productPage/breadcrumbs/breadCrumbs';
import { ProductDetailsRow } from '@ps/components/productPage/ProductDetailsRow';
import { UserContext } from 'src/layouts/ProtectedPageWrapper';
import { useContext, useState } from 'react';
import { ProductSubstitutes } from '@ps/components/productPage/productSubstitutes';
import { SnackBar } from '@ps/utils/SnackBar';

const ProductPage: React.FC = () => {
  const user = useContext(UserContext);
  const [filter, setFilter] = useState('');
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [alertSuccess, setAlertSuccess] = useState(false);

  const resetAlert = () => {
    setAlertSuccess(false);
  };

  const closeSnack = () => {
    setOpenSnack(false);
    setSnackMessage('');
    setTimeout(resetAlert, 100);
  };

  const router = useRouter();
  const productId = String(router.query.id);
  // Gets the product by searching for product id that is in url
  const productData = trpc.useQuery(['product.getProduct', { id: productId }]);

  if (productData.isLoading) {
    return <>LOADING...</>;
  }

  return (
    <>
      {productData.data ? (
        <>
          <BreadCrumbs productData={productData.data} />
          <Box
            sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          >
            <ProductDetailsRow
              productData={productData.data}
              user={user}
              id={productId}
              setOpenSnack={setOpenSnack}
              setSnackMessage={setSnackMessage}
              setAlertSuccess={setAlertSuccess}
            />
            <ProductSubstitutes
              productData={productData.data}
              filter={filter}
              setFilter={setFilter}
            />
          </Box>
          <SnackBar
            openSnack={openSnack}
            snackMessage={snackMessage}
            closeSnack={closeSnack}
            alertSuccess={alertSuccess}
          />
        </>
      ) : (
        <p>Product not found.</p>
      )}
    </>
  );
};

export default ProductPage;
