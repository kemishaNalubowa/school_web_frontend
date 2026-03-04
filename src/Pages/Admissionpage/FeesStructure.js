import React from "react";
import { Container, Button } from "react-bootstrap";
import "./feesStructure.css";

const FeesStructure = () => {
  return (
    <div className="fees-page">
      
      {/* Hero Section */}
      <div className="fees-hero">
        <Container>
          <h1>Fees Structure</h1>
          <p>Transparent and affordable education for every child.</p>
        </Container>
      </div>

      <Container className="fees-content">
        
        {/* Introduction Text */}
        <div className="fees-intro text-center">
          <h2>2024 - 2025 Academic Year</h2>
          <p>
            Below is the detailed fee structure for all grade levels. 
            Fees are payable per term unless otherwise stated.
          </p>
        </div>

        {/* Fees Table Section */}
        <div className="fees-table-card">
          <table className="custom-fees-table">
            <thead>
              <tr>
                <th>Grade Level</th>
                <th>Tuition (Per Term)</th>
                <th>Meals (Optional)</th>
                <th>Transport (Optional)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Grade">Playgroup</td>
                <td data-label="Tuition">Ksh 25,000</td>
                <td data-label="Meals">Ksh 8,000</td>
                <td data-label="Transport">Ksh 10,000</td>
              </tr>
              <tr>
                <td data-label="Grade">PP1 - PP2</td>
                <td data-label="Tuition">Ksh 35,000</td>
                <td data-label="Meals">Ksh 8,000</td>
                <td data-label="Transport">Ksh 12,000</td>
              </tr>
              <tr>
                <td data-label="Grade">Grade 1 - 3</td>
                <td data-label="Tuition">Ksh 45,000</td>
                <td data-label="Meals">Ksh 10,000</td>
                <td data-label="Transport">Ksh 15,000</td>
              </tr>
              <tr>
                <td data-label="Grade">Grade 4 - 6</td>
                <td data-label="Tuition">Ksh 55,000</td>
                <td data-label="Meals">Ksh 10,000</td>
                <td data-label="Transport">Ksh 15,000</td>
              </tr>
              <tr>
                <td data-label="Grade">Grade 7 - 8</td>
                <td data-label="Tuition">Ksh 65,000</td>
                <td data-label="Meals">Ksh 12,000</td>
                <td data-label="Transport">Ksh 18,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payment Methods Section */}
        <div className="payment-section">
          <h3>💳 Payment Methods</h3>
          <p>We offer convenient ways to pay your school fees:</p>
          
          <div className="payment-cards">
            <div className="payment-card">
              <h5>Bank Transfer</h5>
              <p><strong>Bank:</strong> Equity Bank</p>
              <p><strong>Acc Name:</strong> JOKS School Connect</p>
              <p><strong>Acc No:</strong> 1234567890</p>
            </div>
            
            <div className="payment-card">
              <h5>M-Pesa</h5>
              <p><strong>Paybill:</strong> 888 888</p>
              <p><strong>Acc No:</strong> Student Name</p>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="download-section text-center">
            <h4>Need a printed copy?</h4>
            <Button className="download-btn">
                📥 Download Full Fees Structure (PDF)
            </Button>
        </div>

      </Container>

      {/* Footer */}
      <footer className="footer">
        <Container>
          <p>&copy; {new Date().getFullYear()} JOKS SCHOOL CONNECT. All Rights Reserved.</p>
        </Container>
      </footer>
    </div>
  );
};

export default FeesStructure;