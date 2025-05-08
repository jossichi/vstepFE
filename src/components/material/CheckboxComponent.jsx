import React, { useState } from 'react';
import "../../assets/styles/CheckboxComponent.css";
import PracticeMaterialFormWeb3 from './PracticeMaterialFormWeb3';
import PracticeMaterialFormWeb2 from './PracticeMaterialFormWeb2';

const CheckboxComponent = () => {
  const [isExtendedForm, setIsExtendedForm] = useState(false);

  // State for PracticeMaterialFormWeb2
  const [web2Level, setWeb2Level] = useState("B2");
  const [web2ListeningParts, setWeb2ListeningParts] = useState([]);
  const [web2ReadingParts, setWeb2ReadingParts] = useState([]);
  const [web2WritingTasks, setWeb2WritingTasks] = useState([]);
  const [web2SpeakingTasks, setWeb2SpeakingTasks] = useState([]);

  // State for PracticeMaterialFormWeb3 (assuming similar structure, adjust as needed)
  const [web3Level, setWeb3Level] = useState("B2");
  const [web3ListeningParts, setWeb3ListeningParts] = useState([]);
  const [web3ReadingParts, setWeb3ReadingParts] = useState([]);
  const [web3WritingTasks, setWeb3WritingTasks] = useState([]);
  const [web3SpeakingTasks, setWeb3SpeakingTasks] = useState([]);

  const handleCheckboxChange = (event) => {
    setIsExtendedForm(event.target.checked);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex justify-start items-center">
        {/* Toggle switch */}
        <div className="relative">
          <input
            type="checkbox"
            name="checkbox"
            id="form-toggle"
            checked={isExtendedForm}
            onChange={handleCheckboxChange}
            className="hidden"
          />
          <label htmlFor="form-toggle" className="label" />
          {/* Version text positioned below the toggle, aligned to the left */}
          <span className="version-text absolute left-0 top-full mt-2 text-sm text-gray-500">
            {isExtendedForm ? 'Phiên bản: v3' : 'Phiên bản: v2'}
          </span>
        </div>
      </div>

      {/* Conditional render of form with state passed as props */}
      {isExtendedForm ? (
        <PracticeMaterialFormWeb3
          level={web3Level}
          setLevel={setWeb3Level}
          listeningParts={web3ListeningParts}
          setListeningParts={setWeb3ListeningParts}
          readingParts={web3ReadingParts}
          setReadingParts={setWeb3ReadingParts}
          writingTasks={web3WritingTasks}
          setWritingTasks={setWeb3WritingTasks}
          speakingTasks={web3SpeakingTasks}
          setSpeakingTasks={setWeb3SpeakingTasks}
        />
      ) : (
        <PracticeMaterialFormWeb2
          level={web2Level}
          setLevel={setWeb2Level}
          listeningParts={web2ListeningParts}
          setListeningParts={setWeb2ListeningParts}
          readingParts={web2ReadingParts}
          setReadingParts={setWeb2ReadingParts}
          writingTasks={web2WritingTasks}
          setWritingTasks={setWeb2WritingTasks}
          speakingTasks={web2SpeakingTasks}
          setSpeakingTasks={setWeb2SpeakingTasks}
        />
      )}
    </div>
  );
};

export default CheckboxComponent;