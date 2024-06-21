import React, {FC} from 'react';
import ReactPaginate from 'react-paginate';

import styles from './pagination.module.css';

interface IProps {
    pageCount: number;
    currentPage: number;
    onPageChange: (selectedPage: number) => void;
    isFirstPage: boolean;
    isLastPage: boolean;
}

const Pagination: FC<IProps> = ({pageCount, currentPage, onPageChange, isFirstPage, isLastPage}) => {

    const handlePageClick = (data: { selected: number }) => {
        onPageChange(data.selected + 1);
    };

    const previousLabel = isFirstPage ? null : (
        <div className={styles.circle}>&lt;</div>
    );
    const nextLabel = isLastPage ? null : (
        <div className={styles.circle}>&gt;</div>
    );

    return (
        <div className={styles.pagination}>
            <ReactPaginate
                key={currentPage}
                pageCount={pageCount}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                onPageChange={handlePageClick}
                initialPage={currentPage - 1}
                className={'pagination'}
                activeClassName={styles.active}
                disabledClassName={styles.disabled}
                previousLabel={previousLabel}
                nextLabel={nextLabel}
                renderOnZeroPageCount={null}
            />
        </div>
    );
};

export {Pagination};