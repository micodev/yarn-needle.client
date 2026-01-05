import { createMetaStore } from '../utils/metaStoreFactory'

export const useNationalityStore = createMetaStore('nationality', {
  apiEndpoint: '/api/meta/nationalities',
  itemName: 'nationality',
  itemNamePlural: 'nationalities',
  mapResponse: (nationality) => ({
    id: nationality.id,
    code: nationality.code,
    name: nationality.name
  })
})
