export interface SearchStatusProps {
  hasSearchTerm: boolean;
  resultsCount: number;
}

export function SearchStatus({
  hasSearchTerm,
  resultsCount,
}: SearchStatusProps) {
  const alertText = getAlertText(hasSearchTerm, resultsCount);
  return (
    <p
      role="alert"
      aria-atomic
      aria-live="polite"
      className={`inline-block rounded-full bg-slate-800 px-4 py-2 italic text-sky-400 ${
        alertText ? "" : "sr-only"
      }`}
    >
      {alertText}
    </p>
  );
}

function getAlertText(hasSearchTerm: boolean, resultsCount: number) {
  const hasLaunches = Boolean(resultsCount);
  if (!hasSearchTerm) {
    return "Enter the name of a launch to search for";
  }
  if (!hasLaunches) {
    return "No results found";
  }
  if (hasLaunches) {
    return `${resultsCount} ${
      resultsCount === 1 ? "result" : "results"
    } returned`;
  }
}
