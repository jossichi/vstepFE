import React, { useState } from 'react';
import PracticeMaterialForm from './PracticeMaterialForm';
import ExtendedPracticeMaterialForm from './ExtendedPracticeMaterialForm';

const PracticeMaterial = () => {
  const [isExtendedForm, setIsExtendedForm] = useState(false);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Practice Material Creation</h1>
        <div className="flex justify-center space-x-4">
          <button
            className={`px-4 py-2 rounded-md ${
              !isExtendedForm 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setIsExtendedForm(false)}
          >
            Simple Form
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              isExtendedForm 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setIsExtendedForm(true)}
          >
            Extended Form
          </button>
        </div>
      </div>

      {isExtendedForm ? <ExtendedPracticeMaterialForm /> : <PracticeMaterialForm />}
    </div>
  );
};

export default PracticeMaterial;