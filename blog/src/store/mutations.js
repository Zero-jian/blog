//Vuex.mutations
//sessionStorage存储数值到当前浏览器关闭为止
const mutations = {
  changeStatus(state) {
    this.state.status = !this.state.status;
  },
  changePower(state, type) {
    this.state.power = type;
    sessionStorage.setItem("power",type);
  },
  getTime() {
    let myDate = new Date();
    let year = myDate.getFullYear();
    let month = myDate.getMonth() + 1;
    let day = myDate.getDate();
    let time = year * 365 + month * 30 + day;
    this.state.time = time;
  },
  changeId(state, id) {
    this.state.id = id;
    sessionStorage.setItem("id",id);
  },
  changeMusic(state,status) {
    this.state.music = !status;
  },
  hasArticle(state,data) {
    this.state.searchArticle = data;
    sessionStorage.setItem("article",JSON.stringify(data));
  },
}

export default mutations;
