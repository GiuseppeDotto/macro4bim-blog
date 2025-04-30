import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

interface IToDo {
  id: string;
  title: string;
  done: boolean;
}

export default function ToDoList() {
  const [newTitle, setNewTitle] = useState("");
  const [toDoList, setToDoList] = useState<IToDo[]>([]);

  const refColl = collection(db, "to-do");

  useEffect(() => {
    const unsubscribe = onSnapshot(refColl, (snapshot) => {
      setToDoList(
        snapshot.docs
          .map((elem) => ({ id: elem.id, ...elem.data() } as IToDo))
          .sort((a, b) => a.title.localeCompare(b.title))
      );
    });

    return () => unsubscribe();
  }, []);

  const updateTodo = async (todo: IToDo) => {
    await updateDoc(doc(db, "to-do", todo.id), { title: todo.title, done: todo.done });
  };

  const removeTodo = async (todo: IToDo) => {
    await deleteDoc(doc(db, "to-do", todo.id));
  };

  const addTodo = async (title: string) => {
    await addDoc(refColl, { title, done: false });
  };

  return (
    <>
      <h3>To-Do List 🔮</h3>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {toDoList.map((item) => {
          return (
            <li
              key={item.id}
              onMouseEnter={(e) => {
                const innerSpan = (e.target as HTMLInputElement).querySelector("span");
                innerSpan ? (innerSpan.style.display = "inline") : null;
              }}
              onMouseLeave={(e) => {
                const innerSpan = (e.target as HTMLInputElement).querySelector("span");
                innerSpan ? (innerSpan.style.display = "none") : null;
              }}
            >
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => updateTodo({ ...item, done: !item.done })}
              />
              {item.title}
              <span style={{ cursor: "pointer", display: "none" }} onClick={() => removeTodo(item)}>
                🗑️
              </span>
            </li>
          );
        })}
        <li>
          <input
            style={{ margin: "1rem 0" }}
            type="text"
            placeholder="new to-do..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button
            onClick={() => {
              if (!newTitle) return;
              addTodo(newTitle);
              setNewTitle("");
            }}
          >
            +
          </button>
        </li>
      </ul>
    </>
  );
}
