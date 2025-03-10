/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('/hello/:name', async (c) => {
  return {
    body: {
      en: `Hello ${c.params.name}`,
      fr: `Salut ${c.params.name}`,
      es: `Holà ${c.params.name}`,
    },
  }
})

