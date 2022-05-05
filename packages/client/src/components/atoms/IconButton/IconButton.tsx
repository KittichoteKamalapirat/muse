interface Props {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  className: string;
}

const IconButton = ({ onClick, icon, label, className }: Props) => (
  <button className={className} type="button" name={label} aria-label={label} onClick={onClick}>
    {icon}
  </button>
);

IconButton.defaultProps = {
  className: "",
};

export default IconButton;
