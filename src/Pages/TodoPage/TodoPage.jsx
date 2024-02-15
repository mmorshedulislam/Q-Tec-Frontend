import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import UseModal from "../../components/Common/UseModal/UseModal";
import CreateUpdateTask from "./components/CreateUpdateTask";
import TodoList from "./components/TodoList";
import FilterByStatus from "./components/FilterByStatus";
import FilterByPriority from "./components/FilterByPriority";

const TodoPage = () => {
  // is already tasks in local storage
  const isTasks = JSON.parse(localStorage.getItem("tasks"));
  const [tasks, setTasks] = useState(isTasks);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const [selectedTask, setSelectedTask] = useState(null);
  const [isAddNewOpen, setIsAddNewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const TABLE_HEAD = ["ID", "Task", "Status", "Priority", "Actions", "Mark As"];

  //   set tasks
  useEffect(() => {
    setFilteredTasks(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // handle task delete
  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

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
        alert("Please add Title and Priority");
      } else {
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setIsAddNewOpen(false);
      }
    }
  };

  // handle mark as complete
  const handleStatus = (id) => {
    setTasks(
      tasks.filter((task) => {
        if (task.id === id) {
          if (task.status === "completed") {
            task.status = "incomplete";
          } else {
            task.status = "completed";
          }
        }
        return task;
      })
    );
  };

  // filter with priority
  const handleFilterPriority = (e) => {
    const priority = e.target.value;
    setFilteredTasks(tasks.filter((task) => task.priority === priority));
  };

  // filter with status
  const handleFilterStatus = (e) => {
    const status = e.target.value;
    setFilteredTasks(tasks.filter((task) => task.status === status));
  };

  const completedTasks = tasks?.filter((task) => task.status === "completed");

  return (
    <div className="md:w-4/5 mx-auto p-2">
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
        <div className="flex justify-between">
          <FilterByStatus handleFilterStatus={handleFilterStatus} />
          <p>
            <span className="font-semibold">
              Completed ({completedTasks?.length})
            </span>
          </p>
          <FilterByPriority handleFilterPriority={handleFilterPriority} />
        </div>
        {filteredTasks.length === 0 ? (
          <p className="text-xl text-center font-bold mt-20">
            No Todo List Found. Please add new Todo
          </p>
        ) : (
          <TodoList
            TABLE_HEAD={TABLE_HEAD}
            tasks={filteredTasks}
            setTasks={setTasks}
            handleDelete={handleDelete}
            handleStatus={handleStatus}
            setIsEditOpen={setIsEditOpen}
            setTask={setSelectedTask}
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
