const Group = require('./group');

function Track(startindex, vertical, animated) {
	this.index = startindex;
	this.animated = animated || false;
	this.vertical = vertical;
	this.startGroupIndex = 0;

	this.update = function(elements) {
		this.groups = Array(elements.length);
		for (var i = 0, len = elements.length; i < len; i++) {
			const elementsGroup = elements[i];
			if (this.index === i) {
				this.startGroupIndex = this.startGroupIndex < elementsGroup.length ? this.startGroupIndex : 0;
			}
			this.groups[i] = new Group(elementsGroup, this.index === i ? this.startGroupIndex : 0, this.animated);
		}

		this.index = this.index < elements.length ? this.index : 0;
	}	

	this.up = function() {
		if (this.vertical) {
			const group = this.groups[this.index];
			group.previous();
		} else {
			this.previous();
		}

		this.startGroupIndex = (this.hasElements() && this.groups[this.index]) ? this.groups[this.index].index : 0;
	}

	this.down = function() {
		if (this.vertical) {
			const group = this.groups[this.index];
			group.next();
		} else {
			this.next();
		}

		this.startGroupIndex = (this.hasElements() && this.groups[this.index]) ? this.groups[this.index].index : 0;
	}

	this.left = function() {
		if (this.vertical) {
			this.previous();
		} else {
			const group = this.groups[this.index];
			group.previous();
		}

		this.startGroupIndex = (this.hasElements() && this.groups[this.index]) ? this.groups[this.index].index : 0;
	}

	this.right = function() {
		if (this.vertical) {
			this.next();
		} else {
			const group = this.groups[this.index];
			group.next();
		}

		this.startGroupIndex = (this.hasElements() && this.groups[this.index]) ? this.groups[this.index].index : 0;
	}

	this.next = function() {
		const nextIndex = this.index + 1;
		this.index = nextIndex >= this.groups.length ? this.index : nextIndex;
	}

		this.previous = function() {
		const prevIndex = this.index - 1;
		this.index = prevIndex < 0 ? this.index : prevIndex;
	}

	this.focus = function(element) {
		const group = this.groups[this.index];
		const currentDOM = element || group.elements[group.index];

		if (currentDOM !== null) {
			currentDOM.focus();
		}
	}

	this.hasElements = function() {
		return this.groups && !!this.groups.length;
	}
}

module.exports = Track;
