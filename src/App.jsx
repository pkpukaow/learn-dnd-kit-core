import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import User from "./User";

function App() {
  const [people, setPeople] = useState([
    {
      name: "John",
      id: 1,
      hobby: [
        {
          name: "soccer",
          id: 1,
        },
        {
          name: "swimming",
          id: 2,
        },
      ],
    },
    {
      name: "Peter",
      id: 2,
      hobby: [
        {
          name: "football",
          id: 3,
        },
        {
          name: "basketball",
          id: 4,
        },
      ],
    },
    {
      name: "Sue",
      id: 3,
      hobby: [
        {
          name: "reading",
          id: 5,
        },
        {
          name: "writing",
          id: 6,
        },
      ],
    },
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = people.findIndex((user) => user.id === active.id);
      const newIndex = people.findIndex((user) => user.id === over.id);

      setPeople((people) => arrayMove(people, oldIndex, newIndex));
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <h1 className="text-3xl font-bold">User List</h1>

      <SortableContext items={people} strategy={verticalListSortingStrategy}>
        {people.map((user) => (
          <User key={user.id} user={user} setPeople={setPeople} />
        ))}
      </SortableContext>
    </DndContext>
  );
}

export default App;
