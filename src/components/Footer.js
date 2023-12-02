import React from "react";
import PageList from "./pageList.js";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

const Footer = ({ totalUsers, setPageno, pageno, selectedUsers }) => {
  const total = Math.ceil(totalUsers / 10);

  return (
    <div className="footer">
      <div className="selectedPages">
        {selectedUsers?.length} of {totalUsers} row(s) selected
      </div>
      <div className="pagination">
        <div className="pg-number">
          Page {pageno} of {total}
        </div>
        <div className="pageList">
        <button
            className="previous-page paginationButton"
            onClick={() => setPageno(1)}
          >
            <FaAngleDoubleLeft />
          </button>
          <button
            className="previous-page paginationButton"
            onClick={() => setPageno((prev) => (prev === 1 ? prev : prev - 1))}
          >
            <FaAngleLeft />
          </button>
          <PageList pageno={pageno} totalPages={total} setPageno={setPageno} />
          <button
            className="next-page paginationButton"
            onClick={() => setPageno((prev) => (total === 1 ? prev : prev + 1))}
          >
            <FaAngleRight />
          </button>

          <button
            className="previous-page paginationButton"
            onClick={() => setPageno(total)}
          >
            <FaAngleDoubleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
