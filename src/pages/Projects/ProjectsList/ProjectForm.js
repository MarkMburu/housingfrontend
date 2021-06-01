import React, { useEffect } from "react";
import { useForm, Form } from "../../../components/useForm";
import { Grid, Typography } from "@material-ui/core";
import { Controls } from "../../../components/controls/Controls";
import { useSelector, useDispatch } from "react-redux";
import { MemberActions } from "../../../actions/memberActions";

const initialFvalues = {
  lronumber: "",
  projectname: "",
  size: "",
  creditorId: "",
  location: "",
  accountnumber: "",
  nationalid: "",
  address: "",
  name: "",     
  amount: "",
};

function ProjectForm(props) {
  const { addOrEdit, recordForEdit } = props;
  const members = useSelector((state) => state.members.members);
  const dispatch = useDispatch();

  const validate = (fieldvalues = values) => {
    let temp = { ...errors };
    if ("lronumber" in fieldvalues) {
      temp.lronumber = fieldvalues.lronumber ? "" : "This Field is required";
    }
    if ("projectname" in fieldvalues)
      temp.projectname = fieldvalues.projectname
        ? ""
        : "This Field is required";
    if ("name" in fieldvalues)
      temp.name = fieldvalues.name ? "" : "This field is required";
    if ("size" in fieldvalues)
      temp.size = fieldvalues.size ? "" : "Enter a Number";
    if ("location" in fieldvalues)
      temp.location = fieldvalues.location ? "" : "This field is required";
    if ("accountnumber" in fieldvalues)
      temp.accountnumber = fieldvalues.accountnumber
        ? ""
        : "This field is required";
    if ("nationalid" in fieldvalues)
      temp.nationalid = fieldvalues.nationalid ? "" : "This field is required";
    if ("amount" in fieldvalues)
      temp.amount = fieldvalues.amount ? "" : "Enter a Number";
    if ("address" in fieldvalues)
      temp.address = fieldvalues.address ? "" : "This field is required";
    setErrors({
      ...temp,
    });
    if (fieldvalues === values)
      return Object.values(temp).every((x) => x === "");
  };
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFvalues, true, validate);
    const member = values.creditorId !== "" ?  members.find(member => member.id === values.creditorId) : ""
    values.name = member.name || "";
    values.nationalid = member.nationalid||"";
    values.accountnumber = member.accountnumber||"";
    values.address = member.estate || "";
  useEffect(() => {
    dispatch(MemberActions.getMembers());
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
            label="LRO NO:"
            name="lronumber"
            value={values.lronumber}
            onChange={handleInputChange}
            error={errors.lronumber}
          />
          <Controls.Input
            label="ProjectName"
            name="projectname"
            value={values.projectname}
            onChange={handleInputChange}
            error={errors.projectname}
          />
        </Grid>

        <Grid item xs={6}>
          <Controls.Input
            label="Size"
            name="size"
            value={values.size}
            onChange={handleInputChange}
            error={errors.size}
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
      <Typography variant="h6" gutterBottom>
        Creditor Information
      </Typography>

      <Grid container>
        <Grid item xs={4}>
          <Controls.UnitSelect
            name="creditorId"
            label="FullName"
            value={values.creditorId}
            onChange={handleInputChange}
            options={members}
            key={members.id}
            error={errors._id}
          />
          <Controls.Input
            label="Name: "
            name="name"
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}
          />
        </Grid>

        <Grid item xs={4}>
          <Controls.Input
            label="Account No: "
            name="accountnumber"
            value={values.accountnumber}
            onChange={handleInputChange}
            error={errors.accountnumber}
          />
          <Controls.Input
            label="Address: "
            name="address"
            value={values.address}
            onChange={handleInputChange}
            error={errors.address}
          />
        </Grid>

        <Grid item xs={4}>
          <Controls.Input
            label="ID No: "
            name="nationalid"
            value={values.nationalid}
            onChange={handleInputChange}
            error={errors.nationalid}
          />
          <Controls.Input
            label="Amount"
            name="amount"
            value={values.amount}
            onChange={handleInputChange}
            error={errors.amount}
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

export default ProjectForm;
