import { useNavigate, useSearchParams } from "react-router-dom";

const Pagination = ({ total_pages, queryParams }: any) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("pageno") || "1");
  const totalPages = total_pages;

  const updateQueryParams = (newParams: Record<string, any>) => {
    const updatedParams = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        updatedParams.set(key, String(value));
      } else {
        updatedParams.delete(key);
      }
    });

    navigate({
      search: updatedParams.toString(),
    });
  };

  const nextBtnHandler = () => {
    if (currentPage < totalPages){
        updateQueryParams({
          ...queryParams, 
          pageno: (currentPage + 1).toString()
        })
    }
  };

  const previousBtnHandler = () => {
    if(currentPage > 1){
      updateQueryParams({
        ...queryParams,
        pageno: (currentPage - 1).toString()
      })
    }
  };

  return (
    <div className="flex flex-row gap-4">
      <button onClick={() => previousBtnHandler} className="font-bold">
        Prev
      </button>
      <div className="flex flex-row gap-2">
        <p className="text-lg">{currentPage}</p>
        <span>/</span>
        <p className="font-serif text-lg">{totalPages}</p>
      </div>
      <button onClick={() => nextBtnHandler} className="font-bold">
        Next
      </button>
    </div>
  );
};
export default Pagination;
