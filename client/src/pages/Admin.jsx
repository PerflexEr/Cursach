import React, { useState , useContext , useEffect } from "react";
import {
  Container,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  Button,
  InputLabel,
  useMediaQuery,
  useTheme,
  Snackbar,
  Alert
} from "@mui/material";

import { addFamilyMember } from "../services/familymemberAPI";
import { addMedicine } from "../services/medicinesAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { medications } from "../utils/medications";
import { medicationTypes } from "../utils/medications";
import { addillnes } from "../services/illnesAPI";

import AdminTextField from '../components/AdminComp/AdminTextField'

 
const Admin = observer(() => {
  const { familyMembers } = useContext(Context);
  const { medicines } = useContext(Context)
  const {illnes} = useContext(Context)

  useEffect(() => {
    familyMembers.fetchFamilyMembers();
    medicines.fetchMedicines()
    illnes.fetchIllneses()
  }, [familyMembers, medicines, illnes]);
  
  const [tabValue, setTabValue] = useState(0);
  const [open, setOpen] = useState(false);

  const [familyMemberData, setFamilyMemberData] = useState({
    name: "",
    age: "",
    status: "",
    familyMemberName: "",
  });


  const [medicineData, setMedicineData] = useState({
    name: "",
    type: "",
    expiration_date: "",
    cost: "",
    amount: "",
    FamilyMemberId: ""
  });


  const [illnessData, setIllnessData] = useState({
    "diagnosis": "",
    "reason_for_medications": "",
    "period_of_illness": "",
    "prescribed_by": "",
    "amount_of_pills": "",
    "result": "",
    "note": "",
    "FamilyMemberId": "",
    "MedicineId": "",
  });


  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAddFamilyMember = async () => {
    try {
      await addFamilyMember(familyMemberData);
      familyMembers.fetchFamilyMembers();
      medicines.fetchMedicines()
      illnes.fetchIllneses()
      setOpen(true);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  const handleAddMedicine = async () => {
    try {
      await addMedicine(medicineData);
      familyMembers.fetchFamilyMembers();
      medicines.fetchMedicines()
      illnes.fetchIllneses()
      setOpen(true);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  const handleAddIllness = async () => {
    try {
      await addillnes(illnessData);
      familyMembers.fetchFamilyMembers();
      medicines.fetchMedicines()
      illnes.fetchIllneses()
      setOpen(true);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container>
      <AppBar
        position="static"
        sx={{ marginTop: "20px", borderRadius: "10px" }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant={isSmallScreen ? "fullWidth" : "standard"}
          centered={!isSmallScreen}
        >
          <Tab label="Add Family Member" style={{ color: "white" }} />
          <Tab label="Add Medicine" style={{ color: "white" }} />
          <Tab label="Add Illness" style={{ color: "white" }} />
        </Tabs>
      </AppBar>
      <TabPanel value={tabValue} index={0}>
        <Typography variant="h4">Add Family Member</Typography>
        <Box style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
          <AdminTextField label="Name" state={familyMemberData} statePar="name" stateFunc={setFamilyMemberData}/>
          <AdminTextField label="Age" state={familyMemberData} statePar="age" stateFunc={setFamilyMemberData} type="number"/>
          <AdminTextField label="Status" state={familyMemberData} statePar="status" stateFunc={setFamilyMemberData}/>
          <Button variant="contained" color="primary" onClick={handleAddFamilyMember}>
            Add Family Member
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Family member added
            </Alert>
          </Snackbar>
        </Box>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Box display={"grid"} >
          <Box>
            <Typography variant="h4">Add Medicine</Typography>
            <Box style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
              <AdminTextField label="Medicine name" state={medicineData} statePar="name" stateFunc={setMedicineData} type="select" options={medications.map(medication => ({value: medication, label: medication}))}/>
              <AdminTextField label="Medicine type" state={medicineData} statePar="type" stateFunc={setMedicineData} type="select" options={medicationTypes.map(medication => ({value: medication, label: medication}))}/>
              <Box>
                <InputLabel htmlFor="expiration-date" sx={{ fontSize: "14px" }}>
                  Expiration Date
                </InputLabel>
                <AdminTextField state={medicineData} statePar="expiration_date" stateFunc={setMedicineData} type="date"/>
              </Box>
              <AdminTextField label="Cost" state={medicineData} statePar="cost" stateFunc={setMedicineData} type="number"/>
              <AdminTextField label="Amount" state={medicineData} statePar="amount" stateFunc={setMedicineData} type="number"/>
              <AdminTextField label="Select Family Member" state={medicineData} statePar="FamilyMemberId" stateFunc={setMedicineData} type="select" options={familyMembers._familyMembers.map(member => ({value: member.id, label: member.name}))}/>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddMedicine}
              >
                Add Medicine
              </Button>
              <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                  Medicine added
                </Alert>
               </Snackbar>
            </Box>
            
          </Box>
        </Box>
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <Typography variant="h4">Add Illness</Typography>
        <Box style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
          <AdminTextField label="Diagnosis" state={illnessData} statePar="diagnosis" stateFunc={setIllnessData}/>
          <AdminTextField label="Reason for Medications" state={illnessData} statePar="reason_for_medications" stateFunc={setIllnessData}/>
          <Box>
            <InputLabel htmlFor="expiration-date" sx={{ fontSize: "14px" }}>
              Start of Illnes
            </InputLabel>
            <AdminTextField state={illnessData} statePar="period_of_illness" stateFunc={setIllnessData} type="date"/>
          </Box>
          <AdminTextField label="Select Family Member" state={illnessData} statePar="FamilyMemberId" stateFunc={setIllnessData} type="select" options={familyMembers._familyMembers.map(member => ({value: member.id, label: member.name}))}/>
          <AdminTextField label="Select Medicine" state={illnessData} statePar="MedicineId" stateFunc={setIllnessData} type="select" options={medicines._medicines.map(medicine => ({value: medicine.id, label: medicine.name}))}/>
          <AdminTextField label="Amount of Pills" state={illnessData} statePar="amount_of_pills" stateFunc={setIllnessData} type="number"/>
          <AdminTextField label="Presctibed by" state={illnessData} statePar="prescribed_by" stateFunc={setIllnessData} type="select" options={[{value: 'DrSidorov', label: 'Dr. Сидоров С.О.'}, {value: 'DrIvanov', label: 'Dr. Иванов И.И.'}, {value: 'DrPetrov', label: 'Dr. Петров П.П.'}]}/>
          <AdminTextField label="Result" state={illnessData} statePar="result" stateFunc={setIllnessData} type="select" options={[{value: 'Помогло', label: 'Помогло'}, {value: 'Не помогло', label: 'Не помогло'}, {value: 'Побочки', label: 'Есть побочки'}]}/>
          <AdminTextField label="Note" state={illnessData} statePar="note" stateFunc={setIllnessData}/>
          <Button variant="contained" color="primary" onClick={handleAddIllness}>
            Add Illness
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Illness added
            </Alert>
          </Snackbar>
        </Box>
      </TabPanel>
    </Container>
  );
});

const TabPanel = observer((props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      style={{ display: "flex", gap: "20px" }}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
});

export default Admin;