export default {
  path: '/story/:storyId/stage',
  redirect: { name: 'storyList' },
  meta: {
    requiresSession: true,
    hasNavbar: true
  },
  component: () => import(/* webpackChunkName: "stage" */ '@/views/stage/Index.vue'),
  children: [
    {
      path: ':stageId',
      name: 'stageView',
      component: () => import(/* webpackChunkName: "stage" */ '@/views/stage/View.vue')
    }
  ]
}
