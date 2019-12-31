<template>
  <DxChart
    id="chart"
    :data-source="dataSource"
    title="Population: Age Structure"
  >
    <DxCommonSeriesSettings
      argument-field="state"
      type="stackedbar"
    />
    <DxValueAxis>
      <DxTitle text="Populations, millions"/>
    </DxValueAxis>
    <DxExport :enabled="true"/>
    <DxTooltip :enabled="true"/>
  </DxChart>
</template>
<script>
import {
  DxChart,
  DxCommonSeriesSettings,
  DxValueAxis,
  DxTitle,
  DxLegend,
  DxBorder,
  DxExport,
  DxTooltip
} from 'devextreme-vue/chart'

export default {
  components: {
    DxChart,
    DxCommonSeriesSettings,
    DxValueAxis,
    DxTitle,
    DxExport,
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
