const pageList = ({ totalPages, setPageno, pageno }) => {
    const getPageButtons = () => {
      const buttons = [];
      const maxButtonsToShow = 5;
  
      if (totalPages <= maxButtonsToShow) {
        for (let i = 1; i <= totalPages; i++) {
          buttons.push(
            <button
              key={i}
              className={`page-number paginationButton ${i === pageno ? 'active' : ''}`}
              onClick={() => setPageno(i)}
            >
              {i}
            </button>
          );
        }
      } else {
        buttons.push(
          <button
            key={1}
            className={`page-number paginationButton ${1 === pageno ? 'active' : ''}`}
            onClick={() => setPageno(1)}
          >
            1
          </button>
        );
  
        const halfButtons = Math.floor(maxButtonsToShow / 2);
        const startPage = Math.max(2, pageno - halfButtons);
        const endPage = Math.min(totalPages - 1, startPage + maxButtonsToShow - 2);
  
        if (startPage > 2) {
          buttons.push(
            <div key="start" className="page-number paginationButton">
              ..
            </div>
          );
        }
  
        for (let i = startPage; i <= endPage; i++) {
          buttons.push(
            <button
              key={i}
              className={`page-number paginationButton ${i === pageno ? 'active' : ''}`}
              onClick={() => setPageno(i)}
            >
              {i}
            </button>
          );
        }
  
        if (endPage < totalPages - 1) {
          buttons.push(
            <div key="end" className="page-number paginationButton">
              ..
            </div>
          );
        }
  
        buttons.push(
          <button
            key={totalPages}
            className={`page-number paginationButton ${totalPages === pageno ? 'active' : ''}`}
            onClick={() => setPageno(totalPages)}
          >
            {totalPages}
          </button>
        );
      }
  
      return buttons;
    };
  
    return <>{getPageButtons()}</>;
  };

  export default pageList;