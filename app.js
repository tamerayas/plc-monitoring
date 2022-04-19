let ids = []

function getData(pageId) {
	var myRequest = new Request(pageId + '.htm');
	fetch(myRequest).then(function (response) {
		return response.text().then(function (text) {
			document.getElementById(pageId).innerHTML = text
		});
	}).catch(err => {
		console.log(err)
	})
}

function trigger(data, children = null) {
	ids = []
	if (!children)
		children = Array.from(document.querySelectorAll('#' + data.id + 'table')[0].children)

	children.forEach(val => {
		Array.from(val.children).forEach(child => {
			Array.from(child.children[1].children).forEach(tr => {
				ids.push(tr.children[1].id)
			})
		})
	})

	setInterval(function () {
		ids.forEach(async id => {
			await getData(id)
		})
	}, 10000)

}

window.addEventListener('DOMContentLoaded', async function () {
	//All Buttons
	const buttons = document.querySelectorAll("button")

	//Button Click Listener
	buttons.forEach(data => {
		document.getElementById(data.id).addEventListener("click", function (val) {

			buttons.forEach(value => {
				value.classList.remove('success')
			})
			val.currentTarget.classList.add('success')

			document.querySelectorAll('.table').forEach(item => {
				document.getElementsByClassName('header-title')[1].innerHTML = data.id.toUpperCase() + ' ENERJİ İZLEME'
				item.style.display = "none"
			})

			document.getElementById(data.id + 'table').style.display = 'block'

			trigger(data)
		})
		const children = Array.from(document.querySelectorAll('#' + 'trafotable')[0].children)

		trigger(data, children)
	})
})