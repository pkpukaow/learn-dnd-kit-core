import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Hobby from "./Hobby";

function User({ user, setPeople }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: user.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDragEndHobby = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = user.hobby.findIndex((hobby) => hobby.id === active.id);
      const newIndex = user.hobby.findIndex((hobby) => hobby.id === over.id);

      setPeople((people) => {
        const newPeople = [...people];
        newPeople[people.indexOf(user)].hobby = arrayMove(
          user.hobby,
          oldIndex,
          newIndex
        );
        return newPeople;
      });
    }
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="bg-white p-4 rounded-md shadow-md text-black my-2"
    >
      <div className="flex gap-3">
        <h1>{user.name}</h1>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEndHobby}
        >
          <SortableContext
            items={user.hobby}
            strategy={horizontalListSortingStrategy}
          >
            {user.hobby.map((hobby) => (
              <Hobby key={hobby.id} hobby={hobby} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

export default User;
