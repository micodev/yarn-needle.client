import { createMetaStore } from '../utils/metaStoreFactory'

export const useCourseTypeStore = createMetaStore('courseType', {
  apiEndpoint: '/api/meta/course-types',
  itemName: 'courseType',
  itemNamePlural: 'courseTypes',
  mapResponse: (courseType) => ({
    id: courseType.id,
    code: courseType.code,
    name: courseType.name
  })
})
