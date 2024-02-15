import { array, func } from "prop-types";

const FilterByPriority = ({ setFilteredTasks, tasks }) => {
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
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </>
  );
};

FilterByPriority.propTypes = {
  setFilteredTasks: func,
  tasks: array,
};

export default FilterByPriority;
