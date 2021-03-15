
const state = {
    links : [],
    isLinksLoaded:false,
    loading:false
};

const mutations = {
    SET_LINKS: function (state, links){
        state.links = links;
    },
    STORE_LINK: function (state, link){
        state.links.push(link);
    },
    SET_LINKS_LOADING: function (state, loading){
        state.isLinksLoaded = loading
    },
    SET_LOADING: function (state, loading){
        state.loading = loading;
    },
    UPDATE_LINK(state,newLink){
        state.links.forEach((link)=>{
            if( link.id === newLink.id ){
                link.link = newLink.link;
                link.code = newLink.code
            }
        })
    },
    DELETE_LINK(state,linkId){
        state.links =  state.links.filter(function(link) {
            return link.id !== linkId;
        });
    }
};

const actions = {
    /**
     *
     * @param commit
     * @param state
     * @returns {Promise<unknown>}
     */
    fetchLinks: function ({commit,state}){
        commit('SET_LINKS_LOADING',true);
        return new Promise((resolve, reject) => {
           Vue.axios.get('links').then((response)=>{
               const links = response.data.links;
               commit('SET_LINKS',links);
               commit('SET_LINKS_LOADING',false);
               return resolve(links);
           }).catch((error)=>{
               commit('SET_LINKS_LOADING',false);
               return reject(error.response);
           })
        });
    },
    /**
     *
     * @param commit
     * @param state
     * @param payload
     * @returns {Promise<unknown>}
     */
    storeLink: function ({commit,state},payload){
      commit('SET_LOADING',true);
      return new Promise((resolve, reject) => {
          Vue.axios.post('links',payload).then((response)=>{
              const link = response.data.link;
              commit('STORE_LINK',link);
              commit('SET_LOADING',false);
              return resolve(link);
          }).catch((error)=>{
              commit('SET_LOADING',false);
              return reject(error.response);
          })
      })
    },

    /**
     * @param commit
     * @param state
     * @param payload
     * @returns {Promise<unknown>}
     */
    updateLink:function ({commit,state},payload){
        commit('SET_LOADING',true);
        return new Promise((resolve, reject) => {
            Vue.axios.patch(`links/${payload.id}`,{link:payload.link}).then((response)=>{
                const link = response.data.link;
                commit('SET_LOADING',false);
                commit('UPDATE_LINK',link);
                return resolve(link);
            }).catch((error)=>{
                commit('SET_LOADING',false);
                return reject(error.response);
            })
        })
    },

    /**
     *
     * @param commit
     * @param state
     * @param payload
     * @returns {Promise<unknown>}
     */
    destroyLink: function ({commit,state},payload){
        commit('SET_LOADING',true);
        return new Promise((resolve, reject) => {
            Vue.axios.delete(`links/${payload.id}`).then((response)=>{
                commit('DELETE_LINK',payload.id);
                commit('SET_LOADING',false);
               return resolve(true);
            }).catch((error)=>{
                commit('SET_LOADING',false);
                reject(false);
            })
        })
    }
};

const getters = {

};

export default { state, mutations, actions, getters };
