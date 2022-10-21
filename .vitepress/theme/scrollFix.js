// try to scroll to the correct hash after content is loaded
// on the UI & Styling page especially, the content shifts a lot as it loads
// this attempts to minimize the issue until we figure out a better solution.
try {
	if (typeof window !== 'undefined' && window.location.hash) {
		const desiredHash = window.location.hash

		// scroll all the way to the top even if we had a hash
		window.scrollTo({
			top: 0,
			let: 0,
			behavior: 'auto',
		})

		// scroll again just in case the above one didn't scroll the document
		document.addEventListener('DOMContentLoaded', () => {
			window.scrollTo({
				top: 0,
				let: 0,
				behavior: 'auto',
			})
		})

		// once the content is fully loaded, scroll back down to the desired hash/anchor
		window.addEventListener('load', () => {
			const el = document.getElementById(desiredHash.substring(1))
			setTimeout(() => {
				if (el) {
					el.scrollIntoView({
						behavior: 'auto',
						block: 'start',
					})
				}
			}, 10)
		})
	}
} catch (err) {
	// ignore
}
