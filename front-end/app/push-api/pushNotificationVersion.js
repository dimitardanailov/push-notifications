function pushNotificationVersion() {
  // Browser which supports Push notifications API
  if ("PushManager" in window) return "native";

  // Apple Push Notification service (APNs)
  if ("safari" in window && "pushNotification" in window.safari)
    return "safari";

  // If browser doesn't support push notification API or Apple Push Notification service (APNs)
  return "unknown";
}

export default pushNotificationVersion;
