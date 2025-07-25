import React from 'react';
import './ComparisonResult.css';

const ComparisonResult = ({ text1, text2, isIdentical }) => {
  if (isIdentical) {
    return (
      <div className="comparison-result">
        <h3>Detailed Comparison</h3>
        <div className="identical-message">
          <p>✅ The texts are identical - no differences found!</p>
        </div>
      </div>
    );
  }

  // Split texts into lines for comparison
  const lines1 = text1.split('\n');
  const lines2 = text2.split('\n');
  
  // Find the maximum number of lines
  const maxLines = Math.max(lines1.length, lines2.length);
  
  // Create comparison data
  const comparisonData = [];
  for (let i = 0; i < maxLines; i++) {
    const line1 = lines1[i] || '';
    const line2 = lines2[i] || '';
    const isDifferent = line1 !== line2;
    
    comparisonData.push({
      lineNumber: i + 1,
      text1: line1,
      text2: line2,
      isDifferent
    });
  }

  return (
    <div className="comparison-result">
      <h3>Detailed Comparison</h3>
      <div className="comparison-table">
        <div className="table-header">
          <div className="line-number-header">Line</div>
          <div className="text-header">Text 1</div>
          <div className="text-header">Text 2</div>
          <div className="status-header">Status</div>
        </div>
        
        <div className="table-body">
          {comparisonData.map((row, index) => (
            <div 
              key={index} 
              className={`table-row ${row.isDifferent ? 'different' : 'identical'}`}
            >
              <div className="line-number">{row.lineNumber}</div>
              <div className="text-cell">
                <pre>{row.text1 || <span className="empty-line">(empty)</span>}</pre>
              </div>
              <div className="text-cell">
                <pre>{row.text2 || <span className="empty-line">(empty)</span>}</pre>
              </div>
              <div className="status-cell">
                {row.isDifferent ? (
                  <span className="status-different">❌ Different</span>
                ) : (
                  <span className="status-identical">✅ Identical</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="summary">
        <h4>Summary</h4>
        <p>
          Total lines: {maxLines} | 
          Different lines: {comparisonData.filter(row => row.isDifferent).length} | 
          Identical lines: {comparisonData.filter(row => !row.isDifferent).length}
        </p>
      </div>
    </div>
  );
};

export default ComparisonResult; 