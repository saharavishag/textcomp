import React, { useState } from 'react';
import './App.css';
import ComparisonResult from './ComparisonResult';

function App() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [result, setResult] = useState('');
  const [showDetailedComparison, setShowDetailedComparison] = useState(false);

  const handleCompare = () => {
    if (text1 === text2) {
      setResult('identical input');
    } else {
      setResult('different');
    }
    setShowDetailedComparison(true);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <img src="/logo.jpg" alt="TextComp Logo" className="logo" />
          <h1>TextComp</h1>
        </div>
        
        <div className="input-section">
          <div className="input-group">
            <label htmlFor="text1">Text 1:</label>
            <textarea
              id="text1"
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              placeholder="Enter first text here..."
              rows="6"
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="text2">Text 2:</label>
            <textarea
              id="text2"
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              placeholder="Enter second text here..."
              rows="6"
            />
          </div>
        </div>
        
        <button className="compare-button" onClick={handleCompare}>
          Compare Now
        </button>
        
        {result && (
          <div className="result">
            <h2>Result:</h2>
            <p className={`result-text ${result === 'identical input' ? 'identical' : 'different'}`}>
              {result}
            </p>
          </div>
        )}
        
        {showDetailedComparison && (
          <ComparisonResult 
            text1={text1} 
            text2={text2} 
            isIdentical={result === 'identical input'}
          />
        )}
      </div>
    </div>
  );
}

export default App; 