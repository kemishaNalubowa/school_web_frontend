import React from "react";
import { Container, Button } from "react-bootstrap";
import "./AdmissionInfo.css"; // We will create this next

const AdmissionInfo = () => {
  return (
    <div className="admission-info-page">
      
      {/* Hero Section */}
      <div className="info-hero">
        <Container>
          <h1>Admission Information</h1>
          <p>Everything you need to know about joining JOKS School Connect.</p>
        </Container>
      </div>

      <Container className="info-content">
        
        {/* Introduction */}
        <div className="info-section text-center">
          <h2>Welcome to Our Community</h2>
          <p className="lead">
            We are delighted that you are considering JOKS School Connect for your child's education. 
            Our admission process is designed to be transparent and straightforward.
          </p>
        </div>

        {/* Requirements Section */}
        <div className="info-card">
          <div className="info-card-header">
            <h3>📄 Admission Requirements</h3>
          </div>
          <div className="info-card-body">
            <p>To complete the application, please ensure you have the following documents:</p>
            <ul className="check-list">
              <li><strong>Birth Certificate:</strong> A copy of the child's birth certificate.</li>
              <li><strong>Passport Photos:</strong> 2 recent passport-sized photos.</li>
              <li><strong>Report Card:</strong> Previous school report (if applicable).</li>
              <li><strong>Leaving Certificate:</strong> Transfer certificate from the previous school.</li>
              <li><strong>Medical Form:</strong> A recent medical fitness report.</li>
            </ul>
          </div>
        </div>

        {/* Process Section */}
        <div className="info-card">
          <div className="info-card-header bg-dark">
            <h3>📝 Application Process</h3>
          </div>
          <div className="info-card-body">
            <div className="process-steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-text">
                  <h5>Fill Application Form</h5>
                  <p>Download the form below or pick one up from the school office.</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-text">
                  <h5>Submit Documents</h5>
                  <p>Return the filled form along with the required documents.</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-text">
                  <h5>Assessment</h5>
                  <p>The child will be invited for a brief age-appropriate assessment.</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <div className="step-text">
                  <h5>Admission</h5>
                  <p>Successful applicants will receive an admission letter.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Age Criteria */}
        <div className="age-criteria-section">
            <h3>Age Criteria</h3>
            <table className="age-table">
                <thead>
                    <tr>
                        <th>Grade Level</th>
                        <th>Age Requirement</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Playgroup</td>
                        <td>3 - 4 Years</td>
                    </tr>
                    <tr>
                        <td>PP1 / PP2</td>
                        <td>4 - 6 Years</td>
                    </tr>
                    <tr>
                        <td>Grade 1 - 6</td>
                        <td>6 - 13 Years</td>
                    </tr>
                </tbody>
            </table>
        </div>

        {/* Downloads Section */}
        <div className="download-section text-center">
            <h4>Ready to apply?</h4>
            <p>Download the application form below, fill it out, and bring it to our offices.</p>
            <Button className="download-btn">
                📥 Download Application Form (PDF)
            </Button>
        </div>

      </Container>

      {/* Footer */}
      <footer className="footer">
        <Container>
          <p> JOKS SCHOOL CONNECT. </p>
        </Container>
      </footer>
    </div>
  );
};

export default AdmissionInfo;