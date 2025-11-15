interface SubmitProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
}

const Submit = (props: SubmitProps) => {
  return (
    <div>
      <button type="submit" onClick={props.onClick}>
        {props.text}
      </button>
    </div>
  );
};
export default Submit;
