"use client";

import { useMemo, useState } from "react";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  badge: string;
  specs: string[];
  imagePosition: string;
};

const categories = ["Todos", "Teclados", "Cables", "M.2", "Adaptadores"];

const products: Product[] = [
  {
    id: "keyboard-pro",
    name: "Teclado mecanico UltraKey K87",
    category: "Teclados",
    price: 89,
    badge: "Hot-swap",
    specs: ["Switches silenciosos", "RGB por tecla", "USB-C trenzado"],
    imagePosition: "44% 76%",
  },
  {
    id: "hdmi-8k",
    name: "Cable HDMI Ultra Rapido 8K",
    category: "Cables",
    price: 24,
    badge: "48 Gbps",
    specs: ["8K a 60 Hz", "HDR dinamico", "Conectores reforzados"],
    imagePosition: "55% 28%",
  },
  {
    id: "m2-adapter",
    name: "Adaptador M.2 NVMe a USB-C",
    category: "M.2",
    price: 39,
    badge: "10 Gbps",
    specs: ["NVMe/SATA M.2", "Carcasa aluminio", "Disipacion activa"],
    imagePosition: "47% 43%",
  },
  {
    id: "usb-c-hub",
    name: "Hub USB-C Pro 7 en 1",
    category: "Adaptadores",
    price: 49,
    badge: "4K HDMI",
    specs: ["HDMI 4K", "PD 100 W", "USB 3.2 + lector SD"],
    imagePosition: "82% 38%",
  },
  {
    id: "switch-kit",
    name: "Kit switches lineales lime",
    category: "Teclados",
    price: 18,
    badge: "Pack x36",
    specs: ["Lubricados", "Pines estables", "Perfil gamer/oficina"],
    imagePosition: "87% 86%",
  },
  {
    id: "usb-fast",
    name: "Cable USB-C carga rapida",
    category: "Cables",
    price: 16,
    badge: "100 W",
    specs: ["Nylon trenzado", "E-marker", "Datos 480 Mbps"],
    imagePosition: "62% 91%",
  },
];

