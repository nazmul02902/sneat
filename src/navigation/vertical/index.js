const navigation = () => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'bx:home-circle',
    },
    {
      title: 'Second Page',
      path: '/second-page',
      icon: 'bx:envelope',
    },
    {
      path: '/acl',
      action: 'read',
      subject: 'acl-page',
      title: 'Access Control',
      icon: 'bx:shield',
    },
    {
      path: '/purchase-order',
      title: 'Purchase Order',
      icon: 'bx:shield',
    },
  

  ]
}

export default navigation
