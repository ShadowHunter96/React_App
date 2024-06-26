import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import FilterComponent from "../components/FilterComponent";
import JobList from "../jobs/JobList";
import UsersGrid from "../users/UsersGrid";
import LinksGrid from "../link/LinksGrid";
import LinkPreview from "../link/LinkPreview";

export default function Home() {
  


  return (
    <div className="container">
      <div className="py-4">
        <FilterComponent/>
        <JobList/>
        <UsersGrid/>
        <LinksGrid/>
        <LinkPreview/>
      </div>
    </div>
  )
}