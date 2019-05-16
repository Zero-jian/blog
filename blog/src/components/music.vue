// <template>
//   <div id="music">
//     <audio loop autoplay="autoplay" id="audio">
//       你的浏览器不支持audio标签
//       <source src="../../static/music/children.mp3">
//     </audio>
//   </div>
// </template>
// <script>
// import { mapMutations } from 'vuex';
// import { mapState } from 'vuex';
// export default {
//   data() {
//     return {

//     }
//   },
//   methods: {
//     loading() {
//       let audio = document.getElementById('audio');
//       audio.addEventListener('loadstart',()=>{
//         this.musicStatus(this.music);
//       });
//     },
//     ...mapMutations({
//       musicStatus: 'changeMusic'
//     }),
//   },
//   mounted() {
//     if(document.documentElement.clientWidth > 980 ){
//         this.loading();
//     }
//   },
//   computed: {
//     ...mapState({
//       music: 'music'
//     })
//   },
//   watch: {
//       //根据状态来判断是否播放音乐Vue.state
//       music() {
//         let audio = document.getElementById('audio');
//         if(this.music) {
//           audio.play();
//         }else{
//           audio.pause();
//         }
//     }
//   }
// }
// </script>

