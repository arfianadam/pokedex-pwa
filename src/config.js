require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'pokeapi.salestock.net/api/v2',
  apiPort: process.env.APIPORT,
  app: {
    title: 'PokedexPWA',
    description: 'Pokedex now on PWA!',
    head: {
      titleTemplate: 'PokedexPWA - %s',
      meta: [
        { name: 'description', content: 'Pokedex now on PWA!' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'PokedexPWA' },
        { property: 'og:image', content: 'https://pokedex.arfianadam.com/logo.png' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'PokedexPWA' },
        { property: 'og:description', content: 'Pokedex now on PWA!' },
        { property: 'og:card', content: 'summary' },
        { property: 'og:site', content: 'https://pokedex.arfianadam.com' },
        { property: 'og:creator', content: '@arfianadam' },
        { property: 'og:image:width', content: '200' },
        { property: 'og:image:height', content: '200' }
      ]
    }
  }
}, environment);
