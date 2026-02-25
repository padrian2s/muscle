# Muscle Atrophy Visualization - Technical Architecture Specification

## Project Overview

**File:** `index.html` (single-file, self-contained)
**Language:** Romanian (UI text), English (code identifiers)
**Theme:** Dark, anatomical color coding
**Dependencies:** Google Fonts CDN (Inter + JetBrains Mono), Phosphor Icons CDN
**Target:** Modern browsers (Chrome 90+, Firefox 88+, Safari 15+, Edge 90+)

---

## 1. HTML Structure Skeleton

```html
<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Atrofia Musculara - Vizualizare Interactiva</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.0.3/src/regular/style.css">
  <style>/* ALL CSS HERE */</style>
</head>
<body>

  <!-- ====== NAVIGATION ====== -->
  <nav id="main-nav">
    <div class="nav-inner">
      <a href="#" class="nav-logo">
        <span class="logo-icon"><!-- inline SVG muscle icon --></span>
        <span class="logo-text">MuscleMap</span>
      </a>
      <button class="nav-toggle" aria-label="Meniu" aria-expanded="false">
        <span class="hamburger"></span>
      </button>
      <ul class="nav-links">
        <li><a href="#hero" data-section="hero">Acasa</a></li>
        <li><a href="#body-map" data-section="body-map">Harta Corporala</a></li>
        <li><a href="#explorer" data-section="explorer">Explorer</a></li>
        <li><a href="#simulator" data-section="simulator">Simulator</a></li>
        <li><a href="#dashboard" data-section="dashboard">Comparatii</a></li>
        <li><a href="#posture" data-section="posture">Postura</a></li>
        <li><a href="#recovery" data-section="recovery">Recuperare</a></li>
      </ul>
    </div>
  </nav>

  <!-- ====== SECTION 1: HERO / INTRODUCTION ====== -->
  <section id="hero" class="section section--hero">
    <div class="hero-bg">
      <!-- CSS animated gradient mesh background -->
    </div>
    <div class="container">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="hero-title__line hero-title__line--1" data-animate="slide-up">
            Atrofia
          </span>
          <span class="hero-title__line hero-title__line--2" data-animate="slide-up" data-delay="200">
            <span class="text-gradient">Musculara</span>
          </span>
          <span class="hero-title__line hero-title__line--3" data-animate="slide-up" data-delay="400">
            Vizualizata
          </span>
        </h1>
        <p class="hero-description" data-animate="fade-in" data-delay="600">
          Descopera cum sedentarismul afecteaza fiecare grup muscular,
          compara stiluri de viata si planifica-ti recuperarea.
        </p>
        <div class="hero-cta" data-animate="fade-in" data-delay="800">
          <a href="#body-map" class="btn btn--primary">Exploreaza Harta</a>
          <a href="#simulator" class="btn btn--secondary">Simuleaza</a>
        </div>
      </div>

      <!-- Stats Dashboard -->
      <div class="stats-dashboard" data-animate="fade-in" data-delay="1000">
        <div class="stat-card" data-stat="muscles">
          <div class="stat-card__icon"><i class="ph ph-barbell"></i></div>
          <div class="stat-card__value" data-counter="650">0</div>
          <div class="stat-card__label">Muschi in Corp</div>
        </div>
        <div class="stat-card" data-stat="atrophy-start">
          <div class="stat-card__icon"><i class="ph ph-timer"></i></div>
          <div class="stat-card__value" data-counter="72">0</div>
          <div class="stat-card__unit">ore</div>
          <div class="stat-card__label">Pana la Debut Atrofie</div>
        </div>
        <div class="stat-card" data-stat="desk-hours">
          <div class="stat-card__icon"><i class="ph ph-desktop"></i></div>
          <div class="stat-card__value" data-counter="8.5" data-decimals="1">0</div>
          <div class="stat-card__unit">ore/zi</div>
          <div class="stat-card__label">Media Sedentarism Birou</div>
        </div>
        <div class="stat-card" data-stat="loss-rate">
          <div class="stat-card__icon"><i class="ph ph-trend-down"></i></div>
          <div class="stat-card__value" data-counter="0.5" data-decimals="1">0</div>
          <div class="stat-card__unit">%/zi</div>
          <div class="stat-card__label">Pierdere Masa Musculara</div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="scroll-indicator" data-animate="fade-in" data-delay="1200">
      <span>Deruleaza</span>
      <div class="scroll-indicator__arrow"></div>
    </div>
  </section>

  <!-- ====== SECTION 2: INTERACTIVE BODY MAP ====== -->
  <section id="body-map" class="section section--body-map">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Harta Corporala Interactiva</h2>
        <p class="section-subtitle">
          Apasa pe orice grup muscular pentru detalii despre riscul de atrofie
        </p>
      </div>

      <!-- View Toggle: Front / Back -->
      <div class="body-map-controls">
        <div class="view-toggle">
          <button class="view-toggle__btn active" data-view="front">
            <i class="ph ph-user"></i> Fata
          </button>
          <button class="view-toggle__btn" data-view="back">
            <i class="ph ph-user"></i> Spate
          </button>
        </div>
        <!-- Risk Legend -->
        <div class="risk-legend">
          <div class="risk-legend__item" data-risk="rapid">
            <span class="risk-dot risk-dot--rapid"></span> Rapid
          </div>
          <div class="risk-legend__item" data-risk="moderate">
            <span class="risk-dot risk-dot--moderate"></span> Moderat
          </div>
          <div class="risk-legend__item" data-risk="slow">
            <span class="risk-dot risk-dot--slow"></span> Lent
          </div>
          <div class="risk-legend__item" data-risk="very-slow">
            <span class="risk-dot risk-dot--very-slow"></span> Foarte Lent
          </div>
        </div>
      </div>

      <div class="body-map-wrapper">
        <!-- Front View SVG -->
        <div class="body-map__view body-map__view--front active" id="body-front">
          <svg viewBox="0 0 400 800" class="body-svg" id="svg-front">
            <!--
              Structure: Each muscle region is a <g> group containing:
              - <path> for the muscle shape
              - data-muscle="muscle-id"
              - data-risk="rapid|moderate|slow|very-slow"
              - class="muscle-region"

              Regions (front):
              - g#m-deltoids-front  (shoulders)
              - g#m-pectorals       (chest)
              - g#m-biceps          (upper arm front)
              - g#m-forearms-front  (forearm front)
              - g#m-abs             (rectus abdominis)
              - g#m-obliques        (obliques)
              - g#m-hip-flexors     (hip flexor area)
              - g#m-quadriceps      (front thigh)
              - g#m-adductors       (inner thigh)
              - g#m-tibialis        (shin)

              Body outline is a separate non-interactive path for context.
            -->
            <g class="body-outline">
              <!-- silhouette path -->
            </g>
            <g class="muscle-regions" id="front-muscles">
              <!-- Each muscle group path here -->
            </g>
          </svg>
        </div>

        <!-- Back View SVG -->
        <div class="body-map__view body-map__view--back" id="body-back">
          <svg viewBox="0 0 400 800" class="body-svg" id="svg-back">
            <!--
              Regions (back):
              - g#m-trapezius       (upper back)
              - g#m-deltoids-back   (rear deltoids)
              - g#m-rhomboids       (mid-back)
              - g#m-lats            (latissimus dorsi)
              - g#m-erector-spinae  (lower back)
              - g#m-triceps         (upper arm back)
              - g#m-forearms-back   (forearm back)
              - g#m-glutes          (gluteus)
              - g#m-hamstrings      (back thigh)
              - g#m-calves          (calf)
            -->
            <g class="body-outline">
              <!-- silhouette path -->
            </g>
            <g class="muscle-regions" id="back-muscles">
              <!-- Each muscle group path here -->
            </g>
          </svg>
        </div>

        <!-- Muscle Info Panel (appears on click) -->
        <aside class="muscle-info-panel" id="muscle-info" aria-hidden="true">
          <button class="muscle-info-panel__close" aria-label="Inchide">
            <i class="ph ph-x"></i>
          </button>
          <div class="muscle-info-panel__header">
            <h3 class="muscle-info-panel__name" id="info-name">--</h3>
            <span class="muscle-info-panel__risk-badge" id="info-risk">--</span>
          </div>
          <div class="muscle-info-panel__body">
            <div class="info-row">
              <span class="info-label">Functie</span>
              <span class="info-value" id="info-function">--</span>
            </div>
            <div class="info-row">
              <span class="info-label">Rata de Atrofie</span>
              <div class="atrophy-bar" id="info-atrophy-bar">
                <div class="atrophy-bar__fill"></div>
              </div>
            </div>
            <div class="info-row">
              <span class="info-label">Timp pana la Atrofie Vizibila</span>
              <span class="info-value" id="info-timeline">--</span>
            </div>
            <div class="info-row">
              <span class="info-label">Risc Sedentarism</span>
              <div class="risk-meter" id="info-risk-meter">
                <div class="risk-meter__fill"></div>
                <span class="risk-meter__value">--</span>
              </div>
            </div>
            <div class="info-row">
              <span class="info-label">Recuperare</span>
              <span class="info-value" id="info-recovery">--</span>
            </div>
            <div class="info-row">
              <span class="info-label">Exercitii Recomandate</span>
              <ul class="exercise-list" id="info-exercises">
                <!-- populated dynamically -->
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <!-- ====== SECTION 3: MUSCLE GROUPS EXPLORER ====== -->
  <section id="explorer" class="section section--explorer">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Explorer Grupe Musculare</h2>
        <p class="section-subtitle">
          Navigheaza prin fiecare grup muscular si descopera detalii complete
        </p>
      </div>

      <!-- Search & Filter Bar -->
      <div class="explorer-toolbar">
        <div class="search-box">
          <i class="ph ph-magnifying-glass"></i>
          <input type="text" id="muscle-search" placeholder="Cauta muschi..."
                 aria-label="Cauta muschi">
        </div>
        <div class="filter-chips">
          <button class="chip active" data-filter="all">Toate</button>
          <button class="chip" data-filter="rapid">
            <span class="risk-dot risk-dot--rapid"></span> Risc Rapid
          </button>
          <button class="chip" data-filter="moderate">
            <span class="risk-dot risk-dot--moderate"></span> Risc Moderat
          </button>
          <button class="chip" data-filter="slow">
            <span class="risk-dot risk-dot--slow"></span> Risc Lent
          </button>
          <button class="chip" data-filter="very-slow">
            <span class="risk-dot risk-dot--very-slow"></span> Foarte Lent
          </button>
        </div>
        <div class="sort-select">
          <label for="sort-by">Sorteaza:</label>
          <select id="sort-by">
            <option value="risk-desc">Risc (descrescator)</option>
            <option value="risk-asc">Risc (crescator)</option>
            <option value="alpha">Alfabetic</option>
            <option value="recovery">Timp Recuperare</option>
          </select>
        </div>
      </div>

      <!-- Tab Navigation by Body Region -->
      <div class="explorer-tabs" role="tablist">
        <button class="explorer-tab active" role="tab" data-group="all"
                aria-selected="true">Toate</button>
        <button class="explorer-tab" role="tab" data-group="legs">Picioare</button>
        <button class="explorer-tab" role="tab" data-group="back">Spate</button>
        <button class="explorer-tab" role="tab" data-group="core">Trunchi</button>
        <button class="explorer-tab" role="tab" data-group="shoulders">Umeri</button>
        <button class="explorer-tab" role="tab" data-group="arms">Brate</button>
        <button class="explorer-tab" role="tab" data-group="chest">Piept</button>
        <button class="explorer-tab" role="tab" data-group="glutes">Fesieri</button>
      </div>

      <!-- Muscle Cards Grid -->
      <div class="muscle-cards-grid" id="muscle-cards" role="tabpanel">
        <!--
          Each card (generated by JS from MuscleData):
          <article class="muscle-card" data-muscle="quadriceps" data-risk="rapid" data-group="legs">
            <div class="muscle-card__header">
              <div class="muscle-card__icon">
                - inline mini SVG showing muscle location on body
              </div>
              <div class="muscle-card__title-group">
                <h3 class="muscle-card__name">Cvadriceps</h3>
                <span class="muscle-card__latin">Quadriceps femoris</span>
              </div>
              <span class="muscle-card__risk-badge risk-badge--rapid">Rapid</span>
            </div>
            <div class="muscle-card__body">
              <p class="muscle-card__function">Extensia genunchiului...</p>
              <div class="muscle-card__stats">
                <div class="stat-mini">
                  <span class="stat-mini__label">Atrofie Vizibila</span>
                  <span class="stat-mini__value">2 sapt.</span>
                </div>
                <div class="stat-mini">
                  <span class="stat-mini__label">Recuperare</span>
                  <span class="stat-mini__value">4-8 sapt.</span>
                </div>
              </div>
              <div class="muscle-card__timeline">
                <span class="timeline-label">Progresie Atrofie</span>
                <div class="timeline-bar">
                  <div class="timeline-bar__segment timeline-bar__segment--mild"
                       style="width: 25%;" title="Usoara: 0-2 sapt."></div>
                  <div class="timeline-bar__segment timeline-bar__segment--moderate"
                       style="width: 35%;" title="Moderata: 2-6 sapt."></div>
                  <div class="timeline-bar__segment timeline-bar__segment--severe"
                       style="width: 40%;" title="Severa: 6-12 sapt."></div>
                </div>
                <div class="timeline-markers">
                  <span>0</span><span>2 sapt</span><span>6 sapt</span><span>12 sapt</span>
                </div>
              </div>
            </div>
            <div class="muscle-card__footer">
              <button class="btn btn--sm btn--ghost" data-action="show-on-map"
                      data-muscle="quadriceps">
                <i class="ph ph-map-pin"></i> Arata pe Harta
              </button>
              <button class="btn btn--sm btn--ghost" data-action="recovery-plan"
                      data-muscle="quadriceps">
                <i class="ph ph-heartbeat"></i> Plan Recuperare
              </button>
            </div>
          </article>
        -->
      </div>

      <!-- Results count -->
      <div class="explorer-results-count" id="results-count">
        Se afiseaza <strong>0</strong> din <strong>0</strong> muschi
      </div>
    </div>
  </section>

  <!-- ====== SECTION 4: LIFESTYLE SIMULATOR ====== -->
  <section id="simulator" class="section section--simulator">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Simulator Stil de Viata</h2>
        <p class="section-subtitle">
          Ajusteaza parametrii si vezi impactul in timp real asupra muschilor tai
        </p>
      </div>

      <div class="simulator-layout">
        <!-- Left: Controls -->
        <div class="simulator-controls">
          <div class="control-group">
            <h3 class="control-group__title">
              <i class="ph ph-desktop"></i> Activitate Zilnica
            </h3>

            <div class="slider-control" data-param="sitting">
              <div class="slider-control__header">
                <label for="slider-sitting">Ore stat pe scaun</label>
                <output class="slider-output" id="output-sitting">8</output>
              </div>
              <input type="range" id="slider-sitting" min="0" max="16" step="0.5"
                     value="8" class="range-slider">
              <div class="slider-ticks">
                <span>0</span><span>4</span><span>8</span><span>12</span><span>16</span>
              </div>
            </div>

            <div class="slider-control" data-param="walking">
              <div class="slider-control__header">
                <label for="slider-walking">Minute mers pe jos</label>
                <output class="slider-output" id="output-walking">20</output>
              </div>
              <input type="range" id="slider-walking" min="0" max="180" step="5"
                     value="20" class="range-slider">
              <div class="slider-ticks">
                <span>0</span><span>30</span><span>60</span><span>120</span><span>180</span>
              </div>
            </div>

            <div class="slider-control" data-param="cycling">
              <div class="slider-control__header">
                <label for="slider-cycling">Minute ciclism</label>
                <output class="slider-output" id="output-cycling">0</output>
              </div>
              <input type="range" id="slider-cycling" min="0" max="120" step="5"
                     value="0" class="range-slider">
              <div class="slider-ticks">
                <span>0</span><span>30</span><span>60</span><span>90</span><span>120</span>
              </div>
            </div>

            <div class="slider-control" data-param="exercise">
              <div class="slider-control__header">
                <label for="slider-exercise">Antrenamente / saptamana</label>
                <output class="slider-output" id="output-exercise">0</output>
              </div>
              <input type="range" id="slider-exercise" min="0" max="7" step="1"
                     value="0" class="range-slider">
              <div class="slider-ticks">
                <span>0</span><span>1</span><span>3</span><span>5</span><span>7</span>
              </div>
            </div>
          </div>

          <!-- Preset Profiles -->
          <div class="control-group">
            <h3 class="control-group__title">
              <i class="ph ph-user-list"></i> Profile Predefinite
            </h3>
            <div class="preset-buttons">
              <button class="preset-btn active" data-preset="desk-worker">
                <i class="ph ph-desktop"></i>
                <span>Lucrator Birou</span>
              </button>
              <button class="preset-btn" data-preset="walker">
                <i class="ph ph-person-simple-walk"></i>
                <span>Pietonul Activ</span>
              </button>
              <button class="preset-btn" data-preset="cyclist">
                <i class="ph ph-bicycle"></i>
                <span>Ciclistul</span>
              </button>
              <button class="preset-btn" data-preset="active">
                <i class="ph ph-barbell"></i>
                <span>Persoana Activa</span>
              </button>
            </div>
          </div>

          <!-- Timeline Control -->
          <div class="control-group">
            <h3 class="control-group__title">
              <i class="ph ph-clock-countdown"></i> Proiectie Temporala
            </h3>
            <div class="timeline-control">
              <button class="timeline-btn" data-weeks="2">2 sapt</button>
              <button class="timeline-btn" data-weeks="4">1 luna</button>
              <button class="timeline-btn active" data-weeks="12">3 luni</button>
              <button class="timeline-btn" data-weeks="26">6 luni</button>
              <button class="timeline-btn" data-weeks="52">1 an</button>
            </div>
            <button class="btn btn--primary btn--full" id="btn-animate-timeline">
              <i class="ph ph-play"></i> Animeaza Progresia
            </button>
          </div>
        </div>

        <!-- Right: Visual Output -->
        <div class="simulator-output">
          <!-- Overall Health Score -->
          <div class="health-score-ring" id="health-score">
            <svg viewBox="0 0 200 200" class="score-ring-svg">
              <circle class="score-ring__bg" cx="100" cy="100" r="85"/>
              <circle class="score-ring__fill" cx="100" cy="100" r="85"
                      stroke-dasharray="534" stroke-dashoffset="534"/>
            </svg>
            <div class="score-ring__content">
              <span class="score-ring__value" id="score-value">0</span>
              <span class="score-ring__label">Scor Sanatate</span>
            </div>
          </div>

          <!-- Per-Group Health Bars -->
          <div class="group-health-bars" id="group-health">
            <!--
              Generated by JS. Each bar:
              <div class="health-bar" data-group="legs">
                <div class="health-bar__label">Picioare</div>
                <div class="health-bar__track">
                  <div class="health-bar__fill" style="width: 45%;"></div>
                </div>
                <div class="health-bar__value">45%</div>
              </div>
            -->
          </div>

          <!-- Mini Body Map (colored by current scores) -->
          <div class="simulator-body-preview" id="sim-body-preview">
            <!-- Simplified SVG body, colored by health scores -->
          </div>

          <!-- Before/After Comparison -->
          <div class="comparison-panel" id="comparison">
            <div class="comparison-panel__header">
              <h3>Comparatie: Stilul Tau vs. Persoana Activa</h3>
            </div>
            <div class="comparison-columns">
              <div class="comparison-col comparison-col--current">
                <h4>Stilul Tau</h4>
                <div class="comparison-body-svg" id="compare-current">
                  <!-- mini SVG -->
                </div>
              </div>
              <div class="comparison-col comparison-col--ideal">
                <h4>Persoana Activa</h4>
                <div class="comparison-body-svg" id="compare-ideal">
                  <!-- mini SVG -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ====== SECTION 5: ACTIVITY COMPARISON DASHBOARD ====== -->
  <section id="dashboard" class="section section--dashboard">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Tablou Comparativ Activitati</h2>
        <p class="section-subtitle">
          Compara impactul diferitelor activitati asupra grupelor musculare
        </p>
      </div>

      <!-- Comparison Cards Row -->
      <div class="comparison-cards">
        <div class="comparison-card" data-activity="desk">
          <div class="comparison-card__icon">
            <i class="ph ph-desktop"></i>
          </div>
          <h3 class="comparison-card__title">Doar Birou</h3>
          <div class="comparison-card__score">
            <span class="score-value">23</span>/100
          </div>
          <div class="comparison-card__mini-bars">
            <!-- mini bars per group, generated by JS -->
          </div>
        </div>
        <div class="comparison-card" data-activity="walking">
          <div class="comparison-card__icon">
            <i class="ph ph-person-simple-walk"></i>
          </div>
          <h3 class="comparison-card__title">+ Mers pe Jos</h3>
          <div class="comparison-card__score">
            <span class="score-value">52</span>/100
          </div>
          <div class="comparison-card__mini-bars"></div>
        </div>
        <div class="comparison-card" data-activity="cycling">
          <div class="comparison-card__icon">
            <i class="ph ph-bicycle"></i>
          </div>
          <h3 class="comparison-card__title">+ Ciclism</h3>
          <div class="comparison-card__score">
            <span class="score-value">61</span>/100
          </div>
          <div class="comparison-card__mini-bars"></div>
        </div>
        <div class="comparison-card" data-activity="combined">
          <div class="comparison-card__icon">
            <i class="ph ph-barbell"></i>
          </div>
          <h3 class="comparison-card__title">Combinat</h3>
          <div class="comparison-card__score">
            <span class="score-value">87</span>/100
          </div>
          <div class="comparison-card__mini-bars"></div>
        </div>
      </div>

      <!-- Radar Charts Row -->
      <div class="charts-row">
        <div class="chart-panel">
          <h3 class="chart-panel__title">Activare Musculara per Activitate</h3>
          <div class="chart-tabs">
            <button class="chart-tab active" data-chart-view="overlay">Suprapus</button>
            <button class="chart-tab" data-chart-view="separate">Separat</button>
          </div>
          <div class="radar-chart-container" id="radar-chart">
            <!-- SVG radar chart rendered by JS -->
            <svg viewBox="0 0 500 500" id="radar-svg" class="radar-svg"></svg>
          </div>
          <div class="chart-legend" id="radar-legend">
            <!-- color-coded legend items -->
          </div>
        </div>

        <div class="chart-panel">
          <h3 class="chart-panel__title">Harta de Caldura - Utilizare Muschi</h3>
          <div class="heatmap-container" id="heatmap">
            <!--
              CSS Grid heatmap:
              rows = muscle groups
              columns = activities (desk, walking, cycling, combined)
              cells colored by intensity
            -->
            <div class="heatmap-grid" id="heatmap-grid">
              <!-- Generated by JS -->
            </div>
            <div class="heatmap-scale">
              <span>0%</span>
              <div class="heatmap-scale__gradient"></div>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ====== SECTION 6: POSTURAL ANALYSIS ====== -->
  <section id="posture" class="section section--posture">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Analiza Posturala</h2>
        <p class="section-subtitle">
          Problemele posturale ale lucratorului de birou si muschii afectati
        </p>
      </div>

      <div class="posture-layout">
        <!-- Left: Posture Diagram -->
        <div class="posture-diagram">
          <div class="posture-figure" id="posture-figure">
            <svg viewBox="0 0 500 700" id="posture-svg" class="posture-svg">
              <!--
                Side-view seated figure with:
                - Curved spine path (showing poor posture)
                - Ideal posture overlay (togglable, dashed line)
                - Clickable pain points (circles) at key locations:
                  - Neck (#pain-neck)
                  - Upper back (#pain-upper-back)
                  - Shoulders (#pain-shoulders)
                  - Lower back (#pain-lower-back)
                  - Hips (#pain-hips)
                  - Wrists (#pain-wrists)
                  - Knees (#pain-knees)
                Each pain point has a pulsing animation and shows
                detail panel on click.
              -->
            </svg>
            <div class="posture-toggle">
              <label class="toggle-switch">
                <input type="checkbox" id="toggle-ideal-posture">
                <span class="toggle-switch__slider"></span>
              </label>
              <span>Arata Postura Ideala</span>
            </div>
          </div>
        </div>

        <!-- Right: Pain Points Detail -->
        <div class="posture-details">
          <div class="pain-points-list" id="pain-points">
            <!--
              Each pain point card:
              <div class="pain-point-card" data-point="neck">
                <div class="pain-point-card__header">
                  <div class="pain-point-card__indicator"></div>
                  <h3>Zona Cervicala</h3>
                  <span class="severity-badge severity--high">Risc Ridicat</span>
                </div>
                <div class="pain-point-card__body">
                  <p class="pain-point-card__description">
                    Flexia excesiva a gatului catre ecran tensionaaza...
                  </p>
                  <div class="affected-muscles">
                    <h4>Muschi Afectati</h4>
                    <div class="muscle-tag-list">
                      <span class="muscle-tag">Trapez Superior</span>
                      <span class="muscle-tag">Sternocleidomastoidian</span>
                      <span class="muscle-tag">Scaleni</span>
                    </div>
                  </div>
                  <div class="recommended-exercises">
                    <h4>Exercitii Recomandate</h4>
                    <div class="exercise-card-mini">
                      <span class="exercise-name">Chin Tucks</span>
                      <span class="exercise-reps">3x15 rep</span>
                      <span class="exercise-freq">zilnic</span>
                    </div>
                    ...more exercises
                  </div>
                </div>
              </div>
            -->
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ====== SECTION 7: RECOVERY PLANNER ====== -->
  <section id="recovery" class="section section--recovery">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Planificator Recuperare</h2>
        <p class="section-subtitle">
          Creaza un plan personalizat de recuperare bazat pe nivelul tau de atrofie
        </p>
      </div>

      <div class="recovery-layout">
        <!-- Step 1: Select affected muscles -->
        <div class="recovery-step" data-step="1" id="recovery-step-1">
          <div class="step-header">
            <span class="step-number">1</span>
            <h3>Selecteaza Muschii Afectati</h3>
          </div>
          <div class="step-body">
            <div class="muscle-select-grid" id="recovery-muscle-select">
              <!--
                Checkbox grid of muscle groups:
                <label class="muscle-select-item">
                  <input type="checkbox" value="quadriceps">
                  <span class="muscle-select-item__box">
                    <span class="muscle-select-item__name">Cvadriceps</span>
                  </span>
                </label>
              -->
            </div>
            <button class="btn btn--primary" id="btn-step-2">
              Continua <i class="ph ph-arrow-right"></i>
            </button>
          </div>
        </div>

        <!-- Step 2: Atrophy Duration -->
        <div class="recovery-step" data-step="2" id="recovery-step-2">
          <div class="step-header">
            <span class="step-number">2</span>
            <h3>Durata Sedentarismului</h3>
          </div>
          <div class="step-body">
            <div class="duration-selector">
              <button class="duration-btn" data-weeks="2">
                <span class="duration-btn__value">2 sapt</span>
                <span class="duration-btn__label">Atrofie Usoara</span>
              </button>
              <button class="duration-btn" data-weeks="6">
                <span class="duration-btn__value">6 sapt</span>
                <span class="duration-btn__label">Atrofie Moderata</span>
              </button>
              <button class="duration-btn" data-weeks="12">
                <span class="duration-btn__value">3 luni</span>
                <span class="duration-btn__label">Atrofie Semnificativa</span>
              </button>
              <button class="duration-btn" data-weeks="26">
                <span class="duration-btn__value">6+ luni</span>
                <span class="duration-btn__label">Atrofie Severa</span>
              </button>
            </div>
            <div class="step-nav">
              <button class="btn btn--ghost" id="btn-back-1">
                <i class="ph ph-arrow-left"></i> Inapoi
              </button>
              <button class="btn btn--primary" id="btn-step-3">
                Genereaza Plan <i class="ph ph-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Step 3: Generated Recovery Plan -->
        <div class="recovery-step" data-step="3" id="recovery-step-3">
          <div class="step-header">
            <span class="step-number">3</span>
            <h3>Planul Tau de Recuperare</h3>
          </div>
          <div class="step-body">
            <!-- Recovery Summary -->
            <div class="recovery-summary" id="recovery-summary">
              <div class="recovery-stat">
                <span class="recovery-stat__label">Timp Estimat Recuperare</span>
                <span class="recovery-stat__value" id="recovery-time">--</span>
              </div>
              <div class="recovery-stat">
                <span class="recovery-stat__label">Sesiuni Necesare</span>
                <span class="recovery-stat__value" id="recovery-sessions">--</span>
              </div>
              <div class="recovery-stat">
                <span class="recovery-stat__label">Frecventa Recomandata</span>
                <span class="recovery-stat__value" id="recovery-frequency">--</span>
              </div>
            </div>

            <!-- Recovery Timeline (visual) -->
            <div class="recovery-timeline" id="recovery-timeline">
              <!--
                SVG timeline with phases:
                Phase 1: Mobilitate & Activare (weeks 1-2)
                Phase 2: Forta de Baza (weeks 3-4)
                Phase 3: Forta Progresiva (weeks 5-8)
                Phase 4: Mentinere (ongoing)
              -->
              <svg viewBox="0 0 800 120" id="recovery-timeline-svg"></svg>
            </div>

            <!-- Exercise Plan by Phase -->
            <div class="recovery-phases" id="recovery-phases">
              <!--
                Accordion per phase:
                <div class="phase-accordion">
                  <button class="phase-accordion__trigger">
                    <span class="phase-number">Faza 1</span>
                    <span class="phase-name">Mobilitate & Activare</span>
                    <span class="phase-duration">Saptamanile 1-2</span>
                    <i class="ph ph-caret-down"></i>
                  </button>
                  <div class="phase-accordion__content">
                    <div class="exercise-plan-card">
                      <div class="exercise-plan-card__header">
                        <h4>Genuflexiuni Asistate</h4>
                        <span class="target-muscle">Cvadriceps</span>
                      </div>
                      <div class="exercise-plan-card__details">
                        <span>3 serii x 10 repetari</span>
                        <span>3x / saptamana</span>
                        <span>Dificultate: Usoara</span>
                      </div>
                    </div>
                  </div>
                </div>
              -->
            </div>

            <!-- Actions -->
            <div class="recovery-actions">
              <button class="btn btn--ghost" id="btn-back-2">
                <i class="ph ph-arrow-left"></i> Modifica Selectia
              </button>
              <button class="btn btn--primary" id="btn-export-plan">
                <i class="ph ph-download"></i> Descarca Planul
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ====== FOOTER ====== -->
  <footer id="footer" class="footer">
    <div class="container">
      <div class="footer-content">
        <p class="footer-disclaimer">
          <i class="ph ph-warning"></i>
          Aceasta pagina are scop educational. Consultati un medic specialist
          pentru diagnostic si tratament personalizat.
        </p>
        <p class="footer-credits">
          Realizat cu date bazate pe studii de fiziologie musculara
        </p>
      </div>
    </div>
  </footer>

  <!-- ====== GLOBAL TOOLTIP (reusable) ====== -->
  <div class="tooltip" id="global-tooltip" role="tooltip" aria-hidden="true">
    <div class="tooltip__content"></div>
    <div class="tooltip__arrow"></div>
  </div>

  <!-- ====== MODAL (reusable) ====== -->
  <div class="modal-overlay" id="modal-overlay" aria-hidden="true">
    <div class="modal" role="dialog" aria-modal="true">
      <button class="modal__close" aria-label="Inchide">
        <i class="ph ph-x"></i>
      </button>
      <div class="modal__content" id="modal-content">
        <!-- populated dynamically -->
      </div>
    </div>
  </div>

  <script>/* ALL JS HERE */</script>
</body>
</html>
```

