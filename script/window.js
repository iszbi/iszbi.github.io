const windows = document.getElementsByClassName("window");

function focus(element) {
    windows.foreach((win) => {
        if(win === element) {

        }
    })
}

windows.foreach((win) => win.addEventListener("ondrag", () => focus()));