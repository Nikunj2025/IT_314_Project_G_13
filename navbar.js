function gotopagehome() {
    /*var element = document.getElementById("home");
    element.classList.add("active");
    const old = document.getElementsByClassName("active");
    old.classList.toggle("active");
    const addc = document.getElementsByClassName("home");
    addc.classList.toggle("active"); */
    window.location.assign(`http://localhost:3000/home`)
}
function gotopagesearch() {
    window.location.assign(`http://localhost:3000/search`)
}
function gotopageadd() {
    window.location.assign(`http://localhost:3000/addrecipe`)
}
const toggleMenuOpen = () => document.body.classList.toggle("open");
function functionToExecute() {
    window.location.assign("https://www.w3schools.com/css/tryit.asp?filename=trycss_navbar_basic_html")
} 