---

## 2. CSS Design Tokens & Color Palette

### 2.1 Root Custom Properties

```css
:root {
  /* ═══════════════════════════════════════
     COLOR SYSTEM
     ═══════════════════════════════════════ */

  /* Base Dark Theme */
  --clr-bg-primary:       #0a0b0f;
  --clr-bg-secondary:     #12141c;
  --clr-bg-tertiary:      #1a1d2b;
  --clr-bg-elevated:      #222538;

  /* Surface (glassmorphism bases) */
  --clr-surface-glass:    rgba(22, 25, 40, 0.7);
  --clr-surface-glass-2:  rgba(30, 34, 55, 0.6);
  --clr-surface-hover:    rgba(40, 45, 70, 0.5);
  --clr-surface-border:   rgba(255, 255, 255, 0.06);
  --clr-surface-border-hover: rgba(255, 255, 255, 0.12);

  /* Text */
  --clr-text-primary:     #e8eaf0;
  --clr-text-secondary:   #9ca3b8;
  --clr-text-tertiary:    #6b7394;
  --clr-text-inverse:     #0a0b0f;

  /* Anatomical Accent Colors */
  --clr-muscle-red:       #e74c3c;      /* Muscle tissue */
  --clr-muscle-deep-red:  #c0392b;      /* Deep muscle */
  --clr-bone-white:       #f5f0e8;      /* Bone/tendon */
  --clr-nerve-yellow:     #f1c40f;      /* Nervous system */
  --clr-vein-blue:        #3498db;      /* Circulatory */
  --clr-organ-purple:     #9b59b6;      /* Organs */

  /* Atrophy Risk Scale */
  --clr-risk-rapid:       #e74c3c;      /* Red - rapid atrophy */
  --clr-risk-rapid-bg:    rgba(231, 76, 60, 0.15);
  --clr-risk-moderate:    #e67e22;      /* Orange - moderate */
  --clr-risk-moderate-bg: rgba(230, 126, 34, 0.15);
  --clr-risk-slow:        #f1c40f;      /* Yellow - slow */
  --clr-risk-slow-bg:     rgba(241, 196, 15, 0.15);
  --clr-risk-very-slow:   #2ecc71;      /* Green - very slow */
  --clr-risk-very-slow-bg:rgba(46, 204, 113, 0.15);

  /* Health Score Gradient Stops */
  --clr-health-critical:  #e74c3c;      /* 0-25% */
  --clr-health-poor:      #e67e22;      /* 25-50% */
  --clr-health-fair:      #f1c40f;      /* 50-75% */
  --clr-health-good:      #2ecc71;      /* 75-100% */

  /* Brand/Accent */
  --clr-accent-primary:   #6366f1;      /* Indigo */
  --clr-accent-secondary: #8b5cf6;      /* Purple */
  --clr-accent-gradient:  linear-gradient(135deg, #6366f1, #8b5cf6, #a78bfa);

  /* Activity Colors (for charts) */
  --clr-activity-desk:    #ef4444;
  --clr-activity-walking: #22c55e;
  --clr-activity-cycling: #3b82f6;
  --clr-activity-combined:#a855f7;

  /* Heatmap Scale */
  --clr-heat-0:           #1a1d2b;      /* 0% activation */
  --clr-heat-20:          #1e3a2f;
  --clr-heat-40:          #2d5a3f;
  --clr-heat-60:          #e67e22;
  --clr-heat-80:          #e74c3c;
  --clr-heat-100:         #ff2d55;      /* 100% activation */


  /* ═══════════════════════════════════════
     TYPOGRAPHY
     ═══════════════════════════════════════ */

  --font-primary:         'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono:            'JetBrains Mono', 'Fira Code', monospace;

  /* Type Scale (Major Third - 1.25) */
  --fs-xs:                0.64rem;      /* 10.24px */
  --fs-sm:                0.8rem;       /* 12.8px */
  --fs-base:              1rem;         /* 16px */
  --fs-md:                1.25rem;      /* 20px */
  --fs-lg:                1.563rem;     /* 25px */
  --fs-xl:                1.953rem;     /* 31.25px */
  --fs-2xl:               2.441rem;     /* 39px */
  --fs-3xl:               3.052rem;     /* 48.83px */
  --fs-hero:              4.5rem;       /* 72px */

  /* Font Weights */
  --fw-light:             300;
  --fw-regular:           400;
  --fw-medium:            500;
  --fw-semibold:          600;
  --fw-bold:              700;
  --fw-extrabold:         800;
  --fw-black:             900;

  /* Line Heights */
  --lh-tight:             1.1;
  --lh-snug:              1.3;
  --lh-normal:            1.6;
  --lh-relaxed:           1.8;


  /* ═══════════════════════════════════════
     SPACING SCALE (8px base)
     ═══════════════════════════════════════ */

  --space-1:              0.25rem;      /* 4px */
  --space-2:              0.5rem;       /* 8px */
  --space-3:              0.75rem;      /* 12px */
  --space-4:              1rem;         /* 16px */
  --space-5:              1.5rem;       /* 24px */
  --space-6:              2rem;         /* 32px */
  --space-8:              3rem;         /* 48px */
  --space-10:             4rem;         /* 64px */
  --space-12:             5rem;         /* 80px */
  --space-16:             8rem;         /* 128px */

  --container-max:        1280px;
  --container-padding:    var(--space-5);


  /* ═══════════════════════════════════════
     BORDERS & RADII
     ═══════════════════════════════════════ */

  --radius-sm:            6px;
  --radius-md:            12px;
  --radius-lg:            16px;
  --radius-xl:            24px;
  --radius-full:          9999px;

  --border-glass:         1px solid var(--clr-surface-border);
  --border-glass-hover:   1px solid var(--clr-surface-border-hover);


  /* ═══════════════════════════════════════
     SHADOWS & EFFECTS
     ═══════════════════════════════════════ */

  --shadow-sm:            0 1px 2px rgba(0,0,0,0.3);
  --shadow-md:            0 4px 12px rgba(0,0,0,0.4);
  --shadow-lg:            0 8px 32px rgba(0,0,0,0.5);
  --shadow-xl:            0 16px 48px rgba(0,0,0,0.6);
  --shadow-glow:          0 0 20px rgba(99,102,241,0.3);
  --shadow-risk-rapid:    0 0 15px rgba(231,76,60,0.3);
  --shadow-risk-moderate: 0 0 15px rgba(230,126,34,0.3);
  --shadow-risk-slow:     0 0 15px rgba(241,196,15,0.3);
  --shadow-risk-very-slow:0 0 15px rgba(46,204,113,0.3);

  /* Glassmorphism */
  --glass-blur:           16px;
  --glass-blur-heavy:     24px;
  --glass-bg:             var(--clr-surface-glass);
  --glass-border:         var(--border-glass);


  /* ═══════════════════════════════════════
     ANIMATION & TRANSITIONS
     ═══════════════════════════════════════ */

  --duration-instant:     100ms;
  --duration-fast:        200ms;
  --duration-normal:      300ms;
  --duration-slow:        500ms;
  --duration-slower:      800ms;
  --duration-slowest:     1200ms;

  --ease-out:             cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out:          cubic-bezier(0.65, 0, 0.35, 1);
  --ease-bounce:          cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-spring:          cubic-bezier(0.22, 1.2, 0.36, 1);


  /* ═══════════════════════════════════════
     Z-INDEX SCALE
     ═══════════════════════════════════════ */

  --z-base:               1;
  --z-above:              10;
  --z-nav:                100;
  --z-tooltip:            200;
  --z-modal:              300;
}
```

