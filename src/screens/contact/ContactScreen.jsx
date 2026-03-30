import { useState } from "react";
import { motion } from "motion/react";
import Button from "@/components/ui/Button";

export default function ContactScreen() {
    const [status, setStatus] = useState("idle"); // idle | submitting | success | error

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus("submitting");

        const form = e.target;
        const data = new FormData(form);

        try {
            const res = await fetch("https://formspree.io/f/xpqodzjb", {
                method: "POST",
                body: data,
                headers: { Accept: "application/json" },
            });

            if (res.ok) {
                setStatus("success");
                form.reset();
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    }

    return (
        <main
            className="
                flex
                flex-col
                justify-center
                items-center
                min-h-dvh
                w-full
                bg-[var(--color-whiteish)]
                pt-24 sm:pt-0
                pb-10 sm:pb-0
            "
        >
            <div
                className="
                    w-full
                    max-w-[980px]
                    px-6 sm:px-10
                    grid
                    gap-5 sm:gap-6
                "
            >
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, transition: { duration: 0.4, ease: "easeOut" } }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
                    className="
                        text-center
                        text-[var(--color-yellow)]
                        [font-family:var(--font-main)]
                        text-[length:var(--text-heading)]
                        tracking-tight
                        font-bold
                    "
                >
                    Let's get in touch.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, transition: { duration: 0.4, ease: "easeOut" } }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.8 }}
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
                </motion.p>

                {status === "success" ? (
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="
                            mx-auto
                            text-center
                            [font-family:var(--font-main)]
                            text-[length:var(--text-body)]
                            text-[var(--color-blackish)]
                            font-medium
                        "
                    >
                        Message sent! I'll get back to you soon.
                    </motion.p>
                ) : (
                    <motion.form
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, transition: { duration: 0.4, ease: "easeOut" } }}
                        transition={{ duration: 0.4, ease: "easeOut", delay: 1.3 }}
                        className="
                            mx-auto
                            w-full
                            max-w-[720px]
                            grid
                            gap-3
                        "
                        onSubmit={handleSubmit}
                    >
                        <div className="grid grid-cols-2 gap-3">
                            <div className="grid gap-2">
                                <label htmlFor="firstName" className="[font-family:var(--font-main)] text-[length:var(--text-body2)] text-[var(--color-blackish)] font-medium">First Name</label>
                                <input required id="firstName" name="firstName" type="text" autoComplete="given-name" className="w-full h-9 rounded-md border-2 border-[var(--color-blackish)] bg-transparent px-3 [font-family:var(--font-main)] text-[length:var(--text-body2)] text-[var(--color-blackish)] opacity-70 outline-none" />
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="lastName" className="[font-family:var(--font-main)] text-[length:var(--text-body2)] text-[var(--color-blackish)] font-medium">Last Name</label>
                                <input required id="lastName" name="lastName" type="text" autoComplete="family-name" className="w-full h-9 rounded-md border-2 border-[var(--color-blackish)] bg-transparent px-3 [font-family:var(--font-main)] text-[length:var(--text-body2)] text-[var(--color-blackish)] opacity-70 outline-none" />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <label htmlFor="email" className="[font-family:var(--font-main)] text-[length:var(--text-body2)] text-[var(--color-blackish)] font-medium">Email</label>
                            <input required id="email" name="email" type="email" autoComplete="email" className="w-full h-9 rounded-md border-2 border-[var(--color-blackish)] bg-transparent px-3 [font-family:var(--font-main)] text-[length:var(--text-body2)] text-[var(--color-blackish)] opacity-70 outline-none" />
                        </div>

                        <div className="grid gap-2">
                            <label htmlFor="message" className="[font-family:var(--font-main)] text-[length:var(--text-body2)] text-[var(--color-blackish)] font-medium">Message</label>
                            <textarea required id="message" name="message" rows={5} className="w-full rounded-md border-2 border-[var(--color-blackish)] bg-transparent px-3 py-2 resize-none [font-family:var(--font-main)] text-[length:var(--text-body2)] text-[var(--color-blackish)] opacity-70 outline-none" />
                        </div>

                        {status === "error" && (
                            <p className="[font-family:var(--font-main)] text-[length:var(--text-body2)] text-[var(--color-blackish)] opacity-70">
                                Something went wrong. Please try again.
                            </p>
                        )}

                        <Button type="submit" disabled={status === "submitting"}>
                            {status === "submitting" ? "SENDING..." : "SUBMIT"}
                        </Button>
                    </motion.form>
                )}
            </div>
        </main>
    );
}