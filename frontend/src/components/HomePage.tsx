
import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Shield, Users, TrendingUp, Heart, AlertTriangle } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: Activity,
      title: 'Quick Assessment',
      description: 'Get instant blood pressure risk evaluation based on clinical parameters'
    },
    {
      icon: Shield,
      title: 'Evidence-Based',
      description: 'Built on validated clinical guidelines and machine learning algorithms'
    },
    {
      icon: Users,
      title: 'User-Friendly',
      description: 'Simple interface designed for patients and healthcare professionals'
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor your cardiovascular health trends over time'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="health-gradient py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="fade-in">
            <Heart className="h-16 w-16 text-blue-600 mx-auto mb-6 pulse-animation" />
            <h1 className="text-5xl font-bold text-slate-900 mb-6">
              KnowYourBP <span className="text-blue-600">Insight Guardian</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Advanced AI-powered tool to assess your cardiovascular health risk. 
              Get personalized insights based on your clinical parameters with 
              evidence-based recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/prediction" className="health-button text-lg px-8 py-4">
                Start BP Assessment
              </Link>
              <Link 
                to="/about" 
                className="bg-white text-blue-600 border-2 border-blue-200 hover:bg-blue-50 font-medium px-8 py-4 rounded-lg transition-all duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Why Choose KnowYourBP?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our advanced assessment tool combines clinical expertise with machine learning 
              to provide accurate, personalized cardiovascular risk evaluation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="medical-card p-6 text-center slide-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <Icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Health Disclaimer */}
      <section className="bg-amber-50 border-t border-amber-200 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-amber-800 mb-2">Important Medical Disclaimer</h3>
              <p className="text-amber-700 leading-relaxed">
                This tool is designed for educational and informational purposes only. 
                It is not intended to replace professional medical advice, diagnosis, or treatment. 
                Always consult with qualified healthcare providers regarding your health conditions 
                and before making any medical decisions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
