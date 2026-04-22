import { siteContent } from "./site-data.js";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const DEFAULT_VISIBLE_COMMITTEE_COUNT = 8;
const DEFAULT_VISIBLE_RESEARCH_COUNT = 4;
const DEFAULT_VISIBLE_ANALYSIS_COUNT = 4;
const HERO_VIDEO_SOURCES = ["Video/1.mp4", "Video/2.mp4", "Video/3.mp4"];

function hydrateCopy() {
  document.querySelectorAll("[data-site-name]").forEach((node) => {
    node.textContent = siteContent.brand.name;
  });

  const heroIntro = document.querySelector("[data-hero-intro]");
  const heroHeadline = document.querySelector("[data-hero-headline]");
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
  const aboutEyebrow = document.querySelector("[data-about-eyebrow]");
  const aboutTitle = document.querySelector("[data-about-title]");
  const aboutVisionTitle = document.querySelector("[data-about-vision-title]");
  const aboutVisionText = document.querySelector("[data-about-vision-text]");

  if (heroIntro) {
    heroIntro.textContent = siteContent.brand.heroIntro;
  }

  if (heroHeadline) {
    heroHeadline.replaceChildren(
      ...siteContent.brand.heroHeadline.split(" ").map((word) => {
        const line = document.createElement("span");
        line.className = "hero__headline-line";
        line.textContent = word;
        return line;
      }),
    );
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

  if (aboutEyebrow) {
    aboutEyebrow.textContent = siteContent.about.eyebrow;
  }

  if (aboutTitle) {
    aboutTitle.textContent = siteContent.about.title;
  }

  if (aboutVisionTitle) {
    aboutVisionTitle.textContent = siteContent.about.visionTitle;
  }

  if (aboutVisionText) {
    aboutVisionText.textContent = siteContent.about.visionText;
  }
}

function mountHeroVideoPlaylist() {
  const video = document.querySelector("[data-hero-video]");

  if (!(video instanceof HTMLVideoElement) || HERO_VIDEO_SOURCES.length === 0) {
    return;
  }

  let currentIndex = 0;

  const playCurrentVideo = () => {
    if (document.hidden) {
      return;
    }

    const playback = video.play();

    if (playback && typeof playback.catch === "function") {
      playback.catch(() => {});
    }
  };

  const updateSource = (nextIndex) => {
    currentIndex = (nextIndex + HERO_VIDEO_SOURCES.length) % HERO_VIDEO_SOURCES.length;
    video.src = HERO_VIDEO_SOURCES[currentIndex];
    video.load();
    playCurrentVideo();
  };

  video.addEventListener("ended", () => {
    updateSource(currentIndex + 1);
  });

  video.addEventListener("error", () => {
    updateSource(currentIndex + 1);
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      video.pause();
      return;
    }

    playCurrentVideo();
  });

  updateSource(0);
}
function renderFooterDetails() {
  const footer = siteContent.footer;

  if (!footer) {
    return;
  }

  const locationTitle = document.querySelector("[data-footer-location-title]");
  const contactTitle = document.querySelector("[data-footer-contact-title]");
  const socialTitle = document.querySelector("[data-footer-social-title]");
  const locationStack = document.querySelector("[data-footer-location]");
  const contactStack = document.querySelector("[data-footer-contact]");
  const socialStack = document.querySelector("[data-footer-social]");

  if (locationTitle) {
    locationTitle.textContent = footer.locationTitle;
  }

  if (contactTitle) {
    contactTitle.textContent = footer.contactTitle;
  }

  if (socialTitle) {
    socialTitle.textContent = footer.socialTitle;
  }

  if (locationStack instanceof HTMLElement) {
    const fragment = document.createDocumentFragment();

    (footer.locationLines ?? []).filter(Boolean).forEach((line) => {
      const item = document.createElement("p");
      item.className = "site-footer__item";
      item.textContent = line;
      fragment.append(item);
    });

    locationStack.replaceChildren(fragment);
  }

  if (contactStack instanceof HTMLElement) {
    const fragment = document.createDocumentFragment();

    (footer.contactLines ?? []).filter(Boolean).forEach((line) => {
      const item = document.createElement("p");
      item.className = "site-footer__item";
      item.textContent = line;
      fragment.append(item);
    });

    contactStack.replaceChildren(fragment);
  }

  if (socialStack instanceof HTMLElement) {
    const fragment = document.createDocumentFragment();

    (footer.socials ?? []).filter((social) => social?.label).forEach((social) => {
      const item = social.href ? document.createElement("a") : document.createElement("span");
      item.className = social.href ? "site-footer__link" : "site-footer__item";
      item.textContent = social.label;

      if (item instanceof HTMLAnchorElement) {
        item.href = social.href;
        item.target = "_blank";
        item.rel = "noreferrer";
      }

      fragment.append(item);
    });

    socialStack.replaceChildren(fragment);
  }
}

