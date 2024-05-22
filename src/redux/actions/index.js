export const SAVE_CATEGORIES = "SAVE_CATEGORIES";
export const TURN_OF_SPINNER = "TURN_OF_SPINNER";
export const SAVE_ITEMS = "SAVE_ITEMS";

///FETCHING CATEGORIES

export const fetchCategories = () => {
  return async (dispatch, getState) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch("http://localhost:3001/api/categories", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        let fetchCategorie = await response.json();

        /// ORA AGGIUNGIAMO I LIBRI AL REDUCERS
        dispatch({
          type: SAVE_CATEGORIES,
          payload: fetchCategorie,
        });

        dispatch({
          type: TURN_OF_SPINNER,
        });
      } else {
        console.log("error");
        dispatch({
          type: TURN_OF_SPINNER,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: TURN_OF_SPINNER,
      });
    }
  };
};

export const fetchItemByCategory = (categoryId) => {
  return async (dispatch, getState) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3001/item/categories/${categoryId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        let fetchItem = await response.json();
        /// ORA AGGIUNGIAMO I LIBRI AL REDUCERS
        dispatch({
          type: SAVE_ITEMS,
          payload: fetchItem,
        });

        dispatch({
          type: TURN_OF_SPINNER,
        });
      } else {
        console.log("error");
        dispatch({
          type: TURN_OF_SPINNER,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
