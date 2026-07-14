export function useFormat() {
  function capitalizeWords(str: string): string {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  function checkCapitalizeWords(str: string): boolean {
    return !/[A-Z]/.test(str)
  }

  function formatThousandsSeparator(amount: any): string {
    if (amount != null) {
      return Number(parseFloat(amount).toFixed(0)).toLocaleString('id-ID')
    }
    return amount
  }

  function formatNumber(amount: string): string {
    if (amount != null) {
      return amount
        .replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }
    return amount
  }

  function formatDecimal(amount: any, options: Intl.NumberFormatOptions = {}): string {
    if (amount == null || amount === '') return ''
    const num = Number(amount)
    if (!isFinite(num)) return ''

    const defaultOptions: Intl.NumberFormatOptions = {
      style: 'decimal',
      maximumFractionDigits: 10,
      minimumFractionDigits: 0,
    }

    return num.toLocaleString('id-ID', { ...defaultOptions, ...options })
  }

  function parseDecimal(formattedString: string | null): number | null {
    if (formattedString == null || formattedString === '') return null

    const clean = String(formattedString)
      .replace(/\./g, '')
      .replace(/,/g, '.')
      .replace(/[^\d.-]/g, '')

    const parts = clean.split('.')
    let finalClean = clean
    if (parts.length > 2) {
      finalClean = parts[0] + '.' + parts.slice(1).join('')
    }

    const num = Number(finalClean)
    return isFinite(num) ? num : null
  }

  function formatNumeral(value: number, format: string = '0,0'): string {
    // Simple numeral formatting using Intl
    if (value == null) return ''
    return value.toLocaleString('es-ES')
  }

  return {
    capitalizeWords,
    checkCapitalizeWords,
    formatThousandsSeparator,
    formatNumber,
    formatDecimal,
    parseDecimal,
    formatNumeral,
  }
}
