const productsData = [
  ["Camiseta Acne Studios", "19€", "https://c.onlyaff.app/87VEiM"],
  ["Chandal Liverpool", "36€", "https://c.onlyaff.app/87VJ3H"],
  ["Zapatillas Yeezy", "30€", "https://c.onlyaff.app/88HMiA"],
  ["Numeris", "33€", "https://c.onlyaff.app/88Vkv4"],
  ["Zapatillas Saucony Pro Grid Omni 9", "34€", "https://c.onlyaff.app/88Vnwn"],
  ["Sudadera Zadig", "20€", "https://c.onlyaff.app/896c0V"],
  ["Camiseta Moncler", "10€", "https://c.onlyaff.app/89AcCe"],
  ["Camiseta España Mundial 2026", "11€", "https://c.onlyaff.app/89Ad5E"],
  ["Camiseta Trapstar", "8€", "https://c.onlyaff.app/89Ag5n"],
  ["Camiseta Stussy", "8€", "https://c.onlyaff.app/89AhD9"],
  ["Camiseta Stussy", "8€", "https://c.onlyaff.app/89AkO4"],
  ["Camiseta Essentials", "8€", "https://c.onlyaff.app/89AnsL"],
  ["Pantalon Essentials", "26€", "https://c.onlyaff.app/8aObvB"],
  ["Cartera Chrome Hearts", "5€", "https://c.onlyaff.app/8bfYRD"],
  ["Calzoncillos Under Armour", "13€", "https://c.onlyaff.app/8bfZDe"],
  ["Pantalon Ralph Lauren", "10€", "https://c.onlyaff.app/8bg1g9"],
  ["Conjunto Moncler", "12€", "https://c.onlyaff.app/8bg1Q1"],
  ["Camiseta Rhude", "15€", "https://c.onlyaff.app/8bg2le"],
  ["Sudadera EME Studios", "39€", "https://c.onlyaff.app/8bg3lO"],
  ["Asics Gel Nyc", "25€", "https://c.onlyaff.app/8bg42w"],
  ["Zapatillas On Cloud", "30€", "https://c.onlyaff.app/8bg4GY"],
  ["Asics Gel Kayano 14", "20€", "https://c.onlyaff.app/8bg6kB"],
  ["Yeezy Foam", "11€", "https://c.onlyaff.app/8bg8D1"],
  ["Alexander McQueen", "25€", "https://c.onlyaff.app/8bg9TN"],
  ["Camiseta Larga Chrome Hearts", "13€", "https://c.onlyaff.app/8bgaZg"],
  ["Camiseta Acne Studios", "17€", "https://c.onlyaff.app/8cX7rm"],
  ["Camiseta Trapstar", "17€", "https://c.onlyaff.app/8dGbrY"],
  ["Pantalon Stone Island", "20€", "https://c.onlyaff.app/8dJ8vc"],
  ["Zapatillas Lanvin Curb", "34€", "https://c.onlyaff.app/8etwbb"],
  ["Pantalon Denim Tears", "11€", "https://c.onlyaff.app/8f2gKf"],
  ["Camiseta Gallery Dept", "6€", "https://c.onlyaff.app/8f2qpT"],
  ["Camiseta Carhartt", "5€", "https://c.onlyaff.app/8f2wMt"],
  ["Camiseta Off White", "9€", "https://c.onlyaff.app/8f2AQv"],
  ["Gafas Ray-Ban", "7€", "https://c.onlyaff.app/8f5Roj"],
  ["Numeris", "38€", "https://c.onlyaff.app/8fTSwi"],
  ["Saucony pro grid omni 9", "32€", "https://c.onlyaff.app/8fTUjF"],
  ["Golen Goose Ball-Star", "29€", "https://c.onlyaff.app/8fTXmh"],
  ["Premiata", "40€", "https://c.onlyaff.app/8fU0AN"],
  ["Off-White out of office", "30€", "https://c.onlyaff.app/8fU2W8"],
  ["Camiseta Chrome Hearts", "8€", "https://c.onlyaff.app/8gQIRt"],
  ["Asics Gel Nyc", "30€", "https://c.onlyaff.app/8gRaej"],
  ["Asics Gel Kayano 14", "25€", "https://c.onlyaff.app/8gRGHW"],
  ["Sudadera Stone Island", "18€", "https://c.onlyaff.app/8gSpWw"],
  ["Adidas Samba", "19€", "https://c.onlyaff.app/8gSSAQ"],
  ["Zapatillas Onitsuka Tiger", "22€", "https://c.onlyaff.app/8gSYiM"],
  ["Zapatillas Alexander McQueen", "26€", "https://c.onlyaff.app/8hjb0I"],
  ["Camiseta Acne Studios", "24€", "https://c.onlyaff.app/PkyqT"],
  ["Cartera Goyard", "3€", "https://c.onlyaff.app/PkB2e"],
  ["Conjuntos Futbol Mundial Niños", "12€", "https://c.onlyaff.app/8hkuKz"],
  ["Camiseta De Compresion Under Armour", "7€", "https://c.onlyaff.app/8hlpv5"],
  ["Camiseta Rhude", "16€", "https://c.onlyaff.app/8hlU64"],
  ["Camiseta Malaga", "13€", "https://c.onlyaff.app/8hmamM"],
  ["Camiseta Represent", "7€", "https://c.onlyaff.app/8hmrvZ"],
  ["Golden Goose Ball-Star", "47€", "https://c.onlyaff.app/8hmCPa"],
  ["Camiseta Stussy", "8€", "https://c.onlyaff.app/8hmFii"],
  ["Conjunto Corteiz", "17€", "https://c.onlyaff.app/8hogYa"],
  ["Camiseta C.P Company", "8€", "https://c.onlyaff.app/8hoozH"],
  ["Saucony Pro Grid Omni 9", "35€", "https://c.onlyaff.app/8horAo"],
  ["Camiseta Aime Leon Dore", "17€", "https://c.onlyaff.app/8how17"],
  ["Camiseta Cole Bruxton", "19€", "https://c.onlyaff.app/8hoBKK"],
  ["On Cloud Tilt", "24€", "https://c.onlyaff.app/8hoRWr"],
  ["Sudadera C.P Company", "17€", "https://c.onlyaff.app/8i3S7i"],
  ["Tirantes Denim Tears", "15€", "https://c.onlyaff.app/PpbRc"],
  ["Sueter Cole Buxton", "19€", "https://c.onlyaff.app/8ijJo7"],
  ["Camisetas de Futbol", "11€", "https://c.onlyaff.app/8ikfZN"],
  ["Camiseta Palm Angels", "8€", "https://c.onlyaff.app/8ikPvj"],
  ["Camiseta Fake Gods", "15€", "https://c.onlyaff.app/PqWhP"],
  ["Maison Margiela Gats", "34€", "https://c.onlyaff.app/8ilCDq"],
  ["Adidas Adizero", "23€", "https://c.onlyaff.app/8ilJsN"],
  ["Off White Out Of Office", "30€", "https://c.onlyaff.app/8imxN2"],
  ["Airpods Max", "34€", "https://c.onlyaff.app/8imBlP"],
  ["Funda Goyard", "4€", "https://c.onlyaff.app/8imII9"],
  ["Asics Gel Nyc", "24€", "https://c.onlyaff.app/8imOOi"],
  ["Camisa Ralph Lauren", "14€", "https://c.onlyaff.app/8imWf5"],
  ["SHOT TL Shoes", "36.51€", "https://c.onlyaff.app/8j8i6X"],
  ["Trendy Retro Dad Shoes", "29.59€", "https://c.onlyaff.app/8j8nus"],
  ["Cool Boys Graphic Shirt", "10€", "https://c.onlyaff.app/8j8rxJ"],
  ["Chic European Vine Bag", "18.33€", "https://c.onlyaff.app/8j8w0z"],
  ["Classic Womens Cowhide Belt", "6.88€", "https://c.onlyaff.app/8j8z42"],
  ["Trendy A1o Yoga Socks", "2.90€", "https://c.onlyaff.app/8j8CrL"],
  ["Trendy Interactive Coach Card", "20.39€", "https://c.onlyaff.app/8j8FVz"],
];

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

