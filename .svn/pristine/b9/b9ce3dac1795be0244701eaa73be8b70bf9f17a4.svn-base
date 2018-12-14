<template>
	<div class="swiper-container" id="swiper">
    <div class="swiper-wrapper">
    <!-- 	<div class="swiper-slide" v-for="item in imgs">
				<img class="img" :src="'../../assets/images/' + item.smallPicUrl" />
		  </div> -->

		  <div class="swiper-slide" >
				<img class="img" src="../assets/images/banner4.png" />
				
		  </div> 
		  	  <div class="swiper-slide" >
				<img class="img" src="../assets/images/banner5.png" />
				
		  <!--</div> 
		  	  <div class="swiper-slide" >
				<img class="img" src="../assets/images/banner6.png" />-->
				
		  </div>
		<div class="swiper-slide" >
			<img class="img" src="../assets/images/banner7.png" />

		</div>
	</div>
	<div class="swiper-pagination"></div>
</div>
</template>

<script>
import Swiper from '../assets/js/swiper.min.js'
export default{
	name: 'swiper',
  data () {
	  return{
	  }
  },
  props: {
  	imgs: {
  		type: Array,
  		default: () => []
  	}
  },
   mounted () {
     new Swiper ('.swiper-container', {
			    loop: true,
			    pagination: '.swiper-pagination',
			    paginationClickable: true,
			    autoplay : 2000,
				autoplayDisableOnInteraction : false,		    
			}) 
    }
  // watch: {
  // 	imgs() {
  // 		this.$nextTick(() => {
		//   	new Swiper ('.swiper-container', {
		// 	    loop: true,
		// 	    pagination: '.swiper-pagination',
		// 	    paginationClickable: true,
		// 	    autoplay : 2000,
		// 		autoplayDisableOnInteraction : false,		    
		// 	}) 
  // 		})
  // 	}
  // }
}
</script>

<style>
	img {
		width: 100%;
		height: auto;
	}
	#swiper .swiper-pagination-bullet {
		background: #e5e8e8;
		opacity: 1; 
	}
	#swiper .swiper-pagination-bullet-active {
		background: #1e90ff;
	}
</style>