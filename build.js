#!/usr/bin/env node
// Build script: converts muscles_data.json to chunk5_data.js and combines all chunks into index.html

const fs = require('fs');
const path = require('path');

const dir = __dirname;

// --- Step 1: Generate chunk5_data.js from muscles_data.json ---
const raw = JSON.parse(fs.readFileSync(path.join(dir, 'muscles_data.json'), 'utf8'));

// Map group names from JSON to our app group IDs
const groupMap = {
  'Head and Neck Muscles': { id: 'head', name: 'Cap și Gât', icon: '🧠', color: '#9b59b6' },
  'Shoulder Muscles': { id: 'shoulder', name: 'Umeri', icon: '💪', color: '#3498db' },
  'Arm Muscles': { id: 'arm', name: 'Brațe', icon: '🦾', color: '#2ecc71' },
  'Chest Muscles': { id: 'chest', name: 'Piept', icon: '🫁', color: '#e74c3c' },
  'Back Muscles': { id: 'back', name: 'Spate', icon: '🔙', color: '#e67e22' },
  'Abdominal Muscles': { id: 'core', name: 'Abdomen și Core', icon: '🎯', color: '#f1c40f' },
  'Hip Muscles': { id: 'hip', name: 'Șold', icon: '🦴', color: '#1abc9c' },
  'Thigh Muscles': { id: 'thigh', name: 'Coapse', icon: '🦵', color: '#e74c3c' },
  'Lower Leg Muscles': { id: 'leg', name: 'Gambe', icon: '🦿', color: '#3498db' },
  'Foot Muscles': { id: 'foot', name: 'Picior', icon: '🦶', color: '#9b59b6' },
  'Deep Core and Stabilizer Muscles': { id: 'core', name: 'Abdomen și Core', icon: '🎯', color: '#f1c40f' },
  'Respiratory Muscles': { id: 'respiratory', name: 'Respiratori', icon: '🌬️', color: '#2ecc71' },
  'Pelvic Floor Muscles': { id: 'pelvic', name: 'Planșeu Pelvian', icon: '⚕️', color: '#e67e22' }
};

// Parse activity impact text to numeric 0-1
function parseActivity(text) {
  if (!text) return 0.05;
  const lower = text.toLowerCase();
  // Look for keywords
  if (lower.includes('no activation') || lower.includes('no direct') || lower.includes('minimal activation') || lower.includes('no significant')) return 0.03;
  if (lower.includes('very minimal') || lower.includes('negligible')) return 0.05;
  if (lower.includes('minimal') && !lower.includes('moderate')) return 0.08;
  if (lower.includes('slight') || lower.includes('minor')) return 0.1;
  if (lower.includes('low activation') || lower.includes('low-level')) return 0.15;
  if (lower.includes('light') || lower.includes('small')) return 0.2;
  if (lower.includes('moderate activation') || lower.includes('moderate engagement') || lower.includes('moderately activated') || lower.includes('moderate involvement')) return 0.45;
  if (lower.includes('moderate')) return 0.4;
  if (lower.includes('significant') || lower.includes('good activation') || lower.includes('well activated') || lower.includes('strong activation')) return 0.65;
  if (lower.includes('high activation') || lower.includes('heavily activated') || lower.includes('highly activated') || lower.includes('primary mover') || lower.includes('major activation')) return 0.8;
  if (lower.includes('very high') || lower.includes('maximum') || lower.includes('peak')) return 0.9;
  if (lower.includes('static') || lower.includes('isometric') || lower.includes('constant tension')) return 0.35;
  if (lower.includes('active') || lower.includes('engaged') || lower.includes('activated')) return 0.5;
  if (lower.includes('maintains') || lower.includes('preserved') || lower.includes('helps maintain')) return 0.5;
  if (lower.includes('shortened') || lower.includes('tightens') || lower.includes('overactive')) return 0.3;
  if (lower.includes('weakens') || lower.includes('inhibited') || lower.includes('atrophies')) return 0.05;
  return 0.15;
}

function parseDeskActivity(text) {
  if (!text) return 0.05;
  const lower = text.toLowerCase();
  if (lower.includes('typing') || lower.includes('mouse') || lower.includes('keyboard')) return 0.35;
  if (lower.includes('static tension') || lower.includes('constant tension') || lower.includes('isometric') || lower.includes('overactive') || lower.includes('chronically')) return 0.3;
  if (lower.includes('shortened') || lower.includes('tightens') || lower.includes('held in shortened')) return 0.25;
  if (lower.includes('minimal use') || lower.includes('no activation') || lower.includes('completely inactive') || lower.includes('no engagement') || lower.includes('inactive')) return 0.03;
  if (lower.includes('minimal') || lower.includes('very limited') || lower.includes('negligible')) return 0.05;
  if (lower.includes('some') || lower.includes('slight')) return 0.15;
  if (lower.includes('weakens') || lower.includes('atrophies') || lower.includes('inhibited') || lower.includes('deactivated')) return 0.04;
  return 0.08;
}

