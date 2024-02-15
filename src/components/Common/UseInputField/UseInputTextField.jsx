import { Input } from "@material-tailwind/react";
import { bool, func, number, object, string } from "prop-types";

const UseInputTextField = ({
  register,
  errors,
  type,
  label,
  fieldName,
  required,
  size,
  color,
  defaultValue,
  onChange,
  value,
  readOnly,
}) => {
  let warningMessage = "The Field is required";
  return (
    <div>
      <Input
        size={size || "lg"}
        type={type || "text"}
        onChange={onChange}
        defaultValue={defaultValue}
        value={value}
        readOnly={readOnly ? true : false}
        label={
          <>
            {label} {required && <span className="text-red-500">*</span>}
          </>
        }
        color={color || "blue-gray"}
        {...register(fieldName, {
          required: { value: required ? true : false, message: warningMessage },
        })}
      />
      {errors?.[fieldName] && (
        <span className="text-red-500">{errors?.[fieldName]?.message}</span>
      )}
    </div>
  );
};

UseInputTextField.propTypes = {
  register: func,
  errors: object,
  label: string,
  fieldName: string,
  required: bool,
  type: string,
  size: string,
  color: string,
  defaultValue: string || number,
  onChange: func,
  value: string || number,
  readOnly: bool,
};

export default UseInputTextField;
