import { array, func } from "prop-types";

const FilterByStatus = ({ setFilteredTasks, tasks }) => {
  const status = [
    { value: "completed", label: "Complete" },
    { value: "incomplete", label: "Incomplete" },
  ];

  // filter with status
  const handleFilterStatus = (e) => {
    const status = e.target.value;
    setFilteredTasks(tasks.filter((task) => task.status === status));
  };

  return (
    <>
      <select
        className="border border-gray-500 p-1.5 rounded-md"
        name="priority"
        onChange={handleFilterStatus}
      >
        {status.map((status) => (
          <option key={status.value} value={status.value}>
            {status.label}
          </option>
        ))}
      </select>
    </>
  );
};

FilterByStatus.propTypes = {
  setFilteredTasks: func,
  tasks: array,
};

export default FilterByStatus;
