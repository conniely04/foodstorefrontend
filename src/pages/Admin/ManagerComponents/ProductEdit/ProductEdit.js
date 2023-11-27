import React, { useState } from 'react';
import './ProductEdit.css';

function ProductEdit({ product, onSave, onClose }) {
    const [formData, setFormData] = useState({
        name: product.name,
        price: product.price,
        outOfStock: product.outOfStock,
        image: product.image
    });

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    };

    const handleSave = () => onSave(formData);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setFormData(prevFormData => ({ ...prevFormData, image: imageUrl }));
    };

    const toggleOutOfStock = () => {
        setFormData(prevFormData => ({ ...prevFormData, outOfStock: !prevFormData.outOfStock }));
    };

    return (
        <div className="product-edit-modal">
            <div className="product-edit-content">
                <button className="product-edit-close-button" onClick={onClose}>X</button>
                <form className="product-edit-form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                    <label htmlFor="name">Name:</label>
                    <input id="name" name="name" value={formData.name} onChange={handleFormChange} />
                    
                    <label htmlFor="price">Price:</label>
                    <input id="price" name="price" value={formData.price} onChange={handleFormChange} />
                    
                    <label htmlFor="image">Change Image:</label>
                    <input id="image" name="image" type="file" onChange={handleFileChange} />
                    
                    <div className="out-of-stock-checkbox">
                        <label htmlFor="outOfStock">Out of Stock:</label>
                        <input id="outOfStock" name="outOfStock" type="checkbox" checked={formData.outOfStock} onChange={toggleOutOfStock} />
                    </div>
                    
                    <button type="submit" className="product-edit-save-button">Save</button>
                </form>
            </div>
        </div>
    );
}

export default ProductEdit;
