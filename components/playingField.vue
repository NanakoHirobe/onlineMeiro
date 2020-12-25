<template>
<div>
  <!--スタートボタン-->
{{started}}
  <v-btn v-if="owner" @click="start">start</v-btn>
 
<svg width="800" height="600" v-if="me">
  <rect x="0" y="0" width="800" height="600" fill="#ffffc0">
  </rect>

  <player v-for="p in positions" col="blue" :pos="p.position" :oni="p.oni">
  </player>
  <player col="red" :pos="me.position" :oni="me.oni">
  </player>
</svg>
<br/>
{{$store.state}}
</div>
</template>

<script>
import player from "~/components/player.vue"
export default {
    data() {
	return {
	   
	    
	    
	}
    },
    mounted(){
	window.addEventListener("keydown",e=>this.kbd(e)); 
    },
    //プレイヤーの動き
    methods: {
	start() {
	   this.$store.dispatch('startGame');
	},
	kbd(e) {
	    if(!this.started) {
		return
	    }
	    const pos = {x:this.me.position.x,y:this.me.position.y}
	    if(e.keyCode==39) {
		pos.x++;
	    }
	    else if(e.keyCode==37) {
		pos.x--;
	    }
	    else if(e.keyCode==38) {
		pos.y--;
	    }
	    else if(e.keyCode==40) {
		pos.y++;
	    }
	    for(let other of this.positions) {
		if(other.position.x == pos.x && other.position.y == pos.y &&
		   this.me.oni && !other.oni) {
		    console.log("caught")
		    this.$store.dispatch('saveOtherPosition',
					 {email:other.email,
					  position:other.position,
					  oni:true
					  })
		}
	    }
	    this.$store.dispatch('saveMyPosition',pos)
	}
    },
    computed: {
	owner() {
	    if(this.$store.state.user) {
		return this.$store.state.owner
	    }
	    else {
		return false
	    }
	},
	me() {
	    return this.$store.state.me
	},
	positions() {
	    return this.$store.state.positions
	},
	started() {
	    return this.$store.state.started
	}
    },
    components:{
	player
    }
}
</script>
