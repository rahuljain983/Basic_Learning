$( document ).ready(function() {
	class Dog {
		constructor() {
			this.sound = 'woof';
	}
		talk() {
			console.log(this.sound);
		}
	}
	const sniffles = new Dog();
	 $('#mybtn').click(function() {
			sniffles.talk();
	 });
});