const PurchaseRequisitionDummy = {
  pr_type: {
    data: [
      { text: 'Choose PR Type', value: null, disabled: true },
      {
        text: 'Inventory Sparepart',
        value: 'inventory_sparepart'
      },
      {
        text: 'Inventory Barang Chemical',
        value: 'inventory_barang_chemical'
      }
    ]
  },
  pr_category: {
    data: [
      { text: 'Choose Category', value: null, disabled: true },
      {
        text: 'Stock',
        value: 'STOCK'
      },
      {
        text: 'Non Stock',
        value: 'NON STOCK'
      }
    ]
  },
  pr_status: {
    data: [
      { text: 'Pilih Budget Status', value: null, disabled: true },
      {
        text: 'Budgeted',
        value: 'BUDGETED'
      },
      {
        text: 'Unbudgeted',
        value: 'UNBUDGETED'
      }
    ]
  },
  pr_routine: {
    data: [
      { text: 'Pilih Jenis Rutinitas', value: null, disabled: true },
      {
        text: 'Rutin',
        value: 'RUTIN'
      },
      {
        text: 'Non Rutin',
        value: 'NON RUTIN'
      }
    ]
  },
  pr_department: {
    data: [
      { text: 'Choose Department', value: null, disabled: true },
      {
        text: 'Procurement',
        value: 'procurement'
      },
      {
        text: 'Manufacturing',
        value: 'manufacturing'
      },
      {
        text: 'IST',
        value: 'ist'
      },
      {
        text: '...',
        value: '...',
        disabled: true
      }
    ]
  },
  pr_cost_centers: {
    data: [
      { text: 'Choose Cost Center', value: null, disabled: true },
      {
        text: '1.0.0.0.0.0 - Procurement',
        value: '1.0.0.0.0.0'
      },
      {
        text: '2.0.0.0.0.0 - IST',
        value: '2.0.0.0.0.0'
      },
      {
        text: '3.0.0.0.0.0 - Manufacture',
        value: '3.0.0.0.0.0'
      },
      {
        text: '...',
        value: '...',
        disabled: true
      }
    ]
  },
  pr_coa: {
    data: [
      { text: 'Choose COA', value: null, disabled: true },
      {
        text: '312321',
        value: '312321'
      },
      {
        text: '453331',
        value: '453331'
      },
      {
        text: '612221',
        value: '612221'
      },
      {
        text: '...',
        value: '...',
        disabled: true
      }
    ]
  },
  pr_currency: {
    data: [
      {
        text: 'IDR',
        value: 'idr'
      },
      {
        text: 'USD',
        value: 'usd'
      }
    ]
  }
}

export default PurchaseRequisitionDummy
