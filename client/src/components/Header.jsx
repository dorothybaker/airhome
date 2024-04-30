import { TextInput } from "@mantine/core";

function Header({ search, setSearch }) {
  return (
    <div className="max-w-7xl w-full mx-auto p-4 flex flex-col gap-2">
      <div className="flex flex-col gap-0.5">
        <span className="text-2xl font-normal">
          <span className="text-primary">Airhome</span>, belong anywhere!
        </span>
        <span className="text-gray-600 text-[15px]">
          Unlock instant saving of 10% or more with a free Airhome account!
        </span>
      </div>
      <TextInput
        placeholder="Search by city or country or title"
        className="placeholder-gray-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="md"
      />
    </div>
  );
}

export default Header;
