module.exports = {
  apps: [
    {
      name: 'Vconekt Site',
      script: './node_modules/next/dist/bin/next',
      args: 'start',
      cwd: '.',
      instances: '2',
      exec_mode: 'cluster',
      env: {
        PORT: 3001
      }
    }
  ]
};
