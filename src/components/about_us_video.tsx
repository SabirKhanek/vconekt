export function AboutUsVideo() {
  return (
    <div className={`responsive relative w-full`}>
      <span className="absolute-centered flex flex-col justify-center items-center gap-3">
        <span className="flex justify-center items-center rounded-full cursor-pointer bg-[#B2E062] text-black p-7">
          <svg
            width="24"
            height="24"
            viewBox="0 0 28 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.5 15.134C28.1667 15.5189 28.1667 16.4811 27.5 16.866L2 31.5885C1.33333 31.9734 0.499998 31.4922 0.499999 30.7224L0.5 1.27757C0.5 0.507767 1.33333 0.0266411 2 0.411541L27.5 15.134Z"
              fill="none"
              stroke="black"
            />
          </svg>
        </span>
        <div className="w-full bg-[#B2E062] text-black font-medium text-2xl p-4">
          Mastering the art of web development, tips and tricks
        </div>
      </span>
      <div className="cursor-pointer">
        <img
          src="https://picsum.photos/1200/616"
          className="aspect-auto object-cover w-full h-auto"
          alt=""
        />
      </div>
    </div>
  );
}
