import { func, object } from "prop-types";
import { Input } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";

const CreateUpdateTask = ({ handleAddEdit, task }) => {
  const { handleSubmit, register, control, setValue } = useForm();
  useEffect(() => {
    if (task) {
      setValue("title", task.title);
      setValue("priority", task.priority);
    }
  }, [task, setValue]);

  return (
    <div className="mt-10">
      <form
        onSubmit={handleSubmit(handleAddEdit)}
        className="grid grid-cols-1 gap-5"
      >
        <Input
          color="indigo"
          name="title"
          label="Title"
          {...register("title")}
        />
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <Select {...field} variant="outlined" label="Priority">
              <Option value="low">Low</Option>
              <Option value="medium">Medium</Option>
              <Option value="high">High</Option>
            </Select>
          )}
        />

        <Button type="submit" fullWidth>
          {task?.id ? "Update" : "Add"} Task
        </Button>
      </form>
    </div>
  );
};

CreateUpdateTask.propTypes = {
  handleAddEdit: func,
  task: object,
};

export default CreateUpdateTask;
