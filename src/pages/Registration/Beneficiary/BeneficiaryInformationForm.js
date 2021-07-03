import React, { useEffect } from "react";
import { useForm, Form } from "../../../components/useForm";
import { Grid, Typography } from "@material-ui/core";
import { Controls } from "../../../components/controls/Controls";

const genderItems = [
  { id: "male", title: "Male" },
  { id: "Female", title: "Female" },
];
const maritalStatusItems = [
  { id: "single", title: "Single" },
  { id: "Married", title: "Married" },
];

const accounts = [
  { id: "Personal Account", title: "Personal Account" },
  { id: "Joint Account", title: "Joint Account" },
  { id: "Company Organization", title: "Company Organization" },
  { id: "Registered Groups", title: "Registered Groups" },
];

const initialFvalues = {
  firstname: "",
  middlename: "",
  surname: "",
  nationalid: "",
  email: "",
  contact: "",
  allocation: "",
};

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function BeneficiaryInformationForm(props) {
  const { addOrEdit, recordForEdit } = props;
  const { memberId } = props;
  console.log(memberId)
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
      console.log({ ...values, memberId }, "values");
      addOrEdit({ ...values, memberId }, resetForm);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            label="SurName"
            name="surname"
            value={values.surname}
            onChange={handleInputChange}
            error={errors.firstname}
          />
          <Controls.Input
            label="MiddleName"
            name="middlename"
            value={values.middlename}
            onChange={handleInputChange}
            error={errors.firstname}
          />

          <Controls.Input
            label="Contact"
            name="contact"
            value={values.contact}
            onChange={handleInputChange}
            error={errors.firstname}
          />
        </Grid>

        <Grid item xs={6}>
          <Controls.Input
            label="First Name"
            name="firstname"
            value={values.firstname}
            onChange={handleInputChange}
            error={errors.firstname}
          />
          <Controls.Input
            label="National Id"
            name="nationalid"
            value={values.nationalid}
            onChange={handleInputChange}
            error={errors.firstname}
          />
          <Controls.Input
            label="Allocation"
            name="allocation"
            value={values.allocation}
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

export default BeneficiaryInformationForm;
