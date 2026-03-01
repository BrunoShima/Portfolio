import Button from "@/components/ui/Button";

export default function ContactScreen() {
    
    return (

        <main
            className="
                grid
                h-dvh
                w-full
                place-items-center
                overflow-hidden
                bg-[var(--color-whiteish)]
            "
        >

        {/* Page wrapper */}
            <div
                className="
                    w-full
                    max-w-[980px]
                    px-6 sm:px-10
                    grid
                    gap-5 sm:gap-6
                "
            >
                
            <h1
                className="
                    text-center
                    text-[var(--color-yellow)]
                    [font-family:var(--font-main)]
                    text-[length:var(--text-subheading)]
                    tracking-tight
                    font-bold
                "
            >

                Let's get in touch.

            </h1>

            <p
                className="
                    mx-auto
                    w-full
                    max-w-[70ch]
                    text-center
                    text-[var(--color-blackish)]
                    [font-family:var(--font-main)]
                    text-[length:var(--text-body)]
                    font-medium
                "
            >

                If you need a steady design hand, a front-end build, or a teammate who cares about the details, send a note and I'll get back to you.

            </p>

            <form
                className="
                    mx-auto
                    w-full
                    max-w-[720px]
                    grid
                    gap-3
                "
            >

            {/* First + Last (always 2 columns now) */}
                <div className="grid grid-cols-2 gap-3">

                    <div className="grid gap-2">

                    <label
                        htmlFor="firstName"
                        className="
                            [font-family:var(--font-main)]
                            text-[length:var(--text-body2)]
                            text-[var(--color-blackish)]
                            font-medium
                        "
                >

                    First Name

                    </label>

                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        className="
                            w-full
                            h-9
                            rounded-md
                            border-2
                            border-[var(--color-blackish)]
                            bg-transparent
                            px-3
                            [font-family:var(--font-main)]
                            text-[length:var(--text-body)]
                            text-[var(--color-blackish)]
                            outline-none
                        "
                    />

                    </div>

                    <div className="grid gap-2">

                    <label
                        htmlFor="lastName"
                        className="
                        [font-family:var(--font-main)]
                        text-[length:var(--text-body2)]
                        text-[var(--color-blackish)]
                        font-medium
                        "
                    >

                        Last Name

                    </label>

                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        className="
                            w-full
                            h-9
                            rounded-md
                            border-2
                            border-[var(--color-blackish)]
                            bg-transparent
                            px-3
                            [font-family:var(--font-main)]
                            text-[length:var(--text-body)]
                            text-[var(--color-blackish)]
                            outline-none
                        "
                    />

                    </div>

                </div>

                    {/* Email */}
                    <div className="grid gap-2">

                        <label
                            htmlFor="email"
                            className="
                                [font-family:var(--font-main)]
                                text-[length:var(--text-body2)]
                                text-[var(--color-blackish)]
                                font-medium
                            "
                        >

                            Email

                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            className="
                                w-full
                                h-9
                                rounded-md
                                border-2
                                border-[var(--color-blackish)]
                                bg-transparent
                                px-3
                                [font-family:var(--font-main)]
                                text-[length:var(--text-body)]
                                text-[var(--color-blackish)]
                                outline-none
                            "
                        />

                    </div>

                    {/* Message */}
                    <div className="grid gap-2">

                        <label
                            htmlFor="message"
                            className="
                                [font-family:var(--font-main)]
                                text-[length:var(--text-body2)]
                                text-[var(--color-blackish)]
                                font-medium
                            "
                        >

                            Message

                        </label>

                        <textarea
                            id="message"
                            name="message"
                            rows={5}
                            className="
                                w-full
                                rounded-md
                                border-2
                                border-[var(--color-blackish)]
                                bg-transparent
                                px-3
                                py-2
                                resize-none
                                [font-family:var(--font-main)]
                                text-[length:var(--text-body)]
                                text-[var(--color-blackish)]
                                outline-none
                            "
                        />

                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                    >

                        SUBMIT

                    </Button>

            </form>

            </div>
        
        </main>
  );
}