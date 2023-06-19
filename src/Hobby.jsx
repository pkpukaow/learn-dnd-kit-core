import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Hobby({ hobby }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: hobby.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
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
        <h1>{hobby.name}</h1>
      </div>
    </div>
  );
}

export default Hobby;
