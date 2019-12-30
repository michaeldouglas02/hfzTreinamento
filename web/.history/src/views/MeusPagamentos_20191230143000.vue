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
