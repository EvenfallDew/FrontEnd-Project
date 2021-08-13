export const animateCss = (element, animationName, callback) => {
	/* 获取传过来的 */
	const node = document.querySelector(element);

	/* 给元素加上基础类animated，还有动画类 */
	node.classList.add("animated", animationName);

	function handleAnimationEnd() {
		/* 移除基础类和动画类 */
		node.classList.remove("animated", animationName);

		/* 解除当前元素的事件监听 */
		node.removeEventListener("animationend", handleAnimationEnd); /* 如果有回调函数，就执行回调函数 */

		if (typeof callback === "function") callback();
	}

	/* 通过事件监听，当动画结束后，执行handleAnimationEnd函数 */
	node.addEventListener("animationend", handleAnimationEnd);
};
