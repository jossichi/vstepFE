import React, { useState } from "react";
import Form from "@rjsf/core";
import Validator from "@rjsf/validator-ajv8"; // Import validator

const CreateTestForm = () => {
  const [formData, setFormData] = useState({});

  const schema = {
    title: "collection_tests",
    $schema: "http://json-schema.org/draft-07/schema#",
    type: "object",
    properties: {
      _id: { type: "string" },
      test_id: { type: "string" },
      test_type: { type: "string", enum: ["listening", "reading"] },
      level: {
        type: "string",
        enum: ["B1", "B2", "C1"],
      },
    },
    required: ["_id", "test_id", "test_type"],
    allOf: [
      {
        if: { properties: { test_type: { const: "listening" } } },
        then: {
          properties: {
            url_audio: { type: "string", format: "uri" },
            questions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  question_id: { type: "string" },
                  question_text: { type: "string" },
                  options: {
                    type: "array",
                    items: { type: "string" },
                    minItems: 4,
                    maxItems: 4,
                  },
                  correct_answer: { type: "string" },
                },
                required: [
                  "question_id",
                  "question_text",
                  "options",
                  "correct_answer",
                ],
              },
            },
          },
          required: ["url_audio", "questions"],
        },
      },
      {
        if: { properties: { test_type: { const: "reading" } } },
        then: {
          properties: {
            instructions: { type: "string" },
            passages: {
              type: "array",
              minItems: 4,
              maxItems: 4,
              items: {
                type: "object",
                properties: {
                  passage_id: { type: "string" },
                  question_text: { type: "string" },
                  questions: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        question_id: { type: "string" },
                        question_type: {
                          type: "string",
                          enum: ["multiple_choice", "short_answer"],
                        },
                        text: { type: "string" },
                        options: {
                          type: "array",
                          items: { type: "string" },
                          minItems: 4,
                          maxItems: 4,
                        },
                        correct_answer: { type: "string" },
                      },
                      required: [
                        "question_id",
                        "question_type",
                        "text",
                        "correct_answer",
                      ],
                    },
                  },
                },
                required: ["passage_id", "question_text", "questions"],
              },
            },
          },
          required: ["level", "instructions", "passages"],
        },
      },
    ],
  };

  const uiSchema = {
    test_type: {
      "ui:widget": "select", // Dropdown menu for test type
    },
    url_audio: {
      "ui:widget": "text", // Sử dụng widget text cho URL
      "ui:options": {
        format: "uri", // Chỉ định là URL
      },
      "ui:placeholder": "Enter the URL for the audio file",
    },
    questions: {
      "ui:widget": "checkboxes", // Sử dụng checkboxes cho mảng
    },
    level: {
      "ui:widget": "select", // Dropdown for level selection
    },
    instructions: {
      "ui:widget": "textarea", // Text area for instructions
    },
    passages: {
      "ui:widget": "checkboxes", // Sử dụng checkboxes cho mảng
    },
  };

  const onSubmit = ({ formData }) => {
    console.log("Form submitted with data: ", formData);
  };

  return (
    <div>
      <Form
        schema={schema}
        uiSchema={uiSchema}
        formData={formData}
        onSubmit={onSubmit}
        onChange={({ formData }) => setFormData(formData)}
        validator={Validator} // Use validator here
      />
    </div>
  );
};

export default CreateTestForm;
