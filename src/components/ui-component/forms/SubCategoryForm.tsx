import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormikForm from "@/components/common/FormikForm";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Dropdown from "@/components/common/Dropdown";
import { GET_ALL_CATEGORY } from "@/redux/category/category.type";
import { Field, FieldArray } from "formik";
import { CREATE_SUB_CATEGORY } from "@/redux/subCategory/subCategory.type";

const validation = Yup.object({
  subCategory: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Subcategory is required!"),
    })
  ),
  category: Yup.string().required("Please select category."),
});

const SubCategoryForm = ({ openDrawer, setOpenDrawer }: any) => {
  const dispatch = useDispatch();
  const allCategory = useSelector((state: any) => state.category.categories);

  useEffect(() => {
    dispatch({ type: GET_ALL_CATEGORY });
  }, []);

  const handleSubmit = (values: any, { resetForm }: any) => {
    console.log(
      "🚀 ~ file: SubCategoryForm.tsx:43 ~ handleSubmit ~ values:",
      values
    );
    const payload = {
      category: values.category,
      data: values.subCategory,
    };
    dispatch({ type: CREATE_SUB_CATEGORY, payload, setOpenDrawer });
    resetForm();
  };

  return (
    <div>
      <FormikForm
        initialValues={{
          subCategory: [{ name: "", description: "" }],
          category: "",
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
              Add Subcategory
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
                  <FieldArray
                    name="subCategory"
                    render={(arrayHelpers) => (
                      <>
                        <Box
                          display="flex"
                          justifyContent="end"
                          marginBottom="10px"
                        >
                          <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            size="small"
                            onClick={() =>
                              arrayHelpers.push({ name: "", description: "" })
                            }
                          >
                            Add
                          </Button>
                        </Box>
                        <Grid
                          container
                          spacing={2}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          {params.values.subCategory &&
                            params.values.subCategory.length > 0 &&
                            params.values.subCategory.map(
                              (category: any, index: number) => (
                                <>
                                  <Grid item xs={5.5} key={index}>
                                    <Field
                                      as={TextField}
                                      name={`subCategory.${index}.name`}
                                      label="Name"
                                      error={
                                        params.errors.subCategory?.[index]?.name
                                      }
                                      // helperText={
                                      //   params.errors.subCategory?.[index]?.name
                                      // }
                                      fullWidth
                                    />
                                  </Grid>
                                  <Grid item xs={5.5} key={index}>
                                    <Field
                                      as={TextField}
                                      name={`subCategory.${index}.description`}
                                      label="Description"
                                      fullWidth
                                    />
                                  </Grid>
                                  <Grid item xs={1} key={index}>
                                    <IconButton
                                      aria-label="delete"
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </Grid>
                                </>
                              )
                            )}
                        </Grid>
                      </>
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Dropdown
                    error={params.errors.category}
                    helperText={params.errors.category}
                    name="category"
                    label="Select category"
                    options={allCategory}
                    value={params.values.category}
                    onChange={params.handleChange}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button type="submit">Create</Button>
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

export default SubCategoryForm;
