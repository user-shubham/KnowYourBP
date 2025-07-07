import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { AlertCircle, CheckCircle, AlertTriangle, XCircle, RotateCcw, Download, Heart } from 'lucide-react';

/**
 * ResultsPage component
 * This component displays the results of the blood pressure assessment after the user submits the form.
 * It expects to receive the prediction result and the form data via React Router's location.state.
 */
const ResultsPage = () => {
  // useLocation hook is used to access the state passed from the PredictionForm page
  const location = useLocation();
  // Destructure prediction and formData from the location state (may be undefined if accessed directly)
  const { prediction, formData } = location.state || {};

  // If no prediction is available (e.g., user navigated directly), show a fallback message and a link to retake the assessment
  if (!prediction) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">No Results Available</h2>
          <Link to="/prediction" className="health-button">
            Take Assessment
          </Link>
        </div>
      </div>
    );
  }

  /**
   * getIcon
   * Returns a different icon based on the prediction color (risk level).
   * - ormal: green check
   * - stage1: yellow warning
   * - stage2: orange alert
   * - crisis: red cross
   * - default: blue heart
   */
  const getIcon = () => {
    switch (prediction.color) {
      case 'normal': return <CheckCircle className="h-16 w-16 text-green-600" />;
      case 'stage1': return <AlertTriangle className="h-16 w-16 text-yellow-600" />;
      case 'stage2': return <AlertCircle className="h-16 w-16 text-orange-600" />;
      case 'crisis': return <XCircle className="h-16 w-16 text-red-600" />;
      default: return <Heart className="h-16 w-16 text-blue-600" />;
    }
  };

  /**
   * getRecommendations
   * Returns an array of health recommendations based on the prediction color (risk level).
   */
  const getRecommendations = () => {
    switch (prediction.color) {
      case 'normal':
        return [
          "Continue maintaining a healthy lifestyle",
          "Regular exercise (150 minutes/week of moderate activity)",
          "Maintain a balanced, low-sodium diet",
          "Monitor blood pressure regularly",
          "Annual check-ups with your healthcare provider"
        ];
      case 'stage1':
        return [
          "Consult with your healthcare provider soon",
          "Implement lifestyle modifications immediately",
          "Reduce sodium intake to less than 2,300mg daily",
          "Increase physical activity gradually",
          "Consider stress management techniques",
          "Monitor blood pressure weekly"
        ];
      case 'stage2':
        return [
          "Schedule an appointment with your doctor promptly",
          "Medication may be necessary - consult your physician",
          "Strict dietary modifications (DASH diet recommended)",
          "Regular moderate exercise as approved by your doctor",
          "Daily blood pressure monitoring",
          "Limit alcohol consumption"
        ];
      case 'crisis':
        return [
          "SEEK IMMEDIATE MEDICAL ATTENTION",
          "Contact your healthcare provider or emergency services",
          "Do not delay treatment - this requires urgent care",
          "Avoid strenuous activities until evaluated",
          "Take medications exactly as prescribed",
          "Follow up closely with your healthcare team"
        ];
      default:
        return ["Consult with your healthcare provider for personalized advice"];
    }
  };

  /**
   * downloadReport
   * Allows the user to download a JSON report of their assessment.
   * The report includes the date, assessment stage, risk level, and recommendations.
   */
  const downloadReport = () => {
    const reportData = {
      date: new Date().toLocaleDateString(),
      assessment: prediction.stage,
      level: prediction.level,
      recommendations: getRecommendations()
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `BP_Assessment_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  // Map risk levels to Tailwind border and text color classes
  const riskColorMap: Record<string, string> = {
    high: 'border-red-600 text-red-700 bg-red-50',
    medium: 'border-orange-500 text-orange-700 bg-orange-50',
    low: 'border-yellow-400 text-yellow-700 bg-yellow-50',
    no: 'border-green-600 text-green-700 bg-green-50',
  };

  // Main render: shows the result, recommendations, and action buttons
  return (
    <div className="min-h-screen py-12 px-4 health-gradient">
      <div className="max-w-4xl mx-auto">
        
        {/* Results Header */}
        <div className="text-center mb-12 fade-in">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Assessment Results</h1>
          <p className="text-lg text-slate-600">Based on your clinical parameters</p>
        </div>

        {/* Main Result Card */}
        <div className="medical-card p-8 mb-8 text-center slide-in">
          <div className="mb-6">
            {getIcon()}
          </div>
          
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Classification: {prediction.stage}
          </h2>
          
          <div
            className={`inline-block px-6 py-3 rounded-full text-xl font-semibold border-2 ${riskColorMap[(prediction.level || '').toLowerCase()] || 'border-slate-400 text-slate-700 bg-slate-50'}`}
          >
            {prediction.level} Risk
          </div>
          
          <p className="text-slate-600 mt-4 text-lg">
            Assessment completed on {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Recommendations */}
        <div className="medical-card p-8 mb-8 slide-in" style={{animationDelay: '0.2s'}}>
          <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <Heart className="h-6 w-6 mr-2 text-red-500" />
            Health Recommendations
          </h3>
          
          <div className="space-y-3">
            {getRecommendations().map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-3"></div>
                <p className="text-slate-700 leading-relaxed">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center slide-in" style={{animationDelay: '0.4s'}}>
          {/* Retake Assessment Button */}
          <Link to="/prediction" className="health-button flex items-center space-x-2">
            <RotateCcw className="h-5 w-5" />
            <span>Retake Assessment</span>
          </Link>
          
          {/* Download Report Button */}
          <button
            onClick={downloadReport}
            className="bg-slate-600 hover:bg-slate-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 flex items-center space-x-2"
          >
            <Download className="h-5 w-5" />
            <span>Download Report</span>
          </button>
        </div>

        {/* Medical Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mt-8 slide-in" style={{animationDelay: '0.6s'}}>
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-amber-800 mb-2">Important Medical Disclaimer</h4>
              <p className="text-amber-700 text-sm leading-relaxed">
                This assessment is for informational purposes only and should not replace professional medical advice. 
                The results are based on limited parameters and may not reflect your complete cardiovascular health status. 
                Always consult with qualified healthcare providers for proper diagnosis and treatment planning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