### 2.2 Responsive Breakpoints (Mobile-First)

```css
/* Applied via media queries, not custom properties */
/* sm: 640px   - Small tablets */
/* md: 768px   - Tablets */
/* lg: 1024px  - Small desktop */
/* xl: 1280px  - Desktop */
/* 2xl: 1536px - Large desktop */
```

### 2.3 Key CSS Patterns

```css
/* ── Glassmorphism Card ── */
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

/* ── Section Layout ── */
.section {
  padding: var(--space-12) 0;
  position: relative;
  overflow: hidden;
}

.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

/* ── Scroll-Triggered Reveal ── */
[data-animate] {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity var(--duration-slow) var(--ease-out),
              transform var(--duration-slow) var(--ease-out);
}
[data-animate].visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── SVG Muscle Region Interaction ── */
.muscle-region {
  cursor: pointer;
  transition: filter var(--duration-fast) var(--ease-out),
              opacity var(--duration-fast) var(--ease-out);
  stroke: rgba(255,255,255,0.1);
  stroke-width: 0.5;
}
.muscle-region:hover {
  filter: brightness(1.3) drop-shadow(0 0 8px currentColor);
  stroke: rgba(255,255,255,0.3);
  stroke-width: 1;
}
.muscle-region.active {
  filter: brightness(1.5) drop-shadow(0 0 12px currentColor);
  stroke: white;
  stroke-width: 1.5;
}

/* Risk-based fill colors */
.muscle-region[data-risk="rapid"]     { fill: var(--clr-risk-rapid);     }
.muscle-region[data-risk="moderate"]  { fill: var(--clr-risk-moderate);  }
.muscle-region[data-risk="slow"]      { fill: var(--clr-risk-slow);     }
.muscle-region[data-risk="very-slow"] { fill: var(--clr-risk-very-slow); }

/* ── Range Slider Custom Styling ── */
.range-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  border-radius: var(--radius-full);
  background: var(--clr-bg-tertiary);
  outline: none;
}
.range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--clr-accent-primary);
  box-shadow: var(--shadow-glow);
  cursor: pointer;
  transition: transform var(--duration-fast) var(--ease-bounce);
}
.range-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

/* ── Responsive Grid for Cards ── */
.muscle-cards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-5);
}
@media (min-width: 640px) {
  .muscle-cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .muscle-cards-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## 3. JavaScript Module Architecture

### 3.1 Namespace & Module Structure

```
window.MuscleApp
  ├── Config          (constants, breakpoints, timing)
  ├── State           (central state store, pub/sub)
  ├── Data
  │   ├── muscles[]   (full muscle dataset)
  │   ├── activities  (activity definitions)
  │   ├── posture     (posture problem definitions)
  │   └── exercises   (exercise database)
  ├── Utils
  │   ├── dom         (query helpers, class toggles)
  │   ├── math        (lerp, clamp, map-range)
  │   ├── animate     (requestAnimationFrame helpers)
  │   └── format      (number formatting, Romanian locale)
  ├── Components
  │   ├── Nav         (sticky nav, mobile menu, scroll spy)
  │   ├── Hero        (counter animation, parallax)
  │   ├── BodyMap     (SVG interaction, tooltip, front/back toggle)
  │   ├── Explorer    (tabs, filter, search, sort, card rendering)
  │   ├── Simulator   (sliders, presets, health calculation, output)
  │   ├── Dashboard   (radar chart, heatmap, comparison cards)
  │   ├── Posture     (posture SVG, pain points, exercise recs)
  │   ├── Recovery    (step wizard, plan generation, timeline)
  │   ├── Tooltip     (global tooltip positioning)
  │   └── Modal       (modal show/hide, content injection)
  ├── Charts
  │   ├── Radar       (SVG radar/spider chart renderer)
  │   ├── Heatmap     (CSS Grid heatmap with color interpolation)
  │   ├── RingGauge   (SVG circular progress)
  │   ├── BarChart    (horizontal bar renderer)
  │   └── Timeline    (SVG timeline with phases)
  └── init()          (entry point, called on DOMContentLoaded)
