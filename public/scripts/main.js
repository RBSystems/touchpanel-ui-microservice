var version = "0.0.1";
var loadTime = 500;
var swalTimeout = 2000;
var previousVolume = 0; // Used for remembering the last volume value when muted
var volume = 100;

function init() {
    displayVersion();
}

function wakeSystem() {
    $("#idle-splash").hide();
    $("#loading-splash").show();

    setTimeout(function() {
        $("#loading-splash").fadeOut();

        if (window.location.hash) { // If we're refreshing a page or opening a bookmark, open the proper tab
            var hashPage = window.location.hash.substring(1, window.location.hash.length);
            bootpage.show(hashPage, updateActiveTab);
        } else {
            bootpage.show("display-page", updateActiveTab);
        }
    }, loadTime);
}

function displayVersion() {
    $(".version-number").text("version " + version);
}

function confirmPowerOff() {
    swal({
        title: "Turn system off?",
        text: "I'll miss you!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function(isConfirm) {
        if (isConfirm) {
            swal({
                title: "Powering off!",
                text: "The system will now shut down.",
                type: "success",
                timer: swalTimeout,
                showConfirmButton: false
            });

            setTimeout(function() {
                window.location = "index.html"; // Reload the page without hashes
            }, swalTimeout);
        } else {
            swal.close();
        }
    });
}

function increaseVolume() {
    if (volume == "MUTED") {
        volume = previousVolume;
    }

    if (volume < 100) {
        volume += 10;
    }

    showVolume();
}

function decreaseVolume() {
    if (volume == "MUTED") {
        volume = previousVolume;
    }

    if (volume > 0) {
        volume -= 10;
    }

    showVolume();
}

function muteVolume() {
    if (volume == "MUTED") {
        volume = previousVolume;
    } else {
        previousVolume = volume;
        volume = "MUTED";
    }

    showVolume();
}

function showVolume() {
    if (volume == "MUTED") {
        $("#volume-level").text(volume);
    } else {
        $("#volume-level").text(volume + "%");
    }
}

function updateActiveTab() {
    $("#device-control-tab").removeClass("active");
    $("#display-tab").removeClass("active");
    $("#audio-control-tab").removeClass("active");
    $("#microphone-control-tab").removeClass("active");

    var currentTab = bootpage.currentPage.substring(0, bootpage.currentPage.length - 5);

    $("#" + currentTab + "-tab").addClass("active");
}
