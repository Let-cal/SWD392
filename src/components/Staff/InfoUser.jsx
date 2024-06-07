import PropTypes from "prop-types";

const InfomationOfUser = ({
  userCode,
  fullName,
  email,
  joinDate,
  status,
  children,
}) => {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-200">
      <div className="w-1/5 px-4 text-left text-xs uppercase text-gray-500 font-medium">
        {userCode}
      </div>
      <div className="w-1/5 px-4 text-left text-xs uppercase text-gray-500 font-medium">
        {fullName}
      </div>
      <div className="w-1/5 px-4 text-left text-xs uppercase text-gray-500 font-medium">
        {email}
      </div>
      <div className="w-1/5 px-4 text-left text-xs uppercase text-gray-500 font-medium">
        {joinDate}
      </div>
      <div className="w-1/5 px-4 text-left text-xs uppercase text-gray-500 font-medium flex items-center justify-between">
        <span>{status}</span>
        <div>{children}</div>
      </div>
    </div>
  );
};
InfomationOfUser.propTypes = {
  userCode: PropTypes.string,
  fullName: PropTypes.string,
  email: PropTypes.string,
  joinDate: PropTypes.string,
  status: PropTypes.string,
  children: PropTypes.any,
};
export default InfomationOfUser;
