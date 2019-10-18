import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

const _import = (file) => require(`@/views/${file}`).default

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home/summary'
    }, {
      path: '/home',
      component: _import('home'),
      children: [
        { path: 'summary', component: _import('summary') },
        { path: 'topicMgr', component: _import('topicMgr') },
        { path: 'findMsg', component: _import('findMsg') }
      ]
    }
  ]
})
