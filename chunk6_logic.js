// ============================================================
// CHUNK 6: Interactive JavaScript Logic
// Muscle Atrophy Visualization - Romanian Language
// ============================================================
// Assumes MUSCLE_DB, MUSCLE_GROUPS, SCENARIOS, and
// BODY_MAP_MUSCLES are already defined (from chunk5).
// ============================================================

// ----------------------------------------------------------
// 0. INJECT EXTRA CSS STYLES
// ----------------------------------------------------------
(function addExtraStyles() {
  const style = document.createElement('style');
  style.textContent = `
    /* Muscle card inner elements */
    .muscle-latin {
      font-style: italic;
      font-size: 0.8rem;
      color: var(--text-muted, #6b7394);
      margin-bottom: 8px;
    }
    .muscle-meta {
      margin: 12px 0;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .meta-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.85rem;
    }
    .meta-label {
      color: var(--text-muted, #6b7394);
    }
    .activity-bars {
      margin: 12px 0;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .activity-bar-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .activity-label {
      width: 80px;
      font-size: 0.8rem;
    }
    .activity-pct {
      width: 35px;
      font-size: 0.8rem;
      text-align: right;
      font-weight: 600;
    }

    /* Progress bar (shared) */
    .progress-bar {
      flex: 1;
      height: 6px;
      background: rgba(255,255,255,0.08);
      border-radius: 3px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      border-radius: 3px;
      transition: width 0.6s ease;
    }

    /* Muscle tags */
    .muscle-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-top: 10px;
    }
    .tag {
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.08);
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.7rem;
      color: var(--text-secondary, #9ca3b8);
    }

    /* Card badges */
    .card-badge {
      padding: 2px 10px;
      border-radius: 12px;
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .badge-rapid {
      background: rgba(231,76,60,0.15);
      color: #e74c3c;
    }
    .badge-moderate {
      background: rgba(230,126,34,0.15);
      color: #e67e22;
    }
    .badge-slow {
      background: rgba(241,196,15,0.15);
      color: #f1c40f;
    }
    .badge-very-slow {
      background: rgba(46,204,113,0.15);
      color: #2ecc71;
    }

    /* Muscle card header */
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 8px;
    }
    .card-title {
      font-weight: 700;
      font-size: 1rem;
      line-height: 1.3;
    }
    .muscle-detail {
      font-size: 0.85rem;
      color: var(--text-secondary, #9ca3b8);
      line-height: 1.5;
      margin-bottom: 4px;
    }

    /* Animate-in for cards */
    .animate-in {
      animation: cardFadeIn 0.5s ease forwards;
    }
    @keyframes cardFadeIn {
      from {
        opacity: 0;
        transform: translateY(16px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Heatmap grid */
    .heatmap-row {
      display: grid;
      grid-template-columns: 140px repeat(4, 1fr);
      gap: 4px;
      margin-bottom: 4px;
    }
    .heatmap-cell {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      font-size: 0.8rem;
      font-weight: 600;
      transition: background 0.3s;
      color: var(--text-primary, #e8eaf0);
    }
    .heatmap-label-cell {
      display: flex;
      align-items: center;
      font-size: 0.8rem;
      color: var(--text-secondary, #9ca3b8);
      padding-right: 8px;
    }

    /* Health bar row */
    .health-bar-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 10px;
    }
    .health-bar-icon {
      font-size: 1.2rem;
      width: 28px;
      text-align: center;
    }
    .health-bar-name {
      width: 90px;
      font-size: 0.82rem;
      font-weight: 500;
    }
    .health-bar-track {
      flex: 1;
      height: 8px;
      background: rgba(255,255,255,0.06);
      border-radius: 4px;
      overflow: hidden;
    }
    .health-bar-fill {
      height: 100%;
      border-radius: 4px;
      transition: width 0.8s ease, background 0.5s ease;
    }
    .health-bar-value {
      width: 38px;
      text-align: right;
      font-size: 0.82rem;
      font-weight: 700;
      font-family: 'JetBrains Mono', monospace;
    }

    /* Radar chart legend */
    .radar-legend {
      display: flex;
      gap: 16px;
      justify-content: center;
      margin-top: 12px;
      flex-wrap: wrap;
    }
    .radar-legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.82rem;
      color: var(--text-secondary, #9ca3b8);
    }
    .radar-legend-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }

    /* Exercise grid for recovery */
    .exercise-group-card {
      background: var(--bg-card, rgba(22,25,40,0.7));
      border: 1px solid var(--glass-border, rgba(255,255,255,0.06));
      border-radius: var(--radius-md, 12px);
      padding: 20px;
      margin-bottom: 16px;
    }
    .exercise-group-title {
      font-weight: 700;
      font-size: 1rem;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .exercise-list-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 8px;
    }
    .exercise-item {
      background: var(--bg-secondary, #12141c);
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 0.82rem;
    }
    .exercise-item-name {
      font-weight: 600;
      margin-bottom: 2px;
    }
    .exercise-item-detail {
      font-size: 0.75rem;
      color: var(--text-muted, #6b7394);
    }

    /* Timeline chart container */
    .timeline-svg-chart {
      width: 100%;
      height: auto;
    }

    /* Tooltip cursor-follow styles */
    .muscle-tooltip {
      position: fixed;
      z-index: 200;
      pointer-events: none;
      background: rgba(18, 20, 30, 0.95);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 10px;
      padding: 12px 16px;
      min-width: 200px;
      max-width: 300px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.6);
      opacity: 0;
      transform: translateY(8px);
      transition: opacity 0.2s ease, transform 0.2s ease;
    }
    .muscle-tooltip.visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* Scroll animation base */
    .section.scroll-hidden,
    .card.scroll-hidden,
    .chart-container.scroll-hidden,
    .issue-card.scroll-hidden,
    .comparison-card.scroll-hidden,
    .recovery-stat.scroll-hidden {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
  `;
  document.head.appendChild(style);
})();


// ----------------------------------------------------------
// 1. INITIALIZATION
// ----------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initExplorer();
  initSimulator();
  initDashboard();
  initBodyMap();
  initRecovery();
  initScrollAnimations();
  initSmoothScroll();
});


