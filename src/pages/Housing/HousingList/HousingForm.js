import React, { useEffect } from "react";
import { useForm, Form } from "../../../components/useForm";
import { Grid, Typography } from "@material-ui/core";
import { Controls } from "../../../components/controls/Controls";
import { useSelector, useDispatch } from "react-redux";

const initialFvalues = {
  projectname: "",
  numberofunits: "",
  projectnumber: "",
  location: "",
};

function HousingForm(props) {
  const { addOrEdit, recordForEdit } = props;
  const members = useSelector((state) => state.members.members);
  const dispatch = useDispatch();

  const validate = (fieldvalues = values) => {
    let temp = { ...errors };
    if ("projectname" in fieldvalues) {
      temp.projectname = fieldvalues.projectname
        ? ""
        : "This Field is required";
    }
    if ("umberofunits" in fieldvalues)
      temp.umberofunits = fieldvalues.umberofunits
        ? ""
        : "This Field is required";

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
      console.log(values, "values");
      addOrEdit(values, resetForm);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            label="Project Name"
            name="projectname"
            value={values.projectname}
            onChange={handleInputChange}
            error={errors.projectname}
          />
          <Controls.Input
            label="Number Of Units"
            name="numberofunits"
            type="number"
            value={values.numberofunits}
            onChange={handleInputChange}
            error={errors.numberofunits}
          />
        </Grid>

        <Grid item xs={6}>
          <Controls.Input
            label="Project Number"
            name="projectnumber"
            value={values.projectnumber}
            onChange={handleInputChange}
            error={errors.projectnumber}
          />
          <Controls.Input
            label="Location"
            name="location"
            value={values.location}
            onChange={handleInputChange}
            error={errors.location}
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

export default HousingForm;