```

### 3.2 State Management (Pub/Sub)

```js
const MuscleApp = {};

MuscleApp.State = (() => {
  const state = {
    // Body Map
    activeView: 'front',           // 'front' | 'back'
    selectedMuscle: null,          // muscle id or null

    // Explorer
    explorerGroup: 'all',          // tab filter
    explorerRiskFilter: 'all',     // risk filter
    explorerSearch: '',            // search string
    explorerSort: 'risk-desc',     // sort key

    // Simulator
    simulator: {
      sitting: 8,
      walking: 20,
      cycling: 0,
      exercise: 0,
      preset: 'desk-worker',
      timelineWeeks: 12
    },
    simulatorResults: {},          // computed health scores

    // Dashboard
    dashboardView: 'overlay',      // radar chart view mode

    // Posture
    selectedPainPoint: null,
    showIdealPosture: false,

    // Recovery
    recoveryStep: 1,
    selectedRecoveryMuscles: [],
    atrophyDuration: null,         // weeks
    generatedPlan: null
  };

  const listeners = {};

  function get(key) {
    return key.split('.').reduce((obj, k) => obj?.[k], state);
  }

  function set(key, value) {
    const keys = key.split('.');
    let obj = state;
    for (let i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]];
    }
    const oldValue = obj[keys[keys.length - 1]];
    obj[keys[keys.length - 1]] = value;
    emit(key, value, oldValue);
  }

  function on(key, callback) {
    if (!listeners[key]) listeners[key] = [];
    listeners[key].push(callback);
    return () => {
      listeners[key] = listeners[key].filter(cb => cb !== callback);
    };
  }

  function emit(key, newVal, oldVal) {
    (listeners[key] || []).forEach(cb => cb(newVal, oldVal));
    // Also notify wildcard listeners
    (listeners['*'] || []).forEach(cb => cb(key, newVal, oldVal));
  }

  return { get, set, on, emit };
})();
```

### 3.3 Data Flow Diagram

```
User Interaction (click/input/scroll)
        │
        ▼
  Event Handler (in Component module)
        │
        ▼
  State.set(key, value)
        │
        ▼
  State.emit(key) ─────────────┐
        │                       │
        ▼                       ▼
  Subscribed Components    Charts.update()
  re-render affected DOM
        │
        ▼
  CSS transitions / requestAnimationFrame
  handle visual updates smoothly
