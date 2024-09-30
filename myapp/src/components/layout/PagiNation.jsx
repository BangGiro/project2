import React from 'react';
import './PagiNation.css';  // 스타일 파일

const PagiNation = ({ currentPage, totalPages, onPageChange }) => {

  // 첫 페이지로 이동
  const goToFirstPage = () => {
    onPageChange(0);
  };

  // 마지막 페이지로 이동
  const goToLastPage = () => {
    onPageChange(totalPages - 1);
  };

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      onPageChange(page);  // 부모 컴포넌트로 페이지 변경 알림
    }
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {/* 첫 페이지로 이동 */}
        <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={goToFirstPage}>
            &laquo;
          </button>
        </li>
        
        {/* 이전 페이지로 이동 */}
        <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
            &lsaquo;
          </button>
        </li>
        
        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index} className={`page-item ${currentPage === index ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(index)}>
              {index + 1}
            </button>
          </li>
        ))}
        
        {/* 다음 페이지로 이동 */}
        <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
          &rsaquo;
          </button>
        </li>
        
        {/* 마지막 페이지로 이동 */}
        <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={goToLastPage}>
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PagiNation;