function formatPrice(value: number) {
  return new Intl.NumberFormat("es-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Storefront() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [cart, setCart] = useState<Record<string, number>>({
    "hdmi-8k": 1,
    "m2-adapter": 1,
  });

  const visibleProducts = useMemo(
    () =>
      activeCategory === "Todos"
        ? products
        : products.filter((product) => product.category === activeCategory),
    [activeCategory],
  );

  const cartItems = products
    .map((product) => ({ ...product, quantity: cart[product.id] ?? 0 }))
    .filter((product) => product.quantity > 0);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const mailBody = encodeURIComponent(
    cartItems
      .map(
        (item) =>
          `${item.quantity} x ${item.name} - ${formatPrice(item.price)}`,
      )
      .join("\n") || "Quiero recibir asesoria para armar mi pedido.",
  );

  function addProduct(productId: string) {
    setCart((current) => ({
      ...current,
      [productId]: (current[productId] ?? 0) + 1,
    }));
  }

  function removeProduct(productId: string) {
    setCart((current) => {
      const nextQuantity = (current[productId] ?? 0) - 1;
      const nextCart = { ...current };
      if (nextQuantity <= 0) {
        delete nextCart[productId];
      } else {
        nextCart[productId] = nextQuantity;
      }
      return nextCart;
    });
  }

  return (
    <main className="min-h-screen bg-[#f5f7f4] text-[#141614]">
      <header className="absolute left-0 right-0 top-0 z-20">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 text-white sm:px-8">
          <a className="text-lg font-semibold tracking-wide" href="#inicio">
            Ultra Rapidos Tech
          </a>
          <div className="hidden items-center gap-7 text-sm font-medium md:flex">
            <a href="#catalogo">Catalogo</a>
            <a href="#combos">Combos</a>
            <a href="#pedido">Pedido</a>
          </div>
          <a
            className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-[#101312] shadow-sm transition hover:bg-[#d8ff4f]"
            href="#pedido"
          >
            Carrito ({cartCount})
          </a>
        </nav>
      </header>

      <section
        className="relative flex min-h-[78vh] items-end overflow-hidden bg-[#111615] px-5 pb-10 pt-28 text-white sm:px-8 lg:min-h-[82vh]"
        id="inicio"
      >
        <img
          alt="Teclado mecanico, cable HDMI, adaptador M.2 y hub USB-C"
          className="absolute inset-0 h-full w-full object-cover"
          src="/tech-lineup.png"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,14,13,0.86)_0%,rgba(10,14,13,0.7)_34%,rgba(10,14,13,0.16)_72%,rgba(10,14,13,0.05)_100%)]" />
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="max-w-2xl pb-2">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#d8ff4f]">
              Stock premium para setup y soporte tecnico
            </p>
            <h1 className="text-5xl font-semibold leading-none sm:text-6xl lg:text-7xl">
              Ultra Rapidos Tech
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">
              Teclados mecanicos, cables HDMI de alta velocidad, adaptadores
              M.2, hubs USB-C y accesorios listos para despacho.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                className="rounded-md bg-[#d8ff4f] px-5 py-3 text-sm font-bold text-[#111615] transition hover:bg-white"
                href="#catalogo"
              >
                Ver catalogo
              </a>
              <a
                className="rounded-md border border-white/55 px-5 py-3 text-sm font-bold text-white transition hover:border-[#74e0ff] hover:text-[#74e0ff]"
                href="#pedido"
              >
                Cotizar pedido
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#d7ddd6] bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-5 text-sm font-semibold text-[#303530] sm:grid-cols-3 sm:px-8">
          <p>Despacho en 24-48 h</p>
          <p>Garantia directa de 12 meses</p>
          <p>Asesoria para compatibilidad M.2 y HDMI</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8" id="catalogo">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#087d92]">
              Catalogo destacado
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Productos listos para vender
            </h2>
          </div>
          <div aria-label="Categorias" className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                aria-pressed={activeCategory === category}
                className={`rounded-md border px-4 py-2 text-sm font-semibold transition ${
                  activeCategory === category
                    ? "border-[#111615] bg-[#111615] text-white"
                    : "border-[#cad3c9] bg-white text-[#303530] hover:border-[#087d92]"
                }`}
                key={category}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleProducts.map((product) => (
            <article
              className="overflow-hidden rounded-lg border border-[#d7ddd6] bg-white shadow-sm"
              key={product.id}
            >
              <div className="relative h-44 overflow-hidden bg-[#e7ebe5]">
                <img
                  alt={product.name}
                  className="h-full w-full object-cover"
                  src="/tech-lineup.png"
                  style={{ objectPosition: product.imagePosition }}
                />
                <span className="absolute left-3 top-3 rounded-md bg-[#d8ff4f] px-3 py-1 text-xs font-bold text-[#111615]">
                  {product.badge}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#087d92]">
                      {product.category}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold leading-tight">
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-xl font-bold">{formatPrice(product.price)}</p>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-[#555d55]">
                  {product.specs.map((spec) => (
                    <li className="flex gap-2" key={spec}>
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#087d92]" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className="mt-5 w-full rounded-md bg-[#111615] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#087d92]"
                  onClick={() => addProduct(product.id)}
                  type="button"
                >
                  Agregar al carrito
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#111615] px-5 py-14 text-white sm:px-8" id="combos">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#d8ff4f]">
              Combos para clientes frecuentes
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Arma pedidos por setup, soporte o reventa
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["Setup gamer", "Teclado K87 + HDMI 8K + cable USB-C"],
              ["Tecnico M.2", "Adaptador NVMe + hub USB-C + cable rapido"],
              ["Oficina pro", "Hub 7 en 1 + HDMI 8K + accesorios USB"],
            ].map(([title, copy]) => (
              <article
                className="rounded-lg border border-white/20 bg-white/10 p-5"
                key={title}
              >
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/72">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8" id="pedido">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#087d92]">
              Pedido rapido
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Carrito de cotizacion
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#555d55]">
              Cotizaciones con disponibilidad, color, longitud de cable y
              compatibilidad exacta antes del despacho.
            </p>
          </div>

          <aside className="rounded-lg border border-[#d7ddd6] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#e2e7e1] pb-4">
              <h3 className="text-xl font-semibold">Resumen</h3>
              <span className="rounded-md bg-[#eef8fb] px-3 py-1 text-sm font-bold text-[#087d92]">
                {cartCount} items
              </span>
            </div>

            <div className="max-h-80 overflow-auto py-2">
              {cartItems.length === 0 ? (
                <p className="py-8 text-sm text-[#555d55]">
                  El carrito esta listo para tu seleccion.
                </p>
              ) : (
                cartItems.map((item) => (
                  <div
                    className="flex items-center justify-between gap-4 border-b border-[#eef1ed] py-4"
                    key={item.id}
                  >
                    <div>
                      <p className="font-semibold leading-tight">{item.name}</p>
                      <p className="mt-1 text-sm text-[#555d55]">
                        {item.quantity} x {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        aria-label={`Quitar ${item.name}`}
                        className="grid h-8 w-8 place-items-center rounded-md border border-[#cad3c9] font-bold"
                        onClick={() => removeProduct(item.id)}
                        type="button"
                      >
                        -
                      </button>
                      <button
                        aria-label={`Agregar ${item.name}`}
                        className="grid h-8 w-8 place-items-center rounded-md border border-[#cad3c9] font-bold"
                        onClick={() => addProduct(item.id)}
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 flex items-center justify-between text-lg font-bold">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <a
              className="mt-5 block rounded-md bg-[#d8ff4f] px-5 py-3 text-center text-sm font-bold text-[#111615] transition hover:bg-[#74e0ff]"
              href={`mailto:ventas@ultrarapidos.tech?subject=Pedido%20Ultra%20Rapidos%20Tech&body=${mailBody}`}
            >
              Enviar pedido
            </a>
          </aside>
        </div>
      </section>

      <footer className="border-t border-[#d7ddd6] bg-white px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-[#555d55] md:flex-row md:items-center md:justify-between">
          <p className="font-semibold text-[#141614]">Ultra Rapidos Tech</p>
          <p>ventas@ultrarapidos.tech</p>
          <p>Teclados, cables, M.2, hubs y accesorios para setups modernos.</p>
        </div>
      </footer>
    </main>
  );
}
