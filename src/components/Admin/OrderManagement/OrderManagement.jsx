import TextField from "@mui/material/TextField";
import Table from "./TableOrder";
function OrdersManagement() {
  const data = [
    {
      OrderNumber: "12345",
      Date: "2024-01-01",
      Status: "Completed",
      TotalPrice: "$100.00",
    },
    {
      OrderNumber: "12346",
      Date: "2024-02-01",
      Status: "Pending",
      TotalPrice: "$150.00",
    },
    {
      OrderNumber: "12347",
      Date: "2024-03-01",
      Status: "Shipped",
      TotalPrice: "$200.00",
    },
    {
      OrderNumber: "12348",
      Date: "2024-04-01",
      Status: "Cancelled",
      TotalPrice: "$250.00",
    },
  ];

  return (
    <div>
      <div className="flex flex-row justify-between w-full items-center">
        <h1 className="font-serif  text-[30px] w-[394px] relative text-inherit leading-[48px] font-bold font-inherit inline-block shrink-0 max-w-full mq450:text-[23px] mq450:leading-[29px] mq1050:text-11xl mq1050:leading-[38px]">
          Order Management
        </h1>
        <TextField
          id="standard-textarea"
          label="Search"
          placeholder="Search orders"
          multiline
          variant="standard"
          sx={{ width: "30%" }}
        />
      </div>
      <section className="w-full mt-8">
        <Table data={data} />
      </section>
    </div>
  );
}

export default OrdersManagement;
