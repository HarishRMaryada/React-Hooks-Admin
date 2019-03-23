import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//material ui
import { withStyles } from "@material-ui/core/styles";
import styles from "./organizations.styles.js";
import { Paper, Tabs, Tab } from "@material-ui/core";

//import components
import EnquiryList from "./Components/EnquiryList";
import EnquiryForm from "./Components/EnquiryForm";
import OrganizationList from "./Components/OrganizationList";
import OrganizationForm from "./Components/OrganizationForm";

function index(props) {
  //hooks
  const [viewType, setViewType] = useState("enquirylist");
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, value) => {
    setTabValue(value);
  };

  const handleTabValues = () => {
    switch (props.match.params.mode) {
      case "enquiryedit":
        return setTabValue(0);
      case "processedlist":
        return setTabValue(1);
      case "registeredlist":
        return setTabValue(2);
      case "edit":
        return setTabValue(2);
      default:
        return setTabValue(0);
    }
  };

  //hooks
  useEffect(() => {
    if (props.match.params.mode) {
      setViewType(props.match.params.mode);
      handleTabValues();
    }

    return function unmount() {};
  }, [viewType, props.match.params]);
  const { classes } = props;
  let tabContent = (
    <Paper className={classes.root}>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab
          label="Enquiry"
          component={Link}
          to="/organizations/enquirylist"
          className={classes.tabLink}
        />
        <Tab
          label="Processed"
          component={Link}
          to="/organizations/processedlist"
          className={classes.tabLink}
        />
        <Tab
          label="Registered"
          component={Link}
          to="/organizations/registeredlist"
          className={classes.tabLink}
        />
      </Tabs>
      {viewType === "enquirylist" && <EnquiryList />}
      {viewType === "enquiryedit" && (
        <EnquiryForm id={props.match.params.id} type={"edit"} />
      )}
      {viewType === "processedlist" && (
        <OrganizationList status={["AwaitingForApproval", "Processing"]} />
      )}
      {viewType === "registeredlist" && (
        <OrganizationList status={["Active"]} />
      )}
      {viewType === "edit" && (
        <OrganizationForm id={props.match.params.id} type={"edit"} />
      )}
    </Paper>
  );
  return tabContent;
}

export default withStyles(styles)(index);