function createMemberUniversityTag(university) {
  const tag = document.createElement("span");
  tag.className = "member-card__university";
  tag.textContent = university;
  return tag;
}

function getMemberLinkIcon(kind) {
  const icons = {
    website: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 2.25a9.75 9.75 0 1 0 0 19.5a9.75 9.75 0 0 0 0-19.5Zm6.89 8.625h-3.22a15.96 15.96 0 0 0-1.33-5.06a8.29 8.29 0 0 1 4.55 5.06Zm-6.14-5.74c.64.81 1.47 2.79 1.79 5.74h-5.08c.32-2.95 1.15-4.93 1.79-5.74a1.12 1.12 0 0 1 .75-.39c.26 0 .51.14.75.39Zm-3.09.68a15.97 15.97 0 0 0-1.33 5.06H5.11a8.29 8.29 0 0 1 4.55-5.06Zm-4.87 6.56h3.36c-.03.37-.05.74-.05 1.13c0 1.49.21 2.9.58 4.17a8.26 8.26 0 0 1-3.89-5.3Zm6.09 6.73c-.67-.9-1.49-2.93-1.74-5.23h4.72c-.25 2.3-1.07 4.33-1.74 5.23a1.14 1.14 0 0 1-.62.44a1.14 1.14 0 0 1-.62-.44Zm3.45-1.43c.37-1.27.58-2.68.58-4.17c0-.39-.02-.76-.05-1.13h3.36a8.26 8.26 0 0 1-3.89 5.3Z"/>
      </svg>`,
    linkedin: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M5.4 3.6a1.8 1.8 0 1 0 0 3.6a1.8 1.8 0 0 0 0-3.6ZM3.9 8.85h3v11.25h-3V8.85Zm4.95 0h2.88v1.54h.04c.4-.76 1.38-1.8 2.84-1.8c3.04 0 3.6 2 3.6 4.6v6.91h-3v-6.12c0-1.46-.03-3.34-2.03-3.34c-2.04 0-2.36 1.59-2.36 3.24v6.22h-2.97V8.85Z"/>
      </svg>`,
    github: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 2.25a9.75 9.75 0 0 0-3.08 19c.49.09.67-.21.67-.47c0-.23-.01-1-.01-1.82c-2.74.6-3.32-1.16-3.32-1.16c-.45-1.13-1.1-1.43-1.1-1.43c-.9-.62.07-.61.07-.61c.99.07 1.51 1.02 1.51 1.02c.88 1.5 2.31 1.07 2.87.82c.09-.64.34-1.07.62-1.31c-2.19-.25-4.49-1.1-4.49-4.89c0-1.08.39-1.97 1.02-2.66c-.1-.25-.44-1.27.1-2.64c0 0 .84-.27 2.75 1.01a9.4 9.4 0 0 1 5 0c1.91-1.28 2.75-1.01 2.75-1.01c.54 1.37.2 2.39.1 2.64c.64.69 1.02 1.58 1.02 2.66c0 3.8-2.3 4.63-4.5 4.88c.35.3.67.9.67 1.82c0 1.31-.01 2.37-.01 2.69c0 .26.18.57.67.47A9.75 9.75 0 0 0 12 2.25Z"/>
      </svg>`,
    email: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M3 5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25v13.5A2.25 2.25 0 0 1 18.75 21H5.25A2.25 2.25 0 0 1 3 18.75V5.25Zm1.7.05L12 10.94l7.3-5.64H4.7Zm14.8 1.62l-7.04 5.44a.75.75 0 0 1-.92 0L4.5 6.92v11.83c0 .41.34.75.75.75h13.5c.41 0 .75-.34.75-.75V6.92Z"/>
      </svg>`,
  };

  return icons[kind] ?? "";
}

