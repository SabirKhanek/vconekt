module.exports = {
  apps: [
    {
      name: 'Vconekt Site',
      script: './node_modules/next/dist/bin/next',
      args: 'run dev',
      cwd: '.',
      instances: '2',
      exec_mode: 'cluster',
      env: {
        PORT: 3001,
        HOST: '0.0.0.0' // Added host configuration
      }
    }
  ]
};
