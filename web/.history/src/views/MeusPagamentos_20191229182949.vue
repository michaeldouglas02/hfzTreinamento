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

import ArrayStore from 'devextreme/data/array_store'
import DataSource from 'devextreme/data/data_source'
import service from './data.js'

const tasks = service.getTasks()

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
          data: tasks,
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
<template>
  <div class="pagamentos">
    <app-crud
      url="/financeiro/pagamentos/"
      :colunas="colunas"
      :formulario="[]"
      :carregar-dados="carregar"
      :permite-editar="false"
      :permite-adicionar="false"
      @instanciaFormulario="recebeFormulario"
    />
  </div>
</template>

<script>
export default {
  methods: {
    async carregar () {
      await this.$store.dispatch('loadContas')
      await this.$store.dispatch('loadTitulos')
    },
    getTitulos (options) {
      return {
        store: this.$store.state.titulos,
        paginate: true
      }
    },
    getContas (options) {
      return {
        store: this.$store.state.contas,
        paginate: true
      }
    },
    recebeFormulario (instancia) {
      this.form = instancia
    }
  },
  data () {
    return {
      form: null
    }
  },
  computed: {
    colunas () {
      const self = this
      return [
        {
          dataField: 'id',
          caption: '#',
          width: 50
        },
        {
          dataField: 'data',
          dataType: 'date'
        },
        {
          dataField: 'valor',
          format: {
            type: 'fixedPoint',
            precision: 2
          }
        },
        {
          dataField: 'titulo',
          lookup: {
            dataSource: this.getTitulos,
            valueExpr: 'id',
            displayExpr: v => `${v.fornecedor_display.nome}, ${v.numero_documento}`
          },
          setCellValue (rowData, value) {
            this.defaultSetCellValue(rowData, value)
            self.titulo = self.$store.state.titulos.filter(f => f.id === value)[0]
            rowData.valor = self.titulo.valor
          }
        },
        {
          dataField: 'conta',
          lookup: {
            dataSource: this.getContas,
            valueExpr: 'id',
            displayExpr: 'descricao'
          }
        }
      ]
    }
  }
}
</script>
