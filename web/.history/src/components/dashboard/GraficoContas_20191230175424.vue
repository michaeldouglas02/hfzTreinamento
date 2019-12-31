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
    <DxSeries
      value-field="maleyoung"
      name="Male: 0-14"
      stack="male"
    />
    <DxSeries
      value-field="malemiddle"
      name="Male: 15-64"
      stack="male"
    />
    <DxSeries
      value-field="maleolder"
      name="Male: 65 and older"
      stack="male"
    />
    <DxSeries
      value-field="femaleyoung"
      name="Female: 0-14"
      stack="female"
    />
    <DxSeries
      value-field="femalemiddle"
      name="Female: 15-64"
      stack="female"
    />
    <DxSeries
      value-field="femaleolder"
      name="Female: 65 and older"
      stack="female"
    />
    <DxExport :enabled="true"/>
    <DxTooltip :enabled="true"/>
  </DxChart>
</template>
<script>
import {
  DxChart,
  DxSeries,
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
    DxSeries,
    DxCommonSeriesSettings,
    DxValueAxis,
    DxTitle,
    DxLegend,
    DxBorder,
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
