const Menu = [
  {
    title: 'change_language',
    group: 'changeLanguage',
    icon: 'homeOutline',
    name: 'Change Language',
    href: '#',
    url: false,
    skipPerms: true,
    is_active: true,
    isLang: true
  },
  {
    title: 'home',
    group: 'home',
    icon: 'homeOutline',
    name: 'home',
    href: '/home',
    url: false,
    skipPerms: true,
    is_active: true
  },
  {
    title: 'ARLO',
    group: 'arlo',
    icon: 'pieChartOutline',
    name: 'ARLO',
    href: 'https://arlo.kody.work',
    url: true,
    perm: 'ARLO',
    is_active: true
  },
  {
    title: 'generated_report',
    group: 'generatedreport',
    icon: 'readerOutline',
    name: 'Generated Report',
    href: '/generated-report',
    url: false,
    perm: 'View Generated Report',
    is_active: true
  },
  {
    name: 'performance_dashboard',
    group: 'performance-dashboard',
    icon: 'barChartOutline',
    title: 'Performance Dashboard',
    open: false,
    is_active: true,
    items: [
      {
        name: 'dashboard-decision-making-meeting',
        title: 'DMM Dashboard',
        href: '/dashboards/dashboard-decision-making-meeting',
        perm: 'Dashboard DMM ISO',
        icon: 'radioButtonOnOutline'
      },
      {
        name: 'dashboard-decision-making-meeting-monthly',
        title: 'DMM Dashboard Monthly',
        href: '/dashboards/dashboard-decision-making-meeting-monthly',
        perm: 'Dashboard DMM',
        icon: 'radioButtonOnOutline'
      },
      {
        name: 'dashboard-decision-making-meeting-monthly-department',
        title: 'DMM Dashboard Monthly Department',
        href: '/dashboards/dashboard-decision-making-meeting-monthly-department',
        perm: 'Dashboard DMM Department',
        icon: 'radioButtonOnOutline'
      },
      {
        name: 'sales-performance',
        title: 'Sales Performance',
        href: '/dashboards/sales-performance',
        perm: 'Dashboard Sales Performance',
        icon: 'radioButtonOnOutline'
      },
      {
        name: 'sales-performance-local',
        title: 'Sales Performance (Local)',
        href: '/dashboards/sales-performance-local',
        perm: 'Dashboard Sales Performance Local',
        icon: 'radioButtonOnOutline'
      },
      {
        name: 'sales-performance-ibu',
        title: 'Sales Performance (IBU)',
        href: '/dashboards/sales-performance-ibu',
        perm: 'Dashboard Sales Performance IBU',
        icon: 'fa-dot-circle'
      },
      {
        name: 'distribution-local',
        title: 'Distribution (Local)',
        href: '/dashboards/distribution-local',
        perm: 'Dashboard Distribution Local',
        icon: 'fa-dot-circle'
      }
    ]
  },
  {
    name: 'dashboard_image',
    group: 'dashboard-image',
    icon: 'imageOutline',
    title: 'Dashboard Image',
    open: false,
    is_active: true,
    items: [
      {
        name: 'upload-dmm-image',
        title: 'Upload DMM Image',
        href: '/dashboards/upload-dmm-image',
        perm: 'Upload DMM Image',
        icon: 'radioButtonOnOutline'
      }
    ]
  },
  {
    title: 'sales_and_marketing',
    group: 'sales-and-marketing',
    icon: 'podiumOutline',
    name: 'Sales & Marketing',
    open: false,
    is_active: true,
    items: [
      {
        name: 'dashboard',
        title: 'Sales',
        open: false,
        child: [
          {
            name: 'dashboard-survey-spg',
            title: 'Customer SPG Dashboard',
            href: '/dashboard-survey-spg',
            perm: 'Customer SPG Dashboard',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'dashboard-claim-distributor',
            title: 'Dashboard Claim Distributor',
            href: '/dashboard-claim-distributor',
            perm: 'Dashboard Claim Distributor',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'dashboard-claim-distributor-summary',
            title: 'Dashboard Claim Distributor Summary',
            href: '/dashboard-claim-distributor-summary',
            perm: 'Dashboard Claim Distributor Summary',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'dashboard-hoa-ranking',
            title: 'Dashboard HOA Ranking',
            href: '/dashboards/hoa-ranking',
            perm: 'Dashboard HOA Ranking',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'dashboard-data-transfer',
            title: 'Data Transfer Dashboard',
            href: '/dashboards/data-transfer',
            perm: 'Dashboard Data Transfer',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'executive-dashboard',
            title: 'Executive Dashboard',
            href: '/dashboards/executive',
            perm: 'Executive Dashboard',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'hoa-visit',
            title: 'HOA Visit',
            href: '/hoa-visit',
            perm: 'HOA Visit',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'maps',
            title: 'Maps',
            href: '/dashboards/maps',
            perm: 'Dashboard Maps',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'dashboard-sales-monitoring-si',
            title: 'Monthly Sales Monitoring (SI)',
            href: '/dashboards/sales-monitoring-si',
            perm: 'Dashboard Sales Monitoring SI',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'dashboard-sales-monitoring-so',
            title: 'Monthly Sales Monitoring (SO)',
            href: '/dashboards/sales-monitoring-so',
            perm: 'Dashboard Sales Monitoring SO',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'dashboard-sales-monitoring-si-by-distributor',
            title: 'Monthly Sales Monitoring by Distributor (SI)',
            href: '/dashboards/sales-monitoring-si-by-distributor',
            perm: 'Dashboard Sales Monitoring SI by Distributor',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'dashboard-sales-monitoring-so-by-dist',
            title: 'Monthly Sales Monitoring by Distributor (SO)',
            href: '/dashboards/sales-monitoring-so-by-distributor',
            perm: 'Dashboard Sales Monitoring SO by Distributor',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'dashboard-sales-monitoring-si-by-region',
            title: 'Monthly Sales Monitoring by Region (SI)',
            href: '/dashboards/sales-monitoring-si-by-region',
            perm: 'Dashboard Sales Monitoring SI by Region',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'dashboard-sales-monitoring-so-by-region',
            title: 'Monthly Sales Monitoring by Region (SO)',
            href: '/dashboards/sales-monitoring-so-by-region',
            perm: 'Dashboard Sales Monitoring SO by Region',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'hos-financial-performance',
            title: 'HOS Financial Performance',
            href: '/dashboards/hos-financial-performance',
            perm: 'HOS Financial Perfomance',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'hor-financial-performance',
            title: 'HOR Financial Performance',
            href: '/dashboards/hor-financial-performance',
            perm: 'HOR Financial Perfomance',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'rank-hor',
            title: 'Rank HOR',
            href: '/leaderboard?type=HOR',
            perm: 'Rank HOR',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'rank-hoa',
            title: 'Rank HOA',
            href: '/leaderboard?type=HOA',
            perm: 'Rank HOA',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'summary-sales',
            title: 'Sales & Productivity Trend',
            href: '/dashboards/sales-summary',
            perm: 'Dashboard Summary Sales',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'sales-by-category',
            title: 'Sales Trend by Product Category',
            href: '/dashboards/sales-by-category',
            perm: 'Dashboard Sales by Category',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'sales-by-region',
            title: 'Sales Trend by Region',
            href: '/dashboards/sales-by-region',
            perm: 'Dashboard Sales by Region',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'salesman-visit',
            title: 'Salesman Visit',
            href: '/salesman-visit',
            perm: 'Salesman Visit',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'dashboard-today-sales-monitoring',
            title: 'Today Sales Monitoring (SO)',
            href: '/dashboards/today-sales-monitoring',
            perm: 'Dashboard Today Sales Monitoring',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'dashboard-today-sales-monitoring-by-dist',
            title: 'Today Sales Monitoring by Distributor (SO)',
            href: '/dashboards/today-sales-monitoring-by-distributor',
            perm: 'Dashboard Today Sales Monitoring by Distributor',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'dashboard-today-sales-monitoring-by-region',
            title: 'Today Sales Monitoring by Region (SO)',
            href: '/dashboards/today-sales-monitoring-by-region',
            perm: 'Dashboard Today Sales Monitoring by Region',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'dashboard-today-sales-monitoring-v2',
            title: 'TSM V2 (SO)',
            href: '/dashboards/dashboard-today-sales-monitoring',
            perm: 'Dashboard Today Sales Monitoring V2',
            icon: 'fa-dot-circle'
          },
          {
            name: 'dashboard-today-sales-monitoring-by-region-v2',
            title: 'TSM V2 by Region (SO)',
            href: '/dashboards/dashboard-today-sales-monitoring-by-region',
            perm: 'Dashboard Today Sales Monitoring by Region V2',
            icon: 'fa-dot-circle'
          },
          {
            name: 'hoa-dashboard-today-sales-monitoring',
            title: 'TSM V2 by HOA (SO)',
            href: '/dashboards/hoa-dashboard-today-sales-monitoring',
            perm: 'Hoa Dashboard TSM',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'dashboard-today-sales-monitoring-by-distributor-v2',
            title: 'TSM V2 By Distributor (SO)',
            href: '/dashboards/dashboard-today-sales-monitoring-by-distributor',
            perm: 'Dashboard Today Sales Monitoring by Distributor V2',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'dashboard-today-sales-monitoring-by-salesman-v2',
            title: 'TSM V2 By Salesman (SO)',
            href: '/dashboards/dashboard-today-sales-monitoring-by-salesman',
            perm: 'Dashboard Today Sales Monitoring by Salesman V2',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'dashboard-monthly-sales-monitoring',
            title: 'MSM V2',
            href: '/dashboards/dashboard-monthly-sales-monitoring',
            perm: 'Dashboard Monthly Sales Monitoring V2',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'dashboard-monthly-sales-moitoring-by-region',
            title: 'MSM V2 By Region',
            href: '/dashboards/dashboard-monthly-sales-moitoring-by-region',
            perm: 'Dashboard Monthly Sales Monitoring by Region V2',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'hoa-dashboard-monthly-sales-monitoring',
            title: 'MSM V2 by HOA',
            href: '/dashboards/hoa-dashboard-monthly-sales-monitoring',
            perm: 'Hoa Dashboard MSM',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'dashboard-monthly-sales-monitoring-by-distributor',
            title: 'MSM V2 By Distributor',
            href: '/dashboards/dashboard-monthly-sales-monitoring-by-distributor',
            perm: 'Dashboard Monthly Sales Monitoring by Distributor V2',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'dashboard-monthly-sales-monitoring-by-salesman',
            title: 'MSM V2 By Salesman',
            href: '/dashboards/dashboard-monthly-sales-monitoring-by-salesman',
            perm: 'Dashboard Monthly Sales Monitoring by Salesman V2',
            icon: 'radioButtonOnOutline'
          }
        ]
      },
      {
        name: 'report',
        title: 'Sales',
        open: false,
        child: [
          {
            name: 'activity-detail',
            title: 'activity_detail',
            href: '/report/activity-detail-report',
            perm: 'Activity Detail Report',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'sales-ao-last-12-weeks',
            title: 'AOL12W',
            href: '/report/sales-ao-last-12-weeks',
            perm: 'Sales AOL12W',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'sales-ao-last-4-weeks',
            title: 'AOL4W',
            href: '/report/sales-ao-last-4-weeks',
            perm: 'Sales AOL4W',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'sales-aol4w-aol12w-m12wao',
            title: 'AOL(4/12)W & M12WAO',
            href: '/report/sales-aol4w-aol12w-m12wao',
            perm: 'Sales AOL4W AOL12W M12WAO',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'approval_location',
            title: 'approval_location',
            href: '/report/approval-location',
            perm: 'Approval Location',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'Cumulative Sales',
            title: 'Cumulative Sales',
            href: '/report/cumulative-sales',
            perm: 'Cumulative Sales Report',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'customer-stock-report',
            title: 'customer_stock',
            href: '/report/customer-stock-report',
            perm: 'View Stock Report',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'daily-activity-hoa-report',
            title: 'Daily Activity HOA',
            href: '/report/daily-activity-hoa-report',
            perm: 'Daily Activity HOA Report',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'good-receipt-report',
            title: 'good_receipt',
            href: '/report/good-receipt-report',
            perm: 'Good Receipt Report',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'hoa-review-activity-report',
            title: 'HOA Review Activity',
            href: '/report/hoa-review-activity-report',
            perm: 'HOA Review Activity Report',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'sales-moving-12-weeks-ao',
            title: 'M12WAO',
            href: '/report/sales-moving-12-weeks-ao',
            perm: 'Sales M12WAO',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'no-visit-reason-report',
            title: 'no_visit_reason',
            href: '/report/no-visit-reason-report',
            perm: 'No Visit Reason Report',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'performance',
            title: 'Performance',
            href: '/report/performance-report',
            perm: 'Daily Calls Performance Report',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'performance-hoa-report',
            title: 'Performance HOA',
            href: '/report/performance-hoa-report',
            perm: 'Performance HOA Report',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'productivity-hoa',
            title: 'Productivity HOA',
            href: '/hoa/productivity',
            perm: 'Productivity HOA',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'questionnaire-report',
            title: 'questionnaire',
            href: '/report/questionnaire-report',
            perm: 'Questionnaire Report',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'sales-order-report',
            title: 'sales_order',
            href: '/report/sales-order-report',
            perm: 'View Order Report',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'sales-return-approval',
            title: 'sales_return_approval',
            href: '/report/sales-retur-report',
            perm: 'Sales Return Approval',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'Sales',
            title: 'Sales',
            open: false,
            icon: 'radioButtonOnOutline',
            sub_child: [
              {
                name: 'Sales Detail',
                title: 'Sales Detail',
                href: '/report/sales/sales-detail',
                perm: 'Sales Detail Report'
              },
              {
                name: 'Sales Summary',
                title: 'Sales Summary',
                href: '/report/sales/sales-summary',
                perm: 'Sales Summary Report'
              },
              {
                name: 'sales-detail-finance',
                title: 'Sales Detail Finance',
                href: '/report/sales/sales-detail-finance',
                perm: 'Sales Detail Finance Report'
              }
            ]
          },
          {
            name: 'Sales (Calendar Ops)',
            title: 'Sales (Calendar Ops)',
            open: false,
            icon: 'radioButtonOnOutline',
            sub_child: [
              {
                name: 'Sales Detail Ops',
                title: 'Sales Detail Ops',
                href: '/report/sales/sales-detail-ops',
                perm: 'Sales Detail Ops Report'
              },
              {
                name: 'Sales Summary Ops',
                title: 'Sales Summary Ops',
                href: '/report/sales/sales-summary-ops',
                perm: 'Sales Summary Ops Report'
              },
              {
                name: 'Sales Report Ops',
                title: 'Sales Report Ops',
                href: '/report/sales-report',
                perm: 'Sales Custom Report'
              }
            ]
          },
          {
            name: 'sales-vs-pjp-l3m',
            title: 'Sales L3M VS PJP Report',
            href: '/report/sales-vs-pjp-l3m',
            perm: 'Sales VS PJP L3M Report',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'selling-out-report',
            title: 'Selling Out',
            href: '/report/selling-out-report',
            perm: 'Selling Out Report',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'stock-balance-report',
            title: 'Stock Balance',
            href: '/report/stocks/stock-balance',
            perm: 'Stock Balance Report',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'summary-call-plan',
            title: 'summary_call_plan',
            href: '/report/summary-call-plan',
            perm: 'Download Summary PJP All',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'survey-photo-report',
            title: 'Survey Photo',
            href: '/report/survey-photo-report',
            perm: 'Survey Photo Report',
            icon: 'radioButtonOnOutline'
          }
        ]
      },
      {
        name: 'transactions',
        title: 'Sales',
        open: false,
        child: [
          {
            name: 'attendance',
            title: 'Attendance',
            href: '/attendance',
            perm: 'Attendance',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'mpo-generate-document',
            title: 'Generate MPO',
            href: '/mpo/download-mpo',
            perm: 'MPO Generate',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'pjp-approval-list',
            title: 'PJP Approval List',
            href: '/pjp/pjp-approval-list',
            perm: 'PJP Approval List',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'pjp-optimizer',
            title: 'PJP Optimizer',
            href: '/pjp/pjp-optimizer',
            perm: 'PJP Optimizer',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'pjp-for-salesman',
            title: 'upload_pjp_for_salesman',
            href: '/pjp/pjp-for-salesman',
            perm: 'Upload PJP',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'pjp-for-merchandiser',
            title: 'upload_pjp_for_merchandiser',
            href: '/pjp/pjp-for-merchandiser',
            perm: 'Upload PJP for MD',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'pjp-for-hoa',
            title: 'upload_pjp_for_hoa',
            href: '/pjp/pjp-for-hoa',
            perm: 'Upload PJP For HOA',
            icon: 'radioButtonOnOutline'
          }
        ]
      },
      {
        name: 'master',
        title: 'Sales',
        open: false,
        child: [
          {
            name: 'brands',
            title: 'Brands',
            href: '/product/brand/list',
            perm: 'Master Product Attribute',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'categories',
            title: 'Categories',
            href: '/product/category/list',
            perm: 'Master Product Attribute',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'customer',
            title: 'customer',
            href: '/master/customer/list',
            perm: 'Master Customer',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'chain',
            title: 'Customer Chain',
            href: '/master/attribute-customer/chain/list',
            perm: 'Master Attribute Customer Chain',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'channel',
            title: 'Customer Channel',
            href: '/master/attribute-customer/channel/list',
            perm: 'Master Attribute Customer Channel',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'group',
            title: 'Customer Group',
            href: '/master/attribute-customer/group/list',
            perm: 'Master Attribute Customer Group',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'market',
            title: 'Customer Market',
            href: '/master/attribute-customer/market/list',
            perm: 'Master Attribute Customer Market',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'divisions',
            title: 'Divisions',
            href: '/product/division/list',
            perm: 'Master Product Attribute',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'productmaster',
            title: 'Product Masters',
            href: '/product/list',
            perm: 'Master Product',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'Product Price',
            title: 'Product Price',
            href: '/product/product-price-list',
            perm: 'Product Price',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'sales-division',
            title: 'Sales Division',
            href: '/master/attribute-customer/sales-division/list',
            perm: 'Master Attribute Customer Sales Division',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'subbrand',
            title: 'Sub Brands',
            href: '/product/subbrand/list',
            perm: 'Master Product Attribute',
            icon: 'radioButtonOnOutline'
          }
        ]
      },
      {
        name: 'Tools',
        title: 'Sales',
        open: false,
        child: [
          {
            name: 'salesTargetByDistributorUpload',
            title: 'Upload Sales Target by Distributor',
            href: '/sales/sales-target-by-distributor',
            perm: 'Upload Sales Target by Distributor',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'salesTargetBySalesmanUpload',
            title: 'Upload Sales Target by Salesman',
            href: '/sales/sales-target-by-salesman',
            perm: 'Upload Sales Target by Salesman',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'mpo-upload-stock',
            title: 'Upload Stock MPO',
            href: '/mpo/upload-stock-mpo',
            perm: 'MPO Upload Stock',
            icon: 'radioButtonOnOutline'
          }
        ]
      }
    ]
  },
  {
    title: 'Human Capital',
    group: 'Human Capital',
    icon: 'peopleOutline',
    name: 'Human Capital',
    open: false,
    is_active: true,
    items: [
      {
        name: 'Report',
        title: 'Human Capital',
        open: false,
        child: [
          {
            name: 'Employee Training History',
            title: 'Employee Training History',
            href: '/employee/history-training-employee',
            perm: 'History Training Employee',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'Monitoring Employee',
            title: 'Monitoring Employee',
            href: '/human-capital-dashboard/monitoring-employee',
            perm: 'Monitoring Employee',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'High Performance Dashboard',
            title: 'High Performance Dashboard',
            href: '/scorecard/high-performance-dashboard-list',
            perm: 'Scorecard High Performance Dashboard',
            icon: 'radioButtonOnOutline'
          }
        ]
      },
      {
        name: 'unifam-employee-portal',
        title: 'Employee Portal',
        href: process.env.employeePortal || '',
        url: true,
        perm: 'Unifam Employee Portal',
        icon: 'radioButtonOnOutline'
      },
      {
        name: 'Transactions',
        title: 'Human Capital',
        open: false,
        child: [
          {
            name: 'business-trip',
            title: 'Business Trip',
            href: '/business-trip/home',
            perm: 'Business Trip',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'business-trip-all',
            title: 'Business Trip All List',
            href: '/business-trip/all-list',
            perm: 'Business Trip All List',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'scorecard-list',
            title: 'Scorecard List',
            href: '/scorecard/scorecard-list',
            perm: 'Scorecard List',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'scorecard-submission-list',
            title: 'Scorecard Submission',
            href: '/scorecard/list',
            perm: 'Scorecard Submission List',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'scorecard-approval-list',
            title: 'Scorecard Approval',
            href: '/scorecard/approval-list',
            perm: 'Scorecard Approval List',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'scorecard-assesment',
            title: 'Scorecard Assesment',
            href: '/scorecard/assessment',
            perm: 'Scorecard Assessment List',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'scorecard-period-list',
            title: 'Scorecard Period List',
            href: '/scorecard/period-list',
            perm: 'Scorecard Period List',
            icon: 'radioButtonOnOutline'
          }
        ]
      },
      {
        name: 'Master',
        title: 'Human Capital',
        open: false,
        child: [
          {
            name: 'companies',
            title: 'Companies',
            href: '/company/list',
            perm: 'View Company',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'departments',
            title: 'Departments',
            href: '/department/list',
            perm: 'View Department',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'divisions',
            title: 'Divisions',
            href: '/division/list',
            perm: 'View Division',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'employees',
            title: 'Employees',
            href: '/employee/list',
            perm: 'View Employee',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'levels',
            title: 'Levels',
            href: '/level/list',
            perm: 'View Level',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'positions',
            title: 'Positions',
            href: '/position/position-list',
            perm: 'View Position',
            icon: 'radioButtonOnOutline'
          }
        ]
      }
    ]
  },
  {
    title: 'Logistic',
    group: 'logistic',
    icon: 'cubeOutline',
    name: 'Logistic',
    open: false,
    is_active: true,
    items: [
      {
        name: 'Report',
        title: 'Manufacture',
        open: false,
        child: [
          {
            name: 'report-allocation',
            title: 'Detail Allocation',
            href: '/report/logistic/allocation-report',
            perm: 'Detail Allocation Report',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'report-po',
            title: 'Detail SO S1 (PO Terinput)',
            href: '/report/logistic/po-report',
            perm: 'Detail SO S1 Report',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'report-in-transit',
            title: 'Detail In Transit',
            href: '/report/logistic/intransit-report',
            perm: 'Detail In Transit Report',
            icon: 'radioButtonOnOutline'
          }
        ]
      },
      {
        name: 'Transactions',
        title: 'Manufacture',
        open: false,
        child: [
          {
            name: 'autoFulFillment',
            title: 'Auto FulFillment',
            href: '/autofulfillment/autofulfillment',
            perm: 'Auto FulFillment',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'autoFulFillment-list',
            title: 'Auto FulFillment List',
            href: '/autofulfillment/list',
            perm: 'Auto FulFillment',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'autoFulFillment-list-distributor',
            title: 'Auto FulFillment List (Distributor)',
            href: '/autofulfillment/list-distributor',
            perm: 'Auto FulFillment Distributor',
            icon: 'radioButtonOnOutline'
          }
        ]
      }
    ]
  },
  {
    name: 'NPD',
    group: 'npd',
    icon: 'barChartOutline',
    title: 'NPD',
    open: false,
    is_active: true,
    items: [
      {
        name: 'Dashboard',
        title: 'NPD',
        open: false,
        child: [
          {
            name: 'dashboard-new-product-development',
            title: 'NPD Dashboard',
            href: '/dashboards/new-product-development',
            perm: 'Dashboard NPD',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'monitoring-new-product-development',
            title: 'NPD Monitoring',
            href: '/dashboards/npd-monitoring',
            perm: 'Monitoring NPD',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'monitoring-stage',
            title: 'Stage Monitoring',
            href: '/dashboards/stage-monitoring',
            perm: 'Monitoring Stage',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'dashboard-team-member',
            title: 'Team Member Dashboard',
            href: '/dashboards/team-member-dashboard',
            perm: 'Dashboard Team Member',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'dashboard-task-reviewer',
            title: 'Task Reviewer Dashboard',
            href: '/dashboards/task-reviewer-dashboard',
            perm: 'Dashboard Task Reviewer',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'dashboard-stage-approver',
            title: 'Stage Approver Dashboard',
            href: '/dashboards/stage-approver-dashboard',
            perm: 'Dashboard Stage Approver',
            icon: 'radioButtonOnOutline'
          }
        ]
      }
    ]
  },
  {
    title: 'Finance',
    group: 'Finance',
    icon: 'cashOutline',
    name: 'Finance',
    open: false,
    is_active: true,
    items: [
      {
        name: 'Report',
        title: 'Finance',
        open: false,
        child: [
          {
            name: 'Budgeting Report',
            title: 'Budgeting Report',
            href: '/budgeting/generate-budgeting-report',
            perm: 'Generate Budgeting Report',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'Calculate FOH',
            title: 'Calculate FOH',
            href: '/budgeting/report-calculate-foh',
            perm: 'Report Calculate FOH',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'finance-sales-detail',
            title: 'Finance Sales Detail',
            href: '/report/finance-sales-detail',
            perm: 'Finance Sales Detail Report',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'Report Standard',
            title: 'Report Standard FOH',
            href: '/budgeting/report-standard-foh',
            perm: 'Report Standard FOH',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'Generate Capex',
            title: 'Generate Capex',
            href: '/budgeting/generate-capex',
            perm: 'Generate Capex',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'Generate MPP',
            title: 'Generate MPP',
            href: '/budgeting/generate-mpp',
            perm: 'Generate MPP',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'Generate Opex',
            title: 'Generate Opex',
            href: '/budgeting/generate-opex',
            perm: 'Generate Opex',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'Generate Sales',
            title: 'Generate Sales',
            href: '/budgeting/generate-sales',
            perm: 'Budgeting System Sales',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'Sales Cogs Report',
            title: 'Sales Cogs Report',
            href: '/manufacture/report/sales-cogs-report',
            perm: 'Sales Cogs Report',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'profit-loss-detail',
            title: 'Profit Loss Detail',
            href: '/finance/profit-loss/detail',
            perm: 'Profit Loss Detail',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'profit-loss-actual',
            title: 'Profit Loss Actual',
            href: '/finance/profit-loss/actual',
            perm: 'Profit Loss Actual',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'profit-loss-simulation',
            title: 'Profit Loss Simulation',
            href: '/finance/profit-loss/simulation',
            perm: 'Profit Loss Simulation',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'calendar-finance-operational',
            title: 'Calendar Finance Operational',
            href: '/finance/calendar-operational/list',
            perm: 'Calendar Finance Operational',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'ar-outstanding',
            title: 'AR Outstanding',
            href: '/finance/ar-outstanding/report',
            perm: 'AR Outstanding',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'Opex',
            title: 'Opex',
            open: false,
            icon: 'radioButtonOnOutline',
            sub_child: [
              {
                name: 'Opex Detail',
                title: 'Opex Detail',
                href: '/opex/report-detail',
                perm: 'Opex Detail'
              },
              {
                name: 'Opex Summary',
                title: 'Opex Summary',
                href: '/opex/report-summary',
                perm: 'Opex MPP Non MPP'
              }
            ]
          }
        ]
      },
      {
        name: 'Transactions',
        title: 'Finance',
        open: false,
        child: [
          {
            name: 'Reimbursement',
            title: 'Reimbursement',
            open: false,
            icon: 'radioButtonOnOutline',
            sub_child: [
              {
                name: 'Pending Payment',
                title: 'Pending Payment',
                href: '/reimbursement/pending-payment',
                perm: 'Reimbursement Pending Payment'
              }
            ]
          }
        ]
      },
      {
        name: 'Tools',
        title: 'Finance',
        open: false,
        child: [
          {
            name: 'Upload ANP',
            title: 'Upload ANP',
            href: '/budgeting/upload-anp',
            perm: 'Upload ANP',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'Coretax Downloader',
            title: 'Coretax Downloader',
            href: '/tax/coretax-downloader',
            perm: 'Coretax Downloader',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'Coretax Uploader',
            title: 'Coretax Uploader',
            href: '/tax/coretax-uploader',
            perm: 'Coretax Uploader',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'Adjustment FOH',
            title: 'Adjustment FOH',
            href: '/budgeting/foh-adjustment',
            perm: 'FOH Adjustment',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'Price FOH',
            title: 'Price FOH',
            href: '/budgeting/foh-price',
            perm: 'FOH Price',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'Upload Delivery & Shipping',
            title: 'Upload Delivery & Shipping',
            href: '/budgeting/upload-delivery-shipping',
            perm: 'Upload Delivery Shipping',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'Generate Interest',
            title: 'Generate Interest',
            href: '/budgeting/generate-interest',
            perm: 'Generate Interest',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'Upload Adjustment Opex',
            title: 'Upload Adjustment Opex',
            href: '/budgeting/upload-adjustment-opex',
            perm: 'Upload Adjustment Opex',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'Download Base Price',
            title: 'Download Base Price',
            href: '/budgeting/download-price',
            perm: 'Download Baseprice',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'Upload Margin',
            title: 'Upload Margin',
            href: '/budgeting/upload-margin',
            perm: 'Upload Margin',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'Upload Budget Margins',
            title: 'Upload Budget Margins',
            href: '/manufacture/report/upload-budget-margins',
            perm: 'Upload Budget Margins',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'upload-forecast',
            title: 'Upload Forecast',
            href: '/budgeting/upload-forecast',
            perm: 'Upload Forecast',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'upload-finance-data',
            title: 'Upload Finance Data',
            href: '/finance/upload',
            perm: 'Upload Finance',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'upload-pnl-simulation-data',
            title: 'Upload PNL Simulation Data',
            href: '/finance/profit-loss/upload-simulation-data',
            perm: 'Profit Loss Simulation Upload',
            icon: 'radioButtonOnOutline'
          }
        ]
      }
    ]
  },
  {
    title: 'Manufacture',
    group: 'Manufacture',
    icon: 'businessOutline',
    name: 'Manufacture',
    open: false,
    is_active: true,
    items: [
      {
        name: 'Dashboard',
        title: 'Manufacture',
        open: false,
        child: [
          {
            name: 'manufacture-dashboard-dms',
            title: 'Dashboard IoT',
            href: '/dashboards/manufacture-dashboard-dms',
            perm: 'Manufacture Dashboard DMS',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'foh-monthly',
            title: 'FOH Monthly',
            href: '/dashboards/foh-monthly',
            perm: 'Dashboard FOH Monthly',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'foh-weekly',
            title: 'FOH Weekly',
            href: '/dashboards/foh-weekly',
            perm: 'Dashboard FOH Weekly',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'main-scale',
            title: 'Dashboard Scale',
            href: '/scale/main-scale',
            perm: 'Dashboard Scale',
            icon: 'radioButtonOnOutline'
          }
        ]
      },
      {
        name: 'Report',
        title: 'Manufacture',
        open: false,
        child: [
          {
            name: 'Adjustment RMPM List',
            title: 'Adjustment RMPM List',
            href: '/manufacture/report/adjustment-rmpm-list',
            perm: 'Adjustment RMPM List',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'Adjustment RMPM Report',
            title: 'Adjustment RMPM Report',
            href: '/manufacture/report/adjustment-rmpm-report',
            perm: 'Adjustment RMPM Report',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'dms-report',
            title: 'DMS Report',
            href: '/manufacture/report/dms-report',
            perm: 'Manufacture Report DMS',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'foh-variant-by-sub-brand',
            title: 'FOH Variant by Sub Brand',
            href: '/manufacture/report/foh-variant-by-sub-brand',
            perm: 'FOH Variant by Sub Brand',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'foh-tracking',
            title: 'FOH Tracking',
            href: '/manufacture/report/foh-tracking',
            perm: 'FOH Tracking',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'foh-by-sku',
            title: 'FOH by SKU',
            href: '/manufacture/report/foh-by-sku',
            perm: 'FOH by SKU',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'foh-by-subbrand',
            title: 'FOH by SubBrand',
            href: '/manufacture/report/foh-by-subbrand',
            perm: 'FOH by SubBrand',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'foh-sub-brand-sales-price',
            title: 'FOH Sub Brand Sales Price',
            href: '/manufacture/report/foh-sub-brand-sales-price',
            perm: 'FOH Sub Brand Sales Price',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'summary-foh-by-sub-brand',
            title: 'Summary FOH by Sub Brand',
            href: '/manufacture/report/summary-foh-by-sub-brand',
            perm: 'Summary FOH by Sub Brand',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'summary-variant',
            title: 'Summary Variant',
            href: '/manufacture/report/summary-variant',
            perm: 'Report Summary Variant',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'summary-variant-by-ended-date',
            title: 'Summary Variant By Ended Date',
            href: '/manufacture/report/summary-variant-by-ended-date',
            perm: 'Report Summary Variant By Ended Date',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'summary-variant-by-sku-finance',
            title: 'Summary Variant By SKU Finance',
            href: '/manufacture/report/summary-variant-pivot-by-sku-finance',
            perm: 'Report Summary Variant Pivot By SKU Finance',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'summary-variant-by-sku-manufacture',
            title: 'Summary Variant By SKU Manufacture',
            href: '/manufacture/report/summary-variant-pivot-by-sku-manufacture',
            perm: 'Report Summary Variant Pivot By SKU Manufacture',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'summary-variant-by-material-finance',
            title: 'Summary Variant By Material Finance',
            href: '/manufacture/report/summary-variant-pivot-by-material-finance',
            perm: 'Report Summary Variant Pivot By Material Finance',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'summary-variant-by-material-manufacture',
            title: 'Summary Variant By Material Manufacture',
            href: '/manufacture/report/summary-variant-pivot-by-material-manufacture',
            perm: 'Report Summary Variant Pivot By Material Manufacture',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'production-calculation',
            title: 'Production Calculation',
            href: '/manufacture/report/production-calculation',
            perm: 'Production Calculation',
            icon: 'radioButtonOnOutline'
          }
        ]
      },
      {
        name: 'Transactions',
        title: 'Manufacture',
        open: false,
        child: [
          {
            name: 'RMPM Price By SKU',
            title: 'RMPM Price By SKU',
            href: '/manufacture/report/rmpm-price-by-sku',
            perm: 'RMPM Price By SKU',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'RMPM Price By Forecast',
            title: 'RMPM Price By Forecast',
            href: '/manufacture/report/rmpm-price-by-forecast',
            perm: 'RMPM Price By Forecast',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'dms-wrapping',
            title: 'DMS Wrapping List',
            href: '/manufacture/report/dms/list-wrapping',
            perm: 'DMS Wrapping List',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'dms-finishing',
            title: 'DMS Finishing List',
            href: '/manufacture/report/dms/list-finishing',
            perm: 'DMS Finishing List',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'dms-cooking',
            title: 'DMS Cooking List',
            href: '/manufacture/report/dms/list-cooking',
            perm: 'DMS Cooking List',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'dms-worker-order',
            title: 'DMS Work Order',
            href: '/manufacture/report/dms/list-wo',
            perm: 'DMS Work Order',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'dms-5r',
            title: 'DMS Temuan 5R',
            href: '/manufacture/report/dms/list-5r',
            perm: 'DMS Temuan 5R',
            icon: 'radioButtonOnOutline'
          }
        ]
      },
      {
        name: 'Master',
        title: 'Manufacture',
        open: false,
        child: [
          {
            name: 'setup-scale',
            title: 'Setup Scale',
            href: '/scale/setup-scale',
            perm: 'Setup Scale',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'upload-dms-target',
            title: 'Upload DMS Target',
            href: '/manufacture/report/dms/upload-dms-target',
            perm: 'Upload DMS Target',
            icon: 'radioButtonOnOutline'
          }
        ]
      }
    ]
  },
  {
    title: 'Supply Chain',
    group: 'Supply Chain',
    icon: 'repeatOutline',
    name: 'Supply Chain',
    open: false,
    is_active: true,
    items: [
      {
        name: 'Transactions',
        title: 'Supply Chain',
        open: false,
        child: [
          {
            name: 'stockSupplier',
            title: 'Stock Supplier',
            href: '/product/balancing/stock-supplier',
            perm: 'Product Stock Supplier',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'priceEstimate',
            title: 'Price Estimate',
            href: '/product/balancing/price-estimate',
            perm: 'Product Price Estimate',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'mapping-sts',
            title: 'Upload Mapping STS',
            href: '/inventory/sts/upload-mapping-sts',
            perm: 'Upload STS',
            icon: 'radioButtonOnOutline'
          }
        ]
      },
      {
        name: 'Report',
        title: 'Supply Chain',
        open: false,
        child: [
          {
            name: 'pr-po-analysis',
            title: 'PR PO Analysis',
            href: '/manufacture/report/pr-po-analysis',
            perm: 'Report PR/PO Analysis',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'productBalancing',
            title: 'Product Balancing',
            href: '/product/balancing/add',
            perm: 'Product Balancing',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'productBalancingScenario',
            title: 'Product Balancing Scenario List',
            href: '/product/balancing/list',
            perm: 'Product Balancing List',
            icon: 'radioButtonOnOutline'
          }
        ]
      }
    ]
  },
  {
    title: 'Procurement',
    group: 'Procurement',
    icon: 'newspaperOutline',
    name: 'Procurement',
    open: false,
    is_active: true,
    items: [
      {
        name: 'PR Online',
        title: 'Procurement',
        open: false,
        child: [
          {
            name: 'purchaseRequisitionNew',
            title: 'New PR',
            href: '/inventory/purchase-requisition/add-non-stock',
            perm: 'PR Online Add',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'purchaseRequisition',
            title: 'PR List',
            href: '/inventory/purchase-requisition/list',
            perm: 'PR Online List',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'purchaseRequisitionApproval',
            title: 'PR Approval',
            href: '/inventory/purchase-requisition/approval',
            perm: 'PR Online Approval List',
            icon: 'radioButtonOnOutline'
          }
        ]
      },
      {
        name: 'Transactions',
        title: 'Procurement',
        open: false,
        child: [
          {
            name: 'certificates-add',
            title: 'Add Certificate',
            href: '/certificate/add',
            perm: 'Certificates',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'certificates-list',
            title: 'List Certificates',
            href: '/certificate/list',
            perm: 'Certificates',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'procurementUploader',
            title: 'Upload Procurement',
            href: '/inventory/procurement/uploader',
            perm: 'Procurement Uploader',
            icon: 'radioButtonOnOutline'
          }
        ]
      },
      {
        name: 'Report',
        title: 'Procurement',
        open: false,
        child: [
          {
            name: 'procurementLogbook',
            title: 'Procurement Logbook',
            href: '/report/procurement/procurement-logbook',
            perm: 'Procurement Logbook Report',
            icon: 'radioButtonOnOutline'
          }
        ]
      }
    ]
  },
  {
    title: 'IT',
    group: 'IT',
    icon: 'desktopOutline',
    name: 'IT',
    open: false,
    is_active: true,
    items: [
      {
        name: 'CMS Workflow',
        title: 'IT',
        open: false,
        child: [
          {
            name: 'update-workflow',
            title: 'Update Workflow',
            href: '/workflow/update-workflow',
            perm: 'Update Workflow',
            icon: 'radioButtonOnOutline'
          }
        ]
      },
      {
        name: 'Tools',
        title: 'IT',
        open: false,
        child: [
          {
            name: 'qr-scanner',
            title: 'QR Scanner',
            href: '/qr-scanner/register',
            perm: 'QR Scanner',
            icon: 'radioButtonOnOutline'
          }
        ]
      },
      {
        name: 'Employee',
        title: 'IT',
        open: false,
        child: [
          {
            name: 'create-employee-bulk',
            title: 'Create Employee Bulk',
            href: '/create-employee-bulk',
            perm: 'Create Employee Bulk',
            icon: 'radioButtonOnOutline'
          }
        ]
      }
    ]
  },

  {
    title: 'Unifamers',
    group: 'unifamers',
    icon: 'globe',
    name: 'Unifamers',
    href: 'https://unifamers.com/',
    url: true,
    skipPerms: true,
    is_active: false
  },
  {
    title: 'Unifam',
    group: 'unifam',
    icon: 'globe',
    name: 'Unifam',
    href: 'https://unitedfamilyfood.co.id/',
    url: true,
    skipPerms: true,
    is_active: false
  },
  {
    title: 'Master',
    group: 'Master',
    icon: 'albumsOutline',
    name: 'Master',
    open: false,
    is_active: true,
    items: [
      {
        name: 'Form',
        title: 'Master Item',
        open: false,
        child: [
          {
            name: 'form-list',
            title: 'Item',
            href: '/master/form/list',
            perm: 'Master Form Item List',
            icon: 'radioButtonOnOutline'
          },
          {
            name: 'form-approval',
            title: 'Approval',
            href: '/master/form/approval-list',
            perm: 'Master Form Approval List',
            icon: 'radioButtonOnOutline'
          }
        ]
      },
      {
        name: 'BOM',
        title: 'Master Item Bom',
        open: false,
        child: [
          {
            name: 'form-list',
            title: 'Item',
            href: '/master/bom/list',
            perm: 'Master BOM Item List',
            icon: 'radioButtonOnOutline'
          }
        ]
      }
    ]
  },
  {
    title: 'Force Update',
    group: 'updatedata',
    icon: 'cloudDownloadOutline',
    name: 'Force Update',
    href: '/home',
    url: false,
    perm: 'Force Update',
    is_active: true
  },
  {
    title: 'Logout',
    group: 'Logout',
    icon: 'logOutOutline',
    name: 'Logout',
    href: '/home',
    url: false,
    skipPerms: true,
    is_active: true
  }
]

export default Menu
