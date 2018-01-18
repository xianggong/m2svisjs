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
      children: [
        {
          path: 'ocycle',
          redirect: 'statistics/ocycle',
        },
        {
          path: 'ostall',
          redirect: 'statistics/ostall',
        },
        {
          path: 'oinstructions',
          redirect: 'statistics/oinstructions',
        },
      ]
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
          path: '',
          component: resolve => require(['../components/trace/statistics/overview/main.vue'], resolve)
        },
        {
          path: 'ocycle',
          component: resolve => require(['../components/trace/statistics/overview/cycle.vue'], resolve)
        },
        {
          path: 'ostall',
          component: resolve => require(['../components/trace/statistics/overview/stall.vue'], resolve)
        },
        {
          path: 'oinsts',
          component: resolve => require(['../components/trace/statistics/overview/insts.vue'], resolve)
        },
        {
          path: 'dinsts',
          component: resolve => require(['../components/trace/statistics/detail/insts.vue'], resolve)
        },
        {
          path: 'dutil',
          component: resolve => require(['../components/trace/statistics/detail/utilization.vue'], resolve)
        },
        {
          path: 'dwave',
          component: resolve => require(['../components/trace/statistics/detail/wavefront.vue'], resolve)
        }
      ]
    },
  ]
})
