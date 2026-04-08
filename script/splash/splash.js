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
    splash.textContent = text[index]["text"];
    current = text[index]["text"];
    //document.getElementById("splash").style = text[index]["css"];

    console.log(`text font: ${splash.style.font}`);
}

// font must be loaded
function measureSplash(text, font, size) {
    const ctx = document.createElement("canvas").getContext("2d");
    ctx.font = `${size}px ${dosfont.family}`;
    var tm = ctx.measureText(text);
    return tm.width;
}

const dosfont = new FontFace("Perfect DOS VGA\ 437 Win", "url('https://unpkg.com/xp.css/dist/PerfectDOSVGA437Win.woff2') format('woff2')");
dosfont.weight = 400;

var timeout_id = -1;

initSplash().then(() => {    
    dosfont.load().then(
        () => {
            document.fonts.add(dosfont);
            var splash_width = measureSplash(current, dosfont, 16);
            var div_width = document.getElementById("splash-container").getBoundingClientRect().width;
            
            console.log(`text width: ${splash_width}`);
            console.log(`div width: ${div_width}`);
            if(timeout_id == -1) {
                if(splash_width > div_width) {
                    timeout_id = setTimeout(() => splash.classList.add("horizontal-scrolling"), 2500);
                }
            }
            
        }, (err) => alert(err));
});
    
document.defaultView.addEventListener("resize", (event) => {
    console.log("resize triggered");
    var splash_width = measureSplash(current, dosfont, 16);
    var div_width = document.getElementById("splash-container").getBoundingClientRect().width;

    console.log(`text width: ${splash_width}`);
    console.log(`div width: ${div_width}`);

    if(splash_width > div_width) {
        if(timeout_id == -1) {
            timeout_id = setTimeout(() => {
                if(!splash.classList.contains("horizontal-scrolling"))
                    splash.classList.add("horizontal-scrolling");
            }, 2500);
        }
        
    } else {
        console.log("yay i'm here");
        if(splash.classList.contains("horizontal-scrolling")) {
            splash.classList.remove("horizontal-scrolling");
        }

        if(timeout_id != -1) {
            clearTimeout(timeout_id);
            timeout_id = -1;
        }
    }
});
