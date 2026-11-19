export type CatalogueSort = 'latest' | 'low' | 'high';
export function catalogueQuery(category = 'All', sort = 'latest') {
  const params = new URLSearchParams();
  if (category !== 'All') params.set('category', category);
  if (sort !== 'latest') params.set('sort', sort);
  const query = params.toString();
  return `/shop${query ? `?${query}` : ''}`;
}
export function selectCatalogue<T extends { category: string; price: number }>(products: T[], category = 'All', sort = 'latest') {
  const categories = ['All', ...Array.from(new Set(products.map(product => product.category)))];
  const selectedCategory = categories.includes(category) ? category : 'All';
  const selectedSort: CatalogueSort = sort === 'low' || sort === 'high' ? sort : 'latest';
  const shown = products.filter(product => selectedCategory === 'All' || product.category === selectedCategory);
  if (selectedSort !== 'latest') shown.sort((a,b) => selectedSort === 'low' ? a.price - b.price : b.price - a.price);
  return {categories, selectedCategory, selectedSort, shown};
}
