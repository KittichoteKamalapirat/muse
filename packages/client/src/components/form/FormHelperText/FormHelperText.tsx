interface Props {
  helperText: string;
  isError: boolean;
  spacing: string;
  extraClass: string;
}

const FormHelperText = ({ helperText, isError, spacing, extraClass }: Props) => (
  <p
    className={`font-nunito text-xxs opacity-90 ${spacing} ${extraClass} ${
      isError ? "text-red-500" : "text-grey-420"
    }`}
  >
    {helperText}
  </p>
);

FormHelperText.defaultProps = {
  helperText: "",
  isError: false,
  spacing: "mt-1",
  extraClass: "",
};

export default FormHelperText;