function createMemberLink(kind, href, memberName) {
  const labels = {
    website: "Website",
    linkedin: "LinkedIn",
    github: "GitHub",
    email: "Email",
  };

  const label = labels[kind] ?? kind;

  if (kind === "email") {
    const button = document.createElement("button");
    const email = href.replace(/^mailto:/i, "").trim();

    button.type = "button";
    button.className = `member-card__link member-card__link--${kind}`;
    button.dataset.email = email;
    button.innerHTML = `${getMemberLinkIcon(kind)}<span class="sr-only">${label}</span>`;
    button.title = `Copy ${email}`;
    button.setAttribute("aria-label", `${memberName} ${label}`);
    return button;
  }

  const link = document.createElement("a");
  link.className = `member-card__link member-card__link--${kind}`;
  link.href = href;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.innerHTML = `${getMemberLinkIcon(kind)}<span class="sr-only">${label}</span>`;
  link.title = label;
  link.setAttribute("aria-label", `${memberName} ${label}`);
  return link;
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

  const universities = (member.universities ?? []).filter(Boolean);

  if (universities.length) {
    const universityTags = document.createElement("div");
    universityTags.className = "member-card__universities";

    universities.forEach((university) => {
      universityTags.append(createMemberUniversityTag(university));
    });

    body.append(universityTags);
  }

  const links = member.links ?? {};
  const linkEntries = [
    ["website", links.website],
    ["linkedin", links.linkedin],
    ["github", links.github],
    ["email", links.email],
  ].filter(([, href]) => Boolean(href));

  if (linkEntries.length) {
    const linkGroup = document.createElement("div");
    linkGroup.className = "member-card__links";

    linkEntries.forEach(([kind, href]) => {
      linkGroup.append(createMemberLink(kind, href, member.name));
    });

    if (links.email) {
      const feedback = document.createElement("span");
      feedback.className = "member-card__link-feedback";
      feedback.hidden = true;
      feedback.setAttribute("aria-live", "polite");
      linkGroup.append(feedback);
    }

    body.append(linkGroup);
  }

  card.append(body);

  return card;
}
function renderCommittee() {
  const grid = document.querySelector("#team-grid");

  if (!grid) {
    return;
  }

  const fragment = document.createDocumentFragment();

  siteContent.committee.members.forEach((member, index) => {
    const card = createMemberCard(member, index);

    if (index >= DEFAULT_VISIBLE_COMMITTEE_COUNT) {
      card.dataset.overflow = "true";
    }

    fragment.append(card);
  });

  grid.replaceChildren(fragment);
  syncCommitteeCollection();
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

  const journal = paper.paperUrl ? document.createElement("a") : document.createElement("span");
  journal.className = paper.paperUrl ? "paper-chip paper-chip--link" : "paper-chip";
  journal.textContent = paper.journal;

  if (paper.paperUrl) {
    journal.href = paper.paperUrl;
    journal.target = "_blank";
    journal.rel = "noreferrer";
    journal.setAttribute("aria-label", `${paper.title} paper link`);
  }

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

  const citationButton = document.createElement("button");
  citationButton.type = "button";
  citationButton.className = "paper-chip paper-chip--button";
  citationButton.textContent = "Citation";
  citationButton.dataset.defaultLabel = "Citation";
  citationButton.dataset.bibtex = paper.bibtex;
  citationButton.setAttribute("aria-label", `${paper.title} citation`);

  meta.append(journal, year, dataLink, codeLink, citationButton);
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
    const card = createResearchCard(paper, index);

    if (index >= DEFAULT_VISIBLE_RESEARCH_COUNT) {
      card.dataset.overflow = "true";
    }

    fragment.append(card);
  });

  list.replaceChildren(fragment);
  syncResearchCollection();
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
    const card = createAnalysisCard(post, index);

    if (index >= DEFAULT_VISIBLE_ANALYSIS_COUNT) {
      card.dataset.overflow = "true";
    }

    fragment.append(card);
  });

  list.replaceChildren(fragment);
  syncAnalysisCollection();
}

