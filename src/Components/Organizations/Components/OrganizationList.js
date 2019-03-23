import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//material ui
import { withStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Grid,
  Card,
  CardContent
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Create";
import ViewIcon from "@material-ui/icons/Visibility";

//custom styles
import styles from "../organizations.styles";

//actions
import * as OrgActions from "../redux/organizations.actions";
import * as userActions from "../../Users/redux/users.actions";

function OrganizationList(props) {
  //hooks
  const [expanded] = useState(false);
  const [openOrgView, setOpenOrgView] = useState(false);
  const [organizationsDetails, setOrganizationsDetails] = useState([]);

  //regular functions
  const fetchData = status => {
    let searchObj = {
      searchQuery: {
        status: status
      }
    };
    props.getOrganizations(searchObj);
  };
  const handleChange = index => (event, expanded) => {
    // setExpanded(true)
  };

  const handleOpenOrgView = index => event => {
    setOpenOrgView(true);
    setOrganizationsDetails(props.organizations.list.data[index]);
  };
  const handleCloseOrgView = () => {
    setOpenOrgView(false);
  };
  const ApproveOrganization = data => {
    if (data._id && data.primaryUser && data.primaryUser._id) {
      let newData = {
        status: "Active"
      };
      if (data._id) {
        props.updateOrganization(data._id, newData, (err, result) => {});
      }
      if (data.primaryUser._id) {
        props.updateUser(data.primaryUser._id, newData, (err, result) => {});
      }
      setOpenOrgView(false);
    }
  };

  const ViewOrganization = () => {
    return (
      <Dialog
        fullScreen={fullScreen}
        open={openOrgView}
        onClose={handleCloseOrgView}
        maxWidth={"lg"}
        aria-labelledby="org-view-dialog"
      >
        <DialogTitle id="org-view-dialog">Organization Details</DialogTitle>
        <DialogContent>
          <DialogContentText />
          <Grid container spacing={24}>
            {/* Company Details */}
            <Grid item sm={12}>
              <Card className={classes.view_organization_card}>
                <CardContent>
                  <Typography
                    className={classes.view_organization_typography}
                    color="textSecondary"
                    gutterBottom
                    variant="body1"
                    component="h6"
                  >
                    Company Details
                  </Typography>
                  <Typography variant="body2">
                    Company Name :{" "}
                    {organizationsDetails.name ? organizationsDetails.name : ""}
                  </Typography>
                  <Typography variant="body2">
                    companyType :{" "}
                    {organizationsDetails.companyType
                      ? organizationsDetails.companyType
                      : ""}
                  </Typography>
                  <Typography variant="body2">
                    City :{" "}
                    {organizationsDetails.address
                      ? organizationsDetails.address.city
                      : ""}
                  </Typography>
                  <Typography variant="body2">
                    State :{" "}
                    {organizationsDetails.address
                      ? organizationsDetails.address.state
                      : ""}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sm={12}>
              <Card className={classes.view_organization_card}>
                <CardContent>
                  <Typography
                    className={classes.view_organization_typography}
                    color="textSecondary"
                    gutterBottom
                    variant="body1"
                    component="h6"
                  >
                    Company Identity
                  </Typography>
                  <Typography variant="body2">
                    PAN Number :{" "}
                    {organizationsDetails.panNumber
                      ? organizationsDetails.panNumber
                      : ""}
                  </Typography>
                  <Typography variant="body2">
                    Gst Number :{" "}
                    {organizationsDetails.gstNumber
                      ? organizationsDetails.gstNumber
                      : ""}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sm={12}>
              <Card className={classes.view_organization_card}>
                <CardContent>
                  <Typography
                    className={classes.view_organization_typography}
                    color="textSecondary"
                    gutterBottom
                    variant="body1"
                    component="h6"
                  >
                    Bank Details
                  </Typography>
                  <Typography variant="body2">
                    Account Number :{" "}
                    {organizationsDetails.bankAccount
                      ? organizationsDetails.bankAccount.accountNumber
                      : ""}
                  </Typography>
                  <Typography variant="body2">
                    Account Name :{" "}
                    {organizationsDetails.bankAccount
                      ? organizationsDetails.bankAccount.accountName
                      : ""}
                  </Typography>
                  <Typography variant="body2">
                    Account Type :{" "}
                    {organizationsDetails.bankAccount
                      ? organizationsDetails.bankAccount.accountType
                      : ""}
                  </Typography>
                  <Typography variant="body2">
                    Bank Name :{" "}
                    {organizationsDetails.bankAccount
                      ? organizationsDetails.bankAccount.bankName
                      : ""}
                  </Typography>
                  <Typography variant="body2">
                    Bank Branch:{" "}
                    {organizationsDetails.bankAccount
                      ? organizationsDetails.bankAccount.bankBranch
                      : ""}
                  </Typography>
                  <Typography variant="body2">
                    IFSC Code :{" "}
                    {organizationsDetails.bankAccount
                      ? organizationsDetails.bankAccount.ifscCode
                      : ""}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            {organizationsDetails.status !== "Active" ? (
              <Grid item md={12}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography
                      className={classes.view_enquiry_typography}
                      color="textSecondary"
                      gutterBottom
                      variant="body1"
                      component="h6"
                    >
                      Actions
                    </Typography>
                    <Button
                      onClick={() => ApproveOrganization(organizationsDetails)}
                      color="primary"
                      size="small"
                      variant="contained"
                    >
                      Approve Organization
                    </Button>
                    <Button
                      onClick={() => handleCloseOrgView()}
                      color="secondary"
                      size="small"
                      variant="contained"
                    >
                      Close
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ) : (
              ""
            )}
          </Grid>
        </DialogContent>
      </Dialog>
    );
  };

  const List = () => {
    return (
      <div>
        {props.organizations.list.data.map((organization, index) => {
          if (
            props.status.filter(value => organization.status.includes(value))
              .length > 0
          ) {
            return (
              <ExpansionPanel
                key={index}
                expanded={expanded === index}
                onChange={handleChange(index)}
              >
                <ExpansionPanelSummary>
                  <div className={classes.threeUnitSpace}>
                    <Typography className={classes.boldFont}>
                      Company Name
                    </Typography>
                    <Typography className={classes.regularFont}>
                      {organization.name}
                    </Typography>
                  </div>
                  <div className={classes.threeUnitSpace}>
                    <Typography className={classes.boldFont}>
                      Contact Name
                    </Typography>
                    <Typography className={classes.regularFont}>
                      {organization.primaryUser
                        ? organization.primaryUser.name
                        : ""}
                    </Typography>
                  </div>
                  <div className={classes.twoUnitSpace}>
                    <Typography className={classes.boldFont}>
                      Contact Phone
                    </Typography>
                    <Typography className={classes.regularFont}>
                      {organization.primaryPhone}
                    </Typography>
                  </div>
                  <div className={classes.twoUnitSpace}>
                    <Typography className={classes.boldFont}>Status</Typography>
                    <Typography className={classes.regularFont}>
                      {organization.status}
                    </Typography>
                  </div>
                  <div className={classes.twoUnitSpace}>
                    <Typography className={classes.boldFont}>City</Typography>
                    <Typography className={classes.regularFont}>
                      {organization.address ? organization.address.city : ""}
                    </Typography>
                  </div>
                  <div className={classes.threeUnitSpace}>
                    <Typography className={classes.boldFont}>
                      Actions
                    </Typography>
                    <Typography>
                      <Button
                        size="small"
                        color="primary"
                        className={classes.iconBtn}
                        onClick={handleOpenOrgView(index)}
                      >
                        <ViewIcon style={{ fontSize: 25 }} />
                      </Button>

                      <Link to={`/organizations/edit/${organization._id}`}>
                        <Button
                          size="small"
                          color="inherit"
                          className={classes.btnVerySmall}
                        >
                          <EditIcon style={{ fontSize: 25 }} />
                        </Button>
                      </Link>
                    </Typography>
                  </div>
                </ExpansionPanelSummary>
              </ExpansionPanel>
            );
          } else {
            return <div>{"No Records Found"}</div>;
          }
        })}
        <ViewOrganization />
      </div>
    );
  };

  //hooks
  useEffect(() => {
    fetchData(props.status);
    return function unmount() {};
  }, [props.status]);

  const { classes, fullScreen } = props;
  let listContent = <div>Loading...</div>;
  if (
    props.organizations.list &&
    props.organizations.list.data &&
    props.organizations.list.data.length === 0
  ) {
    listContent = <div>No Records Found</div>;
  }
  if (
    props.organizations.list &&
    props.organizations.list.data &&
    props.organizations.list.data.length > 0
  ) {
    listContent = <List />;
  }
  return listContent;
}

const mapStateToProps = state => ({
  organizations: state.organizations,
  auth: state.auth
});

const mapDispatchToProps = {
  getOrganizations: OrgActions.getOrganizations,
  updateOrganization: OrgActions.updateOrganization,
  updateUser: userActions.updateUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(OrganizationList));