```

### 3.4 Initialization Flow

```js
MuscleApp.init = () => {
  // 1. Register all component modules
  // 2. Set up Intersection Observer for scroll animations
  // 3. Initialize navigation (scroll spy, mobile menu)
  // 4. Pre-render body map SVG paths
  // 5. Initialize hero counters
  // 6. Set up body map event listeners
  // 7. Render explorer cards from data
  // 8. Initialize simulator sliders and presets
  // 9. Render dashboard charts (deferred until in viewport)
  // 10. Set up posture diagram interactions
  // 11. Initialize recovery wizard

  // Use IntersectionObserver to lazy-init heavy components
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = entry.target.id;
        MuscleApp.Components[section]?.activate?.();
        sectionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section').forEach(s => sectionObserver.observe(s));
};

document.addEventListener('DOMContentLoaded', MuscleApp.init);
```

---

## 4. SVG Body Map Approach

### 4.1 SVG Structure Strategy

The body map uses **inline SVG** within the HTML. Two SVG elements (front and back views), each with `viewBox="0 0 400 800"` for a tall portrait aspect ratio.

**Layer architecture within each SVG:**

```
<svg viewBox="0 0 400 800">
  <!-- Layer 1: Background body silhouette (non-interactive) -->
  <g class="body-outline" opacity="0.3">
    <path d="..." fill="#1a1d2b" stroke="#333"/>
  </g>

  <!-- Layer 2: Muscle region fills (interactive) -->
  <g class="muscle-regions">
    <g class="muscle-region" id="m-quadriceps" data-muscle="quadriceps"
       data-risk="rapid">
      <!-- Left quad -->
      <path d="M155,420 C150,440 148,490 152,530 L172,530 C178,490 180,440 175,420Z"/>
      <!-- Right quad -->
      <path d="M225,420 C220,440 218,490 222,530 L242,530 C248,490 250,440 245,420Z"/>
    </g>
    <!-- ... more muscle groups ... -->
  </g>

  <!-- Layer 3: Labels (optional, hidden on mobile) -->
  <g class="muscle-labels" aria-hidden="true">
    <text x="165" y="475" class="muscle-label">Cvadriceps</text>
  </g>

  <!-- Layer 4: Interactive hit areas (larger than visual, for touch) -->
  <g class="hit-areas" opacity="0">
    <!-- Larger invisible paths for easier touch targeting -->
  </g>
