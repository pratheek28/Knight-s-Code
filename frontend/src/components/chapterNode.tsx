import Image, { StaticImageData } from "next/image";

interface ChapterNodeProps {
  src: StaticImageData;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const ChapterNode = (props: ChapterNodeProps) => {
  return (
    <div>
      <button
        className="group hover:drop-shadow-[0_0_15px_rgba(245, 158, 11, 0.7)] m-2 transform cursor-pointer rounded-full border-2 transition-all duration-300 hover:scale-105 hover:brightness-125"
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
