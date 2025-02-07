import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = { conversationId: Number };

  connect() {
    this.chatWindowsCount = document.querySelectorAll(
      ".conversation-window"
    ).length;
    this.initializeGonVariables();
    window.addEventListener("resize", this.hideShowChatWindow.bind(this));

    this.positionChatWindows();
    this.hideShowChatWindow();
  }

  initializeGonVariables() {
    if (typeof gon === "undefined") return;
    if (gon.last_visible_chat_window == null && this.chatWindowsCount > 0) {
      gon.last_visible_chat_window = this.chatWindowsCount;
    }
    if (gon.hidden_chats == null) {
      gon.hidden_chats = 0;
    }
  }

  positionChatWindows() {
    this.chatWindowsCount = document.querySelectorAll(
      ".conversation-window"
    ).length;

    if (
      gon.hidden_chats + gon.last_visible_chat_window !==
      this.chatWindowsCount
    ) {
      if (gon.hidden_chats == 0) {
        gon.last_visible_chat_window = this.chatWindowsCount;
      }
    }

    document
      .querySelectorAll(".conversation-window")
      .forEach((chatWindow, index) => {
        chatWindow.style.right = `${index * 410}px`;
      });
  }

  hideShowChatWindow() {
    if (document.querySelectorAll(".conversation-window").length < 1) return;

    let lastVisibleChat = document.querySelector(
      `.conversation-window:nth-of-type(${gon.last_visible_chat_window})`
    );
    if (!lastVisibleChat) return;

    let offset = lastVisibleChat.getBoundingClientRect();

    if (offset.left < 50 && gon.last_visible_chat_window !== 1) {
      lastVisibleChat.style.display = "none";
      gon.hidden_chats++;
      gon.last_visible_chat_window--;
    }

    if (offset.left > 550 && gon.hidden_chats !== 0) {
      gon.hidden_chats--;
      gon.last_visible_chat_window++;
      let chatWindowToShow = document.querySelector(
        `.conversation-window:nth-of-type(${gon.last_visible_chat_window})`
      );
      if (chatWindowToShow) chatWindowToShow.style.display = "initial";
    }
  }
}
