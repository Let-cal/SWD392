import React, { useState } from 'react';
import GroupIcon from '@mui/icons-material/Group';
import AssessmentIcon from '@mui/icons-material/Assessment';
import "./sidebar.css"

function Sidebar() {


  return (
    <div>
      <div className="sidebar-admin bg-gray-100 shadow-md">
      
        <ul className="sidebar-nav">

          <li >
            <a >
              <GroupIcon />  Staff account
            </a>
          </li>

          <li >
            <a >
              <GroupIcon /> Customer account
            </a>
          </li>

          <li >
            <a >
              <AssessmentIcon/>  Report management
            </a>
          </li>
        </ul>

      </div>

    </div>
  );
}

export default Sidebar