// ----------------------------------------------------------
// 2. BODY MAP INTERACTIONS
// ----------------------------------------------------------

/**
 * Initialize body map - add hover/click listeners to all
 * .muscle-region SVG elements, wire up front/back toggle.
 */
function initBodyMap() {
  const regions = document.querySelectorAll('.muscle-region');
  const tooltip = document.getElementById('muscleTooltip');

  regions.forEach(region => {
    // Hover: show tooltip
    region.addEventListener('mouseenter', (e) => {
      const muscleId = region.getAttribute('data-muscle');
      showTooltip(e, muscleId);
      region.classList.add('active');
    });

    region.addEventListener('mousemove', (e) => {
      if (tooltip && tooltip.classList.contains('visible')) {
        positionTooltip(e);
      }
    });

    // Leave: hide tooltip
    region.addEventListener('mouseleave', () => {
      hideTooltip();
      region.classList.remove('active');
    });

    // Click: show detailed info panel
    region.addEventListener('click', (e) => {
      const muscleId = region.getAttribute('data-muscle');
      showMuscleInfoPanel(muscleId);
    });
  });

  // Front/Back view toggle (if toggle buttons exist)
  const viewBtns = document.querySelectorAll('.view-toggle__btn, [data-view]');
  // The body map uses two side-by-side SVGs so both are visible,
  // no toggle needed unless specific toggle buttons exist.
}

/**
 * Show tooltip near the cursor with muscle information.
 * @param {MouseEvent} e - The mouse event
 * @param {string} muscleId - The data-muscle attribute value
 */
function showTooltip(e, muscleId) {
  const tooltip = document.getElementById('muscleTooltip');
  if (!tooltip) return;

  // Look up muscle data from BODY_MAP_MUSCLES or MUSCLE_DB
  const muscle = findMuscleData(muscleId);
  if (!muscle) {
    // Fallback: just show the ID
    tooltip.querySelector('.tooltip-title').textContent = muscleId;
    tooltip.querySelector('.tooltip-function').textContent = '';
    tooltip.querySelector('.tooltip-risk').textContent = '';
    tooltip.querySelector('.tooltip-detail').textContent = '';
  } else {
    tooltip.querySelector('.tooltip-title').textContent = muscle.name || muscle.romanian_name || muscleId;
    tooltip.querySelector('.tooltip-function').textContent = muscle.function || muscle.primary_function || '';

    const riskLevel = muscle.atrophyRate || muscle.atrophy_rate || '';
    const riskLabel = getRiskLabel(riskLevel);
    const riskColor = getRiskColorFromRate(riskLevel);
    tooltip.querySelector('.tooltip-risk').innerHTML =
      `<span style="display:inline-block;padding:2px 8px;border-radius:10px;font-size:0.72rem;font-weight:600;background:${riskColor}22;color:${riskColor}">${riskLabel}</span>`;

    const deskRisk = muscle.deskRisk != null ? Math.round(muscle.deskRisk * 100) : null;
    const detail = deskRisk != null
      ? `Risc la birou: ${deskRisk}%`
      : (muscle.desk_note || '');
    tooltip.querySelector('.tooltip-detail').textContent = detail;
  }

  tooltip.classList.add('visible');
  positionTooltip(e);
}

/**
 * Position the tooltip near the mouse cursor, keeping it within viewport.
 */
function positionTooltip(e) {
  const tooltip = document.getElementById('muscleTooltip');
  if (!tooltip) return;

  const pad = 16;
  let x = e.clientX + pad;
  let y = e.clientY + pad;

  const rect = tooltip.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Keep within viewport
  if (x + rect.width > vw - pad) {
    x = e.clientX - rect.width - pad;
  }
  if (y + rect.height > vh - pad) {
    y = e.clientY - rect.height - pad;
  }

  tooltip.style.left = x + 'px';
  tooltip.style.top = y + 'px';
}

/**
 * Hide the tooltip.
 */
function hideTooltip() {
  const tooltip = document.getElementById('muscleTooltip');
  if (tooltip) {
    tooltip.classList.remove('visible');
  }
}

/**
 * Find muscle data from BODY_MAP_MUSCLES or MUSCLE_DB
 * by matching the SVG data-muscle attribute.
 */
function findMuscleData(muscleId) {
  // Try BODY_MAP_MUSCLES first (a lookup object keyed by data-muscle IDs)
  if (typeof BODY_MAP_MUSCLES !== 'undefined' && BODY_MAP_MUSCLES[muscleId]) {
    return BODY_MAP_MUSCLES[muscleId];
  }
  // Try MUSCLE_DB array
  if (typeof MUSCLE_DB !== 'undefined' && Array.isArray(MUSCLE_DB)) {
    // Match by id or by similar slug
    const found = MUSCLE_DB.find(m =>
      m.id === muscleId ||
      m.slug === muscleId ||
      (m.name && m.name.toLowerCase().replace(/\s+/g, '-') === muscleId)
    );
    if (found) return found;
  }
  return null;
}

/**
 * Show the side-panel with detailed info about a muscle when clicked.
 */
function showMuscleInfoPanel(muscleId) {
  const panel = document.getElementById('muscle-info');
  const muscle = findMuscleData(muscleId);

  // If the architecture uses a dedicated info panel
  if (panel) {
    panel.setAttribute('aria-hidden', 'false');
    panel.classList.add('active');

    if (muscle) {
      const nameEl = document.getElementById('info-name');
      const riskEl = document.getElementById('info-risk');
      const funcEl = document.getElementById('info-function');
      const timeEl = document.getElementById('info-timeline');
      const exercisesEl = document.getElementById('info-exercises');
      const riskMeterFill = panel.querySelector('.risk-meter__fill');
      const riskMeterValue = panel.querySelector('.risk-meter__value');

      if (nameEl) nameEl.textContent = muscle.name || muscle.romanian_name || muscleId;
      if (riskEl) {
        const rl = muscle.atrophyRate || muscle.atrophy_rate || '';
        riskEl.textContent = getRiskLabel(rl);
        riskEl.className = 'muscle-info-panel__risk-badge badge-' + rl.replace('_', '-');
      }
      if (funcEl) funcEl.textContent = muscle.function || muscle.primary_function || '--';
      if (timeEl) {
        const weeks = muscle.atrophyTimeline ? muscle.atrophyTimeline.noticeable : '?';
        timeEl.textContent = weeks + ' saptamani';
      }
      if (riskMeterFill && muscle.deskRisk != null) {
        riskMeterFill.style.width = (muscle.deskRisk * 100) + '%';
        riskMeterFill.style.background = getRiskColor(muscle.deskRisk);
      }
      if (riskMeterValue && muscle.deskRisk != null) {
        riskMeterValue.textContent = Math.round(muscle.deskRisk * 100) + '%';
      }
      if (exercisesEl && muscle.exercises) {
        exercisesEl.innerHTML = muscle.exercises
          .map(ex => `<li>${ex}</li>`)
          .join('');
      }
    }

    // Close button
    const closeBtn = panel.querySelector('.muscle-info-panel__close');
    if (closeBtn) {
      closeBtn.onclick = () => {
        panel.setAttribute('aria-hidden', 'true');
        panel.classList.remove('active');
        document.querySelectorAll('.muscle-region.active').forEach(r => r.classList.remove('active'));
      };
    }
  }
}


