const houndstoothImages = import.meta.glob(
  "../assets/projects/houndstooth/*.{jpg,jpeg,png,webp}",
  { eager: true }
);

const styleImages = import.meta.glob(
  "../assets/projects/stylemag/*.{jpg,jpeg,png,webp}",
  { eager: true }
);

const jewelryImages = import.meta.glob(
  "../assets/projects/jewelry/*.{jpg,jpeg,png,webp}",
  { eager: true }
);


function toArray(globResult) {
  return Object.values(globResult).map((m) => m.default);
}

export const PROJECT_IMAGES = {
  designer: [...toArray(houndstoothImages), ...toArray(styleImages), ...toArray(jewelryImages)],
  developer: [],
  creative: [],
};