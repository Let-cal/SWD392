import PropTypes from "prop-types";

const ProfileContent = ({ className = "", orders = [] }) => {
  return (
    <section
      className={`w-[1251px] flex flex-col items-start justify-start pt-0 pb-[116px] pr-0 pl-[3px] box-border max-w-full text-left text-xl text-light-colors-dark-gray-light font-px-heading-5 mq450:pb-[75px] mq450:box-border ${className}`}
    >
      <div className="w-full flex flex-col items-start justify-start gap-[27px] max-w-full">
        <div className="self-stretch flex flex-col items-start justify-start gap-[16px] max-w-full text-base">
          <div className="w-full flex flex-row items-center justify-between gap-[20px] max-w-full text-light-colors-black-light mq450:flex-wrap bg-gray-100 p-4 rounded-lg shadow-sm">
            <div className="flex-1 flex flex-col items-start justify-start relative leading-[27px] font-semibold">
              ORDER NUMBER
            </div>
            <div className="flex-1 flex flex-col items-start justify-start relative leading-[27px] font-semibold">
              DATE
            </div>
            <div className="flex-1 flex flex-col items-start justify-start relative leading-[27px] font-semibold">
              STATUS
            </div>
            <div className="flex-1 flex flex-col items-start justify-start relative leading-[27px] font-semibold">
              TOTAL
            </div>
            <div className="flex-1 flex flex-col items-start justify-start relative leading-[27px] font-semibold">
              ACTIONS
            </div>
          </div>

          {orders.map((order, index) => (
            <div
              key={index}
              className="w-full flex flex-row items-center justify-between gap-[20px] max-w-full p-4 bg-white shadow-sm rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex-1 flex flex-col items-start justify-start">
                <div className="relative leading-[27px]">
                  {order.orderNumber}
                </div>
              </div>
              <div className="flex-1 relative leading-[27px]">{order.date}</div>
              <div className="flex-1 flex flex-col items-start justify-start">
                <div className="relative leading-[27px]">{order.status}</div>
              </div>
              <div className="flex-1 flex flex-col items-start justify-start">
                <div className="relative leading-[27px]">{order.total}</div>
              </div>
              <div className="flex-1 flex flex-col items-start justify-start text-light-colors-accent-light">
                <b className="relative font-bold cursor-pointer hover:underline">
                  View Order
                </b>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

ProfileContent.propTypes = {
  className: PropTypes.string,
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      orderNumber: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      total: PropTypes.string.isRequired,
    })
  ),
};

export default ProfileContent;
