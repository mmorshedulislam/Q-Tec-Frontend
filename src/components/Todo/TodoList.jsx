import { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";

const TodoList = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Task 1 Lorem ipsum dolor sit amet.",
      status: "completed",
      priority: "low",
    },
    {
      id: 2,
      title: "Task 2 Lorem ipsum dolor sit amet.",
      status: "incomplete",
      priority: "high",
    },
  ]);

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

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //   add new
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: Math.floor(Math.random() * 1000),
      title: e.target.title.value,
      status: "incomplete",
      priority: e.target.priority.value,
    };
    setTasks([...tasks, newTask]);
  };

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

  // antd
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button onClick={() => handleDelete(record?.key)}>Delete</button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      title: "John Brown",
      priority: "low",
      status: "completed",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      title: "Jim Green",
      priority: "medium",
      status: "incomplete",
      tags: ["loser"],
    },
    {
      key: "3",
      title: "Joe Black",
      priority: "high",
      status: "completed",
      tags: ["cool", "teacher"],
    },
  ];

  return (
    <div className="flex justify-center items-center">
      <div>
        <div>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" name="title" />
            <select name="priority">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div>
          <h2>Todo List</h2>
          <div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Task</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, idx) => {
                  const { id, title, status, priority } = task;
                  return (
                    <tr key={idx}>
                      <td>{id}</td>
                      <td>{title}</td>

                      <td
                        className={
                          priority === "low"
                            ? "bg-green-200"
                            : priority === "medium"
                            ? "bg-yellow-200"
                            : "bg-red-400"
                        }
                      >
                        {priority}
                      </td>
                      <td
                        className={
                          status === "completed"
                            ? "bg-green-400"
                            : "bg-yellow-200"
                        }
                      >
                        {status}
                      </td>
                      <td>
                        <button className="bg-yellow-400">Edit</button>
                        <button
                          className="bg-red-500"
                          onClick={() => handleDelete(id)}
                        >
                          Delete
                        </button>
                        <button onClick={() => handleStatus(id)}>
                          Mark As Completed
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* antd table */}
            <Table columns={columns} dataSource={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
