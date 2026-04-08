// as much as i'd like to say fuck javascript, this is truly a skill issue on my end because i don't fucking know javascript lmao

const splash = document.getElementById("splash");

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

async function init_splash() {
    const text = await getData();
    const index = Math.trunc(Math.random() * text.length);
    document.getElementById("splash").textContent = text[index]["text"];
    document.getElementById("splash").scrollLeft += 1000;
    //document.getElementById("splash").style = text[index]["css"];

    var animation = splash.getAnimations();
    animation[0].pause();
}

init_splash();
setTimeout(() => animation[0].play(), 2500);