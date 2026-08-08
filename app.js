const dialog = document.querySelector("#projectDialog");
const dialogImage = document.querySelector("#dialogImage");
const dialogVideo = document.querySelector("#dialogVideo");
const dialogType = document.querySelector("#dialogType");
const dialogTitle = document.querySelector("#dialogTitle");
const dialogYear = document.querySelector("#dialogYear");
const dialogDescription = document.querySelector("#dialogDescription");
const dialogFacts = document.querySelector("#dialogFacts");
const dialogEvidence = document.querySelector("#dialogEvidence");
const copyProjectLink = document.querySelector("#copyProjectLink");
const factFields = [
  ["format", "#dialogFormatRow", "#dialogFormat"],
  ["duration", "#dialogDurationRow", "#dialogDuration"],
  ["method", "#dialogMethodRow", "#dialogMethod"],
];
const evidenceFields = [
  ["atTime", "#dialogAtTimeRow", "#dialogAtTime"],
  ["lookingBack", "#dialogLookingBackRow", "#dialogLookingBack"],
  ["stillOpen", "#dialogStillOpenRow", "#dialogStillOpen"],
];
const projects = [...document.querySelectorAll(".project")];
let projectReturnUrl = `${window.location.pathname}${window.location.hash}`;
let activeProjectKey = "";

