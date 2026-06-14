const preloadImages = (urls) => {
  const sources = (Array.isArray(urls) ? urls : [urls]).filter(Boolean);

  return Promise.allSettled(
    sources.map(
      (src) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        }),
    ),
  );
};

export default preloadImages;