// Map atrophy rate
function mapAtrophyRate(rate) {
  if (!rate) return 'moderate';
  return rate.replace('_', '-');
}

// Estimate atrophy timeline from rate
function getTimeline(rate) {
  switch(rate) {
    case 'rapid': return { noticeable: 3, significant: 6, severe: 12 };
    case 'moderate': return { noticeable: 6, significant: 10, severe: 18 };
    case 'slow': return { noticeable: 10, significant: 16, severe: 26 };
    case 'very-slow': return { noticeable: 18, significant: 28, severe: 40 };
    default: return { noticeable: 6, significant: 10, severe: 18 };
  }
}

function getRecovery(difficulty) {
  switch(difficulty) {
    case 'easy': return { mild: '1-2 săpt.', moderate: '3-4 săpt.', severe: '1-2 luni' };
    case 'moderate': return { mild: '2-4 săpt.', moderate: '6-10 săpt.', severe: '3-4 luni' };
    case 'hard': return { mild: '4-6 săpt.', moderate: '8-14 săpt.', severe: '4-6 luni' };
    case 'very_hard': return { mild: '6-8 săpt.', moderate: '12-20 săpt.', severe: '6-12 luni' };
    default: return { mild: '2-4 săpt.', moderate: '6-12 săpt.', severe: '3-6 luni' };
  }
}

// Estimate desk risk from atrophy rate and desk impact
function getDeskRisk(muscle) {
  const rateRisks = { 'rapid': 0.85, 'moderate': 0.6, 'slow': 0.35, 'very_slow': 0.15 };
  let base = rateRisks[muscle.atrophy_rate] || 0.5;
  // Adjust based on desk impact text
  const desk = (muscle.activity_impact && muscle.activity_impact.desk_job_only) || '';
  const lower = desk.toLowerCase();
  if (lower.includes('completely') || lower.includes('severely') || lower.includes('major')) base = Math.min(base + 0.1, 0.95);
  if (lower.includes('overactive') || lower.includes('shortened')) base = Math.max(base, 0.65);
  if (lower.includes('minimal impact') || lower.includes('little impact')) base = Math.max(base - 0.15, 0.1);
  return Math.round(base * 100) / 100;
}

// Simple Romanian name generator (just use the latin-ish name if no clear Romanian)
function getRomanianName(latin) {
  // The JSON already has reasonable names we can use
  return latin;
}

// Common exercises map
const exerciseMap = {
  'head': ['Chin Tucks', 'Extensii cervicale', 'Stretching gât'],
  'shoulder': ['Ridicări laterale', 'Face Pulls', 'Band Pull-Aparts', 'Presă umeri'],
  'arm': ['Flexii biceps', 'Extensii triceps', 'Flexii încheietură'],
  'chest': ['Flotări', 'Presă piept', 'Stretching pectoral'],
  'back': ['Tracțiuni', 'Rowing', 'Superman', 'Bird Dog'],
  'core': ['Planșă', 'Dead Bug', 'Bicycle Crunch', 'Vacuum abdominal'],
  'hip': ['Glute Bridge', 'Hip Thrust', 'Clamshell', 'Fandări'],
  'thigh': ['Genuflexiuni', 'Fandări', 'Leg Press', 'Step-ups'],
  'leg': ['Ridicări pe vârfuri', 'Dorsiflexii', 'Mers pe vârfuri'],
  'foot': ['Toe curls', 'Mers desculț', 'Arch raises'],
  'respiratory': ['Respirație diafragmatică', 'Respirație 4-7-8'],
  'pelvic': ['Exerciții Kegel', 'Bridge cu activare pelvis']
};

const muscles = [];
const seenIds = new Set();

