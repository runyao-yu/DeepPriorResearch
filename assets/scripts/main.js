import { siteContent } from "./site-data.js";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function hydrateCopy() {
  document.querySelectorAll("[data-site-name]").forEach((node) => {
    node.textContent = siteContent.brand.name;
  });

  const tagline = document.querySelector("[data-tagline]");
  const eyebrow = document.querySelector("[data-committee-eyebrow]");
  const title = document.querySelector("[data-committee-title]");
  const description = document.querySelector("[data-committee-description]");
  const footerNote = document.querySelector("[data-footer-note]");
  const researchEyebrow = document.querySelector("[data-research-eyebrow]");
  const researchTitle = document.querySelector("[data-research-title]");
  const researchDescription = document.querySelector("[data-research-description]");
  const analysisEyebrow = document.querySelector("[data-analysis-eyebrow]");
  const analysisTitle = document.querySelector("[data-analysis-title]");
  const analysisDescription = document.querySelector("[data-analysis-description]");

  if (tagline) {
    tagline.textContent = siteContent.brand.tagline;
  }

  if (eyebrow) {
    eyebrow.textContent = siteContent.committee.eyebrow;
  }

  if (title) {
    title.textContent = siteContent.committee.title;
  }

  if (description) {
    description.textContent = siteContent.committee.description;
  }

  if (footerNote) {
    footerNote.textContent = siteContent.brand.footerNote;
  }

  if (researchEyebrow) {
    researchEyebrow.textContent = siteContent.research.eyebrow;
  }

  if (researchTitle) {
    researchTitle.textContent = siteContent.research.title;
  }

  if (researchDescription) {
    researchDescription.textContent = siteContent.research.description;
  }

  if (analysisEyebrow) {
    analysisEyebrow.textContent = siteContent.analysis.eyebrow;
  }

  if (analysisTitle) {
    analysisTitle.textContent = siteContent.analysis.title;
  }

  if (analysisDescription) {
    analysisDescription.textContent = siteContent.analysis.description;
  }
}

function createPortrait(member) {
  const portrait = document.createElement("div");
  portrait.className = "member-card__portrait";

  if (member.image) {
    const image = document.createElement("img");
    image.src = member.image;
    image.alt = `${member.name} portrait`;
    image.loading = "lazy";
    portrait.append(image);
    return portrait;
  }

  const initials = document.createElement("span");
  initials.className = "member-card__initials";
  initials.textContent = member.initials;
  portrait.append(initials);
  return portrait;
}

function createMemberCard(member, index) {
  const card = document.createElement("article");
  card.className = "member-card";
  card.style.setProperty("--delay", `${index * 90}ms`);

  const body = document.createElement("div");
  body.className = "member-card__body";

  const role = document.createElement("p");
  role.className = "member-card__role";
  role.textContent = member.role;

  const name = document.createElement("h3");
  name.className = "member-card__name";
  name.textContent = member.name;

  const bio = document.createElement("p");
  bio.className = "member-card__bio";
  bio.id = `member-bio-${index}`;
  bio.textContent = member.bio;

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "member-card__toggle";
  toggle.textContent = "Read more";
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-controls", bio.id);
  toggle.hidden = true;

  body.append(role, name, bio, toggle);
  card.append(createPortrait(member), body);

  return card;
}

function renderCommittee() {
  const grid = document.querySelector("#team-grid");

  if (!grid) {
    return;
  }

  const fragment = document.createDocumentFragment();

  siteContent.committee.members.forEach((member, index) => {
    fragment.append(createMemberCard(member, index));
  });

  grid.replaceChildren(fragment);
}

function createFigurePanel(figure, paperTitle, figureIndex) {
  const frame = document.createElement("figure");
  frame.className = "paper-figure";

  const mediaFrame = document.createElement("div");
  mediaFrame.className = "paper-figure__frame";

  if (figure.image) {
    const image = document.createElement("img");
    image.className = "paper-figure__media";
    image.src = figure.image;
    image.alt = `${paperTitle} ${figure.title}`;
    image.loading = "lazy";
    mediaFrame.append(image);
  } else {
    const placeholder = document.createElement("div");
    placeholder.className = "paper-figure__placeholder";
    placeholder.textContent = String(figureIndex + 1).padStart(2, "0");
    mediaFrame.append(placeholder);
  }

  const caption = document.createElement("figcaption");
  caption.className = "paper-figure__caption";
  caption.textContent = figure.title;
  frame.append(mediaFrame, caption);

  return frame;
}

