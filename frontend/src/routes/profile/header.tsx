import "./header.css"

const Header = ({ imageUrl }: { imageUrl?: string }) => {
    return (
      <header className="bg-white px-6 flex justify-between items-center border-b-2">
        <div className="flex items-center">
          <a href="#" className="mr-6">
            <img
              src="https://assets-global.website-files.com/6365d860c7b7a7191055eb8a/65a33f87fc7fdb5d3745cefd_acme-corp.svg"
              alt="logo"
              className="w-20 h-20"
            />
          </a>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  Inspiration
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  Find Work
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  Learn Design
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  Go Pro
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  Hire Designers
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center">
          {imageUrl && (
            <a href="#" className="rounded-full overflow-hidden mr-7 ">
              <img
                src={imageUrl}
                alt="Avatar"
                className="h-16 w-16 object-cover"
              />
            </a>
          )}
  
          <button
            type="button"
            className="  px-4 py-2 rounded-md transition-colors duration-200 border-gray-400  border mb-2  bg-[#ff2184] hover:bg-[#f48a86] hover:text-white"
          >
            Upload
          </button>
        </div>
      </header>
    );
  };

  export default Header;