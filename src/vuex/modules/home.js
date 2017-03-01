const state = {
    msg: ''
};

const mutations = {
    ['SET_MSG'] (state, msg) {
        state.msg = msg;
    }
};

export default {
    state,
    mutations
};
