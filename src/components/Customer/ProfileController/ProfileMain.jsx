import Header from "../Header/header.jsx";
import ProfileColorTabs from "./ProfileColored-tab.jsx";
const AccountProfileMain = () => {
  return (
    <div>
      <Header />
      <div className="mt-[10%]">
        <ProfileColorTabs />
      </div>
    </div>
  );
};

export default AccountProfileMain;
