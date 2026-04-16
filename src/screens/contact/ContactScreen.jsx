import { useState } from "react";
import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import { FiCopy, FiCheck } from "react-icons/fi";

const INPUT_CLASS = "w-full h-9 rounded-md border-2 border-[var(--color-blackish)] bg-transparent px-3 [font-family:var(--font-main)] text-[length:var(--text-body2)] text-[var(--color-blackish)] opacity-70 outline-none";
const LABEL_CLASS = "[font-family:var(--font-main)] text-[length:var(--text-body2)] text-[var(--color-blackish)] font-medium";

export default function ContactScreen() {
    const [status, setStatus] = useState("idle");
    const [copied, setCopied] = useState(false);

    function copyEmail() {
        navigator.clipboard.writeText("designedbybru@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

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
        <main className="
            min-h-dvh flex items-center
            bg-[var(--color-whiteish)]
            text-[var(--color-blackish)]
            [font-family:var(--font-main)]
            px-8 sm:px-16 lg:px-26
            pt-24 pb-12
        ">
            <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                {/* ── Left: heading + body + info blocks ───────────────────── */}
                <div className="flex flex-col gap-6">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, transition: { duration: 0.4, ease: "easeOut" } }}
                        transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
                        className="
                            text-[length:var(--text-heading)]
                            font-bold tracking-[-0.08em] leading-none
                        "
                    >
                        Let's get <span className="text-[var(--color-yellow)]">in touch.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, transition: { duration: 0.4, ease: "easeOut" } }}
                        transition={{ duration: 0.4, ease: "easeOut", delay: 0.5 }}
                        className="text-[length:var(--text-body)] font-medium max-w-[45ch]"
                    >
                        If you need a steady design hand, a front-end build, or a teammate who cares about the details, send a note and I'll get back to you.
                    </motion.p>

                    {/* Info blocks */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, transition: { duration: 0.4, ease: "easeOut" } }}
                        transition={{ duration: 0.4, ease: "easeOut", delay: 0.8 }}
                        className="border-t border-[var(--color-blackish)]/20"
                    >
                        {[
                            { label: "Name",     value: <span>Bruno Shimabukuro</span> },
                            { label: "Email",    value: <span className="flex items-center gap-2">designedbybru@gmail.com<button onClick={copyEmail} className="opacity-40 hover:opacity-100 transition-opacity duration-200 cursor-pointer">{copied ? <FiCheck className="w-4 h-4 text-[var(--color-yellow)]" /> : <FiCopy className="w-4 h-4" />}</button></span> },
                            { label: "Location", value: <span>Currently in: <span className="text-[var(--color-yellow)]">Vancouver, BC</span></span> },
                        ].map((item) => (
                            <div key={item.label} className="border-b border-[var(--color-blackish)]/20 py-4 flex flex-col gap-1">
                                <p className="text-[length:var(--text-body2)] font-medium opacity-40">{item.label}</p>
                                <p className="text-[length:var(--text-body)] font-medium">{item.value}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* ── Right: form ──────────────────────────────────────────── */}
                <div className="self-stretch flex flex-col pt-[calc(clamp(4rem,6vw,6.25rem)+1.5rem)] max-w-[480px] mx-auto w-full">
                    {status === "success" ? (
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-[length:var(--text-body)] font-medium"
                        >
                            Message sent! I'll get back to you soon.
                        </motion.p>
                    ) : (
                        <motion.form
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20, transition: { duration: 0.4, ease: "easeOut" } }}
                            transition={{ duration: 0.4, ease: "easeOut", delay: 1.2 }}
                            className="flex flex-col gap-3 flex-1"
                            onSubmit={handleSubmit}
                        >
                            <div className="grid grid-cols-2 gap-3">
                                <div className="grid gap-2">
                                    <label htmlFor="firstName" className={LABEL_CLASS}>First Name</label>
                                    <input required id="firstName" name="firstName" type="text" autoComplete="given-name" className={INPUT_CLASS} />
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="lastName" className={LABEL_CLASS}>Last Name</label>
                                    <input required id="lastName" name="lastName" type="text" autoComplete="family-name" className={INPUT_CLASS} />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <label htmlFor="email" className={LABEL_CLASS}>Email</label>
                                <input required id="email" name="email" type="email" autoComplete="email" className={INPUT_CLASS} />
                            </div>

                            <div className="flex flex-col flex-1 gap-2">
                                <label htmlFor="message" className={LABEL_CLASS}>Message</label>
                                <textarea required id="message" name="message" className="flex-1 w-full rounded-md border-2 border-[var(--color-blackish)] bg-transparent px-3 py-2 resize-none [font-family:var(--font-main)] text-[length:var(--text-body2)] text-[var(--color-blackish)] opacity-70 outline-none" />
                            </div>

                            {status === "error" && (
                                <p className={`${LABEL_CLASS} opacity-70`}>
                                    Something went wrong. Please try again.
                                </p>
                            )}

                            <Button type="submit" disabled={status === "submitting"}>
                                {status === "submitting" ? "SENDING..." : "SUBMIT"}
                            </Button>
                        </motion.form>
                    )}
                </div>
            </div>
        </main>
    );
}
