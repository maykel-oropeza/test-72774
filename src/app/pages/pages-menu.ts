import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'select a category',
    group: true,
  },
  {
    title: 'Categories',
    icon: 'nb-e-commerce',
    children: [
      {
        title: 'Calendar',
        link: '/pages/extra-components/calendar',
        children: [
          {
            title: 'Calendar hijo 1',
            link: '/pages/extra-components/calendar1',
            children: [
              {
                title: 'Calendar hijo 2',
                link: '/pages/extra-components/calendar2'
              }
            ]
          },
          {
            title: 'test',
            link: '/pages/extra-components/calendar3',
          }
        ]
      },
      {
        title: 'Stepper',
        link: '/pages/extra-components/stepper',
        children: [
          {
            title: 'Stepper hijo',
            link: '/pages/extra-components/calendar',
          }
        ]
      },
      {
        title: 'List',
        link: '/pages/extra-components/list',
      },
      {
        title: 'Infinite List',
        link: '/pages/extra-components/infinite-list',
      },
      {
        title: 'Accordion',
        link: '/pages/extra-components/accordion',
      },
      {
        title: 'Progress Bar',
        link: '/pages/extra-components/progress-bar',
      },
      {
        title: 'Spinner',
        link: '/pages/extra-components/spinner',
      },
      {
        title: 'Alert',
        link: '/pages/extra-components/alert',
      },
      {
        title: 'Tree',
        link: '/pages/extra-components/tree',
      },
      {
        title: 'Tabs',
        link: '/pages/extra-components/tabs',
      },
      {
        title: 'Calendar Kit',
        link: '/pages/extra-components/calendar-kit',
      },
      {
        title: 'Chat',
        link: '/pages/extra-components/chat',
      },
    ],
  }
];
