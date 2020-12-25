import firebase from '~/plugins/firebase.js'

const db = firebase.firestore()
const gameRef = db.collection('games/game/players')

export const state = ()=>({
    user:null,
    unit:50,
    me:null,
    positions:null
})

export const mutations = {//代入するメソッドの集まり、同期的なもの
    //ここにtuda.ac.jpのアドレスだけをsetuserする
    setUser(state,user) {
	state.user = {
	    email:user.email,
	    shimei:user.displayName
	}
    },
    clearUser(state) {
	state.user = null
    },
    setMyPosition(state,data) {
	console.log("setMyPosition",data)
	state.me = data;
    },
    setPositions(state,positions) {
	state.positions = positions;
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
	    
    fetchPositions({commit},email) {
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
	    if(!foundMe) { 
		    const x=Math.floor(16*Math.random())
		    const y=Math.floor(12*Math.random())
		    commit('setMyPosition',{oni:(count==0),
					    position:{x:x,y:y}
					   })
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
	

}
