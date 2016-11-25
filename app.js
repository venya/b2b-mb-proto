$(function() {

	var DRAG;
	function DRAG_existing() {
		return DRAG.parent().hasClass("grid");
	}

	// Drag from left list
	$('.list').on("dragstart", ".item", dragStart)
	// Drag and drop Products
	$('.grid')
		.on("dragstart", ".item", dragStart)
		.on("dragover", ".item, .placeholder.active", dragOver)
		.on("dragenter", ".item, .placeholder.active", dragEnter)
		.on("dragleave", ".item, .placeholder.active", dragLeave)
		.on("drop", ".item, .placeholder.active", drop);
	// Pagers, Prev/Next, RemoveBasket
	$(".remove-basket, .grid .prev, .grid .next, .pager .page")
		.on("dragover", dragOver)
		.on("dragenter", dragEnter)
		.on("dragleave", dragLeave)
		.on("drop", drop);


	/**
	**	DRAG AND DROP
	**/

	// product or category started to drag
	function dragStart(e) {
		var el = $(this);
		console.log("drag started");
		DRAG = el;
		// DRAG.id = el.data("id");
		// DRAG.type = el.data("type");
		// DRAG.existing = el.parent().hasClass("grid");
	}

	// test if target can accept draggable object
	function dragOver(e) {
		var type = 1;
		var el = $(this);
		// e.dataTransfer.dropEffect = "copy";
		if (DRAG.data("type") == el.data("accept")) // allow droping here!
			e.preventDefault();
	}

	// dragging product or category enters to possible target
	function dragEnter(e) {
		var el = $(this);
		if (DRAG.data("type") == el.data("accept"))
			el.addClass("drop");
		// console.log("drag enter");
	}

	// dragging cursor leaves possible target
	function dragLeave(e) {
		$(this).removeClass("drop");
		// console.log("drag leave");
	}

	// product or category dropped
	function drop(e) {
		console.log("Drop!");
		var target = $(this);
		target.removeClass("drop");
		if ((target.hasClass("item") || target.hasClass("placeholder")) && DRAG_existing())
			listMove(DRAG, target);
		else if (target.hasClass("item") || target.hasClass("placeholder"))
			listAdd(DRAG, target);
		else if (target.hasClass("remove-basket") && DRAG_existing())
			listRemove(DRAG);
	}


	// LIST MANAGEMENT

	function listRemove(item) {
		console.log("Remove");
		item.remove();
	}

	function listAdd(item, toPosition) {
		// TODO
		// 1. Add before toPosition (not after)
		// 2. Do not add when already exists
		// 3. Rebuild page count
		// 4. Add/remove placeholders
		console.log("Add new Item");
		$("<li/>").insertBefore(toPosition)
			.addClass("item")
			.text(item.text())
			.attr("draggable", true)
			.attr("data-type", item.data("type"))
			.attr("data-accept", item.data("type"))
		item.addClass("used");
	}

	function listMove(item, toPosition) {
		// TODO
		// 1. Fix one-off issue
		var target = toPosition.prev();
		console.log("Move");
		item.insertBefore(toPosition);
	}


})