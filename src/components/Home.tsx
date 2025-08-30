import { ChangeEvent, useState } from "react";
import MDXRenderer from "./MDXRenderer";

const CheckList = ({ items }: { items: { title: string; check: boolean }[] }) => {
  const [itemsState, setItemsState] = useState(items);

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    const itemId = e.target.id;
    setItemsState(
      itemsState.map((i) => (i.title == itemId ? { title: i.title, check: !i.check } : i))
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {itemsState.map((item) => (
        <label key={item.title} id={item.title}>
          <input type="checkbox" id={item.title} checked={item.check} onChange={change} />
          {item.title}
        </label>
      ))}
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
          { title: "implement MDX renderer", check: true },
          { title: "create blog class", check: true },
          { title: "create post class", check: true },
          { title: "basic blog and post pages", check: false },
          { title: "user authentication", check: false },
          { title: "link firebase DB", check: false },
          { title: "host on firestore", check: false },
          { title: "link to Google Analytics", check: false },
        ]}
      />
    </>
  );
}