</svg>
```

### 4.2 SVG Path Creation Strategy

Muscle paths should be created by hand-tracing simplified anatomical shapes. Each muscle group is a `<g>` containing one or more `<path>` elements (for left/right symmetry).

**Key muscle regions and approximate positions (viewBox 400x800):**

| Muscle (Front)   | Approx Y range | Approx X center |
|------------------|----------------|-----------------|
| Deltoids         | 160-210        | 120, 280        |
| Pectorals        | 190-260        | 165, 235        |
| Biceps           | 220-300        | 110, 290        |
| Forearms         | 305-380        | 95, 305         |
| Abs              | 265-400        | 200             |
| Obliques         | 280-400        | 150, 250        |
| Hip Flexors      | 390-430        | 170, 230        |
| Quadriceps       | 420-560        | 165, 235        |
| Adductors        | 420-530        | 185, 215        |
| Tibialis         | 570-680        | 165, 235        |

| Muscle (Back)    | Approx Y range | Approx X center |
|------------------|----------------|-----------------|
| Trapezius        | 130-200        | 200             |
| Rear Deltoids    | 165-210        | 120, 280        |
| Rhomboids        | 200-270        | 200             |
| Lats             | 230-350        | 145, 255        |
| Erector Spinae   | 270-400        | 185, 215        |
| Triceps          | 220-310        | 105, 295        |
| Forearms (back)  | 310-385        | 95, 305         |
| Glutes           | 390-460        | 165, 235        |
| Hamstrings       | 440-570        | 160, 240        |
| Calves           | 580-700        | 165, 235        |

### 4.3 Interaction Behavior

```
Mouse/Touch on muscle region
  → highlight region (CSS class toggle)
  → show tooltip with muscle name (near cursor/touch point)
  → on click: open info panel (slide in from right)
  → on click same region: close panel
  → on click different region: update panel content with transition
  → panel close button: deactivate all highlights

Mobile: tap to select, tap outside to deselect
Desktop: hover for preview highlight, click for full info
```

---

## 5. Chart & Visualization Approach

### 5.1 Radar/Spider Chart (SVG-based)

```js
MuscleApp.Charts.Radar = {
  config: {
    cx: 250, cy: 250,      // center
    radius: 200,            // max radius
    levels: 5,              // concentric rings
    labelOffset: 20         // text offset from outer ring
  },

  // Axes = muscle groups (8 axes)
  // Datasets = activities (desk, walking, cycling, combined)

  render(svgElement, axes, datasets) {
    // 1. Draw concentric polygon rings (levels)
    //    Each ring is a <polygon> at radius * (level/totalLevels)
    //    Styled with subtle grid lines

    // 2. Draw axis lines from center to each vertex
    //    Each axis has a label at the outer end

    // 3. For each dataset, draw a <polygon> connecting
    //    data points along each axis
    //    Fill with semi-transparent activity color
    //    Stroke with solid activity color

    // 4. Draw data point dots at each vertex
    //    On hover, show value tooltip

    // 5. Animate polygon points from center on first render
    //    using CSS transition on polygon points attribute
    //    (or requestAnimationFrame for SVG point animation)
  }
};
```

**SVG structure for radar chart:**
```xml
<svg viewBox="0 0 500 500" class="radar-svg">
  <!-- Grid rings -->
  <g class="radar-grid">
    <polygon class="radar-ring" points="..."/>  <!-- 20% -->
    <polygon class="radar-ring" points="..."/>  <!-- 40% -->
    <polygon class="radar-ring" points="..."/>  <!-- 60% -->
    <polygon class="radar-ring" points="..."/>  <!-- 80% -->
    <polygon class="radar-ring" points="..."/>  <!-- 100% -->
  </g>
  <!-- Axis lines -->
  <g class="radar-axes">
    <line x1="250" y1="250" x2="250" y2="50"/>
    <!-- ... 7 more axes ... -->
  </g>
  <!-- Axis labels -->
  <g class="radar-labels">
    <text x="250" y="35">Picioare</text>
    <!-- ... -->
  </g>
  <!-- Data polygons -->
  <g class="radar-data">
    <polygon class="radar-area" data-activity="desk"
             points="..." fill="rgba(239,68,68,0.2)"
             stroke="var(--clr-activity-desk)"/>
    <polygon class="radar-area" data-activity="walking"
             points="..." fill="rgba(34,197,94,0.2)"
             stroke="var(--clr-activity-walking)"/>
    <!-- ... -->
  </g>
  <!-- Data points -->
  <g class="radar-points">
    <circle r="4" cx="..." cy="..." data-activity="desk"/>
    <!-- ... -->
  </g>
</svg>
```

### 5.2 Heatmap (CSS Grid)

```html
<div class="heatmap-grid" style="
  display: grid;
  grid-template-columns: 150px repeat(4, 1fr);
  grid-template-rows: 40px repeat(N, 50px);
  gap: 2px;
