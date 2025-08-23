import * as React from 'react';
import { PaginationProps } from '@mui/material/Pagination';
import Link from 'next/link';

interface TpropCustomPagination extends PaginationProps {
  postsPerPage:number
  totalPosts:number
  setCurrentPage:any
  currentPage:number,
}
const  CustomPagination=(props:TpropCustomPagination)=> {
  const {totalPosts,postsPerPage,setCurrentPage,currentPage} = props
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const paginate = (e:any,pageNumber:any) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  return (
    <nav>
      <ul className="pagination" style={{display:"flex", gap:4}}>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <Link
              onClick={(e) => paginate(e,number)}
              className="page-link"
              href={"#"}
            >
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
export default CustomPagination 