"use client";

import EnhancedTable from "@/components/ui-component/table/Table";
import PageTableLayout from "@/components/common/PageTableLayout";
import { CardHeader, Tooltip, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CustomSwipeableDrawer from "@/components/common/Drawer/CustomSwipeableDrawer";
import ProductForm from "@/components/ui-component/forms/ProductForm";

const Products = () => {
  function Header() {
    return (
      <>
        <CardHeader sx={{ padding: "0px" }} title="Product List" />
        <CustomSwipeableDrawer
          buttonLabel={
            <Tooltip title="Add Product">
              <IconButton
                sx={{
                  background: "primary",
                }}
                size="small"
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          }
        >
          {({ openDrawer, setOpenDrawer }: any) => (
            <ProductForm
              openDrawer={openDrawer}
              setOpenDrawer={setOpenDrawer}
            />
          )}
        </CustomSwipeableDrawer>
      </>
    );
  }

  return (
    <>
      <PageTableLayout
        title="Product List"
        header={<Header />}
        content={<EnhancedTable />}
      />
    </>
  );
};

export default Products;
