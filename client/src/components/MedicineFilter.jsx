// MedicineFilter.jsx
import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { medicationTypes } from '../utils/medications';
import TypeTextField from './TypeTextField';

const MedicineFilter = ({ onFilterChange, selectedMedicine, setSelectedMedicine }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleToggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleFilterClick = (filter) => {
    onFilterChange(filter);
    setDrawerOpen(false);
  };

  const handleMedicineTypeChange = (event) => {
    setSelectedMedicine({ medicineType: event.target.value });
  };

  return (
    <>
      <IconButton onClick={handleToggleDrawer}>
        <FilterListIcon />
      </IconButton>
      <Drawer anchor="left" open={drawerOpen} onClose={handleToggleDrawer}>
        <Box
          sx={{
            width: 250,
            display: 'flex',
            flexDirection: 'column',
            padding: '16px',
          }}
        >
          <List>
            <ListItem onClick={() => handleFilterClick('All')}>
              <ListItemText primary="All" style={{ cursor: 'pointer' }} />
            </ListItem>
            <ListItem onClick={() => handleFilterClick('expired')}>
              <ListItemText primary="Expired" style={{ cursor: 'pointer' }} />
            </ListItem>
            <ListItem onClick={() => handleFilterClick('Already used')}>
              <ListItemText primary="Already used" style={{ cursor: 'pointer' }} />
            </ListItem>
            <ListItem onClick={() => handleFilterClick('Type')}>
              <TypeTextField
                label="Type"
                state={selectedMedicine}
                statePar="medicineType"
                stateFunc={setSelectedMedicine}
                type="select"
                options={medicationTypes.map((medication) => ({ value: medication, label: medication }))}
                onChange={handleMedicineTypeChange}
              />
            </ListItem>
          </List>
          <Divider />
        </Box>
      </Drawer>
    </>
  );
};

export default MedicineFilter;