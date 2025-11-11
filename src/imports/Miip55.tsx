function Group() {
  return (
    <div className="absolute contents left-[1066px] top-[473.91px]">
      <div className="absolute left-[1066px] size-[76.178px] top-[473.91px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77 77">
          <circle cx="38.0888" cy="38.0888" id="Ellipse 67" r="36.8052" stroke="var(--stroke-0, #0000D5)" strokeWidth="2.56708" />
        </svg>
      </div>
    </div>
  );
}

function WhiteStrokeDefault() {
  return (
    <div className="absolute inset-[10.06%_83.96%_85.06%_7.5%]" data-name="White Stroke / Default">
      <div className="absolute inset-0 rounded-[100px]" data-name=".atom Background">
        <div aria-hidden="true" className="absolute border-2 border-[#0000d5] border-solid inset-[-1px] pointer-events-none rounded-[101px]" />
      </div>
      <p className="absolute bottom-[30%] font-['Droid_Sans:Bold',sans-serif] leading-[20px] left-0 not-italic right-0 text-[#0000d5] text-[14px] text-center top-[30%]">Submit</p>
    </div>
  );
}

function WhiteStrokeDefault1() {
  return (
    <div className="absolute bottom-[10.06%] left-[calc(50%+0.5px)] top-[85.06%] translate-x-[-50%] w-[123px]" data-name="White Stroke / Default">
      <div className="absolute inset-0 rounded-[100px]" data-name=".atom Background">
        <div aria-hidden="true" className="absolute border-2 border-[#0000d5] border-solid inset-[-1px] pointer-events-none rounded-[101px]" />
      </div>
      <p className="absolute bottom-[30%] font-['Droid_Sans:Bold',sans-serif] leading-[20px] left-0 not-italic right-0 text-[#0000d5] text-[14px] text-center top-[30%]">Timer</p>
    </div>
  );
}

function WhiteStrokeDefault2() {
  return (
    <div className="absolute inset-[85.06%_7.43%_10.06%_84.03%]" data-name="White Stroke / Default">
      <div className="absolute inset-0 rounded-[100px]" data-name=".atom Background">
        <div aria-hidden="true" className="absolute border-2 border-[#0000d5] border-solid inset-[-1px] pointer-events-none rounded-[101px]" />
      </div>
      <p className="absolute bottom-[30%] font-['Droid_Sans:Bold',sans-serif] leading-[20px] left-0 not-italic right-0 text-[#0000d5] text-[14px] text-center top-[30%]">Help</p>
    </div>
  );
}

function WhiteStrokeDefault3() {
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
    <div className="bg-neutral-300 relative size-full" data-name="MIIP 55">
      <p className="absolute font-['Droid_Sans:Regular',sans-serif] leading-[36px] left-[108.4px] not-italic text-[#0000d5] text-[64px] top-[494px] tracking-[-2.5px] w-[911px]">Drag and drop your files here.</p>
      <Group />
      <div className="absolute flex inset-[48.08%_22.02%_48.24%_75.36%] items-center justify-center">
        <div className="flex-none rotate-[180deg] scale-y-[-100%] size-[37.682px]">
          <Softwareupload />
        </div>
      </div>
      <WhiteStrokeDefault />
      <WhiteStrokeDefault1 />
      <WhiteStrokeDefault2 />
      <WhiteStrokeDefault3 />
    </div>
  );
}