// ----------------------------------------------------------
// 3. MUSCLE EXPLORER
// ----------------------------------------------------------

/** Current active group filter */
let currentFilter = 'all';

/**
 * Initialize the muscle explorer grid with full DB and counts.
 */
function initExplorer() {
  if (typeof MUSCLE_DB === 'undefined') return;

  renderMuscleGrid(MUSCLE_DB);
  updateExplorerCounts(MUSCLE_DB);

  // Wire up search input
  const searchInput = document.getElementById('muscleSearch');
  if (searchInput) {
    searchInput.addEventListener('input', filterMuscles);
  }
}

/**
 * Render the muscle cards grid from the given array.
 */
function renderMuscleGrid(muscles) {
  const grid = document.getElementById('muscleGrid');
  if (!grid) return;

  if (muscles.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:48px;color:var(--text-muted,#6b7394);">Niciun muschi gasit.</div>';
    return;
  }

  grid.innerHTML = muscles.map(m => {
    const rateKey = m.atrophyRate || 'moderate';
    return `
    <div class="muscle-card" data-group="${m.group || ''}" data-risk="${rateKey}">
      <div class="card-header">
        <div class="card-title">${m.name || m.romanian_name || '--'}</div>
        <span class="card-badge badge-${rateKey}">${getRiskLabel(rateKey)}</span>
      </div>
      <div class="muscle-latin">${m.latin || m.latin_name || ''}</div>
      <div class="muscle-detail">${m.function || m.primary_function || ''}</div>
      <div class="muscle-meta">
        <div class="meta-row">
          <span class="meta-label">Grup:</span>
          <span>${m.groupName || m.group || ''}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Pierdere forta/sapt:</span>
          <span>${m.strengthLossPerWeek != null ? m.strengthLossPerWeek : (m.strength_loss_per_week_inactivity || '?')}%</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Atrofie vizibila:</span>
          <span>${m.atrophyTimeline ? m.atrophyTimeline.noticeable : '?'} saptamani</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Risc la birou:</span>
          <div class="progress-bar">
            <div class="progress-fill" style="width:${(m.deskRisk != null ? m.deskRisk * 100 : 50)}%;background:${getRiskColor(m.deskRisk != null ? m.deskRisk : 0.5)}"></div>
          </div>
        </div>
      </div>
      <div class="activity-bars">
        <div class="activity-bar-row">
          <span class="activity-label">&#128421;&#65039; Birou</span>
          <div class="progress-bar"><div class="progress-fill" style="width:${getActivity(m, 'desk') * 100}%;background:var(--activity-desk, #ef4444)"></div></div>
          <span class="activity-pct">${Math.round(getActivity(m, 'desk') * 100)}%</span>
        </div>
        <div class="activity-bar-row">
          <span class="activity-label">&#128694; Mers</span>
          <div class="progress-bar"><div class="progress-fill" style="width:${getActivity(m, 'walking') * 100}%;background:var(--activity-walking, #22c55e)"></div></div>
          <span class="activity-pct">${Math.round(getActivity(m, 'walking') * 100)}%</span>
        </div>
        <div class="activity-bar-row">
          <span class="activity-label">&#128692; Bicicleta</span>
          <div class="progress-bar"><div class="progress-fill" style="width:${getActivity(m, 'cycling') * 100}%;background:var(--activity-cycling, #3b82f6)"></div></div>
          <span class="activity-pct">${Math.round(getActivity(m, 'cycling') * 100)}%</span>
        </div>
      </div>
      <div class="muscle-tags">
        ${(m.exercises || []).map(ex => `<span class="tag">${ex}</span>`).join('')}
      </div>
    </div>`;
  }).join('');

  // Staggered entry animation
  grid.querySelectorAll('.muscle-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.animationDelay = `${Math.min(i * 0.03, 0.5)}s`;
    card.classList.add('animate-in');
  });
}

/**
 * Helper: safely get activity value from a muscle object.
 * Returns 0-1 float.
 */
function getActivity(muscle, key) {
  if (muscle.activities && muscle.activities[key] != null) {
    return muscle.activities[key];
  }
  return 0;
}

/**
 * Filter muscles by search text and active group filter,
 * re-render grid and update counts.
 */
function filterMuscles() {
  if (typeof MUSCLE_DB === 'undefined') return;

  const searchEl = document.getElementById('muscleSearch');
  const searchText = searchEl ? searchEl.value.toLowerCase().trim() : '';

  let filtered = MUSCLE_DB;

  // Filter by group
  if (currentFilter && currentFilter !== 'all') {
    filtered = filtered.filter(m => {
      const g = m.group || '';
      const rate = m.atrophyRate || '';
      // If the filter matches a group id
      if (g === currentFilter) return true;
      // If the filter matches an atrophy rate
      if (rate === currentFilter) return true;
      return false;
    });
  }

  // Filter by search text
  if (searchText) {
    filtered = filtered.filter(m => {
      const name = (m.name || m.romanian_name || '').toLowerCase();
      const latin = (m.latin || m.latin_name || '').toLowerCase();
      const func = (m.function || m.primary_function || '').toLowerCase();
      const groupName = (m.groupName || '').toLowerCase();
      return name.includes(searchText) ||
             latin.includes(searchText) ||
             func.includes(searchText) ||
             groupName.includes(searchText);
    });
  }

  renderMuscleGrid(filtered);
  updateExplorerCounts(filtered);
}

