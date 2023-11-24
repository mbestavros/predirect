document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  const inputs = document.querySelectorAll("input[type='text']");
  const instances = {
    youtube: document.getElementById("youtubeInstance"),
    twitter: document.getElementById("twitterInstance"),
    medium: document.getElementById("mediumInstance"),
    tiktok: document.getElementById("tiktokInstance"),
    quora: document.getElementById("quoraInstance"),
    fandom: document.getElementById("fandomInstance"),
    imdb: document.getElementById("imdbInstance"),
    genius: document.getElementById("geniusInstance"),
  };

  // Load saved preferences from storage
  chrome.storage.sync.get(
    ["redirectServices", "customInstances"],
    function (data) {
      let defaultRedirectServices = {
        youtube: true,
        twitter: true,
        medium: true,
        tiktok: true,
        quora: true,
        fandom: true,
        imdb: true,
        genius: true,
      };
      let defaultCustomInstances = {
        youtubeInstance: "",
        twitterInstance: "",
        mediumInstance: "",
        tiktokInstance: "",
        quoraInstance: "",
        fandomInstance: "",
        imdbInstance: "",
        geniusInstance: "",
      };
      const savedRedirectServices =
        data.redirectServices || defaultRedirectServices;
      const customInstances = data.customInstances || defaultCustomInstances;

      if (savedRedirectServices) {
        checkboxes.forEach((checkbox) => {
          checkbox.checked = savedRedirectServices[checkbox.id];
        });
      }
      if (customInstances) {
        inputs.forEach((input) => {
          input.value = customInstances[input.id];
        });
      }
    }
  );

  function saveOptions() {
    const redirectServices = {
      youtube: document.getElementById("youtube").checked,
      twitter: document.getElementById("twitter").checked,
      medium: document.getElementById("medium").checked,
      tiktok: document.getElementById("tiktok").checked,
      quora: document.getElementById("quora").checked,
      fandom: document.getElementById("fandom").checked,
      imdb: document.getElementById("imdb").checked,
      genius: document.getElementById("genius").checked,
    };
    const customInstances = {
      youtubeInstance: instances.youtube.value || "",
      twitterInstance: instances.twitter.value || "",
      mediumInstance: instances.medium.value || "",
      tiktokInstance: instances.tiktok.value || "",
      quoraInstance: instances.quora.value || "",
      fandomInstance: instances.fandom.value || "",
      imdbInstance: instances.imdb.value || "",
      geniusInstance: instances.genius.value || "",
    };

    // Save preferences to storage
    chrome.storage.sync.set({ redirectServices, customInstances });
    chrome.runtime.sendMessage({
      type: "updateOptions",
      redirectServices,
      customInstances,
    });
  }

  // Add change event listeners to checkboxes
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", saveOptions);
  });
  inputs.forEach((input) => {
    input.addEventListener("input", saveOptions);
  });
});