for (const group of raw.muscle_groups) {
  const gInfo = groupMap[group.group_name];
  if (!gInfo) continue;

  for (const m of group.muscles) {
    const rate = mapAtrophyRate(m.atrophy_rate);

    // Generate unique ID
    let baseId = m.latin_name.toLowerCase()
      .replace(/musculus /g, '')
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_|_$/g, '');
    if (seenIds.has(baseId)) baseId += '_' + gInfo.id;
    seenIds.add(baseId);

    const walkText = m.activity_impact ? m.activity_impact.walking_30min : '';
    const cycleText = m.activity_impact ? m.activity_impact.cycling_30min : '';
    const deskText = m.activity_impact ? m.activity_impact.desk_job_only : '';

    muscles.push({
      id: baseId,
      name: m.romanian_name || m.latin_name,
      latin: m.latin_name,
      group: gInfo.id,
      groupName: gInfo.name,
      location: guessLocation(m, gInfo.id),
      function: m.primary_function,
      atrophyRate: rate,
      strengthLossPerWeek: m.strength_loss_per_week_inactivity || 1.5,
      atrophyTimeline: getTimeline(rate),
      deskRisk: getDeskRisk(m),
      activities: {
        desk: parseDeskActivity(deskText),
        walking: parseActivity(walkText),
        cycling: parseActivity(cycleText),
        strength: 0.85
      },
      recovery: getRecovery(m.recovery_difficulty),
      exercises: exerciseMap[gInfo.id] || ['Consultă specialist'],
      posturalNote: extractPosturalNote(deskText)
    });
  }
}

function guessLocation(m, groupId) {
  const front = ['chest', 'core'];
  const back = ['back'];
  const both = ['head', 'shoulder', 'arm', 'hip', 'thigh', 'leg', 'foot', 'respiratory', 'pelvic'];
  if (front.includes(groupId)) return 'front';
  if (back.includes(groupId)) return 'back';
  return 'both';
}

function extractPosturalNote(text) {
  if (!text || text.length < 10) return null;
  // Truncate to first sentence for posturalNote
  const firstSentence = text.split('.')[0] + '.';
  return firstSentence.length > 120 ? firstSentence.substring(0, 117) + '...' : firstSentence;
}

// Generate the JS file
let js = `// ============================================
// MUSCLE DATABASE - Auto-generated from research data
// Total: ${muscles.length} muscles across ${Object.keys(groupMap).length} groups
// ============================================

const MUSCLE_DB = ${JSON.stringify(muscles, null, 2)};

const MUSCLE_GROUPS = [
  { id: "head", name: "Cap și Gât", icon: "🧠", color: "#9b59b6" },
  { id: "shoulder", name: "Umeri", icon: "💪", color: "#3498db" },
  { id: "arm", name: "Brațe", icon: "🦾", color: "#2ecc71" },
  { id: "chest", name: "Piept", icon: "🫁", color: "#e74c3c" },
  { id: "back", name: "Spate", icon: "🔙", color: "#e67e22" },
  { id: "core", name: "Abdomen și Core", icon: "🎯", color: "#f1c40f" },
  { id: "hip", name: "Șold", icon: "🦴", color: "#1abc9c" },
  { id: "thigh", name: "Coapse", icon: "🦵", color: "#e74c3c" },
  { id: "leg", name: "Gambe", icon: "🦿", color: "#3498db" },
  { id: "foot", name: "Picior", icon: "🦶", color: "#9b59b6" },
  { id: "respiratory", name: "Respiratori", icon: "🌬️", color: "#2ecc71" },
  { id: "pelvic", name: "Planșeu Pelvian", icon: "⚕️", color: "#e67e22" }
];

const SCENARIOS = {
  desk: { sitting: 10, walking: 0, cycling: 0, strength: 0, weeks: 12 },
  walker: { sitting: 8, walking: 30, cycling: 0, strength: 0, weeks: 12 },
  cyclist: { sitting: 8, walking: 0, cycling: 30, strength: 0, weeks: 12 },
  active: { sitting: 6, walking: 30, cycling: 30, strength: 3, weeks: 12 }
};

const BODY_MAP_MUSCLES = {
  trapez: { name: "Trapez", muscles: ["Trapez Superior", "Trapez Mijlociu", "Trapez Inferior"], group: "shoulder", risk: "moderate", function: "Stabilizarea și mișcarea umerilor și gâtului" },
  deltoizi_anteriori: { name: "Deltoizi Anteriori", muscles: ["Deltoid Anterior"], group: "shoulder", risk: "rapid", function: "Ridicarea brațului înainte" },
  pectorali: { name: "Pectorali", muscles: ["Pectoral Major", "Pectoral Minor"], group: "chest", risk: "rapid", function: "Adducția și flexia brațului" },
  bicepsi: { name: "Bicepși", muscles: ["Biceps Brahial", "Brahialis"], group: "arm", risk: "rapid", function: "Flexia cotului" },
  antebrate: { name: "Antebrațe", muscles: ["Flexori", "Extensori"], group: "arm", risk: "slow", function: "Mișcarea mâinii și degetelor" },
  abdominali: { name: "Abdominali", muscles: ["Rectus Abdominis", "Transversus Abdominis"], group: "core", risk: "rapid", function: "Flexia și stabilizarea trunchiului" },
  oblici: { name: "Oblici", muscles: ["Oblic Extern", "Oblic Intern"], group: "core", risk: "moderate", function: "Rotația și flexia laterală" },
  flexori_sold: { name: "Flexori Șold", muscles: ["Psoas Major", "Iliacus"], group: "hip", risk: "moderate", function: "Flexia șoldului (se scurtează la birou!)" },
  cvadricepsi: { name: "Cvadricepși", muscles: ["Rectus Femoris", "Vastus Lateralis", "Vastus Medialis", "Vastus Intermedius"], group: "thigh", risk: "rapid", function: "Extensia genunchiului" },
  tibial_anterior: { name: "Tibial Anterior", muscles: ["Tibialis Anterior"], group: "leg", risk: "moderate", function: "Dorsiflexia piciorului" },
  adductori: { name: "Adductori", muscles: ["Adductor Magnus", "Adductor Longus", "Gracilis"], group: "thigh", risk: "moderate", function: "Adducția coapsei" },
  trapez_superior: { name: "Trapez Superior", muscles: ["Trapez Superior"], group: "shoulder", risk: "moderate", function: "Ridicarea umerilor (suprasolicitat la birou)" },
  romboizi: { name: "Romboizi", muscles: ["Romboid Major", "Romboid Minor"], group: "shoulder", risk: "rapid", function: "Retracția omoplatului" },
  deltoizi_posteriori: { name: "Deltoizi Posteriori", muscles: ["Deltoid Posterior"], group: "shoulder", risk: "rapid", function: "Extensia brațului" },
  tricepsi: { name: "Tricepși", muscles: ["Triceps Brahial"], group: "arm", risk: "rapid", function: "Extensia cotului" },
  latissimus: { name: "Latissimus Dorsi", muscles: ["Latissimus Dorsi"], group: "back", risk: "rapid", function: "Extensia și adducția brațului" },
  erectori_spinali: { name: "Erectori Spinali", muscles: ["Iliocostalis", "Longissimus", "Spinalis"], group: "back", risk: "moderate", function: "Extensia și stabilizarea coloanei" },
  fesieri: { name: "Fesieri", muscles: ["Gluteus Maximus", "Gluteus Medius", "Gluteus Minimus"], group: "hip", risk: "rapid", function: "Extensia și stabilizarea șoldului" },
  ischiogambieri: { name: "Ischiogambieri", muscles: ["Biceps Femoral", "Semitendinosus", "Semimembranosus"], group: "thigh", risk: "rapid", function: "Flexia genunchiului" },
  gamba: { name: "Gambă", muscles: ["Gastrocnemius", "Soleus"], group: "leg", risk: "moderate", function: "Flexia plantară (propulsie la mers)" }
};
`;

