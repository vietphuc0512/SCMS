'use client';
import * as React from 'react';
import * as RechartsPrimitive from 'recharts';
import { cn } from '@/lib/utils';

// ⚙️ Light/Dark theme selector
const THEMES = { light: '', dark: '.dark' } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & ({ color?: string; theme?: never } | { color?: never; theme: Record<keyof typeof THEMES, string> });
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) throw new Error('useChart must be used within a <ChartContainer />');
  return context;
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    config: ChartConfig;
    children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>['children'];
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          // ✨ Layout & transition
          "flex aspect-video justify-center items-center relative rounded-xl border border-border/40 bg-card shadow-sm",
          "transition-all duration-300 hover:shadow-md hover:scale-[1.005]",
          // ✏️ Recharts element overrides
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground/80",
          "[&_.recharts-cartesian-grid_line]:stroke-border/30",
          "[&_.recharts-tooltip-cursor]:stroke-border/60",
          "[&_.recharts-surface]:outline-none",
          "[&_.recharts-layer]:outline-none",
          "[&_.recharts-sector]:outline-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = 'ChartContainer';

// 🎨 Inject CSS variables for theme colors
const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([_, cfg]) => cfg.theme || cfg.color);
  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join('\n')}
}
`
          )
          .join('\n'),
      }}
    />
  );
};

// 🧊 Tooltip with modern styling
const ChartTooltip = RechartsPrimitive.Tooltip;

interface TooltipPayload {
  value?: any;
  name?: string;
  dataKey?: string;
  payload?: any;
  color?: string;
  fill?: string;
}

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    active?: boolean;
    payload?: TooltipPayload[];
    label?: string | number;
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: 'line' | 'dot' | 'dashed';
    nameKey?: string;
    labelKey?: string;
    labelFormatter?: (label: any, payload: any[]) => React.ReactNode;
    formatter?: (value: any, name: any, item: any, index: number, payload: any) => React.ReactNode;
    color?: string;
    labelClassName?: string;
  }
>(
  (
    {
      active,
      payload,
      className,
      indicator = 'dot',
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart();
    if (!active || !payload?.length) return null;

    const tooltipLabel = !hideLabel ? (
      <div className={cn('font-semibold text-sm text-foreground', labelClassName)}>
        {labelFormatter ? labelFormatter(label, payload) : label}
      </div>
    ) : null;

    return (
      <div
        ref={ref}
        className={cn(
          // ✨ Modern tooltip style
          "min-w-[8rem] rounded-lg border border-border/40 bg-background/95 backdrop-blur-md px-3 py-2",
          "shadow-xl transition-all animate-fadeInUp text-xs space-y-1",
          className
        )}
      >
        {tooltipLabel}
        {payload.map((item, i) => {
          const key = `${nameKey || item.name || item.dataKey || 'value'}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const indicatorColor = color || item?.payload?.fill || item?.color;
          return (
            <div key={i} className="flex justify-between items-center gap-3">
              <div className="flex items-center gap-2">
                {!hideIndicator && (
                  <div
                    className={cn("h-2 w-2 rounded-sm")}
                    style={{ backgroundColor: indicatorColor }}
                  />
                )}
                <span className="text-muted-foreground">{itemConfig?.label || item.name}</span>
              </div>
              <span className="font-mono font-medium text-foreground">
                {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
);
ChartTooltipContent.displayName = 'ChartTooltipContent';

// 🧭 Legend styling
const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    payload?: any[];
    verticalAlign?: 'top' | 'middle' | 'bottom';
    hideIcon?: boolean;
    nameKey?: string;
  }
>(({ className, hideIcon = false, payload, verticalAlign = 'bottom', nameKey }, ref) => {
  const { config } = useChart();
  if (!payload?.length) return null;

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground/90',
        verticalAlign === 'top' ? 'pb-3' : 'pt-3',
        className
      )}
    >
      {payload.map((item: any) => {
        const key = `${nameKey || item.dataKey || 'value'}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);
        return (
          <div key={item.value} className="flex items-center gap-2">
            {!hideIcon && (
              <div
                className="h-2.5 w-2.5 rounded-[2px]"
                style={{ backgroundColor: item.color }}
              />
            )}
            <span>{itemConfig?.label}</span>
          </div>
        );
      })}
    </div>
  );
});
ChartLegendContent.displayName = 'ChartLegendContent';

// 🧩 Helper
function getPayloadConfigFromPayload(config: ChartConfig, payload: any, key: string) {
  if (!payload || typeof payload !== 'object') return undefined;
  const data = payload.payload || {};
  const labelKey = key in data ? data[key] : key;
  return config[labelKey] || config[key];
}

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle };
