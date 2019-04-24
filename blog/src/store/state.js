//Vuex.state
const state = {
  status: false,
  power: JSON.parse(sessionStorage.getItem("power")) || 0,
  time: 1,
  id: JSON.parse(sessionStorage.getItem("id")) || 0,
  //音乐的状态
  music: false,
  //搜索的文章
  searchArticle: JSON.parse(sessionStorage.getItem("article")) || [],
}

export default state;