">
  <!-- Header row -->
  <div class="heatmap-header"></div>
  <div class="heatmap-header">Birou</div>
  <div class="heatmap-header">Mers</div>
  <div class="heatmap-header">Ciclism</div>
  <div class="heatmap-header">Combinat</div>

  <!-- Data rows (per muscle group) -->
  <div class="heatmap-row-label">Cvadriceps</div>
  <div class="heatmap-cell" style="--heat: 0.05;" data-value="5%"></div>
  <div class="heatmap-cell" style="--heat: 0.60;" data-value="60%"></div>
  <div class="heatmap-cell" style="--heat: 0.90;" data-value="90%"></div>
  <div class="heatmap-cell" style="--heat: 0.95;" data-value="95%"></div>
  <!-- ... more rows ... -->
</div>
```

**CSS for heatmap cell coloring:**
```css
.heatmap-cell {
  /* Interpolate color based on --heat custom property (0-1) */
  background: color-mix(
    in oklch,
    var(--clr-heat-0),
    var(--clr-heat-100) calc(var(--heat) * 100%)
  );
  /* Fallback for older browsers: */
  /* Use JS to set background directly via HSL interpolation */
}
```

For broader browser support, JS will compute HSL interpolation:
```js
function heatColor(value) {
  // value: 0-1
  // Interpolate through: dark blue → teal → yellow → orange → red
  const stops = [
    { pos: 0.0, h: 220, s: 30, l: 15 },
    { pos: 0.25, h: 160, s: 40, l: 25 },
    { pos: 0.50, h: 45,  s: 80, l: 50 },
    { pos: 0.75, h: 25,  s: 90, l: 50 },
    { pos: 1.0, h: 0,   s: 85, l: 55 }
  ];
  // Find surrounding stops and interpolate
  // Return `hsl(h, s%, l%)`
}
```

### 5.3 Ring Gauge (SVG Circular Progress)

Used for the Simulator health score display.

```js
// SVG circle with stroke-dasharray/stroke-dashoffset technique
// circumference = 2 * PI * radius
// offset = circumference * (1 - score/100)

function updateRingGauge(score) {
  const circle = document.querySelector('.score-ring__fill');
  const circumference = 2 * Math.PI * 85; // r=85
  const offset = circumference * (1 - score / 100);

  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = offset;

  // Color based on score
  const color = score > 75 ? '--clr-health-good' :
                score > 50 ? '--clr-health-fair' :
                score > 25 ? '--clr-health-poor' :
                             '--clr-health-critical';
  circle.style.stroke = `var(${color})`;
}
```

### 5.4 Horizontal Bar Charts

Used throughout (health bars, atrophy timeline bars, comparison mini-bars).

```css
.health-bar__fill {
  height: 100%;
  border-radius: var(--radius-full);
  transition: width var(--duration-slow) var(--ease-out),
              background-color var(--duration-slow) var(--ease-out);
  /* Width set via JS inline style */
  /* Color determined by value thresholds */
}
```

### 5.5 Timeline (SVG with Phases)

Recovery timeline rendered as an SVG with distinct phase segments:

```xml
<svg viewBox="0 0 800 120">
  <!-- Background track -->
  <rect x="40" y="50" width="720" height="8" rx="4" fill="var(--clr-bg-tertiary)"/>

  <!-- Phase segments (colored, positioned by week range) -->
  <rect x="40" y="50" width="180" height="8" rx="4" fill="var(--clr-risk-slow)"
        class="phase-segment" data-phase="1"/>
  <rect x="220" y="50" width="180" height="8" rx="4" fill="var(--clr-risk-moderate)"
        class="phase-segment" data-phase="2"/>
  <!-- ... -->

  <!-- Phase markers (circles at boundaries) -->
  <circle cx="40" cy="54" r="6" fill="white"/>
  <circle cx="220" cy="54" r="6" fill="white"/>
  <!-- ... -->

  <!-- Phase labels (above) -->
  <text x="130" y="35" text-anchor="middle" class="phase-label">
    Faza 1: Mobilitate
  </text>
  <!-- ... -->

  <!-- Week markers (below) -->
  <text x="40" y="85" text-anchor="middle" class="week-label">Sapt 0</text>
  <text x="220" y="85" text-anchor="middle" class="week-label">Sapt 2</text>
  <!-- ... -->

  <!-- Current progress indicator (animated) -->
  <circle cx="40" cy="54" r="10" fill="var(--clr-accent-primary)"
          class="progress-dot" opacity="0.8">
    <animate attributeName="cx" from="40" to="760" dur="3s"/>
  </circle>
</svg>
```

---

## 6. Animation Strategy

### 6.1 Scroll-Triggered Animations (Intersection Observer)

```js
MuscleApp.Animations = (() => {
  function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.dataset.delay || 0);

          setTimeout(() => {
            el.classList.add('visible');
          }, delay);

          observer.unobserve(el);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('[data-animate]').forEach(el => {
      observer.observe(el);
    });
  }

  return { initScrollAnimations };
})();
```

### 6.2 Animation Types

| Animation          | Technique           | Trigger          | Duration     |
|-------------------|---------------------|------------------|-------------|
| Title slide-up     | CSS transform+opacity | Scroll into view | 500ms, staggered |
| Counter increment  | JS requestAnimationFrame | Scroll into view | 2000ms       |
| Card fade-in       | CSS opacity+transform | Scroll into view | 300ms, staggered |
| Muscle highlight   | CSS filter+stroke   | Hover/click      | 200ms        |
| Info panel slide   | CSS transform(translateX) | Click muscle  | 300ms        |
| Health ring fill   | SVG stroke-dashoffset | Slider change   | 500ms        |
| Health bars        | CSS width           | Slider change    | 500ms        |
| Radar polygon      | SVG polygon points  | Tab change       | 600ms        |
| Heatmap cells      | CSS background      | Initial render   | 200ms stagger |
| Pain point pulse   | CSS @keyframes      | Always (loop)    | 2000ms       |
| Timeline progress  | SVG animate / JS rAF| Button click     | 3000ms       |
| Tab content swap   | CSS opacity+height  | Tab click        | 300ms        |
| Modal open/close   | CSS transform+opacity | Click           | 300ms        |
| Scroll indicator   | CSS @keyframes bounce | Always (loop)  | 1500ms       |

### 6.3 CSS Keyframe Definitions

```css
@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50%      { transform: scale(1.5); opacity: 0.4; }
}

@keyframes gradientShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(8px); }
}

@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}

@keyframes ringFill {
  from { stroke-dashoffset: var(--circumference); }
  to   { stroke-dashoffset: var(--target-offset); }
}
```

### 6.4 Counter Animation (Hero Stats)

```js
function animateCounter(element, target, decimals = 0, duration = 2000) {
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = start + (target - start) * eased;

    element.textContent = current.toFixed(decimals);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}
