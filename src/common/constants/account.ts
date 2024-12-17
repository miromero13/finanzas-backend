export enum AVAILABLE_ASSETS_ACCOUNT { // activos disponibles: dinero en efectivo y otros activos líquidos que se pueden convertir en efectivo rápidamente
  CASH = 'caja o efectivo',
  PETTY_CASH = 'caja chica',
  BANCK = 'banco',
  CHECKING_ACCOUNT = 'cuenta corriente',
  SAVINGS_ACCOUNT = 'cuenta de ahorros',
  INVESTMENT_ACCOUNT = 'cuenta de inversiones',
  TIME_DEPOSITS = 'depósitos a plazo fijo',
  OTHER = 'otro',
}

export enum DEMANDABLE_ASSETS_ACCOUNT { // a corto plazo y se espera que se conviertan en efectivo en un plazo inferior a un año, dinero que se espera recibir en un plazo inferior a un año
  ACCOUNTS_RECEIVABLE = 'cuentas por cobrar',
  NOTES_RECEIVABLE = 'recibos por cobrar',
  DOCUMENTOS = 'documentos',
  PROMISSORY_NOTE = 'pagaré',
  BILLS_OF_EXCHANGE = 'letras de cambio',
  BILLS_RECEIVABLE = 'letras por cobrar',
  ACCRUED_INCOME = 'ingresos acumulados',
  OTHER = 'otro',
}

export enum REALIZABLE_ASSETS_ACCOUNT { // activos realizables: bienes de cambio o mercaderías y productos terminados
  STOCK = 'stock o inventario',
  WORK_IN_PROGRESS = 'trabajos en proceso',
  OTHER = 'otro',
}

export enum FIXED_ASSETS_ACCOUNT { // activos fijos: bienes de uso o de capital que no se destinan a la venta
  LANDS = 'terrenos',
  BUILDING = 'edificios',
  MACHINERY = 'maquinaria',
  EQUIPMENT = 'equipo',
  OFFICE_EQUIPMENT = 'equipo de oficina',
  VEHICLES = 'vehículos',
  FURNITURE_AND_FIXTURES = 'muebles y enseres',
  LEASEHOLD_IMPROVEMENTS = 'mejoras en propiedades arrendadas',
  OTHER = 'otro',
}

export enum DEFERRED_ASSETS_ACCOUNT { // activos diferidos: gastos pagados por adelantado que se convierten en activos a medida que se consumen
  INSURANCE = 'seguro',
  INTEREST = 'intereses',
  RENTALS = 'alquileres',
  PREPAID_TAXES = 'impuestos pagados por adelantado',
  OTHER = 'otro',
}

export enum CURRENT_LIABILITIES_ACCOUNT { // a corto plazo y se espera que se liquiden en un plazo inferior a un año
  ACCOUNTS_PAYABLE = 'cuentas por pagar',
  DOCUMENTS_PAYABLE = 'documentos por pagar',
  PAYMENT_TO_SUPPLIERS = 'pago a proveedores',
  ACCRUED_EXPENSES = 'gastos acumulados',
  UNEARNED_REVENUE = 'ingresos no devengados',
  OTHER = 'otro',
}

export enum FIXED_LIABILITIES_ACCOUNT { // a largo plazo y se espera que se liquiden en un plazo superior a un año
  MORTGAGE = 'hipoteca',
  LONG_TERM_LOANS = 'préstamos a largo plazo',
  DEFERRED_TAX_LIABILITIES = 'pasivos por impuestos diferidos',
  OTHER = 'otro',
}

export enum EQUITY_ACCOUNT { // patrimonio neto: capital aportado por los accionistas y las utilidades retenidas por la empresa
  CONTRIBUTED_CAPITAL = 'capital aportado',
  RETAINED_EARNINGS = 'utilidades retenidas o utilidades no distribuidas',
  MANAGEMENT_UTILITIES = 'utilidades de la gestión',
  LEGAL_RESERVATION = 'reserva legal',
  ADDITIONAL_PAID_IN_CAPITAL = 'capital pagado adicional',
  TREASURY_STOCK = 'acciones en tesorería',
  OTHER = 'otro',
}
