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
const branchList = [
  { id: "Ruiru(Main)", title: "Ruiru(Main)" },
  { id: "Malindi", title: "Malindi" },
  { id: "GilGil", title: "GilGil" },
];
const initialFvalues = {
  accounttype: "",
  firstname: "",
  middlename: "",
  surname: "",
  accountnumber: null,
  name: "",
  nationalid: "",
  krapin: "",
  gender: "",
  maritalstatus: "",
  dateofbirth: new Date(),
  country: "",
  estate: "",
  email: "",
  contact: "",
  alternativecontact: "",
  agentname: "",
  branch: "",
};

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function PersonalInformationForm(props) {
  const { addOrEdit, recordForEdit } = props;

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
      let name =
        values.firstname + " " + values.middlename + " " + values.surname;
      console.log({ ...values, name }, "values");
      addOrEdit({ ...values, name }, resetForm);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={4}>
          <Controls.Select
            name="accounttype"
            label="Account Type"
            value={values.accounttype}
            onChange={handleInputChange}
            options={accounts}
            key={accounts.title}
            error={errors._id}
          />
          <Controls.Input
            label="MiddleName"
            name="middlename"
            value={values.middlename}
            onChange={handleInputChange}
            error={errors.firstname}
          />
          <Controls.RadioGroup
            label="Gender"
            name="gender"
            value={values.gender}
            onChange={handleInputChange}
            items={genderItems}
          />

          <Controls.Input
            label="National Id"
            name="nationalid"
            value={values.nationalid}
            onChange={handleInputChange}
            error={errors.firstname}
          />
          <Controls.DatePickers
            name="dateofbirth"
            label="Date Of Birth"
            value={values.from}
            onChange={handleInputChange}
          />
          <Controls.Input
            label="alternativecontact"
            name="alternativecontact"
            value={values.alternativecontact}
            onChange={handleInputChange}
            error={errors.firstname}
          />
        </Grid>

        <Grid item xs={4}>
          <Controls.Input
            label="Member Number"
            name="accountnumber"
            value={values.accountnumber}
            onChange={handleInputChange}
            error={errors.firstname}
          />
          <Controls.Input
            label="Surname"
            name="surname"
            value={values.surname}
            onChange={handleInputChange}
            error={errors.firstname}
          />
          <Controls.RadioGroup
            label="Marital Status"
            name="maritalstatus"
            value={values.maritalstatus}
            onChange={handleInputChange}
            items={maritalStatusItems}
          />

          <Controls.Input
            label="KRA PIN"
            name="krapin"
            value={values.krapin}
            onChange={handleInputChange}
            error={errors.firstname}
          />

          <Controls.Input
            label="Estate"
            name="estate"
            value={values.estate}
            onChange={handleInputChange}
            error={errors.firstname}
          />
          <Controls.Input
            label="Agent Name"
            name="agentname"
            value={values.agentname}
            onChange={handleInputChange}
            error={errors.firstname}
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.Input
            label="First Name"
            name="firstname"
            value={values.firstname}
            onChange={handleInputChange}
            error={errors.firstname}
          />

          <Controls.Input
            label="Country"
            name="country"
            value={values.country}
            onChange={handleInputChange}
            error={errors.firstname}
          />
          <Controls.Input
            label="Email"
            name="email"
            value={values.email}
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
          <Controls.Select
            name="branch"
            label="Branch"
            value={values.branch}
            onChange={handleInputChange}
            options={branchList}
            key={branchList.title}
            error={errors._id}
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

export default PersonalInformationForm;
