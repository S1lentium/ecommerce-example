export function sizeShorthand(text: string) {
  const sizMap: { [key: string ]: string } = {
    'Extra Small': 'XS',
    'Small': 'S',
    'Medium': 'M',
    'Large': 'L',
    'Extra Large': 'XL'
  };
  return sizMap[text];
}
