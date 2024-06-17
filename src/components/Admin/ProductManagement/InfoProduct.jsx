import { Backdrop, CircularProgress } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  Material,
  categories,
  genders,
  getCategoryName,
  getGenderName,
  getMaterialName,
  getZodiacName,
  zodiacs,
} from "./ChangeIDtoName";

const InforProduct = ({ product, onUpdate, Action, onGetAll }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ ...product });
  const [showImages, setShowImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchImageInfo();
  }, []);

  const fetchImageInfo = async () => {
    try {
      const response = await axios.get(
        "https://zodiacjewerly.azurewebsites.net/api/image"
      );
      const imageData = response.data.data; // Ensure the correct data structure
      console.log("Fetched image data:", imageData); // Log image data
      localStorage.setItem("imageData", JSON.stringify(imageData));
    } catch (error) {
      console.error("Error fetching image info:", error);
      enqueueSnackbar("Failed to fetch image info.", { variant: "error" });
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await onUpdate(editedProduct);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleCancel = () => {
    setEditedProduct({ ...product }); // Reset edited data
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: name.endsWith("Id") ? parseInt(value) : value,
    }));
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (files.length === 0) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    setLoading(true);
    try {
      const uploadResponse = await axios.post(
        `https://zodiacjewerly.azurewebsites.net/api/products/${product.id}/images`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const newImageURLs = uploadResponse.data["image-urls"] || [];
      if (!Array.isArray(newImageURLs)) {
        throw new Error("Image URLs are not in an array format");
      }

      setEditedProduct((prev) => ({
        ...prev,
        imageURLs: [...prev.imageURLs, ...newImageURLs],
      }));

      await onGetAll();

      Swal.fire("Success", "Images uploaded successfully!", "success");
    } catch (error) {
      console.error("Error uploading images:", error);
      enqueueSnackbar("Failed to upload images.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpdate = async (imageURL, newFile) => {
    const imageData = JSON.parse(localStorage.getItem("imageData")) || [];
    console.log("Loaded image data:", imageData); // Log loaded image data

    if (!Array.isArray(imageData)) {
      enqueueSnackbar("Failed to find image info for the URL.", {
        variant: "error",
      });
      return;
    }

    const imageInfo = imageData.find((img) => img["image-url"] === imageURL);
    console.log("Image info found:", imageInfo); // Log found image info

    if (!imageInfo) {
      enqueueSnackbar("Failed to find image info for the URL.", {
        variant: "error",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", newFile);

    setLoading(true);
    try {
      await axios.put(
        `https://zodiacjewerly.azurewebsites.net/api/products/${product.id}/images/${imageInfo.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await onGetAll();
      Swal.fire("Success", "Image updated successfully!", "success");
    } catch (error) {
      console.error("Error updating image:", error);
      enqueueSnackbar("Failed to update image.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between text-center py-2 border-b border-gray-200 hover:bg-gray-100 transition duration-300">
      {[
        { content: product.id },
        {
          content: isEditing ? (
            <input
              type="text"
              name="nameProduct"
              value={editedProduct.nameProduct}
              onChange={handleChange}
              className="border px-1 py-1 rounded w-full"
            />
          ) : (
            product.nameProduct
          ),
        },
        {
          content: isEditing ? (
            <input
              type="text"
              name="descriptionProduct"
              value={editedProduct.descriptionProduct}
              onChange={handleChange}
              className="border px-1 py-1 rounded w-full"
            />
          ) : (
            product.descriptionProduct
          ),
        },
        {
          content: isEditing ? (
            <input
              type="number"
              name="price"
              value={editedProduct.price}
              onChange={handleChange}
              className="border px-1 py-1 rounded w-full"
            />
          ) : (
            product.price
          ),
        },
        {
          content: isEditing ? (
            <input
              type="text"
              name="quantity"
              value={editedProduct.quantity}
              onChange={handleChange}
              className="border px-1 py-1 rounded w-full"
            />
          ) : (
            product.quantity
          ),
        },
        {
          content: isEditing ? (
            <select
              name="categoryId"
              value={editedProduct.categoryId}
              onChange={handleChange}
              className="border px-1 py-1 rounded w-full"
            >
              <option value="">Select Category</option>
              {Object.entries(categories).map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          ) : (
            getCategoryName(product.categoryId)
          ),
        },
        {
          content: isEditing ? (
            <select
              name="materialId"
              value={editedProduct.materialId}
              onChange={handleChange}
              className="border px-1 py-1 rounded w-full"
            >
              <option value="">Select Material</option>
              {Object.entries(Material).map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          ) : (
            getMaterialName(product.materialId)
          ),
        },
        {
          content: isEditing ? (
            <select
              name="genderId"
              value={editedProduct.genderId}
              onChange={handleChange}
              className="border px-1 py-1 rounded w-full"
            >
              <option value="">Select Gender</option>
              {Object.entries(genders).map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          ) : (
            getGenderName(product.genderId)
          ),
        },
        {
          content: isEditing ? (
            <select
              name="zodiacId"
              value={editedProduct.zodiacId}
              onChange={handleChange}
              className="border px-1 py-1 rounded w-full"
            >
              <option value="">Select Zodiac</option>
              {Object.entries(zodiacs).map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          ) : (
            getZodiacName(product.zodiacId)
          ),
        },
        {
          content: (
            <>
              <button
                onClick={() => setShowImages(true)}
                className="text-blue-500 underline"
              >
                View Images
              </button>
              {showImages && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-white p-4 rounded max-w-sm w-full">
                    <h2 className="text-lg font-semibold ">Product Images</h2>
                    <p className="mb-4 text-gray-400">
                      (Click to image to update the image)
                    </p>
                    <div className="grid grid-cols-2 w-full p-5  gap-4 border border-gray-300 rounded-lg  shadow-md">
                      {editedProduct.imageURLs.map((url, index) => (
                        <div
                          key={index}
                          className=" relative overflow-hidden border border-gray-200 rounded-md shadow-sm transition-transform duration-300 ease-in-out transform hover:shadow-lg hover:scale-105 "
                        >
                          <img
                            src={url}
                            alt={`Product ${index}`}
                            className="w-36 h-36 object-cover rounded-md"
                          />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageUpdate(url, e.target.files[0])
                            }
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-row justify-end gap-1 mt-4">
                      <label
                        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                        title="Upload images here"
                      >
                        Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                      <button
                        onClick={() => setShowImages(false)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ),
        },
      ].map((item, index) => (
        <div key={index} className="w-1/12 text-gray-500 font-medium">
          {item.content}
        </div>
      ))}
      <div className="text-xs uppercase text-gray-500 font-medium">
        {isEditing ? (
          <div className="flex w-full">
            <button onClick={handleSave} className="text-blue-500 w-1/2">
              Save
            </button>
            <button onClick={handleCancel} className="text-red-500 w-1/2">
              Cancel
            </button>
          </div>
        ) : (
          <button
            id={`edit-button-${product.id}`}
            onClick={handleEdit}
            className="w-full text-blue-500"
          ></button>
        )}
        {Action}
      </div>
      <Backdrop open={loading} style={{ color: "#fff", zIndex: 9999 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

InforProduct.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nameProduct: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    categoryId: PropTypes.number.isRequired,
    materialId: PropTypes.number.isRequired,
    genderId: PropTypes.number.isRequired,
    zodiacId: PropTypes.number.isRequired,
    descriptionProduct: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    imageURLs: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onGetAll: PropTypes.func.isRequired,
  Action: PropTypes.node.isRequired,
};

export default InforProduct;
