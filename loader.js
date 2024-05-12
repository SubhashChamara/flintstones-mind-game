setTimeout(function() {
    document.getElementById("loader-box").classList.add("hidden");
    setTimeout(function() {
        window.location.href = "home.html";
    }, 2000); // Wait for the fade-out transition to complete (2 seconds)
}, 2500);