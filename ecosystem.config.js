module.exports = {
  apps: [
    {
      name: 'dua-server',
      script: './dist/server.js',
      args: 'start',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
