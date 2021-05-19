export const topCustomer = [
  {
    id: 1,
    sn: '1',
    customer: 'Fan Leng Leng',
    ordersMade: 100,
    averageOrderValue: 24.64,
    itemsBought: 90,
    grossSales: 150.00,
    netSales: 120.00,
    nested: [
      { id: 1, sn: '1', date: '01/05/2021', orderID: 'ORD0000A', itemsSold: 90, grossSales: 150.00, netSales: 120.00 },
      { id: 2, sn: '2', date: '01/06/2021', orderID: 'ORD0563B', itemsSold: 67, grossSales: 150.00, netSales: 40.00 },
      { id: 3, sn: '3', date: '01/06/2021', orderID: 'ORD0898D', itemsSold: 35, grossSales: 150.00, netSales: 30.00 },
    ],
    general: [
      { totalOrders: 38, totalRefunds: 0, itemsBought: 94, kolOrders: 24, kolMFBF: 'charlene yue', grossSales: 1490.39, netSales: 1490.39, averageOrderValue: 78.39, nonKolOrders: 5 }
    ]
  },
  {
    id: 2, sn: '2', customer: 'Mei You Yong', ordersMade: 24, averageOrderValue: 5.90, itemsBought: 67, grossSales: 150.00, netSales: 40.00, nested: [
      { id: 1, sn: '1', date: '01/05/2021', orderID: 'ORD0000A', itemsSold: 90, grossSales: 150.00, netSales: 120.00 },
      { id: 2, sn: '2', date: '01/06/2021', orderID: 'ORD0563B', itemsSold: 67, grossSales: 150.00, netSales: 40.00 },
      { id: 3, sn: '3', date: '01/06/2021', orderID: 'ORD0898D', itemsSold: 35, grossSales: 150.00, netSales: 30.00 },
    ],
    general: [
      { totalOrders: 38, totalRefunds: 0, itemsBought: 94, kolOrders: 24, kolMFBF: 'charlene yue', grossSales: 1490.39, netSales: 1490.39, averageOrderValue: 78.39, nonKolOrders: 5 }
    ]
  },
  {
    id: 3, sn: '3', customer: 'You Zong Xian', ordersMade: 2, averageOrderValue: 3.67, itemsBought: 35, grossSales: 150.00, netSales: 30.00, nested: [
      { id: 1, sn: '1', date: '01/05/2021', orderID: 'ORD0000A', itemsSold: 90, grossSales: 150.00, netSales: 120.00 },
      { id: 2, sn: '2', date: '01/06/2021', orderID: 'ORD0563B', itemsSold: 67, grossSales: 150.00, netSales: 40.00 },
      { id: 3, sn: '3', date: '01/06/2021', orderID: 'ORD0898D', itemsSold: 35, grossSales: 150.00, netSales: 30.00 },
    ],
    general: [
      { totalOrders: 38, totalRefunds: 0, itemsBought: 94, kolOrders: 24, kolMFBF: 'charlene yue', grossSales: 1490.39, netSales: 1490.39, averageOrderValue: 78.39, nonKolOrders: 5 }
    ]
  },
  {
    id: 4, sn: '4', customer: 'Wei He', ordersMade: 1, averageOrderValue: 15.30, itemsBought: 15, grossSales: 150.00, netSales: 0.05, nested: [
      { id: 1, sn: '1', date: '01/05/2021', orderID: 'ORD0000A', itemsSold: 90, grossSales: 150.00, netSales: 120.00 },
      { id: 2, sn: '2', date: '01/06/2021', orderID: 'ORD0563B', itemsSold: 67, grossSales: 150.00, netSales: 40.00 },
      { id: 3, sn: '3', date: '01/06/2021', orderID: 'ORD0898D', itemsSold: 35, grossSales: 150.00, netSales: 30.00 },
    ],
    general: [
      { totalOrders: 38, totalRefunds: 0, itemsBought: 94, kolOrders: 24, kolMFBF: 'charlene yue', grossSales: 1490.39, netSales: 1490.39, averageOrderValue: 78.39, nonKolOrders: 5 }
    ]
  },
]

