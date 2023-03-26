import { useNavigate } from "react-router-dom";
import { switchLoginStatus } from "./auth";
import { showNotification } from "./ui-slice";

// export const fetchCartData = () => {
//   return async (dispatch) => {
//     const fetchData = async () => {
//       const response = await fetch(
//         'https://react-http-6b4a6.firebaseio.com/cart.json'
//       );



//       if (!response.ok) {
//         throw new Error('Could not fetch cart data!');
//       }

//       const data = await response.json();

//       return data;
//     };

//     try {
//       const cartData = await fetchData();
//       dispatch(
//         cartActions.replaceCart({
//           items: cartData.items || [],
//           totalQuantity: cartData.totalQuantity,
//         })
//       );
//     } catch (error) {
//       dispatch(
//         uiActions.showNotification({
//           status: 'error',
//           title: 'Error!',
//           message: 'Fetching cart data failed!',
//         })
//       );
//     }
//   };
// };



export const login = (userData) => {
  return async (dispatch) => {
    dispatch(
      showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending user data!',
      })
    );
    const navigate = useNavigate();
    const sendRequest = async () => {
      const response = await fetch(
        'https://react-http-ace2a-default-rtdb.firebaseio.com/users.json',
        {
          method: 'POST',
          body: JSON.stringify({
            email: userData.email,
            password: userData.password
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Sending user data failed.');
      }
    };

    try {
      await sendRequest();
   
      dispatch(
        showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent user data successfully!',
        })
      );
    } catch (error) {
      dispatch(
        showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending user data failed!',
        })
      );
    }
  };
};
export const registerUser = (userData) => {
  return async (dispatch) => {
    dispatch(
      showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending user data!',
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        process.env.API_URL+'/users.json',
        {
          method: 'POST',
          body: JSON.stringify({
            fullName : userData.fullName,
            email: userData.email,
            password: userData.password
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Sending user data failed.');
      }else{
        dispatch(switchLoginStatus())
      }
    };

    try {
      await sendRequest();
       
      dispatch(
        showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent user data successfully!',
        })
      );
    } catch (error) {
      dispatch(
        showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending user data failed!',
        })
      );
    }
  };
};
