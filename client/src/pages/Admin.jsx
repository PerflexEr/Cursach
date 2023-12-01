import React, { useState , useContext , useEffect } from "react";
import {
  Container,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  TextField,
  Button,
  InputLabel,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";

// import AddCircleIcon from '@mui/material';
import { addFamilyMember } from "../services/familymemberAPI";
import { addMedicine } from "../services/medicinesAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { medications } from "../utils/medications";
import { medicationTypes } from "../utils/medications";
import { addillnes } from "../services/illnesAPI";


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
  
  
  // State для члена семьи
  const [familyMemberData, setFamilyMemberData] = useState({
    name: "",
    age: "",
    status: "",
    familyMemberName: "",
  });

  // State для лекарства
  const [medicineData, setMedicineData] = useState({
    name: "",
    type: "",
    expiration_date: "",
    cost: "",
    amount: "",
    FamilyMemberId: ""
  });

  // State для истории болезни
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

    } catch (e) {
      alert(e.response.data.message);
    }
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
          <TextField
            label="Name"
            variant="outlined"
            value={familyMemberData.name}
            onChange={(e) =>
              setFamilyMemberData({ ...familyMemberData, name: e.target.value })
            }
          />
          <TextField
            label="Age"
            variant="outlined"
            type="number"
            value={familyMemberData.age}
            onChange={(e) =>
              setFamilyMemberData({ ...familyMemberData, age: e.target.value })
            }
          />
          <TextField
            label="Status"
            variant="outlined"
            value={familyMemberData.status}
            onChange={(e) =>
              setFamilyMemberData({
                ...familyMemberData,
                status: e.target.value,
              })
            }
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddFamilyMember}
          >
            Add Family Member
          </Button>
        </Box>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Box display={"grid"} >
          <Box>
            <Typography variant="h4">Add Medicine</Typography>
            <Box
              style={{ display: "flex", gap: "20px", flexDirection: "column" }}
            >
              <TextField
                select
                label={`Medicine name`}
                variant="outlined"
                value={medicineData.name}
                onChange={(e) =>
                  setMedicineData({ ...medicineData, name: e.target.value })
                }
              >
                {medications.map((medication) => (
                  <MenuItem key={medication} value={medication}>
                    {medication}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label={`Medicine type`}
                variant="outlined"
                value={medicineData.type}
                onChange={(e) =>
                  setMedicineData({ ...medicineData, type: e.target.value })
                }
              >
                {medicationTypes.map((medication) => (
                  <MenuItem key={medication} value={medication}>
                    {medication}
                  </MenuItem>
                ))}
              </TextField>
              <Box>
                <InputLabel htmlFor="expiration-date" sx={{ fontSize: "14px" }}>
                  Expiration Date
                </InputLabel>
                <TextField
                  variant="outlined"
                  type="date"
                  value={medicineData.expiration_date}
                  onChange={(e) =>
                    setMedicineData({
                      ...medicineData,
                      expiration_date: e.target.value,
                    })
                  }
                />
              </Box>
              <TextField
                label="Cost"
                variant="outlined"
                type="number"
                value={medicineData.cost}
                onChange={(e) =>
                  setMedicineData({ ...medicineData, cost: e.target.value })
                }
              />
              <TextField
                label="Amount"
                variant="outlined"
                type="number"
                value={medicineData.amount}
                onChange={(e) =>
                  setMedicineData({ ...medicineData, amount: e.target.value })
                }
              />
              <TextField
                select
                label="Select Family Member"
                variant="outlined"
                value={medicineData.FamilyMemberId}
                onChange={(e) =>
                  setMedicineData({ ...medicineData, FamilyMemberId: e.target.value })
                }
                >
                {familyMembers._familyMembers.map((member) => (
                    <MenuItem key={member.id} value={member.id}>
                    {member.name}
                    </MenuItem>
                ))}
              </TextField>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddMedicine}
              >
                Add Medicine
              </Button>
            </Box>
            
          </Box>
        </Box>
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <Typography variant="h4">Add Illness</Typography>
        <Box style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
          <TextField
            label="Diagnosis"
            variant="outlined"
            value={illnessData.diagnosis}
            onChange={(e) =>
              setIllnessData({ ...illnessData, diagnosis: e.target.value })
            }
          />
          <TextField
            label="Reason for Medications"
            variant="outlined"
            value={illnessData.reason_for_medications}
            onChange={(e) =>
              setIllnessData({
                ...illnessData,
                reason_for_medications: e.target.value,
              })
            }
          />
          <Box>
            <InputLabel htmlFor="expiration-date" sx={{ fontSize: "14px" }}>
              Start of Illnes
            </InputLabel>
            <TextField
              variant="outlined"
              type="date"
              value={illnessData.period_of_illness}
              onChange={(e) =>
                setIllnessData({
                  ...illnessData,
                  period_of_illness: e.target.value,
                })
              }
            />
          </Box>
          <TextField
              select
              label="Select Family Member"
              variant="outlined"
              value={illnessData.FamilyMemberId}
              onChange={(e) =>
                setIllnessData({ ...illnessData, FamilyMemberId: e.target.value })
              }
              >
              {familyMembers._familyMembers.map((member) => (
                  <MenuItem key={member.id} value={member.id}>
                  {member.name}
                  </MenuItem>
              ))}
          </TextField>
            <TextField
              select
              label="Select Medicine"
              variant="outlined"
              value={illnessData.MedicineId}
              onChange={(e) =>
                setIllnessData({ ...illnessData, MedicineId: e.target.value })
              }
              >
              {medicines._medicines.map((medicine) => (
                  <MenuItem key={medicine.id} value={medicine.id}>
                  {medicine.name}
                  </MenuItem>
              ))}
          </TextField>
          <TextField
              variant="outlined"
              type="number"
              label="Amount of Pills"
              value={illnessData.amount_of_pills}
              onChange={(e) =>
                setIllnessData({
                  ...illnessData,
                  amount_of_pills: e.target.value,
                })
              }
            />
          <TextField
            select
            label={`Presctibed by`}
            variant="outlined"
            value={illnessData.prescribed_by}
            onChange={(e) =>
              setIllnessData({ ...illnessData, prescribed_by: e.target.value })
            }
          >
            <MenuItem value="DrSidorov">Dr. Сидоров С.О.</MenuItem>
            <MenuItem value="DrIvanov">Dr. Иванов И.И.</MenuItem>
            <MenuItem value="DrPetrov">Dr. Петров П.П.</MenuItem>
          </TextField>

          <TextField
            select
            label={`Result`}
            variant="outlined"
            value={illnessData.result}
            onChange={(e) =>
              setIllnessData({ ...illnessData, result: e.target.value })
            }
          >
            <MenuItem value="Помогло">Помогло</MenuItem>
            <MenuItem value="Не помогло">Не помогло</MenuItem>
            <MenuItem value="Побочки">Есть побочки</MenuItem>
          </TextField>

          <TextField
            label="Note"
            variant="outlined"
            value={illnessData.note}
            onChange={(e) =>
              setIllnessData({ ...illnessData, note: e.target.value })
            }
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddIllness}
          >
            Add Illness
          </Button>
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