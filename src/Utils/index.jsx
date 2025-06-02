import moment from "moment";
import { Pagination } from "react-bootstrap";

export const formatDate = (date, format) => {
    return date ? moment(`${date}`).format(format || 'MM/DD/YYYY') : moment().format(format || 'MM/DD/YYYY');
};

export const sortData = (data, key, direc = 'asc') => {
    return data.sort((a, b) => {
        const valueA = getNestedValue(a, key);
        const valueB = getNestedValue(b.key);
        if (direc === 'asc') {
            return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
        } else {
            return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
        }
    });
};

export const getNestedValue = (obj, key) => {
    const keys = key.split('.');
    let value = obj;
    for (let k of keys) {
        value = value ? value[k] : undefined;
    }
    return value;
};

export const renderPagination = (totalItems, limit, currentPage, setCurrentPage) => {
    const totalPages = limit <= 0 ? new Error("Limit must be greater than zero") : Math.ceil(totalItems / limit);

    if (totalPages <= 1) return null;

    const maxVisiblePages = 2; // Number of pages to display on either side of the current page
    let pages = [];

    // Always show the first page
    pages.push(1);

    // Show ellipsis if the current page is far from the beginning
    if (currentPage > maxVisiblePages + 1) {
        pages.push("...");
    }

    // Add pages around the current page
    for (let i = Math.max(2, currentPage - maxVisiblePages); i <= Math.min(totalPages - 1, currentPage + maxVisiblePages); i++) {
        pages.push(i);
    }

    // Show ellipsis if the current page is far from the end
    if (currentPage < totalPages - maxVisiblePages) {
        pages.push("...");
    }

    // Always show the last page if it's not already included
    if (totalPages > 1) {
        pages.push(totalPages);
    }

    return (
        <Pagination>
            <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
            {pages.map((page, index) => {
                if (page === "...") {
                    return <Pagination.Ellipsis key={index} />;
                }
                return (
                    <Pagination.Item
                        key={index}
                        active={currentPage === page}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </Pagination.Item>
                );
            })}
            <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
    );
};

export const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
};

