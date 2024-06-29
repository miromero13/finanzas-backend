export enum AVAILABLE_ASSETS_ACCOUNT {
  CASH = 'caja o efectivo',
  PETTY_CASH = 'caja chica',
  BANCK = 'banco',
  CHECKING_ACCOUNT = 'cuenta corriente',
  SAVINGS_ACCOUNT = 'cuenta de ahorros',
  INVESTMENT_ACCOUNT = 'cuenta de inversiones',
  TIME_DEPOSITS = 'depósitos a plazo fijo',
  OTHER = 'otro',
}

export enum DEMANDABLE_ASSETS_ACCOUNT {
  ACCOUNTS_RECEIVABLE = 'cuentas por cobrar',
  NOTES_RECEIVABLE = 'recibos por cobrar',
  DOCUMENTOS = 'documentos',
  PROMISSORY_NOTE = 'pagaré',
  BILLS_OF_EXCHANGE = 'letras de cambio',
  BILLS_RECEIVABLE = 'letras por cobrar',
  ACCRUED_INCOME = 'ingresos acumulados',
  OTHER = 'otro',
}

export enum REALIZABLE_ASSETS_ACCOUNT {
  STOCK = 'stock o inventario',
  WORK_IN_PROGRESS = 'trabajos en proceso',
  OTHER = 'otro',
}

export enum FIXED_ASSETS_ACCOUNT {
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

export enum DEFERRED_ASSETS_ACCOUNT {
  INSURANCE = 'seguro',
  INTEREST = 'intereses',
  RENTALS = 'alquileres',
  PREPAID_TAXES = 'impuestos pagados por adelantado',
  OTHER = 'otro',
}

export enum CURRENT_LIABILITIES_ACCOUNT {
  ACCOUNTS_PAYABLE = 'cuentas por pagar',
  DOCUMENTS_PAYABLE = 'documentos por pagar',
  PAYMENT_TO_SUPPLIERS = 'pago a proveedores',
  ACCRUED_EXPENSES = 'gastos acumulados',
  UNEARNED_REVENUE = 'ingresos no devengados',
  OTHER = 'otro',
}

export enum FIXED_LIABILITIES_ACCOUNT {
  MORTGAGE = 'hipoteca',
  LONG_TERM_LOANS = 'préstamos a largo plazo',
  DEFERRED_TAX_LIABILITIES = 'pasivos por impuestos diferidos',
  OTHER = 'otro',
}

export enum EQUITY_ACCOUNT {
  CONTRIBUTED_CAPITAL = 'capital aportado',
  RETAINED_EARNINGS = 'utilidades retenidas o utilidades no distribuidas',
  MANAGEMENT_UTILITIES = 'utilidades de la gestión',
  LEGAL_RESERVATION = 'reserva legal',
  ADDITIONAL_PAID_IN_CAPITAL = 'capital pagado adicional',
  TREASURY_STOCK = 'acciones en tesorería',
  OTHER = 'otro',
}
