<template>
  <DxScheduler
    :data-source="$store.state.agendaPagamentos"
    :current-date="currentDate"
    :views="views"
    :height="600"
    :start-day-hour="9"
    current-view="week"
  />
</template>
<script>

import DxScheduler from 'devextreme-vue/scheduler'

export default {
  components: {
    DxScheduler
  },
  mounted () {
    this.$store.dispatch('loadAgendaPagamentos')
  },
  data () {
    return {
      views: ['week', 'month'],
        }
      ]
    }
  }
}
</script>
