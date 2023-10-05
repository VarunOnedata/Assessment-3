const initialState = {
    itemsUse: [],
  };
  
  const itemReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_ITEM':
        return {
          ...state,
          itemsUse: [...state.itemsUse, action.payload],
        };
      case 'UPDATE_ITEM':
        return {
          ...state,
          itemsUse: state.itemsUse.map((item) =>
            item.id === action.payload.id ? action.payload : item
          ),
        };
      case 'DELETE_ITEM':
        return {
          ...state,
          itemsUse: state.itemsUse.filter((item) => item.id !== action.payload),
        };
      default:
        return state;
    }
  };
  
  export default itemReducer;
  