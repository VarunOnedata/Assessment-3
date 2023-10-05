
const initialState = {
    itemsUse: [],
    itemName: '',
    editItemId: null,
    editedItemName: '',
    fetchedItems: [],
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_ITEM':
        return {
          ...state,
          itemsUse: [...state.itemsUse, action.payload],
        };
      case 'EDIT_ITEM':
        return {
          ...state,
          itemsUse: state.itemsUse.map((item) =>
            item.id === action.payload.id ? { ...item, name: action.payload.name } : item
          ),
          editItemId: null,
          editedItemName: '',
        };
      case 'DELETE_ITEM':
        return {
          ...state,
          itemsUse: state.itemsUse.filter((item) => item.id !== action.payload),
          editItemId: null,
        };
      case 'GET_ITEMS':
        return {
          ...state,
          fetchedItems: action.payload,
        };
      case 'CLOSE_FETCHED_ITEM':
        return {
          ...state,
          fetchedItems: state.fetchedItems.filter((item) => item.id !== action.payload),
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  