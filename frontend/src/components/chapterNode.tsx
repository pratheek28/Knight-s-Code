import Image, { StaticImageData } from "next/image";

interface ChapterNodeProps {
  src: StaticImageData;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const ChapterNode = (props: ChapterNodeProps) => {
  return (
    <div>
      <button className="m-2 cursor-pointer rounded-full border-2" onClick={props.onClick}>
        <Image
          className="h-30 w-30 rounded-full"
          src={props.src}
          alt="Chapter Node"
        />
      </button>
    </div>
  );
};
export default ChapterNode;
