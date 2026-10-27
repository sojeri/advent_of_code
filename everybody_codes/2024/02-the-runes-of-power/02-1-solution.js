// https://everybody.codes/event/2024/quests/2

/**

The knights of the Order of the Golden Duck don superb armour and weapons, each adorned with mysterious symbols. While some of these may be mere decorative ornaments, many are powerful combinations of runic symbols that endow the items with extraordinary properties. Each aspiring knight must master these symbols to fully harness their magical powers. Such mastery demands knowledge and patience, for even the slightest error can lead to unforeseen consequences.

The day of the exam is fast approaching, and you feel confident in your preparation. After all, you have studied diligently throughout the night! As the candidates gather in the grand, circular hall, you see the object of your test: a knight's helmet. Though it appears ancient, the magical runes inscribed along its lower edge still glow with a bright, mystic light.

Your task is to count all the runic words within the inscription on the helmet ( your notes ). Fortunately, the task is simpler than anticipated; a note beside the helmet lists all the possible runic words that may appear. With these in hand, you begin the task of counting.

Example based on the following notes:

WORDS:THE,OWE,MES,ROD,HER

AWAKEN THE POWER ADORNED WITH THE FLAMES BRIGHT IRE

The possible runic words, based on the first line are:
THE, OWE, MES, ROD, and HER.

The inscription to examine reads:
AWAKEN THE POWER ADORNED WITH THE FLAMES BRIGHT IRE.

The sentence contains 4 runic words (highlighted):
THE, OWE, another THE, and MES.
 
Other examples for the same WORDS list as above:

    THE FLAME SHIELDED THE HEART OF THE KINGS: 3 runic words
    POWE PO WER P OWE R: 2 runic words
    THERE IS THE END: 3 runic words (THE and HER overlap)

What is the number of runic words engraved on the helmet?
 */
function solution(inputs) {
    const [rawWords, _, inscription] = inputs
    const words = rawWords.split(':')[1].split(',')
    let matches = 0
    words.forEach(word => {
        const matchCount = Array.from(inscription.matchAll(word)).length
        matches += matchCount
    })
    return matches
}

module.exports = {
    solution,
}
