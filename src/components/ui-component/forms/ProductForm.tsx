import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfoIcon from "@mui/icons-material/Info";
import FormikForm from "@/components/common/FormikForm";
import {
  Box,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  InputAdornment,
  TextField,
} from "@mui/material";
import Dropdown from "@/components/common/Dropdown";
import { GET_ALL_CATEGORY } from "@/redux/category/category.type";
import { GET_ALL_SUB_CATEGORY } from "@/redux/subCategory/subCategory.type";
import { FileUploader } from "react-drag-drop-files";
import {
  CREATE_PRODUCT,
  UPLOAD_PRODUCT_IMAGE,
} from "@/redux/product/product.type";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  clearProductImages,
  deleteProductImage,
} from "@/redux/product/product.reducer";

const validation = Yup.object({
  name: Yup.string().required("Please enter product name"),
  subcategory: Yup.string().required("Please select subcategory."),
  price: Yup.number().required(),
  quantity: Yup.number().required(),
});

const ProductForm = ({ setOpenDrawer, openDrawer }: any) => {
  const dispatch = useDispatch();
  const allSubCategory = useSelector(
    (state: any) => state.subCategory.subCategories
  );

  const { isFileUploadLoading, productImages } = useSelector(
    (state: any) => state.product
  );
  console.log(
    "🚀 ~ file: ProductForm.tsx:46 ~ ProductForm ~ productImages:",
    productImages
  );
  useEffect(() => {
    dispatch({ type: GET_ALL_SUB_CATEGORY });
  }, []);

  const uploadImage = (files: any) => {
    console.log("upload image ----", files);
    dispatch({ type: UPLOAD_PRODUCT_IMAGE, files });
  };

  const handleSubmit = (values: any, { resetForm }: any) => {
    const payload = { ...values, files: productImages };
    dispatch({ type: CREATE_PRODUCT, payload });
    resetForm();
  };
  //@ts-ignore
  useEffect(() => {
    return () => {
      dispatch(clearProductImages());
    };
  }, [openDrawer]);

  const handleDeleteImage = (id: string) => {
    dispatch(deleteProductImage(id));
  };

  return (
    <div>
      <FormikForm
        initialValues={{
          name: "",
          description: "",
          price: null,
          quantity: null,
          subcategory: "",
        }}
        validationSchema={validation}
        onSubmit={handleSubmit}
      >
        {(params: any) => (
          <>
            <DialogTitle
              sx={{
                margin: "0px",
                fontWeight: "500",
                color: "rgb(18, 25, 38)",
                fontFamily: "Roboto, sans-serif",
                lineHeight: "1.6",
                padding: "16px 24px",
                flex: "0 0 auto",
                fontSize: "1.25rem",
              }}
            >
              Add Category
            </DialogTitle>
            <DialogContent
              sx={{ flex: "1 1 auto", overflowY: "auto", padding: "20px 24px" }}
            >
              <Grid
                container
                spacing={3}
                sx={{
                  boxSizing: "border-box",
                  display: "flex",
                  flexFlow: "row wrap",
                  width: "calc(100% + 24px)",
                  marginLeft: "-24px",
                  marginTop: "2px",
                }}
              >
                <Grid item xs={12}>
                  <TextField
                    error={params.errors.name}
                    helperText={params.errors.name}
                    id="filled-error-helper-text"
                    label="Product Name"
                    variant="outlined"
                    name="name"
                    color="primary"
                    value={params.values.name}
                    onChange={params.handleChange}
                    onBlur={params.handleBlur}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={params.errors.description}
                    id="filled-error-helper-text"
                    label="Product Description"
                    variant="outlined"
                    name="description"
                    color="primary"
                    multiline
                    rows="3"
                    value={params.values.description}
                    onChange={params.handleChange}
                    onBlur={params.handleBlur}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Dropdown
                    error={params.errors.subcategory}
                    helperText={params.errors.subcategory}
                    name="subcategory"
                    label="Sub Category"
                    options={allSubCategory || []}
                    value={params.values.subcategory}
                    onChange={params.handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    error={params.errors.price}
                    helperText={params.errors.price}
                    id="filled-error-helper-text"
                    label="Price"
                    variant="outlined"
                    name="price"
                    color="primary"
                    value={params.values.price}
                    type="number"
                    onChange={params.handleChange}
                    onBlur={params.handleBlur}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">₹</InputAdornment>
                      ),
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    error={params.errors.quantity}
                    helperText={params.errors.quantity}
                    id="filled-error-helper-text"
                    label="Quantity"
                    variant="outlined"
                    name="quantity"
                    color="primary"
                    value={params.values.quantity}
                    type="number"
                    onChange={params.handleChange}
                    onBlur={params.handleBlur}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <FileUploader
                    disabled={isFileUploadLoading}
                    multiple={true}
                    handleChange={
                      (file: any) => {
                        uploadImage(file);
                      }
                      // params.setFieldValue("file", file)
                    }
                    name="file"
                    types={["JPEG", "PNG"]}
                  />
                </Grid>
                <Grid item xs={12}>
                  {isFileUploadLoading ? (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height={300}
                      width="100%"
                    >
                      <CircularProgress />
                    </Box>
                  ) : (
                    <ImageList
                      sx={{
                        width: "100%",
                        height: 300,
                      }}
                    >
                      {productImages.length
                        ? productImages.map((item: any) => (
                            <ImageListItem key={item.url}>
                              <img
                                src={`${item.url}?w=248&fit=crop&auto=format`}
                                srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.title}
                                loading="lazy"
                              />
                              <ImageListItemBar
                                actionIcon={
                                  <IconButton
                                    onClick={() => {
                                      handleDeleteImage(item.url);
                                    }}
                                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                                    aria-label={`info about ${item.title}`}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                }
                              />
                            </ImageListItem>
                          ))
                        : "No Image Uploaded."}
                    </ImageList>
                  )}
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button type="submit" disabled={isFileUploadLoading}>
                create
              </Button>
              <Button
                onClick={() => {
                  setOpenDrawer(false);
                  params.resetForm();
                }}
              >
                Cancel
              </Button>
            </DialogActions>
          </>
        )}
      </FormikForm>
    </div>
  );
};

export default ProductForm;
