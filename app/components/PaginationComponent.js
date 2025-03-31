import { useRouter } from 'next/compat/router';

const PaginationComponent = ({ totalPages, currentPage }) => {
  const router = useRouter();

  const handlePageChange = (page) => {
    router.push(`?page=${page}`, undefined, { shallow: true });
  };

  return (
    <div className="flex justify-center my-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-red-500 rounded-md disabled:opacity-50"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => handlePageChange(i + 1)}
          className={`px-4 py-2 mx-1 rounded-md ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-purple-400'}`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-green-700 rounded-md disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationComponent;
