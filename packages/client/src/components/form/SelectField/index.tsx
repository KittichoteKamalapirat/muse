import React from "react";
import Select, { ActionMeta, GroupBase, OptionsOrGroups } from "react-select";
import { SelectOption } from "../../../types/utils/SelectOption";
import { useStyles } from "./useStyles";

interface Props {
  options: OptionsOrGroups<any, GroupBase<SelectOption>> | undefined;
  placeholder: React.ReactNode;
  name: string | undefined;
  // defaultValue?: SelectOption;
  initialValue?: SelectOption;
  value?: SelectOption;
  onChange: ((newValue: any, actionMeta: ActionMeta<any>) => void) | undefined;
}

const SelectField = ({
  options,
  placeholder,
  onChange,
  name,
  value,
  // defaultValue,
  initialValue,
}: Props) => {
  return (
    <Select
      // defaultInputValue={initialValue}
      defaultValue={initialValue}
      options={options}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      styles={useStyles(false)}
      value={value}
      //   components={{
      //     DropdownIndicator: () => null,
      //     IndicatorSeparator: () => null,
      //   }}
    />
  );
};
export default SelectField;
