
import React from 'react';
import { Brain, Users, Shield, BookOpen, Mail, Github, Lock } from 'lucide-react';

const AboutPage = () => {
  const faqs = [
    {
      question: "How accurate is this assessment tool?",
      answer: "Our tool uses clinically validated parameters and machine learning algorithms trained on medical datasets. However, it's designed as a screening tool and should not replace professional medical evaluation."
    },
    {
      question: "What parameters does the model use?",
      answer: "The assessment considers patient history, recent symptoms like nosebleeds, systolic and diastolic blood pressure ranges, all of which are established cardiovascular risk indicators."
    },
    {
      question: "Is my health data secure?",
      answer: "Yes, we prioritize your privacy. No personal health information is stored permanently on our servers. All assessments are processed locally and anonymously."
    },
    {
      question: "Should I take action based on these results?",
      answer: "Our results provide general guidance only. For any concerning results or health decisions, always consult with qualified healthcare professionals who can provide personalized medical advice."
    },
    {
      question: "How often should I use this tool?",
      answer: "This tool can be used for periodic self-assessment, but it should complement, not replace, regular medical check-ups and professional blood pressure monitoring."
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16 fade-in">
        <Brain className="h-16 w-16 text-blue-600 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-slate-900 mb-6">About BP Insight Guardian</h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          Advanced cardiovascular risk assessment powered by machine learning and clinical expertise
        </p>
      </div>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto mb-16">
        <div className="medical-card p-8 slide-in">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">How Our Assessment Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Data Collection</h3>
              <p className="text-slate-600">
                You provide key clinical parameters including blood pressure ranges, 
                patient history, and recent symptoms through our secure form.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">AI Analysis</h3>
              <p className="text-slate-600">
                Our machine learning model, trained on clinical guidelines, 
                analyzes your parameters to assess cardiovascular risk levels.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Personalized Results</h3>
              <p className="text-slate-600">
                Receive classification results with evidence-based recommendations 
                tailored to your specific risk profile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto mb-16">
        <div className="text-center mb-12">
          <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="medical-card p-6 slide-in" style={{animationDelay: `${index * 0.1}s`}}>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">{faq.question}</h3>
              <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact & Footer */}
      <section className="max-w-4xl mx-auto">
        <div className="medical-card p-8 text-center slide-in">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Get in Touch</h2>
          <p className="text-slate-600 mb-8">
            Have questions or feedback? We'd love to hear from you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href="mailto:contact@bpinsight.health" 
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span>contact@bpinsight.health</span>
            </a>
            <a 
              href="https://github.com/bpinsight/guardian" 
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 transition-colors"
            >
              <Github className="h-5 w-5" />
              <span>View on GitHub</span>
            </a>
            <a 
              href="/privacy" 
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 transition-colors"
            >
              <Lock className="h-5 w-5" />
              <span>Privacy Policy</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
