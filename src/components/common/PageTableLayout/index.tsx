import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Paper,
} from "@mui/material";
import React from "react";

const index = ({ header = null, content = null }: any) => {
  return (
    <div>
      <Paper elevation={0}>
        <Card>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            padding="24px"
          >
            {header}
          </Box>
          <Divider />
          <CardContent>{content}</CardContent>
        </Card>
      </Paper>
    </div>
  );
};

export default index;
