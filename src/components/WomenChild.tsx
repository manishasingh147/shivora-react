import { useState } from 'react'
import { lifeStages } from './lifeStages'

const childCare = [
  { title: 'Newborn check-ups', desc: 'From the first days home' },
  { title: 'Vaccination schedules', desc: 'Age-appropriate immunisation' },
  { title: 'Growth monitoring', desc: 'Tracking healthy development' },
  { title: 'Childhood illness care', desc: 'Consultations when your child is unwell' },
]

const facilities = [
  { title: 'Shivora OPD', desc: 'Private rooms for unhurried consultations.', tint: 'var(--sage)', image: '/images/OPD.jpeg' },
  { title: 'Shivora Lab', desc: 'For all blood tests, most reports same day.', tint: '#E8C86A', image: '/images/Lab.jpeg' },
  { title: 'Shivora Scan', desc: 'On-site imaging, read the same visit.', tint: '#A9C4E0', image: '/images/Scan.jpeg' },
  { title: 'Shivora Pharma', desc: 'Fill your prescription on the way out.', tint: '#E0A98D', image: '/images/Pharma.jpeg' },
]

const apekshaTags = ['Infertility & PCOS', 'High-Risk Pregnancy', 'Laparoscopic Surgery', 'Adolescent & Menopausal Care']

export function WomenChild() {
  const [activeStage, setActiveStage] = useState(lifeStages[0].id)
  const currentStage = lifeStages.find((s) => s.id === activeStage) ?? lifeStages[0]

  return (
    <main className="wc-page">
      {/* hero */}
      <section className="wc-wrap wc-hero">
        <div>
          <p className="wc-eyebrow wc-eyebrow-hero">WOMEN &amp; CHILD CARE</p>
          <h1 className="wc-hero-title">Our reason for being.</h1>
          <p className="wc-hero-body">A woman's health needs change through every stage of life — from her first period, to motherhood, to the years beyond menopause. Shivora is built around that continuity.</p>
          <p className="wc-hero-body wc-last">Dr. Apeksha Sahu, a gynaecologist known across the region for her work in infertility, laparoscopy and high-risk pregnancy, leads a full programme of women's healthcare — alongside dedicated paediatric consultations for your child.</p>
        </div>
        <div className="wc-hero-img">
          <img src="/images/a014a6aa-2c1e-4253-b261-f28bc1f7451d.webp" alt="Dr. Apeksha Sahu consulting a patient" />
        </div>
      </section>

      {/* women's health by life stage */}
      <section className="wc-stages">
        <div className="wc-wrap wc-stages-inner">
          <div className="wc-stages-head">
            <p className="wc-eyebrow">WOMEN'S HEALTH ACROSS THE AGES</p>
            <h2 className="wc-h2">Every stage of life brings different questions</h2>
            <p className="wc-stages-intro">A woman's health needs change from her first period to motherhood and the years beyond menopause. Choose a stage to see the concerns we see most often, and how they are usually treated at Shivora.</p>
          </div>

          <div className="wc-tabs" role="tablist">
            {lifeStages.map((s) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={s.id === activeStage}
                className={`wc-tab ${s.id === activeStage ? 'active' : ''}`}
                onClick={() => setActiveStage(s.id)}
              >
                <div className="wc-tab-label">{s.label}</div>
                <div className="wc-tab-age">{s.age}</div>
              </button>
            ))}
          </div>

          <div className="wc-panel">
            <p className="wc-panel-age">{currentStage.age}</p>
            <h3 className="wc-panel-title">{currentStage.title}</h3>
            <p className="wc-panel-intro">{currentStage.intro}</p>
            <div className="wc-issue-grid">
              {currentStage.items.map((it) => (
                <div className="wc-issue" key={it.name}>
                  <div className="wc-issue-name">{it.name}</div>
                  <div className="wc-issue-label">COMMON SIGNS</div>
                  <div className="wc-issue-text wc-issue-signs">{it.signs}</div>
                  <div className="wc-issue-label wc-issue-label-care">HOW WE CARE FOR IT</div>
                  <div className="wc-issue-text">{it.care}</div>
                </div>
              ))}
            </div>
          </div>

          <p className="wc-disclaimer">This guide is for general awareness and does not replace medical consultation, diagnosis or treatment. Every individual's situation is different — please consult a qualified doctor at Shivora for any personal health concern.</p>
        </div>
      </section>

      {/* dr apeksha spotlight */}
      <section className="wc-wrap wc-spotlight">
        <div className="wc-placeholder wc-spotlight-img"><span>Dr. Apeksha Sahu portrait</span></div>
        <div>
          <p className="wc-eyebrow">MEET YOUR SPECIALIST</p>
          <h2 className="wc-spot-name">Dr. Apeksha Sahu</h2>
          <p className="wc-spot-role">Obstetrician &amp; Gynaecologist — MBBS (Gold Medalist), MS (OBG), FRM, FMAS</p>
          <p className="wc-spot-body">A gold medalist through her medical training, Dr. Apeksha specialises in infertility management, laparoscopic surgery and high-risk pregnancy care. Her fellowships in Reproductive Medicine (FRM) and Minimal Access Surgery (FMAS) mean fertility work-ups and keyhole gynaecological surgery are handled by the same doctor who sees you through pregnancy and after.</p>
          <p className="wc-spot-body wc-spot-body-last">She leads Shivora's women's health programme with a philosophy of unhurried, evidence-based consultations — the kind of attention that catches concerns early, at every stage of life.</p>
          <div className="wc-chips">
            {apekshaTags.map((t) => <span key={t}>{t}</span>)}
          </div>
        </div>
      </section>

      {/* child care */}
      <section className="wc-child">
        <div className="wc-wrap wc-child-inner">
          <div className="wc-child-head">
            <p className="wc-eyebrow wc-eyebrow-light">CHILD CARE</p>
            <h2 className="wc-h2-sm">Caring for your child, from the very start</h2>
          </div>
          <div className="wc-child-grid">
            {childCare.map((c) => (
              <div className="wc-child-card" key={c.title}>
                <div className="wc-child-title">{c.title}</div>
                <div className="wc-child-desc">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* facilities */}
      <section className="wc-wrap wc-facilities">
        <h2 className="wc-h2-sm wc-facilities-title">Our facilities</h2>
        <div className="wc-fac-grid">
          {facilities.map((f) => (
            <div className="wc-fac" key={f.title}>
              <div className="wc-fac-icon" style={{ background: f.tint }}><img src={f.image} alt="" /></div>
              <div className="wc-fac-title">{f.title}</div>
              <div className="wc-fac-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
