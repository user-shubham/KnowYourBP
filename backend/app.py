from flask import Flask, jsonify, request
from flask_cors import CORS
import pickle
app = Flask(__name__)
CORS(app)

with open('models/model_rf.pkl', 'rb') as f:
    model = pickle.load(f)

# Accept POST requests with JSON data for prediction
@app.route('/api/prediction', methods=['POST'])
def predict():
    data = request.get_json()  # Get JSON data from frontend
    # Example: extract fields (add validation as needed)
    patient = data.get('patient')
    nose_bleeding = data.get('nosebleeds')
    systolic = data.get('systolic')
    diastolic = data.get('diastolic')
    print(data)
    print('patient: ', patient, 'nosebleeding: ', nose_bleeding, 'systolic: ', systolic, 'diastolic: ',diastolic)
    data = [[patient, nose_bleeding, systolic, diastolic]]
    prediction = model.predict(data)[0]
    print(prediction)
    color = ['stage1', 'stage2', 'crisis', 'normal']
    stage = ['Stage1', 'Stage2', 'Crisis', 'Normal']
    level = ['Low', 'Medium', 'High', 'No']
    
    return jsonify({'color':color[prediction],
                    'level':level[prediction],
                    'stage':stage[prediction]}) 


if __name__ == '__main__':
    app.run(debug=True)