function syncCommitteeCollection() {
  const section = document.querySelector(".team");
  const grid = document.querySelector("#team-grid");
  const button = document.querySelector("[data-team-toggle]");

  if (!(section instanceof HTMLElement) || !(grid instanceof HTMLElement) || !(button instanceof HTMLButtonElement)) {
    return;
  }

  const cards = [...grid.querySelectorAll(".member-card")];
  const hasOverflow = cards.length > DEFAULT_VISIBLE_COMMITTEE_COUNT;

  if (!hasOverflow) {
    section.classList.add("is-expanded");
    button.hidden = true;
    button.textContent = "View all members";
    button.setAttribute("aria-expanded", "true");
    return;
  }

  button.hidden = false;

  const expanded = section.classList.contains("is-expanded");
  button.textContent = expanded ? "Show fewer" : "View all members";
  button.setAttribute("aria-expanded", expanded ? "true" : "false");
}

function setupCommitteeCollectionToggle() {
  const section = document.querySelector(".team");
  const grid = document.querySelector("#team-grid");
  const button = document.querySelector("[data-team-toggle]");

  if (!(section instanceof HTMLElement) || !(grid instanceof HTMLElement) || !(button instanceof HTMLButtonElement)) {
    return;
  }

  syncCommitteeCollection();

  button.addEventListener("click", () => {
    const expanded = section.classList.toggle("is-expanded");

    button.textContent = expanded ? "Show fewer" : "View all members";
    button.setAttribute("aria-expanded", expanded ? "true" : "false");

    if (expanded) {
      [...grid.querySelectorAll(".member-card")]
        .slice(DEFAULT_VISIBLE_COMMITTEE_COUNT)
        .forEach((card) => card.classList.add("is-visible"));
    } else {
      section.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    }

    requestAnimationFrame(syncCommitteeBios);
  });
}

function syncResearchCollection() {
  const section = document.querySelector(".research");
  const list = document.querySelector("#research-list");
  const button = document.querySelector("[data-research-toggle]");

  if (!(section instanceof HTMLElement) || !(list instanceof HTMLElement) || !(button instanceof HTMLButtonElement)) {
    return;
  }

  const cards = [...list.querySelectorAll(".paper-card")];
  const hasOverflow = cards.length > DEFAULT_VISIBLE_RESEARCH_COUNT;

  if (!hasOverflow) {
    section.classList.add("is-expanded");
    button.hidden = true;
    button.textContent = "View all papers";
    button.setAttribute("aria-expanded", "true");
    return;
  }

  button.hidden = false;

  const expanded = section.classList.contains("is-expanded");
  button.textContent = expanded ? "Show fewer" : "View all papers";
  button.setAttribute("aria-expanded", expanded ? "true" : "false");
}

