"use client";

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import CustomSwipeableDrawer from "@/components/common/Drawer/CustomSwipeableDrawer";
import CategoriesForm from "@/components/ui-component/forms/CategoriesForm";
import EnhancedTable from "@/components/ui-component/table/Table";
import PageTableLayout from "@/components/common/PageTableLayout";

function Header() {
  return (
    <>
      <CardHeader sx={{ padding: "0px" }} title="Category List" />
      <CustomSwipeableDrawer
        buttonLabel={
          <Tooltip title="Add Category">
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
          <CategoriesForm setOpenDrawer={setOpenDrawer} />
        )}
      </CustomSwipeableDrawer>
    </>
  );
}

const Categories = () => (
  <PageTableLayout header={<Header />} content={<EnhancedTable />} />
);

export default Categories;
