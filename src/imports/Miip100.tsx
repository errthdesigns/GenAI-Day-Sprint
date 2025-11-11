function WhiteStrokeDefault() {
  return (
    <div className="absolute bottom-[10.06%] left-[calc(50%+0.5px)] top-[85.06%] translate-x-[-50%] w-[123px]" data-name="White Stroke / Default">
      <div className="absolute bg-white inset-0 rounded-[100px]" data-name=".atom Background">
        <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-1px] pointer-events-none rounded-[101px]" />
      </div>
      <p className="absolute bottom-[30%] font-['Droid_Sans:Bold',sans-serif] leading-[20px] left-0 not-italic right-0 text-[#0000d5] text-[14px] text-center top-[30%]">Start Again</p>
    </div>
  );
}

export default function Miip() {
  return (
    <div className="bg-[#0000d5] relative size-full" data-name="MIIP 100">
      <p className="absolute font-['Droid_Sans:Bold',sans-serif] h-[183px] leading-[200px] left-[calc(50%+0.5px)] not-italic text-[150px] text-center text-white top-[calc(50%-91px)] translate-x-[-50%] w-[1127px]">OUT OF TIME!</p>
      <WhiteStrokeDefault />
    </div>
  );
}