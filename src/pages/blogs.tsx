import { Link } from "react-router-dom";
import { OurBlog } from "../sections/our_blog";

export default function BlogsPage() {
  return (
    <div>
      <div className="flex justify-center items-center flex-col z-[2] text-white relative  gap-4 pt-36 pb-24">
        <div className="relative flex justify-center flex-col items-center h-64">
          {/* <V3dContactUs scale={0.7} /> */}

          <div className="flex relative z-10 justify-center items-center flex-col gap-4">
            <h2 className="heading uppercase ">Blogs</h2>
            <div className="flex items-center gap-3 font-orbit font-medium ">
              <Link
                to={"/"}
                className="hover:underline cursor-pointer text-primary"
              >
                Home
              </Link>
              <span className="text-primary">/</span>
              <Link to={"/blogs"} className="hover:underline cursor-pointer">
                Blogs
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-[2] responsive">
        <OurBlog onPage />
      </div>
    </div>
  );
}
