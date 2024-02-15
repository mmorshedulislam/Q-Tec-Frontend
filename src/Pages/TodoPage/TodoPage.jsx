import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import UseModal from "../../components/Common/UseModal/UseModal";
import CreateUpdateTask from "./components/CreateUpdateTask";
import TodoList from "./components/TodoList";
import FilterByStatus from "./components/FilterByStatus";
import FilterByPriority from "./components/FilterByPriority";

const TodoPage = () => {
  // is already tasks in local storage
  const isExistTasks = JSON.parse(localStorage.getItem("tasks"));
  const [tasks, setTasks] = useState(isExistTasks);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const [selectedTask, setSelectedTask] = useState(null);
  const [isAddNewOpen, setIsAddNewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const columns = ["ID", "Task", "Status", "Priority", "Actions", "Mark As"];

  //   set tasks
  useEffect(() => {
    setFilteredTasks(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // handle add and update
  const handleAddEdit = (data) => {
    if (selectedTask) {
      // Update task
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === selectedTask.id
            ? { ...task, title: data.title, priority: data.priority }
            : task
        )
      );
      setSelectedTask(null);
      setIsEditOpen(false);
    } else {
      // Add task
      const newTask = {
        id: tasks.length + 1,
        title: data.title,
        status: "incomplete",
        priority: data.priority,
      };
      if (!data?.title || !data?.priority) {
        alert("Please Write Title and Select Priority");
      } else {
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setIsAddNewOpen(false);
      }
    }
  };

  // handle task delete
  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // total completed tasks
  const completedTasks = tasks?.filter((task) => task.status === "completed");

  // total completed tasks
  const incompleteTasks = tasks?.filter((task) => task.status === "incomplete");

  return (
    <div className="md:w-4/5 mx-auto p-2 border rounded-md my-5 shadow-md">
      <div>
        <div className="flex justify-between items-center my-5">
          <h2 className="font-semibold text-lg">Todo List ({tasks?.length})</h2>
          <button
            onClick={() => setIsAddNewOpen(true)}
            className="flex items-center rounded bg-green-400 text-white px-5 py-[10px] text-base gap-x-1"
          >
            <FaPlus size={12} />
            <span className="md:block">Add New Task</span>
          </button>
        </div>
        {/* Filter by Status and Priority */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          <FilterByStatus tasks={tasks} setFilteredTasks={setFilteredTasks} />
          <p>
            <span className="font-semibold text-green-600">
              Completed ({completedTasks?.length})
            </span>
          </p>
          <p>
            <span className="font-semibold text-red-600">
              Incomplete ({incompleteTasks?.length})
            </span>
          </p>
          <FilterByPriority tasks={tasks} setFilteredTasks={setFilteredTasks} />
        </div>
        {filteredTasks.length === 0 ? (
          <p className="text-xl text-center font-bold mt-20">
            No Todo List Found. Please add new Todo
          </p>
        ) : (
          <TodoList
            columns={columns}
            tasks={filteredTasks}
            setTasks={setTasks}
            handleDelete={handleDelete}
            setIsEditOpen={setIsEditOpen}
            setSelectedTask={setSelectedTask}
          />
        )}

        {/* Add task */}
        <UseModal
          isModalOpen={isAddNewOpen}
          setIsModalOpen={setIsAddNewOpen}
          title="Add New Task"
        >
          <CreateUpdateTask handleAddEdit={handleAddEdit} />
        </UseModal>

        {/* Edit task */}
        <UseModal
          isModalOpen={isEditOpen}
          setIsModalOpen={setIsEditOpen}
          title="Edit Task"
        >
          <CreateUpdateTask handleAddEdit={handleAddEdit} task={selectedTask} />
        </UseModal>
      </div>
    </div>
  );
};

export default TodoPage;
