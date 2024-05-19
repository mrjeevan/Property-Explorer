import React from "react";

type Props = {
  page: number;
  totalItems: number;
  pageSize: number;
  onPageChange: Function;
};

const Pagination = ({ page, totalItems, pageSize, onPageChange }: Props) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <button
        onClick={() => {
          onPageChange(page - 1);
        }}
        className="mr-2 px-2 py-1 border border-gray-300 rounded"
        disabled={page - 1 < 1}
      >
        Previous
      </button>
      <span className="mx-2">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => {
          onPageChange(page + 1);
        }}
        className=" ml-2 px-2 py-1 border border-gray-300 rounded"
        disabled={page + 1 > totalPages}
      >
        Next
      </button>
    </section>
  );
};
export default Pagination;