function setupResearchCollectionToggle() {
  const section = document.querySelector(".research");
  const list = document.querySelector("#research-list");
  const button = document.querySelector("[data-research-toggle]");

  if (!(section instanceof HTMLElement) || !(list instanceof HTMLElement) || !(button instanceof HTMLButtonElement)) {
    return;
  }

  syncResearchCollection();

  button.addEventListener("click", () => {
    const expanded = section.classList.toggle("is-expanded");

    button.textContent = expanded ? "Show fewer" : "View all papers";
    button.setAttribute("aria-expanded", expanded ? "true" : "false");

    if (expanded) {
      [...list.querySelectorAll(".paper-card")]
        .slice(DEFAULT_VISIBLE_RESEARCH_COUNT)
        .forEach((card) => card.classList.add("is-visible"));
    } else {
      section.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  });
}

function syncAnalysisCollection() {
  const section = document.querySelector(".analysis");
  const list = document.querySelector("#analysis-list");
  const button = document.querySelector("[data-analysis-toggle]");

  if (!(section instanceof HTMLElement) || !(list instanceof HTMLElement) || !(button instanceof HTMLButtonElement)) {
    return;
  }

  const cards = [...list.querySelectorAll(".analysis-card")];
  const hasOverflow = cards.length > DEFAULT_VISIBLE_ANALYSIS_COUNT;

  if (!hasOverflow) {
    section.classList.add("is-expanded");
    button.hidden = true;
    button.textContent = "View all posts";
    button.setAttribute("aria-expanded", "true");
    return;
  }

  button.hidden = false;

  const expanded = section.classList.contains("is-expanded");
  button.textContent = expanded ? "Show fewer" : "View all posts";
  button.setAttribute("aria-expanded", expanded ? "true" : "false");
}

function setupAnalysisCollectionToggle() {
  const section = document.querySelector(".analysis");
  const list = document.querySelector("#analysis-list");
  const button = document.querySelector("[data-analysis-toggle]");

  if (!(section instanceof HTMLElement) || !(list instanceof HTMLElement) || !(button instanceof HTMLButtonElement)) {
    return;
  }

  syncAnalysisCollection();

  button.addEventListener("click", () => {
    const expanded = section.classList.toggle("is-expanded");

    button.textContent = expanded ? "Show fewer" : "View all posts";
    button.setAttribute("aria-expanded", expanded ? "true" : "false");

    if (expanded) {
      [...list.querySelectorAll(".analysis-card")]
        .slice(DEFAULT_VISIBLE_ANALYSIS_COUNT)
        .forEach((card) => card.classList.add("is-visible"));
    } else {
      section.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  });
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

function setupCommitteeLinkActions() {
  const grid = document.querySelector("#team-grid");

  if (!(grid instanceof HTMLElement)) {
    return;
  }

  grid.addEventListener("click", async (event) => {
    const trigger = event.target instanceof Element ? event.target.closest(".member-card__link--email") : null;

    if (!(trigger instanceof HTMLButtonElement)) {
      return;
    }

    const email = trigger.dataset.email?.trim();

    if (!email) {
      return;
    }

    const feedback = trigger.parentElement?.querySelector(".member-card__link-feedback");
    const resetTimer = trigger.dataset.resetTimer;

    if (resetTimer) {
      window.clearTimeout(Number(resetTimer));
    }

    try {
      await copyText(email);
      trigger.classList.add("is-copied");

      if (feedback instanceof HTMLElement) {
        feedback.textContent = `Copied: ${email}`;
        feedback.hidden = false;
      }
    } catch {
      trigger.classList.remove("is-copied");

      if (feedback instanceof HTMLElement) {
        feedback.textContent = "Copy failed";
        feedback.hidden = false;
      }
    }

    const timeoutId = window.setTimeout(() => {
      trigger.classList.remove("is-copied");

      if (feedback instanceof HTMLElement) {
        feedback.textContent = "";
        feedback.hidden = true;
      }

      delete trigger.dataset.resetTimer;
    }, 2200);

    trigger.dataset.resetTimer = String(timeoutId);
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
    frameId: 0,
    heroInView: true,
    phase: 0,
    increments: new Float32Array(0),
    samples: [],
    scaleMin: 0,
    scaleMax: 1,
    pointsPerFrame: 3,
  };

  function createFractalTile(length, octaves) {
    const values = new Float32Array(length);
    const temp = new Float32Array(length);

    for (let octave = 0; octave < octaves.length; octave += 1) {
      temp.fill(0);
      const { step, amplitude } = octaves[octave];

      for (let anchor = 0; anchor < length + step; anchor += step) {
        temp[Math.min(anchor, length - 1)] = (Math.random() * 2 - 1) * amplitude;
      }

      for (let index = 0; index < length; index += step) {
        const startIndex = index;
        const endIndex = Math.min(index + step, length - 1);
        const start = temp[startIndex];
        const end = temp[endIndex];
        const span = Math.max(1, endIndex - startIndex);

        for (let position = 0; position <= span && startIndex + position < length; position += 1) {
          const ratio = position / span;
          temp[startIndex + position] = start + (end - start) * ratio;
        }
      }

      for (let index = 0; index < length; index += 1) {
        values[index] += temp[index];
      }
    }

    return values;
  }

  function buildGenerator() {
    const tileLength = 4096;
    const rough = createFractalTile(tileLength, [
      { step: 512, amplitude: 0.22 },
      { step: 256, amplitude: 0.15 },
      { step: 128, amplitude: 0.1 },
      { step: 64, amplitude: 0.065 },
      { step: 32, amplitude: 0.035 },
    ]);
    const micro = createFractalTile(tileLength, [
      { step: 96, amplitude: 0.028 },
      { step: 48, amplitude: 0.019 },
      { step: 24, amplitude: 0.012 },
      { step: 12, amplitude: 0.007 },
    ]);

    const increments = new Float32Array(tileLength);

    for (let index = 0; index < tileLength; index += 1) {
      const longWave = Math.sin(index * 0.011) * 0.036 + Math.sin(index * 0.0037) * 0.042;
      const fastWave = Math.sin(index * 0.072) * 0.012;
      increments[index] = Math.max(0.016, 0.12 + rough[index] * 0.09 + micro[index] * 0.05 + longWave + fastWave);
    }

    state.increments = increments;
  }

  function nextValue(previous) {
    const index = state.phase % state.increments.length;
    const increment = state.increments[index];
    const curvature = 0.0042 + (Math.sin(state.phase * 0.014) + 1) * 0.0018;
    state.phase = (state.phase + 1) % state.increments.length;
    return previous + increment + curvature;
  }

  function seedSeries() {
    state.samples = [];
    let value = 0;
    const initialCount = 240;

    for (let index = 0; index < initialCount; index += 1) {
      value = nextValue(value);
      state.samples.push(value);
    }

    state.scaleMin = state.samples[0] ?? 0;
    state.scaleMax = state.samples[state.samples.length - 1] ?? 1;
  }

  function compressHistory() {
    const source = state.samples;
    const targetLength = Math.max(1400, Math.floor(source.length * 0.76));
    const compressed = new Array(targetLength);

    for (let index = 0; index < targetLength; index += 1) {
      const position = (index / Math.max(1, targetLength - 1)) * Math.max(0, source.length - 1);
      const left = Math.floor(position);
      const right = Math.min(source.length - 1, Math.ceil(position));
      const ratio = position - left;
      compressed[index] = source[left] + (source[right] - source[left]) * ratio;
    }

    state.samples = compressed;
  }

  function resizeCanvas() {
    const bounds = canvas.getBoundingClientRect();
    state.width = Math.max(320, Math.round(bounds.width));
    state.height = Math.max(320, Math.round(bounds.height));
    state.dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(state.width * state.dpr);
    canvas.height = Math.round(state.height * state.dpr);
    context.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    drawFrame();
  }

  function stepSeries() {
    for (let step = 0; step < state.pointsPerFrame; step += 1) {
      const last = state.samples[state.samples.length - 1] ?? 0;
      state.samples.push(nextValue(last));
    }

    if (state.samples.length > 2800) {
      compressHistory();
    }
  }

  function updateScale() {
    const min = state.samples[0] ?? 0;
    const max = state.samples[state.samples.length - 1] ?? 1;
    const range = Math.max(1, max - min);
    const targetMin = min - range * 0.08;
    const targetMax = max + range * 0.12;

    state.scaleMin += (targetMin - state.scaleMin) * 0.085;
    state.scaleMax += (targetMax - state.scaleMax) * 0.085;
  }

  function getX(index) {
    if (state.samples.length <= 1) {
      return 0;
    }

    return (state.width / (state.samples.length - 1)) * index;
  }

  function getY(value) {
    const domain = Math.max(1, state.scaleMax - state.scaleMin);
    const ratio = (value - state.scaleMin) / domain;
    const top = state.height * 0.08;
    const bottom = state.height * 0.9;
    return bottom - ratio * (bottom - top);
  }

  function traceSeries(offsetY = 0) {
    context.beginPath();

    for (let index = 0; index < state.samples.length; index += 1) {
      const x = getX(index);
      const y = getY(state.samples[index]) + offsetY;

      if (index === 0) {
        context.moveTo(x, y);
        continue;
      }

      const previousX = getX(index - 1);
      const previousY = getY(state.samples[index - 1]) + offsetY;
      const controlX = (previousX + x) * 0.5;
      context.quadraticCurveTo(controlX, previousY, x, y);
    }
  }

  function drawSeries(alpha, width, blur, offsetY = 0) {
    context.save();
    traceSeries(offsetY);
    context.lineWidth = width;
    context.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
    context.shadowBlur = blur;
    context.shadowColor = `rgba(255, 255, 255, ${Math.min(0.3, alpha * 0.42)})`;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
    context.restore();
  }

  function drawBackdrop() {
    context.clearRect(0, 0, state.width, state.height);
    const wash = context.createLinearGradient(0, 0, state.width, 0);
    wash.addColorStop(0, "rgba(255, 255, 255, 0)");
    wash.addColorStop(0.18, "rgba(255, 255, 255, 0.015)");
    wash.addColorStop(0.72, "rgba(255, 255, 255, 0.03)");
    wash.addColorStop(1, "rgba(255, 255, 255, 0)");
    context.fillStyle = wash;
    context.fillRect(0, 0, state.width, state.height);
  }

  function drawTip() {
    const x = getX(state.samples.length - 1);
    const y = getY(state.samples[state.samples.length - 1]);

    context.save();
    context.beginPath();
    context.fillStyle = "rgba(255, 255, 255, 0.95)";
    context.shadowBlur = 22;
    context.shadowColor = "rgba(255, 255, 255, 0.3)";
    context.arc(x, y, 4.6, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }

  function drawFrame() {
    updateScale();
    drawBackdrop();
    drawSeries(0.08, 28, 0, 14);
    drawSeries(0.16, 18, 10, 6);
    drawSeries(0.96, 8.6, 16, 0);
    drawSeries(0.12, 3.2, 6, -9);
    drawTip();
  }

  function animate() {
    stepSeries();
    drawFrame();
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
          drawFrame();
          startAnimation();
          return;
        }

        stopAnimation();
      },
      { threshold: 0.02 },
    );

    heroObserver.observe(heroSection);
  }

  buildGenerator();
  seedSeries();
  resizeCanvas();

  if (!prefersReducedMotion) {
    startAnimation();
  }
}

mountHeroVideoPlaylist();
hydrateCopy();
renderFooterDetails();
renderCommittee();
renderResearch();
renderAnalysis();
setupCommitteeToggles();
setupCommitteeCollectionToggle();
setupResearchCollectionToggle();
setupAnalysisCollectionToggle();
setupCommitteeLinkActions();
setupResearchActions();
setupReveal();







