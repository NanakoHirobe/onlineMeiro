import firebase from '~/plugins/firebase.js'

const db = firebase.firestore()
const gameRef = db.collection('games/game/players')
const startRef = db.doc('games/game')
export const state = ()=>({
    user:null,
    unit:50,
    me:null,
    positions:null,
    owner:false,
    limit:2,
    started:null,
    
})

export const mutations = {//代入するメソッドの集まり、同期的なもの
    //ここにtuda.ac.jpのアドレスだけをsetuserする
    setUser(state,user) {
	state.user = {
	    email:user.email, //メールアドレスを登録
	    shimei:user.displayName //ユーザー名を登録
	}
    },
    startGame(state) {
	state.started = true
    },
    clearUser(state) {
	state.user = null
    },
    setMyPosition(state,data) { //自分のposition
	console.log("setMyPosition",data)
	state.me = data;
    },
    setPositions(state,positions) {
	state.positions = positions;
    },
    setOwner(state) {
	state.owner = true;
    },
    setStart(state,started) {
	console.log("setStart",started)
	state.started = started
    }
}

export const actions = { //非同期的なもの,ログイン
    login({commit,dispatch}) {
	console.log("login action")
	const provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider)
	    .then(function(result) {
		const user = result.user
		commit('setUser',user)
		//dispatch('fetchMyPosition',user.email)
		dispatch('fetchStart')
		dispatch('fetchPositions',user.email)
	    })
    },
    logout({commit}) {
	firebase.auth().signOut()
	    .then(function(result) {
		commit('clearUser')
	    })
    },
    fetchMyPosition({commit},email) {

	gameRef.doc(email)
	    .onSnapshot(doc=>{
		console.log("fetchMyPosition",doc.data())
		if(doc.data()) {
		    commit('setMyPosition',doc.data())
		}
		else { //初めての人の位置
		    const x=Math.floor(16*Math.random())
		    const y=Math.floor(12*Math.random())
		    commit('setMyPosition',{oni:(false),
					    position:{x:x,y:y}
					   })
		}
	    })
    },	
	    
    fetchPositions({commit,dispatch,state},email) {
	gameRef.onSnapshot(snapshot=>{ 
	    const positions = []
	    let count = 0
	    let foundMe = false
	    snapshot.forEach((doc) => {
		if(doc.id != email) {
		    console.log(doc.data())
		    positions.push({email:doc.id,...doc.data()})
		    count++
		}
		else {
		    foundMe = true
		    commit('setMyPosition',doc.data())
		}
	    })
	    if(!foundMe && count<=state.limit-1) { 
		const x=Math.floor(16*Math.random())
		const y=Math.floor(12*Math.random())
		commit('setMyPosition',{oni:(count==0),
					position:{x:x,y:y}
				       })
		dispatch('saveMyPosition',{x:x,y:y})
		if (count==state.limit-1) {  //最後に入った人がオーナー
		    commit('setOwner')
		}
	    }
	    commit('setPositions',positions)
	})
    },
    saveMyPosition({commit,state},pos) {
	gameRef.doc(state.user.email)
	    .set({position:pos,oni:state.me.oni})
	    .then(function(){
		commit('setMyPosition',{position:pos,oni:state.me.oni})
	    })
    },
    saveOtherPosition({commit,state},data) {
	gameRef.doc(data.email)
	    .update({oni:data.oni })
    },
    fetchStart({commit}) {
	startRef.onSnapshot(doc=>{
	    console.log("fetchStart",doc.data().started)
	    commit('setStart',doc.data().started)
	})
    },		    
    startGame({commit}) {
	startRef.update({started:true})
	//commit('startGame')
    },
    stopGame({commit}) {
	startRef.update({started:false})
    },
    deleteAll({commit}) {
	gameRef.get().then(snapshot => {
	    snapshot.forEach(function(doc){
		doc.ref.delete()	
	    })
	})
    }			      

}
