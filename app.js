const dialog = document.querySelector("#projectDialog");
const dialogImage = document.querySelector("#dialogImage");
const dialogVideo = document.querySelector("#dialogVideo");
const dialogType = document.querySelector("#dialogType");
const dialogTitle = document.querySelector("#dialogTitle");
const dialogYear = document.querySelector("#dialogYear");
const dialogDescription = document.querySelector("#dialogDescription");
const projects = document.querySelectorAll(".project");

const resetDialogMedia = () => {
  dialogVideo.removeAttribute("src");
  dialogVideo.style.display = "none";
  dialogImage.removeAttribute("src");
  dialogImage.style.display = "none";
};

const openProject = (project) => {
  const sourceImage = project.querySelector("img");
  const videoId = project.dataset.videoId;

  resetDialogMedia();

  if (videoId) {
    dialogVideo.style.display = "block";
    dialogVideo.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&controls=1&playsinline=1&rel=0`;
  } else if (sourceImage) {
    dialogImage.style.display = "block";
    dialogImage.src = sourceImage.currentSrc || sourceImage.src;
    dialogImage.alt = sourceImage.alt;
  }

  dialogType.textContent = project.dataset.type || "ART";
  dialogTitle.textContent = project.dataset.title;
  dialogTitle.classList.toggle("is-long", project.dataset.title.length > 28);
  dialogYear.textContent = project.dataset.year || "";
  dialogDescription.textContent = project.dataset.description || "";
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

const closeDialog = () => {
  resetDialogMedia();
  if (dialog.open) dialog.close();
};

dialog.querySelector(".dialog-close").addEventListener("click", closeDialog);
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) closeDialog();
});
dialog.addEventListener("close", resetDialogMedia);

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
