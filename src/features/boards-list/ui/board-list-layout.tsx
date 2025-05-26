import React from "react";

export function BoardListLayout({
  header,
  filters,
  children,
}: {
  header: React.ReactNode;
  filters: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="container mx-auto p-4 flex flex-col gap-6">
      {header}
      {filters}
      {children}
    </div>
  );
}

export function BoardListLayoutHeader({
  title,
  actions,
  description,
}: {
  title: string;
  actions?: React.ReactNode;
  description?: string;
}) {
  return (
    <div className="flex justify-between items-center ">
      <div>
        <h1 className="text-2xl font-bold mb-6">{title}</h1>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      {actions}
    </div>
  );
}

export function BoardListLayoutFilters({
  sort,
  filters,
  actions,
}: {
  sort?: React.ReactNode;
  filters?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 ">
      <div className="flex items-center gap-2">
        <div className="text-sm text-gray-500">Filter by</div> {filters}
      </div>
      <div className="flex items-center gap-2">
        <div className="text-sm text-gray-500">Sort by</div>
        {sort}
      </div>
      {actions && <div className="ml-auto">{actions}</div>}
    </div>
  );
}
