import { useState } from "react";

interface IToDo {
  title: string;
  done: boolean;
}

const CheckList = ({ items }: { items: IToDo[] }) => {
  const [itemsState, _setItemsState] = useState<IToDo[]>(items);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <ol>
        {itemsState.map((item) => (
          <li key={item.title} id={item.title}>
            <input type="checkbox" id={item.title} checked={item.done} readOnly /> {item.title}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default function Home() {
  return (
    <>
      <h1>Macro4BIM</h1>
      <h2>Home</h2>
      <p>
        New webapp based ofn <strong>Google Firebase</strong>. On the pipeline there are items such
        as:
      </p>
      <CheckList
        items={[
          { title: "implement MDX renderer", done: true },
          { title: "create blog class", done: true },
          { title: "create post class", done: true },
          { title: "basic blog and post pages", done: true },
          { title: "user authentication", done: true },
          { title: "link firebase DB", done: true },
          { title: "create 3+ posts", done: false },
          { title: "IMPROVE GRAPHICS", done: false },
          { title: "host on firestore", done: false },
          { title: "link to Google Analytics", done: false },
        ]}
      />
    </>
  );
}
