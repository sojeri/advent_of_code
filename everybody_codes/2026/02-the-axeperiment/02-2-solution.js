// https://everybody.codes/event/2026/quests/2
const { solution, getChecksum } = require('./02-1-solution')

// my original solution still worked 😅

module.exports = {
    solution,
    getChecksum,
}

/**

Part II

Gimlock's second notebook ( your notes ) looked almost identical to the first one, except that each group was missing the result of exactly one comparison. Apparently, forging a brand-new axe for every test had taken rather longer than expected. We suggested reusing an axe, but Gimlock called that "scientifically irresponsible."

He asked us to help him complete the missing measurements, but before either of us could answer, Frodoff's eyes suddenly turned golden. He studied the notes for a few moments, then smiled.

"Why bother making the last comparison?" he asked. "If alloy

 1 

was harder than alloy

 2 

, and alloy

 2 

was harder than alloy

 3 

, then alloy

 1 

had to be harder than alloy

 3 

as well."

Gimlock and I exchanged a glance. Following Frodoff's reasoning, we deduced the missing comparison in every group, arranged the alloys from the hardest to the softest, and calculated the checksum exactly as before. We had been rather lucky. A missing comparison cannot always be deduced from the others, but Frodoff's method was enough to solve every group in these notes.

Example based on the following notes:

2<5 3>1 1>2 1<5 4<1 3>2 4<2 3>5 4<5
2>1 3>2 1<5 4>5 2<5 3>1 4>3 2<4 5<3
5>1 5>2 4>1 3>2 3<4 1>2 3>5 1<3 4>5

This is the same example as in Part I, with exactly one comparison removed from each group. The missing comparison can still be deduced, so the alloy order, the resulting numbers, and the final checksum are identical.

The final checksum is therefore again

 122157 

.
*/
