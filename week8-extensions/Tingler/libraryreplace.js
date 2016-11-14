var elements = document.getElementsByTagName('*');

var sourceWordsToTargetWords = [
    [['man', 'boy', 'male', 'bro', 'guy', 'dude', 'boyfriend'], 'buckaroo'],
    [['men', 'boys', 'males', 'bros', 'guys', 'dudes', 'boyfriends'], 'buckaroos'],
    [['lady', 'woman', 'girl', 'female', 'girlfriend'], 'ladybuck'],
    [['ladies', 'women', 'girls', 'females', 'girlfriend'], 'ladybucks'],
    [['Donald Trump'], 'Devilman Tromp'],
    [['Mr. Trump'], 'Voidman Trump'],
    [['Donald J. Trump'], 'Domald Tromp'],
    [['Hillary Clinton'], "Hill Clintons"],
    [['Mrs. Clinton'], 'Topwizard Hill Clintons'],
    [['President Barack Obama', 'Barack Obama'], "Handsome President Barack Obama"],
    [['First Man'], 'First Buckaroo'],
    [['Vice President'], 'Viceman'],
    [['Mike Pence'], 'Warlord Pence'],
    [['Tim Kaine'], "Wizard Apprentice Kaine"],
    [['Bill Clinton'], 'Big Man Bill'],
    [['Anderson Cooper'], 'Worlds Most Handsome Elder Anderson Cooper'],
    [['presidential candidates', 'Presidential candidates', 'Presidential Candidates'], 'presidential warriors']


];

function makeRegex(sourceWords) {
    return new RegExp('\\b' + sourceWords.join('\\b|\\b') + '\\b', 'g');
};

function identity(string) {
    return string;
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

function toUpperCase(string) {
    return string.toUpperCase();
};

function makeRegexToTargetWords(sourceWordsToTargetWords, modifyWords) {
    return sourceWordsToTargetWords.map(function(sourceAndTarget) {
        var [source,target] = sourceAndTarget;
        source = source.map(modifyWords);
        target = modifyWords(target);
        return [makeRegex(source), target];
    });
};

var sourceRegexToTargetWords = makeRegexToTargetWords(sourceWordsToTargetWords, identity).concat(makeRegexToTargetWords(sourceWordsToTargetWords, capitalizeFirstLetter)).concat(makeRegexToTargetWords(sourceWordsToTargetWords, toUpperCase));

function replaceTextWithRegexes(text, sourceRegexToTargetWords) {
    for (var k = 0; k < sourceRegexToTargetWords.length; k++) {
        var [regex, targetWord] = sourceRegexToTargetWords[k];
        var replacedText = text.replace(regex, targetWord);
        text = replacedText
    }
    return text;
};

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var text = node.nodeValue;
            replacedText = replaceTextWithRegexes(text, sourceRegexToTargetWords);

            if (replacedText !== text) {
                console.log('replaced');
                element.replaceChild(document.createTextNode(replacedText), node);
            }
        }
    }
}