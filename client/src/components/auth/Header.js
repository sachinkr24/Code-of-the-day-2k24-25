import { Link } from "react-router-dom";
import logo from '../../img/LOGO.png';
const Header = ({ heading, paragraph, linkName, linkUrl = "#" }) => {
  return (
    <div className="mb-10 text-center">
       <img src={logo} style={{ height: '100px', marginBottom:'1px' }} alt="Logo" className="mx-auto" />
    <h2 className=" text-3xl font-extrabold text-white-600">
      {heading}
    </h2>
      <p className="mt-2 text-sm text-gray-400">
        {paragraph}{" "}
        <Link
          to={linkUrl}
          className="font-medium text-white hover:text-white hover:underline"
        >
          {linkName}
        </Link>
      </p>
    </div>
  );
};

export default Header;