fs.writeFileSync(path.join(dir, 'chunk5_data.js'), js, 'utf8');
console.log(`Generated chunk5_data.js with ${muscles.length} muscles`);

// --- Step 2: Combine all chunks into index.html ---
const chunk1 = fs.readFileSync(path.join(dir, 'chunk1_css.html'), 'utf8');
const chunk2 = fs.readFileSync(path.join(dir, 'chunk2_body1.html'), 'utf8');
const chunk3 = fs.readFileSync(path.join(dir, 'chunk3_body2.html'), 'utf8');
const chunk4 = fs.readFileSync(path.join(dir, 'chunk4_body3.html'), 'utf8');
const chunk5 = fs.readFileSync(path.join(dir, 'chunk5_data.js'), 'utf8');
const chunk6 = fs.readFileSync(path.join(dir, 'chunk6_logic.js'), 'utf8');

// chunk1 ends with <body> <!-- CHUNK 2 CONTINUES HERE -->
// We need to insert chunk2, chunk3, chunk4 as body content, then chunk5+chunk6 as script

let html = chunk1;

// Remove the placeholder comment from chunk1
html = html.replace('<!-- CHUNK 2 CONTINUES HERE -->', '');

// Strip chunk comment markers
const cleanChunk = (c) => c
  .replace(/<!--\s*CHUNK \d.*?-->/g, '')
  .replace(/<!--\s*END CHUNK \d.*?-->/g, '')
  .trim();

// Add body content
html += '\n' + cleanChunk(chunk2);
html += '\n' + cleanChunk(chunk3);
html += '\n' + cleanChunk(chunk4);

// Add scripts
html += '\n<script>\n' + chunk5 + '\n' + chunk6 + '\n</script>\n';

// Close body and html
html += '\n</body>\n</html>';

fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
const sizeKB = Math.round(Buffer.byteLength(html) / 1024);
console.log(`Generated index.html (${sizeKB} KB)`);
console.log('Done!');
