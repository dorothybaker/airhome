function SingleSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="bg-gray-200 rounded-lg h-10" />
      <div className="grid grid-cols-5 sm:h-[500px] h-[320px] gap-2">
        <div className="col-span-3 sm:h-[500px] h-[320px] bg-gray-200" />
        <div className="col-span-2 flex flex-col gap-2">
          <div className="sm:h-[246px] h-[156px] bg-gray-200" />
          <div className="sm:h-[246px] h-[156px] bg-gray-200" />
        </div>
      </div>
      <div className="bg-gray-200 rounded-lg h-16" />
      <div className="bg-gray-200 rounded-lg h-10" />
      <div className="bg-gray-200 rounded-lg h-[150px]" />
    </div>
  );
}

export default SingleSkeleton;
