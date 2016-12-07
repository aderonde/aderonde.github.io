//This is the code that will be injected on any page
var markov = new MarkovGeneratorWord(2,20)

$('.numbered-step span').each(function(){
	markov.feed($(this).text())
})

$('.numbered-step span').each(function(){
	var t = ""
	while(t.length < 4){
		t = markov.generate(Math.floor(Math.random()*60)+20)
		t = t.split(".")
		t.pop()
		t = t.join(".") + "."	
	}
	$(this).text(t)
})