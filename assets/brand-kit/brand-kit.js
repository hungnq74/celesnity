(() => {
  const liveRegion = document.createElement("div");
  liveRegion.className = "copy-live-region";
  liveRegion.setAttribute("aria-live", "polite");
  liveRegion.setAttribute("aria-atomic", "true");
  document.body.append(liveRegion);

  document.querySelectorAll(".ramp-strip").forEach((strip) => {
    const colors = (strip.dataset.colors || "")
      .split(",")
      .map((color) => color.trim().toUpperCase())
      .filter(Boolean);
    const rampName = strip.dataset.rampName || "Colour ramp";

    if (!colors.length) return;

    strip.style.background = `linear-gradient(90deg, ${colors.join(", ")})`;
    colors.forEach((color, index) => {
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = "palette-cell";
      cell.style.setProperty("--cell-color", color);
      cell.dataset.copyColor = color;
      cell.dataset.copyLabel = `${rampName} ${index + 1}`;
      cell.setAttribute("aria-label", `Copy ${rampName} step ${index + 1} color ${color}`);
      strip.append(cell);
    });
  });

  const targets = document.querySelectorAll("[data-copy-color]");

  const fallbackCopy = (value) => {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.append(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    if (!copied) throw new Error("Copy command was not available");
  };

  const copyColor = async (target) => {
    const value = target.dataset.copyColor;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
        fallbackCopy(value);
      }
      target.classList.remove("is-copied");
      requestAnimationFrame(() => target.classList.add("is-copied"));
      liveRegion.textContent = `${target.dataset.copyLabel || "Colour"} ${value} copied to clipboard.`;
      window.clearTimeout(target.copyTimer);
      target.copyTimer = window.setTimeout(() => target.classList.remove("is-copied"), 1600);
    } catch (error) {
      liveRegion.textContent = `Copy failed. Select ${value} manually.`;
    }
  };

  targets.forEach((target) => {
    target.addEventListener("click", () => copyColor(target));
    target.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      copyColor(target);
    });
  });
})();
