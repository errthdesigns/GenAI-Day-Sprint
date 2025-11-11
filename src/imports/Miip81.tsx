import svgPaths from "./svg-zqsjgkjalh";
import imgWeavyGemini25FlashNanoBanana20251110At13403012 from "figma:asset/e7359a3ca81da7bffe5ab16812c6ae42cc4d7108.png";

function AddRoundLight() {
  return (
    <div className="relative size-[44.713px]" data-name="Add_round_light">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 45 45">
        <g id="Add_round_light">
          <path d={svgPaths.pc48cb00} id="Vector 52" stroke="var(--stroke-0, #0000D3)" strokeLinecap="round" strokeWidth="1.86304" />
          <path d={svgPaths.pac19880} id="Vector 53" stroke="var(--stroke-0, #0000D3)" strokeLinecap="round" strokeWidth="1.86304" />
        </g>
      </svg>
    </div>
  );
}

function WhiteStrokeDefault() {
  return (
    <div className="absolute inset-[10.06%_83.96%_85.06%_7.5%]" data-name="White Stroke / Default">
      <div className="absolute inset-0 rounded-[100px]" data-name=".atom Background">
        <div aria-hidden="true" className="absolute border-2 border-[#0000d5] border-solid inset-[-1px] pointer-events-none rounded-[101px]" />
      </div>
      <p className="absolute bottom-[30%] font-['Droid_Sans:Bold',sans-serif] leading-[20px] left-0 not-italic right-0 text-[#0000d5] text-[14px] text-center top-[30%]">Feedback</p>
    </div>
  );
}

function WhiteStrokeDefault1() {
  return (
    <div className="absolute bottom-[9.38%] left-[calc(50%-264.5px)] top-[85.74%] translate-x-[-50%] w-[123px]" data-name="White Stroke / Default">
      <div className="absolute bg-[#0000d5] inset-0 rounded-[100px]" data-name=".atom Background">
        <div aria-hidden="true" className="absolute border-2 border-[#0000d5] border-solid inset-[-1px] pointer-events-none rounded-[101px]" />
      </div>
      <p className="absolute bottom-[30%] font-['Droid_Sans:Bold',sans-serif] leading-[20px] left-0 not-italic right-0 text-[14px] text-center text-white top-[30%]">Start</p>
    </div>
  );
}

export default function Miip() {
  return (
    <div className="bg-neutral-300 relative size-full" data-name="MIIP 81">
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.7071067690849304)+(var(--transform-inner-height)*0.7071067690849304)))] items-center justify-center left-[1346.92px] top-[24.38px] w-[calc(1px*((var(--transform-inner-height)*0.7071067690849304)+(var(--transform-inner-width)*0.7071067690849304)))]" style={{ "--transform-inner-width": "44.703125", "--transform-inner-height": "44.703125" } as React.CSSProperties}>
        <div className="flex-none rotate-[315deg]">
          <AddRoundLight />
        </div>
      </div>
      <WhiteStrokeDefault />
      <div className="absolute font-['Droid_Sans:Regular',sans-serif] h-[540px] leading-[60px] left-[108px] not-italic text-[#0000d4] text-[50px] top-[calc(50%-270px)] w-[755px]">
        <p className="mb-0">{`Oh No!​ `}</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">{`The client wants an in-person meeting to see the work. `}</p>
        <p className="mb-0">&nbsp;</p>
        <p>Please use ‘agent mode’ to find them a taxi from Bromley to Liverpool street for the lowest possible price.​</p>
      </div>
      <WhiteStrokeDefault1 />
      <div className="absolute h-[744px] left-[863px] top-[280px] w-[579px]" data-name="weavy-Gemini 2.5 Flash (Nano Banana)-2025-11-10 at 13.40.30 (1) 2">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgWeavyGemini25FlashNanoBanana20251110At13403012} />
      </div>
    </div>
  );
}