/**
 * Set the active group filter and re-filter.
 * @param {string} group - The group or rate to filter by
 */
function setFilter(group) {
  currentFilter = group;

  // Update button active states
  document.querySelectorAll('.filter-btn, .chip, .explorer-tab').forEach(btn => {
    const btnFilter = btn.getAttribute('data-filter') || btn.getAttribute('data-group');
    if (btnFilter === group) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  filterMuscles();
}

/**
 * Update the summary counters in the explorer.
 * @param {Array} muscles - The currently displayed muscles
 */
function updateExplorerCounts(muscles) {
  const totalEl = document.getElementById('totalShown');
  const rapidEl = document.getElementById('countRapid');
  const moderateEl = document.getElementById('countModerate');
  const slowEl = document.getElementById('countSlow');
  const verySlowEl = document.getElementById('countVerySlow');

  if (totalEl) totalEl.textContent = muscles.length;

  const countByRate = (rate) =>
    muscles.filter(m => (m.atrophyRate || m.atrophy_rate || '') === rate).length;

  if (rapidEl) rapidEl.textContent = countByRate('rapid');
  if (moderateEl) moderateEl.textContent = countByRate('moderate');
  if (slowEl) slowEl.textContent = countByRate('slow');
  if (verySlowEl) verySlowEl.textContent = countByRate('very-slow') + countByRate('very_slow');
}


// ----------------------------------------------------------
// 4. LIFESTYLE SIMULATOR
// ----------------------------------------------------------

/**
 * Initialize the simulator: load default scenario, render.
 */
function initSimulator() {
  if (typeof SCENARIOS === 'undefined') return;

  loadScenario('desk');
  updateSimulator();

  // Wire up scenario card clicks (in case not inline onclick)
  document.querySelectorAll('.scenario-card').forEach(card => {
    card.addEventListener('click', () => {
      const scenario = card.getAttribute('data-scenario');
      if (scenario) loadScenario(scenario);
    });
  });

  // Wire up slider input events (in case not inline oninput)
  ['sittingSlider', 'walkingSlider', 'cyclingSlider', 'strengthSlider', 'weeksSlider'].forEach(id => {
    const slider = document.getElementById(id);
    if (slider) {
      slider.addEventListener('input', updateSimulator);
    }
  });
}

/**
 * Load a preset scenario into the sliders.
 * @param {string} scenario - Scenario key from SCENARIOS object
 */
function loadScenario(scenario) {
  if (typeof SCENARIOS === 'undefined') return;

  const s = SCENARIOS[scenario];
  if (!s) return;

  const setSlider = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = val;
  };

  setSlider('sittingSlider', s.sitting);
  setSlider('walkingSlider', s.walking);
  setSlider('cyclingSlider', s.cycling);
  setSlider('strengthSlider', s.strength);
  setSlider('weeksSlider', s.weeks);

  // Update active card highlight
  document.querySelectorAll('.scenario-card').forEach(c => c.classList.remove('active'));
  const activeCard = document.querySelector(`[data-scenario="${scenario}"]`);
  if (activeCard) activeCard.classList.add('active');

  updateSimulator();
}

/**
 * Read all slider values, calculate health per muscle group,
 * and update the UI (health bars, score, timeline chart).
 */
function updateSimulator() {
  if (typeof MUSCLE_DB === 'undefined' || typeof MUSCLE_GROUPS === 'undefined') return;

  const sitting = parseFloat(document.getElementById('sittingSlider')?.value || 8);
  const walking = parseFloat(document.getElementById('walkingSlider')?.value || 0);
  const cycling = parseFloat(document.getElementById('cyclingSlider')?.value || 0);
  const strength = parseFloat(document.getElementById('strengthSlider')?.value || 0);
  const weeks = parseFloat(document.getElementById('weeksSlider')?.value || 12);

  // Update displayed values
  const setValue = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };
  setValue('sittingValue', sitting);
  setValue('walkingValue', walking);
  setValue('cyclingValue', cycling);
  setValue('strengthValue', strength);
  setValue('weeksValue', weeks);

  // Calculate health per muscle group
  const groupHealths = {};
  MUSCLE_GROUPS.forEach(group => {
    const muscles = MUSCLE_DB.filter(m => m.group === group.id);
    if (muscles.length === 0) {
      groupHealths[group.id] = 100;
      return;
    }
    const avgHealth = muscles.reduce((sum, m) => {
      return sum + calculateMuscleHealth(m, sitting, walking, cycling, strength, weeks);
    }, 0) / muscles.length;
    groupHealths[group.id] = Math.round(avgHealth);
  });

  // Render health bars
  renderHealthBars(groupHealths);

  // Overall score
  const totalMuscles = MUSCLE_DB.length;
  const overallHealth = MUSCLE_DB.reduce((sum, m) => {
    return sum + calculateMuscleHealth(m, sitting, walking, cycling, strength, weeks);
  }, 0) / totalMuscles;

  updateOverallScore(Math.round(overallHealth));

  // Timeline chart
  renderTimelineChart(sitting, walking, cycling, strength, weeks);
}

/**
 * Calculate a single muscle's health (0-100) based on lifestyle params.
 *
 * @param {Object} muscle - Muscle data object
 * @param {number} sitting - Hours per day sitting
 * @param {number} walking - Minutes per day walking
 * @param {number} cycling - Minutes per day cycling
 * @param {number} strength - Days per week strength training
 * @param {number} weeks - Number of weeks
 * @returns {number} Health score 5-100
 */
