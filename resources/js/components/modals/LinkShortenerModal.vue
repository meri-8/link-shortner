<template>
    <div>
        <b-modal
            id="modal-link-shortener"
            ref="modal"
            title="Enter Link"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
        >
            <div v-if="loading" class="w-100 d-flex justify-content-center">
                <spinner></spinner>
            </div>
            <form v-else ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                    label="Link"
                    label-for="link-input"
                    :invalid-feedback="message"
                    :state="linkState"
                >
                    <b-form-input
                        id="link-input"
                        v-model="link"
                        :state="linkState"
                        required
                    ></b-form-input>
                </b-form-group>
            </form>
        </b-modal>
    </div>
</template>

<script>
import store from "../../store";
import Spinner from "../common/Spinner";
import {mapState} from "vuex";
export default {
    components: {Spinner},
    link: "LinkShortenerModal",
    data() {
        return {
            link: '',
            linkState: null,
            message:'Link is required'
        }
    },
    computed:{
      ...mapState({
         loading: (state) => state.shortener.loading
      }),
    },
    methods: {
        resetModal() {
            this.link = ''
            this.linkState = null
        },
        handleOk(bvModalEvt) {
            bvModalEvt.preventDefault()
            this.linkState = null
            this.handleSubmit()
        },
        handleSubmit() {
            store.dispatch('storeLink',{link:this.link})
                .then((response)=>{
                    this.$nextTick(() => {
                        this.$bvModal.hide('modal-link-shortener')
                    });
                }).catch((error)=>{
                    this.message = error.data.errors.link[0];
                    this.linkState = false;
                })
        }
    }
}
</script>

<style scoped>

</style>