export const topKol = [
  {
    id: 1, sn: '1', kol: 'Charlene Yue', itemsSold: 100, netSales: 1000.00, orders: 10, totalCommission: 120.00, nested: [
      { id: 1, sn: '1', date: '01/05/2021', orderID: 'ORD0000A', itemsSold: 90, netSales: 150.00, totalCommission: 120.00 },
      { id: 2, sn: '2', date: '01/06/2021', orderID: 'ORD0563B', itemsSold: 67, netSales: 150.00, totalCommission: 40.00 },
      { id: 3, sn: '3', date: '01/06/2021', orderID: 'ORD0898D', itemsSold: 35, netSales: 150.00, totalCommission: 30.00 },
      { id: 4, sn: '4', date: '07/09/2021', orderID: 'ORD1558F', itemsSold: 15, netSales: 150.00, totalCommission: 0.05 },
      { id: 5, sn: '5', date: '08/12/2021', orderID: 'ORD7833E', itemsSold: 15, netSales: 150.00, totalCommission: 0.05 },
    ]
  },
  {
    id: 2, sn: '2', kol: 'Lice Wang', itemsSold: 24, netSales: 400.00, orders: 10, totalCommission: 40.00, nested: [
      { id: 1, sn: '1', date: '01/05/2021', orderID: 'ORD0000A', itemsSold: 90, netSales: 150.00, totalCommission: 120.00 },
      { id: 2, sn: '2', date: '01/06/2021', orderID: 'ORD0563B', itemsSold: 67, netSales: 150.00, totalCommission: 40.00 },
      { id: 3, sn: '3', date: '01/06/2021', orderID: 'ORD0898D', itemsSold: 35, netSales: 150.00, totalCommission: 30.00 },
      { id: 4, sn: '4', date: '07/09/2021', orderID: 'ORD1558F', itemsSold: 15, netSales: 150.00, totalCommission: 0.05 },
      { id: 5, sn: '5', date: '08/12/2021', orderID: 'ORD7833E', itemsSold: 15, netSales: 150.00, totalCommission: 0.05 },
    ]
  },
  {
    id: 3, sn: '3', kol: 'Sky Game', itemsSold: 2, netSales: 200.00, orders: 1, totalCommission: 30.00, nested: [
      { id: 1, sn: '1', date: '01/05/2021', orderID: 'ORD0000A', itemsSold: 90, netSales: 150.00, totalCommission: 120.00 },
      { id: 2, sn: '2', date: '01/06/2021', orderID: 'ORD0563B', itemsSold: 67, netSales: 150.00, totalCommission: 40.00 },
      { id: 3, sn: '3', date: '01/06/2021', orderID: 'ORD0898D', itemsSold: 35, netSales: 150.00, totalCommission: 30.00 },
      { id: 4, sn: '4', date: '07/09/2021', orderID: 'ORD1558F', itemsSold: 15, netSales: 150.00, totalCommission: 0.05 },
      { id: 5, sn: '5', date: '08/12/2021', orderID: 'ORD7833E', itemsSold: 15, netSales: 150.00, totalCommission: 0.05 },
    ]
  },
  {
    id: 4, sn: '4', kol: 'Molly', itemsSold: 1, netSales: 10.00, orders: 1, totalCommission: 0.05, nested: [
      { id: 1, sn: '1', date: '01/05/2021', orderID: 'ORD0000A', itemsSold: 90, netSales: 150.00, totalCommission: 120.00 },
      { id: 2, sn: '2', date: '01/06/2021', orderID: 'ORD0563B', itemsSold: 67, netSales: 150.00, totalCommission: 40.00 },
      { id: 3, sn: '3', date: '01/06/2021', orderID: 'ORD0898D', itemsSold: 35, netSales: 150.00, totalCommission: 30.00 },
      { id: 4, sn: '4', date: '07/09/2021', orderID: 'ORD1558F', itemsSold: 15, netSales: 150.00, totalCommission: 0.05 },
      { id: 5, sn: '5', date: '08/12/2021', orderID: 'ORD7833E', itemsSold: 15, netSales: 150.00, totalCommission: 0.05 },
    ]
  },
]