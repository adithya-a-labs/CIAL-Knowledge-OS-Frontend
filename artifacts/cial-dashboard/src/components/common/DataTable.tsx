interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T, index: number) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  rowTestId?: (row: T, index: number) => string;
  className?: string;
}

export default function DataTable<T extends object>({
  columns,
  data,
  emptyMessage = 'No data available.',
  rowTestId,
  className = '',
}: DataTableProps<T>) {
  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#e2eedd]">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={`text-left text-xs font-semibold text-[#5a7a52] uppercase tracking-wide py-2 px-3 ${col.className ?? ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-8 text-[#5a7a52] text-sm">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={i}
                className="border-b border-[#f0f7ed] hover:bg-[#f8fdf6] transition-colors"
                data-testid={rowTestId ? rowTestId(row, i) : undefined}
              >
                {columns.map((col) => (
                  <td key={String(col.key)} className={`py-2 px-3 text-[#1a2e14] ${col.className ?? ''}`}>
                    {col.render
                      ? col.render(row, i)
                      : String((row as Record<string, unknown>)[String(col.key)] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
