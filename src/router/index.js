import Vue from 'vue'
import Router from 'vue-router'
import MusicList from '../components/Front/MusicList/MusicList.vue'
import Front from '../components/Front/Front.vue'
import Player from '../components/Player/Player.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
    	path: '/',
    	name: 'Front',
    	component: Front,
    	children: [
	    	{
	    		path: '/',
	    		name: 'MusicList',
	    		component: MusicList
	    	}
    	]
    },
    {
    	path: '/Player',
    	name: 'Player',
    	component: Player
    }
  ]
})
