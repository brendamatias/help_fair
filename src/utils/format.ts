export const formatPrice = (price: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price)

export const formatDate = (date: string) => {
  const dateFormatted = new Date(date)
  const day = dateFormatted.getDay()
  const month = dateFormatted.getMonth() + 1
  const year = dateFormatted.getFullYear() + 1

  return `${day}/${month}/${year}`
}
