import React, { useState } from "react";
import Form from "@rjsf/core";
import Validator from "@rjsf/validator-ajv8";
import ReactJson from "react-json-view";
import uploadMaterial from "../services/uploadService";
const schema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Tạo đề ôn VSTEP",
  type: "object",
  properties: {
    level: {
      type: "string",
      enum: ["B1", "B2", "C1", "C2"],
      description: "The difficulty level of the practice material.",
    },
    listening: {
      type: "array",
      minItems: 3,
      maxItems: 3,
      items: {
        type: "object",
        properties: {
          part: { type: "integer", minimum: 1, maximum: 3 },
          audio_file: {
            type: "string",
            contentEncoding: "base64",
            description: "Base64-encoded audio file uploaded by the user.",
          },
          questions: {
            type: "array",
            minItems: 1,
            maxItems: 15,
            items: {
              type: "object",
              properties: {
                question_id: { type: "string" },

                question_text: { type: "string" },
                options: {
                  type: "array",
                  minItems: 3,
                  maxItems: 5,
                  items: { type: "string" },
                },
                correct_answer: { type: "string" },
              },
              required: [
                "question_id",
                "audio_file",
                "question_text",
                "options",
                "correct_answer",
              ],
            },
          },
        },
        required: ["part", "questions"],
      },
    },
    reading: {
      type: "array",
      minItems: 4,
      maxItems: 4,
      items: {
        type: "object",
        properties: {
          part: { type: "integer", minimum: 1, maximum: 4 },
          passage_id: { type: "string" },
          text: { type: "string" },
          questions: {
            type: "array",
            minItems: 1,
            maxItems: 15,
            items: {
              type: "object",
              properties: {
                question_id: { type: "string" },
                question_text: { type: "string" },
                options: {
                  type: "array",
                  minItems: 3,
                  maxItems: 5,
                  items: { type: "string" },
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
        required: ["part", "passage_id", "text", "questions"],
      },
    },
    writing: {
      type: "array",
      minItems: 2,
      maxItems: 2,
      items: {
        type: "object",
        properties: {
          part: { type: "integer", minimum: 1, maximum: 2 },
          prompt: { type: "string" },
          sample_answer: { type: "string" },
        },
        required: ["part", "prompt", "sample_answer"],
      },
    },
    speaking: {
      type: "array",
      minItems: 3,
      maxItems: 3,
      items: {
        type: "object",
        properties: {
          part: { type: "integer", minimum: 1, maximum: 3 },
          prompt: { type: "string" },
          sample_answer: { type: "string" },
        },
        required: ["part", "prompt", "sample_answer"],
      },
    },
  },
  required: [
    "material_id",
    "upload_date",
    "level",
    "listening",
    "reading",
    "writing",
    "speaking",
  ],
  additionalProperties: false,
};

const initialUiSchema = {
  // General settings for the form
  "ui:order": [
    "_id",
    "material_id",
    "upload_date",
    "level",
    "listening",
    "reading",
    "writing",
    "speaking",
    "visibility",
    "signature",
    "attempt_count",
  ],
  "ui:options": {
    submitButtonOptions: {
      text: "Submit Practice Material", // Custom text for the submit button
    },
  },

  // Individual field configurations
  _id: {
    "ui:widget": "text", // Simple text input for the unique identifier
    "ui:options": {
      label: "Document ID", // Custom label for the field
      readonly: true, // Make it read-only as it's auto-generated
    },
  },
  material_id: {
    "ui:widget": "text", // Simple text input for the material identifier
    "ui:options": {
      label: "Material ID", // Custom label for the field
    },
  },
  upload_date: {
    "ui:widget": "alt-datetime", // Use a datetime picker for the upload date
    "ui:options": {
      label: "Upload Date and Time", // Custom label for the field
    },
  },
  level: {
    "ui:widget": "select", // Dropdown select for difficulty level
    "ui:options": {
      label: "Difficulty Level", // Custom label for the field
    },
  },
  listening: {
    "ui:options": {
      label: "Listening Section", // Custom label for the section
    },
    items: {
      part: {
        "ui:widget": "updown", // Up-down stepper for part number
        "ui:options": {
          label: "Part Number", // Custom label for the field
        },
      },
      audio_file: {
        "ui:widget": "file", // File upload widget for audio files
        "ui:options": {
          label: "Upload Audio File", // Custom label for the field
        },
      },
      questions: {
        items: {
          question_id: {
            "ui:widget": "text", // Text input for question ID
            "ui:options": {
              label: "Question ID", // Custom label for the field
            },
          },

          question_text: {
            "ui:widget": "textarea", // Textarea for question text
            "ui:options": {
              label: "Question Text", // Custom label for the field
              rows: 3, // Set number of rows for the textarea
            },
          },
          options: {
            items: {
              "ui:widget": "text", // Text input for each option
              "ui:options": {
                label: "Option", // Custom label for the field
              },
            },
          },
          correct_answer: {
            "ui:widget": "text", // Text input for correct answer
            "ui:options": {
              label: "Correct Answer", // Custom label for the field
            },
          },
        },
      },
    },
  },
  reading: {
    "ui:options": {
      label: "Reading Section", // Custom label for the section
    },
    items: {
      part: {
        "ui:widget": "updown", // Up-down stepper for part number
        "ui:options": {
          label: "Part Number", // Custom label for the field
        },
      },
      passage_id: {
        "ui:widget": "text", // Text input for passage ID
        "ui:options": {
          label: "Passage ID", // Custom label for the field
        },
      },
      text: {
        "ui:widget": "textarea", // Textarea for passage text
        "ui:options": {
          label: "Passage Text", // Custom label for the field
          rows: 5, // Set number of rows for the textarea
        },
      },
      questions: {
        items: {
          question_id: {
            "ui:widget": "text", // Text input for question ID
            "ui:options": {
              label: "Question ID", // Custom label for the field
            },
          },
          question_text: {
            "ui:widget": "textarea", // Textarea for question text
            "ui:options": {
              label: "Question Text", // Custom label for the field
              rows: 3, // Set number of rows for the textarea
            },
          },
          options: {
            items: {
              "ui:widget": "text", // Text input for each option
              "ui:options": {
                label: "Option", // Custom label for the field
              },
            },
          },
          correct_answer: {
            "ui:widget": "text", // Text input for correct answer
            "ui:options": {
              label: "Correct Answer", // Custom label for the field
            },
          },
        },
      },
    },
  },
  writing: {
    "ui:options": {
      label: "Writing Section", // Custom label for the section
    },
    items: {
      part: {
        "ui:widget": "updown", // Up-down stepper for part number
        "ui:options": {
          label: "Part Number", // Custom label for the field
        },
      },
      prompt: {
        "ui:widget": "textarea", // Textarea for writing prompt
        "ui:options": {
          label: "Prompt", // Custom label for the field
          rows: 4, // Set number of rows for the textarea
        },
      },
      sample_answer: {
        "ui:widget": "textarea", // Textarea for sample answer
        "ui:options": {
          label: "Sample Answer", // Custom label for the field
          rows: 6, // Set number of rows for the textarea
        },
      },
    },
  },
  speaking: {
    "ui:options": {
      label: "Speaking Section", // Custom label for the section
    },
    items: {
      part: {
        "ui:widget": "updown", // Up-down stepper for part number
        "ui:options": {
          label: "Part Number", // Custom label for the field
        },
      },
      prompt: {
        "ui:widget": "textarea", // Textarea for speaking prompt
        "ui:options": {
          label: "Prompt", // Custom label for the field
          rows: 4, // Set number of rows for the textarea
        },
      },
      sample_answer: {
        "ui:widget": "textarea", // Textarea for sample answer
        "ui:options": {
          label: "Sample Answer", // Custom label for the field
          rows: 6, // Set number of rows for the textarea
        },
      },
    },
  },
  visibility: {
    "ui:widget": "radio", // Radio buttons for visibility status
    "ui:options": {
      label: "Visibility Status", // Custom label for the field
    },
  },
  signature: {
    "ui:widget": "text", // Text input for digital signature
    "ui:options": {
      label: "Digital Signature", // Custom label for the field
    },
  },
  attempt_count: {
    "ui:widget": "updown", // Up-down stepper for attempt count
    "ui:options": {
      label: "Attempt Count", // Custom label for the field
    },
  },
};

const UploadTest = () => {
  const [formData, setFormData] = useState({});
  const [uiSchema, setUiSchema] = useState(initialUiSchema);
  const handleSubmit = async ({ formData }) => {
    try {
      const response = await uploadMaterial(formData); // Gọi service để upload
      alert(
        "Successfully uploaded material: " + JSON.stringify(response, null, 2)
      );
    } catch (error) {
      alert("Failed to upload material.");
    }
  };
  return (
    <div className="container mt-4">
      <h2>🎨 TẠO ĐỀ ÔN TẬP VSTEP</h2>
      <ReactJson
        src={uiSchema}
        onEdit={(edit) => setUiSchema(edit.updated_src)}
        onAdd={(add) => setUiSchema(add.updated_src)}
        onDelete={(del) => setUiSchema(del.updated_src)}
        name={false}
        collapsed={false}
      />
      <Form
        schema={schema}
        uiSchema={uiSchema}
        formData={formData}
        onChange={({ formData }) => setFormData(formData)}
        onSubmit={handleSubmit}
        validator={Validator}
      />
    </div>
  );
};

export default UploadTest;
