//footer.tsx

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div>
      <div className=" py-8 px-4 flex w-full flex-wrap gap-10">
        <div className="max-w-[200px] m-auto">
          <img
            src="https://assets-global.website-files.com/6365d860c7b7a7191055eb8a/65a33f87fc7fdb5d3745cefd_acme-corp.svg"
            alt="logo"
            className="w-20 h-20"
          />
          <p className="text-gray-600 mt-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non,
            numquam.
          </p>
          {/* {social mediaicon container using font awsome icons} */}

          <div className="flex space-x-4 mt-4 flex-wrap ">
            <Link to="#" className="text-gray-700 hover:text-gray-900">
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
            <Link to="#" className="text-gray-700 hover:text-gray-900">
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
            <Link to="#" className="text-gray-700 hover:text-gray-900">
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
          </div>
        </div>
        <div className="px-4 flex flex-wrap gap-5 justify-center grow">
          <ul>
            <h3 className="font-bold text-lg">About Us</h3>
            <li>
              <Link to="#">About Us</Link>
            </li>
            <li>
              <Link to="#">Contact Us</Link>
            </li>
            <li>
              <Link to="#">Careers</Link>
            </li>
            <li>
              <Link to="#">Press</Link>
            </li>
          </ul>
          <ul>
            <h3 className="font-bold text-lg">About Us</h3>
            <li>
              <Link to="#">About Us</Link>
            </li>
            <li>
              <Link to="#">Contact Us</Link>
            </li>
            <li>
              <Link to="#">Careers</Link>
            </li>
            <li>
              <Link to="#">Press</Link>
            </li>
          </ul>
          <ul>
            <h3 className="font-bold text-lg">About Us</h3>
            <li>
              <Link to="#">About Us</Link>
            </li>
            <li>
              <Link to="#">Contact Us</Link>
            </li>
            <li>
              <Link to="#">Careers</Link>
            </li>
            <li>
              <Link to="#">Press</Link>
            </li>
          </ul>
          <ul>
            <h3 className="font-bold text-lg">About Us</h3>
            <li>
              <Link to="#">About Us</Link>
            </li>
            <li>
              <Link to="#">Contact Us</Link>
            </li>
            <li>
              <Link to="#">Careers</Link>
            </li>
            <li>
              <Link to="#">Press</Link>
            </li>
          </ul>
          <ul>
            <h3 className="font-bold text-lg">About Us</h3>
            <li>
              <Link to="#">About Us</Link>
            </li>
            <li>
              <Link to="#">Contact Us</Link>
            </li>
            <li>
              <Link to="#">Careers</Link>
            </li>
            <li>
              <Link to="#">Press</Link>
            </li>
          </ul>
          <ul>
            <h3 className="font-bold text-lg">About Us</h3>
            <li>
              <Link to="#">About Us</Link>
            </li>
            <li>
              <Link to="#">Contact Us</Link>
            </li>
            <li>
              <Link to="#">Careers</Link>
            </li>
            <li>
              <Link to="#">Press</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
