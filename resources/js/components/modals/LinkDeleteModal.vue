<template>
    <div>
        <b-modal
            id="modal-link-delete"
            ref="modal"
            title="Delete Link"
            @ok="handleOk"
        >
            <div class="w-100 d-flex justify-content-center">
                <spinner v-if="loading"></spinner>
            </div>
        </b-modal>
    </div>
</template>

<script>
import store from "../../store";
import Spinner from "../common/Spinner";
import {mapState} from "vuex";
export default {
    components: {Spinner},
    link: "LinkDeleteModal",
    props: {
      link:{type:Object,required:true}
    },
    computed:{
      ...mapState({
          loading: (state) => state.shortener.loading,
      })
    },
    methods: {
        handleOk(bvModalEvt) {
            bvModalEvt.preventDefault()
            this.handleSubmit()
        },
        handleSubmit() {
            store.dispatch('destroyLink',this.link)
                .then((response)=>{
                    this.$nextTick(() => {
                        this.$bvModal.hide('modal-link-delete')
                    });
                }).catch((error)=>{
                console.log(error)
            })
        }
    }
}
</script>

<style scoped>

</style>
