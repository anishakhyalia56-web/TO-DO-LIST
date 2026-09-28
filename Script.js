const button = document.querySelector(".button");

button.addEventListener("click", function(event) {
    event.preventDefault();

    button.textContent = "Opening Projects...";
    button.style.transform = "scale(1.1)";

    setTimeout(function()
     {
        document.querySelector("#projects").scrollIntoView({
            behavior: "smooth"
        });

        button.textContent = "View My Projects";
        button.style.transform = "scale(1)";
    }, 1000);
});