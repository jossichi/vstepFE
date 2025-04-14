import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { testService } from "../../services/testService";
import Swal from "sweetalert2";

const ListeningTestForm = () => {
  const [testId, setTestId] = useState("");
  const [audio, setAudio] = useState(null);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!testId || !audio || questions.length === 0) {
      alert("Please fill in all fields and upload audio");
      return;
    }

    for (const q of questions) {
      if (
        !q.question_text ||
        !q.correct_answer ||
        !q.options ||
        q.options.length !== 4
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Each question must have text, 4 options, and a correct answer",
        });
        return;
      }
    }

    const formData = new FormData();
    formData.append("test_id", testId);
    formData.append("test_type", "listening");
    formData.append("audio", audio);

    questions.forEach((q, i) => {
      formData.append(`questions[${i}].question_id`, q.question_id);
      formData.append(`questions[${i}].question_text`, q.question_text);
      formData.append(`questions[${i}].correct_answer`, q.correct_answer);
      q.options.forEach((op, j) => {
        formData.append(`questions[${i}].options[${j}]`, op);
      });
    });

    try {
      const result = await testService.createTest(formData, true); // FormData
      if (result.message === "Test created successfully") {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Test created successfully",
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
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setAudio(e.target.files[0])}
          required
        />
      </Grid>

      <Grid item xs={12}>
        <Button
          onClick={() =>
            setQuestions([
              ...questions,
              {
                question_id: uuidv4(),
                question_text: "",
                correct_answer: "",
                options: ["", "", "", ""],
              },
            ])
          }>
          Add Question
        </Button>
      </Grid>

      {questions.map((q, i) => (
        <Grid container spacing={1} key={q.question_id}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Question"
              value={q.question_text}
              onChange={(e) => {
                const updated = [...questions];
                updated[i].question_text = e.target.value;
                setQuestions(updated);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Correct Answer"
              value={q.correct_answer}
              onChange={(e) => {
                const updated = [...questions];
                updated[i].correct_answer = e.target.value;
                setQuestions(updated);
              }}
            />
          </Grid>
          {q.options.map((op, j) => (
            <Grid item xs={6} sm={3} key={j}>
              <TextField
                fullWidth
                label={`Option ${j + 1}`}
                value={op}
                onChange={(e) => {
                  const updated = [...questions];
                  updated[i].options[j] = e.target.value;
                  setQuestions(updated);
                }}
              />
            </Grid>
          ))}
        </Grid>
      ))}

      <Grid item xs={12}>
        <Button variant="contained" onClick={handleSubmit}>
          Create Listening Test
        </Button>
      </Grid>
    </Grid>
  );
};

export default ListeningTestForm;
