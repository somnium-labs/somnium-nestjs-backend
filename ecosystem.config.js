module.exports = {
  apps: [
    {
      name: 'api-gateway',
      script: 'dist/apps/api-gateway/main.js',
      instances: 2,
      env: {
        NODE_ENV: 'dev',
      },
      watch: true,
    },
    {
      name: 'auth',
      script: 'dist/apps/auth/main.js',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'dev',
      },
      watch: true,
    },
  ],
};