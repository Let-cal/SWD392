import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";

const ProfileContent = ({ className = "", orders = [] }) => {
  const statusClasses = {
    Delivered: "text-green-600 font-bold",
    Processing: "text-yellow-600 font-bold ",
    Shipped: "text-blue-600 font-bold",
    Cancelled: "text-red-600 font-bold",
  };

  // Kiểm tra xem có orders hay không để quyết định hiển thị nội dung tương ứng
  const showOrdersTable = orders.length > 0;

  return (
    <div>
      {showOrdersTable ? (
        <section
          className={`w-[1251px] flex flex-col items-start justify-start pt-0 pb-[116px] pr-0 pl-[3px] box-border max-w-full text-left text-xl text-light-colors-dark-gray-light font-px-heading-5 mq450:pb-[75px] mq450:box-border ${className}`}
        >
          <div className="Table-ordered w-full flex flex-col items-start justify-start gap-[27px] max-w-full">
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
                  className="w-full flex flex-row items-center justify-between gap-[20px] max-w-full p-4 bg-white shadow-md rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  <div className="flex-1 flex flex-col items-start justify-start">
                    <div className="relative leading-[27px]">
                      {order.orderNumber}
                    </div>
                  </div>
                  <div className="flex-1 relative leading-[27px]">
                    {order.date}
                  </div>
                  <div
                    className={`flex-1 flex flex-col items-start justify-start ${
                      statusClasses[order.status]
                    }`}
                  >
                    <div className="relative leading-[27px]">
                      {order.status}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col items-start justify-start">
                    <div className="relative leading-[27px]">{order.total}</div>
                  </div>
                  <div className="flex-1 flex flex-col items-start justify-start text-light-colors-accent-light">
                    <Button
                      variant="contained"
                      endIcon={<VisibilityIcon />}
                      sx={{
                        backgroundColor: "black",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "gray",
                        },
                      }}
                    >
                      View details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <div className="self-stretch bg-light-colors-light-gray-light flex flex-col items-end justify-start pt-px px-0 pb-[21px] box-border gap-[17px] max-w-full text-base text-light-colors-black-light">
          {/* Nội dung thay thế cho khi không có orders */}
          <div className="self-stretch h-[68px] relative bg-light-colors-light-gray-light hidden" />
          <div className="self-stretch h-0.5 relative box-border z-[1] border-t-[2px] border-solid border-light-colors-accent-light" />
          <div className="self-stretch flex flex-row items-start justify-end py-0 pr-[39px] pl-10 box-border max-w-full">
            <div className="flex-1 flex flex-row items-start justify-between max-w-full gap-[20px] mq750:flex-wrap">
              <div className="w-[287px] relative leading-[27px] inline-block shrink-0 z-[1]">
                No downloads available yet.
              </div>
              {/* Thay đổi từ input sang link */}
              <a
                href="/customer-page"
                className="w-[148px] text-[15px] [border:none] [outline:none] bg-[transparent] h-[25px] flex flex-col items-start justify-start pt-1 px-0 pb-0 box-border font-px-heading-5 font-bold text-light-colors-accent-light"
              >
                BROWSE PRODUCT
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
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
