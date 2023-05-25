import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormikForm from "@/components/common/FormikForm";
import { CREATE_CATEGORY } from "@/redux/category/category.type";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Switch,
  SwitchProps,
  TextField,
  useTheme,
} from "@mui/material";
import styled from "@emotion/styled";

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }: any) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.primary.main
            : theme.palette.primary.main,
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: theme.palette.primary.main,
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const validation = Yup.object({
  name: Yup.string().required("Please enter category name."),
});

const CategoriesForm = ({ setOpenDrawer }: any) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state.category.isLoading);

  const handleSubmit = (values: any, { resetForm }: any) => {
    const payload = {
      name: values.name,
      description: values.category,
      order: values.order,
      isEnable: values.isEnable,
    };
    dispatch({ type: CREATE_CATEGORY, payload });
    resetForm();
  };

  return (
    <FormikForm
      initialValues={{
        name: "",
        category: "",
        order: 999,
        isEnable: true,
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
                  label="Category Name"
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
                  error={params.errors.category}
                  id="filled-error-helper-text"
                  label="Category Description"
                  variant="outlined"
                  name="category"
                  color="primary"
                  multiline
                  rows="3"
                  value={params.values.category}
                  onChange={params.handleChange}
                  onBlur={params.handleBlur}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  error={params.errors.order}
                  id="filled-error-helper-text"
                  label="Order"
                  variant="outlined"
                  name="order"
                  color="primary"
                  value={params.values.order}
                  type="number"
                  onChange={params.handleChange}
                  onBlur={params.handleBlur}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <IOSSwitch
                      sx={{ m: 1 }}
                      checked={params.values.isEnable}
                      onChange={(e: any) =>
                        params.setFieldValue("isEnable", e.target.checked)
                      }
                    />
                  }
                  label="Visible to users"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="submit">{isLoading ? "loading..." : "Create"}</Button>
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
  );
};

export default CategoriesForm;
