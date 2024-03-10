import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Props {
  totalItems: number;
  itemCountPerPage: number;
  pageCount: number;
  currentPage: number;
  linkHref: string;
}

export default function Pagination({
  totalItems,
  itemCountPerPage,
  pageCount,
  currentPage,
  linkHref,
}: Props) {
  const totalPages = Math.ceil(totalItems / itemCountPerPage);
  const [start, setStart] = useState(1);
  const noPrev = start === 1;
  const noNext = start + pageCount - 1 >= totalPages;

  useEffect(() => {
    console.log(currentPage);
    if (currentPage === start + pageCount) setStart(prev => prev + pageCount);
    if (currentPage < start) setStart(prev => prev - pageCount);
  }, [currentPage, pageCount, start]);

  return (
    <div>
      <ul className="flex gap-4">
        <li>
          <Link href={`${linkHref}&page=${start - 1}`}>이전</Link>
        </li>
        {[...Array(pageCount)].map((a, i) => (
          <>
            {start + i <= totalPages && (
              <li key={i}>
                <Link href={`${linkHref}&page=${start + i}`}>{start + i}</Link>
              </li>
            )}
          </>
        ))}
        <li>
          <Link href={`${linkHref}&page=${start + pageCount}`}>다음</Link>
        </li>
      </ul>
    </div>
  );
}
