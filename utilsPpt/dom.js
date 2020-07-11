const $ = (str, all) => {
	if(all) {
		return [...document.querySelectorAll(str)]
	} else {
		return document.querySelector(str)
	}

}
