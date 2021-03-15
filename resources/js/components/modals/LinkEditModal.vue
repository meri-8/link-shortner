<template>
    <div>
        <b-modal
            id="modal-link-edit"
            ref="modal"
            title="Edit Link"
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
                        v-model="link.link"
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
    link: "LinkEditModal",
    props:{
      link:{type:Object,required:true}
    },
    data() {
        return {
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
            this.linkState = null
        },
        handleOk(bvModalEvt) {
            bvModalEvt.preventDefault()
            this.linkState = null
            this.handleSubmit()
        },
        handleSubmit() {
            store.dispatch('updateLink',this.link)
                .then((response)=>{
                    this.$nextTick(() => {
                        this.$bvModal.hide('modal-link-edit')
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