function calculateMuscleHealth(muscle, sitting, walking, cycling, strength, weeks) {
  // Sitting damage factor (0-1, diminishing returns via exponential)
  const sittingFactor = 1 - Math.exp(-sitting / 8);

  // Protection factors from activities (each 0-1, scaled by muscle's activity level)
  const walkAct = getActivity(muscle, 'walking');
  const cycleAct = getActivity(muscle, 'cycling');
  const strengthAct = getActivity(muscle, 'strength');

  const walkingProtection = (walking / 60) * walkAct;
  const cyclingProtection = (cycling / 60) * cycleAct;
  // Strength training is most effective (1.5x multiplier)
  const strengthProtection = (strength / 7) * strengthAct * 1.5;

  // Total protection capped at 0.95
  const totalProtection = Math.min(walkingProtection + cyclingProtection + strengthProtection, 0.95);

  // Desk risk (how vulnerable this muscle is to sitting)
  const deskRisk = muscle.deskRisk != null ? muscle.deskRisk : 0.5;

  // Net degradation rate
  const netDegradation = sittingFactor * deskRisk * (1 - totalProtection);

  // Exponential decay over weeks
  const health = 100 * Math.exp(-netDegradation * weeks * 0.04);

  return Math.max(5, Math.min(100, health));
}

/**
 * Render the per-group health bars in #healthBars.
 */
function renderHealthBars(groupHealths) {
  const container = document.getElementById('healthBars');
  if (!container || typeof MUSCLE_GROUPS === 'undefined') return;

  container.innerHTML = MUSCLE_GROUPS.map(group => {
    const health = groupHealths[group.id] || 0;
    const color = getHealthColor(health);
    return `
      <div class="health-bar-row">
        <span class="health-bar-icon">${group.icon || ''}</span>
        <span class="health-bar-name">${group.name || group.id}</span>
        <div class="health-bar-track">
          <div class="health-bar-fill" style="width:${health}%;background:${color}"></div>
        </div>
        <span class="health-bar-value" style="color:${color}">${health}%</span>
      </div>`;
  }).join('');
}

/**
 * Update the overall health score display.
 * @param {number} score - 0 to 100
 */
function updateOverallScore(score) {
  const numberEl = document.getElementById('scoreNumber');
  const fillEl = document.getElementById('scoreFill');
  const verdictEl = document.getElementById('scoreVerdict');

  // Also support the ring-style score display
  const ringValue = document.getElementById('score-value');
  const ringFill = document.querySelector('.score-ring__fill');

  let color, verdict;
  if (score >= 80) {
    color = '#2ecc71';
    verdict = 'Excelent';
  } else if (score >= 60) {
    color = '#8bc34a';
    verdict = 'Bun';
  } else if (score >= 40) {
    color = '#e67e22';
    verdict = 'Risc Moderat';
  } else {
    color = '#e74c3c';
    verdict = 'Risc Ridicat';
  }

  if (numberEl) {
    numberEl.textContent = score;
    numberEl.style.color = color;
  }
  if (fillEl) {
    fillEl.style.width = score + '%';
    fillEl.style.background = color;
  }
  if (verdictEl) {
    verdictEl.textContent = verdict;
    verdictEl.style.color = color;
  }

  // Ring-style display
  if (ringValue) {
    ringValue.textContent = score;
    ringValue.style.color = color;
  }
  if (ringFill) {
    // circumference = 2 * PI * 85 = ~534
    const circumference = 2 * Math.PI * 85;
    const offset = circumference - (score / 100) * circumference;
    ringFill.style.strokeDashoffset = offset;
    ringFill.style.stroke = color;
  }
}

/**
 * Render an SVG line chart in #timelineChart showing health
 * degradation over time for different scenario comparisons.
 */
function renderTimelineChart(sitting, walking, cycling, strength, maxWeeks) {
  const container = document.getElementById('timelineChart');
  if (!container || typeof MUSCLE_DB === 'undefined') return;

  const W = 600;
  const H = 300;
  const padL = 50;
  const padR = 20;
  const padT = 20;
  const padB = 40;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  // Define 4 scenario lines to compare
  const scenarioConfigs = [
    { label: 'Doar Birou',   sit: sitting, walk: 0,       cyc: 0,       str: 0,        color: '#ef4444' },
    { label: '+ Mers 30min', sit: sitting, walk: 30,      cyc: 0,       str: 0,        color: '#22c55e' },
    { label: '+ Bicicleta',  sit: sitting, walk: 0,       cyc: 30,      str: 0,        color: '#3b82f6' },
    { label: 'Stilul Tau',   sit: sitting, walk: walking,  cyc: cycling, str: strength, color: '#a855f7' },
  ];

  // Calculate data points for each scenario
  const stepCount = 20;
  const scenarioLines = scenarioConfigs.map(sc => {
    const points = [];
    for (let i = 0; i <= stepCount; i++) {
      const w = (maxWeeks / stepCount) * i;
      const health = MUSCLE_DB.reduce((sum, m) => {
        return sum + calculateMuscleHealth(m, sc.sit, sc.walk, sc.cyc, sc.str, w);
      }, 0) / MUSCLE_DB.length;
      points.push({ week: w, health: Math.round(health) });
    }
    return { ...sc, points };
  });

  // Build SVG
  let svg = `<svg viewBox="0 0 ${W} ${H}" class="timeline-svg-chart" xmlns="http://www.w3.org/2000/svg">`;

  // Background
  svg += `<rect x="0" y="0" width="${W}" height="${H}" fill="none"/>`;

  // Grid lines (horizontal)
  for (let pct = 0; pct <= 100; pct += 25) {
    const y = padT + chartH - (pct / 100) * chartH;
    svg += `<line x1="${padL}" y1="${y}" x2="${padL + chartW}" y2="${y}" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>`;
    svg += `<text x="${padL - 6}" y="${y + 4}" fill="var(--text-muted,#6b7394)" font-size="10" text-anchor="end" font-family="Inter,sans-serif">${pct}%</text>`;
  }

  // Grid lines (vertical) - week labels
  const weekStep = Math.max(1, Math.ceil(maxWeeks / 6));
  for (let w = 0; w <= maxWeeks; w += weekStep) {
    const x = padL + (w / maxWeeks) * chartW;
    svg += `<line x1="${x}" y1="${padT}" x2="${x}" y2="${padT + chartH}" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>`;
    svg += `<text x="${x}" y="${padT + chartH + 16}" fill="var(--text-muted,#6b7394)" font-size="10" text-anchor="middle" font-family="Inter,sans-serif">${Math.round(w)}s</text>`;
  }

  // X-axis label
  svg += `<text x="${padL + chartW / 2}" y="${H - 4}" fill="var(--text-muted,#6b7394)" font-size="11" text-anchor="middle" font-family="Inter,sans-serif">Saptamani</text>`;

  // Draw lines for each scenario
  scenarioLines.forEach(sc => {
    const pathParts = sc.points.map((p, i) => {
      const x = padL + (p.week / maxWeeks) * chartW;
      const y = padT + chartH - (p.health / 100) * chartH;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    });
    svg += `<path d="${pathParts.join(' ')}" fill="none" stroke="${sc.color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.85"/>`;

    // Endpoint dot
    const lastPt = sc.points[sc.points.length - 1];
    const ex = padL + (lastPt.week / maxWeeks) * chartW;
    const ey = padT + chartH - (lastPt.health / 100) * chartH;
    svg += `<circle cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" r="4" fill="${sc.color}" stroke="var(--bg-primary,#0a0b0f)" stroke-width="2"/>`;
  });

  // Axes
  svg += `<line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + chartH}" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>`;
  svg += `<line x1="${padL}" y1="${padT + chartH}" x2="${padL + chartW}" y2="${padT + chartH}" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>`;

  svg += '</svg>';

  // Legend
  let legend = '<div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;margin-top:8px;">';
  scenarioConfigs.forEach(sc => {
    legend += `<span style="display:flex;align-items:center;gap:5px;font-size:0.78rem;color:var(--text-secondary,#9ca3b8);">
      <span style="width:10px;height:10px;border-radius:50%;background:${sc.color};display:inline-block;"></span>${sc.label}
    </span>`;
  });
  legend += '</div>';

  container.innerHTML = svg + legend;
}


