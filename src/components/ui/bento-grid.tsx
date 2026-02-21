import { ComponentPropsWithoutRef, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode
  className?: string
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string
  className?: string
  background?: ReactNode
  description?: string
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div className={cn("grid w-full grid-cols-3 gap-4", className)} {...props}>
      {children}
    </div>
  )
}

const BentoCard = ({
  name,
  className,
  background,
  description,
  ...props
}: BentoCardProps) => (
  <div
    className={cn(
      "relative col-span-3 overflow-hidden rounded-xl min-h-[22rem]",
      "group cursor-pointer bg-[var(--color-whiteish)] transform-gpu transition-all duration-200 ease-out",
      "hover:-translate-y-2 hover:scale-[1.02] hover:bg-[var(--color-yellow)]",
      className
    )}
    {...props}
  >
    {background ? <div className="absolute inset-0">{background}</div> : null}

    <div className="relative p-4">
      <h3
        className="
          [font-family:var(--font-main)]
          font-extrabold
          tracking-[-0.06em]
          text-[length:var(--text-subheading)]
          leading-[0.95]

          text-[var(--color-blackish)]
          transition-colors
          duration-200
          group-hover:text-[var(--color-whiteish)]
        "
      >
        {name}
      </h3>

      {description ? (
        <p
          className="
            mt-3
            [font-family:var(--font-main)]
            font-medium
            text-[length:var(--text-body)]
            leading-[1.35]
            max-w-[55ch]

            text-[var(--color-blackish)]
            transition-colors
            duration-200
            group-hover:text-[var(--color-whiteish)]
          "
        >
          {description}
        </p>
      ) : null}
    </div>
  </div>
)

export { BentoCard, BentoGrid }