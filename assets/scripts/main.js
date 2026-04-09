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
  bio.textContent = member.bio;

  body.append(role, name, bio);
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

function setupReveal() {
  const targets = [
    ...document.querySelectorAll(".reveal"),
    ...document.querySelectorAll(".member-card"),
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
    frameId: 0,
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

  function resizeCanvas() {
    const bounds = canvas.getBoundingClientRect();
    state.width = bounds.width || window.innerWidth;
    state.height = bounds.height || window.innerHeight;
    state.dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(state.width * state.dpr);
    canvas.height = Math.round(state.height * state.dpr);
    context.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);

    buildStars();
    drawFrame(performance.now());
  }

  function drawBackdrop() {
    context.clearRect(0, 0, state.width, state.height);

    context.fillStyle = "#020202";
    context.fillRect(0, 0, state.width, state.height);

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

    context.fillStyle = radial;
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

  function getSeriesY(line, x, time) {
    const ratio = x / state.width;
    const primaryWave = Math.sin(ratio * line.swing + time * line.speed + line.phase) * line.amplitude;
    const microWave =
      Math.sin(ratio * line.micro + time * line.speed * 3.7 + line.phase * 1.85) * 0.018;
    const drift =
      Math.cos(ratio * 14 + time * line.speed * 1.3 + line.phase * 1.2) * 0.015;
    const pulseCenter = (time * line.speed * 0.09 + line.phase * 0.11) % 1;
    const pulse = Math.exp(-((ratio - pulseCenter) ** 2) / 0.0024) * line.pulse;

    return state.height * (line.base - primaryWave - microWave - drift - pulse);
  }

  function createSeriesPoints(line, time) {
    const points = [];

    for (let x = 0; x <= state.width + 16; x += 14) {
      points.push({ x, y: getSeriesY(line, x, time) });
    }

    return points;
  }

  function drawSeries(points, line, index) {
    if (!points.length) {
      return;
    }

    if (index === 0) {
      const fill = context.createLinearGradient(0, state.height * 0.24, 0, state.height);
      fill.addColorStop(0, "rgba(255, 255, 255, 0.12)");
      fill.addColorStop(1, "rgba(255, 255, 255, 0)");

      context.beginPath();
      context.moveTo(points[0].x, points[0].y);
      points.forEach((point) => context.lineTo(point.x, point.y));
      context.lineTo(state.width, state.height + 40);
      context.lineTo(0, state.height + 40);
      context.closePath();
      context.fillStyle = fill;
      context.fill();
    }

    context.save();
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    points.forEach((point) => context.lineTo(point.x, point.y));
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
    const y = getSeriesY(line, x, time);

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
    drawBackdrop();
    drawStars(time);
    drawDust(time);
    drawSweep(time);

    series.forEach((line, index) => {
      const points = createSeriesPoints(line, time);
      drawSeries(points, line, index);
    });

    drawMarker(series[0], time);
  }

  function animate(time) {
    drawFrame(time);
    state.frameId = window.requestAnimationFrame(animate);
  }

  function handleVisibilityChange() {
    if (prefersReducedMotion) {
      return;
    }

    if (document.hidden) {
      window.cancelAnimationFrame(state.frameId);
      state.frameId = 0;
      return;
    }

    if (!state.frameId) {
      state.frameId = window.requestAnimationFrame(animate);
    }
  }

  window.addEventListener("resize", resizeCanvas, { passive: true });
  document.addEventListener("visibilitychange", handleVisibilityChange);

  resizeCanvas();

  if (prefersReducedMotion) {
    drawFrame(performance.now());
    return;
  }

  state.frameId = window.requestAnimationFrame(animate);
}

hydrateCopy();
renderCommittee();
setupReveal();
mountPriceCanvas();
