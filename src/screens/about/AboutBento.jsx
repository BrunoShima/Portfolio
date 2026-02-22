import { useState } from "react"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"
import BentoModal from "./BentoModal"

import { BENTO_ITEMS } from "@/data/BentoItems"

export default function AboutBento() {
  const [activeId, setActiveId] = useState(null)

  const activeItem = BENTO_ITEMS.find((item) => item.id === activeId)

  return (
    <section className="bg-[var(--color-whiteish)]">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 pt-6 pb-20">
        <BentoGrid className="grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4">
          {BENTO_ITEMS.map((item) => (
            <BentoCard
              key={item.id}
              name={item.name}
              description={item.description}
              className={item.className}
              onClick={() => setActiveId(item.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setActiveId(item.id)
                }
              }}
            />
          ))}
        </BentoGrid>
      </div>

      <BentoModal
        open={Boolean(activeItem)}
        title={activeItem?.name}
        onClose={() => setActiveId(null)}
      >
        {/* Body paragraphs */}
        {activeItem?.body?.length ? (
          <div className="grid gap-4">
            {activeItem.body.map((text, idx) => (
              <p
                key={idx}
                className="
                  [font-family:var(--font-main)]
                  text-[length:var(--text-body)]
                  leading-[1.5]
                "
              >
                {text}
              </p>
            ))}
          </div>
        ) : null}

        {/* Bullets */}
        {activeItem?.bullets?.length ? (
          <ul
            className="
              mt-6
              list-disc
              pl-6
              grid
              gap-2
              [font-family:var(--font-main)]
              text-[length:var(--text-body)]
              leading-[1.5]
            "
          >
            {activeItem.bullets.map((b, idx) => (
              <li key={idx}>{b}</li>
            ))}
          </ul>
        ) : null}
      </BentoModal>
    </section>
  )
}