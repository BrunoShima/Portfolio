import {
    SiAdobephotoshop,
    SiAdobeillustrator,
    SiAdobeindesign,
    SiHtml5,
    SiCss3,
    SiJavascript,
    SiReact,
} from "react-icons/si";

const ICONS = [
    { icon: SiAdobephotoshop,   label: "Photoshop"   },
    { icon: SiAdobeillustrator, label: "Illustrator" },
    { icon: SiAdobeindesign,    label: "InDesign"    },
    { icon: SiHtml5,            label: "HTML"        },
    { icon: SiCss3,             label: "CSS"         },
    { icon: SiJavascript,       label: "JavaScript"  },
    { icon: SiReact,            label: "React"       },
];

export default function TechMarquee() {
    return (
        <div className="w-full py-10 bg-[var(--color-whiteish)]">
            <div className="max-w-[1600px] mx-auto px-8 sm:px-16 lg:px-26">
                <div
                    className="overflow-hidden"
                    style={{
                        maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                        WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                    }}
                >
                    <div
                        className="flex w-max"
                        style={{ animation: "marquee 18s linear infinite" }}
                    >
                        {[...ICONS, ...ICONS, ...ICONS, ...ICONS].map((item, i) => (
                            <div key={i} className="flex items-center px-10">
                                <item.icon
                                    className="h-10 w-10"
                                    color="var(--color-yellow)"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
