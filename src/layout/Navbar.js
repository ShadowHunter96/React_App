import React from "react";
import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand">Navbar</a>
        <form className="d-flex" role="search">
          <Link className="btn btn-success mx-2" to="/">Home</Link>
          <Link className="btn btn-success mx-2" to="/addtechjob">AddTechJob</Link>
          <Link className="btn btn-success mx-2" to="/adduser">AddUser</Link>
          <Link className="btn btn-success mx-2" to="/addapplicant">addapplicant</Link>
          <Link className="btn btn-success mx-2" to="/applicant-list">ViewApplicants</Link>
          <input className="form-control me-2 mx-2" type="search" placeholder="Search" aria-label="Search"></input>
          <button className="btn btn-success mx-2" type="submit">Search</button>
        </form>
      </div>
    </nav>
  )
}