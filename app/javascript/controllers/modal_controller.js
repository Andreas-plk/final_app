import { Controller } from "@hotwired/stimulus";
import { Modal } from "bootstrap";

export default class extends Controller {
  static targets = ["modal"];

  connect() {
    console.log("Modal Controller Connected!");
  }

  open(event) {
    let card = event.currentTarget.closest(".single-post-card");
    if (!card) return;

    console.log("Card Clicked:", card);

    // Extract post details from data attributes
    let postedBy = card.dataset.postedBy || "Unknown";
    let title = card.dataset.title || "No Title";
    let content = card.dataset.content || "No Content";
    let interestedUrl = card.dataset.interestedUrl || "#";

    // Update modal content
    this.modalTarget.querySelector(".modal-header .posted-by").textContent = postedBy;
    this.modalTarget.querySelector(".loaded-data h3").textContent = title;
    this.modalTarget.querySelector(".loaded-data p").textContent = content;
    this.modalTarget.querySelector(".loaded-data .interested a").setAttribute("href", interestedUrl);

    // Show Bootstrap modal
    let modalInstance = new Modal(this.modalTarget);
    modalInstance.show();
  }
}
