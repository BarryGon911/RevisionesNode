const productos = Array.from({length: 10}).map((_,i)=> ({
  nombre: `Producto ${i+1}`,
  descripcion: `Descripción del producto ${i+1}`,
  precio: (100 + i*10).toFixed(2),
  stock: 50 - i,
  categoriaId: (i % 10) + 1
}))
export default productos
