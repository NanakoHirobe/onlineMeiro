<template>
<g :transform="position()">
  <rect :x="0.2*unit"
	:y="0.2*unit"
	:width="0.6*unit"
	:height="0.6*unit"
	:fill="col">
  </rect>
  <!--鬼の位置-->
  <path v-if="oni" d="M 10 10 l 15 0 l -7 -7 l -7 7" :fill = "col">
  </path>
  <path v-if="oni" d="M 25 10 l 15 0 l -7 -7 l -7 7" :fill = "col">
  </path>
  <circle :cx="0.3*unit"
	  :cy="0.3*unit"
	  :r="0.05*unit"
	  fill="white">
  </circle>
  <circle :cx="0.7*unit"
	  :cy="0.3*unit"
	  :r="0.05*unit"
	  fill="white">
  </circle>
</g>
</template>

<script>
export default{
    props:['col','pos','oni'],
    computed:{
	unit() {
	    return this.$store.state.unit
	}
    },
    methods:{
	position() {
	    return "translate("+this.unit*this.pos.x+","+this.unit*this.pos.y+")"
	}
    }
}
</script>
