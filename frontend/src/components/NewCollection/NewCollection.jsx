import { useEffect, useState } from 'react';
import Item from '../Item/Item';

const NewCollections = () => {
  const [newCollection, setNewCollection] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/newcollections')
      .then((response) => response.json())
      .then((data) => setNewCollection(data));
  }, []);

  return (
    <div className="bg-gray-50 p-6 sm:p-8 md:p-10 rounded-lg shadow-lg">
    <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">NEW COLLECTIONS</h1>
    <hr className="border-t-2 border-gray-200 mb-10" />
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {Array.isArray(newCollection) && newCollection.length > 0 ? (
        newCollection.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))
      ) : (
        <p>No new collections available.</p> // Handle the case when there's no data
      )}
    </div>
  </div>
  );
};

export default NewCollections;
