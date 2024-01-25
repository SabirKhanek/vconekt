export function getResponsiveClasses() {
  return "px-2 max-w-[95%] lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto my-0";
}
export function getResponsiveWidth() {
  const ele = document.getElementsByClassName("relative");
  const element = document.createElement("div");
  element.className =
    "absolute w-full px-2 max-w-[95%] lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto my-0";
  ele[0]?.appendChild(element);
  <div className="px-2"></div>
  return element.clientWidth;
}
