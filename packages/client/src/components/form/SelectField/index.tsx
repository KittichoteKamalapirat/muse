import React from "react";
import Select, { ActionMeta, GroupBase, OptionsOrGroups } from "react-select";
import { SelectOption } from "../../../types/utils/SelectOption";
import getSelectOption from "../../../util/getSelectOption";
import { useStyles } from "./useStyles";

interface Props {
  options: OptionsOrGroups<any, GroupBase<SelectOption>> | undefined;
  placeholder: React.ReactNode;
  name: string | undefined;
  defaultValue?: SelectOption;
  onChange: ((newValue: any, actionMeta: ActionMeta<any>) => void) | undefined;
}

const SelectField = ({
  options,
  placeholder,
  onChange,
  name,
  defaultValue,
}: Props) => {
  return (
    <Select
      // defaultInputValue="xx"
      defaultValue={defaultValue}
      options={options}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      styles={useStyles(false)}
      //   components={{
      //     DropdownIndicator: () => null,
      //     IndicatorSeparator: () => null,
      //   }}
    />
  );
};
export default SelectField;
