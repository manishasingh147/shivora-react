const values = [
  { title: 'Careful diagnosis', desc: 'Evidence-based protocols and unhurried clinical review at every consultation.' },
  { title: 'Care within reach', desc: "The best doctors and facilities, at a cost within everyone's reach." },
  { title: 'No need to travel', desc: "Comprehensive care in Jharkhand, so patients don't have to leave the state for it." },
]

const gallery = [
  { image: '/images/OPD.jpeg', alt: 'Consultation room' },
  { image: '/images/78c91ade-8069-49c8-a4f3-88ad70d354f8.webp', alt: 'Reception / waiting area' },
  { image: '/images/Lab.jpeg', alt: 'Shivora Lab' },
  { image: '/images/Pharma.jpeg', alt: 'Pharmacy counter' },
]

export function About() {
  return (
    <main className="about-page">
      <section className="ab-hero">
        <p className="ab-eyebrow">ABOUT US</p>
        <h1>Doctors from Jharkhand, building healthcare for Jharkhand</h1>
      </section>

      <section className="ab-story">
        <blockquote className="ab-quote">
          <p>“I grew up in Jharkhand and this land made me who I am. After IIT Kanpur, I spent years working across major cities in India and abroad, witnessing world-class healthcare up close. But it was during Covid that the reality hit hardest. I watched people in Jharkhand struggle, travelling for hours, spending their life savings, just to access basic quality care.</p>
          <p>That moment of reckoning became Shivora's founding purpose: to bring the best doctors, finest facilities, and genuine compassion to the people of this land at a cost within everyone's reach.</p>
          <p className="ab-quote-last">Shivora is my way of giving back. And our vision is to build it into Jharkhand's most trusted healthcare chain where quality healthcare is not a privilege, but a promise.”</p>
          <div className="ab-author">— Saurav Singh</div>
          <div className="ab-author-role">Founder, Shivora Healthcare · Alumnus, IIT Kanpur</div>
        </blockquote>
      </section>

      <section className="ab-values">
        <div className="ab-wrap ab-values-inner">
          <h2 className="ab-h2">What we stand for</h2>
          <div className="ab-values-grid">
            {values.map((v) => (
              <div className="ab-value" key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ab-wrap ab-gallery">
        <h2 className="ab-h2">Inside Shivora</h2>
        <div className="ab-gallery-grid">
          {gallery.map((g) => (
            <div className="ab-gallery-item" key={g.alt}><img src={g.image} alt={g.alt} /></div>
          ))}
        </div>
      </section>
    </main>
  )
}
