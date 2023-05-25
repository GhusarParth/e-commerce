"use client";

import EnhancedTable from "@/components/ui-component/table/Table";
import PageTableLayout from "@/components/common/PageTableLayout";
import { CardHeader, Tooltip, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CustomSwipeableDrawer from "@/components/common/Drawer/CustomSwipeableDrawer";
import SubCategoryForm from "@/components/ui-component/forms/SubCategoryForm";

const Subcategory = () => {
  function Header() {
    return (
      <>
        <CardHeader sx={{ padding: "0px" }} title="Subcategory List" />
        <CustomSwipeableDrawer
          buttonLabel={
            <Tooltip title="Add Subcategory">
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
            <SubCategoryForm
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
        title="Subcategory List"
        header={<Header />}
        content={<EnhancedTable />}
      />
    </>
  );
};

export default Subcategory;
