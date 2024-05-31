import AssessmentIcon from "@mui/icons-material/Assessment";
import GroupIcon from "@mui/icons-material/Group";
import Divider from "@mui/material/Divider";
import "./sidebar.css";
function Sidebar() {
  return (
    <div>
      <div className="bg-gray-100 shadow-md sidebar-admin">
        <div className="flex justify-center mb-[29px] title-header flex-auto text-4xl leading-10">
          <span className="font-bold bg-gradient-custom-header-title bg-clip-text text-transparent">
            A
          </span>
          <span className="bg-gradient-custom-header-title bg-clip-text text-transparent">
            dmin
          </span>
        </div>
        <Divider />
        <ul className="sidebar-nav">
          <li>
            <a>
              <GroupIcon /> Staff account
            </a>
          </li>

          <li>
            <a>
              <GroupIcon /> Customer account
            </a>
          </li>

          <li>
            <a>
              <AssessmentIcon /> Report management
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