function createResearchCard(paper, index) {
  const card = document.createElement("article");
  card.className = "paper-card";
  card.style.setProperty("--delay", `${index * 110}ms`);

  const intro = document.createElement("div");
  intro.className = "paper-card__intro";

  const indexLabel = document.createElement("p");
  indexLabel.className = "paper-card__index";
  indexLabel.textContent = `Paper ${String(index + 1).padStart(2, "0")}`;

  const title = document.createElement("h3");
  title.className = "paper-card__title";
  title.textContent = paper.title;

  const authors = document.createElement("p");
  authors.className = "paper-card__authors";
  authors.textContent = paper.authors;

  const abstractLabel = document.createElement("p");
  abstractLabel.className = "paper-card__abstract-label";
  abstractLabel.textContent = "Abstract";

  const abstract = document.createElement("p");
  abstract.className = "paper-card__abstract";
  abstract.textContent = paper.abstract ?? "";

  const meta = document.createElement("div");
  meta.className = "paper-card__meta";

  const journal = document.createElement("span");
  journal.className = "paper-chip";
  journal.textContent = paper.journal;

  const year = document.createElement("span");
  year.className = "paper-chip";
  year.textContent = paper.year;

  const dataLink = document.createElement("a");
  dataLink.className = "paper-chip paper-chip--link";
  dataLink.href = paper.dataUrl;
  dataLink.target = "_blank";
  dataLink.rel = "noreferrer";
  dataLink.textContent = "Data";
  dataLink.setAttribute("aria-label", `${paper.title} data`);

  const codeLink = document.createElement("a");
  codeLink.className = "paper-chip paper-chip--link";
  codeLink.href = paper.codeUrl;
  codeLink.target = "_blank";
  codeLink.rel = "noreferrer";
  codeLink.textContent = "Code";
  codeLink.setAttribute("aria-label", `${paper.title} code`);

  const paperLink = document.createElement("a");
  paperLink.className = "paper-chip paper-chip--link";
  paperLink.href = paper.paperUrl;
  paperLink.target = "_blank";
  paperLink.rel = "noreferrer";
  paperLink.textContent = "Link";
  paperLink.setAttribute("aria-label", `${paper.title} paper link`);

  const citationButton = document.createElement("button");
  citationButton.type = "button";
  citationButton.className = "paper-chip paper-chip--button";
  citationButton.textContent = "Citation";
  citationButton.dataset.defaultLabel = "Citation";
  citationButton.dataset.bibtex = paper.bibtex;
  citationButton.setAttribute("aria-label", `${paper.title} citation`);

  meta.append(journal, year, paperLink, dataLink, codeLink, citationButton);
  intro.append(indexLabel, title, authors, abstractLabel, abstract, meta);

  const figures = document.createElement("div");
  figures.className = "paper-card__figures";

  const primaryFigure = paper.figures?.[0] ?? {
    title: "Figure 01",
    image: "",
  };

  figures.append(createFigurePanel(primaryFigure, paper.title, 0));

  card.append(intro, figures);

  return card;
}

function renderResearch() {
  const list = document.querySelector("#research-list");

  if (!list) {
    return;
  }

  const fragment = document.createDocumentFragment();

  siteContent.research.papers.forEach((paper, index) => {
    fragment.append(createResearchCard(paper, index));
  });

  list.replaceChildren(fragment);
}

function createAnalysisTag(label, value) {
  const tag = document.createElement("div");
  tag.className = "analysis-tag";

  const tagLabel = document.createElement("span");
  tagLabel.className = "analysis-tag__label";
  tagLabel.textContent = label;

  const tagValue = document.createElement("span");
  tagValue.className = "analysis-tag__value";
  tagValue.textContent = value;

  tag.append(tagLabel, tagValue);
  return tag;
}