const projectDetails = {
  "body-sequencer": {
    type: "LIVE BODY / REAL-TIME ENVIRONMENT",
    format: "Audiovisual performance / live body with real-time visual environment",
    duration: "Documentation: 1'34\"",
    method: "Real-time visual environment, moving image, sound and performance collaboration",
    description: "A live body becomes an interface inside a responsive cyber-cosmos, altering and being read by the visual system around it.",
    atTime: "Developed as a current performance environment involving a stage body and real-time response.",
    lookingBack: "It brings earlier image-mixing and later live-system experiments into direct relation with a performer.",
    stillOpen: "How can body, image, sound and software remain active together without one permanently governing the others?",
  },
  "human-sequencer": {
    type: "CURRENT EXPERIMENT / RESEARCH",
    format: "Ongoing research material",
    method: "Collective movement, image systems and the body considered as a sequencer",
    description: "A developing research line rather than a settled artwork. Its format and public form are still being tested.",
    atTime: "The current material asks how collective movement might organise image and sound.",
    stillOpen: "Can human movement, image, sound and a running system remain active without one layer becoming the permanent master?",
  },
  awakened: {
    type: "REAL-TIME AUDIOVISUAL PERFORMANCE",
    format: "Real-time audiovisual performance / multiple screens",
    duration: "40'00\"",
    method: "TouchDesigner, ComfyUI, AI imagery and sound synthesis",
    description: "Sound activates and reorganises AI-generated images across a real-time performance system, placing attention, emotion and automation in tension.",
    atTime: "Built around algorithmic emotion, digital pressure and the question of control between sound and image.",
    lookingBack: "The work makes the relation between media explicit: images are no longer only edited but continually awakened by another live layer.",
  },
  "control-the-world": {
    type: "LIVE / GAME ENGINE / INSTALLATION",
    format: "Audiovisual live performance / game-engine installation",
    duration: "Full version: approximately 40 minutes",
    method: "Game-engine environment, multiple screens and Leap Motion",
    description: "Pandemic infrastructure returns as a controllable virtual world: a nucleic-acid booth, gloved hand and fragments of lockdown memory become an unstable interface.",
    atTime: "The work began from lived pandemic infrastructure, delivery-worker fragments and urban memories.",
    lookingBack: "Control is both subject and method here—the hand operates the world while the system also reorganises the performer and audience.",
  },
  chat: {
    type: "4K VIDEO / AI CO-WRITING",
    format: "Single-channel 4K video",
    duration: "9'21\"",
    method: "Text co-written by CHILLCHILL and ChatGPT; 4K moving image",
    description: "Food-delivery riders, programmers and synthetic social characters meet inside a narrative co-written with AI.",
    atTime: "AI writing entered as a working tool for describing platform labour and contemporary urban characters.",
    lookingBack: "Narrative becomes another active system layer rather than a neutral explanation placed over the image.",
  },
  runway: {
    type: "SINGLE-CHANNEL VIDEO",
    format: "Single-channel HD video",
    duration: "5'29\"",
    method: "3D scanning, avatar construction and video compositing",
    description: "A scanned avatar moves through Shanghai lockdown street scenes, asking what kind of presence remains when the physical body is absent from the city.",
    atTime: "Made from lockdown streets and the felt distance between the body and public space.",
    lookingBack: "The synthetic body shifts from comic insertion toward a proxy carrying absence, restriction and memory.",
  },
  cute: {
    type: "4K SINGLE-CHANNEL VIDEO",
    format: "UHD single-channel video",
    duration: "4'40\"",
    method: "4K video, 3D and game-scene logic",
    description: "Food delivery, pandemic body bags and a game-like city meet in a work about the exhausted body commanded by platform labour.",
    atTime: "The immediate conditions were pandemic circulation, algorithmic work and bodies treated as movable units.",
    lookingBack: "The city is no longer only observed and remixed; it appears as a rule system that directs movement and survival.",
  },
  "brain-in-a-vat": {
    type: "FILM / LIVE-SYSTEM RECORD",
    format: "Single-channel HD film; lightly edited record of a mixed-source live AV system",
    duration: "39'58\"",
    method: "Game-engine generation, pre-recorded modules, Arena live switching, direct mixed-output recording, subtitles and voiceover",
    description: "The formal public film preserves almost an entire mixed-source live run: real-time game-engine imagery, arranged clips and A BRAVE NEW WORLD operate inside one long output.",
    atTime: "The live system combined a short finished work, other pre-recorded clips and a majority of real-time imagery.",
    lookingBack: "A fixed work had become one module among other sources; the preserved run makes that change of function legible.",
    stillOpen: "Does retaining the full duration preserve the system's relations, or allow another layer—music, software or endurance—to dominate?",
  },
  "shaman-garden": {
    type: "SHORT VIDEO / EXPANDED LIVE VERSION",
    format: "Independent short video later contained within an expanded AV performance",
    duration: "SHAMAN: 3'22\" / THE GARDEN: approximately 40 minutes",
    method: "3D and internet-image mixing, strobe montage and live expansion",
    description: "SHAMAN was completed as an independent short before becoming part of the longer live version THE GARDEN, alongside additional material.",
    atTime: "The short mixed occupation imagery, internet memes, shared-economy signs and East Asian digital culture.",
    lookingBack: "The version chain shows how a self-contained video could enter a longer collective visual field without having been planned for that role from the start.",
  },
  "a-brave-new-world": {
    type: "MOVING IMAGE / DEVELOPMENT VERSION",
    format: "Short rendered moving image; later used as a pre-recorded module",
    duration: "3'48\"",
    method: "3D moving image; later switched alongside other clips and real-time game-engine imagery",
    description: "A finished short moving-image work that later entered a longer mixed-source live system and the version chain preserved as BRAIN IN A VAT.",
    atTime: "The work began as a finished short shaped by shared bikes, urbanisation and post-internet aesthetics.",
    lookingBack: "Its later use as a module marks a turn from fixed image sequence toward a running relation between unlike sources.",
  },
  "asian-sharing-heaven": {
    type: "3D MOVING IMAGE",
    format: "Single-channel HD video",
    duration: "6'34\"",
    method: "3D-rendered moving image, post-internet montage and virtual-world construction",
    description: "Shared bicycles, a Siri-like voice, police and cyber figures are translated into a virtual world shaped by the promises and absurdities of the sharing economy.",
    atTime: "The shared-bike economy was a concrete urban trigger translated into a synthetic environment.",
    lookingBack: "The virtual world now reads as an early place where unlike social signs and image materials were mixed—not as an early theory of polyphony.",
  },
  "subway-gym": {
    type: "3D BODY / URBAN FOOTAGE",
    format: "Three short single-channel HD video clips",
    duration: "8.6 sec / 23.4 sec / 12.7 sec",
    method: "C4D body composited into filmed subway and escalator footage",
    description: "The artist's synthetic self-body enters everyday subway infrastructure through three concise moving-image situations.",
    atTime: "A small observation of public transport, body and routine became the trigger; the work developed through making.",
    lookingBack: "3D appears as a mixing environment for body and city, not as evidence of a theory already formed in 2017.",
  },
  "occupy-today": {
    type: "FORMATION / CONTEXT",
    format: "Installation / action / video context",
    description: "An early anchor involving occupation, art-market parody and social simulation. It remains here as formation context rather than the beginning of a linear success story.",
    atTime: "Body, labour, rules and the art system were entering the work through action and installation.",
    lookingBack: "It preserves an earlier concern with systems and participation without claiming continuity was already understood.",
  },
  inflatable: {
    type: "3D MOVING IMAGE / CONTEXT",
    format: "Single-channel HD video",
    duration: "3'29\"",
    method: "3D, video compositing and reality-based satire",
    description: "A small frustration around Shanghai electric-bike mobility regulation becomes an absurd visual complaint about bodies, vehicles and everyday rules.",
    atTime: "The trigger was the artist's lived experience as an electric-bike rider and frustration with mobility restrictions.",
    lookingBack: "The work keeps humour and a minor urban incident visible as serious parts of the method.",
  },
};

const getProjectKey = (project) => project.dataset.slug.replace(/-(chapter|trajectory|research)$/, "");

