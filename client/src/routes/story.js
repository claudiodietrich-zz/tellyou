export default {
  path: '/story',
  redirect: { name: 'storyList' },
  meta: {
    requiresSession: true,
    hasNavbar: true
  },
  component: () => import(/* webpackChunkName: "story" */ '@/views/story/Index.vue'),
  children: [
    {
      path: 'list',
      name: 'storyList',
      component: () => import(/* webpackChunkName: "story" */ '@/views/story/List.vue')
    },
    {
      path: 'create',
      name: 'storyCreate',
      component: () => import(/* webpackChunkName: "story" */ '@/views/story/Create.vue')
    },
    {
      path: ':storyId',
      name: 'storyView',
      component: () => import(/* webpackChunkName: "story" */ '@/views/story/View.vue')
    }
  ]
}
