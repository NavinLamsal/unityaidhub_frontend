import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }:{currentPage:number; totalPages:number; onPageChange:any}) => {
  const maxVisiblePages = 3;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  if(totalPages > 1){
    return (
        <div className="flex items-center justify-center mt-4">
          <ul className="flex items-center text-base md:text-lg">
            <Button 
                variant="default_outline"
                disabled={currentPage === 1 }
              className={` px-1 py-0.5 `}
              onClick={handlePrevPage}
            >
              <ChevronLeft />
            </Button>
            { currentPage > 2 ?  
            <>
            {totalPages > 3 && <li
              className={`mx-1 px-2  cursor-pointer hover:text-primary ${
                currentPage === 1 ? 'text-primary' : 'text-zinc-950'
              }`}
              onClick={() => onPageChange(1)}
            >
              1
            </li>
            }
            </>:" "
            }
    
            {startPage > 2 && (
              <li className="mx-1">...</li>
            )}
    
            {pages.map(page => (
              <li
                key={page}
                className={`mx-0.5 px-2 cursor-pointer hover:text-Secondary dark:hover:text-Secondary ${
                  currentPage === page ? 'text-Primary' : 'text-zinc-950 dark:text-zinc-50'
                }`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </li>
            ))}
    
            {endPage < totalPages-1 && (
              <li className="mx-1">...</li>
            )}
    
            { currentPage > totalPages-2  ? "":
            <>
            {totalPages > 3 && <li
              className={`mx-1 px-2 cursor-pointer hover:text-Secondary dark:hover:text-Secondary  ${
                currentPage === totalPages ? 'text-Primary' : 'text-zinc-950 dark:text-zinc-50'
              }`}
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </li>
    
            }
            
            </>
             }
    
            <Button
                variant="default_outline"
                disabled={currentPage === totalPages}
              className={` px-1 py-0.5 `}
             
              onClick={handleNextPage}
            >
              <ChevronRight />
            </Button>
          </ul>
        </div>
      );
  }
  else{
    return(
        <></>
    );
  }

 
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
