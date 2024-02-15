import { useEffect, useState } from "react";

import { FaPlus } from "react-icons/fa";

import UseModal from "../../components/Common/UseModal/UseModal";
import CreateUpdateTask from "./components/CreateUpdateTask";
import TodoList from "./components/TodoList";

const TodoPage = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Task 1 Lorem ipsum dolor sit amet.",
      status: "completed",
      priority: "medium",
    },
  ]);

  const [selectedTask, setSelectedTask] = useState(null);
  const [isAddNewOpen, setIsAddNewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const TABLE_HEAD = ["ID", "Task", "Status", "Priority", "Actions", "Mark"];

  //   get tasks
  useEffect(() => {
    const isTasks = JSON.parse(localStorage.getItem("tasks"));

    if (isTasks) {
      setTasks(isTasks);
    }
  }, []);

  //   set tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // handle task delete
  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // handle add and update
  const handleAddEdit = (data) => {
    if (selectedTask) {
      // Update existing task
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
      // Add new task
      const newTask = {
        id: tasks.length + 1,
        title: data.title,
        status: "incomplete",
        priority: data.priority,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setIsAddNewOpen(false);
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

  return (
    <div className="flex justify-center items-center">
      <div>
        <div>
          <div className="flex justify-between items-center my-5">
            <h2 className="font-semibold text-lg">Todo List</h2>
            <button
              onClick={() => setIsAddNewOpen(true)}
              className="flex items-center rounded bg-green-400 text-white px-5 py-[10px] text-base gap-x-1"
            >
              <FaPlus size={12} />
              <span className="md:block">Add New Task</span>
            </button>
          </div>
          <TodoList
            TABLE_HEAD={TABLE_HEAD}
            tasks={tasks}
            handleDelete={handleDelete}
            handleStatus={handleStatus}
            setIsEditOpen={setIsEditOpen}
            setTask={setSelectedTask}
            setTasks={setTasks}
          />
          <UseModal
            isModalOpen={isAddNewOpen}
            setIsModalOpen={setIsAddNewOpen}
            title="Add New Task"
          >
            <CreateUpdateTask handleAddEdit={handleAddEdit} />
          </UseModal>
          <UseModal
            isModalOpen={isEditOpen}
            setIsModalOpen={setIsEditOpen}
            title="Edit Task"
          >
            <CreateUpdateTask
              handleAddEdit={handleAddEdit}
              task={selectedTask}
            />
          </UseModal>
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
