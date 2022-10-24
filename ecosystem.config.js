/**
 * Configuração das variáveis de ambiente, geralmente
 * usadas pelo pm2: https://pm2.io/doc/en/runtime/guide/ecosystem-file
 */
 module.exports = {
  apps: [
    {
      name: "trello-tasks-monitor",
      script: "npm",
      args: "start",
      ignore_watch: ["node_modules", "logs", "*.log"],
      watch: false,
      env_development: {
        BASE_URL: "",
        NODE_ENV: "development",
        MONGODB_URI: "",
        DATABASE: "",
        PORT: 9009,
      },
      env_production: {
        BASE_URL: "",
        MONGODB_URI: "",
        DATABASE: "",
        PORT: 9009,
        NODE_ENV: "production",
      },
    },
  ],
};