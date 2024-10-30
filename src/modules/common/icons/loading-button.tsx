import { AiOutlineLoading3Quarters } from "react-icons/ai";

type IconProps = {
    size:number
}

const LoadingIcon = ({size}:IconProps) => {
  return (
    <div>
      <AiOutlineLoading3Quarters size={size} className="animate-spin"/>
    </div>
  );
};
export default LoadingIcon;