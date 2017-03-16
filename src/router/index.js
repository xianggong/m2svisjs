import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: resolve => require(['../components/main.vue'], resolve),
    },
    {
      path: '/:tracename',
      component: resolve => require(['../components/trace/main.vue'], resolve),
    },
    {
      path: '/:tracename/rawdata',
      component: resolve => require(['../components/trace/rawdata/main.vue'], resolve),
    },
    {
      path: `/:tracename/statistics`,
      component: resolve => require(['../components/trace/statistics/main.vue'], resolve),
      children: [
        {
          path: '/',
          component: resolve => require(['../components/trace/statistics/overview/main.vue'], resolve)
        },
        {
          path: '/overview',
          component: resolve => require(['../components/trace/statistics/overview/main.vue'], resolve)
        },
        {
          path: '/stall',
          component: resolve => require(['../components/trace/statistics/stall/main.vue'], resolve)
        },
        {
          path: '/instructions',
          component: resolve => require(['../components/trace/statistics/instructions/main.vue'], resolve)
        }
      ]
    },
  ]
})
