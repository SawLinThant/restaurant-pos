import { createColumnHelper } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";

const columnHelper = createColumnHelper();

export const ORDER_COLUMN = () => [
  columnHelper.accessor("table", {
    cell: (info) => <span>{`Table ${info.getValue()}`}</span>,
    header: () => <span className="">Table No</span>,
  }),
  columnHelper.accessor("createdDate", {
    cell: (info) => {
      const date = new Date(info.getValue());
      const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      return <span>{formattedDate}</span>;
    },
    header: () => <span className="">Ordered Created At</span>,
  }),
  columnHelper.accessor("status", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span className="column-head">Status</span>,
  }),
  columnHelper.accessor("id", {
    cell: (info) => {
      const navigate = useNavigate();
      return(
      <button
        className="flex w-full flex-row items-center justify-center gap-2 border-none bg-transparent hover:cursor-pointer text-blue-500"
        onClick={() => {
          navigate(
            `/dashboard/order/${info.getValue()}`
          );
        }}
      >
        <p>Detail</p><FaRegEdit />
      </button>
    )},
    header: () => <span className="column-head"></span>,
  }),
];

export const MENU_COLUMN = () => [
  columnHelper.accessor("name", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span className="">Name</span>,
  }),
  columnHelper.accessor("price", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span className="">Price</span>,
  }),
  columnHelper.accessor("description", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span className="column-head">Description</span>,
  }),
  columnHelper.accessor("category", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span className="column-head">Category</span>,
  }),
  columnHelper.accessor("id", {
    cell: (info) => {
      const navigate = useNavigate();
      return(
      <button
        className="flex w-full flex-row items-center justify-center gap-2 border-none bg-transparent hover:cursor-pointer text-blue-500"
        onClick={() => {
          navigate(
            `/dashboard/menu/${info.getValue()}`
          );
        }}
      >
        <p>Detail</p><FaRegEdit />
      </button>
    )},
    header: () => <span className="column-head"></span>,
  }),
];

export const STAFF_COLUMN = () => [
  columnHelper.accessor("name", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Name</span>,
  }),
  columnHelper.accessor("email", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span className="">Email</span>,
  }),
  columnHelper.accessor("phone", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span className="">Phone No</span>,
  }),
  columnHelper.accessor("role", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span className="column-head">Role</span>,
  }),
  columnHelper.accessor("id", {
    cell: (info) => {
      const navigate = useNavigate();
      return(
      <button
        className="flex w-full flex-row items-center justify-center gap-2 border-none bg-transparent hover:cursor-pointer text-blue-500"
        onClick={() => {
          navigate(
            `/dashboard/staff/${info.getValue()}`
          );
        }}
      >
        <p>Detail</p><FaRegEdit />
      </button>
    )},
    header: () => <span className="column-head"></span>,
  }),
];

