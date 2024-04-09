//leftPageImageComponent.tsx

import "./leftPAgeImageComponent.css";
export default function LeftPageImageComponent() {
  return (
    <div
      className=" leftPAgeImageComponent  flex-col shrink-0 w-[450px] bg-[#f4d086] h-100 p-10 hidden md:flex
    

    "
    >
      {/* create a logo Container */}
      <div className="  flex justify-left items-center">
        <img
          src="https://assets-global.website-files.com/6365d860c7b7a7191055eb8a/65a33f87fc7fdb5d3745cefd_acme-corp.svg"
          alt="logo"
          className="w-20 h-20"
        />
      </div>
      <div className="grow bg-transparent bg-center bg-cover bg-[url(https://plus.unsplash.com/premium_photo-1668824632073-5b76f7946a72?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] "></div>
      <a href="" className="p-2 underline">
        art by @sbrakeshrath
      </a>
    </div>
  );
}
