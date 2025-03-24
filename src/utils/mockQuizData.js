// Create mockQuizData.js file in src/utils or src/data directory
const mockQuizData = {
    id: "VSTEP_2025_01",
    title: "VSTEP Exam 2025",
    level: "B1-B2",
    sections: {
      reading: {
        instructions: "Read the following passages and answer the questions. Each question has only one correct answer.",
        passages: [
          {
            passage_id: "passage_1",
            text: "Recent research from the Center for Economic and Policy Research (VEPR) shows that Vietnam's economic growth in 2024 reached 6.8%, higher than the forecasted 6.5%. Key factors contributing to this growth include the recovery of the tourism sector with 12 million international visitors, a 25% increase compared to the previous year, along with steady growth in manufacturing and exports. Notably, the information technology sector continues to be a bright spot with a growth rate of 15%, making significant contributions to the digital transformation of the economy. However, the report also points out several challenges such as inflationary pressures and exchange rate fluctuations that could affect economic prospects in 2025.",
            questions: [
              {
                question_id: "q1",
                text: "According to the passage, what was Vietnam's economic growth rate in 2024?",
                question_type: "multiple_choice",
                options: ["6.5%", "6.8%", "7.0%", "12%"]
              },
              {
                question_id: "q2",
                text: "Which sector had the highest growth rate mentioned in the passage?",
                question_type: "multiple_choice",
                options: ["Tourism", "Exports", "Manufacturing", "Information Technology"]
              },
              {
                question_id: "q3",
                text: "What challenges are mentioned that could affect the economy in 2025?",
                question_type: "multiple_choice",
                options: ["Shortage of skilled labor", "International competition", "Inflationary pressures and exchange rate fluctuations", "Decline in tourism"]
              }
            ]
          },
          {
            passage_id: "passage_2",
            text: "In the context of increasingly complex climate change, Vietnam is facing major challenges, especially saltwater intrusion in the Mekong Delta. According to data from the Ministry of Agriculture and Rural Development, the 2023-2024 dry season witnessed saltwater intrusion extending 45-65km inland, affecting more than 50,000 hectares of farmland and the water supply of approximately 170,000 households. Experts warn that this situation may worsen in the coming years due to the influence of El Nino and the construction of hydroelectric dams upstream of the Mekong River. In response, the government has implemented several projects such as building sea dike systems, developing salt-tolerant rice varieties, and promoting farming models adapted to climate change.",
            questions: [
              {
                question_id: "q4",
                text: "How far did saltwater intrusion extend inland during the 2023-2024 dry season?",
                question_type: "multiple_choice",
                options: ["25-35km", "35-45km", "45-65km", "65-85km"]
              },
              {
                question_id: "q5",
                text: "According to the passage, what factors contribute to worsening saltwater intrusion?",
                question_type: "multiple_choice",
                options: ["La Nina phenomenon", "El Nino phenomenon and hydroelectric dams", "Rising sea levels", "Increased irrigation demands"]
              },
              {
                question_id: "q6",
                text: "Based on the passage, propose the most appropriate solution to address the saltwater intrusion problem.",
                question_type: "short_answer"
              }
            ]
          },
          {
            passage_id: "passage_3",
            text: "Artificial Intelligence (AI) has become increasingly integrated into healthcare systems worldwide. A recent study published in the New England Journal of Medicine demonstrates that AI algorithms can detect early signs of breast cancer from mammograms with an accuracy rate of 94%, compared to 86% for experienced radiologists. The system, developed by researchers at Oxford University, analyzed over 76,000 mammogram images to train the algorithm. However, healthcare professionals emphasize that AI should supplement rather than replace human expertise. Ethical concerns remain about patient privacy, data security, and the potential for algorithmic bias. Despite these challenges, the World Health Organization projects that AI technologies could help address the global shortage of healthcare workers, particularly in underserved regions where specialist access is limited.",
            questions: [
              {
                question_id: "q7",
                text: "What is the accuracy rate of AI in detecting early signs of breast cancer according to the study?",
                question_type: "multiple_choice",
                options: ["86%", "90%", "94%", "98%"]
              },
              {
                question_id: "q8",
                text: "How many mammogram images were used to train the AI algorithm?",
                question_type: "multiple_choice",
                options: ["7,600", "76,000", "760,000", "7,600,000"]
              },
              {
                question_id: "q9",
                text: "What is the primary concern mentioned regarding AI in healthcare?",
                question_type: "multiple_choice",
                options: ["Cost of implementation", "Replacement of medical professionals", "Patient privacy and algorithmic bias", "Technological limitations"]
              }
            ]
          }
        ]
      }
    }
  };
  
  export default mockQuizData;