// ----------------------------------------------------------
// 5. DASHBOARD (Radar Chart + Heatmap)
// ----------------------------------------------------------

/**
 * Initialize the dashboard charts.
 */
function initDashboard() {
  renderRadarChart();
  renderHeatmap();
}

/**
 * Render an SVG radar/spider chart comparing 4 activity profiles
 * across 8 major muscle group axes.
 */
function renderRadarChart() {
  const container = document.getElementById('radarChart');
  if (!container || typeof MUSCLE_DB === 'undefined' || typeof MUSCLE_GROUPS === 'undefined') return;

  // Use up to 8 major groups for radar axes
  const radarGroups = MUSCLE_GROUPS.slice(0, 8);
  const numAxes = radarGroups.length;
  if (numAxes < 3) return; // Need at least 3 axes

  const cx = 250, cy = 250, maxR = 190;
  const levels = 5;
  const angleStep = (2 * Math.PI) / numAxes;
  const startAngle = -Math.PI / 2; // Start at top

  // Activity profiles to overlay
  const profiles = [
    { key: 'desk',     label: 'Birou',     color: '#ef4444', opacity: 0.15 },
    { key: 'walking',  label: 'Mers',      color: '#22c55e', opacity: 0.15 },
    { key: 'cycling',  label: 'Bicicleta', color: '#3b82f6', opacity: 0.15 },
    { key: 'combined', label: 'Combinat',  color: '#a855f7', opacity: 0.2  },
  ];

  // Calculate average activation per group per activity
  const groupActivations = {};
  radarGroups.forEach(group => {
    const muscles = MUSCLE_DB.filter(m => m.group === group.id);
    if (muscles.length === 0) {
      groupActivations[group.id] = { desk: 0, walking: 0, cycling: 0, combined: 0 };
      return;
    }
    const avg = (key) => muscles.reduce((s, m) => s + getActivity(m, key), 0) / muscles.length;
    groupActivations[group.id] = {
      desk: avg('desk'),
      walking: avg('walking'),
      cycling: avg('cycling'),
      combined: Math.min(1, avg('walking') * 0.4 + avg('cycling') * 0.4 + avg('strength') * 0.3 + avg('desk') * 0.05)
    };
  });

  let svg = `<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:500px;display:block;margin:0 auto;">`;

  // Draw concentric polygon rings (grid levels)
  for (let lv = 1; lv <= levels; lv++) {
    const r = (lv / levels) * maxR;
    const pts = [];
    for (let i = 0; i < numAxes; i++) {
      const angle = startAngle + i * angleStep;
      pts.push(`${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`);
    }
    svg += `<polygon points="${pts.join(' ')}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>`;
  }

  // Draw axis lines
  for (let i = 0; i < numAxes; i++) {
    const angle = startAngle + i * angleStep;
    const ex = cx + maxR * Math.cos(angle);
    const ey = cy + maxR * Math.sin(angle);
    svg += `<line x1="${cx}" y1="${cy}" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>`;

    // Axis label
    const labelR = maxR + 22;
    const lx = cx + labelR * Math.cos(angle);
    const ly = cy + labelR * Math.sin(angle);
    const anchor = Math.abs(Math.cos(angle)) < 0.1 ? 'middle' : (Math.cos(angle) > 0 ? 'start' : 'end');
    svg += `<text x="${lx.toFixed(1)}" y="${(ly + 4).toFixed(1)}" fill="var(--text-secondary,#9ca3b8)" font-size="11" text-anchor="${anchor}" font-family="Inter,sans-serif">${radarGroups[i].name || radarGroups[i].id}</text>`;
  }

  // Draw data polygons for each profile
  profiles.forEach(prof => {
    const pts = [];
    for (let i = 0; i < numAxes; i++) {
      const angle = startAngle + i * angleStep;
      const val = groupActivations[radarGroups[i].id]?.[prof.key] || 0;
      const r = val * maxR;
      pts.push(`${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`);
    }
    svg += `<polygon points="${pts.join(' ')}" fill="${prof.color}" fill-opacity="${prof.opacity}" stroke="${prof.color}" stroke-width="2" stroke-opacity="0.7"/>`;

    // Dots at each vertex
    for (let i = 0; i < numAxes; i++) {
      const angle = startAngle + i * angleStep;
      const val = groupActivations[radarGroups[i].id]?.[prof.key] || 0;
      const r = val * maxR;
      const px = cx + r * Math.cos(angle);
      const py = cy + r * Math.sin(angle);
      svg += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="3" fill="${prof.color}" opacity="0.9"/>`;
    }
  });

  svg += '</svg>';

  container.innerHTML = svg;

  // Render legend (if a separate legend container exists)
  const legendContainer = document.getElementById('radarLegend');
  if (legendContainer && !legendContainer.querySelector('.radar-legend-item')) {
    // Legend was already set in HTML with .legend-item spans, leave it.
    // Only populate if empty of existing legend items
    if (legendContainer.children.length === 0) {
      legendContainer.innerHTML = profiles.map(p => `
        <span class="radar-legend-item">
          <span class="radar-legend-dot" style="background:${p.color}"></span>${p.label}
        </span>
      `).join('');
    }
  }
}

/**
 * Render a heatmap grid in #heatmapChart.
 * Rows = muscle groups, Columns = activities (desk, walking, cycling, combined).
 */
function renderHeatmap() {
  const container = document.getElementById('heatmapChart');
  if (!container || typeof MUSCLE_DB === 'undefined' || typeof MUSCLE_GROUPS === 'undefined') return;

  // Use the same groups as the radar
  const groups = MUSCLE_GROUPS.slice(0, 12);

  // Calculate average activation per group per activity
  const html = groups.map(group => {
    const muscles = MUSCLE_DB.filter(m => m.group === group.id);
    if (muscles.length === 0) return '';

    const avg = (key) => muscles.reduce((s, m) => s + getActivity(m, key), 0) / muscles.length;
    const desk = avg('desk');
    const walk = avg('walking');
    const cycle = avg('cycling');
    const combined = Math.min(1, walk * 0.4 + cycle * 0.4 + avg('strength') * 0.3 + desk * 0.05);

    const makeCell = (val) => {
      const pct = Math.round(val * 100);
      const bg = interpolateHeatColor(val);
      return `<div class="heatmap-cell" style="background:${bg};" title="${pct}%">${pct}%</div>`;
    };

    return `
      <div class="heatmap-row">
        <div class="heatmap-label-cell">${group.icon || ''} ${group.name || group.id}</div>
        ${makeCell(desk)}
        ${makeCell(walk)}
        ${makeCell(cycle)}
        ${makeCell(combined)}
      </div>`;
  }).join('');

  container.innerHTML = html;
}

/**
 * Interpolate a heatmap color from dark blue/gray (0) to bright red (1).
 * @param {number} t - Value 0-1
 * @returns {string} CSS color string
 */
function interpolateHeatColor(t) {
  t = Math.max(0, Math.min(1, t));

  // Color stops: 0 = #1a1b25 (dark), 0.25 = #1e3a2f, 0.5 = #2d5a3f,
  //              0.75 = #e67e22, 1.0 = #e74c3c
  const stops = [
    { t: 0,    r: 26,  g: 27,  b: 37  },
    { t: 0.25, r: 30,  g: 58,  b: 47  },
    { t: 0.5,  r: 45,  g: 90,  b: 63  },
    { t: 0.75, r: 230, g: 126, b: 34  },
    { t: 1.0,  r: 231, g: 76,  b: 60  }
  ];

  // Find the two surrounding stops
  let lower = stops[0], upper = stops[stops.length - 1];
  for (let i = 0; i < stops.length - 1; i++) {
    if (t >= stops[i].t && t <= stops[i + 1].t) {
      lower = stops[i];
      upper = stops[i + 1];
      break;
    }
  }

  const range = upper.t - lower.t;
  const factor = range === 0 ? 0 : (t - lower.t) / range;

  const r = Math.round(lower.r + (upper.r - lower.r) * factor);
  const g = Math.round(lower.g + (upper.g - lower.g) * factor);
  const b = Math.round(lower.b + (upper.b - lower.b) * factor);

  return `rgb(${r},${g},${b})`;
}


// ----------------------------------------------------------
// 6. RECOVERY PLANNER
// ----------------------------------------------------------

/**
 * Initialize the recovery planner section.
 */
function initRecovery() {
  selectDuration(4);
  renderExerciseGrid();

  // Wire up duration button clicks (in case not inline onclick)
  document.querySelectorAll('.duration-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const weeks = parseInt(btn.getAttribute('data-weeks'), 10);
      if (!isNaN(weeks)) selectDuration(weeks);
    });
  });
}

/**
 * Select a sedentary duration and update recovery estimates.
 * @param {number} weeks - Number of weeks sedentary
 */
function selectDuration(weeks) {
  // Update active button
  document.querySelectorAll('.duration-btn').forEach(b => b.classList.remove('active'));
  const activeBtn = document.querySelector(`.duration-btn[data-weeks="${weeks}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  // Calculate recovery estimates based on sedentary duration
  let baseRecoveryWeeks, fullRecoveryMonths, frequency;
  if (weeks <= 4) {
    baseRecoveryWeeks = '2-4';
    fullRecoveryMonths = '1-2';
    frequency = '3x';
  } else if (weeks <= 12) {
    baseRecoveryWeeks = '4-6';
    fullRecoveryMonths = '2-3';
    frequency = '3-4x';
  } else if (weeks <= 26) {
    baseRecoveryWeeks = '6-10';
    fullRecoveryMonths = '3-5';
    frequency = '3-4x';
  } else if (weeks <= 52) {
    baseRecoveryWeeks = '8-14';
    fullRecoveryMonths = '4-6';
    frequency = '4x';
  } else {
    baseRecoveryWeeks = '12-20';
    fullRecoveryMonths = '6-12';
    frequency = '4-5x';
  }

  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };
  setVal('recoveryWeeks', baseRecoveryWeeks);
  setVal('recoveryMonths', fullRecoveryMonths);
  setVal('recoveryFreq', frequency);

  // Also update any ring/summary displays
  setVal('recovery-time', baseRecoveryWeeks + ' sapt.');
  setVal('recovery-sessions', fullRecoveryMonths + ' luni');
  setVal('recovery-frequency', frequency + '/sapt.');
}

/**
 * Render an exercise grid organized by muscle group.
 * Each group card shows recommended exercises with sets/reps.
 */
function renderExerciseGrid() {
  const container = document.getElementById('exerciseGrid');
  if (!container || typeof MUSCLE_DB === 'undefined' || typeof MUSCLE_GROUPS === 'undefined') return;

  // Default reps/sets recommendations
  const defaultRecs = [
    { sets: 3, reps: '10-12', freq: '3x/sapt.' },
    { sets: 3, reps: '8-10',  freq: '3x/sapt.' },
    { sets: 2, reps: '12-15', freq: '2-3x/sapt.' },
  ];

  const html = MUSCLE_GROUPS.map(group => {
    const muscles = MUSCLE_DB.filter(m => m.group === group.id);
    if (muscles.length === 0) return '';

    // Collect unique exercises from all muscles in this group
    const exerciseSet = new Set();
    muscles.forEach(m => {
      if (m.exercises && Array.isArray(m.exercises)) {
        m.exercises.forEach(ex => exerciseSet.add(ex));
      }
    });
    const exercises = Array.from(exerciseSet);
    if (exercises.length === 0) return '';

    const exerciseItems = exercises.slice(0, 8).map((ex, i) => {
      const rec = defaultRecs[i % defaultRecs.length];
      return `
        <div class="exercise-item">
          <div class="exercise-item-name">${ex}</div>
          <div class="exercise-item-detail">${rec.sets} serii x ${rec.reps} rep. | ${rec.freq}</div>
        </div>`;
    }).join('');

    return `
      <div class="exercise-group-card">
        <div class="exercise-group-title">
          ${group.icon || ''} ${group.name || group.id}
        </div>
        <div class="exercise-list-grid">
          ${exerciseItems}
        </div>
      </div>`;
  }).join('');

  container.innerHTML = html;
}


// ----------------------------------------------------------
// 7. SCROLL ANIMATIONS
// ----------------------------------------------------------

/**
 * Use IntersectionObserver to animate elements into view
 * as the user scrolls down the page.
 */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        entry.target.style.opacity = '';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Select elements to animate on scroll
  const selectors = [
    '.section',
    '.card',
    '.chart-container',
    '.issue-card',
    '.comparison-card',
    '.recovery-stat',
    '.scenario-card',
    '.stat-card',
    '.muscle-card'
  ].join(', ');

  document.querySelectorAll(selectors).forEach(el => {
    // Only set initial hidden state if the element is not already in the viewport
    const rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight) {
      el.style.opacity = '0';
      observer.observe(el);
    }
  });
}


// ----------------------------------------------------------
// 8. SMOOTH SCROLL
// ----------------------------------------------------------

/**
 * Intercept nav link clicks and smooth-scroll to the target section.
 */
function initSmoothScroll() {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Close mobile menu if open
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) navLinks.classList.remove('mobile-open');
      }
    });
  });
}


