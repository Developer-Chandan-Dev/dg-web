import { CometCard } from "@/components/ui/comet-card";
import Image from "next/image";

interface CometCardDemoProps {
  name: string;
  image: string;
  content: string;
}

export function CometCardDemo({
  name = "name",
  image = "/images/user1.jpg",
  content = "content",
}: CometCardDemoProps) {
  return (
    <CometCard>
      <button
        type="button"
        className="my-10 flex w-72 h-96 cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-[#170d27] p-2 saturate-0 md:my-20 md:p-4"
        aria-label="View invite F7RA"
        style={{
          transformStyle: "preserve-3d",
          transform: "none",
          // opacity: 1,
        }}
      >
        <div className="mx-2 flex-1">
          <div className="relative mt-2 aspect-[3/4] w-full  flex-center text-center flex-col">
            <Image
              src={image}
              alt={name}
              width={100}
              height={100}
              className="rounded-full"
            />
            <h4 className="font-semibold mt-3 py-2">{name}</h4>
            <p className="text-[14px]">{content}</p>
          </div>
        </div>
        {/* <div className="mt-2 flex flex-shrink-0 items-center justify-between p-4 font-mono text-white">
          <div className="text-xs">Comet Invitation</div>
          <div className="text-xs text-gray-300 opacity-50">#F7RA</div>
        </div> */}
      </button>
    </CometCard>
  );
}
