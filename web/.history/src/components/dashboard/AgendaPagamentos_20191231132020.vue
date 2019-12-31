<template>
  <DxScheduler
    :data-source="$store.state.agendaPagamentos"
    :current-date="currentDate"
    :views="views"
    :height="600"
    :start-day-hour="9"
    current-view="week"
    >

    <DxResource
      :data-source="resourcesData"
      field-expr="tipo"
      label="Tipo"
    />
  </DxScheduler>
  <DxExport :enabled="true"/>

</template>
<script>

import { DxScheduler, DxResource, DxExport } from 'devextreme-vue/scheduler'

export default {
  components: {
    DxScheduler,
    DxResource,
    DxExport
  },
  mounted () {
    this.$store.dispatch('loadAgendaPagamentos')
  },
  data () {
    return {
      views: ['week', 'month'],
      currentDate: new Date(2019, 12, 29),
      resourcesData: [
        {
          text: 'Pagamentos',
          id: 1,
          color: 'primary'
        },
        {
          text: 'Vencimentos',
          id: 2,
          color: 'red'
        }
      ]
    }
  }
}
</script>
