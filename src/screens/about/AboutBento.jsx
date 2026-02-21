import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const cardBase = `
    relative
    overflow-hidden
    rounded-md
    border-[var(--color-blackish)]
    bg-[var(--color-whiteish)]
    border-2

    group
    cursor-pointer
    transform-gpu
    transition-transform
    duration-200
    ease-out
    hover:-translate-y-2
    hover:scale-[1.02]
`;

const items = [
    {
        name: "Method",
        description: "Built On Education.",
        href: "#",
        cta: "Open",
        className: "col-span-3 lg:col-span-1",
        background: <div className="absolute inset-0 opacity-20" />,
    },
    {
        name: "Perspective",
        description: "Shaped By Culture.",
        href: "#",
        cta: "Open",
        className: "col-span-3 lg:col-span-2",
        background: <div className="absolute inset-0 opacity-20" />,
    },
    {
        name: "Taste",
        description: "Refined Through Consumption.",
        href: "#",
        cta: "Open",
        className: "col-span-3 lg:col-span-3",
        background: <div className="absolute inset-0 opacity-20" />,
    },
    {
        name: "1",
        description: "Punchy Desc.",
        href: "#",
        cta: "Open",
        className: "col-span-3 lg:col-span-3",
        background: <div className="absolute inset-0 opacity-20" />,
    },
    {
        name: "2",
        description: "Punchy Desc.",
        href: "#",
        cta: "Open",
        className: "col-span-3 lg:col-span-3",
        background: <div className="absolute inset-0 opacity-20" />,
    },
    {
        name: "3",
        description: "Punchy Desc.",
        href: "#",
        cta: "Open",
        className: "col-span-3 lg:col-span-3",
        background: <div className="absolute inset-0 opacity-20" />,
    },
];

export default function AboutBento() {

  return (

    <section className="bg-[var(--color-whiteish)]">

      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 pt-6 pb-20">

        <BentoGrid className="grid-cols-3">

          {items.map((item) => (

            <BentoCard
              key={item.name}
              {...item}
              className={`${item.className} ${cardBase}`}
            />

          ))}

        </BentoGrid>

      </div>

    </section>

  );

}