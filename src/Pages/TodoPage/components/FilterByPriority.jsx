import { func } from "prop-types";

const FilterByPriority = ({ handleFilterPriority }) => {
  return (
    <>
      <select name="priority" onChange={handleFilterPriority}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </>
  );
};

FilterByPriority.propTypes = {
  handleFilterPriority: func,
};

export default FilterByPriority;
