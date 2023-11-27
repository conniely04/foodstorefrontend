import axios from 'axios';

// const getUser = () =>
//   localStorage.getItem("user")
//     ? JSON.parse(localStorage.getItem("user"))
//     : null;


//     const fetchCartData = async () => {

//       const user = getUser();
//       try {
//         const response = await axios.get('http://localhost:5001/api/cart', {
//           headers: {
//             Authorization: `Bearer ${user.token}`
//           }
//         });
//         // Handle the response
//         console.log(response.data);
//         return response.data;
//       } catch (error) {
//         // Handle any errors
//         console.error('Error fetching cart:', error);
//         throw error;
//       }
//     };

//     fetchCartData();


export const addToCart = async (userId, productId, quantity) => {
  return axios.post(`http://localhost:5001/api/cart/add`, { userId, productId, quantity });
};

export const removeFromCart = async (userId, itemId) => {
  return axios.delete(`http://localhost:5001/api/cart/remove/${userId}/${itemId}`);
};

export const updateCart = async (userId, items) => {
  return axios.put(`http://localhost:5001/api/cart/update`, { userId, items });
};
