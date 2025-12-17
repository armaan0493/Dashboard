function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.48 7.55a1 1 0 0 1-1.424-.006L3.29 9.704a1 1 0 1 1 1.414-1.414l3.806 3.806 6.774-6.804a1 1 0 0 1 1.414-.006Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#1A73E8]" />
          <span className="text-sm text-foreground/90">{item}</span>
        </li>
      ))}
    </ul>
  );
}
