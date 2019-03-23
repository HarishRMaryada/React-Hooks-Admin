import React, { useState } from "react";
import { Link } from "react-router-dom";

//material ui
import {
  List,
  Collapse,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";

//material ui icons
import UserIcon from "@material-ui/icons/AccountBox";
//import OrderIcon from '@material-ui/icons/AddShoppingCart';
//import StationsIcon from '@material-ui/icons/AccountBalance';
import ProductIcon from "@material-ui/icons/DirectionsBike";
import OrganizationIcon from "@material-ui/icons/Store";
import DashboardIcon from "@material-ui/icons/Dashboard";
//import PromoteIcon from '@material-ui/icons/VolumeUp';
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Apps from "@material-ui/icons/Apps";
import AttributeIcon from "@material-ui/icons/Assessment";

function LeftMenu(props) {
  //hooks
  const [openSubMenu, setOpenSubMenu] = useState(false);

  let menuArray = [];
  const SuperAdmin = props.roles.indexOf("SuperAdmin") > -1;
  const OrganizationAdmin = props.roles.indexOf("OrganizationAdmin") > -1 && (props.status==="Active");
  const NonUser = (props.status==="Processing") ? true : false;

  if (OrganizationAdmin) {
    menuArray = [
      { link: "/", name: "Dashboard", icon: DashboardIcon },
      { link: "/users", name: "User Management", icon: UserIcon },
      //{link:"/orders",       name:'Orders',        icon:OrderIcon},
      { link: "/products", name: "Product Management", icon: ProductIcon }
      //   {link:"/products/stateTax",name:'State Tax', icon:OrganizationIcon},
      //  {link:"/services/charging",     name:'Services',      icon:HelpIcon},
      // {link:"/organizations/registered",name:'Organizations', icon:OrganizationIcon},
      // {link :"/stations",    name:'Stations',      icon:StationsIcon},
      // {link:"/promotions",   name:'Promotions',    icon:PromoteIcon},
    ];
  }
  if (SuperAdmin) {
    menuArray = [
      { link: "/", name: "Dashboard", icon: DashboardIcon },
      { link: "/users", name: "User Management", icon: UserIcon },
      //  {link:"/orders",       name:'Order Management',        icon:OrderIcon},
      { link: "/products", name: "Product Management", icon: ProductIcon },
      //  {link:"/services/charging",     name:'Services',      icon:HelpIcon},
      {
        link: "/organizations/enquirylist",
        name: "Merchant Management",
        icon: OrganizationIcon
      },
      // { link: "/partners", name: "Partner", icon: DashboardIcon }
      //  {link:"/products/stateTax",name:'State Tax', icon:OrganizationIcon},
      // {link :"/stations",    name:'Stations',      icon:StationsIcon},
      // {link:"/promotions",   name:'Promotions',    icon:PromoteIcon},
      // {link:"/products/producttype",name:'Attribute', icon:OrganizationIcon},
    ];
  }

  if (NonUser) {
    menuArray = [{ link: "/partner", name: "Partner", icon: DashboardIcon }];
  }
  const handleSubListChange = () => {
    setOpenSubMenu(!openSubMenu);
  };

  let attributeArray = [
    { link: "/producttypes", name: "Product Types", icon: Apps },
    { link: "/categories", name: "Categories", icon: Apps },
    { link: "/categories/sublist", name: " Sub Categories", icon: Apps },
    { link: "/brands", name: "Brands", icon: Apps }
  ];

  let AttributeMenu = () => {
    return (
      <List>
        <ListItem button onClick={handleSubListChange}>
          <ListItemIcon>
            <AttributeIcon />
          </ListItemIcon>
          <ListItemText inset primary="Attribute" />
          {openSubMenu ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {attributeArray.map((menu, index) => (
              <Link to={menu.link} key={menu.name}>
                <ListItem button>
                  <ListItemIcon>{<menu.icon />}</ListItemIcon>
                  <ListItemText primary={menu.name} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Collapse>
      </List>
    );
  };

  let mainListItems = (
    <div>
      {menuArray.map((menu, index) => (
        <Link to={menu.link} key={menu.name}>
          <ListItem button>
            <ListItemIcon>{<menu.icon />}</ListItemIcon>
            <ListItemText primary={menu.name} />
          </ListItem>
        </Link>
      ))}
      {SuperAdmin && <AttributeMenu />}
    </div>
  );
  return mainListItems;
}

export default LeftMenu;
