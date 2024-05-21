export const GET_PROFILE = "GET_PROFILE";
export const TURN_OF_SPINNER = "TURN_OF_SPINNER";

export const UPDATE_PROFILE = "UPDATE_PROFILE";

export const fetchMeProfile = () => {
  return async (dispatch, getState) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch("http://localhost:3001/users/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        let fetchMeInfo = await response.json();
        dispatch({
          type: GET_PROFILE,
          payload: fetchMeInfo,
        });

        dispatch({
          type: TURN_OF_SPINNER,
        });
      } else {
        console.log("Error");
        dispatch({
          type: TURN_OF_SPINNER,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: TURN_OF_SPINNER,
      });
    }
  };
};

export const updateProfileFetch = (field, value) => {
  return async (dispatch, getState) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch("http://localhost:3001/users/me", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [field]: value }),
      });
      if (response.ok) {
        let updateFetch = await response.json();
        dispatch({
          type: UPDATE_PROFILE,
          payload: { field, value: updateFetch[field] },
        });
      } else {
        console.log("Error updating profile");
      }
    } catch (err) {
      console.log(err);
    }
  };
};
