var build = {
  baseUrl: '../',
  name: 'resultats-elections',
  dir: '../export-optimized/',
  modules: [
    {
      name: 'elections',
      adapter: 'googletv',
      js: {
        'include': [
          'frontend/app'
          
        ]
      },
      css: {}
    }
  ]
};