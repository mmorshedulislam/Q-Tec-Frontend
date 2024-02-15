import { func } from "prop-types";

const FilterByStatus = ({ handleFilterStatus }) => {
  return (
    <>
      <select name="priority" onChange={handleFilterStatus}>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>
    </>
  );
};

FilterByStatus.propTypes = {
  handleFilterStatus: func,
};

export default FilterByStatus;
