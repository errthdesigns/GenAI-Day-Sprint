function WhiteStrokeDefault() {
  return (
    <div className="absolute bottom-[5.18%] left-[calc(50%-0.5px)] top-[89.94%] translate-x-[-50%] w-[123px]" data-name="White Stroke / Default">
      <div className="absolute inset-0 rounded-[100px]" data-name=".atom Background">
        <div aria-hidden="true" className="absolute border-2 border-neutral-300 border-solid inset-[-1px] pointer-events-none rounded-[101px]" />
      </div>
      <p className="absolute bottom-[30%] font-['Droid_Sans:Bold',sans-serif] leading-[20px] left-0 not-italic right-0 text-[14px] text-center text-neutral-300 top-[30%]">Timer</p>
    </div>
  );
}

function WhiteStrokeDefault1() {
  return (
    <div className="relative size-full" data-name="White Stroke / Default">
      <div className="absolute inset-0 rounded-[100px]" data-name=".atom Background">
        <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-1px] pointer-events-none rounded-[101px]" />
      </div>
      <p className="absolute bottom-[30%] font-['Droid_Sans:Bold',sans-serif] leading-[20px] left-0 not-italic right-0 text-[14px] text-center text-white top-[30%]">Help</p>
    </div>
  );
}

function WhiteStrokeDefault2() {
  return (
    <div className="relative size-full" data-name="White Stroke / Default">
      <div className="absolute inset-0 rounded-[100px]" data-name=".atom Background">
        <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-1px] pointer-events-none rounded-[101px]" />
      </div>
      <p className="absolute bottom-[30%] font-['Droid_Sans:Bold',sans-serif] leading-[20px] left-0 not-italic right-0 text-[14px] text-center text-white top-[30%]">Brief</p>
    </div>
  );
}

export default function Miip() {
  return (
    <div className="bg-[#0000d5] relative size-full" data-name="MIIP 99">
      <p className="absolute font-['Droid_Sans:Bold',sans-serif] h-[144px] leading-[163.18px] left-[calc(50%+0.5px)] not-italic text-[400px] text-center text-white top-[calc(50%-72px)] translate-x-[-50%] w-[1127px]">00:00</p>
      <WhiteStrokeDefault />
      <div className="absolute flex inset-[12.13%_10.15%_75.02%_82.58%] items-center justify-center">
        <div className="flex-none h-[50px] rotate-[60deg] w-[123px]">
          <WhiteStrokeDefault1 />
        </div>
      </div>
      <div className="absolute flex inset-[69.88%_83.66%_19.88%_7.2%] items-center justify-center">
        <div className="flex-none h-[50px] rotate-[330deg] w-[123px]">
          <WhiteStrokeDefault2 />
        </div>
      </div>
    </div>
  );
}