---
date: 2019-05-14 23:33:39
title: Game of Thrones Ratings
tags:
    - game of thrones
    - television
    - data science
    - programming
    - graphs
---

Via Rotten Tomatoes and with the awesome [ChartJS](https://www.chartjs.org/). Dots are episodes, contiguous lines are seasons ([static version](/misc/g/got_ratings.png).)

<script src='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js'></script>
<style>
#got-ratings-canvas {
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    margin: 1.25em 0!important;
    height: 350px;
}
</style>

<div>
    <canvas id='got-ratings-canvas'></canvas>
</div>
<script>
    /* eslint-disable */
    const ratingsData = {
        S01_E01: {
            name: "Winter Is Coming",
            rating: 100,
        },
        S01_E02: {
            name: "The Kingsroad",
            rating: 100,
        },
        S01_E03: {
            name: "Lord Snow",
            rating: 86,
        },
        S01_E04: {
            name: "Cripples, Bastards, and Broken Things",
            rating: 100,
        },
        S01_E05: {
            name: "The Wolf and the Lion",
            rating: 95,
        },
        S01_E06: {
            name: "A Golden Crown",
            rating: 100,
        },
        S01_E07: {
            name: "You Win or You Die",
            rating: 100,
        },
        S01_E08: {
            name: "The Pointy End",
            rating: 100,
        },
        S01_E09: {
            name: "Baelor",
            rating: 100,
        },
        S01_E10: {
            name: "Fire and Blood",
            rating: 100,
        },
        GAP_1: {
            name: null,
            rating: null,
        },
        S02_E01: {
            name: "The North Remembers",
            rating: 100,
        },
        S02_E02: {
            name: "The Night Lands",
            rating: 89,
        },
        S02_E03: {
            name: "What Is Dead May Never Die",
            rating: 100,
        },
        S02_E04: {
            name: "Garden of Bones",
            rating: 97,
        },
        S02_E05: {
            name: "The Ghost of Harrenhal",
            rating: 96,
        },
        S02_E06: {
            name: "The Old Gods and the New",
            rating: 100,
        },
        S02_E07: {
            name: "A Man Without Honor",
            rating: 96,
        },
        S02_E08: {
            name: "The Prince of Winterfell",
            rating: 100,
        },
        S02_E09: {
            name: "Blackwater",
            rating: 100,
        },
        S02_E10: {
            name: "Valar Morghulis",
            rating: 92,
        },
        GAP_2: {
            name: null,
            rating: null,
        },
        S03_E01: {
            name: "Valar Dohaeris",
            rating: 98,
        },
        S03_E02: {
            name: "Dark Wings, Dark Words",
            rating: 89,
        },
        S03_E03: {
            name: "Walk of Punishment",
            rating: 92,
        },
        S03_E04: {
            name: "And Now His Watch Is Ended",
            rating: 100,
        },
        S03_E05: {
            name: "Kissed by Fire",
            rating: 100,
        },
        S03_E06: {
            name: "The Climb",
            rating: 83,
        },
        S03_E07: {
            name: "The Bear and the Maiden Fair",
            rating: 77,
        },
        S03_E08: {
            name: "Second Sons",
            rating: 97,
        },
        S03_E09: {
            name: "The Rains of Castamere",
            rating: 100,
        },
        S03_E10: {
            name: "Mhysa",
            rating: 100,
        },
        GAP_3: {
            name: null,
            rating: null,
        },
        S04_E01: {
            name: "Two Swords",
            rating: 95,
        },
        S04_E02: {
            name: "The Lion and the Rose",
            rating: 100,
        },
        S04_E03: {
            name: "Breaker of Chains",
            rating: 96,
        },
        S04_E04: {
            name: "Oathkeeper",
            rating: 96,
        },
        S04_E05: {
            name: "First of His Name",
            rating: 98,
        },
        S04_E06: {
            name: "The Laws of Gods and Men",
            rating: 96,
        },
        S04_E07: {
            name: "Mockingbird",
            rating: 100,
        },
        S04_E08: {
            name: "The Mountain and the Viper",
            rating: 96,
        },
        S04_E09: {
            name: "The Watchers on the Wall",
            rating: 94,
        },
        S04_E10: {
            name: "The Children",
            rating: 98,
        },
        GAP_4: {
            name: null,
            rating: null,
        },
        S05_E01: {
            name: "The Wars to Come",
            rating: 96,
        },
        S05_E02: {
            name: "The House of Black and White",
            rating: 96,
        },
        S05_E03: {
            name: "High Sparrow",
            rating: 100,
        },
        S05_E04: {
            name: "Sons of the Harpy",
            rating: 96,
        },
        S05_E05: {
            name: "Kill the Boy",
            rating: 96,
        },
        S05_E06: {
            name: "Unbowed, Unbent, Unbroken",
            rating: 54,
        },
        S05_E07: {
            name: "The Gift",
            rating: 83,
        },
        S05_E08: {
            name: "Hardhome",
            rating: 100,
        },
        S05_E09: {
            name: "The Dance of Dragons",
            rating: 83,
        },
        S05_E10: {
            name: "Mother's Mercy",
            rating: 92,
        },
        GAP_5: {
            name: null,
            rating: null,
        },
        S06_E01: {
            name: "The Red Woman",
            rating: 86,
        },
        S06_E02: {
            name: "Home",
            rating: 87,
        },
        S06_E03: {
            name: "Oathbreaker",
            rating: 87,
        },
        S06_E04: {
            name: "Book of the Stranger",
            rating: 100,
        },
        S06_E05: {
            name: "The Door",
            rating: 98,
        },
        S06_E06: {
            name: "Blood of My Blood",
            rating: 88,
        },
        S06_E07: {
            name: "The Broken Man",
            rating: 98,
        },
        S06_E08: {
            name: "No One",
            rating: 85,
        },
        S06_E09: {
            name: "Battle of the Bastards",
            rating: 98,
        },
        S06_E10: {
            name: "The Winds of Winter",
            rating: 99,
        },
        S07_E01: {
            name: "Dragonstone",
            rating: 93,
        },
        GAP_6: {
            name: null,
            rating: null,
        },
        S07_E02: {
            name: "Stormborn",
            rating: 96,
        },
        S07_E03: {
            name: "The Queen's Justice",
            rating: 89,
        },
        S07_E04: {
            name: "The Spoils of War",
            rating: 97,
        },
        S07_E05: {
            name: "Eastwatch",
            rating: 95,
        },
        S07_E06: {
            name: "Beyond the Wall",
            rating: 84,
        },
        S07_E07: {
            name: "The Dragon and the Wolf",
            rating: 87,
        },
        GAP_7: {
            name: null,
            rating: null,
        },
        S08_E01: {
            name: "Winterfell",
            rating: 92,
        },
        S08_E02: {
            name: "A Knight of the Seven Kingdoms",
            rating: 88,
        },
        S08_E03: {
            name: "The Long Night",
            rating: 75,
        },
        S08_E04: {
            name: "The Last of the Starks",
            rating: 57,
        },
        S08_E05: {
            name: "The Bells",
            rating: 46,
        },
        S08_E06: {
            name: "The Iron Throne",
            rating: 58,
        },
    };

