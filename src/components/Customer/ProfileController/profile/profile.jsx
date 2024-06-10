import axios from "axios";
import { useEffect, useState } from "react";
import "./profile.css"; // Import file CSS

function Profile() {
  const [profileData, setProfileData] = useState({
    email: "",
    name: "",
    phoneNumber: "",
    address: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // Biến tạm thời để lưu giá trị trước đó của trường số điện thoại
  const [prevPhoneNumber, setPrevPhoneNumber] = useState("");

  useEffect(() => {
    // Giả sử API endpoint để lấy thông tin profile là /api/profile
    axios
      .get("/api/profile")
      .then((response) => {
        setProfileData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the profile data!", error);
        setIsLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      if (/^0\d{0,9}$/.test(value) || value === "") {
        setProfileData({ ...profileData, [name]: value });
      }
    } else {
      setProfileData({ ...profileData, [name]: value });
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      if (!/^\d*$/.test(value)) {
        // Sử dụng biến tạm thời để tránh hiển thị "undefined"
        e.target.value = prevPhoneNumber !== undefined ? prevPhoneNumber : "";
      } else {
        setPrevPhoneNumber(value); // Cập nhật giá trị trước đó của trường số điện thoại
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUpdating(true);
    // Giả sử API endpoint để cập nhật thông tin profile là /api/profile
    axios
      .put("/api/profile", profileData)
      .then((response) => {
        console.log("Profile updated successfully:", response.data);
        setIsUpdating(false);
      })
      .catch((error) => {
        console.error("There was an error updating the profile!", error);
        setIsUpdating(false);
      });
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <div className="profile-container">
        <h2 className="profile-header">Account profile</h2>
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={profileData.email}
              name="email"
              disabled
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={profileData.name}
              name="name"
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="text"
              value={profileData.phoneNumber}
              name="phoneNumber"
              onChange={handleChange}
              onInput={handleInput}
              required
              className="form-control"
              maxLength="10"
              pattern="^0\d{9}$"
              title="Phone number must start with 0 and be 10 digits long."
            />
          </div>
          <div className="form-group">
            <label>Delivery address:</label>
            <input
              type="text"
              value={profileData.address}
              name="address"
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <button type="submit" disabled={isUpdating} className="btn-submit">
            {isUpdating ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Profile;
