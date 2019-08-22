class NativeClient {
	constructor(swRegistration) {
		this.swRegistration = swRegistration;
		this.isSubscribed = false;

		this.pushButton = document.getElementById("js-push-btn");
	}

	initializeUI() {
		this.pushButton.addEventListener("click", () => {
			pushButton.disabled = true;
	
			if (this.isSubscribed) {
				this.unsubscribeUser();
			} else {
				this.subscribeUser();
			}
		});

		// Set the initial subscription value
		this.setInitialSubscriptionValue()
	}

	setInitialSubscriptionValue() {
		console.log('TODO -> setInitialSubscriptionValue')
	}

	unsubscribeUser() {
		console.log('TODO -> unsubscribeUser')
	}

	subscribeUser() {
		console.log('TODO -> subscribeUser')
	}

	updatePushBtn() {
		console.log('TODO -> updatePushBtn')
	}
}