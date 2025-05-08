import React from "react";
function Loader({ width, height }) {
  return (
    <div class="flex-col gap-4 w-full flex items-center justify-center">
      <div
        class={` ${width || "w-6"} ${ height || "h-6"} border-[6px] text-4xl animate-spin border-white-300 flex items-center justify-center border-t-primary rounded-full`}
      ></div>
    </div>
  );
}

export default Loader;
