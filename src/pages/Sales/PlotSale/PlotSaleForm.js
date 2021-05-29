import React, { useEffect } from "react";
import { useForm, Form } from "../../../components/useForm";
import { Grid, Typography } from "@material-ui/core";
import { Controls } from "../../../components/controls/Controls";

const initialFvalues = {
  phasename: "",
  size: null,
  numberofplots: "",
  costprice: null,
  installments: null,
};


function PlotSaleForm(props) {
  const { addOrEdit, recordForEdit } = props;
  const { projectId } = props;
  const validate = (fieldvalues = values) => {
    let temp = { ...errors };
    if ("firstname" in fieldvalues) {
      temp.firstname = fieldvalues.firstname ? "" : "This Field is required";
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
            label="Phase Name"
            name="phasename"
            value={values.phasename}
            onChange={handleInputChange}
            error={errors.firstname}
          />
          <Controls.Input
            label="Receipt Description(Purchase)"
            name="purchase"
            value={"Purchase Of"}
            onChange={handleInputChange}
            error={errors.firstname}
          />

          <Controls.Input
            label="No. Plots"
            name="numberofplots"
            type="number"
            value={values.numberofplots}
            onChange={handleInputChange}
            error={errors.firstname}
          />
          <Controls.Input
            label="Price"
            name="price"
            type="number"
            value={values.costprice / values.installments}
            onChange={handleInputChange}
            error={errors.firstname}
          />
        </Grid>

        <Grid item xs={6}>
          <Controls.Input
            label="Size(Acres)"
            name="size"
            type="number"
            value={values.size}
            onChange={handleInputChange}
            error={errors.firstname}
          />
         <Controls.Input
            label="Receipt Description(Installment)"
            name="installment"
            value={values.purchase || "Installment Payment of "}
            onChange={handleInputChange}
            error={errors.firstname}
          />
           <Controls.Input
            label="Cost Price(per Plot)"
            name="costprice"
            type="number"
            value={values.costprice}
            onChange={handleInputChange}
            error={errors.firstname}
          />
           <Controls.Input
            label="Installments"
            name="installments"
            type="number"
            value={values.installments}
            onChange={handleInputChange}
            error={errors.firstname}
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

export default PlotSaleForm;
