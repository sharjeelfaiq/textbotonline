import { cn } from "@/lib/utils"

type AuroraBackgroundProps = {
  className?: string
}

export function AuroraBackground({ className }: AuroraBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none fixed inset-0 -z-10 overflow-hidden", className)}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white to-white dark:from-tbo-bg dark:to-tbo-bg" />

      <div className="absolute -inset-[35%] opacity-70 blur-3xl dark:opacity-50">
        <div className="absolute left-1/2 top-[10%] h-[48rem] w-[48rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.35),transparent_60%)] mix-blend-multiply will-change-transform motion-reduce:animate-none dark:mix-blend-screen dark:bg-[radial-gradient(circle_at_center,rgba(77,163,255,0.30),transparent_60%)] animate-aurora" />
        <div className="absolute left-[15%] top-[35%] h-[42rem] w-[42rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.28),transparent_60%)] mix-blend-multiply will-change-transform motion-reduce:animate-none dark:mix-blend-screen dark:bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.18),transparent_60%)] animate-aurora-slow" />
        <div className="absolute right-[10%] top-[65%] h-[44rem] w-[44rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.22),transparent_60%)] mix-blend-multiply will-change-transform motion-reduce:animate-none dark:mix-blend-screen dark:bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.16),transparent_60%)] animate-aurora" />
      </div>

      <div className="absolute inset-0 bg-white/25 dark:bg-tbo-bg/20" />
    </div>
  )
}