```

---

## 7. Muscle Data Schema

### 7.1 Complete Data Structure

```js
MuscleApp.Data = {
  muscles: [
    {
      id: 'quadriceps',
      nameRo: 'Cvadriceps',
      nameLatin: 'Quadriceps femoris',
      group: 'legs',
      location: ['front'],
      svgId: 'm-quadriceps',
      functionRo: 'Extensia genunchiului, stabilizarea mersului, urcat scari',
      atrophyRate: 'rapid',
      atrophyRateNumeric: 0.9,           // 0-1, higher = faster atrophy
      atrophyTimeline: {
        noticeable: 2,                     // weeks
        significant: 6,
        severe: 12
      },
      recovery: {
        mild:     { weeks: '2-4',  label: 'Usoara' },
        moderate: { weeks: '6-12', label: 'Moderata' },
        severe:   { weeks: '12-24', label: 'Severa' }
      },
      deskWorkerRisk: 0.85,               // 0-1
      activityActivation: {
        desk:     0.05,
        walking:  0.60,
        cycling:  0.90,
        combined: 0.95
      },
      posturalImpact: [
        'Slabiciune genunchi',
        'Dificultate la ridicare din scaun',
        'Instabilitate la mers'
      ],
      exercises: [
        { name: 'Genuflexiuni', sets: '3x12', difficulty: 'medie' },
        { name: 'Fandari', sets: '3x10/picior', difficulty: 'medie' },
        { name: 'Extensii picioare', sets: '3x15', difficulty: 'usoara' },
        { name: 'Step-ups', sets: '3x10/picior', difficulty: 'usoara' }
      ]
    },
    // ... 19 more muscle entries following this schema:
    // glutes, hamstrings, calves, tibialis, adductors, hip-flexors,
    // abs, obliques, erector-spinae, lats, rhomboids, trapezius,
    // deltoids, pectorals, biceps, triceps, forearms,
    // (grouped variants as needed)
  ],

  // Preset activity profiles for simulator
  presets: {
    'desk-worker': { sitting: 10, walking: 15, cycling: 0, exercise: 0 },
    'walker':      { sitting: 7,  walking: 60, cycling: 0, exercise: 0 },
    'cyclist':     { sitting: 7,  walking: 20, cycling: 45, exercise: 0 },
    'active':      { sitting: 5,  walking: 45, cycling: 30, exercise: 4 }
  },

  // Posture problem definitions
  postureProblems: [
    {
      id: 'neck',
      nameRo: 'Zona Cervicala (Gatul Inainte)',
      severity: 'high',          // high, medium, low
      description: 'Flexia excesiva a gatului catre ecran...',
      affectedMuscles: ['trapezius', 'deltoids'],
      exercises: [
        { name: 'Chin Tucks', reps: '3x15', freq: 'zilnic' },
        { name: 'Rotatii gat', reps: '2x10/directie', freq: 'zilnic' }
      ],
      svgPosition: { x: 250, y: 120 }    // position on posture SVG
    },
    // ... more posture problems
  ],

  // Recovery phase templates
  recoveryPhases: [
    {
      phase: 1,
      nameRo: 'Mobilitate & Activare',
      weekRange: [1, 2],
      description: 'Refacerea amplitudinii de miscare...',
      intensity: 'usoara',
      frequency: '3-4x/saptamana'
    },
    {
      phase: 2,
      nameRo: 'Forta de Baza',
      weekRange: [3, 4],
      description: 'Exercitii izometrice si cu greutatea corpului...',
      intensity: 'moderata',
      frequency: '3-4x/saptamana'
    },
    {
      phase: 3,
      nameRo: 'Forta Progresiva',
      weekRange: [5, 8],
      description: 'Cresterea progresiva a incarcaturii...',
      intensity: 'moderata-ridicata',
      frequency: '4-5x/saptamana'
    },
    {
      phase: 4,
      nameRo: 'Mentinere & Prevenire',
      weekRange: [9, null],             // ongoing
      description: 'Program regulat de mentinere...',
      intensity: 'variata',
      frequency: '3-5x/saptamana'
    }
  ]
};
```

---

## 8. Simulator Calculation Engine

### 8.1 Health Score Algorithm

```js
MuscleApp.Components.Simulator = (() => {

  /**
   * Calculate health score for a single muscle group
   * based on lifestyle parameters.
   *
   * @param {Object} muscle - Muscle data object
   * @param {Object} params - { sitting, walking, cycling, exercise }
   * @param {number} weeks  - Projection timeline in weeks
   * @returns {number} 0-100 health score
   */
  function calculateMuscleHealth(muscle, params, weeks) {
    // Base degradation from sitting
    // More sitting = more degradation, with diminishing returns
    const sittingFactor = 1 - Math.exp(-params.sitting / 8);
    const baseDegradation = sittingFactor * muscle.atrophyRateNumeric;

    // Activity benefit (each activity provides partial protection)
    const walkBenefit = (params.walking / 60) * muscle.activityActivation.walking;
    const cycleBenefit = (params.cycling / 60) * muscle.activityActivation.cycling;
    const exerciseBenefit = (params.exercise / 5) * 0.4; // exercise is a strong protector

    // Total activity protection (capped at 1.0)
    const activityProtection = Math.min(
      walkBenefit + cycleBenefit + exerciseBenefit,
      1.0
    );

    // Net degradation rate per week
    const netDegradation = Math.max(0, baseDegradation - activityProtection);

    // Apply over time (exponential decay model)
    const healthScore = 100 * Math.exp(-netDegradation * weeks * 0.05);

    return Math.round(Math.max(0, Math.min(100, healthScore)));
  }

  /**
   * Calculate overall health score (weighted average of all groups)
   */
  function calculateOverallHealth(params, weeks) {
    const muscles = MuscleApp.Data.muscles;
    let totalWeight = 0;
    let weightedSum = 0;

    // Weight by muscle group size/importance
    const groupWeights = {
      legs: 1.2, back: 1.1, core: 1.0,
      glutes: 1.0, shoulders: 0.8, arms: 0.7, chest: 0.8
    };

    muscles.forEach(m => {
      const weight = groupWeights[m.group] || 1.0;
      const score = calculateMuscleHealth(m, params, weeks);
      weightedSum += score * weight;
      totalWeight += weight;
    });

    return Math.round(weightedSum / totalWeight);
  }

  return { calculateMuscleHealth, calculateOverallHealth };
})();
```

---

## 9. Responsive Strategy

### 9.1 Breakpoint-Specific Layouts

| Section        | Mobile (<640px)       | Tablet (640-1024px)  | Desktop (>1024px)     |
|---------------|----------------------|----------------------|----------------------|
| Nav           | Hamburger menu       | Hamburger menu       | Horizontal links     |
| Hero          | Stack, smaller title | Stack, medium title  | Side-by-side stats   |
| Body Map      | Full width SVG, panel below | SVG + side panel | SVG + side panel    |
| Explorer      | 1-col cards, horizontal scroll tabs | 2-col cards | 3-col cards     |
| Simulator     | Stacked: controls then output | Side by side | Side by side wide |
| Dashboard     | Vertical stack cards, charts scroll | 2x2 cards, stacked charts | Full row cards, side-by-side charts |
| Posture       | Diagram above, details below | Side by side | Side by side wide |
| Recovery      | Full-width steps     | Centered steps       | Centered steps       |

### 9.2 Touch Adaptations

```css
/* Larger touch targets on mobile */
@media (max-width: 640px) {
  .muscle-region {
    /* SVG paths get invisible expanded hit area via stroke-width */
    stroke-width: 8;
    stroke: transparent;
  }

  .range-slider::-webkit-slider-thumb {
    width: 28px;
    height: 28px;
  }

  .chip, .btn {
    min-height: 44px;     /* iOS minimum touch target */
    min-width: 44px;
  }
}
```

### 9.3 Body Map Mobile Behavior

On mobile (< 768px):
- Body SVG takes full container width
- Info panel slides up from bottom (bottom sheet pattern) instead of from right
- Pinch-to-zoom disabled (SVG scales via viewBox)
- Tap to select muscle, tap elsewhere to deselect

```css
@media (max-width: 768px) {
  .muscle-info-panel {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: auto;
    max-height: 60vh;
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
    transform: translateY(100%);
    transition: transform var(--duration-normal) var(--ease-out);
  }
  .muscle-info-panel[aria-hidden="false"] {
    transform: translateY(0);
  }
}
```

---

## 10. Accessibility Considerations

```
- All interactive elements keyboard-focusable (tabindex where needed)
- ARIA roles: tablist/tab/tabpanel, dialog, tooltip
- ARIA states: aria-selected, aria-expanded, aria-hidden, aria-live
- SVG muscle regions: role="button", aria-label with muscle name
- Color not sole indicator: risk badges include text labels
- Prefers-reduced-motion: disable animations
- Focus-visible styling for keyboard navigation
- Semantic HTML (section, nav, article, aside, header, footer)
- Screen reader announcements for dynamic content (aria-live="polite")
```

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 11. Performance Considerations

```
- Lazy initialization: Heavy components (charts, heatmap) init only when scrolled into view
- SVG optimization: Simplify paths, minimize points, use transform for symmetry
- Event delegation: Single listener on parent containers, not per-element
- Debounce slider input: 16ms (one frame) debounce on range slider handlers
- CSS containment: `contain: layout style paint` on section elements
- Will-change: Apply sparingly to elements about to animate
- Passive event listeners: { passive: true } on scroll/touch handlers
- No layout thrashing: Batch DOM reads before writes
- requestAnimationFrame for visual updates
- Single rAF loop for simultaneous animations (avoid multiple rAF calls)
```

---

## 12. File Size Budget

| Component             | Estimated Size |
|-----------------------|---------------|
| HTML structure        | ~15 KB        |
| CSS (all styles)      | ~25 KB        |
| JS (all modules)      | ~40 KB        |
| SVG body maps (inline)| ~20 KB        |
| Muscle data (inline)  | ~12 KB        |
| **Total (uncompressed)** | **~112 KB** |
| **Total (minified)**  | **~70 KB**    |
| **Total (gzipped)**   | **~25 KB**    |

External CDN loads:
- Google Fonts (Inter): ~30 KB
- Phosphor Icons (subset): ~15 KB

---

## 13. Development Phases

### Phase 1: Foundation
- HTML skeleton with all sections
- CSS design tokens and base styles
- JS module scaffolding and State system
- Navigation with scroll spy

### Phase 2: Body Map
- SVG creation (front and back views)
- Muscle region interaction (hover, click, highlight)
- Info panel with data population
- Front/back toggle

### Phase 3: Explorer & Data
- Complete muscle data population
- Card rendering from data
- Tab navigation and filtering
- Search functionality
- Sort options

### Phase 4: Simulator
- Slider controls with real-time output
- Health score calculation engine
- Ring gauge and health bars
- Preset profiles
- Timeline animation
- Before/after comparison mini body maps

### Phase 5: Dashboard & Charts
- Radar chart renderer
- Heatmap renderer
- Comparison cards
- Chart tab views

### Phase 6: Posture & Recovery
- Posture SVG diagram
- Pain point interactions
- Recovery step wizard
- Plan generation algorithm
- Recovery timeline visualization
- Export functionality (generate text summary)

### Phase 7: Polish
- All scroll animations
- Counter animations
- Responsive testing and fixes
- Performance optimization
- Accessibility audit
- Edge case handling
