import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { testService } from "../../services/testService";
import Swal from "sweetalert2";
import "../../assets/styles/ReadingTestForm.css";
const ReadingTestForm = () => {
  const [testId, setTestId] = useState("");
  const [level, setLevel] = useState("");
  const [instructions, setInstructions] = useState("");
  const [passages, setPassages] = useState([]);
  const navigate = useNavigate();

  const handleAddPassage = () => {
    if (passages.length >= 4) return alert("Tối đa 4 passages!");
    setPassages([
      ...passages,
      {
        passage_id: uuidv4(),
        text: "",
        questions: [],
      },
    ]);
  };

  const handleAddQuestion = (pIndex) => {
    const updated = [...passages];
    updated[pIndex].questions.push({
      question_id: uuidv4(),
      question_type: "multiple_choice",
      text: "",
      options: ["", "", "", ""],
      answer: "",
    });
    setPassages(updated);
  };

  const handleSubmit = async () => {
    const formData = {
      test_id: testId,
      test_type: "reading",
      level,
      instructions,
      passages,
    };

    try {
      const result = await testService.createTest(formData, false); // JSON
      if (result.message === "Test created successfully") {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Reading test created successfully",
        });
        navigate("/tests");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error creating test",
        });
      }
    } catch (err) {
      console.log("Error details:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error: ${err.message}`,
      });
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Test ID"
          value={testId}
          onChange={(e) => setTestId(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Level (B1, B2, C1)"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
      </Grid>

      <Grid item xs={12}>
        <Button onClick={handleAddPassage} disabled={passages.length >= 4}>
          Add Passage
        </Button>
      </Grid>

      {passages.map((passage, pIndex) => (
        <Grid item xs={12} key={passage.passage_id}>
          <TextField
            fullWidth
            multiline
            label={`Passage ${pIndex + 1} Text`}
            value={passage.text}
            onChange={(e) => {
              const updated = [...passages];
              updated[pIndex].text = e.target.value;
              setPassages(updated);
            }}
          />
          <Button onClick={() => handleAddQuestion(pIndex)}>
            Add Question
          </Button>

          {passage.questions.map((q, qIndex) => (
            <Grid
              container
              spacing={1}
              key={q.question_id}
              sx={{ mt: 1, mb: 2, pl: 2, borderLeft: "2px solid #ccc" }}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Question Type</InputLabel>
                  <Select
                    value={q.question_type}
                    label="Question Type"
                    onChange={(e) => {
                      const updated = [...passages];
                      updated[pIndex].questions[qIndex].question_type =
                        e.target.value;
                      setPassages(updated);
                    }}>
                    <MenuItem value="multiple_choice">Multiple Choice</MenuItem>
                    <MenuItem value="short_answer">Short Answer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Question Text"
                  value={q.text}
                  onChange={(e) => {
                    const updated = [...passages];
                    updated[pIndex].questions[qIndex].text = e.target.value;
                    setPassages(updated);
                  }}
                />
              </Grid>

              {q.question_type === "multiple_choice" && (
                <>
                  {q.options.map((opt, optIndex) => (
                    <Grid item xs={12} key={optIndex}>
                      <TextField
                        fullWidth
                        label={`Option ${optIndex + 1}`}
                        value={opt}
                        onChange={(e) => {
                          const updated = [...passages];
                          updated[pIndex].questions[qIndex].options[optIndex] =
                            e.target.value;
                          setPassages(updated);
                        }}
                      />
                    </Grid>
                  ))}
                </>
              )}

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Answer"
                  value={q.answer}
                  onChange={(e) => {
                    const updated = [...passages];
                    updated[pIndex].questions[qIndex].answer = e.target.value;
                    setPassages(updated);
                  }}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
      ))}

      <Grid item xs={12}>
        <Button variant="contained" onClick={handleSubmit}>
          Create Reading Test
        </Button>
      </Grid>
    </Grid>
  );
};

export default ReadingTestForm;
