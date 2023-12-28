import React, { useState, useEffect } from 'react';
import './App.css'
import ShoppingList from '/Shoppinglsit.png'

const ShoppingListApp = () => {
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [shoppingList, setShoppingList] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [editItemId, setEditItemId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedList = localStorage.getItem('shoppingList');
    if (storedList) {
      setShoppingList(JSON.parse(storedList));
    }
  }, []);

  const addItem = () => {
    if (itemName.trim() !== '') {
      if (isEditing) {
        const updatedList = shoppingList.map((item) =>
          item.id === editItemId
            ? { ...item, name: itemName, quantity: itemQuantity }
            : item
        );
        setShoppingList(updatedList);
        setEditItemId(null);
        setIsEditing(false);
      } else {
        const newItem = {
          id: Date.now(),
          name: itemName,
          quantity: itemQuantity,
          bought: false,
        };

        const updatedList = [...shoppingList, newItem];
        setShoppingList(updatedList);
      }

      localStorage.setItem('shoppingList', JSON.stringify(shoppingList));

      setItemName('');
      setItemQuantity('');
    }
  };

  const removeItem = (id) => {
    const updatedList = shoppingList.filter((item) => item.id !== id);
    setShoppingList(updatedList);
    localStorage.setItem('shoppingList', JSON.stringify(updatedList));
  };

  const toggleBought = (id) => {
    const updatedList = shoppingList.map((item) =>
      item.id === id ? { ...item, bought: !item.bought } : item
    );
    setShoppingList(updatedList);
    localStorage.setItem('shoppingList', JSON.stringify(updatedList));
  };

  const handleEditItem = (id, name, quantity) => {
    setEditItemId(id);
    setItemName(name);
    setItemQuantity(quantity);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditItemId(null);
    setItemName('');
    setItemQuantity('');
    setIsEditing(false);
  };

  const filteredList = shoppingList.filter((item) =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="container">
      <img src={ShoppingList} alt="ShoppingİMG" />
      <h1>Alışveriş Listesi</h1>
      <div>
        <input
          type="text"
          placeholder="Ürün adı girin"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Miktar"
          value={itemQuantity}
          onChange={(e) => setItemQuantity(e.target.value)}
        />
        {isEditing ? (
          <div>
            <button onClick={addItem}>Düzenle</button>
            <button onClick={handleCancelEdit}>İptal</button>
          </div>
        ) : (
          <button onClick={addItem}>Ekle</button>
        )}
      </div>
      <div>
        <label htmlFor="filterText">Ürün İsmine Göre Filtrele:</label>
        <input
          type="text"
          id="filterText"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>
      <ul>
        {filteredList.map((item) => (
          <li key={item.id} className={item.bought ? 'bought' : ''}>
            <input
              type="checkbox"
              checked={item.bought}
              onChange={() => toggleBought(item.id)}
            />
            <span>
              {item.name} - {item.quantity}
            </span>
            <button onClick={() => handleEditItem(item.id, item.name, item.quantity)}>
              Düzenle
            </button>
            <button onClick={() => removeItem(item.id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingListApp;
