import { PencilIcon } from "@heroicons/react/24/solid";
import { AiTwotoneDelete } from "react-icons/ai";
import { array, func } from "prop-types";
import {
  Typography,
  CardBody,
  Chip,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

const TodoList = ({
  TABLE_HEAD,
  tasks,
  setTask,
  setIsEditOpen,
  handleStatus,
  handleDelete,
}) => {
  return (
    <>
      <CardBody className="overflow-auto px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD?.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => {
              const { id, title, status, priority } = task;
              const isLast = index === tasks.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={index}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {id}
                        </Typography>
                      </div>
                    </div>
                  </td>

                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {title}
                      </Typography>
                    </div>
                  </td>

                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={status}
                        color={status === "completed" ? "green" : "red"}
                      />
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={priority}
                        color={
                          priority === "low"
                            ? "yellow"
                            : priority === "medium"
                            ? "teal"
                            : "blue-gray"
                        }
                      />
                    </div>
                  </td>
                  <td className={classes}>
                    <Tooltip content="Edit Task">
                      <IconButton
                        onClick={() => {
                          setIsEditOpen(true);
                          setTask(task);
                        }}
                        variant="text"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Delete Task">
                      <IconButton
                        onClick={() => handleDelete(id)}
                        variant="text"
                      >
                        <AiTwotoneDelete className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td className={classes}>
                    <div
                      className="w-max cursor-pointer"
                      onClick={() => handleStatus(id)}
                    >
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={`Mark as ${
                          status === "completed" ? "incomplete" : "completed"
                        }`}
                        color={status === "completed" ? "red" : "green"}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
    </>
  );
};

TodoList.propTypes = {
  TABLE_HEAD: array,
  tasks: array,
  setTasks: func,
  setTask: func,
  setIsEditOpen: func,
  handleStatus: func,
  handleDelete: func,
};

export default TodoList;
