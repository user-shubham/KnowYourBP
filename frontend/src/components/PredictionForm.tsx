import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after form submission
import { HelpCircle, Activity, User, Heart } from 'lucide-react'; // Icon components

// Define the structure of the form data
interface FormData {
  patient: number;         // 0: No, 1: Yes
  nosebleeds: number;         // 0: No, 1: Yes
  systolic: number;           // 0, 1, 2
  diastolic: number;          // 0, 1, 2, 3, 4, 5 (combined option)
}

// Option mappings for each question
const options = {
  patient: ['No', 'Yes'],
  nosebleeds: ['No', 'Yes'],
  systolic: ['Below 130', '130-139', '140+'],
  // Diastolic options combined (normal and high in one dropdown)
  diastolic: [
    'Below 70 (Normal)',    // 0
    '70-80 (Normal)',       // 1
    'Above 80 (Normal)',    // 2
    'Below 100 (High)',     // 3
    '100-110 (High)',       // 4
    '110+ (High)'           // 5
  ],
};

// Main functional component for the prediction form
const PredictionForm = () => {
  const navigate = useNavigate(); // Used to redirect to the results page

  // State to hold the user's input for the form (default to -1 for unselected)
  const [formData, setFormData] = useState<FormData>({
    patient: -1,
    nosebleeds: -1,
    systolic: -1,
    diastolic: -1
  });

  // State to control which tooltip is currently visible (for help icons)
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  // Tooltip text for each field, shown when hovering over the help icon
  const tooltips = {
    patient: "Indicates if you have been previously diagnosed with hypertension or are currently under treatment",
    nosebleeds: "Recent nosebleeds can be associated with high blood pressure episodes",
    systolic: "Systolic pressure is the top number in your BP reading, measured when your heart beats",
    diastolic: "Diastolic pressure is the bottom number, measured when your heart rests between beats (normal and high ranges combined)"
  };

  // Handles form submission (when user clicks "Assess My BP Risk")
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents default form submission (page reload)
    
    // Simple validation: ensure all required dropdowns are filled
    if (
      formData.patient === -1 ||
      formData.nosebleeds === -1 ||
      formData.systolic === -1 ||
      formData.diastolic === -1
    ) {
      alert('Please fill in all required fields');
      return;
    }

    // Prepare data for backend (already numbers)
    const formdata = { ...formData };

    try {
      // Send POST request to Flask backend
      const response = await fetch('http://localhost:5000/api/prediction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formdata)
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const prediction = await response.json();

      // Redirect to the results page, passing prediction and form data
      navigate('/results', { state: { prediction, formData } });
    } catch (error) {
      alert('Error connecting to prediction service.');
      console.error(error);
    }
  };

  // Tooltip component: shows help text when hovering over the help icon
  const Tooltip = ({ field }: { field: string }) => (
    <div className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => setShowTooltip(field)} // Show tooltip for this field
        onMouseLeave={() => setShowTooltip(null)}  // Hide tooltip when mouse leaves
        className="ml-2 text-blue-500 hover:text-blue-700"
        tabIndex={-1}
      >
        <HelpCircle className="h-4 w-4" />
      </button>
      {showTooltip === field && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 text-white text-sm rounded-lg shadow-lg z-10">
          {tooltips[field as keyof typeof tooltips]}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
        </div>
      )}
    </div>
  );

  // Main render: form UI
  return (
    <div className="min-h-screen py-12 px-4 health-gradient">
      <div className="max-w-4xl mx-auto">
        {/* Header section with title and description */}
        <div className="text-center mb-12 fade-in">
          <Activity className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Blood Pressure Assessment</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Please provide your clinical parameters for a personalized cardiovascular risk assessment.
          </p>
        </div>

        {/* The main form */}
        <form onSubmit={handleSubmit} className="medical-card p-8 max-w-2xl mx-auto slide-in">
          <div className="space-y-8">
            {/* Patient Information Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-900 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Patient Information
              </h3>
              
              {/* Dropdown: Diagnosed hypertension patient */}
              <div>
                <label className="block text-slate-700 font-medium mb-2">
                  Are you a diagnosed hypertension patient? *
                  <Tooltip field="patient" />
                </label>
                <select
                  value={formData.patient}
                  onChange={e => setFormData({ ...formData, patient: Number(e.target.value) })}
                  className="w-full p-3 border border-slate-300 rounded-lg"
                  required
                >
                  <option value={-1}>Select</option>
                  {options.patient.map((opt, idx) => (
                    <option key={opt} value={idx}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Dropdown: Nosebleeds */}
              <div>
                <label className="block text-slate-700 font-medium mb-2">
                  Have you had nosebleeds in the past 30 days? *
                  <Tooltip field="nosebleeds" />
                </label>
                <select
                  value={formData.nosebleeds}
                  onChange={e => setFormData({ ...formData, nosebleeds: Number(e.target.value) })}
                  className="w-full p-3 border border-slate-300 rounded-lg"
                  required
                >
                  <option value={-1}>Select</option>
                  {options.nosebleeds.map((opt, idx) => (
                    <option key={opt} value={idx}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Blood Pressure Parameters Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-900 flex items-center">
                <Heart className="h-5 w-5 mr-2 text-red-500" />
                Blood Pressure Parameters
              </h3>

              {/* Dropdown: Systolic Pressure */}
              <div>
                <label className="block text-slate-700 font-medium mb-2">
                  Systolic Pressure Range *
                  <Tooltip field="systolic" />
                </label>
                <select
                  value={formData.systolic}
                  onChange={e => setFormData({ ...formData, systolic: Number(e.target.value) })}
                  className="w-full p-3 border border-slate-300 rounded-lg"
                  required
                >
                  <option value={-1}>Select systolic range</option>
                  {options.systolic.map((opt, idx) => (
                    <option key={opt} value={idx}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Combined Diastolic */}
              <div>
                <label className="block text-slate-700 font-medium mb-2">
                  Diastolic Pressure *
                  <Tooltip field="diastolic" />
                </label>
                <select
                  value={formData.diastolic}
                  onChange={e => setFormData({ ...formData, diastolic: Number(e.target.value) })}
                  className="w-full p-3 border border-slate-300 rounded-lg"
                  required
                >
                  <option value={-1}>Select diastolic range</option>
                  {options.diastolic.map((opt, idx) => (
                    <option key={opt} value={idx}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Submit button */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <button
              type="submit"
              className="w-full health-button text-lg py-4 flex items-center justify-center space-x-2"
            >
              <Activity className="h-5 w-5" />
              <span>Assess My BP Risk</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PredictionForm;
