import Image from "next/image"

export function StarVetLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <Image
      src="/images/starvet-logo.png"
      alt="StarVet Logo"
      width={80}
      height={80}
      className={className}
    />
  )
}
