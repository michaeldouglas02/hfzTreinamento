<template>
  <div>
    <div class="master-detail-caption">{{ detailInfo }}</div>
    <DxDataGrid
      :data-source="dataSource"
      :show-borders="true"
      :column-auto-width="true"
    >
      <DxColumn
        data-field="Data do Pagamento"
        data-type="date"
      />
      <DxColumn
        data-field="Valor"
        data-type="number"
      />
    </DxDataGrid>
  </div>
</template>
<script>

import { DxDataGrid, DxColumn } from 'devextreme-vue/data-grid'

import ArrayStore from 'devextreme/data/array_store'
import DataSource from 'devextreme/data/data_source'

export default {
  components: { DxDataGrid, DxColumn },
  props: {
    templateData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    let { FirstName, LastName } = this.templateData.data
    return {
      dataSource: this.getTasks(this.templateData.key),
      detailInfo: `${FirstName} ${LastName}'s Tasks`
    }
  },
  methods: {
    completedValue (rowData) {
      return rowData.Status === 'Completed'
    },
    getTasks (key) {
      return new DataSource({
        store: new ArrayStore({
          key: 'ID'
        }),
        filter: ['EmployeeID', '=', key]
      })
    }
  }
}
</script>
<style>
.master-detail-caption {
    padding: 0 0 5px 10px;
    font-size: 14px;
    font-weight: bold;
}</style>
