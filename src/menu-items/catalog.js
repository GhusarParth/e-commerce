// assets
import { IconBrandProducthunt, IconLink } from "@tabler/icons";

// constant
const icons = {
  IconBrandProducthunt,
  IconLink,
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const catalog = {
  id: "catalog",
  title: "catalog",
  type: "group",
  children: [
    {
      id: "catalog-categories",
      title: "Categories",
      type: "item",
      url: "/catalog/categories",
      icon: icons.IconLink,
      breadcrumbs: false,
    },
    {
      id: "catalog-subcategory",
      title: "Sub Category",
      type: "item",
      url: "/catalog/subCategory",
      icon: icons.IconLink,
      breadcrumbs: false,
    },
    {
      id: "catalog-products",
      title: "Products",
      type: "item",
      url: "/catalog/products",
      icon: icons.IconBrandProducthunt,
      breadcrumbs: false,
    },
  ],
};

export default catalog;
