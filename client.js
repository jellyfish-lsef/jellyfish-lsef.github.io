if (localStorage.getItem("user_is_skid")) {
    if (location.hash == "#im_not_a_skid_i_swear") {
        localStorage.removeItem("user_is_skid")
        alert("ok")
        location.hash = "editor"
    } else {
        location.replace("https://www.urbandictionary.com/define.php?term=skiddie")
    }
}


const mainContainer = document.querySelector("#mainContainer")
const injectBtn = document.querySelector("#topBarInject")
window.onhashchange = function(h) {
    var hash = location.hash
    if (hash == "#editor") { mainContainer.style.left = "0px" }
    if (hash == "#faq") { mainContainer.style.left = "-100vw" }
    while (document.querySelector("a.selected")) {document.querySelector("a.selected").classList.remove("selected")}
    try {document.querySelector(`a[href="${hash}"]`).classList.add("selected")}catch(e){}
}

if (location.hash.length > 1) { window.onhashchange()}

window.onkeydown = function(evt) {
    // disable zooming
    if ((evt.code == "Minus" || evt.code == "Equal") && (evt.ctrlKey || evt.metaKey)) {evt.preventDefault()}
}

getLatest = ((j,platform) => {
    for (var r of j) {
        for (var asset of r.assets) {
            console.log(asset,asset.name);
            if (asset.name.includes(platform)) return {asset,r};
        }
    }
    return false;
})
var ddl = true;
document.querySelector("#loginContainer").onclick = () => { document.body.classList.remove("loggingIn") }
async function download() {
    /**if (confirm("IMPORTANT: READ CAREFULLY\n\nJellyfish is only to be used on games that you have explicit permission to run a LSI on, such as for example, developing anti-cheat software.\n\nAre you intending to use Jellyfish to attack into games you are not the owner of, and do not have permission from the owner to run a LSI on?\n\nCancel = No\nOK = Yes")) {
        localStorage.setItem("user_is_skid",true)
        location.reload()
    }**/
    location.hash = "editor"
    document.body.classList.add("loggingIn")
    var ftch = await fetch("https://api.github.com/repos/jellyfish-lsef/jellyfish-bootstrapper/releases")
    var j = await ftch.json()
    var latestMac = getLatest(j,"dmg")
    if (latestMac) {
        document.querySelector("#macBtn").disabled = undefined
        document.querySelector("#macBtn").innerText = "Download for macOS"
        document.querySelector("#macBtn").href = latestMac.asset["browser_download_url"]
    } else {
        document.querySelector("#macBtn").innerText = "macOS version coming soon"
    }
    /*var latestWin = getLatest(j,"win32")
    console.log(latestMac,latestWin)
    if (latestWin) {
        document.querySelector("#winBtn").disabled = undefined
        document.querySelector("#winBtn").innerText = "Download " + latestWin.r.tag_name + " for Windows"
        document.querySelector("#winBtn").onclick = () => {
            open(latestWin.asset["browser_download_url"])
        }
    } else {
        document.querySelector("#winBtn").innerText = "Windows version coming soon"
    }
    /**
    injectBtn.innerText = "Starting download"
    location.replace(j[0].assets[0].browser_download_url)
    injectBtn.innerText = "Downloading"
    setTimeout(function() {
        injectBtn.innerText = "Download"
        injectBtn.disabled = false
    },2000)*/
    
}
if (location.hash == "#download") {
    location.hash = "editor"
    download()

}