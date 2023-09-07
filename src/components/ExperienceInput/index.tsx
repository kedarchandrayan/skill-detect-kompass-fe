import { useState } from "react";
import styles from "./styles.module.css";

const InputType = {
  MIN: "min",
  MAX: "max",
};
function Input({ value, type, onChange }: any) {
  const typeString = type === InputType.MIN ? ">=" : "<=";

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    onChange({ type, value });
  };

  return (
    <div className="relative h-10 w-full min-w-[300px] my-[6px]">
      <input
        value={value}
        type="number"
        min={0}
        onChange={handleInputChange}
        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
        placeholder=" "
      />
      <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
        {typeString} ({type})
      </label>
    </div>
  );
}

export default function ExperienceInput({ onChange }: any) {
  const [minExp, setMinExp] = useState("");
  const [maxExp, setMaxExp] = useState("");
  const [output, setOutput] = useState([]);

  const _onChange = ({ type, value }: any) => {
    if (type === InputType.MIN) {
      setMinExp(value);
    } else {
      setMaxExp(value);
    }
    // Create a new object
    const updatedExpObject = { op: type, val: value };

    // Find and remove the object with the same "op" value, if it exists
    const filteredOutput: any = output.filter((obj: any) => obj.op !== type);

    // Add the updated object to the filtered output if the value is not empty
    if (value !== "") {
      filteredOutput.push(updatedExpObject);
    }
    // Set the new output array
    setOutput(filteredOutput);

    onChange(JSON.stringify(filteredOutput));
  };

  return (
    <div className={`${styles.container}`}>
      Total Experience (in years)
      {/* <span className={`${styles.addBtn}`} onClick={addEmptyInput}>
        +
      </span> */}
      <div className={`${styles.inputsContainer}`}>
        <Input type={InputType.MIN} value={minExp} onChange={_onChange} />
        <Input type={InputType.MAX} value={maxExp} onChange={_onChange} />
      </div>
    </div>
  );
}
