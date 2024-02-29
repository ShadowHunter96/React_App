import React from 'react'
import axios from "axios";
import { useState,useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
const JobList = () => {
  const[jobs,setJobs] = useState([])
  const cardStyle = {
    width: '50rem',
  };

  const loadJobs = async () => {
    const result = await axios.get("http://localhost:8081/techJobs")
    setJobs(result.data)
  }

  useEffect(() => {
    loadJobs();


  }, [])

  return (
    <div>
    {jobs.map((job) => (
      <div key={job.id} className="card border-0" style={cardStyle}>
        <div className="card-body">
          <Link to={`/job/${job.id}`} className="card-link d-flex justify-content-between align-items-center">
            {job.baitText}
          </Link>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="card-title">{job.name}</h5>
              <p className="card-text">
                {job.description} <i className="bi bi-map"></i> {job.city} {job.education}
              </p>
            </div>
            <div className="d-flex align-items-center">
              <span className="badge badge-success" style={{ color: 'white', backgroundColor: 'grey', marginRight: '5px' }}>
                Level: {job.seniority}
              </span>
              <span className="badge badge-success" style={{ color: 'white', backgroundColor: 'green' }}>
                Budget {job.budget} {job.currency}
              </span>
              <i className="bi bi-cursor ml-2"></i> <i className="material-icons ml-2">{job.city}</i>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
  )
}

export default JobList
