import Content from "./ProfileContent";
import Main from "./ProfileMain";

const AccountOrders = () => {
  return (
    <div className="w-full relative bg-light-colors-white-light overflow-hidden flex flex-col items-center justify-start pt-16 pb-24 pr-5 pl-[23px] box-border gap-[134px] leading-[normal] tracking-[normal] lg:gap-[67px] mq450:gap-[17px] mq750:gap-[33px]">
      <Main />
      <Content />
    </div>
  );
};

export default AccountOrders;