// ----------------------------------------------------------
// 9. UTILITY FUNCTIONS
// ----------------------------------------------------------

/**
 * Get Romanian label for an atrophy rate key.
 * @param {string} rate - 'rapid', 'moderate', 'slow', 'very-slow', 'very_slow'
 * @returns {string} Romanian label
 */
function getRiskLabel(rate) {
  const labels = {
    'rapid':     'Rapida',
    'moderate':  'Moderata',
    'slow':      'Lenta',
    'very-slow': 'Foarte Lenta',
    'very_slow': 'Foarte Lenta'
  };
  return labels[rate] || rate || '--';
}

/**
 * Get a color for a 0-1 risk/danger value.
 * Green (0) -> Yellow (0.4) -> Orange (0.7) -> Red (1.0)
 * @param {number} value - 0 to 1
 * @returns {string} CSS hex color
 */
function getRiskColor(value) {
  value = Math.max(0, Math.min(1, value));

  if (value <= 0.4) {
    // Green to Yellow
    const t = value / 0.4;
    return interpolateColor('#2ecc71', '#f1c40f', t);
  } else if (value <= 0.7) {
    // Yellow to Orange
    const t = (value - 0.4) / 0.3;
    return interpolateColor('#f1c40f', '#e67e22', t);
  } else {
    // Orange to Red
    const t = (value - 0.7) / 0.3;
    return interpolateColor('#e67e22', '#e74c3c', t);
  }
}

