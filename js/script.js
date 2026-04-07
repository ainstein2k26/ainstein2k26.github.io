

// ── SPOTLIGHT (hex bg) ──
const spotlight = document.getElementById('hex-spotlight');
const RADIUS = 150;

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let currentX = mouseX;
let currentY = mouseY;
let active = false;

function lerp(a, b, t) { return a + (b - a) * t; }

function animateSpotlight() {
  currentX = lerp(currentX, mouseX, 0.12);
  currentY = lerp(currentY, mouseY, 0.12);
  if (spotlight) {
    spotlight.style.webkitMaskImage =
      `radial-gradient(circle ${RADIUS}px at ${currentX}px ${currentY}px, black 20%, transparent 80%)`;
    spotlight.style.maskImage =
      `radial-gradient(circle ${RADIUS}px at ${currentX}px ${currentY}px, black 20%, transparent 80%)`;
  }
  requestAnimationFrame(animateSpotlight);
}

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (!active && spotlight) {
    spotlight.classList.add('active');
    active = true;
  }
});

document.addEventListener('mouseleave', () => {
  if (spotlight) { spotlight.classList.remove('active'); active = false; }
});

animateSpotlight();

// ── NAVBAR ──
const navbar = document.getElementById('navbar');
if (navbar) {
  const hero = document.querySelector('.hero');
  if (hero) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        navbar.classList.toggle('visible', !entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(hero);
  } else {
    navbar.classList.add('visible');
  }
}

// ── SCROLL PROGRESS ──
const scrollProgress = document.getElementById('scroll-progress');
if (scrollProgress) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.style.height = docHeight > 0
      ? `${(scrollTop / docHeight) * 100}%` : '0%';
  }, { passive: true });
}

// ── CARD DRAWER TOGGLE ──
document.querySelectorAll('.card-expand-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.event-card');
    const isOpen = card.classList.contains('is-open');
    document.querySelectorAll('.event-card.is-open').forEach(c => {
      if (c !== card) c.classList.remove('is-open');
    });
    card.classList.toggle('is-open', !isOpen);
  });
});

