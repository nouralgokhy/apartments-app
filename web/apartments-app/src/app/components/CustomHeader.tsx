import Link from 'next/link';

export default function CustomHeader({ title }: { title: string }) {
  return (
    <header className="w-full fixed top-0 left-0 z-20 flex flex-col md:flex-row items-center justify-between py-4 px-4 md:px-8 border-b border-gray-200 bg-white shadow-sm gap-2 md:gap-0">
      <Link
        href="/"
        className="flex items-center gap-2 text-gray-700 font-medium text-base px-4 py-2 rounded-full transition border border-gray-300 bg-gray-100 shadow-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Back
      </Link>
      <span className="text-lg md:text-2xl font-bold text-gray-800 tracking-wide text-center w-full md:w-auto">
        {title}
      </span>
      <span className="hidden md:inline-block" />
    </header>
  );
}
