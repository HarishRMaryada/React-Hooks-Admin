import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Field,
  FieldArray,
  reduxForm,
  formValueSelector,
  getFormValues
} from "redux-form";
import APIConfig from "../../../../Api/constants";

//material ui
import { withStyles } from "@material-ui/core/styles";
import { Paper, Button, Grid } from "@material-ui/core";
import CrossIcon from "@material-ui/icons/Clear";
import AddIcon from "@material-ui/icons/Add";

//custom styles
import styles from "../../products.styles";

//input
import SelectField from "../../../../Common/Inputs/SelectField";
import TextField from "../../../../Common/Inputs/TextField";
import FileInput from "../../../../Common/Inputs/FileField";

function InventoryManagement(props) {
  const [readOnly] = useState(false);
  const [colors] = useState([
    "Blue",
    "Green",
    "Grey",
    "Orange",
    "Purple",
    "Pink",
    "Red",
    "White",
    "Yellow",
    "Silver",
    "Golden",
    "Brown"
  ]);

  const { classes } = props;

  let inventoryContent = (
    <Paper className={classes.formRootPaper}>
      <div className={classes.heading}>
        <h3>Inventory Management</h3>
      </div>
      <div>
        <FieldArray
          name="colors"
          component={RenderColors}
          classes={classes}
          readOnly={readOnly}
          colors={colors}
          colorsValues={props.Productvalues ? props.Productvalues.colors : ""}
        />
      </div>
    </Paper>
  );
  return inventoryContent;
}

const RenderColors = props => {
  const { fields, classes, readOnly, colors, colorsValues } = props;
  if (fields.length < 1) fields.push();
  return (
    <div>
      {fields.map((color, index) => {
        return (
          <div key={index} style={{ borderStyle: "groove" }}>
            <Grid container spacing={24}>
              <Grid item xs={11}>
                <Field
                  className={classes.textBase}
                  name={`${color}.name`}
                  component={SelectField}
                  label="Color"
                  disabled={readOnly}
                >
                  {colors.map(color => (
                    <option value={color} key={color}>
                      {color}
                    </option>
                  ))}
                </Field>
                <Field
                  className={classes.textBase}
                  name={`${color}.specifyColor`}
                  component={TextField}
                  label="Color Display Name"
                  disabled={readOnly}
                />
                <Field
                  className={classes.textBase}
                  name={`${color}.quantity`}
                  component={TextField}
                  label="Quantity"
                  disabled
                />
                <FieldArray
                  name={`${color}.images`}
                  component={RenderImages}
                  colorIndex={index}
                  imagesValue={colorsValues ? colorsValues[index] : ""}
                />
              </Grid>
              <Grid item xs={1}>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => fields.remove(index)}
                  disabled={readOnly || index === 0}
                >
                  <CrossIcon style={{ fontSize: 25 }} />
                </Button>
                {index === fields.length - 1 ? (
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => fields.push()}
                    disabled={readOnly}
                  >
                    <AddIcon />
                  </Button>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
          </div>
        );
      })}
    </div>
  );
};

const RenderImages = props => {
  //hooks
  const [newImageUrl, setNewImageUrl] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState();
  useEffect(() => {
    if (imagesValue && imagesValue.images) {
      imagesValue.images.forEach((ele, imgIndex) => {
        if (imgIndex === currentImageIndex) {
          imagesValue.images[imgIndex] = newImageUrl;
        }
      });
    }
  }, [newImageUrl]);

  const uploadImages = (values, index) => {
    if (values) {
      setCurrentImageIndex(index);
      const data = new FormData();
      data.append("file", values);

      fetch(APIConfig.cdnHostname, {
        method: "POST",
        body: data
      })
        .then(response => response.json())
        .then(response => {
          let filesUrl = [];
          response.files.forEach((ele, i) => {
            filesUrl[i] = ele.location;
          });
          setNewImageUrl(filesUrl[0]);
        });
    }
  };

  const { fields, imagesValue } = props;
  if (fields.length < 1) fields.push();

  let imageUploadContent = (
    <Grid container spacing={22}>
      {fields.map((image, index) => {
        return (
          <Grid item xs={2} key={index}>
            {imagesValue &&
            imagesValue.images[index] &&
            !(imagesValue.images[index].image && !newImageUrl) ? (
              <Grid container spacing={22}>
                <Grid item xs={6}>
                  <img
                    src={
                      imagesValue.images[index] &&
                      imagesValue.images[index].image
                        ? newImageUrl
                        : imagesValue.images[index]
                    }
                    style={{ width: 150, height: 150 }}
                    alt={"logo"}
                  />
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => fields.remove(index)}
                  >
                    Delete <CrossIcon />
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  {index === fields.length - 1 &&
                  imagesValue.images[index] &&
                  !(imagesValue.images[index].image && !newImageUrl) ? (
                    <Button onClick={() => fields.push()}>
                      Add <AddIcon />
                    </Button>
                  ) : (
                    ""
                  )}
                </Grid>
              </Grid>
            ) : (
              <Grid item xs={2}>
                <Field
                  name={`${image}.image`}
                  component={FileInput}
                  type="file"
                  imageIndex={index}
                  imagesValue={imagesValue}
                />
                {imagesValue.images[index] &&
                  imagesValue.images[index].image && (
                    <Button
                      onClick={() =>
                        uploadImages(imagesValue.images[index].image, index)
                      }
                    >
                      Upload
                    </Button>
                  )}
              </Grid>
            )}
          </Grid>
        );
      })}
    </Grid>
  );
  return imageUploadContent;
};

let InventoryManagementForm = reduxForm({
  form: "ProductForm", // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
  // validate
})(InventoryManagement);

const mapDispatchToProps = {};

const selector = formValueSelector("ProductForm");

InventoryManagementForm = connect(
  state => ({
    colorsValue: selector(state, "colors"),
    Productvalues: getFormValues("ProductForm")(state)
  }),
  mapDispatchToProps
)(InventoryManagementForm);
export default withStyles(styles)(InventoryManagementForm);
