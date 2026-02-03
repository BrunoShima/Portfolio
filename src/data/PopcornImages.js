function globToArray(globResult) {
    return Object.values(globResult);
}

// DESIGNER
const designer = globToArray(
    import.meta.glob("/src/assets/images/houndstooth/*.{jpg,jpeg,png,webp}", {
        eager: true,
        as: "url",
    })
);

// DEVELOPER
const developer = globToArray(
    import.meta.glob("/src/assets/images/houndstooth/*.{jpg,jpeg,png,webp}", {
        eager: true,
        as: "url",
    })
);

// CREATIVE
const creative = globToArray(
    import.meta.glob("/src/assets/images/houndstooth/*.{jpg,jpeg,png,webp}", {
        eager: true,
        as: "url",
    })
);

export const POPCORN_IMAGES = {
    designer,
    developer,
    creative,
};
