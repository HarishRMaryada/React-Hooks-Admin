import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//material ui
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Typography,
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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Create";
import ViewIcon from "@material-ui/icons/Visibility";

//custom styles
import styles from "../organizations.styles";

//actions
import * as enquiryActions from "../redux/enquires.actions";

function EnquiryList(props) {
  //hooks
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [openEnqView, setOpenEnqView] = useState(false);
  const [enquiryDetails, setEnquiryDetails] = useState([]);
  //regular functions
  const fetchData = async () => {
    setIsLoading(true);
    await props.getEnquiries();
    setIsLoading(false);
  };
  const handleChange = index => (event, expanded) => {
    setExpanded(expanded ? index : false);
  };
  const handleOpenEnqView = index => event => {
    setOpenEnqView(true);
    setEnquiryDetails(props.enquiries.list.data[index]);
  };
  const handleCloseEnqView = () => {
    setOpenEnqView(false);
  };
  const ApproveEnquiry = data => {
    if (data) {
      props.approveEnquiry(data, (err, result) => {
        if (err) {
        }
        fetchData();
      });
      setOpenEnqView(false);
    }
  };

  //hooks
  useEffect(() => {
    fetchData();
    return function unmount() {};
  }, []);

  const ViewEnquiry = () => {
    return (
      <Dialog
        fullScreen={fullScreen}
        open={openEnqView}
        onClose={handleCloseEnqView}
        maxWidth={"lg"}
        aria-labelledby="enq-view-dialog"
      >
        <DialogTitle id="enq-view-dialog">Enquiry Details</DialogTitle>
        <DialogContent>
          <DialogContentText />
          <Grid container spacing={24}>
            {/* Company Details */}
            <Grid item sm={6}>
              <Card className={classes.view_enquiry_card}>
                <CardContent>
                  <Typography
                    className={classes.view_enquiry_typography}
                    color="textSecondary"
                    gutterBottom
                    variant="body1"
                    component="h6"
                  >
                    Company Details
                  </Typography>
                  <Typography variant="body2">
                    Company Name : {enquiryDetails.companyName}
                  </Typography>
                  <Typography variant="body2">
                    Website : {enquiryDetails.companyWebsite}
                  </Typography>
                  <Typography variant="body2">
                    City : {enquiryDetails.companyCity}
                  </Typography>
                  <Typography variant="body2">
                    State : {enquiryDetails.companyState}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            {/* Customer Information */}
            <Grid item sm={6}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography
                    className={classes.view_enquiry_typography}
                    color="textSecondary"
                    gutterBottom
                    variant="body1"
                    component="h6"
                  >
                    Contact Information
                  </Typography>
                  <Typography variant="body2">
                    Contact Name : {enquiryDetails.contactName}
                  </Typography>
                  <Typography variant="body2">
                    Contact Email : {enquiryDetails.contactEmail}
                  </Typography>
                  <Typography variant="body2">
                    Contact Phone : {enquiryDetails.contactPhone}
                  </Typography>
                  <Typography variant="body2" />
                </CardContent>
              </Card>
            </Grid>
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
                    onClick={() => ApproveEnquiry(enquiryDetails)}
                    color="primary"
                    size="small"
                    variant="contained"
                  >
                    Approve Company
                  </Button>
                  <Button
                    onClick={() => handleCloseEnqView()}
                    color="secondary"
                    size="small"
                    variant="contained"
                  >
                    Close
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  };

  const List = () => {
    return (
      <div>
        {enquiries.map((enquiry, index) => {
          return (
            <ExpansionPanel
              key={index}
              expanded={expanded === index}
              onChange={handleChange(index)}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <div className={classes.threeUnitSpace}>
                  <Typography className={classes.boldFont}>
                    Company Name
                  </Typography>
                  <Typography className={classes.regularFont}>
                    {enquiry.companyName}
                  </Typography>
                </div>
                <div className={classes.threeUnitSpace}>
                  <Typography className={classes.boldFont}>
                    Contact Name
                  </Typography>
                  <Typography className={classes.regularFont}>
                    {enquiry.contactName}
                  </Typography>
                </div>
                <div className={classes.twoUnitSpace}>
                  <Typography className={classes.boldFont}>
                    Contact Phone
                  </Typography>
                  <Typography className={classes.regularFont}>
                    {enquiry.contactPhone}
                  </Typography>
                </div>
                <div className={classes.twoUnitSpace}>
                  <Typography className={classes.boldFont}>City</Typography>
                  <Typography className={classes.regularFont}>
                    {enquiry.companyCity}
                  </Typography>
                </div>
                <div className={classes.threeUnitSpace}>
                  <Typography className={classes.boldFont}>Actions</Typography>
                  <Typography>
                    <Button
                      size="small"
                      color="primary"
                      className={classes.iconBtn}
                      onClick={handleOpenEnqView(index)}
                    >
                      <ViewIcon style={{ fontSize: 25 }} />
                    </Button>
                    <Link to={`/organizations/enquiryedit/${enquiry._id}`}>
                      <Button
                        size="small"
                        color="inherit"
                        className={classes.iconBtn}
                      >
                        <EditIcon style={{ fontSize: 25 }} />
                      </Button>
                    </Link>
                  </Typography>
                </div>
              </ExpansionPanelSummary>
            </ExpansionPanel>
          );
        })}
        <div>
          <ViewEnquiry />
        </div>
      </div>
    );
  };

  const { classes, fullScreen } = props;
  const enquiries = props.enquiries.list.data;

  return <div>{isLoading ? <div>Loading ...</div> : <List />}</div>;
}

const mapStateToProps = state => ({
  enquiries: state.enquiries
});

const mapDispatchToProps = {
  getEnquiries: enquiryActions.getEnquiries,
  approveEnquiry: enquiryActions.approveEnquiry
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EnquiryList));
