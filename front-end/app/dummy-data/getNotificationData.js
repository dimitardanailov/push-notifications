function generateUniqueTag() {
  return `unique-string-${new Date().toString()}`;
}

function getActions() {
  return [
    {
      action: 'react-action',
      title: 'React',
    },
    {
      action: 'angular-action',
      title: 'Angular',
    },
    {
      action: 'vuejs-action',
      title: 'Vuejs',
    },
    {
      action: 'ember-action',
      title: 'Emberjs',
    },
  ];
}

function getNotificationData() {
  const title = 'New message from Dimitar';
  const options = {
    body: "Dimitar: I'm a developer",

    // ...prevent duplicate notifications
    tag: generateUniqueTag(),

    // There are scenarios where you might want a replacing notification to notify the user rather than silently update. Chat applications are a good example.
    // In this case, you should set tag and renotify to true.
    renotify: true,

    data: {
      // Lets us identity notification
      primaryKey: 1,
    },
  };

  if ('actions' in Notification.prototype) {
    console.log('Action buttons are supported.');
    options.actions = getActions();
  } else {
    console.log('Action buttons are NOT supported.');
  }

  return {
    title,
    options,
  };
}

export default getNotificationData;
