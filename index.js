import notifications from "./notifications.json" assert { type: "json" };

const notificationElement = document.querySelector(".notifications");
const readButton = document.querySelector(".header p");
const numNotifcations = document.querySelector(".header span");

const displayNotifications = () => {
  let numUnread = 0;
  notifications.forEach(notification => {
    const notificationDiv = document.createElement("div");
    notificationDiv.className = JSON.parse(notification.read)
      ? "notification"
      : "notification unread";

    const profilePicElement = document.createElement("img");
    profilePicElement.src = notification.profile_pic;
    profilePicElement.className = "profile-pic";
    notificationDiv.appendChild(profilePicElement);

    const infoDiv = document.createElement("div");
    infoDiv.className = "info";
    notificationDiv.appendChild(infoDiv);

    const topDiv = document.createElement("div");
    topDiv.className = "top";
    infoDiv.appendChild(topDiv);

    const profileNameElement = document.createElement("p");
    profileNameElement.textContent = notification.profile_name;
    profileNameElement.className = "profile-name";
    topDiv.appendChild(profileNameElement);

    const textElement = document.createElement("span");
    textElement.textContent = notification.notification;
    textElement.className = "text";
    topDiv.appendChild(textElement);

    const dateElement = document.createElement("span");
    dateElement.textContent = notification.date;
    dateElement.className = "date";
    infoDiv.appendChild(dateElement);

    if (notification.group) {
      const groupElement = document.createElement("span");
      groupElement.textContent = notification.group;
      groupElement.className = "group";
      topDiv.appendChild(groupElement);
    } else if (notification.post) {
      const postElement = document.createElement("span");
      postElement.textContent = notification.post;
      postElement.className = "post";
      topDiv.appendChild(postElement);
    } else if (notification.image) {
      const imgElement = document.createElement("img");
      imgElement.src = notification.image;
      imgElement.className = "image";
      notificationDiv.appendChild(imgElement);
    } else if (notification.message) {
      const messageElement = document.createElement("p");
      messageElement.textContent = notification.message;
      messageElement.className = "message";
      infoDiv.appendChild(messageElement);
    }

    const dotElement = document.createElement("span");
    dotElement.className = JSON.parse(notification.read) ? "dot" : "dot unread";
    topDiv.appendChild(dotElement);

    notificationElement.appendChild(notificationDiv);

    if (!JSON.parse(notification.read)) numUnread++;
  });

  numNotifcations.textContent = numUnread;
};

const markAllAsRead = () => {
  const notificationelements = document.querySelectorAll(".notification");

  notificationelements.forEach(notification => {
    const dot = notification.querySelector(".dot");

    notification.classList.remove("unread");
    dot.classList.remove("unread");
  });
  numNotifcations.textContent = 0;
};

displayNotifications();

readButton.addEventListener("click", () => {
  markAllAsRead();
});
