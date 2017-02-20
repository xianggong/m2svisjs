import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/Home'
import Trace from 'components/Trace'
import TraceData from 'components/TraceData'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/:tracename', name: 'Trace', component: Trace },
    { path: '/:tracename/rawdata', name: 'TraceData', component: TraceData },
  ],
  // mode: "history"
})
