// as much as i'd like to say fuck javascript, this is truly a skill issue on my end because i don't fucking know javascript 
// i'm not a web developer ok
// worse than yanderedev?

const splash = document.getElementById("splash");
var current, index;

// thanks mdn
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
async function getData() {
const url = "./script/splash/splashes.json";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        alert(error.message);
    }
}

async function initSplash() {
    const text = await getData();
    index = Math.trunc(Math.random() * text.length);
    index = 96;
    splash.textContent = text[index]["text"];
    current = text[index]["text"];
    //document.getElementById("splash").style = text[index]["css"];

    console.log(`text font: ${splash.style.font}`);
}

initSplash().then(() => {
    const ctx = document.createElement("canvas").getContext("2d");
    
    var dosfont = new FontFace("Perfect DOS VGA\ 437 Win", "url('https://unpkg.com/xp.css/dist/PerfectDOSVGA437Win.woff2') format('woff2')");
    dosfont.weight = 400;
    dosfont.load().then(
        () => {
            document.fonts.add(dosfont);
            ctx.font = `16px ${dosfont.family}`;
            var tm = ctx.measureText(current);
            
            console.log(`text width: ${tm.width}`);
            console.log(`div width: ${document.getElementById("splash-container").getBoundingClientRect().width}`);
            if(tm.width > document.getElementById("splash-container").getBoundingClientRect().width) {
                setTimeout(() => splash.classList.add("horizontal-scrolling"), 2500);
            }
            
        }, (err) => alert(err));
});
    
