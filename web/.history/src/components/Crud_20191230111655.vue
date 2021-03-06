<template>
  <DxDataGrid
    ref="grid"
    :data-source="dataSource"
    :selection="selecao"
    :editing="edicao"
    :search-panel="pesquisa"
    :columns="columns"
    :show-borders="true"
    :on-toolbar-preparing="toolbarPreparing"
    @selection-changed="onSelectionChanged"
  >
  <DxMasterDetail
      :enabled="masterDetail"
      template="masterDetailTemplate"
    />
    <template #masterDetailTemplate="{ data: employee }">
      <DetailTemplate
        :template-data="employee"
      />
    </template>
  </DxDataGrid>
</template>

<script>
import { DxDataGrid, DxMasterDetail } from 'devextreme-vue/data-grid'
import CustomStore from 'devextreme/data/custom_store'
import notify from 'devextreme/ui/notify'
import DetailTemplate from '../views/MeusPagamentos'
import service from '../plugins/axios'
const employees = service.getEmployees()
export default {
  components: {
    DxDataGrid,
    DxMasterDetail,
    DetailTemplate
  },
  props: {
    masterDetail: {
      type: Boolean
    },
    url: {
      type: String,
      required: true
    },
    carregarDados: {
      type: Function
    },
    colunas: {
      type: Array,
      required: true
    },
    formulario: {
      type: Array,
      required: true
    },
    qtdCamposFormulario: {
      type: Number,
      default: 3
    },
    permiteAdicionar: {
      type: Boolean,
      default: true
    },
    permiteEditar: {
      type: Boolean,
      default: true
    },
    acoes: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      fornecedores: [],
      selecao: {
        mode: 'single'
      },
      pesquisa: {
        visible: true,
        width: 300
      },
      edicao: {
        allowAdding: this.permiteAdicionar,
        allowUpdating: this.permiteEditar,
        allowDeleting: true,
        useIcons: true,
        mode: 'form',
        form: {
          labelLocation: 'top',
          colCount: this.qtdCamposFormulario,
          showValidationSummary: true,
          items: this.formulario,
          onInitialized: this.inicializaFormulario
        }
      },
      columns: this.colunas
    }
  },
  methods: {
    onSelectionChanged ({ selectedRowsData }) {
      this.$emit('selecionou', selectedRowsData[0])
    },
    atualizar () {
      const grid = this.$refs.grid.instance
      grid.refresh()
    },
    inicializaFormulario ({ component }) {
      this.$emit('instanciaFormulario', component)
    },
    toolbarPreparing (grid) {
      let toolbarItems = grid.toolbarOptions.items

      this.acoes.forEach(a => toolbarItems.unshift(a))

      toolbarItems.unshift({
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick (e) {
            grid.component.refresh()
          }
        }
      })
    }
  },
  computed: {
    dataSource () {
      return new CustomStore({
        employees,
        key: 'id',
        load: async options => {
          if (this.carregarDados) {
            await this.carregarDados()
          }
          let dados = []
          try {
            const { data } = await this.axios.get(this.url)
            dados = data
          } catch {
            notify('Erro ao executar a requisição', 'error', 3000)
          }
          return {
            data: dados,
            totalCount: dados.length
          }
        },
        insert: values => this.axios.post(this.url, values),
        update: (key, values) => this.axios.patch(`${this.url}${key}/`, values),
        remove: async key => {
          try {
            await this.axios.delete(`${this.url}${key}/`)
          } catch {
            notify('Erro ao excluir o registro. Verifique se não existe registros filhos.', 'error', 3000)
          }
        }
      })
    }
  }
}
</script>