new Chart(document.getElementById('got-ratings-canvas'),
{
    type: 'line',
    data: {
        labels: Object.keys(ratingsData),
        datasets: [
            {
                data: Object.values(ratingsData).map(k => k.rating),
                fill: false,

                borderWidth: 2,
                borderColor: '#f30',
                lineTension: 0.5,

                pointRadius: 3,
                pointBackgroundColor: '#f30',
            }
        ]
    },
    options: {
        layout: {
            padding: 10,
        },
        tooltips: {
            titleFontSize: 12,
            displayColors: false,
            callbacks: {
                title: function(tooltipItem, data) {
                    const episode = tooltipItem[0]['label'];
                    const episodeTitle = ratingsData[episode].name;

                    return episodeTitle;
                },
                label: function(tooltipItem, data) {
                    const s_e = tooltipItem['label'];
                    const season = s_e.split('_')[0].replace('S', 'Season ');
                    const episode = s_e.split('_')[1].replace('E', 'Episode ');

                    return season + ' ' + episode;
                },
            },
        },
        title: {
            text: 'Game of Thrones Episode Ratings',
            display: false,
            fontColor: '#333',
            fontSize: 22,
            fontFamily: 'Circular, helvetica, arial, sans-serif',
            padding: 24,
        },
        legend: {
            display: false,
        },
        scales: {
            xAxes: [{
                /* Remove Gridlines */
                display: false,

                /* Remove label */
                ticks: {
                    display: false,
                }
            }],
            yAxes: [{
                ticks: {
                    callback: function(value, index, values) {
                        return value + '%';
                    },
                },
            }],
        },
    }
});

// window.onload = function() {
//     var ctx = document.getElementById('canvas').getContext('2d');
//     window.myLine = new Chart(ctx, config);
// };
</script>

A search for episode titles on GitHub yielded this indescribably amazing, mostly hand-curated [GoT Dataset](https://github.com/jeffreylancaster/game-of-thrones) by Jeffrey Lancaster (who [published a Medium article](https://medium.com/@jeffrey.lancaster/the-ultimate-game-of-thrones-dataset-a100c0cf35fb) describing his process. Has a [_Stranger Things_](https://github.com/jeffreylancaster/stranger-things) dataset as well.)

**Update**: [MFW watching the final episode](https://twitter.com/Simone_Biles/status/763396097033248768).

![](/misc/g/gavin_meme.jpg)
