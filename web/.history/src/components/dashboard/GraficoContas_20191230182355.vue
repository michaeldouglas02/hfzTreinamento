<template>
  <DxChart
    id="chart"
    :data-source="$store.state.graficoSaldoContas"
    title="Saldo de Contas"
  >

    <DxTooltip
    :enabled="true"
    :customize-tooltip="customizeTooltip"
     :shared="true"
    />
     <DxSeries type="bar"/>
    <DxLegend :visible="false"/>
    <DxLegend :visible="false"/>
  </DxChart>
</template>
<script>
import {
  DxChart,
  DxTooltip,
  DxSeries,
  DxLegend
} from 'devextreme-vue/chart'

export default {
  components: {
    DxChart,
    DxTooltip,
    DxSeries,
    DxLegend
  },
  mounted () {
    this.$store.dispatch('loadGraficoSaldoContas')
  },
  methods: {
    customizeTooltip (pointInfo) {
      return {
        html: `
        <div>
          <div class='tooltip-header'>
          ${pointInfo.argumentText}
          </div>
          <div class='tooltip-body'>
          <div class='series-name'>Saldo: </div>
          <div class='value-text'>${pointInfo.points[0].valueText}
        </div>
        `
      }
    }
  }
}
</script>
<style>
#chart {
    height: 440px;
}
</style>
