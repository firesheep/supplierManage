import Vue from 'vue'
import Router from 'vue-router'
import supplierList from '@/components/supplierList'
import reconciliationSheet from '@/components/reconciliationSheet'
import addSupplier from '@/components/addSupplier'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'supplierList',
      component: supplierList
    },
    {
      path: '/supplierList',
      name: 'supplierList',
      component: supplierList
    },
    {
    	path:'/reconciliationSheet',
    	name:'reconciliationSheet',
    	component: reconciliationSheet
    },
    {
    	path:'/addSupplier',
    	name:'addSupplier',
    	component: addSupplier
    }
  ]
})
