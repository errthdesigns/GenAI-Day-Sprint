import svgPaths from "./svg-au1jkl4j24";

function Group() {
  return <div className="absolute contents left-[710.34px] top-[322px]" />;
}

function Group1() {
  return (
    <div className="absolute contents left-[533px] top-[322px]">
      <Group />
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center left-[533px] top-[327.17px] w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "365.8125", "--transform-inner-height": "368.625" } as React.CSSProperties}>
        <div className="flex-none rotate-[90deg]">
          <div className="h-[368.628px] relative w-[365.821px]" data-name="Ellipse">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 366 369">
              <path d={svgPaths.p7fbe000} id="Ellipse" stroke="var(--stroke-0, #0000D5)" strokeWidth="5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterPart() {
  return (
    <div className="absolute contents left-[533px] top-[322px]" data-name="filter-part">
      <Group1 />
      <p className="absolute font-['Droid_Sans:Bold',sans-serif] h-[163px] leading-[163.18px] left-[717px] not-italic text-[#0000d5] text-[163.18px] text-center top-[423px] translate-x-[-50%] w-[260px]">10</p>
      <p className="absolute font-['Droid_Sans:Regular',sans-serif] h-[27px] leading-[normal] left-[717.5px] not-italic text-[#0000d5] text-[22.252px] text-center top-[581px] translate-x-[-50%] w-[77px]">mins</p>
      <div className="absolute h-[12.682px] left-[711px] top-[322px] w-[12.745px]" data-name="Ellipse">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
          <ellipse cx="6.37256" cy="6.34089" fill="var(--fill-0, #0000D5)" id="Ellipse" rx="6.37256" ry="6.34089" />
        </svg>
      </div>
    </div>
  );
}

function WhiteStrokeDefault() {
  return (
    <div className="absolute bottom-[10.06%] left-[calc(50%+0.5px)] top-[85.06%] translate-x-[-50%] w-[123px]" data-name="White Stroke / Default">
      <div className="absolute inset-0 rounded-[100px]" data-name=".atom Background">
        <div aria-hidden="true" className="absolute border-2 border-[#0000d5] border-solid inset-[-1px] pointer-events-none rounded-[101px]" />
      </div>
      <p className="absolute bottom-[30%] font-['Droid_Sans:Bold',sans-serif] leading-[20px] left-0 not-italic right-0 text-[#0000d5] text-[14px] text-center top-[30%]">Submit</p>
    </div>
  );
}

function WhiteStrokeDefault1() {
  return (
    <div className="absolute inset-[85.06%_7.43%_10.06%_84.03%]" data-name="White Stroke / Default">
      <div className="absolute inset-0 rounded-[100px]" data-name=".atom Background">
        <div aria-hidden="true" className="absolute border-2 border-[#0000d5] border-solid inset-[-1px] pointer-events-none rounded-[101px]" />
      </div>
      <p className="absolute bottom-[30%] font-['Droid_Sans:Bold',sans-serif] leading-[20px] left-0 not-italic right-0 text-[#0000d5] text-[14px] text-center top-[30%]">Help</p>
    </div>
  );
}

function WhiteStrokeDefault2() {
  return (
    <div className="absolute inset-[85.06%_83.96%_10.06%_7.5%]" data-name="White Stroke / Default">
      <div className="absolute inset-0 rounded-[100px]" data-name=".atom Background">
        <div aria-hidden="true" className="absolute border-2 border-[#0000d5] border-solid inset-[-1px] pointer-events-none rounded-[101px]" />
      </div>
      <p className="absolute bottom-[30%] font-['Droid_Sans:Bold',sans-serif] leading-[20px] left-0 not-italic right-0 text-[#0000d5] text-[14px] text-center top-[30%]">Brief</p>
    </div>
  );
}

export default function Miip() {
  return (
    <div className="bg-neutral-300 relative size-full" data-name="MIIP 53">
      <FilterPart />
      <WhiteStrokeDefault />
      <WhiteStrokeDefault1 />
      <WhiteStrokeDefault2 />
    </div>
  );
}