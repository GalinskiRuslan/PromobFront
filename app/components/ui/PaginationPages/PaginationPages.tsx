"use client";
import cl from "./style.module.css";

type Props = {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

export const PaginationPages = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: Props) => {
  const generatePaginationButtons = () => {
    const paginationButtons = [];
    const maxVisiblePages = 2; // Число страниц, которые будут видны до и после текущей

    if (totalPages <= 7) {
      // Если страниц мало, показываем все
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    // Добавляем первую страницу
    paginationButtons.push(1);

    // Многоточие после первой страницы, если текущая страница больше чем maxVisiblePages + 2
    if (currentPage > maxVisiblePages + 2) {
      paginationButtons.push("...");
    }

    // Добавляем текущую страницу и ее соседние страницы
    for (
      let page = Math.max(currentPage - maxVisiblePages, 2);
      page <= Math.min(currentPage + maxVisiblePages, totalPages - 1);
      page++
    ) {
      paginationButtons.push(page);
    }

    // Многоточие перед последней страницей, если текущая страница далеко от конца
    if (currentPage < totalPages - maxVisiblePages - 1) {
      paginationButtons.push("...");
    }

    // Добавляем последнюю страницу только если она ещё не в списке
    if (!paginationButtons.includes(totalPages)) {
      paginationButtons.push(totalPages);
    }

    return paginationButtons;
  };
  return (
    <>
      {totalPages > 1 && (
        <div className={cl.pagination}>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={cl.btnPrev}
          ></button>

          <div className={cl.pages}>
            {generatePaginationButtons().map((page, index) =>
              page === "..." ? (
                <span key={index} className={cl.ellipsis}>
                  ...
                </span>
              ) : (
                <button
                  key={index}
                  onClick={() => setCurrentPage(Number(page))}
                  disabled={currentPage === page}
                  className={cl.btnPage}
                >
                  {page}
                </button>
              )
            )}
          </div>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={cl.btnNext}
          ></button>
        </div>
      )}
    </>
  );
};
