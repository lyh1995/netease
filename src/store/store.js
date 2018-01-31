import Vue from 'vue'
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuex from 'vuex'


Vue.use(VueAxios, axios);

Vue.use(Vuex);



export const store= new Vuex.Store({
	state: {
		isShowHead: true,//控制header是否显示
		isMyListShow: false,//控制'创建的歌单'是否显示
		isShowFooter: true,//控制播放器是否显示
		isPlaying: false,
		isScrolling: false,
		isShowSearchSongList: false,
		testData:'',
		headIcon: [{
			imgUrl: "url('/static/asideList.svg')",
			leftStyle: `calc(7% - 17.5px)`
		}, {
			imgUrl: "url('/static/music.svg')",
			leftStyle: `calc(35% - 17.5px)`
		}, {
			imgUrl: "url('/static/wangyiyun.svg')",
			leftStyle: `calc(50% - 17.5px)`
		}, {
			imgUrl: "url('/static/found.svg')",
			leftStyle: `calc(65% - 17.5px)`
		}, {
			imgUrl: "url('/static/search.svg')",
			leftStyle: `calc(93% - 17.5px)`
		}],
		playerHeadIcon: [{
			imgUrl: "url('/static/goback.svg')",
			leftStyle: "0%"
		}, {
			imgUrl: "url('/static/share.svg')",
			leftStyle: "85.9%"
		}],
		listData: [{
			icon: "url('/static/localMusic.svg')",
			listName: "本地音乐"
		}, {
			icon: "url('/static/recentPlayed.svg')",
			listName: "最近播放"
		}, {
			icon: "url('/static/download.svg')",
			listName: "下载管理"
		}, {
			icon: "url('/static/myRadio.svg')",
			listName: "我的电台"
		}, {
			icon: "url('/static/myCollection.svg')",
			listName: "我的收藏"
		}],
		initialTabData: "url('/static/tabDown.svg')",//创建歌单的icon
		musicListCreated: [{
			name: "reputation",
			imgUrl: "/static/reputation.jpg",
			songNum: "15"
		}, {
			name: "1989",
			imgUrl: "/static/1989.jpg",
			songNum: "19"
		}, {
			name: "red",
			imgUrl: "/static/red.jpg",
			songNum: "22"
		}],
		musicPlayedNow: {
			songName: 'Getaway Car',
			songImg: '/static/reputation.jpg',
			singer: 'Taylor Swift',
			lyric: 'Taylor Swift - Reputation',
			song: '/static/Taylor Swift - Getaway Car.mp3',
			songTime: '233'
		},
		testSearchData: ["No Limit", "Perfect"],
		skinColor: "#D43C31",//"#C20C0C",
		footerColor: "#FFFFFF",
		tabColor: "#F0F4F3",
		playerBack: "#6E6E6E",
		playState: "url('/static/play.svg')",
		playMode: "loop",
		lrcData: [],
		strix: 0,
		songStartTime: 0.2,
		lrcScrollTop: 0,
		songTimeNow: 0,
		songCurrentTime: 0,
		songSearchList: [],
		songSearched: "",
		songPlayingId: "",
		keycode: [8, 12, 32, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 109, 110, 111, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222]
	},
	mutations: {
		toogleTab (state) {
			if (state.initialTabData == "url('/static/tabDown.svg')") {
				state.initialTabData = "url('/static/tabUp.svg')";
				state.isMyListShow = true;
			} else {
				state.initialTabData = "url('/static/tabDown.svg')";
				state.isMyListShow = false;
			}
		},//切换'创建的歌单'下拉页
		toogleSettings (state) {
			console.log('hi');
		},
		tooglePlayState (state) {
			console.log('111');
			if (state.playState == "url('/static/pause.svg')") {
				state.playState = "url('/static/play.svg')";
				state.isPlaying = false;
			} else {
				state.playState = "url('/static/pause.svg')";
				state.isPlaying = true;
			}
		},//切换播放状态
		songTimeChange (state, time) {
			state.songTimeNow = time;
			if (time <= state.songStartTime) {
				state.strix = 0;
				state.musicPlayedNow.lyric = state.lrcData[0].text;
			} else if (state.strix < state.lrcData.length - 1) {
				if (time > state.lrcData[state.strix+1].time) {
					state.strix++;
					state.musicPlayedNow.lyric = state.lrcData[state.strix].text;
				}
			}
		},
		lrcScrollTopChange (state, top) {
			state.lrcScrollTop = top;
		},
		scroll (state, bool) {
			state.isScrolling = bool;
		},
		toogleHead (state, bool) {
			state.isShowHead = bool;
		},
		songPercentChange (state, obj) {
			let songTime = Number.parseFloat(state.musicPlayedNow.songTime);
			state.songCurrentTime = obj.nume / obj.deno * songTime;
			/*if (state.songCurrentTime > songTime) {
				state.songCurrentTime = songTime;
			}*/
		},
		musicIdChange (state, id) {
			let url = `http://music.163.com/song/media/outer/url?id=${id}.mp3`;
			state.musicPlayedNow.song = url;
			state.songPlayingId = id;
		},
		getSongSearchList (state, arr) {
			if (arr.length <= 10) {
				state.songSearchList = arr;
			} else {
				state.songSearchList = arr.slice(0, 10);
			}
		},
		isShowSearchList (state, bool) {
			state.isShowSearchSongList = bool;
		},
		getSongSearchedName (state, str) {
			state.songSearched = str;
		}
	},
	getters: {

	},
	actions: {
		getLrc({ commit,state }) {
			return new Promise((resolve, reject) => {
				Vue.axios.get('/api/lryic')
					.then (res => {
						console.log(res);
						if (res.data.errno === 0) {
							let dataOfLrc = res.data.lrcData.split("<br/>");
							let dataLrc = [];
							for (let i in dataOfLrc) {
								let timeMatch = dataOfLrc[i].match(/\[(\d+:\d+\.\d+)\]/);
								timeMatch = timeMatch[1];
								console.log(timeMatch);
								let minutes = parseInt(timeMatch.slice(0, timeMatch.indexOf(':')));
								let seconds = parseFloat(timeMatch.substr(timeMatch.indexOf(':')+1));
								let newTime = (minutes*60 + seconds).toFixed(2);
								console.log(newTime);
								dataLrc.push({
									index: i,
									time: newTime,
									text: dataOfLrc[i].replace(/^.+?\]/, '')
								})
							}
							state.lrcData = dataLrc;
							localStorage.lrcData = JSON.stringify(state.lrcData);
							console.log('lrcdata');
							console.log(state.lrcData);
						}
					})
					.then(() => {
					});
					resolve();
			});
		},
		getTestData({ commit,state }) {
			return new Promise((resolve, reject) => {
				Vue.axios.get('/api/test-data')
					.then (res => {
						state.testData = res;
					})
					.then(() => {
					});
				resolve();
			});
		}
	}

})