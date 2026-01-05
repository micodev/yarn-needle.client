import { createMetaStore } from '../utils/metaStoreFactory'

export const useCategoryOptionsStore = createMetaStore('categoryOptions', {
  apiEndpoint: '/api/meta/subhobbies',
  itemName: 'category',
  itemNamePlural: 'categories',
  mapResponse: (category) => ({
    id: category.id,
    code: category.code,
    name: category.name
  }),
  additionalState: {
    selectedCategoryId: null
  }
})
