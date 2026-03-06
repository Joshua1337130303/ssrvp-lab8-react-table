import { useState, useRef, useCallback } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, TableSortLabel, Paper, Typography, useTheme, useMediaQuery } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

/* ─────────────────────────── DraggableHeaderCell ── */
/**
 * Ячейка заголовка с поддержкой:
 * - сортировки (TableSortLabel)
 * - перетаскивания колонок (useSortable из @dnd-kit/sortable)
 * - sticky на мобильных (isFirst && isMobile)
 */
function DraggableHeaderCell({ header, bgColor, dividerColor, isFirst, isMobile }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: header.id });

  return (
    <th
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        background: bgColor,
        padding: '10px 14px',
        borderBottom: `2px solid ${dividerColor}`,
        fontWeight: 700,
        fontSize: '0.76rem',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        boxSizing: 'border-box',
        /* Sticky: все заголовки прибиты к верху, первый — ещё и к левому краю на мобильных */
        position: 'sticky',
        top: 0,
        left: isMobile && isFirst ? 0 : undefined,
        zIndex: isMobile && isFirst ? 4 : 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {header.column.getCanSort() ? (
          <TableSortLabel
            active={!!header.column.getIsSorted()}
            direction={header.column.getIsSorted() || 'asc'}
            onClick={header.column.getToggleSortingHandler()}
            sx={{ fontSize: 'inherit', fontWeight: 'inherit', letterSpacing: 'inherit' }}
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
          </TableSortLabel>
        ) : (
          <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
        )}

        {/* Иконка перетаскивания — не на первой колонке */}
        {!isFirst && (
          <Box
            {...attributes}
            {...listeners}
            sx={{
              cursor: 'grab',
              color: 'text.disabled',
              display: 'flex',
              alignItems: 'center',
              ml: 0.5,
              '&:active': { cursor: 'grabbing' },
            }}
          >
            <DragIndicatorIcon sx={{ fontSize: 15 }} />
          </Box>
        )}
      </Box>
    </th>
  );
}

/* ─────────────────────────── DataTable ── */
/**
 * DataTable — универсальная таблица на базе @tanstack/react-table.
 *
 * Возможности:
 * - Сортировка по клику на заголовок (getSortedRowModel)
 * - Перетаскивание колонок (@dnd-kit/sortable, горизонтальная стратегия)
 * - Виртуализация строк (@tanstack/react-virtual) — динамическая подгрузка при скролле
 * - Фиксированная первая колонка на мобильных (position: sticky; left: 0)
 *
 * Props:
 *   columns   — массив колонок для useReactTable (каждая должна иметь поле id)
 *   data      — массив данных
 *   rowHeight — оценочная высота строки для виртуализатора (по умолчанию 52px)
 *   emptyText — текст при пустом data
 */
function DataTable({ columns, data, rowHeight = 52, emptyText = 'Нет данных' }) {
  const theme    = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const bgColor      = theme.palette.background.paper;
  const dividerColor = theme.palette.divider;
  const hoverBg      = theme.palette.mode === 'dark'
    ? 'rgba(255,255,255,0.04)'
    : 'rgba(0,0,0,0.03)';

  /* ── Table state ── */
  const [sorting, setSorting] = useState([]);
  const [columnOrder, setColumnOrder] = useState(
    () => columns.map((c) => c.id ?? c.accessorKey)
  );

  /* ── react-table instance ── */
  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnOrder },
    onSortingChange: setSorting,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const { rows } = table.getRowModel();

  /* ── Virtualization (@tanstack/react-virtual v3) ── */
  const parentRef = useRef(null);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeight,
    overscan: 5,
  });

  const virtualItems = virtualizer.getVirtualItems();
  const totalSize    = virtualizer.getTotalSize();

  /* Паддинги для заполнения пространства невидимых строк */
  const paddingTop    = virtualItems[0]?.start ?? 0;
  const paddingBottom = virtualItems.length > 0
    ? totalSize - virtualItems[virtualItems.length - 1].end
    : 0;

  /* ── DnD: перетаскивание колонок (@dnd-kit) ── */
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = useCallback(({ active, over }) => {
    if (active && over && active.id !== over.id) {
      setColumnOrder((prev) => {
        const a = prev.indexOf(String(active.id));
        const b = prev.indexOf(String(over.id));
        return arrayMove(prev, a, b);
      });
    }
  }, []);

  /* ── Render ── */
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
        {/* Прокручиваемый контейнер — точка крепления для virtualizer */}
        <Box
          ref={parentRef}
          sx={{ overflowX: 'auto', overflowY: 'auto', maxHeight: 480 }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              minWidth: 500,
              tableLayout: 'auto',
            }}
          >
            {/* ── Заголовок ── */}
            <thead>
              {table.getHeaderGroups().map((hg) => (
                <SortableContext
                  key={hg.id}
                  items={hg.headers.map((h) => h.id)}
                  strategy={horizontalListSortingStrategy}
                >
                  <tr>
                    {hg.headers.map((header, idx) => (
                      <DraggableHeaderCell
                        key={header.id}
                        header={header}
                        bgColor={bgColor}
                        dividerColor={dividerColor}
                        isFirst={idx === 0}
                        isMobile={isMobile}
                      />
                    ))}
                  </tr>
                </SortableContext>
              ))}
            </thead>

            {/* ── Тело с виртуализацией ── */}
            <tbody>
              {/* Верхний отступ для невидимых строк выше viewport */}
              {paddingTop > 0 && (
                <tr>
                  <td
                    colSpan={columns.length}
                    style={{ height: paddingTop, padding: 0, border: 'none' }}
                  />
                </tr>
              )}

              {virtualItems.map((vRow) => {
                const row = rows[vRow.index];
                return (
                  <tr
                    key={row.id}
                    style={{ borderBottom: `1px solid ${dividerColor}` }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = hoverBg; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = ''; }}
                  >
                    {row.getVisibleCells().map((cell, idx) => (
                      <td
                        key={cell.id}
                        style={{
                          padding: '8px 14px',
                          fontSize: '0.875rem',
                          whiteSpace: 'nowrap',
                          color: theme.palette.text.primary,
                          boxSizing: 'border-box',
                          /* Первая колонка прилипает к левому краю на мобильных */
                          ...(isMobile && idx === 0 ? {
                            position: 'sticky',
                            left: 0,
                            background: bgColor,
                            zIndex: 1,
                            borderRight: `1px solid ${dividerColor}`,
                          } : {}),
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                );
              })}

              {/* Нижний отступ для невидимых строк ниже viewport */}
              {paddingBottom > 0 && (
                <tr>
                  <td
                    colSpan={columns.length}
                    style={{ height: paddingBottom, padding: 0, border: 'none' }}
                  />
                </tr>
              )}

              {/* Пустая таблица */}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={columns.length}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ p: 3, textAlign: 'center', display: 'block' }}
                    >
                      {emptyText}
                    </Typography>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Box>
      </Paper>
    </DndContext>
  );
}

export default DataTable;
