import svgPaths from "./svg-g9kdy0jvtr";

function WhiteStrokeDefault() {
  return (
    <div className="absolute inset-[10.06%_83.96%_85.06%_7.5%]" data-name="White Stroke / Default">
      <div className="absolute inset-0 rounded-[100px]" data-name=".atom Background">
        <div aria-hidden="true" className="absolute border-2 border-[#0000d5] border-solid inset-[-1px] pointer-events-none rounded-[101px]" />
      </div>
      <p className="absolute bottom-[30%] font-['Droid_Sans:Bold',sans-serif] leading-[20px] left-0 not-italic right-0 text-[#0000d5] text-[14px] text-center top-[30%]">Brief</p>
    </div>
  );
}

function UiNavigationArrowRightDarkBg1() {
  return (
    <div className="h-[41.073px] relative w-[41.929px]" data-name="UI Navigation/Arrow Right/Dark BG - 50">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 42 42">
        <g id="UI Navigation/Arrow Right/Dark BG - 50">
          <path d={svgPaths.p3025280} id="Stroke 2" stroke="var(--stroke-0, #979797)" strokeWidth="2.56708" />
          <path d="M34.9408 20.5367H5.24113" id="Stroke 3" stroke="var(--stroke-0, #979797)" strokeWidth="2.56708" />
        </g>
      </svg>
    </div>
  );
}

function UiNavigationArrowRightDarkBg() {
  return (
    <div className="absolute h-[41.073px] left-[1215.13px] top-[494.41px] w-[41.929px]" data-name="UI Navigation/Arrow Right/Dark BG - 49">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 42 42">
        <g id="UI Navigation/Arrow Right/Dark BG - 49">
          <path d={svgPaths.p3025280} id="Stroke 2" stroke="var(--stroke-0, #0000D5)" strokeWidth="2.56708" />
          <path d="M34.9408 20.5367H5.24113" id="Stroke 3" stroke="var(--stroke-0, #0000D5)" strokeWidth="2.56708" />
        </g>
      </svg>
    </div>
  );
}

function WhiteStrokeDefault1() {
  return (
    <div className="absolute bottom-[10.06%] left-[calc(50%+0.5px)] top-[85.06%] translate-x-[-50%] w-[123px]" data-name="White Stroke / Default">
      <div className="absolute inset-0 rounded-[100px]" data-name=".atom Background">
        <div aria-hidden="true" className="absolute border-2 border-[#0000d5] border-solid inset-[-1px] pointer-events-none rounded-[101px]" />
      </div>
      <p className="absolute bottom-[30%] font-['Droid_Sans:Bold',sans-serif] leading-[20px] left-0 not-italic right-0 text-[#0000d5] text-[14px] text-center top-[30%]">Start</p>
    </div>
  );
}

export default function Miip() {
  return (
    <div className="bg-neutral-300 relative size-full" data-name="MIIP 50">
      {[...Array(2).keys()].map((_, i) => (
        <WhiteStrokeDefault key={i} />
      ))}
      <div className="absolute font-['Droid_Sans:Regular',sans-serif] leading-[0] left-[108px] not-italic text-[#0000d5] text-[64px] top-[287px] tracking-[-2.5px] w-[911px]">
        <p className="leading-[90px] mb-0 text-[#0000d4]">It’s February...​</p>
        <p className="leading-[90px] text-[#0000d4]">
          <span>{`Lidl `}</span>
          <span className="font-['Droid_Sans:Bold',sans-serif] not-italic">URGENTLY</span>
          <span>{` need a Christmas social post by EOP, that shows off `}</span>
          <span className="font-['Droid_Sans:Regular',sans-serif] not-italic">{`Lidl Bakery, `}</span>
          <span className="font-['Droid_Sans:Bold',sans-serif] not-italic">{`must include a croissant `}</span>.​
        </p>
      </div>
      <div className="absolute left-[1091px] size-[76.178px] top-[476px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77 77">
          <circle cx="38.0888" cy="38.0888" id="Ellipse 67" r="36.8052" stroke="var(--stroke-0, #949494)" strokeWidth="2.56708" />
        </svg>
      </div>
      <div className="absolute flex h-[41.073px] items-center justify-center left-[1108.12px] top-[494.41px] w-[41.929px]">
        <div className="flex-none rotate-[180deg]">
          <UiNavigationArrowRightDarkBg1 />
        </div>
      </div>
      <div className="absolute left-[1198px] size-[76.178px] top-[476px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77 77">
          <circle cx="38.0888" cy="38.0888" id="Ellipse 67" r="36.8052" stroke="var(--stroke-0, #0000D5)" strokeWidth="2.56708" />
        </svg>
      </div>
      <UiNavigationArrowRightDarkBg />
      <WhiteStrokeDefault1 />
    </div>
  );
}