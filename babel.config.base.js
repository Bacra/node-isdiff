module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '58',
          ie: 11,
        },
      },
    ],
  ],
  sourceMaps: 'inline',
};
