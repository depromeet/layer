// Swiper 11 maps "swiper/css" subpaths directly to .css files in its exports map.
// Under moduleResolution: "bundler", TS can't find type declarations for these
// side-effect imports, so declare them as ambient modules.
declare module "swiper/css";
declare module "swiper/css/navigation";
declare module "swiper/css/pagination";
