<template>
    <b-row class="w-100">
        <b-col cols="12" class="d-flex justify-content-end">
            <b-button
                variant="primary"
                @click="$bvModal.show('modal-link-shortener')"
            >Link Shortener
            </b-button>
        </b-col>
        <spinner v-if="isLinksLoaded"></spinner>
        <b-col v-else cols="12">
            <link-shortener-table
                :links="links"
                @update="update"
                @destroy="destroy"
            >
            </link-shortener-table>
        </b-col>
        <link-shortener-modal></link-shortener-modal>
        <link-delete-modal :link="currentLink"></link-delete-modal>
        <link-edit-modal :link="currentLink"></link-edit-modal>
    </b-row>
</template>

<script>
import LinkShortenerModal from "../components/modals/LinkShortenerModal";
import LinkShortenerTable from "../components/tables/LinkShortenerTable";
import store from "../store";
import Spinner from "../components/common/Spinner";
import { mapState } from 'vuex';
import LinkDeleteModal from "../components/modals/LinkDeleteModal";
import LinkEditModal from "../components/modals/LinkEditModal";

export default {
    name: "LinkShortener",
    data: ()=>({
       currentLink: {},
    }),
    components:{
        LinkEditModal,
        LinkDeleteModal,
        Spinner,
        LinkShortenerTable,
        LinkShortenerModal
    },
    computed:{
        ...mapState({
            links: (state) => state.shortener.links,
            isLinksLoaded: (state) => state.shortener.isLinksLoaded,
        }),
    },
    methods:{
        update: function (link){
          this.currentLink = {...link};
          this.$nextTick(()=>{
              this.$bvModal.show('modal-link-edit');
          })
      },
      destroy: function (link){
          this.currentLink = {...link};
          this.$nextTick(()=>{
              this.$bvModal.show('modal-link-delete');
          })
      }
    },
    created() {
        store.dispatch('fetchLinks');
    }
}
</script>

<style scoped>

</style>
