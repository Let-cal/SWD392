import PropTypes from "prop-types";
import { useState } from "react";
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

const InforProduct = ({ product, onUpdate, Action }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ ...product });

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
    setEditedProduct({ ...product }); // Reset lại dữ liệu đã chỉnh sửa
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: name.endsWith("Id") ? parseInt(value) : value,
    }));
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
      ].map((item, index) => (
        <div
          key={index}
          className="w-1/12 px-1 text-left text-xs uppercase text-gray-500 font-medium"
        >
          {item.content}
        </div>
      ))}

      <div className="w-1/12 px-1 text-left text-xs uppercase text-gray-500 font-medium">
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
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  Action: PropTypes.node.isRequired,
};

export default InforProduct;
