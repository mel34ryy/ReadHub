import { BiLoaderAlt } from "react-icons/bi";

function Spinner() {
  return (
    <BiLoaderAlt
      className="animate-spin w-8 h-8"
      style={{ animationDuration: "1.5s" }}
    />
  );
}

export default Spinner;
