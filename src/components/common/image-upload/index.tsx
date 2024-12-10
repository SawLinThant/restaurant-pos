import { useRef } from "react";
import { LuUpload } from "react-icons/lu";

interface ImageUploadProps {
  image: string | null;
  handleImageChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
  imageUrl: string;
}
const ImageUpload: React.FC<ImageUploadProps> = ({
  image,
  handleImageChange,
  imageUrl,
}: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleClick = () => {
    if (inputRef.current) inputRef.current.click();
  };
<<<<<<< HEAD
  console.log(imageUrl)
=======
>>>>>>> feature/dashboard
  return (
    <div className="w-full">
      <div
        onClick={handleClick}
        className="w-full min-h-40 relative flex items-center justify-center  border border-gray-300 rounded-md cursor-pointer"
      >
        <div className="w-full">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="w-full "
            onChange={handleImageChange}
          />
        </div>
        <div className="absolute bg-white w-full h-full z-20 flex flex-col gap-3 items-center justify-center rounded-md">
          {image ? (
            <div className="w-full h-full rounded-md overflow-hidden">
              <img
                src={imageUrl}
                alt="image"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-3 items-center justify-center">
              <div>
                <LuUpload size={30} />
              </div>
              <label htmlFor="">Upload Image</label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ImageUpload;
