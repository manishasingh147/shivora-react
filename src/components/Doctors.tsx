const doctors = [
  {
    name: 'Dr. Apeksha Sahu', role: 'Obstetrician & Gynaecologist',
    specialtyTag: 'OBSTETRICS & GYNAECOLOGY',
    rating: '4.9', reviewCount: '120+', stars: '★★★★★',
    bio: "Dr. Apeksha Sahu leads Shivora's women's health programme, specialising in infertility management, laparoscopic surgery and high-risk pregnancy care, with a philosophy of unhurried, evidence-based consultations.",
    education: ['MBBS (Gold Medalist)', 'MS — Obstetrics & Gynaecology', 'FRM — Fellowship in Reproductive Medicine', 'FMAS — Fellow of Minimal Access Surgery'],
    specializations: ['Infertility & PCOS', 'High-Risk Pregnancy', 'Laparoscopic Surgery', 'Antenatal & Postnatal Care', 'Hormonal Disorders'],
    experience: [
      { role: 'Consultant Obstetrician & Gynaecologist, Shivora Healthcare', period: 'Present' },
      { role: 'Clinical training in Obstetrics, Gynaecology & Reproductive Medicine', period: 'Prior to founding Shivora' },
    ],
    awards: ['Gold Medalist, MBBS'],
    publications: 'Details available on request.',
    opdDays: 'Monday – Saturday',
    opdTime: '10:00 am – 2:00 pm, 5:00 – 8:00 pm',
  },
  {
    name: 'Dr. Rishi Raj', role: 'Orthopaedic Surgeon',
    specialtyTag: 'ORTHOPAEDICS',
    rating: '4.8', reviewCount: '90+', stars: '★★★★★',
    bio: 'Dr. Rishi Raj provides orthopaedic consultations across joint, bone, trauma and sports medicine care, bringing tertiary-care training to Shivora patients.',
    education: ['MBBS (Gold Medalist)', 'MS — Orthopaedics'],
    specializations: ['Joint Replacement', 'Sports Medicine', 'Trauma & Fracture Care', 'Bone & Joint Disorders'],
    experience: [
      { role: 'Consultant Orthopaedic Surgeon, Shivora Healthcare', period: 'Present' },
      { role: 'Senior Resident, AIIMS New Delhi', period: 'Prior to founding Shivora' },
    ],
    awards: ['Gold Medalist, MBBS'],
    publications: 'Details available on request.',
    opdDays: 'Monday – Saturday',
    opdTime: '11:00 am – 2:00 pm, 6:00 – 8:00 pm',
  },
]

export function Doctors() {
  return (
    <main className="doctors-page">
      <section className="doc-hero">
        <p className="doc-hero-eyebrow">OUR SPECIALISTS</p>
        <h1>Personally invested in your care</h1>
      </section>

      <div className="doc-list">
        {doctors.map((doc, index) => (
          <article key={doc.name}>
            <div className={`doc-row ${index % 2 ? 'reverse' : ''}`}>
              <div className="doc-portrait-col">
                <div className="doc-portrait"><span>Doctor portrait</span></div>
              </div>
              <div className="doc-copy">
                <p className="doc-tag">{doc.specialtyTag}</p>
                <h2 className="doc-name">{doc.name}</h2>
                <p className="doc-role">{doc.role}</p>
                <div className="doc-rating">
                  <span className="doc-stars">{doc.stars}</span>
                  <span className="doc-score">{doc.rating}</span>
                  <span className="doc-reviews">({doc.reviewCount} patient reviews)</span>
                </div>
                <p className="doc-bio">{doc.bio}</p>

                <div className="doc-two-col">
                  <div>
                    <p className="doc-label">EDUCATION</p>
                    <div className="doc-stack">
                      {doc.education.map((e) => <div className="doc-text" key={e}>{e}</div>)}
                    </div>
                  </div>
                  <div>
                    <p className="doc-label">EXPERIENCE</p>
                    <div className="doc-stack doc-stack-lg">
                      {doc.experience.map((ex) => (
                        <div key={ex.role}>
                          <div className="doc-exp-role">{ex.role}</div>
                          <div className="doc-exp-period">{ex.period}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="doc-meta">
                  <div>
                    <p className="doc-label doc-label-sm">AWARDS</p>
                    <div className="doc-stack doc-stack-sm">
                      {doc.awards.map((aw) => <div className="doc-text" key={aw}>{aw}</div>)}
                    </div>
                  </div>
                  <div>
                    <p className="doc-label doc-label-sm">PUBLICATIONS</p>
                    <div className="doc-text">{doc.publications}</div>
                  </div>
                  <div>
                    <p className="doc-label doc-label-sm">OPD DAYS &amp; TIME</p>
                    <div className="doc-text">{doc.opdDays}</div>
                    <div className="doc-text">{doc.opdTime}</div>
                  </div>
                </div>

              </div>
            </div>
            <div className="doc-expertise">
              <p className="doc-label">AREAS OF EXPERTISE</p>
              <div className="doc-chips">
                {doc.specializations.map((sp) => <span key={sp}>{sp}</span>)}
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="doc-footnote">Consultants across Paediatrics and Geriatric Medicine are also available — ask our care team for the current schedule.</p>
    </main>
  )
}
