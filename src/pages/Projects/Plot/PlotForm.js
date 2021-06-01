import React, { useEffect } from "react";
import { useForm, Form } from "../../../components/useForm";
import { Grid, Typography } from "@material-ui/core";
import { Controls } from "../../../components/controls/Controls";
import {useSelector,useDispatch} from "react-redux";
import {PhaseActions } from "../../../actions/phaseActions";

const initialFvalues = {
  phaseId:"",
  totalplots: null,
  size: null,
  price: null,
  phasename:"",

};


function PlotForm(props) {
  const { addOrEdit, recordForEdit } = props;
  const {projectId} = props;

  const dispatch = useDispatch();
  const phase = useSelector(state => state.phase.phase);

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
    const newPhase = phase && phase.length > 0 ? phase.filter(phase => phase.projectId === projectId): "";
    const selectedPhase = newPhase && newPhase.length > 0 && values.phaseId !== 0 ? newPhase.find(phase => phase.id === values.phaseId) : "";
    console.log("selectedphase.../",selectedPhase)
    values.phasename =  selectedPhase ? selectedPhase.phasename : " ";
  useEffect(() => {
    dispatch(PhaseActions.getPhase());
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
          <Controls.PhaseSelect
            label="Phase"
            name="phaseId"
            value={values.phaseId}
            options={newPhase}
            key={newPhase.id}
            onChange={handleInputChange}
            error={errors.firstname}
          />
          <Controls.Input
            label="price"
            name="price"
            type="number"
            value={values.price}
            onChange={handleInputChange}
            error={errors.firstname}
          />
        </Grid>

        <Grid item xs={6}>
          <Controls.Input
            label="Size"
            name="size"
            type="number"
            value={values.size}
            onChange={handleInputChange}
            error={errors.firstname}
    />
       <Controls.Input
            label="totalplots"
            name="totalplots"
            type="number"
            value={values.totalplots}
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

export default PlotForm;
