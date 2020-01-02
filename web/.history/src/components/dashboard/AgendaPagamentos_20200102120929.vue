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

</template>
<script>

import { DxScheduler, DxResource } from 'devextreme-vue/scheduler'

export default {
  components: {
    DxScheduler,
    DxResource
  },
  mounted () {
    this.$store.dispatch('loadAgendaPagamentos')
  },
  data () {
    return {
      views: ['day', 'week', 'workWeek', 'month'],
      currentDate: new Date(2020,01, 01),
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
