import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './ItemCrud.css';
import itemReducer from './itemReducer';

const ItemCRUD = () => {
  const [items, setItems] = useState([]);
  console.log('dispatch',items)

  const itemsUse = useSelector((state) => state.itemsUse);
  const dispatch = useDispatch();

  const [itemName, setItemName] = useState('');
  const [itemEmail, setItemEmail] = useState('');
  const [itemDomain, setItemDomain] = useState('');
  const [itemPlace, setItemPlace] = useState('');
  const [itemAge, setItemAge] = useState('');

  const [editItemId, setEditItemId] = useState(null);
  const [editedItemName, setEditedItemName] = useState('');
  const [editedItemEmail, setEditedItemEmail] = useState('');
  const [editedItemDomain, setEditedItemDomain] = useState('');
  const [editedItemPlace, setEditedItemPlace] = useState('');
  const [editedItemAge, setEditedItemAge] = useState('');

  

  const [fetchedItems, setFetchedItems] = useState([]);

  // const itemsUse = useSelector((state) => state.items);
  // console.log('itemUse',itemsUse)
  // const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const [submittedData, setSubmittedData] = useState([]);


  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name] git push --set-upstream origin main: value,
  //   });
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newSubmittedData = [...submittedData, formData];
    setSubmittedData(newSubmittedData);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
    });
  };

  useEffect(() => {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
      console.log('storedItems');

    }
  }, []);

  const handleAddItem = () => {
    if (editItemId !== null) {
      const updatedItems = items.map((item) =>
        item.id === editItemId ? { ...item, name: editedItemName,email: editedItemEmail,domain:editedItemDomain,
        place: editedItemPlace,age:editedItemAge } : item
        

      );
      dispatch({
        type: 'UPDATE_ITEM',
        payload: {
          id: editItemId,
          name: editedItemName,
          email: editedItemEmail,
          domain: editedItemDomain,
          place: editedItemPlace,
          age: editedItemAge,
        },
      });
      setItems(updatedItems);
      setEditItemId(null);
      setEditedItemName('');
      setEditedItemEmail('');
      setEditedItemDomain('');
      setEditedItemPlace('');
      setEditedItemAge('');


      localStorage.setItem('items', JSON.stringify(updatedItems));
    } else {
      const newItem = {
        id: items.length + 1,
        name: itemName,
        email: itemEmail,
        domain: itemDomain,
        place: itemPlace,
        age: itemAge,
      };
      
      const updatedItems = [...items, newItem];
      setItems(updatedItems);

      localStorage.setItem('items', JSON.stringify(updatedItems));

      setItemName('');
      setItemEmail('');
      setItemDomain('');
      setItemPlace('');
      setItemAge('');
      dispatch({ type: 'ADD_ITEM', payload: newItem });
    }
  
  };

  const handleEditItem = (id, name) => {
    setEditItemId(id);
    setEditedItemName(name);
    // setEditedItemEmail(email);
    // setEditedItemDomain(domain);
    // setEditedItemPlace(place);
    // setEditedItemAge(age);

  };

  const handleDeleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    setEditItemId(null); 

    localStorage.setItem('items', JSON.stringify(updatedItems));
  };

  const handleGetItems = () => {
    fetch('/db.json') 
      .then((response) => response.json())
      .then((data) => {
        if (data.items) {
          setFetchedItems(data.items);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  };
  // const handleCloseFetchedItem = (id) => {
  //   const updatedFetchedItems = fetchedItems.filter((item) => item.id !== id);
  //   setFetchedItems(updatedFetchedItems);
  // }

  return (
    <div className="page">
      <br/>
      <div class="card">
        <div class="container mt-5">
      <h2>Form</h2>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <input
        type="text"
        class="form-control"
        placeholder=" Name"
        value={editItemId !== null ? editedItemName : itemName}
        onChange={(e) =>
          editItemId !== null ? setEditedItemName(e.target.value) : setItemName(e.target.value)
        }
      />
        </div>
        <br/>
        <div>
          <input
            type="email"
            class="form-control"
            id="email"
            name="email"
            placeholder=" Email"
            value={editItemId !== null ? editedItemEmail : itemEmail}
            onChange={(e) =>
              editItemId !== null ? setEditedItemEmail(e.target.value) : setItemEmail(e.target.value)
            }
          />
        </div>
        <br/>

        <div>
          <input
            type="text"
            id="domain"
            name="Domain"
            placeholder=" Domain"
            class="form-control"

            value={editItemId !== null ? editedItemDomain : itemDomain}
            onChange={(e) =>
              editItemId !== null ? setEditedItemDomain(e.target.value) : setItemDomain(e.target.value)
            }
          />
        </div>
        <br/>

        <div>
          <input
            type="text"
            id="email"
            name="email"
            placeholder=" Place"
            class="form-control"

            value={editItemId !== null ? editedItemPlace : itemPlace}
            onChange={(e) =>
              editItemId !== null ? setEditedItemPlace(e.target.value) : setItemPlace(e.target.value)
            }
          />
        </div>
        <br/>

        <div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder=" Age"
            class="form-control"

            value={editItemId !== null ? editedItemAge : itemAge}
            onChange={(e) =>
              editItemId !== null ? setEditedItemAge(e.target.value) : setItemAge(e.target.value)
            }
          />
        </div>
        <br/>
        <button onClick={handleAddItem} class="btn btn-primary">
        {editItemId !== null ? 'Save Edit' : 'Add Item'}
      </button>
      <br/><br/>
            </form>
      {/* <div>
        <h2>Submitted Data</h2>
        <ul>
          {submittedData.map((data, index) => (
            <li key={index}>
              First Name: {data.firstName}, Last Name: {data.lastName}, Email: {data.email}
            </li>
          ))}
        </ul>
      </div> */}
    </div>
</div>
<br/>
<div class="card">
  <br/>
    <div className="item-box">
        <h3>Stored Items</h3>
        <table className="table1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Domain</th>
              <th>Place</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {items.map((item) => (
                <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.domain}</td>
                <td>{item.place}</td>
                <td>{item.age}</td>
                <td><button class="btn btn-primary" onClick={() => handleEditItem(item.id, item.name)}>Edit</button>
              <button class="btn btn-secondary" onClick={() => handleDeleteItem(item.id)}>Delete</button>
              </td>

              </tr>
              
            ))}
          </tbody>  
        </table>
      </div>
</div>
    <br/>
    <div class="card">

    <div className="item-box">
        <h3>Fetched Table</h3>
        <button onClick={handleGetItems} class="btn btn-primary">Get Items</button>
<br/><br/>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Domain</th>
              <th>Place</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {fetchedItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.domain}</td>
                <td>{item.place}</td>
                <td>{item.age}</td>
              </tr>
            ))}
          </tbody>
        </table>

         
      </div>
    </div>
  
    </div>
    
  );
};

export default ItemCRUD;


