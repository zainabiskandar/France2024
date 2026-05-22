import { useState, FormEvent } from "react";
import { toast } from "sonner";

const RECIPIENT = "zainab.iwr@gmail.com";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (name.length > 100 || email.length > 255 || message.length > 2000) {
      toast.error("Please shorten your message.");
      return;
    }

    const subject = `Portfolio contact from ${name}`;
    const body = `${message}\n\n— ${name}\n${email}`;
    const mailto = `mailto:${RECIPIENT}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setSubmitted(true);
    toast.success("Opening your email app…");
  };

  return (
    <section
      id="contact"
      className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16"
      aria-labelledby="contact-heading"
    >
      <h2
        id="contact-heading"
        className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2"
      >
        Get in touch
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        Questions, prints, or a quiet hello — send a note.
      </p>

      {submitted ? (
        <div
          role="status"
          className="rounded-md border border-border bg-card p-6 text-center"
        >
          <p className="font-medium">Thank you, {name.split(" ")[0]}.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Your email app should have opened with your message ready to send.
            If nothing happened, you can email me directly at{" "}
            <a
              className="underline underline-offset-2"
              href={`mailto:${RECIPIENT}`}
            >
              {RECIPIENT}
            </a>
            .
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setName("");
              setEmail("");
              setMessage("");
            }}
            className="mt-4 text-sm underline underline-offset-2 text-muted-foreground hover:text-foreground"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="cf-name" className="block text-sm mb-1">
              Name
            </label>
            <input
              id="cf-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label htmlFor="cf-email" className="block text-sm mb-1">
              Email
            </label>
            <input
              id="cf-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={255}
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label htmlFor="cf-message" className="block text-sm mb-1">
              Message
            </label>
            <textarea
              id="cf-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={2000}
              rows={5}
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Send message
          </button>
        </form>
      )}
    </section>
  );
}
