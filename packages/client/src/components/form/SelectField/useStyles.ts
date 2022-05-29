import { StylesConfig } from "react-select";
import { SelectOption } from "../../../types/utils/SelectOption";

type IsMulti = false;

export const useStyles = (
  displayError: boolean
): StylesConfig<SelectOption, IsMulti> => {
  const currentColour = displayError ? "#ef4444" : "#E4E7EB";

  return {
    container: (provided) => ({
      ...provided,
      flex: 1,
      width: "100%",
      margin: "4px",
      fontFamily: "Mulish', monospace",
    }),
    valueContainer: (provided) => ({
      ...provided,
      // height: "2rem",
      whiteSpace: "nowrap",
    }),
    control: (provided) => ({
      ...provided,
      borderColor: currentColour,
      cursor: "pointer",
      appearance: "none",
      boxShadow: "none",
      borderRadius: "0.25rem",
      // fontSize: "10px",
      "&:focus": {
        outline: "none",
        borderColor: currentColour,
      },
      "&:hover": {
        outline: "none",
        borderColor: currentColour,
      },
      // minHeight: "2rem",
      height: "2rem",
    }),
    menu: (provided) => ({
      ...provided,
      // fontSize: "10px",
      fontWeigfht: "400",
      marginTop: "1px",
    }),
    option: (provided, state) => ({
      ...provided,
      cursor: "pointer",
      // fontSize: "10px",
      fontWeight: "400",
      color: "#000",
      backgroundColor: state.isSelected ? "#bae6fd" : "#fff",
      "&:hover": {
        backgroundColor: "#bae6fd",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      // fontSize: "10px",
      fontWeight: "400",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#718096",
      // fontSize: "10px",
      fontWeight: "300",

      overflow: "hidden",
    }),
    input: (provided) => ({
      ...provided,
      marginY: "0px",
      fontWeight: "400",
    }),
  };
};
