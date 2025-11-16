import Image, { StaticImageData } from "next/image";

interface ChapterNodeProps {
  src: StaticImageData;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const ChapterNode = (props: ChapterNodeProps) => {
  return (
    <div>
      <button
        className="m-2 cursor-pointer rounded-full border-2 group
                transition-all duration-300
                hover:drop-shadow-[0_0_15px_rgba(245, 158, 11, 0.7)]
                hover:brightness-125
                transform hover:scale-105"
        onClick={props.onClick}
      >
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
