import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["panelBody"];

  toggle(event) {
    event.preventDefault();
    this.panelBodyTarget.classList.toggle("d-none");
  }
}