/**
 * Get color from an atrophy rate string key.
 * @param {string} rate
 * @returns {string} hex color
 */
function getRiskColorFromRate(rate) {
  const colors = {
    'rapid':     '#e74c3c',
    'moderate':  '#e67e22',
    'slow':      '#f1c40f',
    'very-slow': '#2ecc71',
    'very_slow': '#2ecc71'
  };
  return colors[rate] || '#9ca3b8';
}

/**
 * Get color for a health score (0-100).
 * Red (low) -> Orange -> Yellow-Green -> Green (high)
 * @param {number} health - 0 to 100
 * @returns {string} CSS color
 */
function getHealthColor(health) {
  if (health >= 75) return interpolateColor('#8bc34a', '#2ecc71', (health - 75) / 25);
  if (health >= 50) return interpolateColor('#f1c40f', '#8bc34a', (health - 50) / 25);
  if (health >= 25) return interpolateColor('#e67e22', '#f1c40f', (health - 25) / 25);
  return interpolateColor('#e74c3c', '#e67e22', health / 25);
}

/**
 * Linear interpolation between two hex colors.
 * @param {string} color1 - Start hex color (e.g. '#2ecc71')
 * @param {string} color2 - End hex color (e.g. '#e74c3c')
 * @param {number} factor - Interpolation factor 0-1
 * @returns {string} Interpolated hex color
 */
function interpolateColor(color1, color2, factor) {
  factor = Math.max(0, Math.min(1, factor));

  const hex = (c) => {
    c = c.replace('#', '');
    return {
      r: parseInt(c.substring(0, 2), 16),
      g: parseInt(c.substring(2, 4), 16),
      b: parseInt(c.substring(4, 6), 16)
    };
  };

  const c1 = hex(color1);
  const c2 = hex(color2);

  const r = Math.round(c1.r + (c2.r - c1.r) * factor);
  const g = Math.round(c1.g + (c2.g - c1.g) * factor);
  const b = Math.round(c1.b + (c2.b - c1.b) * factor);

  const toHex = (n) => n.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Format a number as a percentage string.
 * @param {number} value
 * @returns {string}
 */
function formatPercent(value) {
  return Math.round(value) + '%';
}
