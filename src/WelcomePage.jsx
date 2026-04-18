function WelcomePage({ username, onLogout }) {
  const sections = [
    {
      title: 'Program Catalog',
      description: 'Explore backend and full-stack skills with symbols, frameworks, and languages.',
      items: [
        { label: 'Java', icon: '☕' },
        { label: 'Python', icon: '🐍' },
        { label: 'Node.js', icon: '🟢' },
        { label: '.NET', icon: '🔷' },
      ],
    },
    {
      title: 'Cloud & Platform',
      description: 'Scroll through cloud ecosystems for modern architecture and deployment.',
      items: [
        { label: 'AWS', icon: '☁️' },
        { label: 'Azure', icon: '🔷' },
        { label: 'GCP', icon: '🔶' },
        { label: 'Alibaba', icon: '🧧' },
        { label: 'Oracle', icon: '🗄️' },
      ],
    },
    {
      title: 'Scripting & DevOps',
      description: 'Automation, tooling, and scripting languages for cloud-native workflows.',
      items: [
        { label: 'Shell', icon: '🐚' },
        { label: 'Ruby', icon: '💎' },
        { label: 'Go', icon: '🐹' },
      ],
    },
  ];

  return (
    <div className="welcome-shell">
      <div className="welcome-hero">
        <div>
          <span className="hero-kicker">Welcome back</span>
          <h1>Welcome, aatechies</h1>
          <p className="hero-copy">
            Your sample portal is ready. Explore the catalog of programming languages, cloud providers, and scripting tools.
          </p>
        </div>
        <button type="button" className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="welcome-card">
        <div className="welcome-badge">AA Cloudtechies</div>
        <p className="welcome-note">
          Dream jobs start here. Scroll through backend, cloud, and scripting symbols built for modern learning.
        </p>
      </div>

      {sections.map((section) => (
        <section key={section.title} className="section">
          <div className="section-heading">
            <h2>{section.title}</h2>
            <p>{section.description}</p>
          </div>
          <div className="section-grid">
            {section.items.map((item) => (
              <div key={item.label} className="catalog-card">
                <span className="catalog-icon">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="cloud-banner">
        <div>
          <strong>Cloud mastery starts here:</strong>
          <p>Learn AWS, Azure, GCP, Alibaba, Oracle, and more with curated developer pathways.</p>
        </div>
        <div className="cloud-pill-grid">
          {['AWS', 'Azure', 'GCP', 'Alibaba', 'Oracle'].map((name) => (
            <span key={name} className="cloud-pill">{name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
