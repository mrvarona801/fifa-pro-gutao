import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Coins, Calculator, RotateCcw, TrendingUp, TrendingDown, Percent } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Calculadora FIFA — Lucro de Mercado" },
      { name: "description", content: "Calcule o lucro real das suas vendas no mercado do FIFA descontando a taxa de 5% da EA." },
    ],
  }),
});

type Result = { lucro: number; perda: number; taxa: number };

function Index() {
  const [compra, setCompra] = useState("");
  const [venda, setVenda] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const canCalc = useMemo(() => Number(compra) > 0 && Number(venda) > 0, [compra, venda]);

  const calcular = () => {
    const c = Number(compra);
    const v = Number(venda);
    if (!c || !v) return;
    const taxa = v * 0.05;
    setResult({
      lucro: v - c - taxa,
      perda: c + taxa,
      taxa,
    });
  };

  const limpar = () => {
    setCompra("");
    setVenda("");
    setResult(null);
  };

  const fmt = (n: number) =>
    new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 }).format(Math.round(n));

  return (
    <main className="relative z-10 min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl">
        <header className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card/60 backdrop-blur border border-border mb-4">
            <Coins className="size-4 text-accent" />
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Ultimate Team Market</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl tracking-wider text-foreground">
            Calculadora <span className="text-primary drop-shadow-[0_0_20px_oklch(0.78_0.19_145/0.5)]">FIFA</span>
          </h1>
          <p className="mt-3 text-muted-foreground text-sm">
            Descubra seu lucro real após a taxa de 5% da EA
          </p>
        </header>

        <section
          className="rounded-2xl border border-border bg-card backdrop-blur-xl p-6 sm:p-8"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="space-y-5">
            <Field
              label="Valor da Compra"
              hint="Quanto você pagou pelo jogador"
              value={compra}
              onChange={setCompra}
            />
            <Field
              label="Valor da Venda"
              hint="Por quanto pretende vender"
              value={venda}
              onChange={setVenda}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mt-7">
            <button
              onClick={calcular}
              disabled={!canCalc}
              className="group relative inline-flex items-center justify-center gap-2 h-12 rounded-xl font-semibold text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-transform active:scale-[0.98]"
              style={{ background: "var(--gradient-green)", boxShadow: "var(--shadow-glow)" }}
            >
              <Calculator className="size-4" />
              Calcular
            </button>
            <button
              onClick={limpar}
              className="inline-flex items-center justify-center gap-2 h-12 rounded-xl font-semibold bg-secondary text-secondary-foreground border border-border hover:bg-secondary/70 transition-colors active:scale-[0.98]"
            >
              <RotateCcw className="size-4" />
              Limpar
            </button>
          </div>

          {result && (
            <div className="mt-8 grid gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <ResultRow
                icon={<TrendingUp className="size-5" />}
                label="Lucro Total"
                value={fmt(result.lucro)}
                tone={result.lucro >= 0 ? "success" : "danger"}
                emphasis
              />
              <ResultRow
                icon={<TrendingDown className="size-5" />}
                label="Perda (custo + taxa)"
                value={fmt(result.perda)}
                tone="danger"
              />
              <ResultRow
                icon={<Percent className="size-5" />}
                label="Taxa EA (5%)"
                value={fmt(result.taxa)}
                tone="gold"
              />
            </div>
          )}
        </section>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Inspirado em "Calculadora FIFA" — feito para o mercado do Ultimate Team
        </p>
      </div>
    </main>
  );
}

function Field({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-[11px] text-muted-foreground">{hint}</span>
      </div>
      <div className="relative">
        <Coins className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-accent" />
        <input
          inputMode="numeric"
          pattern="[0-9]*"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, ""))}
          placeholder="0"
          className="w-full h-12 pl-10 pr-16 rounded-xl bg-input border border-border text-foreground text-lg font-semibold placeholder:text-muted-foreground/50 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs uppercase tracking-wider text-muted-foreground">
          coins
        </span>
      </div>
    </label>
  );
}

function ResultRow({
  icon,
  label,
  value,
  tone,
  emphasis,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: "success" | "danger" | "gold";
  emphasis?: boolean;
}) {
  const toneClasses = {
    success: "text-success",
    danger: "text-destructive",
    gold: "text-gold",
  }[tone];

  return (
    <div
      className={`flex items-center justify-between rounded-xl border border-border bg-secondary/40 backdrop-blur px-4 ${
        emphasis ? "py-5" : "py-3.5"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className={`flex size-9 items-center justify-center rounded-lg bg-background/50 ${toneClasses}`}>
          {icon}
        </span>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <div className={`flex items-baseline gap-1.5 font-display tracking-wider ${toneClasses} ${emphasis ? "text-3xl" : "text-2xl"}`}>
        {value}
        <span className="text-[10px] uppercase tracking-widest opacity-70">coins</span>
      </div>
    </div>
  );
}
