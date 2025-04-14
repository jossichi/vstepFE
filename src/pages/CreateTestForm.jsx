import React, { useState } from "react";
import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ReadingTestForm from "../components/createTests/ReadingTestForm";
import ListeningTestForm from "../components/createTests/ListeningTestForm";

const CreateTestForm = () => {
  const [testType, setTestType] = useState("listening");

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">Create New Test</Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth required>
          <InputLabel>Test Type</InputLabel>
          <Select
            value={testType}
            onChange={(e) => setTestType(e.target.value)}>
            <MenuItem value="listening">Listening</MenuItem>
            <MenuItem value="reading">Reading</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Render component tương ứng */}
      <Grid item xs={12}>
        {testType === "listening" ? <ListeningTestForm /> : <ReadingTestForm />}
      </Grid>
    </Grid>
  );
};

export default CreateTestForm;
