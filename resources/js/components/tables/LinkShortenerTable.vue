<template>
    <div class="overflow-auto">
        <p class="mt-3">Shortened Links</p>
        <b-row class="w-100">
            <b-col cols="12">
                <b-table
                    id="my-table"
                    :fields="fields"
                    :items="links"
                    :per-page="perPage"
                    :current-page="currentPage"
                    small
                >
                    <!-- A virtual composite column -->
                    <template #cell(code)="data">
                        <a :href="data.item.link" target="_blank">{{ `${MY_APP}/${data.item.code}` }}</a>
                    </template>
                    <template #cell(action)="data">
                        <span v-b-tooltip.hover title="edit link" class="p-1 cursor-pointer">
                            <b-icon-pencil-fill @click="$emit('update',data.item)" variant="primary"></b-icon-pencil-fill>
                        </span>
                        <span v-b-tooltip.hover title="destroy link" class="p-1  cursor-pointer">
                            <b-icon-trash-fill @click="$emit('destroy',data.item)" variant="danger"></b-icon-trash-fill>
                        </span>
                    </template>
                </b-table>
            </b-col>
            <b-col cols="12" class="d-flex justify-content-center">
                <b-pagination
                    v-model="currentPage"
                    pills
                    :per-page="perPage"
                    :total-rows="links"
                    size="sm">
                </b-pagination>
            </b-col>
        </b-row>
    </div>
</template>

<script>

export default {
    name: "LinkShortenerTable",
    props:{
      links: {type:Array, required:true}
    },
    data() {
        return {
            perPage: 3,
            currentPage: 1,
            MY_APP:'http://127.0.0.1:8000',
            fields:[
                { key: 'id', label: 'ID' },
                { key: 'link', label: 'Link' },
                { key: 'code', label: 'Shorted Link' },
                { key: 'action', label: 'Actions'}
            ]
        }
    },
}
</script>

<style scoped>
    .cursor-pointer{
        cursor: pointer;
    }
</style>
