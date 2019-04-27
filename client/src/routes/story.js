export default {
  path: '/story',
  redirect: { name: 'storyList' },
  meta: {
    requiresSession: true
  },
  component: () => import(/* webpackChunkName: "story" */ '@/views/story/Index.vue'),
  children: [
    {
      path: 'list',
      name: 'storyList',
      component: () => import(/* webpackChunkName: "story" */ '@/views/story/List.vue')
    }
  ]
}
