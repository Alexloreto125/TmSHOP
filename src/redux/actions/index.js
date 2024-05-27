export const SAVE_CATEGORIES = "SAVE_CATEGORIES";
export const TURN_OF_SPINNER = "TURN_OF_SPINNER";
export const SAVE_ITEMS = "SAVE_ITEMS";
export const RESET_CART = "RESET_CART";
export const AGGIUNGI_CARRELLO = "AGGIUNGI_CARRELLO";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const CREATE_ITEM = "CREATE_ITEM";

export const SAVE_STORICO = "SAVE_STORICO";

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
        /// ORA AGGIUNGIAMO ITEMS AL REDUCERS
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

export const addToCartAction = (itemSelected) => {
  return (dispatch, getState) => {
    console.log(getState());

    dispatch({
      type: AGGIUNGI_CARRELLO,
      payload: itemSelected,
    });
    if (getState().cart.content.length < 3) {
      console.log(
        " finora hai aggiunto " + getState().cart.content.length + " item"
      );
    }
  };

  // return {
  //   type: AGGIUNGI_CARRELLO, // proprietà obbligatoria
  //   payload: bookSelected, // proprietà caldamente consigliata perchè passa un dato!
  // };
};

export const removeFromCartAction = (i) => {
  return (dispatch, getState) => {
    dispatch({
      type: DELETE_FROM_CART,
      payload: i,
    });
  };
};

export const resetCartAction = () => {
  return {
    type: RESET_CART,
  };
};

export const getAllStorico = (userId) => {
  return async (dispatch, getState) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/fatture/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const fetchStorico = await response.json();
        console.log(fetchStorico);
        /// ORA AGGIUNGIAMO Storico AL REDUCERS
        dispatch({
          type: SAVE_STORICO,
          payload: fetchStorico,
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
