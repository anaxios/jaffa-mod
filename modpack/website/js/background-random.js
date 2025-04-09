function backgroundRandom() {
  const images = [
    "2025-03-01_00.23.27.webp",
    "2025-03-01_23.06.36.webp",
    "2025-03-15_12.43.32.webp",
    "2025-03-21_08.43.44.webp",
    "2025-03-27_20.13.02.webp",
    "2025-03-01_00.58.33.webp",
    "2025-03-04_21.40.26.webp",
    "2025-03-16_08.30.18.webp",
    "2025-03-21_17.34.27.webp",
    "2025-03-28_23.48.45.webp",
    "2025-03-01_10.05.14.webp",
    "2025-03-15_12.18.26.webp",
    "2025-03-16_08.31.24.webp",
    "2025-03-23_17.20.07.webp",
    "2025-03-31_21.54.32.webp",
    "2025-03-01_13.47.16.webp",
    "2025-03-15_12.36.44.webp",
    "2025-03-17_14.35.35.webp",
    "2025-03-27_18.10.59.webp",
    "2025-04-04_21.20.32.webp",
  ];
  const roll = Math.floor(Math.random() * images.length);
  const container = document.querySelector(".container");
  container.style.backgroundImage = `url('/website/assets/screenshots/${images[roll]}')`;
  container.style.backgroundSize = "cover";
  container.style.backgroundRepeat = "no-repeat";
  container.style.backgroundPosition = "center";
}
