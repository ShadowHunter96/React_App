import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';

const JobListAdmin = () => {
  const [jobs, setJobs] = useState([]);

  const loadJobs = async () => {
    try {
      const result = await axios.get("http://localhost:8081/techJobs");
      setJobs(result.data);
    } catch (error) {
      console.error('Error loading jobs:', error);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleApprovalChange = (jobId, isApproved) => {
    // Handle the change in approval checkbox
    // You might want to send a request to your backend to update the approval status
    console.log(`Job ID: ${jobId} - Approval Status: ${isApproved}`);
    // Example PUT request (make sure to update the URL and data accordingly)
     axios.put(`http://localhost:8081//techJob/{id}/approve`, { approved: isApproved });
  };

  return (
    <div className="container">
      <div className="row">
        {jobs.map((job) => (
          <div key={job.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{job.name}</h5>
                <p className="card-text">{job.description}</p>
                <p>
                  <i className="bi bi-geo-alt-fill"></i> {job.city}
                  <br />
                  <i className="bi bi-book-half"></i> {job.education}
                </p>
                <div className="d-flex justify-content-between">
                  <span className="badge bg-secondary">Level: {job.seniority}</span>
                  <span className="badge bg-success">Budget: {job.budget} {job.currency}</span>
                </div>
                <div className="form-check form-switch mt-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`switch-${job.id}`}
                    checked={job.approved}
                    onChange={(e) => handleApprovalChange(job.id, e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor={`switch-${job.id}`}>
                    Approved
                  </label>
                </div>
              </div>
              <div className="card-footer">
                <Link to={`/job/${job.id}`} className="btn btn-primary" style={{ marginRight: "10px" }}>
                  View Details
                </Link>
                <Link to={`/edittechjob/${job.id}`} className="btn btn-primary">
                  Edit
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListAdmin;
