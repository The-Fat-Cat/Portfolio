import type { SectionData } from "../../types";

interface SectionProps {
  data: SectionData;
}

export function Section({ data }: SectionProps) {
  const isContact = data.id === "section-contact";

  return (
    <section className="scroll-section" id={data.id}>
      <div className="section-bg-title">{data.bgTitle}</div>
      <div className={`section-content${isContact ? " contact-content" : ""}`}>
        <div className="section-badge">{data.badge}</div>
        <h2 className="section-title">{data.title}</h2>

        {data.bullets && data.bullets.length > 0 && (
          <div className="section-bullets">
            {data.bullets.map((b) => (
              <div key={b.number} className="bullet-item">
                <span className="bullet-number">{b.number}</span> {b.text}
              </div>
            ))}
          </div>
        )}

        {data.description && !isContact && (
          <p className="section-description">{data.description}</p>
        )}

        {isContact && data.formFields && (
          <div className="contact-grid">
            <form
              className="contact-form"
              id="contact-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Message sent! Thanks for reaching out.");
              }}
            >
              {data.formFields.map((field) => (
                <div key={field.id} className="form-group">
                  <label htmlFor={field.id}>{field.label}</label>
                  {field.type === "textarea" ? (
                    <textarea id={field.id} rows={3} placeholder={field.placeholder} required />
                  ) : (
                    <input type={field.type} id={field.id} placeholder={field.placeholder} required />
                  )}
                </div>
              ))}
              <button type="submit" className="btn-submit" id="btn-submit">
                <span>Send Message</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>

            {data.socialLinks && (
              <div className="contact-links">
                {data.description && <p className="contact-lead">{data.description}</p>}
                <div className="social-list">
                  {data.socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      className={`social-item${link.highlight ? " highlight" : ""}`}
                    >
                      {link.label} <span className="arrow">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
