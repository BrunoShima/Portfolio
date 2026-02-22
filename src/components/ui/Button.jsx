import { cn } from "@/lib/utils"

const base =
    `
    inline-flex items-center justify-center
    transition-transform duration-200 ease-out transform-gpu
    focus-visible:outline-none
    disabled:opacity-50 disabled:pointer-events-none
    `

const variants = {
    primary: `
        mt-4 mx-auto block
        w-[140px]
        rounded-sm
        border-2 border-[var(--color-yellow)]
        bg-transparent
        py-2
        text-xs
        font-bold
        tracking-widest
        text-[var(--color-yellow)]

        hover:bg-[var(--color-yellow)]
        hover:text-[var(--color-whiteish)]
        hover:-translate-y-[2px]

        transition-colors
        focus-visible:ring-2
        focus-visible:ring-[var(--color-yellow)]
        focus-visible:ring-offset-4
        focus-visible:ring-offset-[var(--color-whiteish)]
    `,
    outline: `
        rounded-md
        border-2 border-[var(--color-blackish)]
        bg-[var(--color-whiteish)]
        text-[var(--color-blackish)]
        px-5 py-2
        font-medium
    `,
    ghost: `
        rounded-md
        border-2 border-transparent
        bg-transparent
        text-[var(--color-blackish)]
        px-4 py-2
        font-medium
        hover:border-[var(--color-blackish)]
    `,
}

export default function Button({
  className = "",
  variant = "primary",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], className)}
      {...props}
    />
  )
}