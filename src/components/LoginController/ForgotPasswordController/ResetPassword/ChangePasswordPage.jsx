import { Backdrop, CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";

const ChangePasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State để xác định trạng thái loading
  const userEmail = localStorage.getItem("email");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Bắt đầu loading khi gửi request

    if (newPassword !== confirmPassword) {
      enqueueSnackbar("The new password and confirm password do not match.", {
        anchorOrigin: { horizontal: "right", vertical: "top" },
        variant: "error",
      });
      setIsLoading(false); // Dừng loading nếu có lỗi
      return;
    }

    try {
      const response = await fetch(
        "https://zodiacjewerly.azurewebsites.net/api/Authen/ResetPassWord",
        {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userEmail,
            password: newPassword,
            confirmPassword: confirmPassword,
          }),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        let errorMessage = "An error occurred while changing the password.";
        if (errorResponse.errors && errorResponse.errors.Password) {
          errorMessage += `\n${errorResponse.errors.Password[0]}`;
        }
        throw new Error(errorMessage);
      }

      enqueueSnackbar("Password change successful!", {
        anchorOrigin: { horizontal: "right", vertical: "top" },
        variant: "success",
      });
      navigate("/login");
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message, {
        anchorOrigin: { horizontal: "right", vertical: "top" },
        variant: "error",
      });
    } finally {
      setIsLoading(false); // Dừng loading sau khi nhận được phản hồi từ API
    }
  };

  return (
    <div>
      <Backdrop
        open={isLoading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="w-full relative bg-light-colors-white-light overflow-hidden flex flex-col items-start justify-start pt-60 px-[472px] box-border gap-[100px] leading-[normal] tracking-[normal] text-left text-[38px] text-slate-900 font-body-medium lg:pl-[400px] lg:pr-[400px] lg:box-border mq450:gap-[25px] mq450:pl-5 mq450:pr-5 mq450:box-border mq750:h-auto mq750:gap-[50px] mq750:pl-[118px] mq750:pr-[118px] mq750:box-border">
        <div className="self-stretch flex flex-col items-center justify-start gap-[32px] max-w-full shrink-0 mq750:gap-[16px]">
          <div className="title-header flex-auto text-6xl leading-10 ">
            <span className="font-bold bg-gradient-custom-header-title bg-clip-text text-transparent">
              Z
            </span>
            <span className="bg-gradient-custom-header-title bg-clip-text text-transparent">
              odiacGems
            </span>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start gap-[20px] max-w-full text-11xl">
            <div className="flex flex-col items-start justify-start gap-[8px] max-w-full">
              <div className="flex flex-row items-center justify-start">
                <h1 className="m-0 relative text-inherit tracking-[-0.01em] leading-[36px] font-semibold font-inherit mq450:text-lg mq450:leading-[22px] mq750:text-5xl mq750:leading-[29px]">
                  Change your password
                </h1>
              </div>
              <div className="relative text-sm leading-[20px] text-slate-500">
                Enter a new password for {userEmail}
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start justify-center max-w-full">
              <form
                onSubmit={handleSubmit}
                className="m-0 self-stretch flex flex-col items-center justify-center gap-[30px] max-w-full"
              >
                <Input
                  ResetPass="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  ResetPassPlaceholder="New password"
                />
                <Input
                  ResetPass="Confirm password"
                  value={confirmPassword}
                  ResetPassPlaceholder="Confirm password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="submit"
                  className="cursor-pointer [border:none] py-2 px-5 bg-slate-900 self-stretch rounded-md flex flex-row items-center justify-center hover:bg-darkslategray"
                >
                  <div className="relative text-sm leading-[24px] font-medium font-body-medium text-light-colors-white-light text-left inline-block min-w-[121px]">
                    Change password
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a86a699345d885d7b39629c6d34c5f78b862847a62aed687bf45d66451bfd25?apiKey=2cf111b7142f4a06bfb2b5c186f14037&"
        className="mt-28 w-full aspect-[5] max-md:mt-10 max-md:max-w-full"
      />
    </div>
  );
};

export default ChangePasswordPage;
