import { FilterOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import React from 'react';
import '../../styles/BaseAntTable.scss';

export interface BaseAntTableProps<T> extends TableProps<T> {
  columns: ColumnsType<T>;
  data: T[];
  rowKey?: TableProps<T>['rowKey'];
  responsive?: boolean;
  compactOnMobile?: boolean;
  breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  hideColumnsOnMobile?: string[];
  mobileCardView?: boolean;
  showHeader?: boolean;
  stickyHeader?: boolean;
}

export function BaseAntTable<T extends object>({
  columns,
  data,
  rowKey = 'id',
  responsive = true,
  compactOnMobile = true,
  // breakpoint = 'md',
  className,
  pagination,
  scroll,
  size = 'middle',
  showHeader = true,
  stickyHeader = false,
  ...rest
}: BaseAntTableProps<T>) {
  const [isMobile, setIsMobile] = React.useState(false);
  const [isTablet, setIsTablet] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200,
  );
  const [devicePixelRatio, setDevicePixelRatio] = React.useState(
    typeof window !== 'undefined' ? window.devicePixelRatio : 1,
  );

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const dpr = window.devicePixelRatio || 1;

      setWindowWidth(width);
      setDevicePixelRatio(dpr);

      const zoomAdjustment = dpr > 1 ? 1 + (dpr - 1) * 0.3 : 1;
      const adjustedWidth = width * zoomAdjustment;

      setIsMobile(adjustedWidth < 768 * zoomAdjustment);

      setIsTablet(adjustedWidth >= 768 * zoomAdjustment && adjustedWidth < 1024 * zoomAdjustment);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const mediaQuery = window.matchMedia('screen');
    mediaQuery.addEventListener('change', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  const defaultPagination = React.useMemo(() => {
    const paginationSize: 'small' | 'default' = isMobile ? 'small' : 'default';

    const isHighZoom = devicePixelRatio > 1.2;

    return {
      showSizeChanger: !isMobile && !isHighZoom,
      showQuickJumper: !isMobile && windowWidth > 1024 && !isHighZoom,
      showTotal: (total: number, range: [number, number]) => {
        if (isMobile) return `${range[0]}-${range[1]}/${total}`;
        if (isTablet || isHighZoom) return `${range[0]}-${range[1]} / ${total}`;
        return `${range[0]}-${range[1]} của ${total} mục`;
      },
      pageSizeOptions: ['10', '20', '50', '100'],
      size: paginationSize,
      pageSize: isMobile ? 10 : 20,
      simple: isMobile && windowWidth < 480,
      ...pagination,
    };
  }, [isMobile, isTablet, windowWidth, devicePixelRatio, pagination]);

  const enhancedColumns = React.useMemo(() => {
    return columns.map((col) => ({
      ...col,
      showSorterTooltip: {
        title: 'Click để sắp xếp',
      },
      filterIcon:
        col.filterIcon ||
        ((filtered: boolean) => (
          <FilterOutlined
            style={{
              color: filtered ? 'var(--primary-color)' : '#94a3b8',
              fontSize: '14px',
              transition: 'all 0.3s ease',
            }}
          />
        )),
      ...col,
    }));
  }, [columns]);

  const responsiveScroll = React.useMemo(() => {
    if (!responsive) return scroll;

    const baseScroll: { x?: string | number | true; y?: string | number } = {
      x: 'max-content',
      ...scroll,
    };

    if (isMobile) {
      return {
        ...baseScroll,
        x: scroll?.x || 'max-content',
        y: scroll?.y || undefined,
      };
    }

    if (isTablet) {
      return {
        ...baseScroll,
        x: scroll?.x || 'max-content',
      };
    }

    return baseScroll;
  }, [responsive, scroll, isMobile, isTablet]);

  const responsiveColumns = React.useMemo(() => {
    if (!compactOnMobile) return enhancedColumns;

    return enhancedColumns.map((col, index) => {
      const responsive = col.responsive;
      let className = col.className || '';

      if (isMobile) {
        if (index === 0) {
          return {
            ...col,
            className: className.trim(),
            ellipsis: true,
          };
        }

        const isActionColumn =
          col.key === 'actions' ||
          ('dataIndex' in col && col.dataIndex === 'actions') ||
          (col.title &&
            typeof col.title === 'string' &&
            (col.title.toLowerCase().includes('thao tác') ||
              col.title.toLowerCase().includes('hành động')));

        if (index === enhancedColumns.length - 1 && isActionColumn) {
          return {
            ...col,
            className: className.trim(),
            fixed: windowWidth < 576 ? undefined : col.fixed,
          };
        }

        if (
          !responsive ||
          (Array.isArray(responsive) && !responsive.includes('xs') && !responsive.includes('sm'))
        ) {
          className += ' hidden-xs hidden-sm';
        }
      }

      if (responsive && Array.isArray(responsive)) {
        if (!responsive.includes('xs')) className += ' hidden-xs';
        if (!responsive.includes('sm')) className += ' hidden-sm';
        if (!responsive.includes('md')) className += ' hidden-md';
        if (!responsive.includes('lg')) className += ' hidden-lg';
        if (!responsive.includes('xl')) className += ' hidden-xl';
      }

      return {
        ...col,
        className: className.trim(),

        ellipsis: isMobile ? { showTitle: true } : col.ellipsis,

        width:
          isMobile && col.width && typeof col.width === 'number'
            ? Math.min(col.width, 120)
            : col.width,

        fixed: windowWidth < 576 ? undefined : col.fixed,
      };
    });
  }, [enhancedColumns, compactOnMobile, isMobile, windowWidth]);

  const tableClassName = React.useMemo(() => {
    const baseClass = 'base-ant-table';
    const mobileClass = isMobile ? 'mobile-responsive' : '';
    const tabletClass = isTablet ? 'tablet-responsive' : '';
    const stickyClass = stickyHeader ? 'sticky-header' : '';

    const zoomClass = devicePixelRatio > 1.15 ? 'zoom-compact' : '';
    return [baseClass, mobileClass, tabletClass, stickyClass, zoomClass, className]
      .filter(Boolean)
      .join(' ');
  }, [className, isMobile, isTablet, stickyHeader, devicePixelRatio]);

  const tableSize = React.useMemo(() => {
    if (windowWidth < 480) return 'small';
    if (isMobile) return 'small';
    if (isTablet) return 'middle';
    return size;
  }, [isMobile, isTablet, windowWidth, size]);

  return (
    <div className={tableClassName}>
      <Table
        columns={responsiveColumns}
        dataSource={data}
        rowKey={rowKey}
        pagination={defaultPagination}
        scroll={responsiveScroll}
        size={tableSize}
        showHeader={showHeader}
        sticky={stickyHeader ? { offsetHeader: 64 } : false}
        rowClassName={(_, index) => {
          const baseRowClass = `table-row-${index % 2 === 0 ? 'even' : 'odd'}`;
          const mobileRowClass = isMobile ? 'mobile-row' : '';
          const tabletRowClass = isTablet ? 'tablet-row' : '';
          return [baseRowClass, mobileRowClass, tabletRowClass].filter(Boolean).join(' ');
        }}
        {...rest}
      />
    </div>
  );
}