function getCategory(name) {
  const n = name.toLowerCase();
  if (n.includes('camiseta') || n.includes('shirt') || n.includes('sueter')) return 'Camisetas';
  if (n.includes('zapatillas') || n.includes('shoes') || n.includes('samba') || n.includes('spezial') || n.includes('asics') || n.includes('yeezy') || n.includes('on cloud') || n.includes('gats') || n.includes('ball-star') || n.includes('premiata') || n.includes('onitsuka') || n.includes('adizero')) return 'Calzado';
  if (n.includes('pantalon') || n.includes('chandal') || n.includes('sudadera') || n.includes('conjunto') || n.includes('denim tears') || n.includes('stone island')) return 'Moda';
  if (n.includes('cartera') || n.includes('gafas') || n.includes('belt') || n.includes('bag') || n.includes('socks') || n.includes('funda') || n.includes('tirantes')) return 'Accesorios';
  if (n.includes('airpods') || n.includes('max')) return 'Tecnología';
  return 'Moda';
}

function getBrand(name) {
  const brands = ['Acne Studios', 'Liverpool', 'Yeezy', 'Numeris', 'Saucony', 'Zadig', 'Moncler', 'Trapstar', 'Stussy', 'Essentials', 'Chrome Hearts', 'Under Armour', 'Ralph Lauren', 'Rhude', 'EME Studios', 'Asics', 'On Cloud', 'Alexander McQueen', 'Lanvin', 'Denim Tears', 'Gallery Dept', 'Carhartt', 'Off White', 'Ray-Ban', 'Golden Goose', 'Premiata', 'Stone Island', 'Adidas', 'Onitsuka Tiger', 'Goyard', 'Malaga', 'Represent', 'Corteiz', 'C.P Company', 'Aime Leon Dore', 'Cole Buxton', 'Palm Angels', 'Fake Gods', 'Maison Margiela', 'Nike'];
  for (const b of brands) {
    if (name.toLowerCase().includes(b.toLowerCase())) return b;
  }
  return 'Varios';
}

let startId = 81;
const result = productsData.map(([name, priceStr, url]) => {
  const price = parseFloat(priceStr.replace('€', '').replace(',', '.'));
  const originalPrice = Math.round(price * 2.5); // Random guess for original price
  const slug = slugify(name) + '-new-' + startId;
  const product = {
    id: String(startId++),
    name: name,
    slug: slug,
    description: `${name} de alta calidad. Diseño exclusivo y materiales premium para un estilo inigualable.`,
    price: price,
    originalPrice: originalPrice,
    image: `/images/products/new/${slug}/1.jpg`,
    category: getCategory(name),
    brand: getBrand(name),
    affiliateUrl: url,
    isExclusive: Math.random() > 0.5,
    rating: (4 + Math.random()).toFixed(1),
    reviews: Math.floor(Math.random() * 200) + 10,
    isNew: true
  };
  return product;
});

console.log(JSON.stringify(result, null, 2).slice(1, -1) + ',');
