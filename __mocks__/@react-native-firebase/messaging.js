export default () => ({
  getInitialNotification: () => ({
    data: {
      url: 'mock-url',
    },
  }),
  onNotificationOpenedApp: callback => callback(),
});
