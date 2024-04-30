import React from "react";

function AccSkeleton() {
  return (
    <div className="grid lg:grid-cols-4 md:gap-6 sm:gap-3 lg:gap-3 sm:grid-cols-2 grid-cols-1 gap-3">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <div className="flex flex-col gap-2" key={item}>
          <div className="h-[270px] bg-gray-200 rounded-md" />
          <div className="h-10 bg-gray-200 rounded-md" />
          <div className="h-10 bg-gray-200 rounded-md" />
        </div>
      ))}
    </div>
  );
}

export default AccSkeleton;