// ── EVENT MODAL DATA ──
const eventData = {
  'survival-pitch': {
    tag: 'Technical Event',
    title: 'Survival Pitch',
    aka: 'aka Shipwreck',
    fee: '₹200 / head',
    prize: { first: '₹1,000', second: '₹750', type: 'Individual' },
    meta: [
      { label: 'Timing', value: '12:30 – 1:30' },
      { label: 'Venue', value: 'CSE SmartRoom' },
      { label: 'Format', value: 'Individual' },
    ],
    about: 'Participants imagine they are on a sinking ship with limited lifeboats. Each person represents a famous personality, fictional character, or profession and must argue why they deserve to survive. The last remaining participant(s) after eliminations win.',
    rules: [
      'Each participant is assigned or chooses a role/character',
      'Participants argue, interrupt, defend, and challenge others',
      'No offensive, abusive, or inappropriate language',
      'Stay in character throughout the round',
      'No physical aggression or personal attacks',
      'Time limits must be strictly followed',
      'Judges\' decisions are final',
    ],
    judging: 'Final decision by judges based on persuasion, logic, and performance',
  },
  'ai-sprint': {
    tag: 'Technical Event',
    title: 'AI Sprint',
    aka: 'aka AI-Hackathon',
    fee: '₹200 / head',
    prize: { first: '₹1,500', second: '₹1,000', type: 'Group' },
    meta: [
      { label: 'Timing', value: '12:30 – 1:30' },
      { label: 'Venue', value: 'CSE Lab' },
      { label: 'Team Size', value: '2–4 members' },
    ],
    about: 'Teams build a quick AI-based solution or prototype for a given problem within limited time. The problem statement is given on the spot. Participants are encouraged to leverage AI tools creatively to craft original, relevant solutions.',
    rules: [
      'Problem statement will be given on the spot',
      'AI tools (ChatGPT, Copilot, etc.) are allowed',
      'Solutions must be original and relevant to the problem',
      'Teams must clearly explain their approach and AI tool usage',
      'Pre-built project code cannot be used',
      'Final output can be a prototype, demo, or well-defined concept',
      'Each team will present within the allotted time',
    ],
    judging: 'Evaluated on creativity, implementation, clarity, and effective use of AI',
  },
  'brain-battle': {
    tag: 'Technical Event',
    title: 'Brain Battle',
    aka: 'aka Quiz',
    fee: '₹200 / head',
    prize: { first: '₹1,500', second: '₹1,000', type: 'Group' },
    meta: [
      { label: 'Timing', value: '11:30 – 12:30' },
      { label: 'Venue', value: 'CSE SmartRoom' },
      { label: 'Team Size', value: '2–3 members' },
    ],
    about: 'A multi-round quiz competition testing technical and general knowledge. Teams battle through an MCQ elimination round, a rapid fire round, and a high-stakes buzzer final.',
    rules: [
      'Round 1 (Preliminary): 15–20 MCQs · +1 per correct answer · Top 4–5 qualify',
      'Round 2 (Rapid Fire): 1–2 min per team · No passing · +2 correct · 0 wrong',
      'Round 3 (Buzzer Final): Open questions · +5 correct · -2 wrong · passes to others',
      'No mobile phones or external help allowed',
      'Answer within given time (usually 5–10 seconds)',
      'Quizmaster\'s decision is final',
      'Tie-breaker question in case of a tie',
    ],
    judging: 'Team with highest total score after all rounds wins',
  },
  'tech-treadmill': {
    tag: 'Technical Event',
    title: 'Tech Treadmill',
    aka: 'aka Tech Talk / JAM',
    fee: '₹200 / head',
    prize: { first: '₹1,000', second: '₹750', type: 'Individual' },
    meta: [
      { label: 'Timing', value: '11:30 – 12:30' },
      { label: 'Venue', value: 'CSE Classroom (I301)' },
      { label: 'Format', value: 'Individual · Open to all depts' },
    ],
    about: 'Participants speak on a technical topic for a limited time without hesitation, repetition, or deviation. The event tests spontaneity, subject knowledge, and communication under pressure across three progressive rounds.',
    rules: [
      'Round 1 (JAM): 1 minute · No hesitation, repetition, or deviation · Judges select top 6–8',
      'Round 2 (Tech Talk): 2–3 minutes · Detailed technical explanation · Top 3–4 to finals',
      'Round 3 (Surprise JAM): Instant random topic · 1 minute · Tests spontaneity',
      'No grammatical mistakes (minor mistakes allowed)',
      'Maximum 15–25 participants',
    ],
    judging: 'Fluency, subject knowledge, spontaneity, relevance, confidence & body language',
  },
  'game-clash': {
    tag: 'Non-Technical Event',
    title: 'Game Clash',
    aka: 'aka Esports',
    fee: '₹200 / head',
    prize: { first: '₹1,500', second: '₹1,000', type: 'Group' },
    meta: [
      { label: 'Timing', value: '11:30 – 2:30' },
      { label: 'Venue', value: 'CSE Lab' },
      { label: 'Format', value: 'Knockout Tournament' },
    ],
    about: 'Teams compete in selected esports titles in a knockout format. Two games are featured: eFootball and BGMI. Each match follows strict game-specific rules to ensure fair and competitive play.',
    rules: [
      'eFootball: Knockout tournament · Match time 12 mins · Extra time ON · Penalty ON',
      'eFootball: No over back pass · No time wasting (results in loss)',
      'BGMI: TDM 4v4 · TPP mode · Elimination round format',
      "FREE FIRE: Shouldn't use Grenade",
      'Fair play is mandatory — no cheating of any kind',
      'Game-specific rules will be strictly followed',
    ],
    judging: 'Final decision by MC based on match results',
  },
  'adzap': {
    tag: 'Non-Technical Event',
    title: 'Adzap',
    aka: 'aka Ad Making Competition',
    fee: '₹200 / head',
    prize: { first: '₹1,500', second: '₹1,000', type: 'Group' },
    meta: [
      { label: 'Timing', value: '1:30 – 2:00' },
      { label: 'Venue', value: 'Hilltop' },
      { label: 'Team Size', value: '2–5 members' },
    ],
    about: 'Teams craft and perform a live creative advertisement on a topic selected on the spot. With just a few minutes to prepare and perform, Adzap tests creativity, quick thinking, humor, and teamwork — all packed into a 3–5 minute act.',
    rules: [
      'Each team must consist of 2 to 5 members',
      'Every team will be given 3 to 5 minutes to perform',
      'Topics shared in advance — final topic selected on the spot from the list',
      'Performance must be presented as a creative advertisement',
      'Simple props are encouraged to enhance the act',
      'No vulgar, offensive, political, or religious content',
      'Copying existing advertisements is strictly prohibited',
      'All teams must report on time',
      'Any misbehavior or rule violation leads to disqualification',
    ],
    judging: 'Creativity & originality, humor and entertainment value, presentation and teamwork',
  },
  'vocal-pulse': {
    tag: 'Non-Technical Event',
    title: 'Vocal Pulse',
    aka: 'aka Singing',
    fee: '₹200 / head',
    prize: { first: '₹1,000', second: '₹750', type: 'Solo/Group' },
    meta: [
      { label: 'Timing', value: '11:30 – 12:30' },
      { label: 'Venue', value: 'Hilltop' },
      { label: 'Team Size', value: 'Solo or Group (2–6)' },
    ],
    about: 'Participants perform songs showcasing vocal skill, expression, and stage presence. The event is open to solo singers and groups performing in Tamil, English, or Malayalam.',
    rules: [
      'Each performance should be 3–5 minutes',
      'Allowed languages: Tamil, English, or Malayalam',
      'Songs must be appropriate — no offensive lyrics',
      'Participants must bring their own karaoke track (USB / phone)',
      'Minimal live instruments allowed',
    ],
    judging: 'Voice quality, pitch & rhythm, expression, and stage presence',
  },
  'beat-theory': {
    tag: 'Non-Technical Event',
    title: 'Beat Theory',
    aka: 'aka Dance',
    fee: '₹200 / head',
    prize: { first: '₹1,500', second: '₹1,000', type: 'Group' },
    meta: [
      { label: 'Timing', value: '3:00 – 4:00' },
      { label: 'Venue', value: 'Hilltop' },
      { label: 'Team Size', value: 'Solo or Group (up to 6)' },
    ],
    about: 'Teams or individuals perform choreographed routines based on rhythm and creativity. The event is a celebration of movement, expression, and musical interpretation across all dance styles.',
    rules: [
      'Performance duration: 4–6 minutes',
      'Props allowed if safe and manageable',
      'Performance should match music and theme',
      'All dance styles welcome',
    ],
    judging: 'Choreography, energy, synchronisation, and stage presence',
  },
};

