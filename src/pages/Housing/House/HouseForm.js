import React, { useEffect } from "react";
import { useForm, Form } from "../../../components/useForm";
import { Grid, Typography } from "@material-ui/core";
import { Controls } from "../../../components/controls/Controls";
const floors = [
    {id:"Ground floor",title:"Ground floor"},
    {id:"first floor",title:"First floor"},
    {id:"second floor",title:"Second floor"}
]
const initialFvalues = {
    housenumber:null,
    numberofbedrooms:null,
    price:null,
    bookingfees:null,
    balance:null,
    floor:"",
    plotnumber:null
};


function HouseForm(props) {
  const { addOrEdit, recordForEdit } = props;
  const { projectId } = props;
  const validate = (fieldvalues = values) => {
    let temp = { ...errors };
    if ("housenumber" in fieldvalues) {
      temp.housenumber = fieldvalues.housenumber ? "" : "This Field is required";
    }
    if ("projectNumber" in fieldvalues)
      temp.projectNumber = fieldvalues.projectNumber ? "" : "Enter a Number";
    if ("numberOfUnits" in fieldvalues)
      temp.numberOfUnits = fieldvalues.numberOfUnits ? "" : "Enter a Number";

    setErrors({
      ...temp,
    });
    if (fieldvalues === values)
      return Object.values(temp).every((x) => x === "");
  };
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFvalues, true, validate);

  useEffect(() => {
    if (recordForEdit !== null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log({ ...values, projectId }, "values");
      addOrEdit({ ...values, projectId }, resetForm);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            label="House Number"
            name="housenumber"
            value={values.housenumber}
            onChange={handleInputChange}
            error={errors.housenumber}
          />

          <Controls.Input
            label="No. Bedrooms"
            name="numberofbedrooms"
            type="number"
            value={values.numberofbedrooms}
            onChange={handleInputChange}
            error={errors.housenumber}
          />
         <Controls.Input
            label="Booking Fees (Optional)"
            name="bookingfees"
            type="number"
            value={values.bookingfees}
            onChange={handleInputChange}
            error={errors.housenumber}
          />
        </Grid>

        <Grid item xs={6}>
        <Controls.Input
            label="Plot Number"
            name="plotnumber"
            value={values.plotnumber}
            onChange={handleInputChange}
            error={errors.housenumber}
          />
        <Controls.Input
            label="Price"
            name="price"
            type="number"
            value={values.price}
            onChange={handleInputChange}
            error={errors.housenumber}
          />
           <Controls.Select
            label="Select Floor (Optional)"
            name="floor"
            value={values.floor}
            options={floors}
            key={floors.id}
            onChange={handleInputChange}
            error={errors.housenumber}
          />
          
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={8}></Grid>
        <Grid item xs={4}>
          <div>
            <Controls.Button text="Submit" type="submit" />
            <Controls.Button text="Reset" onClick={resetForm} color="default" />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}

export default HouseForm;