function createAnalysisFigure(figure, summary, index) {
  const frame = document.createElement("figure");
  frame.className = "analysis-figure";

  const mediaFrame = document.createElement("div");
  mediaFrame.className = "analysis-figure__frame";

  const image = document.createElement("img");
  image.className = "analysis-figure__media";
  image.src = figure.image;
  image.alt = `${summary} figure ${index + 1}`;
  image.loading = "lazy";
  mediaFrame.append(image);

  frame.append(mediaFrame);

  if (figure.title) {
    const caption = document.createElement("figcaption");
    caption.className = "analysis-figure__caption";
    caption.textContent = figure.title;
    frame.append(caption);
  }

  return frame;
}

function createAnalysisCard(post, index) {
  const card = document.createElement("article");
  card.className = "analysis-card";
  card.style.setProperty("--delay", `${index * 90}ms`);

  const masthead = document.createElement("div");
  masthead.className = "analysis-card__masthead";

  const indexLabel = document.createElement("p");
  indexLabel.className = "analysis-card__index";
  indexLabel.textContent = `Post ${String(index + 1).padStart(2, "0")}`;

  const tags = document.createElement("div");
  tags.className = "analysis-card__tags";

  const tagEntries = [
    ["Date", post.date],
    ["Country", post.country],
    ["Feature", post.feature],
  ].filter(([, value]) => Boolean(value));

  tagEntries.forEach(([label, value]) => {
    tags.append(createAnalysisTag(label, value));
  });

  masthead.append(indexLabel, tags);

  const summary = document.createElement("h3");
  summary.className = "analysis-card__summary";
  summary.textContent = post.summary;

  const details = document.createElement("p");
  details.className = "analysis-card__details";
  details.textContent = post.details;

  card.append(masthead, summary, details);

  const figures = (post.figures ?? []).filter((figure) => figure?.image).slice(0, 4);

  if (figures.length) {
    const gallery = document.createElement("div");
    gallery.className = "analysis-card__figures";

    figures.forEach((figure, figureIndex) => {
      gallery.append(createAnalysisFigure(figure, post.summary, figureIndex));
    });

    card.append(gallery);
  }

  return card;
}

function renderAnalysis() {
  const list = document.querySelector("#analysis-list");

  if (!list) {
    return;
  }

  const fragment = document.createDocumentFragment();

  siteContent.analysis.posts.forEach((post, index) => {
    fragment.append(createAnalysisCard(post, index));
  });

  list.replaceChildren(fragment);
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function setupResearchActions() {
  const list = document.querySelector("#research-list");

  if (!(list instanceof HTMLElement)) {
    return;
  }

  list.addEventListener("click", async (event) => {
    const target = event.target;

    if (!(target instanceof HTMLButtonElement) || !target.classList.contains("paper-chip--button")) {
      return;
    }

    const bibtex = target.dataset.bibtex;
    const defaultLabel = target.dataset.defaultLabel ?? "Citation";

    if (!bibtex) {
      return;
    }

    const resetTimer = target.dataset.resetTimer;

    if (resetTimer) {
      window.clearTimeout(Number(resetTimer));
    }

    try {
      await copyText(bibtex);
      target.textContent = "Copied BibTeX";
      target.classList.add("is-copied");
    } catch {
      target.textContent = "Copy Failed";
      target.classList.remove("is-copied");
    }

    const timeoutId = window.setTimeout(() => {
      target.textContent = defaultLabel;
      target.classList.remove("is-copied");
      delete target.dataset.resetTimer;
    }, 1800);

    target.dataset.resetTimer = String(timeoutId);
  });
}

function syncCommitteeBios() {
  const cards = document.querySelectorAll(".member-card");

  cards.forEach((card) => {
    const bio = card.querySelector(".member-card__bio");
    const toggle = card.querySelector(".member-card__toggle");

    if (!(bio instanceof HTMLElement) || !(toggle instanceof HTMLButtonElement)) {
      return;
    }

    const isExpanded = card.classList.contains("is-expanded");

    if (isExpanded) {
      toggle.hidden = false;
      toggle.textContent = "Show less";
      toggle.setAttribute("aria-expanded", "true");
      bio.tabIndex = 0;
      return;
    }

    const hasOverflow = bio.scrollHeight > bio.clientHeight + 1;
    toggle.hidden = !hasOverflow;
    toggle.textContent = "Read more";
    toggle.setAttribute("aria-expanded", "false");
    bio.tabIndex = -1;
  });
}

function setupCommitteeToggles() {
  const grid = document.querySelector("#team-grid");

  if (!(grid instanceof HTMLElement)) {
    return;
  }

  grid.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof HTMLButtonElement) || !target.classList.contains("member-card__toggle")) {
      return;
    }

    const card = target.closest(".member-card");

    if (!(card instanceof HTMLElement)) {
      return;
    }

    const bio = card.querySelector(".member-card__bio");

    if (!(bio instanceof HTMLElement)) {
      return;
    }

    const isExpanded = card.classList.toggle("is-expanded");
    target.textContent = isExpanded ? "Show less" : "Read more";
    target.setAttribute("aria-expanded", isExpanded ? "true" : "false");
    bio.scrollTop = 0;
    bio.tabIndex = isExpanded ? 0 : -1;

    if (isExpanded) {
      card.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "nearest",
      });
    }

    requestAnimationFrame(syncCommitteeBios);
  });

  const handleResize = () => syncCommitteeBios();
  window.addEventListener("resize", handleResize, { passive: true });

  requestAnimationFrame(syncCommitteeBios);
}

