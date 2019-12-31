<template>
  <DxChart
    id="chart"
    :data-source="$store.state.graficoSaldoContas"
    title="Saldo de Contas"
  >
    <DxCommonSeriesSettings
      argument-field="state"
      type="stackedbar"
    />
    <DxTooltip
    :enabled="true"
    :customize-tooltip="customizeTooltip"
    />
  </DxChart>
</template>
<script>
import {
  DxChart,
  DxCommonSeriesSettings,
  DxValueAxis,
  DxTitle,
  DxExport,
  DxTooltip
} from 'devextreme-vue/chart'

export default {
  components: {
    DxChart,
    DxCommonSeriesSettings,
    DxTooltip

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
