import svgPaths from "./svg-agd3s4jn8r";
import imgWeavyGemini25FlashNanoBanana20251110At13432311 from "figma:asset/1500994b937dae82215aa0025fe4b9f8a8c62313.png";

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
    <div className="bg-neutral-300 relative size-full" data-name="MIIP 74">
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.7071067690849304)+(var(--transform-inner-height)*0.7071067690849304)))] items-center justify-center left-[1346.92px] top-[24.38px] w-[calc(1px*((var(--transform-inner-height)*0.7071067690849304)+(var(--transform-inner-width)*0.7071067690849304)))]" style={{ "--transform-inner-width": "44.703125", "--transform-inner-height": "44.703125" } as React.CSSProperties}>
        <div className="flex-none rotate-[315deg]">
          <AddRoundLight />
        </div>
      </div>
      <WhiteStrokeDefault />
      <div className="absolute font-['Droid_Sans:Regular',sans-serif] h-[420px] leading-[60px] left-[109px] not-italic text-[#0000d4] text-[50px] top-[calc(50%-210px)] w-[755px]">
        <p className="mb-0">{`Yey!​ `}</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">{`The client loves it!​ `}</p>
        <p className="mb-0">&nbsp;</p>
        <p>But they think it would look better if it included a racoon wearing the ‘lidl Jacket’​...</p>
      </div>
      <WhiteStrokeDefault1 />
      <div className="absolute h-[740px] left-[864px] top-[284px] w-[576px]" data-name="weavy-Gemini 2.5 Flash (Nano Banana)-2025-11-10 at 13.43.23 (1) 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgWeavyGemini25FlashNanoBanana20251110At13432311} />
      </div>
    </div>
  );
}