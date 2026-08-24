type HomeProps = { onBook: () => void; onNavigate: (page: 'services' | 'women-child') => void }

export function Home({ onBook, onNavigate }: HomeProps) {
  return (
    <main>
      <section className="hero page-section">
        <div className="hero-copy reveal">
          <p className="eyebrow">Comprehensive healthcare for women and child</p>
          <h1>Jharkhand's most complete polyclinic for women and child care.</h1>
          <p className="lede">Led by <b>Dr. Apeksha Sahu</b>, one of the region's most respected gynaecologists, Shivora sets a new standard in women's and children's healthcare in Ranchi, backed by senior specialists and our own lab, ultrasound and pharmacy under one roof.</p>
          <div className="actions"><button className="button" onClick={onBook}>Book an appointment</button><button className="text-button" onClick={() => onNavigate('women-child')}>Explore women & child care <span>↗</span></button></div>
        </div>
        <div className="hero-art reveal delay-one"><img src="/images/78c91ade-8069-49c8-a4f3-88ad70d354f8.webp" alt="Shivora Healthcare reception" /><span className="art-note">Care that knows you</span></div>
      </section>
      <section className="trust-band"><div><strong>01</strong><h3>Senior specialists</h3><p>Experienced consultants who listen before they treat.</p></div><div><strong>02</strong><h3>Everything in one place</h3><p>Consult, test, scan and collect medicines in one visit.</p></div><div><strong>03</strong><h3>Made for Jharkhand</h3><p>World-class care, close to home and within reach.</p></div></section>
      <section className="focus-section page-section"><div className="focus-image"><img src="/images/a014a6aa-2c1e-4253-b261-f28bc1f7451d.webp" alt="Dr. Apeksha Sahu with a newborn" /></div><div><p className="eyebrow">Our focus</p><h2>Comprehensive care for women, and their children</h2><p>From adolescence through menopause, and from a newborn's first check-up through childhood, Shivora is built around the two people who need coordinated, unhurried care the most.</p><p>Led by Dr. Apeksha Sahu, our women's health programme covers infertility, high-risk pregnancy, laparoscopic surgery and hormonal care, alongside dedicated paediatric consultations for your child.</p><button className="text-button" onClick={() => onNavigate('women-child')}>Explore Women & Child Care <span>↗</span></button></div></section>
    </main>
  )
}
