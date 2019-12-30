<template>
  <div>
    <div class="master-detail-caption">{{ detailInfo }}</div>
    <DxDataGrid
      :data-source="dataSource"
      :show-borders="true"
      :column-auto-width="true"
    >
      <DxColumn data-field="Subject"/>
      <DxColumn
        data-field="StartDate"
        data-type="date"
      />
      <DxColumn
        data-field="DueDate"
        data-type="date"
      />
      <DxColumn data-field="Priority"/>
      <DxColumn
        :calculate-cell-value="completedValue"
        data-type="boolean"
        caption="Completed"
      />
    </DxDataGrid>
  </div>
</template>
<script>

import { DxDataGrid, DxColumn } from 'devextreme-vue/data-grid'

export default {
  components: { DxDataGrid, DxColumn },
  props: {
    templateData: {
      type: Object,
      default: () => {}
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
