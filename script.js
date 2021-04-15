
document.getElementById("wordSubmit").addEventListener("click", function(event) {
	event.preventDefault();
	const value = document.getElementById("wordInput").value;
	if (value === "")
		return;
	const url = "https://wordsapiv1.p.rapidapi.com/words/" + value + "/definitions";

	fetch(url, {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "504a6640f2mshd5e77f520a63da4p1e8f9fjsn642bc0d799fa",
			"x-rapidapi-host": "wordsapiv1.p.rapidapi.com"
		}
	})
	.then(function(response) {
		return response.json();
	}).then(function(json) {
		let results = "";
		results += '<h2>Definition(s) of: ' + json.word + "</h2>";
		results += "\n";
		for (i=0; i<json.definitions.length; ++i){
			let number = i+1;
			results += number + ". " + json.definitions[i].definition + "<br/>";
		}

		document.getElementById("wordResults").innerHTML = results;
	}).catch(err => {
			console.error(err);
			results = "We couldn't find that word. Try a different one!"
			document.getElementById("wordResults").innerHTML = results;
		});

		const url2 = "https://wordsapiv1.p.rapidapi.com/words/" + value + "/synonyms";

		fetch(url2, {
			"method": "GET",
			"headers": {
				"x-rapidapi-key": "504a6640f2mshd5e77f520a63da4p1e8f9fjsn642bc0d799fa",
				"x-rapidapi-host": "wordsapiv1.p.rapidapi.com"
			}
		})
		.then(function(response) {
			return response.json();
		}).then(function(json) {
			let results2 = "";
			results2 += '<h2>Synonyms:' + "</h2>";
			for (i=0; i<json.synonyms.length; ++i){
				let number = i+1;
				results2 += number + ". " + json.synonyms[i] + "<br/>";
			}

			document.getElementById("synonymResults").innerHTML = results2;
		}).catch(err => {
				console.error(err);
				results2 = "We couldn't find any synonyms."
				document.getElementById("synonymResults").innerHTML = results2;
			});

			const url3 = "https://wordsapiv1.p.rapidapi.com/words/" + value + "/examples";

			fetch(url3, {
				"method": "GET",
				"headers": {
					"x-rapidapi-key": "504a6640f2mshd5e77f520a63da4p1e8f9fjsn642bc0d799fa",
					"x-rapidapi-host": "wordsapiv1.p.rapidapi.com"
				}
			})
			.then(function(response) {
				return response.json();
			}).then(function(json) {
				let results3 = "";
				results3 += '<h2>Examples:' + "</h2>";
				for (i=0; i<json.examples.length; ++i){
					let number = i+1;
					results3 += number + ". " + json.examples[i] + "<br/>";
				}

				document.getElementById("exampleResults").innerHTML = results3;
			}).catch(err => {
					console.error(err);
					results3 = "We couldn't find any examples."
					document.getElementById("exampleResults").innerHTML = results3;
				});

				const url4 = "https://wordsapiv1.p.rapidapi.com/words/" + value;

				fetch(url4, {
					"method": "GET",
					"headers": {
						"x-rapidapi-key": "504a6640f2mshd5e77f520a63da4p1e8f9fjsn642bc0d799fa",
						"x-rapidapi-host": "wordsapiv1.p.rapidapi.com"
					}
				})
				.then(function(response) {
					return response.json();
				}).then(function(json) {
					console.log(json.syllables['count']);
					let results4 = "";
					results4 += '<h2>Additional info:' + "</h2>";
					results4 += '<h3>Syllables: </h3>' + json.syllables['count'] + ": ";
					for (i=0; i<json.syllables['list'].length; ++i){
						if (i==json.syllables['list'].length-1) {
							results4 += "\"" + json.syllables['list'][i] + "\"";
							break;
						}
						results4 += "\"" + json.syllables['list'][i] + "\", ";
					}
					results4 += '<h3>Pronunciation: </h3>' + json.pronunciation['all'];

					console.log(results4);
					document.getElementById("additionalResults").innerHTML = results4;
				}).catch(err => {
						console.error(err);
						results4 = "We couldn't find any additional info."
						document.getElementById("additionalResults").innerHTML = results4;
					});
});
