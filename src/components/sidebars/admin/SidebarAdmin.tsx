import {
  BarChartOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  IdcardOutlined,
  LineChartOutlined,
  NotificationOutlined,
  PieChartOutlined,
  ProfileOutlined,
  SafetyOutlined,
  SettingOutlined,
  TeamOutlined,
  ToolOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { Menu } from 'antd';
import { useMemo } from 'react';
import { RiTeamFill } from 'react-icons/ri';

interface SidebarAdminProps {
  collapsed: boolean;
}

export const SidebarAdmin = ({ collapsed }: SidebarAdminProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentSelectedKey = () => {
    const path = location.pathname;
    // Dashboard submenu
    if (path.includes('/dashboard/analytics')) return ['analytics'];
    if (path.includes('/dashboard/reports')) return ['reports'];
    if (path.includes('/dashboard/charts')) return ['charts'];
    if (path.includes('/dashboard/overview')) return ['dashboard'];

    // User Management submenu
    if (path.includes('/users/list')) return ['user-list'];
    if (path.includes('/users/add')) return ['user-add'];
    if (path.includes('/users/roles')) return ['user-roles'];
    if (path.includes('/users')) return ['users'];

    // General Category submenu
    if (path.includes('/general-category/cohorts')) return ['cohorts'];
    if (path.includes('/general-category')) return ['general-category'];

    // Settings submenu
    if (path.includes('/settings/system')) return ['system-settings'];
    if (path.includes('/settings/security')) return ['security-settings'];
    if (path.includes('/settings/notifications')) return ['notification-settings'];
    if (path.includes('/settings')) return ['settings'];

    return ['dashboard'];
  };

  const getOpenKeys = (): string[] => {
    const path = location.pathname;
    const openKeys: string[] = [];

    if (path.includes('/dashboard')) openKeys.push('dashboard-menu');
    if (path.includes('/users')) openKeys.push('users-menu');
    if (path.includes('/general-category')) openKeys.push('general-category-menu');
    if (path.includes('/settings')) openKeys.push('settings-menu');

    return openKeys;
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    const routeMap: Record<string, string> = {
      // Dashboard routes
      dashboard: '/admin/dashboard/overview',
      analytics: '/admin/dashboard/analytics',
      reports: '/admin/dashboard/reports',
      charts: '/admin/dashboard/charts',

      // User Management routes
      users: '/admin/users/list',
      'user-roles': '/admin/users/roles',

      // General Category routes
      'general-category': '/admin/general-category',
      cohorts: '/admin/general-category/cohorts',
      branches: '/admin/general-category/branches',

      // Settings routes
      settings: '/admin/settings',
      'system-settings': '/admin/settings/system',
      'security-settings': '/admin/settings/security',
      'notification-settings': '/admin/settings/notifications',
    };

    if (routeMap[key]) {
      navigate({ to: routeMap[key] });
    }
  };

  const menuItems = useMemo(
    () => [
      {
        key: 'dashboard-menu',
        icon: <DashboardOutlined />,
        label: 'Dashboard',
        children: [
          {
            key: 'dashboard',
            icon: <BarChartOutlined />,
            label: 'Tổng quan',
          },
          {
            key: 'analytics',
            icon: <LineChartOutlined />,
            label: 'Thống kê',
          },
          {
            key: 'reports',
            icon: <ProfileOutlined />,
            label: 'Báo cáo',
          },
          {
            key: 'charts',
            icon: <PieChartOutlined />,
            label: 'Biểu đồ',
          },
        ],
      },
      {
        key: 'general-category-menu',
        icon: <DatabaseOutlined />,
        label: 'Danh mục chung',
        children: [
          {
            key: 'cohorts',
            icon: <TeamOutlined />,
            label: 'Khóa',
          },
          {
            key: 'branches',
            icon: <RiTeamFill />,
            label: 'Chi đoàn',
          },
        ],
      },
      {
        key: 'users-menu',
        icon: <UserOutlined />,
        label: 'Quản lý người dùng',
        children: [
          {
            key: 'users',
            icon: <TeamOutlined />,
            label: 'Tài khoản người dùng',
          },
          {
            key: 'user-roles',
            icon: <IdcardOutlined />,
            label: 'Quyền & vai trò',
          },
        ],
      },
      {
        key: 'settings-menu',
        icon: <SettingOutlined />,
        label: 'Cài đặt',
        children: [
          {
            key: 'settings',
            icon: <ToolOutlined />,
            label: 'Chung',
          },
          {
            key: 'system-settings',
            icon: <DatabaseOutlined />,
            label: 'Hệ thống',
          },
          {
            key: 'security-settings',
            icon: <SafetyOutlined />,
            label: 'Bảo mật',
          },
          {
            key: 'notification-settings',
            icon: <NotificationOutlined />,
            label: 'Thông báo',
          },
        ],
      },
    ],
    [],
  );

  return (
    <div style={{ height: '100%', background: '#001529', color: '#fff' }}>
      <div
        style={{
          padding: '16px',
          textAlign: 'center',
          fontWeight: 700,
          fontSize: 20,
          color: '#fff',
        }}
      >
        {collapsed ? 'QTV' : 'Quản trị viên'}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={getCurrentSelectedKey()}
        defaultOpenKeys={getOpenKeys()}
        onClick={handleMenuClick}
        items={menuItems}
        style={{ border: 'none', background: '#001529' }}
      />
    </div>
  );
};
