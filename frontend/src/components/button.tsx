interface ButtonProps {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = (props: ButtonProps) => {
  return (
    <div>
      <button className="cursor-pointer border-2 p-8" onClick={props.onClick}>
        {props.text}
      </button>
    </div>
  );
};

export default Button;