const resetDialogMedia = () => {
  dialogVideo.removeAttribute("src");
  dialogVideo.style.display = "none";
  dialogImage.removeAttribute("src");
  dialogImage.style.display = "none";
};

const projectUrl = (key) => {
  const url = new URL(window.location.href);
  url.searchParams.set("work", key);
  url.hash = "";
  return url;
};

const openProject = (project, { syncUrl = true } = {}) => {
  const sourceImage = project.querySelector("img");
  const videoId = project.dataset.videoId;
  const key = getProjectKey(project);
  const details = projectDetails[key] || {};

  activeProjectKey = key;
  copyProjectLink.innerHTML = 'COPY PROJECT LINK <span aria-hidden="true">↗</span>';
  if (syncUrl) {
    projectReturnUrl = `${window.location.pathname}${window.location.hash}`;
    window.history.pushState({ work: key }, "", projectUrl(key));
  }

  resetDialogMedia();

  if (videoId) {
    dialogVideo.style.display = "block";
    dialogVideo.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&controls=1&playsinline=1&rel=0`;
  } else if (sourceImage) {
    dialogImage.style.display = "block";
    dialogImage.src = sourceImage.currentSrc || sourceImage.src;
    dialogImage.alt = sourceImage.alt;
  }

  dialogType.textContent = details.type || project.dataset.type || "ART";
  dialogTitle.textContent = project.dataset.title;
  dialogTitle.classList.toggle("is-long", project.dataset.title.length > 28);
  dialogYear.textContent = project.dataset.year || "";
  dialogDescription.textContent = details.description || project.dataset.description || "";
  let hasFacts = false;
  factFields.forEach(([dataKey, rowSelector, valueSelector]) => {
    const value = details[dataKey] || project.dataset[dataKey] || "";
    const row = document.querySelector(rowSelector);
    document.querySelector(valueSelector).textContent = value;
    row.hidden = !value;
    hasFacts ||= Boolean(value);
  });
  dialogFacts.hidden = !hasFacts;
  let hasEvidence = false;
  evidenceFields.forEach(([dataKey, rowSelector, valueSelector]) => {
    const value = details[dataKey] || project.dataset[dataKey] || "";
    const row = document.querySelector(rowSelector);
    document.querySelector(valueSelector).textContent = value;
    row.hidden = !value;
    hasEvidence ||= Boolean(value);
  });
  dialogEvidence.hidden = !hasEvidence;
  dialog.showModal();
};

projects.forEach((project) => {
  project.addEventListener("click", () => openProject(project));
});

document.querySelectorAll("[data-open-project]").forEach((control) => {
  control.addEventListener("click", () => {
    const slug = control.dataset.openProject;
    const project = document.querySelector(`.project[data-slug="${slug}"]`);
    if (project) openProject(project);
  });
});

const restoreProjectUrl = () => {
  if (!new URL(window.location.href).searchParams.has("work")) return;
  window.history.replaceState({}, "", projectReturnUrl || window.location.pathname);
};

const closeDialog = ({ restoreUrl = true } = {}) => {
  resetDialogMedia();
  if (restoreUrl) restoreProjectUrl();
  if (dialog.open) dialog.close();
};

dialog.querySelector(".dialog-close").addEventListener("click", () => closeDialog());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) closeDialog();
});
dialog.addEventListener("close", () => {
  resetDialogMedia();
  restoreProjectUrl();
});

copyProjectLink.addEventListener("click", async () => {
  if (!activeProjectKey) return;
  const url = projectUrl(activeProjectKey).toString();
  try {
    await navigator.clipboard.writeText(url);
    copyProjectLink.textContent = "LINK COPIED";
  } catch {
    window.prompt("Copy project link", url);
  }
});

window.addEventListener("popstate", () => {
  const key = new URL(window.location.href).searchParams.get("work");
  if (!key && dialog.open) closeDialog({ restoreUrl: false });
});

const initialProjectKey = new URL(window.location.href).searchParams.get("work");
if (initialProjectKey) {
  const initialProject = projects.find((project) => getProjectKey(project) === initialProjectKey);
  if (initialProject) {
    projectReturnUrl = window.location.pathname;
    openProject(initialProject, { syncUrl: false });
  }
}

document.querySelectorAll('img[src*="i.ytimg.com"]').forEach((image) => {
  image.addEventListener("error", () => {
    if (image.src.endsWith("/hqdefault.jpg")) image.src = image.src.replace("/hqdefault.jpg", "/0.jpg");
  }, { once: true });
});

const sectionLinks = [...document.querySelectorAll('.site-header nav a[href^="#"]')];
const observedSections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries.find((entry) => entry.isIntersecting);
    if (!visible) return;
    sectionLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
);

observedSections.forEach((section) => sectionObserver.observe(section));
