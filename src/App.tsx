import React, { useState } from "react";
import "./App.scss";

interface Item {
  id: number;
  name: string;
  content: string;
  date: Date;
}

const App: React.FC = () => {
  const [items, setItems] = useState<Array<Item>>([
    {
      id: 0,
      name: "pouet",
      content: "first article",
      date: new Date()
    },
    {
      id: 1,
      name: "test",
      content: "seconde article who don't have much to say",
      date: new Date()
    }
  ]);

  const handleClick = () => {
    const newItem: Item = {
      id: items.length,
      name: `New item ${items.length}`,
      content: "This is a new item juste create",
      date: new Date()
    };
    setItems([...items.sort((a: Item, b: Item) => a.id - b.id), newItem]);
  };

  return (
    <div className="app">
      <header>
        <h1>Dev-Log</h1>
        <button onClick={handleClick}>Add</button>
      </header>
      <main>
        {items.reverse().map((item: Item) => (
          <article className="item">
            <h2>{item.name}</h2>
            <div>{item.content}</div>
          </article>
        ))}
      </main>
    </div>
  );
};

export default App;