// ── MODAL LOGIC ──
const modalOverlay = document.getElementById('event-modal');
const modalClose   = document.getElementById('modal-close');

function openModal(eventKey) {
  const d = eventData[eventKey];
  if (!d || !modalOverlay) return;

  document.getElementById('modal-tag').textContent   = d.tag;
  document.getElementById('modal-title').textContent = d.title;
  document.getElementById('modal-aka').textContent   = d.aka;
  document.getElementById('modal-fee').textContent   = d.fee;

  // Meta row
  const metaEl = document.getElementById('modal-meta');
  metaEl.innerHTML = d.meta.map(m => `
    <div class="modal-meta-item">
      <span class="modal-meta-label">${m.label}</span>
      <span class="modal-meta-value">${m.value}</span>
    </div>
  `).join('');

  // Body
  const bodyEl = document.getElementById('modal-body');
  bodyEl.innerHTML = `
  <div class="modal-section">
    <p class="modal-section-label">About</p>
    <p class="modal-section-text">${d.about}</p>
  </div>
  <div class="modal-section">
    <p class="modal-section-label">Rules</p>
    <ul class="modal-rules">
      ${d.rules.map(r => `<li>${r}</li>`).join('')}
    </ul>
  </div>
  <div class="modal-section">
    <p class="modal-section-label">Judging</p>
    <p class="modal-section-text">${d.judging}</p>
  </div>
  <div class="modal-prize-row">
    <div class="modal-prize-item gold">
      <span class="modal-prize-label">🥇 1st Prize</span>
      <span class="modal-prize-amount">${d.prize.first}</span>
    </div>
    <div class="modal-prize-item silver">
      <span class="modal-prize-label">🥈 2nd Prize</span>
      <span class="modal-prize-amount">${d.prize.second}</span>
    </div>
  </div>
`;

  modalOverlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modalOverlay) return;
  modalOverlay.classList.remove('is-open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.card-details-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    openModal(btn.dataset.event);
  });
});

if (modalClose) modalClose.addEventListener('click', closeModal);

if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
