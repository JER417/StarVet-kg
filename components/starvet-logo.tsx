export function StarVetLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Paw pads */}
      <ellipse cx="20" cy="14" rx="6" ry="7" fill="currentColor" className="text-primary" />
      <ellipse cx="36" cy="10" rx="5.5" ry="6.5" fill="currentColor" className="text-primary" />
      <ellipse cx="48" cy="16" rx="5" ry="6" fill="currentColor" className="text-primary" />
      <ellipse cx="11" cy="24" rx="5" ry="6" fill="currentColor" className="text-primary" />
      {/* Main paw pad */}
      <ellipse cx="30" cy="36" rx="16" ry="14" fill="currentColor" className="text-primary" />
      {/* Star */}
      <path
        d="M30 26l2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8z"
        fill="currentColor"
        className="text-primary-foreground"
      />
    </svg>
  )
}
