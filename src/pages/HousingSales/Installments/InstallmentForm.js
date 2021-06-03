import React, { useEffect } from "react";
import { useForm, Form } from "../../../components/useForm";
import { Grid, Typography } from "@material-ui/core";
import { Controls } from "../../../components/controls/Controls";
import {useSelector,useDispatch} from "react-redux";
import {MemberActions} from "../../../actions/memberActions";
import {PhaseActions} from "../../../actions/phaseActions";
import {HouseProjectsActions} from "../../../actions/projectsActions";

const initialFvalues = {
  memberid: "",
  name:"",
  nationalid:"",
  phaseid:"",
  projectname:"",
  location:"",
  amount:"",
  account:null,
  size: null,
  numberofplots: "",
  costprice: null,
  installments: null,
};


function PurchaseForm(props) {
  const { addOrEdit, recordForEdit } = props;
  const { projectId } = props;
  const memberList = useSelector(state => state.members.members);
  const phase = useSelector(state => state.phase.phase)
  const projects = useSelector(state => state.projects.projects);
  const plots = useSelector((state) => state.plots.plots);

  console.log("phase",phase);
  console.log("projects",projects)
  const dispatch = useDispatch()
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
    const selectedphase = phase && values.phaseid !== "" ? phase.find(p => p.id === values.phaseid) : "";
    const member = memberList && values.memberid !== "" ?  memberList.find(member => member.id === values.memberid) : "";
    const project = selectedphase && projects ?  projects.find(project => project.id === selectedphase.projectId) : "";
    const selectedplots = plots && plots.length > 0 && values.phaseid !== "" ? plots.filter(plot => plot.phaseid === values.phaseid && phase.sold === false) : []; 
    values.name = member.name || "";
    values.nationalid = member.nationalid||"";
    values.account = member.accountnumber||"";
    values.projectname = project.projectname ||"";
    values.location = project.location ||"";
    values.amount = project.amount ||"";
    console.log("Plots",selectedplots)
  useEffect(() => {
    dispatch(MemberActions.getMembers());
    dispatch(PhaseActions.getPhase());
    dispatch(ProjectsActions.getProjects());
    dispatch(PlotActions.getPlot());
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
          <Controls.UnitSelect
            name="memberid"
            label="Select Member"
            value={values.memberid}
            onChange={handleInputChange}
            options={memberList}
            key={memberList.id}
            error={errors._id}
          />

          <Controls.Input
            label="Id"
            name="nationalid"
            value={values.nationalid}
            onChange={handleInputChange}
            error={errors.firstname}
          />
          <Controls.PhaseSelect
            name="phaseid"
            label="Choose Phase"
            value={values.phaseid}
            onChange={handleInputChange}
            options={phase}
            key={phase.id}
            error={errors._id}
          />
          <Controls.Input
            label="No. Plots"
            name="numberofplots"
            value={values.location}
            onChange={handleInputChange}
            error={errors.firstname}
          />

          <Controls.Input
            label="Price"
            name="amount"
            type="number"
            value={values.amount}
            onChange={handleInputChange}
            error={errors.firstname}
          />
        </Grid>

        <Grid item xs={6}>
          <Controls.Input
            label="Name"
            name="name"
            value={values.name}
            onChange={handleInputChange}
            error={errors.firstname}
          />
         <Controls.Input
            label="Account"
            name="account"
            value={values.account}
            onChange={handleInputChange}
            error={errors.firstname}
          />
           <Controls.Input
            label="Project Name"
            name="projectname"
            value={values.projectname}
            onChange={handleInputChange}
            error={errors.firstname}
          />
           <Controls.PlotSelect
            label="Plot"
            name="plotid"
            value={values.plotid}
            options={selectedplots}
            key={selectedplots.id}
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

export default PurchaseForm;
