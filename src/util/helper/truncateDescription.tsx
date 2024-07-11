export function truncateDescription(desc: string, maxLength: number) {
  return (
    <p className="w-full break-words text-sm font-normal text-gray-400">
      {desc.slice(0, maxLength)}
      {desc.length > maxLength && (
        <span className="text-indigo-700 hover:underline">
          {""} Read more...
        </span>
      )}
    </p>
  );
}
