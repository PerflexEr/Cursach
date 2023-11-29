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
  Select,
} from "@mui/material";

// import AddCircleIcon from '@mui/material';
import { addFamilyMember } from "../services/familymemberAPI";
import { addMedicine } from "../services/medicinesAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

import { medications } from "../utils/medications";
import { medicationTypes } from "../utils/medications";

const Admin = () => {
  const { familyMembers } = useContext(Context);

  useEffect(() => {
    familyMembers.fetchFamilyMembers();
  }, [familyMembers]);

  const familyMembersWithIdAndName = familyMembers._familyMembersWithIdAndName

  console.log(familyMembersWithIdAndName);

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
    expirationDate: "",
    cost: "",
    FamilyMemberId: ""
  });

  // State для истории болезни
  const [illnessData, setIllnessData] = useState({
    diagnosis: "",
    reason_for_medications: "",
    period_of_illness: "",
    medications: "",
    prescribed_by: "",
    amount_of_prescriptions: 0,
    result: "",
    note: "",
    FamilyMemberId: 0,
    MedicineUsageId: 0,
  });

  // State для использования лекарства
  const [medicineUsageData, setMedicineUsageData] = useState({
    pills_used: 0,
    result: "",
    comments: "",
    PurchaseId: 0,
  });

  // State для списка купленных лекарств
  const [purchaseData, setPurchaseData] = useState({
    medicines: [],
    FamilyMemberId: 0,
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAddFamilyMember = async () => {
    try {
      let data;
      data = await addFamilyMember(familyMemberData);
    } catch (e) {
      alert(e.response.data.message);
    }
    console.log("Adding Family Member:", familyMemberData);
  };

  const handleAddMedicine = async () => {
    try {
      let data;
      data = await addMedicine(medicineData);
    } catch (e) {
      alert(e.response.data.message);
    }
    console.log("Adding Medicine:", medicineData);
  };

  const handleAddIllness = () => {
    // Логика добавления истории болезни
    console.log("Adding Illness:", illnessData, medicineUsageData);
  };

  const handleAddMedicineUsage = () => {
    // Логика добавления использования лекарства
    console.log("Adding Medicine Usage:", medicineUsageData);
  };

  const handleAddPurchase = () => {
    // Логика добавления списка купленных лекарств
    console.log("Adding Purchase:", purchaseData);
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
                  value={medicineData.expirationDate}
                  onChange={(e) =>
                    setMedicineData({
                      ...medicineData,
                      expirationDate: e.target.value,
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
                select
                label="Select Family Member"
                variant="outlined"
                value={medicineData.FamilyMemberId}
                onChange={(e) =>
                  setMedicineData({ ...medicineData, FamilyMemberId: e.target.value })
                }
                >
                {familyMembersWithIdAndName.map((member) => (
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
            label={`Medicine used`}
            variant="outlined"
            value={illnessData.medications}
            onChange={(e) =>
              setIllnessData({ ...illnessData, medications: e.target.value })
            }
          >
            <MenuItem value="Xanax">Xanax</MenuItem>
            <MenuItem value="Lirika">Lirika</MenuItem>
            <MenuItem value="Benozepam">Benozepam</MenuItem>
          </TextField>
          <TextField
            label="Amount of pills"
            variant="outlined"
            type="number"
            value={familyMemberData.age}
            onChange={(e) =>
              setMedicineUsageData({
                ...medicineUsageData,
                pills_used: e.target.value,
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

      <TabPanel value={tabValue} index={3}>
        <Typography variant="h4">Add Medicine Usage</Typography>

        <Box style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
          <TextField
            label="Pills Used"
            variant="outlined"
            value={medicineUsageData.pills_used}
            onChange={(e) =>
              setMedicineUsageData({
                ...medicineUsageData,
                pills_used: e.target.value,
              })
            }
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddMedicineUsage}
          >
            Add Medicine Usage
          </Button>
        </Box>
      </TabPanel>
      <TabPanel value={tabValue} index={4}>
        <Typography variant="h4">Add Purchase</Typography>

        <Box style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
          <TextField
            label="MedicineId"
            variant="outlined"
            value={purchaseData.medicines[0]?.MedicineId || ""}
            onChange={(e) =>
              setPurchaseData({
                ...purchaseData,
                medicines: [{ MedicineId: e.target.value, quantity: 0 }],
              })
            }
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddPurchase}
          >
            Add Purchase
          </Button>
        </Box>
      </TabPanel>
    </Container>
  );
};

const TabPanel = (props) => {
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
};

export default Admin;