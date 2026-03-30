const designerImages = import.meta.glob(
  "../assets/projects/houndstooth/*.{jpg,jpeg,png,webp}",
  { eager: true }
);

const styleImages = import.meta.glob(
  "../assets/projects/stylemag/*.{jpg,jpeg,png,webp}",
  { eager: true }
);

function toArray(globResult) {
  return Object.values(globResult).map((m) => m.default);
}

export const PROJECT_IMAGES = {
  designer: [...toArray(designerImages), ...toArray(styleImages)],
  developer: [],
  creative: [],
};