import { array, func } from "prop-types";

const FilterByPriority = ({ setFilteredTasks, tasks }) => {
  const priorities = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];
  // filter with priority
  const handleFilterPriority = (e) => {
    const priority = e.target.value;
    setFilteredTasks(tasks.filter((task) => task.priority === priority));
  };

  return (
    <>
      <select
        className="border border-gray-500 p-1.5 rounded-md"
        name="priority"
        onChange={handleFilterPriority}
      >
        {priorities.map((priority) => (
          <option key={priority.value} value={priority.value}>
            {priority.label}
          </option>
        ))}
      </select>
    </>
  );
};

FilterByPriority.propTypes = {
  setFilteredTasks: func,
  tasks: array,
};

export default FilterByPriority;
