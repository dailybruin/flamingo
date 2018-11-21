module.exports = (api) => {
  api.cache(true);

  const presets = [
    'next/babel',
    '@zeit/next-typescript/babel' // if you use TypeScript
  ];

  return {
    presets
  };
}