function setupReveal() {
  const targets = [
    ...document.querySelectorAll(".reveal"),
    ...document.querySelectorAll(".member-card"),
    ...document.querySelectorAll(".paper-card"),
    ...document.querySelectorAll(".analysis-card"),
  ];

  if (!targets.length) {
    return;
  }

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    targets.forEach((target) => target.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -48px 0px",
    },
  );

  targets.forEach((target) => observer.observe(target));
}

function mountPriceCanvas() {
  const canvas = document.querySelector("#price-canvas");

  if (!(canvas instanceof HTMLCanvasElement)) {
    return;
  }

  const context = canvas.getContext("2d");

  if (!context) {
    return;
  }

  const state = {
    width: 0,
    height: 0,
    dpr: 1,
    stars: [],
    dust: [],
    sampleXs: new Float32Array(0),
    sampleRatios: new Float32Array(0),
    seriesYs: [],
    backdropGradient: null,
    frameId: 0,
    heroInView: true,
  };

  const series = [
    {
      base: 0.64,
      amplitude: 0.11,
      swing: 10,
      micro: 34,
      speed: 0.00024,
      pulse: 0.12,
      width: 2.4,
      color: "rgba(255, 255, 255, 0.96)",
      glow: "rgba(255, 255, 255, 0.22)",
      phase: 0.35,
    },
    {
      base: 0.54,
      amplitude: 0.085,
      swing: 8.5,
      micro: 26,
      speed: 0.00018,
      pulse: 0.085,
      width: 1.6,
      color: "rgba(255, 255, 255, 0.38)",
      glow: "rgba(255, 255, 255, 0.12)",
      phase: 1.65,
    },
    {
      base: 0.46,
      amplitude: 0.07,
      swing: 6.5,
      micro: 22,
      speed: 0.00012,
      pulse: 0.06,
      width: 1.15,
      color: "rgba(255, 255, 255, 0.2)",
      glow: "rgba(255, 255, 255, 0.08)",
      phase: 3.1,
    },
    {
      base: 0.38,
      amplitude: 0.052,
      swing: 5.4,
      micro: 18,
      speed: 0.00009,
      pulse: 0.04,
      width: 0.85,
      color: "rgba(255, 255, 255, 0.11)",
      glow: "rgba(255, 255, 255, 0.04)",
      phase: 4.35,
    },
  ];

  function buildStars() {
    const count = Math.max(28, Math.floor(state.width / 18));
    const dustCount = Math.max(16, Math.floor(state.width / 38));

    state.stars = Array.from({ length: count }, () => ({
      x: Math.random() * state.width,
      y: Math.random() * state.height,
      radius: Math.random() * 1.5 + 0.2,
      alpha: Math.random() * 0.5 + 0.08,
      speed: Math.random() * 0.05 + 0.018,
    }));

    state.dust = Array.from({ length: dustCount }, () => ({
      x: state.width * (0.28 + Math.random() * 0.44),
      y: state.height * (0.17 + Math.random() * 0.26),
      radius: Math.random() * 1.1 + 0.18,
      alpha: Math.random() * 0.18 + 0.03,
      driftX: Math.random() * 0.0007 + 0.00025,
      driftY: Math.random() * 0.0006 + 0.00018,
      swing: Math.random() * 16 + 6,
    }));
  }

  function buildSeriesBuffers() {
    const sampleCount = Math.floor((state.width + 16) / 14) + 1;
    state.sampleXs = new Float32Array(sampleCount);
    state.sampleRatios = new Float32Array(sampleCount);
    state.seriesYs = series.map(() => new Float32Array(sampleCount));

    for (let index = 0; index < sampleCount; index += 1) {
      const x = index * 14;
      state.sampleXs[index] = x;
      state.sampleRatios[index] = state.width ? x / state.width : 0;
    }
  }

  function buildBackdropGradient() {
    const radial = context.createRadialGradient(
      state.width * 0.5,
      state.height * 0.38,
      0,
      state.width * 0.5,
      state.height * 0.38,
      state.width * 0.5,
    );
    radial.addColorStop(0, "rgba(255, 255, 255, 0.1)");
    radial.addColorStop(1, "rgba(255, 255, 255, 0)");
    state.backdropGradient = radial;
  }

  function resizeCanvas() {
    const bounds = canvas.getBoundingClientRect();
    state.width = bounds.width || window.innerWidth;
    state.height = bounds.height || window.innerHeight;
    state.dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(state.width * state.dpr);
    canvas.height = Math.round(state.height * state.dpr);
    context.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);

    buildStars();
    buildSeriesBuffers();
    buildBackdropGradient();
    drawFrame(performance.now());
  }

  function drawBackdrop() {
    context.clearRect(0, 0, state.width, state.height);

    context.fillStyle = "#020202";
    context.fillRect(0, 0, state.width, state.height);

    context.fillStyle = state.backdropGradient ?? "#020202";
    context.fillRect(0, 0, state.width, state.height);
  }

  function drawStars(time) {
    context.save();

    state.stars.forEach((star) => {
      const travel = (star.x - time * star.speed) % (state.width + 40);
      const x = travel < -20 ? travel + state.width + 60 : travel + 20;
      const alpha = star.alpha * (0.68 + 0.32 * Math.sin(time * 0.002 + star.y));

      context.beginPath();
      context.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      context.arc(x, star.y, star.radius, 0, Math.PI * 2);
      context.fill();
    });

    context.restore();
  }

  function drawDust(time) {
    context.save();

    state.dust.forEach((particle) => {
      const x = particle.x + Math.sin(time * particle.driftX + particle.y) * particle.swing;
      const y =
        particle.y + Math.cos(time * particle.driftY + particle.x) * (particle.swing * 0.45);
      const alpha = particle.alpha * (0.7 + 0.3 * Math.sin(time * 0.0018 + particle.x));

      context.beginPath();
      context.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      context.arc(x, y, particle.radius, 0, Math.PI * 2);
      context.fill();
    });

    context.restore();
  }

  function drawSweep(time) {
    const sweepX = (time * 0.06) % (state.width * 1.25) - state.width * 0.2;
    const gradient = context.createLinearGradient(sweepX, 0, sweepX + 180, 0);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
    gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.05)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

    context.fillStyle = gradient;
    context.fillRect(0, 0, state.width, state.height);
  }

  function getSeriesY(line, ratio, time) {
    const primaryWave = Math.sin(ratio * line.swing + time * line.speed + line.phase) * line.amplitude;
    const microWave =
      Math.sin(ratio * line.micro + time * line.speed * 3.7 + line.phase * 1.85) * 0.018;
    const drift =
      Math.cos(ratio * 14 + time * line.speed * 1.3 + line.phase * 1.2) * 0.015;
    const pulseCenter = (time * line.speed * 0.09 + line.phase * 0.11) % 1;
    const pulse = Math.exp(-((ratio - pulseCenter) ** 2) / 0.0024) * line.pulse;

    return state.height * (line.base - primaryWave - microWave - drift - pulse);
  }

  function updateSeriesSamples(time) {
    for (let lineIndex = 0; lineIndex < series.length; lineIndex += 1) {
      const line = series[lineIndex];
      const yValues = state.seriesYs[lineIndex];

      for (let pointIndex = 0; pointIndex < state.sampleXs.length; pointIndex += 1) {
        yValues[pointIndex] = getSeriesY(line, state.sampleRatios[pointIndex], time);
      }
    }
  }

  function drawSeries(line, yValues, index) {
    if (!yValues.length) {
      return;
    }

    if (index === 0) {
      const fill = context.createLinearGradient(0, state.height * 0.24, 0, state.height);
      fill.addColorStop(0, "rgba(255, 255, 255, 0.12)");
      fill.addColorStop(1, "rgba(255, 255, 255, 0)");

      context.beginPath();
      context.moveTo(state.sampleXs[0], yValues[0]);
      for (let index = 1; index < state.sampleXs.length; index += 1) {
        context.lineTo(state.sampleXs[index], yValues[index]);
      }
      context.lineTo(state.width, state.height + 40);
      context.lineTo(0, state.height + 40);
      context.closePath();
      context.fillStyle = fill;
      context.fill();
    }

    context.save();
    context.beginPath();
    context.moveTo(state.sampleXs[0], yValues[0]);
    for (let index = 1; index < state.sampleXs.length; index += 1) {
      context.lineTo(state.sampleXs[index], yValues[index]);
    }
    context.lineWidth = line.width;
    context.strokeStyle = line.color;
    context.shadowBlur = 24;
    context.shadowColor = line.glow;
    context.stroke();
    context.restore();
  }

  function drawMarker(line, time) {
    const ratio = (time * line.speed * 0.09 + line.phase * 0.11) % 1;
    const x = state.width * ratio;
    const y = getSeriesY(line, ratio, time);

    context.save();
    context.beginPath();
    context.fillStyle = "rgba(255, 255, 255, 0.95)";
    context.shadowBlur = 28;
    context.shadowColor = "rgba(255, 255, 255, 0.3)";
    context.arc(x, y, 3.2, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }

  function drawFrame(time) {
    const normalizedTime = time % 600000;

    drawBackdrop();
    drawStars(normalizedTime);
    drawDust(normalizedTime);
    drawSweep(normalizedTime);
    updateSeriesSamples(normalizedTime);

    series.forEach((line, index) => {
      drawSeries(line, state.seriesYs[index], index);
    });

    drawMarker(series[0], normalizedTime);
  }

  function animate(time) {
    drawFrame(time);
    state.frameId = window.requestAnimationFrame(animate);
  }

  function stopAnimation() {
    if (!state.frameId) {
      return;
    }

    window.cancelAnimationFrame(state.frameId);
    state.frameId = 0;
  }

  function startAnimation() {
    if (prefersReducedMotion || state.frameId || document.hidden || !state.heroInView) {
      return;
    }

    state.frameId = window.requestAnimationFrame(animate);
  }

  function handleVisibilityChange() {
    if (prefersReducedMotion) {
      return;
    }

    if (document.hidden) {
      stopAnimation();
      return;
    }

    startAnimation();
  }

  window.addEventListener("resize", resizeCanvas, { passive: true });
  document.addEventListener("visibilitychange", handleVisibilityChange);

  const heroSection = canvas.closest(".hero");

  if (heroSection instanceof HTMLElement && "IntersectionObserver" in window) {
    const heroObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        state.heroInView = entry?.isIntersecting ?? true;

        if (state.heroInView) {
          drawFrame(performance.now());
          startAnimation();
          return;
        }

        stopAnimation();
      },
      {
        threshold: 0.02,
      },
    );

    heroObserver.observe(heroSection);
  }

  resizeCanvas();

  if (prefersReducedMotion) {
    drawFrame(performance.now());
    return;
  }

  startAnimation();
}

hydrateCopy();
renderCommittee();
renderResearch();
renderAnalysis();
setupCommitteeToggles();
setupResearchActions();
setupReveal();
mountPriceCanvas();
