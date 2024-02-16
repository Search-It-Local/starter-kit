
class EmailAddress extends HTMLElement {
	connectedCallback() {
		this.addEventListener('copy', (event) => {
			let unreversedEmail = document.getSelection().baseNode.data.split('').reverse().join('');
			event.clipboardData.setData('text/plain', unreversedEmail);
			event.preventDefault();
		});
	}
}

customElements.define('email-address', EmailAddress);
