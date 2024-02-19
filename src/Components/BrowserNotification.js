export const showNotification = (message) => {
  if (Notification.permission === "granted") {
    // const audio = new Audio("path_to_sound_file.mp3");
    // audio.play();

    const notification = new Notification("Maldo E-pharma", {
      body: message,
    });

    notification.addEventListener("click", () => {
      // Handle notification click event
    });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        showNotification(message);
      }
    });
  }
};