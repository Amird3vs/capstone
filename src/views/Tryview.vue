<template>
    <div class="container">
        <div class="autocomplete">
            <input type="text" v-model="inputText" @input="updateSuggestions" ref="input">
            <ul v-if="showSuggestions && suggestions.length" class="suggestions">
                <li v-for="suggestion in suggestions" :key="suggestion" @click="selectSuggestion(suggestion)">
                    <span v-html="highlightMatch(suggestion)"></span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            inputText: '',
            showSuggestions: false,
            suggestions: [],
            phraseInitialsMapping: {
                'aaip': 'Ano ang iyong pangalan?',
                'Aaipp': 'Ano ang iyong paboritong pagkain?',
                'kk': 'Kamusta ka?',
                'Kknb': 'Kumain ka na ba?',
                'mkbmk': 'Mayroon ka bang mga kapatid?',
                'skn': 'Saan ka nag-aaral?',
                'gknksm': 'Gaano ka na katagal sa trabaho mo?',
                'skpns': 'Saan ka pupunta ngayong Sabado?',
                'imbkanagmsb': 'Iniisip mo ba kung ano ang gagawin mo sa bakasyon?',
                'mmkkbms': 'May mga kaibigan ka bang malapit sa\'yo?',
                'kaam': 'Kumusta ang araw mo?',
                'mkbn': 'Minsan ka bang nagluluto?',
                'aknmapmp': 'Anong klase ng musika ang paborito mong pakinggan?',
                'skmppmr': 'Saan ka madalas pumunta para mag-relax?',
                'aokgb': 'Anong oras ka gigising bukas?',
                'mbkt': 'Magandang buhay!',
                'kkn': 'Kamusta ka na?',
                'tbdom': 'Tag-araw ba dyan o maulan?',
                'nkbpstomskg': 'Naglalakad ka ba papunta sa trabaho o may sasakyan kang gamit?',
                'bp': 'Bakit ka malungkot?',
                'pbkt': 'Puwede ba kitang tulungan?',
                'mskbgohms': 'May sports ka bang gusto o hilig mong subukan?',
                'sakmsb': 'Sino ang kasama mo sa bahay?',
                'gknknd': 'Gaano ka na katagal nakatira dyan?',
                'kkhknpmp': 'Kailan ka huling kumain ng paborito mong pagkain?',
                'ubsin': 'Umuulan ba sa inyo ngayon?',
                'aagmgkpm': 'Ano ang gusto mong gawin kapag maulan?',
                'oklb': 'Okey ka lang ba?',
                'an': 'Anong nangyari?',
                'kawm': 'Kamusta ang weekend mo?',
                'Aapmn': 'Ano ang pinaka-nagustuhan mong nangyari?',
                'aaipapnt': 'Ano ang iyong paboritong aktibidad pagkatapos ng trabaho?',
                'sakm': 'Sino ang kasama mo?',
                'agn': 'Anong ginagawa niyo?',
                'tgs': 'Taga saan ka?',
                'aipot': 'Ano ang iyong propesyon o trabaho?',
                'mmpkbsb': 'May mga pets ka ba sa bahay',
                'aapn': 'Ano ang pangalan nila?',
                'kk': 'Kailan ka huling kumain?',
                'aaim': 'Ano ang inorder mo?',
                'w': 'welcome',
                'k': 'kumusta?',
                'mh': 'Magandang hapon!',
                'mu': 'Magandang umaga!',
                'mg': 'Magandang gabi!',
                'skim': 'Saan ko ito makikita?',
                'QCU': 'Quezon City University'
            }
        };
    },
    methods: {
        updateSuggestions() {
            if (this.inputText === '') {
                this.showSuggestions = false;
                this.suggestions = [];
                return;
            }

            const initials = this.inputText.toLowerCase();
            const matchingPhrases = Object.keys(this.phraseInitialsMapping)
                .filter(key => key.toLowerCase().startsWith(initials));
            this.suggestions = matchingPhrases.map(key => this.phraseInitialsMapping[key]);
            this.showSuggestions = true;
        },
        selectSuggestion(suggestion) {
            this.inputText = suggestion;
            this.showSuggestions = false;
        },
        highlightMatch(suggestion) {
            const initials = this.inputText.toLowerCase().split('');
            let highlightedSuggestion = '';

            suggestion.split(' ').forEach(word => {
                const initial = word.charAt(0).toLowerCase();
                if (initials.includes(initial)) {
                    highlightedSuggestion += '<strong>' + word.charAt(0) + '</strong>' + word.slice(1) + ' ';
                } else {
                    highlightedSuggestion += word + ' ';
                }
            });

            return highlightedSuggestion.trim();
        }
    }
};
</script>

<style>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.autocomplete {
    position: relative;
}

.autocomplete input {
    width: 70vw;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1;
    list-style-type: none;
    padding: 0;
    margin: 0;
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0 0 4px 4px;
    background-color: #fff;
    color: black;
    max-height: 200px;
    overflow-y: auto;
}

.suggestions li {
    padding: 10px;
    cursor: pointer;
}

.suggestions li:hover {
    background-color: #f0f0f0;
}

strong {
    font-weight: bold;
    color: aqua;
}
</style>