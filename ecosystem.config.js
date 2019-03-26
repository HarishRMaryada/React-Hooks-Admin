module.exports = {
  apps: [
    {
      name: "admin-hooks",
      script: "npm",

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      args: "run start:production",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "qa"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ],

  deploy: {
    production: {
      user: "ubuntu",
      host: "127.0.0.1",
      ref: "origin/master",
      repo: "https://github.com/HarishRMaryada/React-Hooks-Admin.git",
      path: "/home/ubuntu/sites/admin-hooks/frontend/production",
      "post-deploy": "npm install; yarn build;"
    },
    development: {
      user: "ubuntu",
      host: "127.0.0.1",
      ref: "origin/development",
      repo: "https://github.com/HarishRMaryada/React-Hooks-Admin.git",
      path: "/home/ubuntu/sites/admin-hooks/frontend/development",
      "post-deploy": "npm install;yarn build;"
    },
    qa: {
      user: "ubuntu",
      host: "127.0.0.0",
      ref: "origin/qa",
      repo: "https://github.com/HarishRMaryada/React-Hooks-Admin.git",
      path: "/home/ubuntu/sites/admin-hooks/frontend/qa",
      "post-deploy": "npm install; yarn build;"
    },
    staging: {
      user: "ubuntu",
      host: "127.0.0.0",
      ref: "origin/staging",
      repo: "https://github.com/HarishRMaryada/React-Hooks-Admin.git",
      path: "/home/ubuntu/sites/admin-hooks/frontend/staging",
      "post-deploy": "npm install; yarn build;"
    }
  }
};

//pm2 deploy ecosystem.config.js development/qa/staging setup
