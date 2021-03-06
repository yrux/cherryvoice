export const state = () => ({
    user: {},
    isLoggedIn: false,
    loginErrors: [],
})
export const mutations = {
    setLogin(state, loginStatus) {
        state.isLoggedIn = loginStatus
    },
    setLoginUser(state, User) {
        state.user = User
    },
    setLoginErrors(state, errors){
        state.loginErrors = errors
    }
}
export const actions = {
    async nuxtServerInit({ commit, dispatch }, { req }) {
        await dispatch('storeDispatchFunc')
    },
    async storeDispatchFunc({ commit }) {
        const { data } = await this.$axios.get('/api/config-keyval')
        const  content  = await this.$axios.get('/api/config-content').then(e=>e.data)
        commit('config/update', data)
        commit('config/contentUpdate', content)
    },
    async checkLogin({ commit }) {
        const { data } = await this.$axios.get('/api/me')
        commit('setLogin', data.status)
        if(data.status==true){
            commit('setLoginUser', data.data)
        }
    },
    async login({ commit }, {password, email}) {
        const { data } = await this.$axios.post('/api/login',{
            password: password,
            email: email,
        }).catch(e=>{
            return e.response
        })
        if(!data.error){
            if(data.id){
                commit("setLoginUser", data)
                commit("setLogin", true)
            }
        }else{
            commit("setLoginErrors",data.data)
        }
    },
    async logout({ commit }) {
        await this.$axios.get('/api/logout')
        commit("setLoginUser", {})
        commit("setLogin", false)
    },
}