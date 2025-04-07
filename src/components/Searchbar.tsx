import type { FormEvent } from "react";
import { GoSearch } from "react-icons/go";
import { GoInbox } from "react-icons/go";

const Searchbar = () => {
  return (
    <search className="w-full">
      <form
        onClick={(e: FormEvent) => {
          e.preventDefault();
        }}
        className="group bg-brand-black-500 hover:bg-brand-black-400 flex w-full items-center justify-between gap-3 rounded-full p-2 transition-colors focus-within:outline-2 focus-within:outline-white sm:p-3"
      >
        <GoSearch className="size-4 text-gray-400 transition-colors group-hover:text-white sm:size-5 lg:size-6" />
        <input
          type="search"
          placeholder="What do you want to play?"
          className="w-5/6 border-r border-gray-400 pr-3 text-sm text-gray-200 transition-colors outline-none group-hover:text-white md:text-base"
        />
        <GoInbox className="size-4 text-gray-400 transition-colors group-hover:text-white sm:size-5 lg:size-6" />
      </form>
    </search>
  );
};

export default Searchbar;
