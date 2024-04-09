//card1.tsx

import "./card1.css";

export default function Card1({
  tittle,
  desc,
  img,
  name
}: {
  tittle: string;
  desc: string;
  img: string;
    name: string;
}) {
  return (
    <div className="card1 cursor-pointer bg-white rounded-lg shadow-md flex items-center space-x-4 relative w-full max-w-[300px]">
      <div className="absolute top-0 left-[50%] translate-x-[-50%] w-full flex justify-center">
        <img src={img} alt="clipart" className="h-[200px] object-contain" />
      </div>
      <div className="flex-col flex mt-[200px] w-full p-6">
        <h2 className="text-lg font-semibold mb-2 text-center">{tittle}</h2>
        <p className="text-gray-600 text-center hidden h-[100px] ">{desc}</p>

        {/* create a cirucular button with a checkmark icon */}

        <div className="flex justify-center align-center mt-2">
          <input
            type="checkbox"
            name={name}
            className="h-6 w-6 rounded-full border-2 border-gray-400 bg-white appearance-none cursor-pointer transition-colors duration-200 hover:border-slate-400 focus:outline-none focus:border-slate-400 checked:bg-slate-400 checked:border-slate-400 checked:text-white checked:ring-2 checked:ring-offset-2 checked:ring-slate-400 checked:ring-offset-slate-50"
          />
        </div>
      </div>
    </div>
  );
}
