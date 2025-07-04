import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import {
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import RelatedProducts from "../../components/RelatedProducts";
import { useFetchProductDetailsQuery } from "./catalogApi";
import { currencyFormat } from "../../lib/util";

export default function ProductDetails() {
  const { id } = useParams();
  const { data: product, isLoading } = useFetchProductDetailsQuery(
    id ? +id : 0
  );

  if (!product || isLoading)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-600 text-sm sm:text-base">
        Loading Product Details...
      </div>
    );

  const productDetails = [
    { label: "Name", value: product.name },
    { label: "Description", value: product.description },
    { label: "Type", value: product.type },
    { label: "Brand", value: product.brand },
    { label: "Quantity in stock", value: product.quantityInStock },
  ];

  return (
    <Grid container spacing={6} maxWidth="lg" sx={{ mx: "auto" }}>
      <Grid size={6}>
        <img
          src={product?.pictureUrl}
          alt={product.name}
          style={{ width: "100" }}
        />
      </Grid>
      <Grid size={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography>{currencyFormat(product.price)}</Typography>
        <TableContainer>
          <Table sx={{ "& td": { fontSize: "1rem" } }}>
            <TableBody>
              {productDetails.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    {detail.label}
                  </TableCell>
                  <TableCell>{detail.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2} marginTop={3}>
          <Grid size={6}>
            <TextField
              variant="outlined"
              type="number"
              label="Quantity in basket"
              fullWidth
              defaultValue={1}
            />
          </Grid>
          <Grid size={6}>
            <Button
              sx={{ height: "55px" }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
            >
              Add to Basket
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* Description */}
      <div className="mt-20">
        <div className="border">
          <h1 className="font-semibold text-2xl px-6 py-6 ">Description</h1>
          <p className="flex flex-col gap-4 px-6 text-sm text-gray-500">
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet, It
            serves as vitual marketplace where businesses and individials can
            showcase their products, imteract with customers, and conduct
            transactions, and conduct transactions without the need ofr a
            physical presence. E-commerce websites have gained immense
            popularity due to their convenience, accesibility, and the goal
            reach they offer.
          </p>
          <p className="flex flex-col gap-4 px-6 py-6 text-sm text-gray-500">
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information
          </p>
        </div>
      </div>

      {/* Review Section */}
      <div className="mt-0 w-full">
        <div className="border">
          <h1 className="font-semibold text-2xl px-6 py-6 text-center">
            Customer Reviews
          </h1>

          <div className="px-6 py-4 space-y-6 text-sm text-gray-700">
            {/* Review 1 */}
            <div className="border-b pb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold">Jane Doe</span>
                <span className="text-xs text-gray-400">June 15, 2025</span>
              </div>
              <div className="text-yellow-500 mb-2">⭐⭐⭐⭐⭐</div>
              <p>
                This product exceeded my expectations. Quality is top-notch and
                delivery was super quick. I’ll definitely buy again!
              </p>
            </div>

            {/* Review 2 */}
            <div className="border-b pb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold">Mark Smith</span>
                <span className="text-xs text-gray-400">June 12, 2025</span>
              </div>
              <div className="text-yellow-500 mb-2">⭐⭐⭐⭐</div>
              <p>
                Overall very good. The material feels premium. One star off
                because of minor packaging issue, but not a big deal.
              </p>
            </div>

            {/* Review 3 */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold">Ella Cruz</span>
                <span className="text-xs text-gray-400">June 9, 2025</span>
              </div>
              <div className="text-yellow-500 mb-2">⭐⭐⭐⭐⭐</div>
              <p>
                Love it! Very stylish and comfortable. Got a lot of compliments.
                Will recommend to friends.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* display related products */}
      <div className="mt-5 w-full">
        <div>
          <h1 className="font-semibold text-2xl px-6 py-6 ">
            You may also like
          </h1>
        </div>
        <div className="w-full">
          <RelatedProducts />
        </div>
      </div>
    </Grid>
  );
}
